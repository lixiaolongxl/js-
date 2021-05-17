//单例模式1
function Single(){
    if(typeof Single.instance === 'object'){
        return Single.instance
    }
    Single.instance = this;
    return this;
}
var a = new Single();
var b = new Single();
console.log(a===b)

//单例模式 2利用惰性函数实现 实例保存在闭包里
function Single1(){
    var instance = this;
    Single1 = function() {    // 重写构造函数
        return instance
    }
}

var a1 = new Single1();
var b2 = new Single1();
console.log(a1===b2)
//3. 惰性单例
let lazySingle = (()=>{
    let instance;
    function cons(){

    }
    return ()=> instance || (instance = new cons())

})();

var c = lazySingle();
var d = lazySingle();
console.log(c===d);