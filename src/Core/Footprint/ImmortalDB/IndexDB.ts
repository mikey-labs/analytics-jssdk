import {
  createStore,
  del as idbRemove,
  get as idbGet,
  set as idbSet,
  UseStore,
} from "idb-keyval";
import { Store } from "./Store";

const DEFAULT_DATABASE_NAME = "ImmortalDB";
const DEFAULT_STORE_NAME = "key-value-pairs";

class IndexedDbStore extends Store {
  store: UseStore;
  constructor(dbName = DEFAULT_DATABASE_NAME, storeName = DEFAULT_STORE_NAME) {
    super();
    this.store = createStore(dbName, storeName);
    this._ready = true;
  }

  async get(key: string) {
    const value = await idbGet(key, this.store);
    return typeof value === "string" ? value : undefined;
  }

  async set(key: string, value: string) {
    await idbSet(key, value, this.store);
  }

  async remove(key: string) {
    await idbRemove(key, this.store);
  }

  _ready: boolean = false;
}

export { IndexedDbStore };
