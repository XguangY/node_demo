// 异步操作
const fs = require('fs')
// 需要注意一点 如果操作成功完成，则第一个参数将为 null 或 undefined。
fs.readFile('./07_fs_throw_string.js', (err, data) => {
    //  如果出现错误 通过throw输出
    if (err) throw err
    console.log(data)
    // 输出字符串
    console.log(data.toString()) 
})

/**
 * 
 *  PS E:\xxx\xxx\xxx\api> node 07_fs_throw_string.js
    <Buffer 2f 2f 20 20 e8 be 93 e5 87 ba 20 e5 ad 97 e7 ac a6 e4 b8 b2 0d 0a 63 6f 6e 73 74 20 66 73 20 3d 20 72 65 71 75 69 72 65 28 27 66 73 27 29 0d 0a 2f 2f ... >
    //  输出 字符串
    const fs = require('fs')
    // 需要注意一点 如果操作成功完成，则第一个参数将为 null 或 undefined。
    fs.readFile('./07_fs_throw_string.js', (err, data) => {
        //  如果出现错误 通过throw输出
        if (err) throw err
        console.log(data)
        // 输出字符串
        console.log(data.toString())
    })
 */