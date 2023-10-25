import {LinkClickEvent} from "./LinkClickEvent";
import {ScreenView} from "./ScreenView";
import {Share} from "./Share";
import {Timing} from "./Timing";
import {Exception} from "./Exception";
import {Search} from "./Search";
import {FirstOpen} from "./FirstOpen";

export type EventType =
    | "screen_view"
    | "exception"
    | "click"
    | "first_open"
    | "search"
    | "share"
    | "page_timing"
export type EventEntity =
    | LinkClickEvent
    | ScreenView
    | Share
    | Timing
    | Exception
    | Search
    | FirstOpen
    | { [p: string]: any };