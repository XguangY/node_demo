module.exports.test = 'B'

const modA = require('./04_moduleA')

console.log('modB：'+ modA.test)

// 再次定义
module.exports.test = 'BB'