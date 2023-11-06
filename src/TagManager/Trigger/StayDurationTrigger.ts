import { TriggerBase } from "./TriggerBase";
import { StayDuration } from "../../Plugins/PluginTiming";

export class StayDurationTrigger extends TriggerBase {
  time: number;
  private stayDuration = new StayDuration();
  constructor(trackingId: string) {
    super(trackingId);
    this.time = Date.now();
  }
  stop(): void {
    this.stayDuration.stop();
  }
  start(): void {
    this.stop();
    this.stayDuration.start((timeValue) => {
      window.ctag(
        "send",
        "duration",
        {
          stay: timeValue, //计时时间
        },
        this.trackingId
      );
    });
  }
}
