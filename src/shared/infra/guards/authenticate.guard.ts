/*import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';
import * as crypt from 'crypto';
import { ICipherPayload } from 'src/@core/domains/users/users.service';

interface IJwtPayload {
  sub: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwtToken = this.reflector.get<ICipherPayload>(
      'secret_token',
      context.getHandler(),
    );

    if (jwtToken === undefined) {
      return false;
    } else if (jwtToken) {
      const { algorithm, secretKey, token, vector } =
        jwtToken as ICipherPayload;

      const verifyJwtToken = verify(token, process.env.API_TOKEN_SECRET_KEY);
      const { sub } = verifyJwtToken as IJwtPayload;

      if (verifyJwtToken) {
        const decipher = crypt.createDecipheriv(algorithm, secretKey, vector);

        let decryptedData = decipher.update(sub, 'hex', 'utf-8');
        decryptedData += decipher.final('utf8');
      }
    }
  }
} */
