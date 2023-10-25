import { usePageVisibility } from "@zhengxy/use";
import { TriggerBase } from "./TriggerBase";

export class StayDurationTrigger extends TriggerBase {
  time: number;
  private stopper: Function | undefined;
  constructor(trackingId: string) {
    super(trackingId);
    this.time = Date.now();
  }
  stop(): void {
    this.stopper?.();
  }
  start(): void {
    this.stop();
    const { stop } = usePageVisibility((visibility) => {
      if (visibility === "hidden") {
        const timeValue = Date.now() - this.time;
        if (timeValue >= 1000) {
          window.ctag(
            "send",
            "page_timing",
            {
              page_timing_duration: timeValue, //计时时间
            },
            this.trackingId
          );
        }
      } else {
        this.time = Date.now();
      }
    });
    this.stopper = stop;
  }
}
