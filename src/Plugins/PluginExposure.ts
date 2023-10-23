import { PluginBase } from "./PluginBase";
import Exposure from "@zhengxy/exposure";
import {IElement} from "@zhengxy/exposure/dist/Types";

export class PluginExposure extends PluginBase {
  static NAME: string = "exposure";
  readonly version: string = "1.0.0";
  readonly exposure = new Exposure();
  constructor() {
    super()
  }
  observe(el:IElement,callback:(isIntersecting:boolean,stop:Function)=>void): void {
    let timer:number;
    //如果曝光时间大于500ms才进行曝光
    this.exposure.observe(el,(isIntersecting:boolean,stop:Function)=>{
      if(isIntersecting){
        timer = setTimeout(()=>{
          callback(isIntersecting,stop);
        },500);
      } else {
        clearTimeout(timer);
        callback(isIntersecting,stop);
      }
    });
  }
}
