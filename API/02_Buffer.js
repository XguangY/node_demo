// Buffer 类是作为 Node.js API 的一部分引入的，用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互
// console.log(Buffer.alloc(10)) // 创建一个长度为10的buffer
// console.log(Buffer.alloc(10,1))

// console.log(Buffer.allocUnsafe(10))

// console.log(Buffer.from([1,2,3]))
// console.log(Buffer.from('test', 'latin1'))

// console.log(Buffer.byteLength('test')) // 4 英文字母占位一个字节
// console.log(Buffer.byteLength('测试')) // 6 中文占位三个字节
// console.log(Buffer.from('测试').length)

// const buf1 = Buffer.alloc(10)
// console.log(buf1.fill('e',2,5))

// const buf1 = Buffer.from('ABC');
// const buf2 = Buffer.from('414243', 'hex');
// const buf3 = Buffer.from('ABCD');

// console.log(buf1.equals(buf2));
// 打印: true
// console.log(buf1.equals(buf3));
// 打印: false

// 如何去除buffer中文乱码
const buf = Buffer.from('中文乱码在此！')
// string_decoder 是buffer的内置模块
// 将 Buffer 实例写入 StringDecoder 实例时，将使用内部缓冲区来确保已解码的字符串不包含任何不完整的多字节字符。
// 它们保存在缓冲区中，直到下一次调用 stringDecoder.write() 或调用 stringDecoder.end() 为止
// 简单说就是会自动识别多字节字符，代码操作出现不完整的情况下不做输出，而是存储在内存中，在下一次操作中拼接在起始位置
// const { StringDecoder } = require('string_decoder')
// const decoder = new StringDecoder('utf8')
// for(let  i = 0; i< buf.length; i+=5) {
//     // 生成未初始化的Buffer
//     const b = Buffer.allocUnsafe(5)
//     // 拷贝
//     buf.copy(b, 0, i)
//     console.log(b.toString())
//     // 结果
//     // 中�
//     // �乱�
//     // ��在
//     // 此�
//     // ��4�║
// }
// for(let  i = 0; i< buf.length; i+=5) {
//     // 生成未初始化的Buffer
//     const b = Buffer.allocUnsafe(5)
//     // 拷贝
//     buf.copy(b, 0, i)
//     console.log(decoder.write(b))
// }
