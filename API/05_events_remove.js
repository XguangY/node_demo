const EventEmitter = require('events')
class myEvent extends EventEmitter{}
const ce = new myEvent()

// 事件1
function fn1() {
    console.log('fn1')
}
// 事件2
function fn2() {
    console.log('fn2')
}
// 需注意监听同一个事件，可同时触发多个函数
ce.on('click', fn1)
ce.on('click', fn2)

setInterval(() => {
    // 触发myClick
    ce.emit('click')
}, 500)

setInterval(() => {
    // 触发myClick
    ce.removeListener('click', fn2)
    // 全部移除 只需要传入监听的事件名
    // ce.removeAllListeners('click')
}, 1500)
// 打印 可以再一定时段后不再打印fn2，说明已经被移除监听
/**
 * fn1
 * fn2
 * fn1
 * fn2
 * fn1
 * fn1
 * fn1
 * fn1
 */