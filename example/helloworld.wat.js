import { VoilaLangWAT } from '@voilalang/watlib'; // Adjust the path according to your project structure

async function runHelloWorld() {
    const voila = new VoilaLangWAT();

    try {
        // Run the WAT file
        await voila.runWATFromFile('./helloworld.wat', {});
        console.log("WAT code executed successfully.");
    } catch (err) {
        console.error("Error running WAT code:", err);
    }
}

// Run the hello world function
runHelloWorld();
