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
            // 在这两个之间执行 也是global直属的
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


### node 常用API

+ 内置模块path
    - 模块提供用于处理文件路径和目录路径的实用工具
    - path 模块的默认操作因 Node.js 应用程序运行所在的操作系统而异。 具体来说，当在 Windows 操作系统上运行时， path 模块将假定正在使用 Windows 风格的路径。因此，使用 path.basename() 可能会在 POSIX 和 Windows 上产生不同的结果
        * path.normalize() 方法规范化给定的 path，解析 '..' 和 '.' 片段
        * path.join() 方法使用平台特定的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。（处理了上下级关系等）
        * path.resolve() 方法将路径或路径片段的序列解析为绝对路径。
        * path.basename() 方法返回 path 的最后一部分，类似于 Unix 的 basename 命令。 尾部的目录分隔符将被忽略
        * path.dirname() 方法返回 path 的目录名，类似于 Unix 的 dirname 命令。 尾部的目录分隔符将被忽略
        * path.extname() 方法返回 path 的扩展名，从最后一次出现 .（句点）字符到 path 最后一部分的字符串结束
        * path.parse() 方法返回一个对象，其属性表示 path 的重要元素。 尾部的目录分隔符将被忽略
        * path.format() 与 path.parse() 行为相反
        * 提供平台特定的路径片段分隔符：
        ```
            Windows 上是 \。
            POSIX 上是 /。
        ```
        * 提供平台特定的路径定界符：
        ```
            ; 用于 Windows
            : 用于 POSIX
        ```
        * path.win32 属性提供对特定于 Windows 的 path 方法的实现的访问
        * path.posix 属性提供对 path 方法的 POSIX 特定实现的访问。
    - 特殊注意
        * 关于path: _dirname _filename 总是返回文件的绝对路径
        * 关于path: process.cwd() 总是返回node命令执行的路径（调用node的路径)
        * require 方法的路径总是相对于当前文件

