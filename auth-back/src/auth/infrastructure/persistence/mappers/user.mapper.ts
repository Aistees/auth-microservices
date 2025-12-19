import { User } from "../../../domain/entities/user.entity";
import { UserOrmEntity } from "../entities/user.orm-entity";

export class UserMapper {
  static toDomain(ormEntity: UserOrmEntity): User {
    return new User(
      ormEntity.id,
      ormEntity.login,
      ormEntity.password,
      ormEntity.roles,
      ormEntity.status,
    );
  }

  static toPersistence(domainEntity: User): UserOrmEntity {
    const ormEntity = new UserOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.login = domainEntity.login;
    ormEntity.password = domainEntity.passwordHash;
    ormEntity.roles = domainEntity.roles;
    ormEntity.status = domainEntity.status;
    return ormEntity;
  }
}
