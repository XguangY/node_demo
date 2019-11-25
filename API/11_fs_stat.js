// fs.Stats 对象提供了关于文件的信息
const fs = require('fs')

fs.stat('./11_fs_stat.js',(err, stats) => {
    if (err) throw err
    console.log(stats.isFile()) // 是否为文件 true
    console.log(stats.isDirectory()) // 是否为文件夹 false
    console.log(stats) // 所有信息 ...
})

// stats对象的使用技巧 判断一个文件是不是存在
fs.stat('./11111_fs_stat.js',(err, stats) => {
    if (err) {
        // 只要报错，那么就说明文件不存在
        console.log('文件不存在，以及其他业务逻辑')
        return
    }
})