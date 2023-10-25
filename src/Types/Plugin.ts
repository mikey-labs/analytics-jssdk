export interface Plugin {
  name: string;
  setup(): void | Promise<void>;
}
export interface PluginOptions {
  version: string;
}
