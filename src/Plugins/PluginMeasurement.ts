import { ICTagContext } from "../Bootstrap/CTagContext";
import { PluginCore } from "./PluginBase";
import { BaseInfo } from "../Types/BaseInfo";
import Footprint from "../Core/Footprint";
import { CookieStore } from "../Core/Footprint/ImmortalDB";
import { isMobile } from "@zhengxy/use";

export class PluginMeasurement extends PluginCore {
  static NAME: string = "measurement";
  readonly version: string = "1.0.0";
  constructor(ctx: ICTagContext) {
    super(ctx);
  }
  setup(): this {
    return this;
  }

  async execute(): Promise<BaseInfo> {
    const entity =
      typeof window.performance.getEntriesByType === "function"
        ? window.performance.getEntriesByType("navigation")[0]
        : null;
    const performanceInfo = (entity ||
      window.performance.timing) as PerformanceNavigationTiming;
    const {
      domainLookupEnd,
      domainLookupStart,
      connectEnd,
      connectStart,
      redirectStart,
      redirectEnd,
      responseStart,
      responseEnd,
      requestStart,
      domContentLoadedEventEnd,
      domContentLoadedEventStart,
      startTime,
      loadEventEnd,
    } = performanceInfo;
    return {
      session_id: this.ctx.getters.sessionId(),
      ga_id: (await new CookieStore().get("_ga")) || "",
      ua: navigator.userAgent,
      referrer: document.referrer,
      resolution: Footprint.getScreenResolution()?.join("x"),
      url: location.href,
      geoid: "",
      host: location.host,
      path: location.pathname,
      title: document.title,
      page_load_time: loadEventEnd - (startTime || 0),
      page_download_time: responseEnd - responseStart, //响应到响应完成时间
      redirect_time: redirectEnd - redirectStart,
      tcp: connectEnd - connectStart,
      dns: domainLookupEnd - domainLookupStart,
      serve_response_time: responseStart - requestStart, //请求到开始响应时间
      content_load_time: domContentLoadedEventEnd - domContentLoadedEventStart,
      browser_view_type: isMobile ? "mobile" : "desktop",
    };
  }
}
