//  写一个文件

const fs = require('fs')

fs.writeFile('./test.js', 'test test', {
    encoding: 'utf8'
}, (err) => {
    if (err) throw err
    console.log('done!')
})

//  打印 
// 在本文件价下增加一个test.js文件 内容为 test test
// done! 