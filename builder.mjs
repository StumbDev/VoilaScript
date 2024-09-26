import shell from "shelljs";
import chalk from "chalk";
import { cp } from "fs";

// define colors from chalk
const bold = chalk.bold;
const blue = chalk.black;
const error = chalk.red;

// builder
function build() {
    // check if bun is installed
    if (!shell.which('bun')) {
        shell.echo('Sorry, this script requires bun');
        shell.echo('https://bun.sh');
        shell.exit(1);
      }  

    shell.echo(bold("VoilaScript Building wizard"));
    shell.echo(bold("Starting build from ."));
    shell.bun('run tsc');
    cp('src/main.js', './dist/voilascr/voi.js');
    bun('run pkg -o ./dist/voilascr/voipkg ./src/main.js');
    rm('./src/*.js');
    shell.exit(0);
}

// run build function
build();