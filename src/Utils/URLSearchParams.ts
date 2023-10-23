export function getSearchParam(key:string,url:string = document.location.search) {
    const re = new RegExp('(?:\\?|&)' + key + '=(.*?)(?=&|$)', 'gi');
    let r = [],m;
    while ((m = re.exec(url)) != null) r[r.length] = m[1];
    return r.length ? r[0] : null;
}