import { Configuration } from "../Types/Configuration";
import { Plugin } from "../Types/Plugin";

export function installPlugin(name: string, plugin: Plugin): object {
  return {};
}
export function uninstallPlugin(name: keyof Configuration): boolean {
  return true;
}
