import { User } from '../../entities/user.entity';

export abstract class UserRepositoryPort {
  abstract findByLogin(login: string): Promise<User>;
  abstract findById(user_id: string): Promise<User | null>;
  abstract save(user: User): Promise<void>;
  abstract update(user_id: string, updatedUser: User): Promise<void>;
}
