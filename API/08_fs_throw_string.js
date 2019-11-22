// 异步操作
const fs = require('fs')
// 需要注意一点 如果操作成功完成，则第一个参数将为 null 或 undefined。
fs.readFile('./08_fs_throw_string.js', 'utf8', (err, data) => {
    //  如果出现错误 通过throw输出
    if (err) throw err
    console.log(data)
})

// 输出
// const fs = require('fs')
// // 需要注意一点 如果操作成功完成，则第一个参数将为 null 或 undefined。
// fs.readFile('./08_fs_throw_string.js', 'utf8', (err, data) => {
//     //  如果出现错误 通过throw输出
//     if (err) throw err
//     console.log(data)
// })