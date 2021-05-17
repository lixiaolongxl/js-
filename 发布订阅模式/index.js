//es6 手写实现发布订阅模式
class Event {
    constructor() {
        //初始化订阅列表
        this.list = new Map();
    }
    //添加订阅
    add(name, fu) {
        //
        if (!this.list.has(name)) this.list.set(name, []);
        this.list.get(name).push(fu);
    }
    //trigger 触发订阅事件
    trigger(name, ...arg) {
        let fns = this.list.get(name);
        if (!fns) return;
        if (fns.length > 0) {
            fns.forEach(func => {
                func.apply(this, arg)
            })
        }
    }
    //删除你的订阅
    remove(name, callback) {
        let fus = this.list.get(name);
        if (!fns) return;
        if (fns.length > 0) {
            this.list.set(name, fus.filter(func => {
                return func !== callback;
            }))
        }
    }
    //让你的订阅只执行一次
    once(name, callback){
        //在one函数运行原来的函数，只有将one清空
        function on(){
            callback.apply(this, arguments);
            //先绑定 执行后再删除
            this.remove(name, callback)
        }
        this.add(name, on)
    }
}

var store = new Event();

store.add('订阅',(a)=>{
    console.log(`订阅事件执行了${a}`)
})

store.add('订阅',(a,b)=>{
    console.log(`订阅事件执行了${a} ${b}`)
})

store.add('订阅',(a,b,c)=>{
    console.log(`订阅事件执行了${a} ${b} ${c}`)
})

store.trigger('订阅',1,2,3);