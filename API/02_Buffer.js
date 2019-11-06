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
const buf1 = Buffer.from('ABC');
const buf2 = Buffer.from('414243', 'hex');
const buf3 = Buffer.from('ABCD');

console.log(buf1.equals(buf2));
// 打印: true
console.log(buf1.equals(buf3));
// 打印: false
// console.log()
// console.log()
// console.log()
// console.log()
// console.log()
