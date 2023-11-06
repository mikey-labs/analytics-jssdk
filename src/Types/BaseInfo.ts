export interface BaseInfo extends WebBaseInfo {
  session_id:string;//会话id
  scene_id?: string;//场景id
  ga_id: string;//ga id
  ip?: string; //ip地址，服务端收集
  referrer: string; //访问来源
  geoid?: string; //地址信息
  resolution?: string; //分辨率
}
export interface WebBaseInfo {
  ua: string; // use agent
  url: string; // 文档网址
  host: string; //主机名
  path: string; //网页路径
  title: string; //网页标题
  page_load_time?: number; //网页加载事件
  dns?: number; //dns查询事件
  page_download_time?: number; //网页下载事件
  redirect_time?: number; // 重定向时间
  tcp?: number; //tcp连接时间
  serve_response_time?: number; //服务器响应时间
  content_load_time?: number; //内容加载时间
  browser_view_type:"desktop" | "mobile" //浏览器视图类型，desktop 或者mobile
}
export interface AppBaseInfo {
  app_name: string; //app名称
  package_name: string; // app 包名
  app_version: string; // app版本
  os_name: string; //系统名称
  device_model: string; //设备名称
  os_version: string; //系统版本
  template_version?: string; // 模版id
}
export interface PageConfig {
  title?: string;
  referrer?: string;
  url?: string;
  path?: string;
  host?: string;
}
