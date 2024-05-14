import { hkdf } from 'crypto';
import { compactDecrypt } from 'jose';

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

export async function getDerivedEncryptionKey(
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
export async function decode(params: JWTDecodeParams): Promise<JWT | null> {
  const { token, secret, salt = '' } = params;
  if (!token) return null;
  const encryptionSecret = await getDerivedEncryptionKey(secret, salt);
  const { plaintext } = await compactDecrypt(token, encryptionSecret);
  return JSON.parse(plaintext.toString());
}
