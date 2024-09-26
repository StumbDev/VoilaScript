class VoilaLang {
    constructor() {
        this.context = {}; // Context to store variable values
    }

    // Method to execute VoilaLang code
    execute(code) {
        const parsedCode = this.parse(code); // Parse the code
        this.runParsedCode(parsedCode); // Execute the parsed code
    }

    // Method to parse the VoilaLang code
    parse(code) {
        const lines = code.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0 && !line.startsWith('//')); // Remove empty lines and comments
        const commands = lines.map(line => this.parseLine(line)); // Parse each line into a command
        return commands;
    }

    // Method to parse each line of the code
    parseLine(line) {
        if (line.startsWith('?function')) {
            return { type: 'function', name: this.extractFunctionName(line) };
        } else if (line.startsWith('write')) {
            return { type: 'write', content: this.extractWriteContent(line) };
        } else if (line.startsWith('input.')) {
            return { type: 'input', prompt: this.extractInputPrompt(line) };
        } else if (line.startsWith('?if')) {
            return { type: 'conditional', condition: this.extractCondition(line) };
        } else if (line.startsWith('return**')) {
            return { type: 'return' };
        }
        return { type: 'unknown' }; // Handle unknown command types
    }

    // Helper methods to extract parts of the commands
    extractFunctionName(line) {
        const match = line.match(/\?function\s+(\w+)/);
        return match ? match[1] : null;
    }

    extractWriteContent(line) {
        const match = line.match(/write\((.*)\)/);
        return match ? match[1].replace(/'/g, '') : null; // Remove single quotes
    }

    extractInputPrompt(line) {
        const match = line.match(/input\.(\w+)\('(.+)'\)/);
        return match ? match[2] : null; // Extract the prompt message
    }

    extractCondition(line) {
        const match = line.match(/\?if\((.+)\)/);
        return match ? match[1] : null; // Extract the condition
    }

    // Method to run the parsed commands
    runParsedCode(commands) {
        for (const command of commands) {
            switch (command.type) {
                case 'function':
                    console.log(`Running function: ${command.name}`);
                    break;
                case 'write':
                    console.log(command.content); // Output the write content to console
                    break;
                case 'input':
                    const input = prompt(command.prompt); // Prompt for user input
                    this.context.input = input; // Store user input in context
                    break;
                case 'conditional':
                    if (eval(command.condition)) { // Evaluate the condition
                        console.log(`Condition met: ${command.condition}`);
                    }
                    break;
                case 'return':
                    console.log('Returning from function');
                    return; // Exit from the function
                default:
                    console.error('Unknown command type:', command.type);
            }
        }
    }
}

// Export the VoilaLang library for use in other files
module.exports = VoilaLang;