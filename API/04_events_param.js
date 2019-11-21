// 引入内置模块 events
const EventEmitter = require('events')

// EventEmitter 继承 events
class myEvent extends EventEmitter{}

// 实例化 myEvent
const ce = new myEvent()

// 监听错误 传入参数
ce.on('error', (err, time) => {
    console.log(err)
    console.log(time)
})
// 触发错误
ce.emit('error', new Error('error111'), Date.now())
// emit首参为触发的函数名称，后续参数均为自定义参数，
/**
 * Error: error111
    at Object.<anonymous> (E:\***\***\$$$\api\04_events_param.js:15:18)
    ...
    at bootstrapNodeJSCore (internal/bootstrap/node.js:739:3)
    1574242863420
 * 
 */