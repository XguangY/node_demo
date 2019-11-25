// 修改文件名
const fs = require('fs')

fs.rename('./test.js', 'test.txt', (err) => {
    if (err) throw err
    console.log('done!')
})