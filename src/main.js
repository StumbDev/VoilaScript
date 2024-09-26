async function loadWasm() {
    // Fetch the .wat or .wasm file and instantiate it
    const response = await fetch('lang.wasm');
    const buffer = await response.arrayBuffer();
    const wasmModule = await WebAssembly.instantiate(buffer, {
        env: {
            write: function(ptr, len) {
                // Handle writing by extracting the string from memory
                const memory = new Uint8Array(wasmModule.instance.exports.memory.buffer);
                const text = new TextDecoder('utf-8').decode(memory.subarray(ptr, ptr + len));
                console.log(text);
            },
            input: function() {
                // Prompt user input (simple mock, replace with real input system)
                const input = prompt('Input: ');
                if (input === "name") {
                    return 1; // Return value for "name"
                }
                return 0;
            },
            print_name: function(id) {
                // If the ID corresponds to 'printName', print 'Johnny'
                if (id === 1) {
                    console.log('Johnny');
                }
            }
        }
    });

    // Call the main function
    wasmModule.instance.exports.main();
}

loadWasm();