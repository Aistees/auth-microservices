import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class DebugJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    // 👇 This log will appear in your terminal
    if (info) {
        console.log('❌ JWT Failure Reason:', info.message);
    }
    
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}