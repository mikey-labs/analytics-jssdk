export function createArrayAddWatcher(array:Array<any>,callback:(value:any)=>void) {
    const ArrayExtender = Object.create(Array.prototype);
    ArrayExtender.push = function (...arg:any[]) {
        Array.prototype.push.apply(this,arg);
        callback(arg);
    }
    array.__proto__ = ArrayExtender;
}



