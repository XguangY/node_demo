// 先来一个简单的例子，读文件

const fs = require('fs')
// 需要注意一点 如果操作成功完成，则第一个参数将为 null 或 undefined。
fs.readFile('./06_fs.js', (err, data) => {
    //  如果出现错误 通过throw输出
    if (err) throw err
    console.log(data) 
})
// 打印 二进制 一个buf
/**
 * PS E:\xxx\ccc\aaa\api> node 06_fs.js
    <Buffer 2f 2f 20 e6 89 80 e6 9c 89 e6 96 87 e4 bb b6 e7 b3 bb e7 bb 9f e6 93 8d e4 bd 9c e9 83 bd e5 85 b7 e6 9c 89 e5 90 8c e6 ad a5 e5 92 8c e5 bc 82 e6 ad ... >
 */
