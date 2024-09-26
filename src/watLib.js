// src/watLib.js

export class VoilaLangWAT {
    constructor() {
        this.module = null;
        this.instance = null;
    }

    async compileWAT(watCode) {
        const binary = await WebAssembly.compile(watCode);
        this.module = binary;
        return this.module;
    }

    async runWAT(watCode, inputVariables = {}) {
        if (!this.module) {
            await this.compileWAT(watCode);
        }

        // Create an instance of the WebAssembly module with input variables
        this.instance = await WebAssembly.instantiate(this.module, {
            env: {
                // Provide a function to handle output
                write: (ptr) => {
                    const message = this.getStringFromMemory(ptr);
                    console.log(message);
                },
                // Provide a way to fetch input
                input: (promptPtr) => {
                    const prompt = this.getStringFromMemory(promptPtr);
                    return this.getInput(prompt, inputVariables);
                }
            }
        });

        // Call the main function if it exists
        if (this.instance.exports.Main) {
            this.instance.exports.Main();
        } else {
            console.error("No main function found in WAT code.");
        }
    }

    getStringFromMemory(ptr) {
        // Convert memory address to string
        const memory = new Uint8Array(this.instance.exports.memory.buffer);
        const length = memory[ptr];
        const strBytes = memory.slice(ptr + 1, ptr + 1 + length);
        return new TextDecoder("utf-8").decode(strBytes);
    }

    getInput(prompt, inputVariables) {
        // Simulate user input; you can replace this with actual user input handling
        console.log(prompt);
        return inputVariables[prompt] || "default";
    }

    async loadWATFromFile(filePath) {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load WAT file: ${response.statusText}`);
        }
        const watCode = await response.text();
        return watCode;
    }

    async runWATFromFile(filePath, inputVariables = {}) {
        const watCode = await this.loadWATFromFile(filePath);
        await this.runWAT(watCode, inputVariables);
    }
}
