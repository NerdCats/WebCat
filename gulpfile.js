const gulp = require('gulp');
const gutil = require('gulp-util');
const ftp = require('vinyl-ftp');
const del = require('del');
const runSequence = require('run-sequence');
const minimist = require('minimist');
var args = minimist(process.argv.slice(2));

// Loading typescript requirements
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
var watch = require('gulp-watch');

// npm
var install = require("gulp-install");

/**
 * Remove dist directory.
 */
gulp.task('clean', function (cb) {
    del(["dist"]).then(function (paths) {
        console.log('Deleted files and folders:\n', paths.join('\n'));
        cb();
    });
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task('compile', function () {
    var tsProject = typescript.createProject('tsconfig.json');
    return tsProject
        .src('app/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/app'));
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', function () {
    return gulp.src('app/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});

// copy dependencies from node_modules
// we are just mimicking the dev environment now, but for production a lot more has to be done
gulp.task('copy:libs', function () {
    return gulp.src([
        'es6-shim/es6-shim.min.js',
        'systemjs/dist/system-polyfills.js',
        'systemjs/dist/system.src.js',
        'reflect-metadata/Reflect.js',
        'rxjs/**',
        'zone.js/dist/zone.js',
        'angular2-in-memory-web-api/web-api.js',
        '@angular/**',
        'moment/moment.js',
        'ng2-bootstrap/**',
        'ng2-bs3-modal/**'
    ], { cwd: "node_modules/**" }) /* Glob required here. */
        .pipe(gulp.dest("dist/lib"));
});

/**
 * copy static assets - i.e. non TypeScript compiled source
 */
gulp.task('copy:assets', function (cb) {
    console.log("copying assets");
    gulp.src(['app/**/*', 'assets/**/*', 'systemjs.config.js', 'config.js', 'package.json', 'index.html', 'styles.css', '!app/**/*.ts'], { base: './' })
        .pipe(gulp.dest('dist'));
    cb();
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {
    gulp.src('/**/*', { base: "./" })
        .pipe(watch("app/**/*.ts", { base: "./" }))
        .pipe(gulp.dest("./dist"));

    gulp.src('', { base: "./" })
        .pipe(watch(["app/**/*.html", "app/**/*.css", "assets/**/*", "styles.css", "index.html", "bs-config.json", "systemjs.config.js", "tsconfig.json"], { base: "./" }))
        .pipe(gulp.dest("./dist"));
});


/**
 * The build script
 */

gulp.task('build', function (callback) {
    runSequence('clean',
        'compile',
        ['copy:assets', 'copy:libs'],
        callback);
});

/**
 * The deploy script
 */

gulp.task('deploy', function () {
    var conn = ftp.create({
        host: args.host,
        user: args.user,
        password: args.password,
        parallel: 20,
        log: gutil.log
    });

    var globs = [
        'dist/**'
    ];

    return gulp.src(globs, { base: '.', buffer: false })
        .pipe(conn.newer('/site/wwwroot')) // only upload newer files
        .pipe(conn.dest('/site/wwwroot'));
});

gulp.task('default', ['build'], function () {
    console.log("Building WebCat ...");
});





