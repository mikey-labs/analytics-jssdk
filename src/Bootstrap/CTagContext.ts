import { Configuration, GlobalConfiguration } from "../Types/Configuration";
import { ITagManager } from "../TagManager";
import { Executor, IExecutor } from "../Command/Executor";
import { CommandCreate } from "../Command/CommandCreate";
import { CommandConfig } from "../Command/CommandConfig";
import { CommandInstall } from "../Command/CommandInstall";
import { CommandRemove } from "../Command/CommandRemove";
import { CommandSend } from "../Command/CommandSend";
import { createCommandQueueProcessor } from "../Command";
import { CommandBase } from "../Command/CommandBase";
import { PluginBase, PluginCore } from "../Plugins/PluginBase";
import { PluginFootPrint } from "../Plugins/PluginFootPrint";
import { CommandGet } from "../Command/CommandGet";
import { CommandSet } from "../Command/CommandSet";
import { PluginMeasurement } from "../Plugins/PluginMeasurement";
import { assignObjectFilterSource } from "../Utils/AssignObjectFilterSource";
import { PluginExposure } from "../Plugins/PluginExposure";
import { BaseInfo } from "../Types/BaseInfo";
import { CommandPlugin } from "../Command/CommandPlugin";
import { PluginTiming } from "../Plugins/PluginTiming";
import { generateSessionId } from "../Utils/GenerateSessionId";

//@ts-ignore
import Cookies from "js-cookie";
import { SessionStorageStore } from "../Core/Footprint/ImmortalDB";

export type PluginDerived = {
  new (options?: any): PluginBase;
} & typeof PluginBase;

type CommandDerived = {
  new (ctx: ICTagContext): CommandBase;
} & typeof CommandBase;

export const DEFAULT_TAG_NAME = "default";
export const SESSION_ID = "ctag_session_id";
export type ICTagContextGetters = {
  [p: string]: any;
  config(trackingId?: string): Configuration;
  instance(trackingId?: string): ITagManager | undefined;
  plugin(name: string): PluginBase;
  globalConfig(): GlobalConfiguration;
  automaticallyData(trackingId?: string): object;
  clientId(): Promise<string>;
  measurement(): Promise<BaseInfo>;
  sessionId(): string;
};

export type ICTagContextSetters = {
  [p: string]: any;
  globalConfig(config: GlobalConfiguration): void;
};

export interface ICTagContext {
  readonly version: string;
  globalConfig: GlobalConfiguration;
  core: {
    plugins: { [p: string]: PluginCore };
  };
  plugins: {
    [p: string]: PluginBase;
  };
  bootstrap(): Promise<this>;
  instances: { [p: string]: ITagManager };
  executor: IExecutor;
  registerCommand(commander: CommandDerived): void;
  registerPlugin(plugin: PluginDerived, options?: any): void;
  getters: ICTagContextGetters;
  setters: ICTagContextSetters;
  autoTasks(): Promise<void>;
  _generateSessionId(): Promise<void>;
  readonly session_id: string;
}

export class CTagContext implements ICTagContext {
  readonly version = "1.0.0";
  session_id: string = "";
  globalConfig: GlobalConfiguration = {
    api_version: "1.0.0",
    api_secret: "",
    user_id: "",
    api_host: "",
    ssid: "",
  };
  instances: { [p: string]: ITagManager } = {};
  core: { plugins: { [p: string]: PluginCore } };
  plugins: { [p: string]: PluginBase } = {};
  executor: IExecutor = new Executor(this);
  constructor() {
    //command init
    this.registerCommand(CommandCreate);
    this.registerCommand(CommandConfig);
    this.registerCommand(CommandInstall);
    this.registerCommand(CommandRemove);
    this.registerCommand(CommandSend);
    this.registerCommand(CommandGet);
    this.registerCommand(CommandSet);
    this.registerCommand(CommandPlugin);

    //add core plugin
    this.core = {
      plugins: {
        [PluginMeasurement.NAME]: new PluginMeasurement(this).setup(),
        [PluginFootPrint.NAME]: new PluginFootPrint(this).setup(),
      },
    };
    //add custom plugin
    this.registerPlugin(PluginExposure);
    this.registerPlugin(PluginTiming);

    //
  }
  async _generateSessionId(): Promise<void> {
    const store = new SessionStorageStore();
    const sessionIdBase64 = await store.get(SESSION_ID);
    if (sessionIdBase64) {
      try {
        this.session_id = atob(sessionIdBase64);
        return;
      } catch (e) {}
    }
    const footPrint = await this.core.plugins[PluginFootPrint.NAME].execute();
    this.session_id = generateSessionId(footPrint);
    await store.set(SESSION_ID, btoa(this.session_id));
  }
  async bootstrap(): Promise<this> {
    await this._generateSessionId();
    await createCommandQueueProcessor(this);
    return this;
  }

  registerPlugin(PluginClass: PluginDerived, options?: any) {
    this.plugins[PluginClass.NAME] = new PluginClass(options);
  }

  registerCommand(CommandClass: CommandDerived) {
    const commander = new CommandClass(this);
    this.executor.addCommand(CommandClass.NAME, commander);
  }

  async autoTasks(): Promise<void> {
    Object.keys(this.instances).map((key) => {
      this.instances[key].run();
    });
  }
  setters = {
    globalConfig: (config: GlobalConfiguration) => {
      this.globalConfig = assignObjectFilterSource(this.globalConfig, config);
    },
  };

  getters = {
    config: (trackingId?: string): Configuration => {
      const instance = this.getters.instance(trackingId);
      if (!instance) {
        throw Error(`Can't find instance tracking ID:${trackingId}`);
      }
      return { ...instance.config };
    },
    instance: (trackingId?: string): ITagManager | undefined => {
      const targetId =
        !trackingId ||
        this.instances[DEFAULT_TAG_NAME]?.trackingId === trackingId
          ? DEFAULT_TAG_NAME
          : trackingId;
      return this.instances[targetId];
    },
    plugin: (name: string) => {
      if (!name) {
        throw Error("The plugin name can not be null!");
      }
      return this.plugins[name];
    },
    globalConfig: (): GlobalConfiguration => {
      return this.globalConfig;
    },
    clientId: async (): Promise<string> => {
      return await this.core.plugins[PluginFootPrint.NAME].execute();
    },
    measurement: async (): Promise<BaseInfo> => {
      return await this.core.plugins[PluginMeasurement.NAME].execute();
    },
    automaticallyData: async (trackingId?: string): Promise<object> => {
      const instance = this.getters.instance(trackingId);
      if (!instance) {
        throw Error(`Can't find instance tracking ID:${trackingId}`);
      }
      return { ...instance.automaticallyData };
    },
    sessionId: (): string => {
      return this.session_id;
    },
  };
}
export async function buildCTagContext() {
  return new CTagContext().bootstrap();
}
