export class RegisterCommand {
    constructor(
        public readonly login: string,
        public readonly password: string,
        public readonly roles: string[],
        public readonly status: string,
    ) { }
}
