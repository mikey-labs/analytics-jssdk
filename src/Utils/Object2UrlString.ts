export function object2UrlString(obj:{[p:string]:any}) {
    const res:string[] = [];
    return Object.keys(obj).reduce((all,key:string)=>{
        let value:string;
        switch (typeof obj[key]) {
          case "object":
            value = JSON.stringify(obj[key]);
            break;
          case "undefined":
            value = '';
            break;
          default:
            value = obj[key];
        }
        all.push(encodeURIComponent(key) + "=" + encodeURIComponent(value))
        return all;
    },res).join('&');
}