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
        'bootstrap/dist/css/bootstrap.min.css',
        'bootstrap/dist/css/bootstrap.min.css.map',
        'bootstrap/dist/js/bootstrap.js',
        'jquery/dist/jquery.min.js',
        'jquery/dist/jquery.min.map',
        'es6-shim/es6-shim.min.js',
        'es6-shim/es6-shim.map',
        'systemjs/dist/system-polyfills.js',
        'systemjs/dist/system.src.js',
        'reflect-metadata/Reflect.js',
        'rxjs/**',
        'zone.js/dist/zone.js',
        'angular2-in-memory-web-api/web-api.js',
        '@angular/**',
        'moment/moment.js',
        'ng2-bootstrap/**',
        'ng2-bs3-modal/**',
        'rdash-ui/dist/css/rdash.css',
        'font-awesome/css/font-awesome.css',
        'font-awesome/fonts/**'
    ], { cwd: "node_modules/**" }) /* Glob required here. */
        .pipe(gulp.dest("dist/lib"));
});

/**
 * copy static assets - i.e. non TypeScript compiled source
 */
gulp.task('copy:assets', function () {
    return gulp.src(['app/**/*', 'assets/**/*', 'systemjs.config.js', 'config.js', 'package.json', 'index.html', 'styles.css', '!app/**/*.ts'], { base: './' })
        .pipe(gulp.dest('dist'));
});

/**
 * Watch for changes in HTML and CSS files.
 */
gulp.task('watch', function () {
    return gulp.src('', { base: "./" })
        .pipe(watch(["app/**/*.html", "app/**/*.css", "assets/**/*", "styles.css", "index.html", "systemjs.config.js"], { base: "./" }))
        .pipe(gulp.dest("./dist"));
});

/**
 * Watch for changes in TypeScript files.
 */
gulp.task('watch-ts', function () {
    gulp.watch('app/**/*.ts', ['compile']);
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
        parallel: 5,
        log: gutil.log
    });

    return gulp.src("dist/**", { base: 'dist/', buffer: false })
        .pipe(conn.newerOrDifferentSize('site/wwwroot')) // only upload newer files
        .pipe(conn.dest('site/wwwroot'));
});

gulp.task('default', ['build'], function () {
    console.log("Building WebCat ...");
});





