import { CookieStore } from "./CookieStore";
import { IndexedDbStore } from "./IndexDB";
import { LocalStorageStore, SessionStorageStore } from "./WebStorage";
import { Store } from "./Store";

const DEFAULT_KEY_PREFIX = "_immortal|";

// Stores must implement asynchronous constructor, get(), set(), and
// remove() methods.
const DEFAULT_STORES: Store[] = [new CookieStore()];
try {
  if (window.localStorage) {
    DEFAULT_STORES.push(new LocalStorageStore());
  }
} catch (err) {}
try {
  if (window.sessionStorage) {
    DEFAULT_STORES.push(new SessionStorageStore());
  }
} catch (err) {}
try {
  if (window.indexedDB) {
    const indexedDB = new IndexedDbStore();
    DEFAULT_STORES.push(indexedDB);
  }
} catch (err) {
  console.log(err);
}

class ImmortalStorage extends Store {
  stores: Store[] = DEFAULT_STORES;
  constructor() {
    super();
    this._ready = this.stores.every((store) => store._ready);
  }
  async get(key: string) {
    const prefixedKey = `${DEFAULT_KEY_PREFIX}${key}`;

    const values = (
      await Promise.all(
        this.stores.map(async (store) => {
          try {
            return await store.get(prefixedKey);
          } catch (err) {
            console.log(err);
          }
        })
      )
    ).filter((item) => !!item);

    const value = values[0];
    if (value !== undefined) {
      await this.set(key, value);
      return value;
    } else {
      await this.remove(key);
      return void 0;
    }
  }

  async set(key: string, value: string) {
    key = `${DEFAULT_KEY_PREFIX}${key}`;
    await Promise.all(
      this.stores.map(async (store) => {
        try {
          await store.set(key, value);
        } catch (err) {
          console.log(err);
        }
      })
    );
    return value;
  }

  async remove(key: string) {
    key = `${DEFAULT_KEY_PREFIX}${key}`;

    await Promise.all(
      this.stores.map(async (store) => {
        try {
          await store.remove(key);
        } catch (err) {
          console.log(err);
        }
      })
    );
  }

  _ready: boolean = false;
}

const ImmortalDB = new ImmortalStorage();

export {
  ImmortalDB,
  ImmortalStorage,
  CookieStore,
  IndexedDbStore,
  LocalStorageStore,
  SessionStorageStore,
  DEFAULT_STORES,
  DEFAULT_KEY_PREFIX,
};
