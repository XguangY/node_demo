// events（事件触发器）
/**
 * 所有能触发事件的对象都是 EventEmitter 类的实例。  
 * 事件的命名通常是驼峰式的字符串，但也可以使用任何有效的 JavaScript 属性键。
 * EventEmitter 对象触发一个事件时，所有绑定在该事件上的函数都会被同步地调用。 被调用的监听器返回的任何值都将会被忽略并丢弃。 
 */

// events 属于内置模块
//  eventEmitter.on() 用于注册监听器， eventEmitter.emit() 用于触发事件
const EventEmitter = require('events')

// 继承EventEmitter 类
class myEvent extends EventEmitter{}

const myEventClick = new myEvent()

myEventClick.on('myClick',()=> {
    console.log('Click')
})

setInterval(() => {
    myEventClick.emit('myClick')
}, 1000)