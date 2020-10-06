import { Injectable,ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req
    const input = ctx.getArgs()
    req.body = {
      username:input.input.username,
      email:input.input.email,
      password:input.input.password,
    }
    return req;
  }
  
  // canActivate(context:ExecutionContext):boolean | Promise<boolean> | Observable<boolean> {
  //   const ctx = GqlExecutionContext.create(context);
  //   const {req} = ctx.getContext()
  //   return super.canActivate(new ExecutionContextHost([req]))
  // }
}