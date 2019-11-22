// 异步
const fs = require('fs')
// 需要注意一点 如果操作成功完成，则第一个参数将为 null 或 undefined。
fs.readFile('./08_fs_throw_string.js', 'utf8', (err, data) => {
    //  如果出现错误 通过throw输出
    if (err) throw err
    console.log(111111111)
})

//  同步
const data = fs.readFileSync('./09_fs_sync.js', 'utf8')

console.log(data)

// 打印可以看到同步的方法即使写在后面也会先执行，因为异步的方法是交给i/o去执行的
/**
 * // 异步
    const fs = require('fs')
    // 需要注意一点 如果操作成功完成，则第一个参数将为 null 或 undefined。
    fs.readFile('./08_fs_throw_string.js', 'utf8', (err, data) => {
        //  如果出现错误 通过throw输出
        if (err) throw err
        console.log(111111111)
    })

    //  同步
    const data = fs.readFileSync('./09_fs_sync.js', 'utf8')

    console.log(data)
    111111111
 * 
 */


// 两者都需要读取完文件（或者部分读取）才能返回文件，都是需要等待的，那么两者的区别什么呢
// 对于单独用户使用服务器来说是没有区别的，或者说区别不明显
// 但是web实际场景中是大量的用户在使用，同步会导致前面的用户处理阻挡后面的用户处理。异步则会直接在让其单独等待，继续处理其他，实现了高并发
// 另外所有的api 都有同步的版本，详见node 