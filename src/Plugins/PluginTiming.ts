import { PluginBase } from "./PluginBase";
import { usePageVisibility } from "@zhengxy/use";
import * as Visibility from "visibilityjs";
export class PluginTiming extends PluginBase {
  static NAME: string = "duration";
  readonly version: string = "1.0.0";
  constructor() {
    super();
  }
  stay(callback: (timeDuration: number) => void): void {
    new StayDuration().start(callback);
  }
}
export class StayDuration {
  time: number;
  private stopper: Function | undefined;
  constructor() {
    this.time = Date.now();
  }
  stop(): void {
    this.stopper?.();
  }
  start(callback:(timeDuration:number)=>void): void {
    this.stop();
    let timer:number,counter = 0,listener:number;
    const timerHandler = ()=>{
      counter += 1000;
      timer = setTimeout(timerHandler,1000);
    }
    timer = setTimeout(timerHandler,1000);

    const handler = () => {
      if (Visibility.hidden()) {
        if (counter >= 1000) {
          callback(counter);
        }
      }
      counter = 0;
    }
    if(Visibility.isSupported()){
      listener = Number(Visibility.change(handler));
    }

    window.onbeforeunload = ()=>{
      handler();
      clearTimeout(timer);
    }
    this.stopper = ()=>{
      Visibility.unbind(Number(listener));
      clearTimeout(timer);
      window.onbeforeunload = null;
    };
  }
}