+ Buffer => 缓冲器
    - Buffer 类是作为 Node.js API 的一部分引入的，用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互
    - Buffer 是用来处理二进制数据流的
    - Buffer 实例类似于整数数组，但是其长度大小固定
    - Buffer c++ 在V8堆外分配的物理内存
    - Buffer 是一个全局变量，直接挂载在global下
    - 一些Buffer 的静态属性和方法:
    - Buffer.alloc()
        * Buffer.alloc(10) 第一个参数为长度，不填内容（第二个参数），即用 0 填充 <Buffer 00 00 00 00 00 00 00 00 00 00>
        * Buffer.alloc(10, 1) 第二参数为填充内容 <Buffer 01 01 01 01 01 01 01 01 01 01>
    - Buffer.allocUnsafe(10)
        * 创建一个长度为 10、且未初始化的 Buffer。 <Buffer 98 fe a5 8d fa 01 00 00 58 ff> 未经初始化的混乱Buffer
        * 这个方法比调用 Buffer.alloc() 更快，
        * 但返回的 Buffer 实例可能包含旧数据，
        * 因此需要使用 fill() 或 write() 重写。
        * 不常用
    - Buffer.from()
        * Buffer.from([1,2,3]) 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。  <Buffer 01 02 03>
        * Buffer.from('test', 'latin1')  创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer <Buffer 74 65 73 74>
    - Buffer.byteLength()
        * 返回字符串的实际字节长度。 与 String.prototype.length 不同，后者返回字符串的字符数
        * Buffer.byteLength('test') // 4 英文字母占位一个字节
        * Buffer.byteLength('测试') // 6 中文占位三个字节
    - Buffer.isBuffer(obj)
        * obj 是一个 Buffer，则返回 true，否则返回 false。
        * Buffer.isBuffer({}) false
        * Buffer.isBuffer(Buffer.from([1,2,3])) true
    - Buffer.concat()
    ```
        // 用含有三个 `Buffer` 实例的数组创建一个单一的 `Buffer`。

        const buf1 = Buffer.alloc(10);
        const buf2 = Buffer.alloc(14);
        const buf3 = Buffer.alloc(18);
        const totalLength = buf1.length + buf2.length + buf3.length;

        console.log(totalLength);
        // 打印: 42
        // 如果已知长度，则明确提供长度会更快
        const bufA = Buffer.concat([buf1, buf2, buf3], totalLength);

        console.log(bufA);
        // 打印: <Buffer 00 00 00 00 ...>
        console.log(bufA.length);
        // 打印: 42
    ```
    - buf.length
        * 返回内存中分配给 buf 的字节数。 不一定反映 buf 中可用数据的字节量。
    - buf.toString([encoding[, start[, end]]])
        * encoding <string> 使用的字符编码。默认值: 'utf8'。
        * start <integer> 开始解码的字节偏移量。默认值: 0。
        * end <integer> 结束解码的字节偏移量（不包含）。默认值: buf.length。
        * 返回: <string>
        * 根据 encoding 指定的字符编码将 buf 解码成字符串。 传入 start 和 end 可以只解码 buf 的子集。
    - buf.fill()
        * buf.fill(value[, offset[, end]][, encoding])
        * value <string> | <Buffer> | <Uint8Array> | <integer> 用来填充 buf 的值。
        * offset <integer> 开始填充 buf 的偏移量。默认值: 0。
        * end <integer> 结束填充 buf 的偏移量（不包含）。默认值: buf.length。
        * encoding <string> 如果 value 是字符串，则指定 value 的字符编码。默认值: 'utf8'。
        * 返回: <Buffer> buf 的引用。
        ```
            const buf1 = Buffer.alloc(10)
            console.log(buf1.fill('e',2,5)) //<Buffer 00 00 65 65 65 00 00 00 00 00>
        ```
    - buf.equals(otherBuffer)
        * otherBuffer <Buffer> 要与 bur 对比的 Buffer 或 Uint8Array。
        * 返回: <boolean>
        ```
            const buf1 = Buffer.from('ABC');
            const buf2 = Buffer.from('414243', 'hex');
            const buf3 = Buffer.from('ABCD');

            console.log(buf1.equals(buf2));
            // 打印: true
            console.log(buf1.equals(buf3));
            // 打印: false
        ```
    - buf.indexOf() 类似于数组的 Array.indexOf()
        * 汉字占三个字符， ==> 解决可能出现的中文乱码问题
    - buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
        * target <Buffer> | <Uint8Array> 要拷贝进的 Buffer 或 Uint8Array。
        * targetStart <integer> target 中开始写入之前要跳过的字节数。默认值: 0。
        * sourceStart <integer> buf 中开始拷贝的偏移量。默认值: 0。
        * sourceEnd <integer> buf 中结束拷贝的偏移量（不包含）。默认值: buf.length。
        * 返回: <integer> 拷贝的字节数。
        ```
            // 创建两个 `Buffer` 实例。
            const buf1 = Buffer.allocUnsafe(26);
            const buf2 = Buffer.allocUnsafe(26).fill('!');

            for (let i = 0; i < 26; i++) {
            // 97 是 'a' 的十进制 ASCII 值。
            buf1[i] = i + 97;
            }

            // 拷贝 `buf1` 中第 16 至 19 字节偏移量的数据到 `buf2` 第 8 字节偏移量开始。
            buf1.copy(buf2, 8, 16, 20);

            console.log(buf2.toString('ascii', 0, 25));
            // 打印: !!!!!!!!qrst!!!!!!!!!!!!!
        ```
        ```
            // 创建一个 `Buffer`，并拷贝同一 `Buffer` 中一个区域的数据到另一个重叠的区域。

            const buf = Buffer.allocUnsafe(26);

            for (let i = 0; i < 26; i++) {
            // 97 是 'a' 的十进制 ASCII 值。
            buf[i] = i + 97;
            }

            buf.copy(buf, 0, 4, 10);

            console.log(buf.toString());
            // 打印: efghijghijklmnopqrstuvwxyz
        ```
    - string_decoder
        * string_decoder 模块提供了一个 API，用于以保留编码的多字节 UTF-8 和 UTF-16 字符的方式将 Buffer 对象解码为字符串
        ```
            // 如何去除buffer中文乱码
            const buf = Buffer.from('中文乱码在此！')
            // string_decoder 是buffer的内置模块
            // 将 Buffer 实例写入 StringDecoder 实例时，将使用内部缓冲区来确保已解码的字符串不包含任何不完整的多字节字符。
            // 它们保存在缓冲区中，直到下一次调用 stringDecoder.write() 或调用 stringDecoder.end() 为止
            // 简单说就是会自动识别多字节字符，代码操作出现不完整的情况下不做输出，而是存储在内存中，在下一次操作中拼接在起始位置
            const { StringDecoder } = require('string_decoder')
            const decoder = new StringDecoder('utf8')
            for(let  i = 0; i< buf.length; i+=5) {
                // 生成未初始化的Buffer
                const b = Buffer.allocUnsafe(5)
                // 拷贝
                buf.copy(b, 0, i)
                console.log(b.toString())
                // 结果
                // 中�
                // �乱�
                // ��在
                // 此�
                // ��4�║
            }
            for(let  i = 0; i< buf.length; i+=5) {
                // 生成未初始化的Buffer
                const b = Buffer.allocUnsafe(5)
                // 拷贝
                buf.copy(b, 0, i)
                console.log(decoder.write(b))
            }
        ```

