export declare abstract class Store {
    abstract get(key: string): Promise<string | undefined>;
    abstract set(key: string, value: string): void;
    abstract remove(key: string): Promise<void>;
    abstract _ready: boolean;
}
