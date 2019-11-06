//  用来处理不规范路径
const {normalize} = require('path')

// console.log(normalize('./..//'))

// 拼接路径 会自动处理上下级关系

const {join} = require('path')

// console.log(join('/user','aaa','../'))
// console.log(join('/user','aaa','../', 'bbb'))

// 将相对路径转换为绝对路径
const {resolve} = require('path')

// console.log(resolve('./'))

// 返回文捡名，文件路径，文件后缀
const {basename, dirname,extname} = require('path')
const fileName = 'user/saa/xzz.txt'
//  console.log(basename(fileName))
//  console.log(dirname(fileName))
//  console.log(extname(fileName))

// 解析与反解析

const {parse, format} = require('path')

const url = '/user/data/aaa/b.js'

const ret = parse(url)
// console.log(ret)
// console.log(format(ret))

// 
const {sep, delimiter, win32, posix} = require('path')
// console.log('sep:', sep)
// console.log('delimiter:', delimiter)
// console.log('posix sep:', posix.sep)
// console.log('posix delimiter:', posix.delimiter)