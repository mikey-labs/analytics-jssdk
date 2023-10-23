//@ts-ignore
import Cookies from 'js-cookie'
import {Store} from "./Store";

const DEFAULT_COOKIE_TTL = 365 // Days.
// If this script is executing in a cross-origin iframe, the cookie must
// be set with SameSite=None and Secure=true. See
// https://web.dev/samesite-cookies-explained/ and
// https://tools.ietf.org/html/draft-west-cookie-incrementalism-00 for
// details on SameSite and cross-origin behavior.
const CROSS_ORIGIN_IFRAME = amIInsideACrossOriginIframe()
const DEFAULT_SECURE = CROSS_ORIGIN_IFRAME;
const DEFAULT_SAME_SITE = (CROSS_ORIGIN_IFRAME ? 'None' : 'Lax')

function amIInsideACrossOriginIframe ():boolean {
    try {
        // Raises ReferenceError if window isn't defined, eg if executed
        // outside a browser.
        //
        // If inside a cross-origin iframe, raises: Uncaught
        // DOMException: Blocked a frame with origin "..." from
        // accessing a cross-origin frame.
        return !Boolean(window?.top?.location.href)
    } catch (err) {
        return true
    }
}

class CookieStore extends Store{
    ttl:number;
    secure:boolean;
    sameSite:string;
    _ready:boolean = false;
    constructor ({
                     ttl = DEFAULT_COOKIE_TTL,
                     secure = DEFAULT_SECURE,
                     sameSite = DEFAULT_SAME_SITE} = {}) {
        super()
        this.ttl = ttl
        this.secure = secure
        this.sameSite = sameSite;
        this._ready = true;
    }

    async get (key:string) {
        const value = Cookies.get(key)
        return typeof value === 'string' ? value : undefined;
    }

    async set (key:string, value:string) {
        Cookies.set(key, value, this._constructCookieParams())
    }

    async remove (key:string) {
        Cookies.remove(key, this._constructCookieParams())
    }

    _constructCookieParams () {
        return {
            expires: this.ttl,
            secure: this.secure,
            sameSite: this.sameSite,
        }
    }
}

export { CookieStore }