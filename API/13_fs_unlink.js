// 删除文件
const fs = require('fs')

fs.unlink('./test.txt', err => {
    if(err) throw err
    console.log('done!')
})