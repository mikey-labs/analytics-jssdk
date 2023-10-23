import { Configuration } from "../Types/Configuration";
import { Plugin } from "../Types/Plugin";
export declare function installPlugin(name: string, plugin: Plugin): object;
export declare function uninstallPlugin(name: keyof Configuration): boolean;
