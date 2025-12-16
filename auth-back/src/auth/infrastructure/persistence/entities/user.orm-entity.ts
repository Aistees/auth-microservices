import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  login: string;

  @Column()
  passwordHash: string;

  @Column()
  role: string[];

  @Column({ default: 'open' })
  status: string;
}
