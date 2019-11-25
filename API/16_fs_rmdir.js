// s删除文件夹
const fs = require('fs')
// 不写回调函数
// fs.rmdir('./test')
/**
 * 报错
 * fs.js:137
    throw new ERR_INVALID_CALLBACK();
    ^

    TypeError [ERR_INVALID_CALLBACK]: Callback must be a function
 */
// 一部不写回调函数会报一个警告，但是在后续的版本中会报错，异步均需要编写回调函数
// fs.rmdir('./test', err => {}) 推荐
fs.rmdir('./test', err => {})