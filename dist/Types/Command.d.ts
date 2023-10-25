import { PageConfig, WebBaseInfo } from "./BaseInfo";
import { PluginOptions } from "./Plugin";
import { Configuration } from "./Configuration";
import { ICTagContext } from "../Bootstrap/CTagContext";
import { EventEntity, EventType } from "./Events";
export type FuncOnReady = (ctx: ICTagContext) => void;
export type Command = ["create", string, Configuration?] | ["config", Configuration, string?] | ["send", EventType, EventEntity, string?] | [
    "set",
    keyof PageConfig,
    Extract<keyof PageConfig, keyof WebBaseInfo>
] | ["install", typeof Plugin, PluginOptions] | [
    "remove",
    string
] | [
    "get",
    string,
    (args: any) => any,
    any?
] | [FuncOnReady];
