var path = require('path');
var fs = require('fs');
const chalk = require('chalk')
const tinify = require("tinify");
var argv = require('yargs').argv
var shell = require('shelljs')

const fileExt = ['.png', '.jpg']
module.exports = async (file, type) => {
    const keyPath = path.join(__dirname, './key')
    let key = fs.readFileSync(keyPath, 'utf8');
    if (key.length < 1) {
        console.log(chalk.red(`must set key , you can get it from https://tinypng.com/dashboard/api`));
        process.exit(0)
        return
    }
    tinify.key = key;
    let filePath = type ? file : path.join(process.cwd(), file);
    let distPath = argv.o ? path.join(process.cwd(), argv.o) : filePath;
    if (!fs.existsSync(filePath)) {
        console.log(chalk.red(` no such file or directory ：${filePath}`));
        process.exit(0)
        return
    }
    var statInfo = fs.statSync(filePath);
    if (!statInfo.isFile()) {
        console.log(chalk.red(` is not a file ：${filePath}`));
        process.exit(0)
        return
    }
    var extname = path.extname(filePath);
    if (fileExt.indexOf(extname) == -1) {
        console.log(chalk.red(` must be a png/jpg ：${filePath}`));
        process.exit(0)
        return
    }
    extname = path.extname(distPath);
    if (fileExt.indexOf(extname) == -1) {
        console.log(chalk.red(` must be a png/jpg ：${distPath}`));
        process.exit(0)
        return
    }
    console.log(chalk.yellow(` 开始压缩 ：${filePath}`));
    const source = tinify.fromFile(filePath);
    if (!fs.existsSync(path.dirname(distPath))) {
        shell.mkdir('-p', path.dirname(distPath))
    }
    source.toFile(distPath, (res) => {
        if (res && res.message) {
            console.log(chalk.red(res.message));
            process.exit(0)
            return
        }
        console.log(chalk.yellow(` 压缩成功 ：${filePath}`));
        process.exit(0)
    });

}
