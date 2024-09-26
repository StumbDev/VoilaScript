import * as readline from 'readline';
import * as fs from 'fs';
import { VM } from 'vm2';
import chalk from 'chalk';

// Create a new VM instance for executing scripts safely
const vm = new VM({
    timeout: 1000,
    sandbox: {},
});

// ASCII Logo for VoilaScript
const logo = `
  (|  |_/_  o |\  _,   ()  _   ,_  o    _|_ 
   |  | / \_| |/ / |   /\ /   /  | | |/\_|  
    \/  \_/ |/|_/\/|_//(_)\__/   |/|/|_/ |_/
                                  (|       
`;

console.log(chalk.blue(logo));
console.log(chalk.green('Welcome to VoilaScript REPL! Type your commands below.\n'));

// Define a function to execute VoilaScript code
function executeCode(code: string) {
    try {
        const result = vm.run(code);
        console.log(chalk.yellow(result));
    } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`));
    }
}

// REPL Mode
function startREPL() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: chalk.cyan('> '),
    });

    let multiLineInput = false;
    let codeBuffer = '';

    rl.prompt();

    rl.on('line', (line) => {
        if (line.trim() === '.exit') {
            console.log(chalk.green('Exiting REPL.'));
            rl.close();
        } else if (line.trim() === '.editor') {
            multiLineInput = true;
            codeBuffer = '';
            console.log(chalk.yellow('Entering multiline mode. Type .end on a new line to finish.'));
            rl.setPrompt(chalk.cyan('... '));
            rl.prompt();
        } else if (multiLineInput) {
            if (line.trim() === '.end') {
                multiLineInput = false;
                executeCode(codeBuffer);
                codeBuffer = '';
                rl.setPrompt(chalk.cyan('> '));
            } else {
                codeBuffer += line + '\n';
            }
        } else {
            if (line.trim()) {
                executeCode(line);
            }
            rl.prompt();
        }
    }).on('close', () => {
        process.exit(0);
    });
}

// File Input Mode
function runFile(filePath: string) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(chalk.red(`Error reading file: ${err.message}`));
            return;
        }
        executeCode(data);
    });
}

// Main function to handle command-line arguments
function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        // No arguments, start REPL mode
        startREPL();
    } else if (args.length === 1) {
        // One argument, treat it as a file path
        const filePath = args[0];
        runFile(filePath);
    } else {
        console.error(chalk.red('Usage: node interpreter.js [file]'));
    }
}

// Start the interpreter
main();