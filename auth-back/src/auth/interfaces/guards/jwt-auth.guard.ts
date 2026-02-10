import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// The string 'jwt' must match the name you gave in your JwtStrategy
export class JwtAuthGuard extends AuthGuard('jwt') {}