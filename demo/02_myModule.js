// module 初体验

// 定义一个变量
let testVar = 'test'
// 定义一个函数
function test() {
    console.log(testVar)
}

// 向外暴露
module.exports.testVar = testVar
module.exports.testFn = test