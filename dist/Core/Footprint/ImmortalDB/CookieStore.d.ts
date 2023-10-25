import { Store } from "./Store";
declare class CookieStore extends Store {
    ttl: number;
    secure: boolean;
    sameSite: string;
    _ready: boolean;
    constructor({ ttl, secure, sameSite, }?: {
        ttl?: number | undefined;
        secure?: boolean | undefined;
        sameSite?: string | undefined;
    });
    get(key: string): Promise<string | undefined>;
    set(key: string, value: string): Promise<void>;
    remove(key: string): Promise<void>;
    _constructCookieParams(): {
        expires: number;
        secure: boolean;
        sameSite: string;
    };
}
export { CookieStore };
