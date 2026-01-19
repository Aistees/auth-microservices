import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("users")
export class UserOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @Column({ default: "ROLE_USER" })
  roles: string[];

  @Column({ default: "open" })
  status: string;

  @Column({ default: Date.now() })
  createdAt: Date ;

  @Column({ default: Date.now() })
  updatedAt: Date ;
}
