import {Command} from "../Types/Command";
import {buildCTagContext, ICTagContext} from "./CTagContext";
import {getSearchParam} from "../Utils/URLSearchParams";
import {Configuration} from "../Types/Configuration";

export interface FuncCnTagManager {
    (...arg:Command): void;// 命令函数
    ctx:ICTagContext
}

window.CQueue = window.CQueue || [];

if(document.currentScript){
    const currentSrc = (document.currentScript as HTMLScriptElement).src;
    if(currentSrc){
        const trackingId = getSearchParam("id",currentSrc);
        if(trackingId){//script 配置参数
            const options:Configuration = {};
            ["screen_view","stay_duration","exception_report","disable"].map(key=>{
                try {
                    const value = getSearchParam(key,currentSrc);
                    if(value)options[key as keyof Configuration] = JSON.parse(value);
                } catch (e){
                    throw Error(`The param [${key}]'s value is not boolean type!`);
                }
            })
            window.CQueue.unshift(["create",trackingId,options])
        }
    }
}

window.ctag = window.ctag || function ctag(...args:Command) {
    window.CQueue.push(args);
}

buildCTagContext().then((ctx)=>{
    window.ctag.ctx = ctx;
    ctx.autoTasks()
})
