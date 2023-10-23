import {Store} from "./Store";

class StorageApiWrapper extends Store{
    store:Storage;
    _ready:boolean = false;
    constructor (store:Storage) {
        super()
        this.store = store;
        this._ready = true;
    }

    async get (key:string) {
        const value = this.store.getItem(key);
        return  value || undefined;
    }

    async set (key:string, value:string) {
        this.store.setItem(key, value)
    }

    async remove (key:string) {
        this.store.removeItem(key)
    }
}

class LocalStorageStore extends StorageApiWrapper {
    constructor () {
        super(window.localStorage)
    }
}

class SessionStorageStore extends StorageApiWrapper {
    constructor () {
        super(window.sessionStorage)
    }
}

export { LocalStorageStore, SessionStorageStore }