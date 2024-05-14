import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { decode } from 'src/services/JwtDecode';
@Injectable()
export class JwtGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (request.path.startsWith('/auth/')) {
      return true;
    }

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
      throw new UnauthorizedException('Authorization header is malformed');
    }

    const token = parts[1];
    const secret = process.env.JWT_SECRET;

    const decoded = await decode({
      token: token,
      secret: secret,
    });

    if (!decoded) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
