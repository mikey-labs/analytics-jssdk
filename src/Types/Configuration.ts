export interface Configuration {
  screen_view?: boolean;
  stay_duration?: boolean;
  exception_report?: boolean;
  disable?: boolean;
}
export interface GlobalConfiguration {
  api_secret?: string; //api 密钥
  user_id?: string; //登录用户ID
  api_version?: string;// api版本
  api_host?:string;
}
