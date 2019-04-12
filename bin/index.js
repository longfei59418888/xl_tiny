#!/usr/bin/env node

var path = require('path');
var argv = require('yargs').argv
var program = require('commander')
var shell = require('shelljs')
var dirs = require('./dirs')
var file = require('./file')
var set = require('./set')

// 如果存在本地的命令，执行本地的
try {
    var localWebpack = require.resolve(path.join(process.cwd(), "node_modules", "xl_tinypng", "bin", "index.js"));
    if (__filename !== localWebpack) {
        return require(localWebpack);
    }
} catch (e) {
}

let package = JSON.parse(shell.cat(path.join(__dirname, '../package.json')))

program
    .version(package.version)
    .usage('[cmd] [options]')
    .option('-o', '压缩优化后图片的位置')

program
    .command('file <path>')
    .description('压缩优化文件')
    .action((path) => {
        file(path)
    })

program
    .command('dir <path>')
    .description('压缩优化目录下文件')
    .action((path) => {
        dirs(path)
    })

program
    .command('set <key>')
    .description('设置key')
    .action((key) => {
        set(key)
    })
program
    .command('show')
    .description('查看key列表')
    .action((path) => {
        set()
    })
program.parse(process.argv)
