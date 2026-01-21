export class CreateCinemaCommand {
    constructor(
        public readonly name: String,
        public readonly city: String,
        public readonly address: String
    ){}
}