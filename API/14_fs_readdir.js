// 读取文件夹
const fs = require('fs')
fs.readdir('./', (err, files) => {
    if(err) throw err
    // 注意是将所有的下属文件名，置于一个array
    console.log(files)
})