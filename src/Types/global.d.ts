import { FuncCnTagManager } from "../Bootstrap";

declare global {
  interface Window {
    ctag: FuncCnTagManager;
    webkitOfflineAudioContext: OfflineAudioContext;
    openDatabase: Function;
  }

  interface NavigatorLanguage {
    deviceMemory: string;
    cpuClass: string;
    readonly language: string;
    readonly languages: ReadonlyArray<string>;
    readonly userLanguage: ReadonlyArray<string>;
    readonly browserLanguage: ReadonlyArray<string>;
    readonly systemLanguage: ReadonlyArray<string>;
  }

  interface HTMLElement {
    addBehavior: any;
  }

  interface Element {
    msMatchesSelector: (selector: string) => boolean;
  }
  interface Array<T> {
    __proto__: any;
  }
}
export {};
