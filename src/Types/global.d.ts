import { Command } from "./Command";
import { FuncCnTagManager } from "../Bootstrap";

declare global {
  interface Window {
    ctag: FuncCnTagManager;
    CQueue: Command[];
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
  interface Array<T> {
    __proto__: any;
  }
}
export {}