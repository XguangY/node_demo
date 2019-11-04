// 引用内置模块的方式
// fs 模块是用来读取二进制流

const fs = require('fs')

const result = fs.readFile('./07_fs.js', (err, data) => {
    if(err) {
        console.log(err)
    } else {
        console.log(data)
        // 讲16进制转义为string
        console.log(data.toString())
    }
})

// 读取文件为异步操作，直接打印 undefined
console.log(result)
