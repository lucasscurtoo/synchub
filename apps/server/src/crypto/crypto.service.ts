import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class CryptoService {
  private readonly algorithm = 'aes-256-ctr';
  private readonly keyLength = 32;
  private readonly iv = randomBytes(16);
  private readonly salt = 'your-salt'; // Use a constant salt

  async getKey(password: string): Promise<Buffer> {
    return (await promisify(scrypt)(
      password,
      this.salt,
      this.keyLength,
    )) as Buffer;
  }

  async encrypt(text: string, key: Buffer): Promise<string> {
    const cipher = createCipheriv(this.algorithm, key, this.iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return encrypted.toString('hex');
  }

  async decrypt(encryptedText: string, key: Buffer): Promise<string> {
    const decipher = createDecipheriv(this.algorithm, key, this.iv);

    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}
