import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

   canActivate(
    context: ExecutionContext,
  ): boolean  {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.body;

    if(!user.roles) return false;
    if(user.roles[0] !== 'admin') return false;

    return true;
  }
}