+ events 事件触发器
    - events 属于内置模块
    - 所有能触发事件的对象都是 EventEmitter 类的实例。 
    - 事件的命名通常是驼峰式的字符串，但也可以使用任何有效的 JavaScript 属性键。
    - EventEmitter 对象触发一个事件时，所有绑定在该事件上的函数都会被同步地调用。 被调用的监听器返回的任何值都将会被忽略并丢弃。
    ```
        //  eventEmitter.on() 用于注册监听器， eventEmitter.emit() 用于触发事件
        const EventEmitter = require('events')

        // EventEmitter 继承类 events
        class myEvent extends EventEmitter{}

        // 实例化 myEvent
        const myEventClick = new myEvent()

        // 监听myClick
        myEventClick.on('myClick',()=> {
            console.log('Click')
        })

        setInterval(() => {
            // 触发myClick
            myEventClick.emit('myClick')
        }, 1000)
    ```
    - 事件传参处理
        * 需要注意emit首参为触发的函数名称，后续参数均为自定义参数
        * 另外需注意传参顺序，实参与形参不再敖述
    ```
    // 引入内置模块 events
    const EventEmitter = require('events')
    
    // EventEmitter 继承 events
    class myEvent extends EventEmitter{}
    
    // 实例化 myEvent
    const ce = new myEvent()
    
    // 监听错误 传入参数
    ce.on('error', (err, time) => {
        console.log(err)
        console.log(time)
    })
    // 触发错误
    ce.emit('error', new Error('error111'), Date.now())
    // emit首参为触发的函数名称，后续参数均为自定义参数，
    /**
     * Error: error111
        at Object.<anonymous> (E:\***\***\$$$\api\04_events_param.js:15:18)
        ...
        at bootstrapNodeJSCore (internal/bootstrap/node.js:739:3)
        1574242863420
     * 
     */
    ```

    - 移除事件监听
    ```
    const EventEmitter = require('events')
    class myEvent extends EventEmitter{}
    const ce = new myEvent()

    // 事件1
    function fn1() {
        console.log('fn1')
    }
    // 事件2
    function fn2() {
        console.log('fn2')
    }
    // 需注意监听同一个事件，可同时触发多个函数
    ce.on('click', fn1)
    ce.on('click', fn2)

    setInterval(() => {
        // 触发myClick
        ce.emit('click')
    }, 500)

    setInterval(() => {
        // 触发myClick
        ce.removeListener('click', fn2)
        // 全部移除 只需要传入监听的事件名
        // ce.removeAllListeners('click')

    }, 1500)
    // 打印 可以再一定时段后不再打印fn2，说明已经被移除监听
    /**
    * fn1
    * fn2
    * fn1
    * fn2
    * fn1
    * fn1
    * fn1
    * fn1
    */
    ```

+ fs 文件系统
    - fs模块是node.js的内置模块
    - fs 模块提供了一个 API，用于以模仿标准 POSIX 函数的方式与文件系统进行交互
    - 所有文件系统操作都具有同步和异步的形式。
        * 举个例子
        ```
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
        ```
    - 读文件
        ```
        // 先来一个简单的例子，读文件

        const fs = require('fs')
        // 需要注意一点 如果操作成功完成，则第一个参数将为 null 或 undefined。
        fs.readFile('./06_fs.js', (err, data) => {
            //  如果出现错误 通过throw输出
            if (err) throw err
            console.log(data) 
        })
        // 打印 二进制 一个buf
        /**
        * PS E:\xxx\ccc\aaa\api> node 06_fs.js
            <Buffer 2f 2f 20 e6 89 80 e6 9c 89 e6 96 87 e4 bb b6 e7 b3 bb e7 bb 9f e6 93 8d e4 bd 9c e9 83 bd e5 85 b7 e6 9c 89 e5 90 8c e6 ad a5 e5 92 8c e5 bc 82 e6 ad ... >
        */
        ```
    - 写文件
        ```
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
        ```
    - 输出为字符串 的两种方式
        * toString()
            ```
            // 异步操作
            const fs = require('fs')
            // 需要注意一点 如果操作成功完成，则第一个参数将为 null 或 undefined。
            fs.readFile('./07_fs_throw_string.js', (err, data) => {
                //  如果出现错误 通过throw输出
                if (err) throw err
                console.log(data)
                // 输出字符串
                console.log(data.toString()) 
            })

            /**
            * 
            *  PS E:\xxx\xxx\xxx\api> node 07_fs_throw_string.js
                <Buffer 2f 2f 20 20 e8 be 93 e5 87 ba 20 e5 ad 97 e7 ac a6 e4 b8 b2 0d 0a 63 6f 6e 73 74 20 66 73 20 3d 20 72 65 71 75 69 72 65 28 27 66 73 27 29 0d 0a 2f 2f ... >
                //  输出 字符串
                const fs = require('fs')
                // 需要注意一点 如果操作成功完成，则第一个参数将为 null 或 undefined。
                fs.readFile('./07_fs_throw_string.js', (err, data) => {
                    //  如果出现错误 通过throw输出
                    if (err) throw err
                    console.log(data)
                    // 输出字符串
                    console.log(data.toString())
                })
            */
            ```
        * 异步传参
            ```
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
            ```