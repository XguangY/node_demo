### node简单介绍

+ I/O
    - 阻塞I/O : 同步 => 逐条执行
    - 非阻塞I/O： 异步 => 并行
    - node.js: 运行在chrome V8 引擎上的一个使用非阻塞I/O的javascript的runtime

+ 事件驱动

+ node.js 的优点
    - 对于前端，有利于统一体验
    - 高并发，IO密集 性能优越
        * CPU密集： 加密解密，压缩解压，等 => 运算操作密集
        * I/O密集：文件操作，网络操作，数据库操作等  => 读写密集
+ 进程、线程
    - 进程： 是计算机中的程序关于某数据集合上的一次运行活动，是系统进行资源分配和调度的基本单位 => 可以理解为大块任务
            * 多进程： 同时运行多个进程 => 对于单核只能在同一时间点运行一个进程，多进程的实现粗略理解为多个进程的快速切换，类似于逐帧动画
    - 线程： 进程内一个相对独立，可调用的执行单元，于同属于一个进程的线程共享此进程的资源 => 可以理解为子任务
            * 多线程： 用一个进程内同时运行多个线程
    - https://www.cnblogs.com/qianqiannian/p/7010909.html
+ node.js 的单线程
    - 单线程是针对主进程来说的，IO操作交给底层系统多进程运行
    - 并不是单进程，可以使用相关模块调用多进程（每个核心启动一个），完成集群

#### CommonJS 规范
> 规则
+ 每人文件都是一个模块，都存在自己的作用域
+ 在模块内部module变量 => 代表模块本身
+ module.exports属性 => 代表模块对外提供的接口
    - exports 和module.exports的区别
        * exports 是module.exports 的简写
        ```
            //相当于
            const exports = module.exports
            // 其指向不能被改变
            exports = {
                a:1 // undefined 报错，因为改变了指向
            }
            // 就要自定义输出内容, 使用全写
            module.exports = {
                a: 1
            }
      
        ```
### node基本介绍以及使用

+ require => 引用其他模块
    - module 被加载的时候执行，加载后缓存
    - 一但出现模块被循环加载的，就只输出已经执行的部分，还未执行的部分不会输出
> 应用
+ 如何创建一个模块
    - 创建一个文件 => 实现了自己的作用域
    - 编写一些操作，逻辑，数值等
    - 对外抛出
+ 如何引用一个模块
    - / 绝对路径， ./ ../ 相对路径
    - 支持js,json,node扩展名，不写扩展名以此尝试， 均不存就报错
        * 例如 /xxx/index
    - 不写路径则认为是build-in模块或者各级的node_modules内的第三方模块
        * 例如 'vue'
    - 引用内置模块的方式

    ```
    // fs 模块是用来读取二进制流

    const fs = require('fs')

    const result = fs.readFile('./07_fs.js', (err, data) => {
        if(err) {
            console.log(err)
        } else {
            console.log(data)
            // 讲16进制转义为string
            console.log(data.toString())
        }
    })

    // 读取文件为异步操作，直接打印 undefined
    console.log(result)

    ```
    - 引用外部模块
    ```
     const chalk = require('chalk')
    ```
+ global 顶级对象
    - 类比于js 中的window
    - CommonJS
    - Buffer process console  => 其下挂载方法
    - timer => 一系列定时操作
    - 具体
        * 声明对象分为局部以及全局，使用global.XXX 声明的对象为全局对象，其直接挂载在全局global下
+ process  global 挂下的进程
    - process 常用参数 
        ```
        argv => 进程启动时的参数集 是一个数组
        1. 首参 启动node程序的路径
        2. 第二个参数 启动脚本文件的路径
        3. 如果进行文件名后传参 即对启动的文件做配置 node xxx.js a=1 b=2 则会有相应的参数存储进入argv数组
        argv0 => argv 的第一个参数 
        execArgv =>  node --inspect xxx.js 写在文件名前面的参数，即对node做启动配置参数
        execPath => node 调用脚本的路径，即node的启动路径
        ```
    - process 环境
        ```
            const {env} = process
            console.log(env) // 保存了启动环境的配置
        ```
    - process cwd => 注意这个是process的直属方法
        ```
        console.log(process.cwd()) // 当前进程的路径
        ```
    - process timer
        ```
            // 最后执行 全局global 直属的   => 下个队列队首
            setImmediate(() => {
                console.log('setImmediate')
            })
            // 在这两个之间执行
            setTimeout(() => {
                console.log('setTimeout')
            }, 0)
            // 最先执行 在当前队列最后，所以先执行
            process.nextTick(() => {
                console.log('nextTick')
            })
        ```
#### 关于node 调试

+ chrome://insprct 路径  => 需要科学上网
+ 使用IDE调试
    - vs Code
        * 编辑launch.json
        * 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387