import { Configuration, GlobalConfiguration } from "../Types/Configuration";
import { ITagManager } from "../TagManager";
import { IExecutor } from "../Command/Executor";
import { CommandBase } from "../Command/CommandBase";
import { PluginBase, PluginCore } from "../Plugins/PluginBase";
import { BaseInfo } from "../Types/BaseInfo";
export type PluginDerived = {
    new (options?: any): PluginBase;
} & typeof PluginBase;
type CommandDerived = {
    new (ctx: ICTagContext): CommandBase;
} & typeof CommandBase;
export declare const DEFAULT_TAG_NAME = "default";
export type ICTagContextGetters = {
    [p: string]: any;
    config(trackingId?: string): Configuration;
    instance(trackingId?: string): ITagManager | undefined;
    plugin(name: string): PluginBase;
    globalConfig(): GlobalConfiguration;
    customData(trackingId?: string): object;
    clientId(): Promise<string>;
    measurement(): Promise<BaseInfo>;
};
export type ICTagContextSetters = {
    [p: string]: any;
    globalConfig(config: GlobalConfiguration): void;
};
export interface ICTagContext {
    readonly version: string;
    globalConfig: GlobalConfiguration;
    core: {
        plugins: {
            [p: string]: PluginCore;
        };
    };
    plugins: {
        [p: string]: PluginBase;
    };
    bootstrap(): Promise<this>;
    instances: {
        [p: string]: ITagManager;
    };
    executor: IExecutor;
    registerCommand(commander: CommandDerived): void;
    registerPlugin(plugin: PluginDerived, options?: any): void;
    getters: ICTagContextGetters;
    setters: ICTagContextSetters;
    autoTasks(): void;
}
export declare class CTagContext implements ICTagContext {
    readonly version = "1.0.0";
    globalConfig: GlobalConfiguration;
    instances: {
        [p: string]: ITagManager;
    };
    core: {
        plugins: {
            [p: string]: PluginCore;
        };
    };
    plugins: {
        [p: string]: PluginBase;
    };
    executor: IExecutor;
    constructor();
    bootstrap(): Promise<this>;
    registerPlugin(PluginClass: PluginDerived, options?: any): void;
    registerCommand(CommandClass: CommandDerived): void;
    autoTasks(): void;
    setters: {
        globalConfig: (config: GlobalConfiguration) => void;
    };
    getters: {
        config: (trackingId?: string) => Configuration;
        instance: (trackingId?: string) => ITagManager | undefined;
        plugin: (name: string) => PluginBase;
        globalConfig: () => GlobalConfiguration;
        clientId: () => Promise<string>;
        measurement: () => Promise<BaseInfo>;
        customData: (trackingId?: string) => Promise<object>;
    };
}
export declare function buildCTagContext(): Promise<CTagContext>;
export {};
