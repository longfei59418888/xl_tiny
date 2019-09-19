#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
var argv = require('yargs').argv
var program = require('commander')
var shell = require('shelljs')
var dirs = require('./dirs')
var file = require('./file')
var set = require('./set')
var child_process = require("child_process")
// var regedit = require('node-reg');

// 如果存在本地的命令，执行本地的
try {
    var localWebpack = require.resolve(path.join(process.cwd(), "node_modules", "xl_tiny", "bin", "index.js"));
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
    .command('cmdFile <path>')
    .description('压缩优化文件')
    .action((path) => {
        file(path, true)
    })

program
    .command('dir <path>')
    .description('压缩优化目录下文件')
    .action((path) => {
        dirs(path)
    })

program
    .command('cmdDir <path>')
    .description('压缩优化文件')
    .action((path) => {
        dirs(path, true)
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

program
    .command('setCmd')
    .description('设置到 windows 右键 tiny')
    .action(() => {
        // const bat = path.resolve(path.join(__dirname, '../tiny.bat'))
        // let tiny = fs.readFileSync(path.join(__dirname, '../tiny.reg'), 'utf8');
        // tiny = tiny.replace('{tiny}', path.normalize(bat))

        // regedit.addKey({
        //     target: 'HKEY_CLASSES_ROOT\\*\\shell',
        //     name: 'tiny',
        //     value: 'tiny',
        //     type: 'REG_SZ'
        // }).then(function(result) {
        //     console.log(result)
        // });
        // fs.writeFileSync(path.join(__dirname, '../tiny.reg'), tiny, 'utf8');
        console.log(1)
        child_process.exec('reg add HKEY_CLASSES_ROOT\\*\\shell /v tiny /t REG_SZ /d "welcome to my website"\n')
    })

program.parse(process.argv)
