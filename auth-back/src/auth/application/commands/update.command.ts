import { User } from "src/auth/domain/entities/user.entity";

export class UpdateCommand {
    constructor(
        public readonly targetUserId: string,
        public readonly updates: Partial<User>,
        public readonly requesterId: string,
    ) { }
}
