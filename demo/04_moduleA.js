module.exports.test = 'A'

const modB = require('./05_moduleB')

console.log('modA：'+ modB.test)

// 再次定义
module.exports.test = 'AA'