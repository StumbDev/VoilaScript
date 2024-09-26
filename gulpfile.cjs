const gulp = require('gulp');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');

// Paths
const paths = {
    scripts: {
        src: 'src/**/*.ts',  // Adjust your source folder as needed
        dest: 'dist/'
    }
};

// TypeScript project
const tsProject = ts.createProject('tsconfig.json');

// Compile TypeScript
function compile() {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .js.pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scripts.dest));
}

// Watch files for changes
function watch() {
    gulp.watch(paths.scripts.src, compile);
}

// Default task
const build = gulp.series(compile);
gulp.task('default', build);
gulp.task('watch', watch);
