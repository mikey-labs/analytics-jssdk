import { CookieStore } from './CookieStore';
import { IndexedDbStore } from './IndexDB';
import { LocalStorageStore, SessionStorageStore } from './WebStorage';
import { Store } from "./Store";
declare const DEFAULT_KEY_PREFIX = "_immortal|";
declare const DEFAULT_STORES: Store[];
declare class ImmortalStorage extends Store {
    stores: Store[];
    constructor();
    get(key: string): Promise<string | undefined>;
    set(key: string, value: string): Promise<string>;
    remove(key: string): Promise<void>;
    _ready: boolean;
}
declare const ImmortalDB: ImmortalStorage;
export { ImmortalDB, ImmortalStorage, CookieStore, IndexedDbStore, LocalStorageStore, SessionStorageStore, DEFAULT_STORES, DEFAULT_KEY_PREFIX, };
