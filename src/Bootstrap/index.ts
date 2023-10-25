import { Command } from "../Types/Command";
import { buildCTagContext, ICTagContext } from "./CTagContext";
import { getSearchParam } from "../Utils/URLSearchParams";
import { Configuration } from "../Types/Configuration";
import {useEventListener} from "@zhengxy/use";

export interface FuncCnTagManager {
  (...arg: Command): void; // 命令函数
  ctx: ICTagContext;
  q: Command[];
}
window.ctag.q=window.ctag.q||[];
window.ctag=window.ctag||function(...args:Command){window.ctag.q.push(args)};
if (document.currentScript) {
  const currentSrc = (document.currentScript as HTMLScriptElement).src;
  if (currentSrc) {
    const trackingId = getSearchParam("id", currentSrc);
    if (trackingId) {
      //script 配置参数
      const options: Configuration = {};
      ["screen_view", "stay_duration", "exception_report", "disable"].map(
        (key) => {
          try {
            const value = getSearchParam(key, currentSrc);
            if (value) options[key as keyof Configuration] = JSON.parse(value);
          } catch (e) {
            throw Error(`The param [${key}]'s value is not boolean type!`);
          }
        }
      );
      window.ctag.q.unshift(["create", trackingId, options]);
    }
  }
}



useEventListener(window,'load',()=>{
  buildCTagContext().then((ctx) => {
    window.ctag.ctx = ctx;
    ctx.autoTasks();
  });
})


