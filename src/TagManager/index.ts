import { Configuration } from "../Types/Configuration";
import { PageConfig } from "../Types/BaseInfo";
import { assignObjectFilterSource } from "../Utils/AssignObjectFilterSource";
import { StayDurationTrigger } from "./Trigger/StayDurationTrigger";
import { TriggerBase } from "./Trigger/TriggerBase";
import { ExceptionReportTrigger } from "./Trigger/ExceptionReportTrigger";
import { ScreenViewTrigger } from "./Trigger/ScreenViewTrigger";
import { LinkClickTrigger } from "./Trigger/LinkClickTrigger";

export type ITagManagerTriggers = {
  stay_duration: TriggerBase;
  exception_report: TriggerBase;
  screen_view: TriggerBase;
};
export interface ITagManager {
  readonly trackingId: string;
  readonly hTime: number;
  triggers: ITagManagerTriggers;
  pageConfig: PageConfig;
  config: Configuration;
  setConfig(config: Configuration): void;
  setPageConfig(pageConfig: PageConfig): void;
  setAutomaticallyData(customData: object): void;
  automaticallyData:{[p:string]:any};
  run(): void;
}
export class TagManager implements ITagManager {
  automaticallyData = {};
  readonly trackingId: string;
  readonly hTime: number = Date.now();
  readonly triggers;
  config: Configuration = {
    stay_duration: true,
    screen_view: true,
    exception_report: false,
    disable: false,
  };
  pageConfig: PageConfig = {
    title:document.title,
    host:location.host,
    path:location.pathname,
    url:location.href,
    referrer:document.referrer
  };
  constructor(trackingId: string, options?: Configuration) {
    this.trackingId = trackingId;
    this.triggers = {
      stay_duration: new StayDurationTrigger(trackingId),
      exception_report: new ExceptionReportTrigger(trackingId),
      screen_view: new ScreenViewTrigger(trackingId),
      link_click:new LinkClickTrigger(trackingId)
    };
    options && (this.config = assignObjectFilterSource(this.config, options));
  }
  setAutomaticallyData(automaticallyData: object) {
    this.automaticallyData = Object.assign(this.automaticallyData,automaticallyData);
  }
  setConfig(config: Configuration) {
    this.config = assignObjectFilterSource(this.config, config);
    this.run(config);
  }
  setPageConfig(pageConfig: PageConfig) {
    this.pageConfig = assignObjectFilterSource(this.pageConfig, pageConfig);
  }
  run(config: Configuration = this.config): void {
    const { stay_duration, exception_report, screen_view, disable } = config;

    if (disable) {
      this.stopAll();
      return;
    }

    if (screen_view) {
      this.triggers.screen_view.start();
    } else {
      this.triggers.screen_view.stop();
    }
    if (stay_duration) {
      this.triggers.stay_duration.start();
    } else {
      this.triggers.stay_duration.stop();
    }
    if (exception_report) {
      this.triggers.exception_report.start();
    } else {
      this.triggers.exception_report.stop();
    }
  }
  stopAll() {
    Object.keys(this.triggers).map((key) => {
      this.triggers[key as keyof ITagManagerTriggers].stop();
    });
  }
}
