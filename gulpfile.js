const gulp = require('gulp');
const chalk = require('chalk')
const { exec } = require('child_process');
const path = require('path');

// Paths
const paths = {
    tsSrc: '**/**/*.ts',
    src: '**/**/*.js',          // Source JavaScript files
    watSrc: '**/**/*.wat',      // Source WebAssembly Text files
    dest: 'dist/',               // Destination for compiled files
    mainFile: 'js/voipkg.js',   // Main file for the interpreter
    pkgOutput: 'voipkg',         // Output executable name
};

// Task to compile JavaScript files
gulp.task('compile-js', (done) => {
    exec(`babel ${paths.src} --out-dir ${paths.dest}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`JavaScript compilation error: ${stderr}`);
            return done(err);
        }
        console.log(`JavaScript compilation output:\n${stdout}`);
        done();
    });
});

// Task to compile .wat files to .wasm
gulp.task('compile-wat', (done) => {
    exec(`wabt ${paths.watSrc} --out-dir ${paths.dest}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`WAT compilation error: ${stderr}`);
            return done(err);
        }
        console.log(`WAT compilation output:\n${stdout}`);
        done();
    });
});

gulp.task('compile-ts', (done) => {
    exec(`tsc ${paths.tsSrc} -o ${paths.dest}`, (err, stdout, stderr) => {
        if (err) {
            console.error(chalk.red(`Faild to compile Typescript files: ${stderr}`));
            return done(err);
        }
        console.log(`Typescript compiled output:\n${stdout}`);
        done();
    });
});
// Task to create an executable using pkg
gulp.task('pkg', (done) => {
    const pkgCommand = `pkg ${path.join(paths.dest, paths.pkgOutput)} --output ${paths.pkgOutput} --targets node16-linux-x64,node16-macos-x64,node16-win-x64`;
    
    exec(pkgCommand, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error creating executable: ${stderr}`);
            return done(err);
        }
        console.log(`Executable created:\n${stdout}`);
        done();
    });
});

// Default task to compile JavaScript, compile WAT, and create the executable
gulp.task('default', gulp.series('compile-js', 'compile-ts', 'compile-wat', 'pkg'));
