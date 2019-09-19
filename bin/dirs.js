var path = require('path');
var fs = require('fs');
const chalk = require('chalk')
const tinify = require("tinify");
var shell = require('shelljs')
tinify.key = "ebCSQAZMd8I8dZcwCjo9cpVdgxuSaLla";
var argv = require('yargs').argv
var file = require('./file')

const fileExt = ['.png', '.jpg']
module.exports = async (dir, type) => {
    let filePath = type ? dir : path.join(process.cwd(), dir);
    let distPath = argv.o ? path.join(process.cwd(), argv.o) : filePath;
    if (!fs.existsSync(filePath)) {
        console.log(chalk.red(` no such file or directory ：${filePath}`));
        process.exit(0)
        return
    }
    var statInfo = fs.statSync(filePath);
    if (!statInfo.isDirectory()) {
        console.log(chalk.red(` is not a directory ：${filePath}`));
        process.exit(0)
        return
    }

    const fileList = shell.find(filePath).filter(function (file) {
        return file.match(/\.(png|jpg)$/);
    });
    console.log(chalk.yellow(` 开始压缩 ：${filePath}`));
    let dealNum = fileList.length
    fileList.forEach(item => {
        deal(item.replace(/\//g, '\\'))
    })

    function deal(fileItem) {
        const source = tinify.fromFile(fileItem);
        const dist = path.join(distPath, path.relative(filePath, fileItem))
        if (!fs.existsSync(path.dirname(dist))) {
            shell.mkdir('-p', path.dirname(dist))
        }
        source.toFile(dist, (err) => {
            dealNum = dealNum - 1
            if (dealNum < 1) {
                console.log(chalk.yellow(` 压缩成功 ：${filePath}`));
                process.exit(0)
            }
        });
    }
}
