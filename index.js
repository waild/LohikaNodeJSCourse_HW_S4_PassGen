var program = require('commander');
var pg = require('./lib/password-generator');

program
    .option('-l, --length <n>', 'password length', parseInt)
    .option('-u, --uppercase <n>', 'upercase characters', parseInt)
    .option('-d, --digits <n>', 'digits', parseInt)
    .option('-s, --special <n>', 'special characters', parseInt)
    .parse(process.argv);

let pass = pg.generate(program.length, program.uppercase, program.digits, program.special);
if (pass.success) {
    console.log(pass.password);
} else {
    console.error(pass.errorMessage);
}