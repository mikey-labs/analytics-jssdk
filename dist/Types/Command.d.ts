import { Event } from "./Event";
import { ScreenView } from "./ScreenView";
import { Social } from "./Social";
import { Timing } from "./Timing";
import { Exception } from "./Exception";
import { BaseInfoConfig, WebBaseInfo } from "./BaseInfo";
import { PluginOptions } from "./Plugin";
import { Configuration } from "./Configuration";
import { ICTagContext } from "../Bootstrap/CTagContext";
export type FuncOnReady = (ctx: ICTagContext) => void;
export type EventType = "screen_view" | "event" | "social" | "timing" | "exception";
export type EventEntity = Event | ScreenView | Social | Timing | Exception | {
    [p: string]: any;
};
export type Command = [
    "create",
    string,
    Configuration?
] | [
    "config",
    Configuration,
    string?
] | [
    "send",
    EventType,
    EventEntity,
    string?
] | [
    "set",
    keyof BaseInfoConfig,
    Extract<keyof BaseInfoConfig, keyof WebBaseInfo>
] | [
    "install",
    typeof Plugin,
    PluginOptions
] | [
    "remove",
    string
] | [
    "get",
    string,
    (args: any) => any,
    any?
] | [
    FuncOnReady
];
