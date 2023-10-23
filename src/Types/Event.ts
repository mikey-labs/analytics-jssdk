export interface Event {
    event_name:string,// 事件名称
    event_category:string,//事件类别
    event_label:string,//事件标签
    event_action:string,//事件动作
    event_value?:number,//事件权重
}
