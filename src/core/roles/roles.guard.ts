import { Injectable, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppError } from '../exception/app-error/app-error';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      console.log('***** Reflector ******');
      const roles = this.reflector.getAllAndOverride<number[]>('roles', [context.getClass(), context.getHandler()]);
      if (!roles.length) {
        return true;
      }
      const request = context.switchToHttp().getRequest();

      return roles.includes(request.user?.role?.id);
    } catch (error) {
      throw new AppError('You are not right to access', 'Error: role base', HttpStatus.EXPECTATION_FAILED);
    }
  }
}
