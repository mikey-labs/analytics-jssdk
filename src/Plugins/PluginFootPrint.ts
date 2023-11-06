import { ICTagContext } from "../Bootstrap/CTagContext";
import { PluginCore } from "./PluginBase";
import { ImmortalDB, ImmortalStorage } from "../Core/Footprint/ImmortalDB";
import Footprint from "../Core/Footprint";
import { getSearchParam } from "../Utils/URLSearchParams";

export const FOOT_PRINT_KEY = "fp_";
export class PluginFootPrint extends PluginCore {
  static NAME: string = "footprint";
  readonly version: string = "1.0.0";

  private Storage: ImmortalStorage = ImmortalDB;
  constructor(ctx: ICTagContext) {
    super(ctx);
  }
  setup(): this {
    //执行一次 将数据存储到本地
    return this;
  }

  async execute(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const footPrint =
        (await ImmortalDB.get(FOOT_PRINT_KEY)) ||
        getSearchParam(FOOT_PRINT_KEY, window.name) ||
        (await new Footprint({
          canvas: true,
          screenResolution: true,
        }).run());
      window.name = `?${FOOT_PRINT_KEY}=${footPrint}`;
      await this.Storage.set(FOOT_PRINT_KEY, footPrint);
      resolve(footPrint);
    });
  }
}
