import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorManager {
  public status: HttpStatus;
  public message: string;

  constructor({
    statusCode,
    message,
  }: {
    statusCode: keyof typeof HttpStatus;
    message: string;
  }) {
    this.status = HttpStatus[statusCode];
    this.message = message;
  }

  public static createSignatureError({
    status,
    message,
  }: {
    status: HttpStatus;
    message: string;
  }) {
    if (status && message) {
      throw new HttpException(message, status);
    } else {
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
