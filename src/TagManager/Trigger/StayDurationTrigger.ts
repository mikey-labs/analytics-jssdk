import {usePageVisibility} from "@zhengxy/use";
import {TriggerBase} from "./TriggerBase";

export class StayDurationTrigger extends TriggerBase {
  time: number;
  private stopper:Function | undefined;
  constructor(trackingId: string) {
    super(trackingId);
    this.time = Date.now();
  }
  stop(): void {
    this.stopper?.()
  }
  start():void {
    this.stop();
    const { stop } = usePageVisibility((visibility) => {
      if (visibility === "hidden") {
        const timeValue = Date.now() - this.time;
        if (timeValue >= 1000) {
          window.CQueue.push([
            "send",
            "timing",
            {
              timing_category: "page view", //计时类别
              timing_var: "time", //计时变量
              timing_value: timeValue, //计时时间
              timing_label: "stay duration", //计时标签
            },
            this.trackingId,
          ]);
        }
      } else {
        this.time = Date.now();
      }
    });
    this.stopper = stop;
  }
}