// 装饰器模式  面向切面编程

/*
    1. 定义
        以动态地给某个对象添加一些额外的职责，而不会影响从这个类中派生的其他对象。
        是一种“即用即付”的方式，能够在不改变对 象自身的基础上，在程序运行期间给对象动态地 添加职责
    2. 核心

        是为对象动态加入行为，经过多重包装，可以形成一条装饰链

    3. 实现
*/
//方法一 使用面向对象的方式  可以使用传统面向对象的方法来实现装饰，添加技能

function Person(){

}

Person.prototype.skill = function(){
    console.log('数学')
}
//
function MusicDecorator(person) {
    this.person = person;
}
MusicDecorator.prototype.skill  = function (){
    this.person.skill();
    console.log('音乐')
}
// 装饰器，还会跑步
function RunDecorator(person) {
    this.person = person;
}

RunDecorator.prototype.skill = function() {
    this.person.skill();
    console.log('跑步');
};

var person = new Person();

// 装饰一下
var person1 = new MusicDecorator(person);
person1 = new RunDecorator(person1);

person1.skill();
console.log('>>>>>>>>>>>>>>>>>>')

//方法二 函数为一等对象，所以我们也可以使用更通用的装饰函数



function decoratorBefore(fn, beforeFn) {
   
    return function() {
        
        var ret = beforeFn.apply(this, arguments);
        
        // 在前一个函数中判断，不需要执行当前函数
        if (ret !== false) {
            fn.apply(this, arguments);
        }
    };
}


function skill() {
    console.log('数学');
}

function skillMusic() {
    console.log('音乐');
    
}

function skillRun() {
    console.log('跑步');
}

var skillDecorator = decoratorBefore(skill, skillMusic);
skillDecorator = decoratorBefore(skillDecorator, skillRun);

skillDecorator(); // 跑步 音乐 数学

