import { Command } from "../Types/Command";
import { buildCTagContext, ICTagContext } from "./CTagContext";
import { getSearchParam } from "../Utils/URLSearchParams";
import { Configuration } from "../Types/Configuration";

export interface FuncCnTagManager {
  (...arg: Command): void; // 命令函数
  ctx: ICTagContext;
  q: Command[];
  ad: object | undefined;
}
window.ctag.q = window.ctag.q || [];
window.ctag =
  window.ctag ||
  function (...args: Command) {
    window.ctag.q.push(args);
  };
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
      const command: Command[] = [["create", trackingId, options]];
      if (window.ctag.ad && typeof window.ctag.ad === "object") {
        command.push(["set", "auto", window.ctag.ad]);
      }
      window.ctag.q.unshift(...command);
    }
  }
}

try {
  buildCTagContext().then((ctx) => {
    window.ctag.ctx = ctx;
    ctx.autoTasks();
  });
} catch (e) {
  throw e;
}
