import { Store } from "./Store";
declare class StorageApiWrapper extends Store {
    store: Storage;
    _ready: boolean;
    constructor(store: Storage);
    get(key: string): Promise<string | undefined>;
    set(key: string, value: string): Promise<void>;
    remove(key: string): Promise<void>;
}
declare class LocalStorageStore extends StorageApiWrapper {
    constructor();
}
declare class SessionStorageStore extends StorageApiWrapper {
    constructor();
}
export { LocalStorageStore, SessionStorageStore };
