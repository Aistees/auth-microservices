export abstract class HashingServicePort {
    abstract hash(plainText: string): Promise<string>;

    abstract compare(plainText: string, hashed: string): Promise<boolean>;
}
