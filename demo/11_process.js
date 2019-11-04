const { argv, argv0, execArgv, execPath} = process
// 数组，进程启动时的参数数组
argv.forEach((ele) =>{
    console.log(ele)
    // 前两个固定 node xxx.js
    // C:\Program Files\nodejs\node.exe  => 启动node程序的路径
    // E:\XGYCode\代码及相关\jsPang\node_demo\demo\11_process.js  => 启动文件的路径
    // 如果进行文件名后传参 即对启动的文件做配置 node xxx.js a=1 b=2 则会有相应的参数存储进入argv数组
    // a=1 => 第三个
    // b=2 => 第四个
})

// argv 的第一个参数
console.log(argv0)

// node --inspect xxx.js 写在文件名前面的参数，即对node做启动配置参数
console.log(execArgv) // ['--inspect'] 注意这也是一个数组

// execPath node 调用脚本的路径，即node的启动路径
console.log(execPath)