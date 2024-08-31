import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const res = this.reflector.get<string[]>('roles', context.getHandler());
    const req = context.switchToHttp().getRequest<Request>();
    console.log(res);
    console.log(req.query.role);
    if (res.includes(req.query.role as string)) {
      return true;
    }
    return false;
  }
}
