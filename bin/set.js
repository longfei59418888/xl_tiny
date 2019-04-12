var path = require('path');
var fs = require('fs');
const chalk = require('chalk')
var argv = require('yargs').argv


module.exports = async (key) => {
    const keyPath = path.join(__dirname, './key')
    let keys = fs.readFileSync(keyPath, 'utf8');
    if (!key) {
        console.log(keys)
        return
    }
    keys = key
    fs.writeFileSync(keyPath,keys, 'utf8');
    console.log(chalk.yellow(` 设置成功`));
    process.exit(0)
}