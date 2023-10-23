export interface BaseInfo extends WebBaseInfo {
    scene_id?: string;
    ga_id: string;
    ip?: string;
    referrer: string;
    geoid?: string;
    resolution?: string;
}
export interface WebBaseInfo {
    ua: string;
    url: string;
    host: string;
    path: string;
    title: string;
    page_load_time?: number;
    dns?: number;
    page_download_time?: number;
    redirect_time?: number;
    tcp?: number;
    serve_response_time?: number;
    content_load_time?: number;
}
export interface AppBaseInfo {
    app_name: string;
    package_name: string;
    app_version: string;
    os_name: string;
    device_model: string;
    os_version: string;
    template_version?: string;
}
export interface BaseInfoConfig {
    title?: string;
    referrer?: string;
    url?: string;
    path?: string;
    host?: string;
}
