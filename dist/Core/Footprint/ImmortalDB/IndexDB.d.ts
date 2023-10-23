import { UseStore } from 'idb-keyval';
import { Store } from "./Store";
declare class IndexedDbStore extends Store {
    store: UseStore;
    constructor(dbName?: string, storeName?: string);
    get(key: string): Promise<string | undefined>;
    set(key: string, value: string): Promise<void>;
    remove(key: string): Promise<void>;
    _ready: boolean;
}
export { IndexedDbStore };
