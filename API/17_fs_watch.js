// 监视文件变化，处理文件中非常有用
const fs = require('fs')
// 回调函数一参数为改变的类型，二参数为改变的文件
// recursive 回调监听子文件夹；
// fs.watch 的 API 在各个平台上并非 100％ 一致，在某些情况下不可用。仅在 macOS 和 Windows 上支持 recursive 选项
fs.watch('./',
{recursive: true},
(eventType, filename) => {
    console.log(eventType, filename)
})