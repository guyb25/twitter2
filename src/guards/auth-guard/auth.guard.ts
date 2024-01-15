import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthSession } from 'src/models/session/auth-session'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    let session = context.switchToHttp().getRequest<Request>().session as AuthSession

    if (!session.authId) {
      throw new UnauthorizedException('You must be logged in to perform this operation')
    }

    return true
  }
}