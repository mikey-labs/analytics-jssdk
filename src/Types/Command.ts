import { PageConfig, WebBaseInfo } from "./BaseInfo";
import { Plugin, PluginOptions } from "./Plugin";
import { Configuration, GlobalConfiguration } from "./Configuration";
import { ICTagContext } from "../Bootstrap/CTagContext";
import { EventEntity, EventType } from "./Events";
import { SetModuleName } from "../Command/CommandSet";

export type FuncOnReady = (ctx: ICTagContext) => void;


export type Command =
  | ["create", string, Configuration?]
  | ["config", Configuration, string?]
  | ["send", EventType, EventEntity, string?]
  | [
      "set",
      SetModuleName,
      Extract<keyof PageConfig, keyof WebBaseInfo> | object | GlobalConfiguration
    ]
  | ["install", typeof Plugin, PluginOptions]
  | [
      "remove",
      string //tracking name
    ]
  | [
      "get",
      string, //plugin name or getter name
      (args: any) => any,
      any?
    ]
  | [FuncOnReady];
