import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

   canActivate(
    context: ExecutionContext,
  ): boolean  {
    const role = this.reflector.get<string[]>('roles', context.getHandler());

    if (!role) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const { email } = request.user;
  }
}
