import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashingServicePort } from '../../domain/ports/services/hashing.service.port';

@Injectable()
export class BcryptHashingService implements HashingServicePort {
  
  async hash(plainText: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(plainText, saltRounds);
  }

  async compare(plainText: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashed);
  }
}