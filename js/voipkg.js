const fs = require('fs');
const path = require('path');
const { exec } = require('child_process'); // To execute commands
const { default: VoilaLang } = require('../lib/lib');

class Voipkg {
    constructor() {
        this.packageFileName = 'voipkg.json'; // Default package file name
    }

    // Method to initialize the package
    init() {
        const packageJson = {
            name: '',
            version: '1.0.0',
            description: '',
            main: 'src/index.js', // Default entry point
            scripts: {
                start: 'node src/index.js'
            },
            author: '',
            license: 'MIT',
            deps: {
                VoilaLang: '^0.2.12-vyne2voila',
                typescript: '^5.6.2'
            }
        };

        const packageJsonPath = path.join(process.cwd(), this.packageFileName);

        // Check if the package file already exists
        if (fs.existsSync(packageJsonPath)) {
            console.error(`Error: ${this.packageFileName} already exists in this directory.`);
            return;
        }

        // Write the package file
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
        console.log(`Initialized a new VoilaLang package in ${this.packageFileName}`);
    }

    // Method to run the main file defined in voipkg.json
    run() {
        const packageJsonPath = path.join(process.cwd(), this.packageFileName);

        // Check if the package file exists
        if (!fs.existsSync(packageJsonPath)) {
            console.error(`Error: ${this.packageFileName} not found in this directory.`);
            return;
        }

        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const mainFilePath = path.join(process.cwd(), packageJson.main);

        // Check if the main file exists
        if (!fs.existsSync(mainFilePath)) {
            console.error(`Error: Main file ${mainFilePath} not found.`);
            return;
        }

        // Execute the main file
        exec(`node ${mainFilePath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing ${mainFilePath}:`, error);
                return;
            }
            console.log(stdout);
            if (stderr) {
                console.error(stderr);
            }
        });
    }
}

// CLI implementation
const command = process.argv[2]; // Get the command from the command line arguments
const voipkg = new Voipkg();

if (command === '--init') {
    voipkg.init(); // Initialize the package
} else if (command === '--run') {
    voipkg.run(); // Run the main file
} else {
    console.log('Unknown command. Use --init to create a new VoilaLang package or --run to execute the main file.');
}
