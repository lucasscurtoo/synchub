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
  }): HttpException {
    if (status && message) {
      return new HttpException(message, status);
    } else {
      return new HttpException(
        message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
