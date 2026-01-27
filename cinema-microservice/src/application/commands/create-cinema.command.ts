export class CreateCinemaCommand {
    constructor(
        public readonly name: string,
        public readonly city: string,
        public readonly address: string
    ){}
}