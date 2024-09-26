import chalk from 'chalk';
import type { Shell } from 'bun';
import shell from 'shelljs';
import { Command } from 'commander';
const program = new Command();

program
.name("VoilaScript Package Manager")
.version("0.2.34-5")

program.command("init")
.description("Initalize a new project")
.action(function() {
    const InitCommand = "packageInit";
    shell.mkdir('voisc-project');
    shell.cd('voisc-project');
    shell.touch('main.voila.ts');
    shell.mkdir('voila_modules');
    shell.touch('./voila_modules/voila.js');
    shell.touch('voipkg.json');
    shell.cat(`
    {
        "name": "",
        "version": "0.0.1",
        "voilascript-version": "",
        "author": "",
        "deps": {}
    }
        `, 'voipkg.json');
    shell.echo(chalk.bold("🙌 New project created with sucess!"));
    shell.echo('This is your project file tree:');
    shell.ls()
})

program.command("help")
.description("show help")
.action(function() {
    shell.echo(chalk.bold("VoiPKG help\n"))
    shell.echo()
})

program.command("run")
.description("Run a .voilascr file");

