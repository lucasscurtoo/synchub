import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Buffer } from 'buffer';
import { hkdf } from 'crypto';
import { compactDecrypt } from 'jose';
import { ErrorManager } from 'src/services/error.manager';

interface JWTDecodeParams {
  token: string;
  secret: string | Buffer;
  salt?: string;
}

interface JWT {
  [key: string]: any;
}

/**
 * Derives an encryption key using the HKDF algorithm.
 *
 * @param keyMaterial - The key material used for key derivation.
 * @param salt - The salt value used for key derivation.
 * @returns A promise that resolves to the derived encryption key as a Buffer.
 */

async function getDerivedEncryptionKey(
  keyMaterial: string | Buffer,
  salt: string,
) {
  return new Promise<Buffer>((resolve, reject) => {
    hkdf(
      'sha256',
      keyMaterial,
      salt,
      `NextAuth.js Generated Encryption Key${salt ? ` (${salt})` : ''}`,
      32,
      (err, derivedKey) => {
        if (err) {
          reject(err);
        } else {
          resolve(Buffer.from(derivedKey));
        }
      },
    );
  });
}

/**
 * Decodes a JSON Web Token (JWT) using the provided parameters.
 * @param params - The parameters required for decoding the JWT.
 * @returns A Promise that resolves to the decoded JWT or null if the token is invalid or missing.
 */
async function decode(params: JWTDecodeParams): Promise<JWT | null> {
  const { token, secret, salt = '' } = params;
  if (!token) return null;
  const encryptionSecret = await getDerivedEncryptionKey(secret, salt);
  const { plaintext } = await compactDecrypt(token, encryptionSecret);
  return JSON.parse(plaintext.toString());
}

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.UNAUTHORIZED,
          message: 'Not token provided',
        });
      }

      const parts = authHeader.split(' ');
      if (parts.length !== 2) {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.BAD_REQUEST,
          message: 'Authorization header is malformed',
        });
      }

      const token = parts[1];
      const secret = process.env.JWT_SECRET;

      const decoded = await decode({
        token: token,
        secret: secret,
      });

      if (!decoded) {
        throw ErrorManager.createSignatureError({
          status: HttpStatus.UNAUTHORIZED,
          message: 'Invalid token',
        });
      }
      next();
    } catch (err) {
      throw ErrorManager.createSignatureError({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }
  }
}
