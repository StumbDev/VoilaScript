type Command = {
    type: string;
    name?: string;
    content?: string;
    prompt?: string;
    condition?: string;
};

class VoilaLang {
    private context: { [key: string]: any };

    constructor() {
        this.context = {};
    }

    public execute(code: string): void {
        const parsedCode = this.parse(code);
        this.runParsedCode(parsedCode);
    }

    private parse(code: string): Command[] {
        const lines = code
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length && !line.startsWith('//'));
        const commands: Command[] = lines.map(line => this.parseLine(line));
        return commands;
    }

    private parseLine(line: string): Command {
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
        return { type: 'unknown' };
    }

    private extractFunctionName(line: string): string | null {
        const match = line.match(/\?function\s+(\w+)/);
        return match ? match[1] : null;
    }

    private extractWriteContent(line: string): string | null {
        const match = line.match(/write\((.*)\)/);
        return match ? match[1].replace(/'/g, '') : null;
    }

    private extractInputPrompt(line: string): string | null {
        const match = line.match(/input\.(\w+)\('(.+)'\)/);
        return match ? match[2] : null;
    }

    private extractCondition(line: string): string | null {
        const match = line.match(/\?if\((.+)\)/);
        return match ? match[1] : null;
    }

    private runParsedCode(commands: Command[]): void {
        for (const command of commands) {
            switch (command.type) {
                case 'function':
                    console.log(`Running function: ${command.name}`);
                    break;
                case 'write':
                    console.log(command.content);
                    break;
                case 'input':
                    const input = prompt(command.prompt);
                    this.context.input = input;
                    break;
                case 'conditional':
                    if (eval(command.condition)) {
                        console.log(`Condition met: ${command.condition}`);
                    }
                    break;
                case 'return':
                    console.log('Returning from function');
                    return;
                default:
                    console.error('Unknown command type:', command.type);
            }
        }
    }
}

// Export the TypeScript library
export default VoilaLang;