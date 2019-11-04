// 最后执行 全局global 直属的   => 下个队列队首
setImmediate(() => {
    console.log('setImmediate')
})

// 在这两个之间执行
setTimeout(() => {
    console.log('setTimeout')
}, 0)

// 最先执行 在当前队列最后，所以先执行
process.nextTick(() => {
    console.log('nextTick')
})