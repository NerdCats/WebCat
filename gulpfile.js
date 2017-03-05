const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');
const runSequence = require('run-sequence');
const minimist = require('minimist');
var args = minimist(process.argv.slice(2));
var systemBuilder = require('systemjs-builder');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var cssnano = require('gulp-cssnano');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var args = require('yargs').argv;

// Loading typescript requirements
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
var watch = require('gulp-watch');
var inject = require('gulp-inject');
var deploy = require('gulp-deploy-git');


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
 * Remove prod directory.
 */
gulp.task('clean:prod', function (cb) {
    del(["prod"]).then(function (paths) {
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
        .src(['app/**/*.ts', 'tests/**/*.ts'])
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
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
// we are just mimicking the dev environment now, but for production a
// lot more has to be done
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
        'angular2-google-maps/**',
        'angular2-in-memory-web-api/web-api.js',
        '@angular/**',
        'moment/moment.js',
        'ng2-bootstrap/**',
        'ng2-bs3-modal/**',
        'rdash-ui/dist/css/rdash.css',
        'font-awesome/css/font-awesome.css',
        'font-awesome/fonts/**',
    ], { cwd: "node_modules/**" }) /* Glob required here. */
        .pipe(gulp.dest("dist/lib"));
});

gulp.task('copy:fonts', function(){
    return gulp.src([
        'node_modules/bootstrap/dist/fonts/*',
    ]).pipe(gulp.dest("dist/lib/bootstrap/dist/fonts"));
})

// copy dependencies from node_modules
// we are just mimicking the dev environment now, but for production a lot more has to be done
gulp.task('copy:test-libs', function () {
    return gulp.src([
        'jasmine-core/lib/jasmine-core/jasmine.css',
        'jasmine-core/lib/jasmine-core/jasmine.js',
        'jasmine-core/lib/jasmine-core/jasmine-html.js',
        'jasmine-core/lib/jasmine-core/boot.js'
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

gulp.task('copy:test-assets', function () {
    return gulp.src(['test/**/*', 'test.html', '!test/**/*.ts'], { base: './' })
        .pipe(gulp.dest('dist'));
});

/**
 * Watch for changes in HTML and CSS files.
 */
gulp.task('watch', function () {
    return gulp.src('', { base: "./" })
        .pipe(watch(["app/**/*.html", "app/**/*.css", "assets/**/*", "styles.css", "index.html", "test.html", "systemjs.config.js"], { base: "./" }))
        .pipe(gulp.dest("./dist"));
});

/**
 * Watch for changes in TypeScript files.
 */
gulp.task('watch-ts', function () {
    gulp.watch(['app/**/*.ts', 'tests/**/*.ts'], ['compile']);
});


/**
 * The development build script
 */

gulp.task('build', function (callback) {
    runSequence('clean',
        'compile',
        ['copy:assets', 'copy:test-assets', 'copy:libs', 'copy:fonts', 'copy:test-libs'],
        callback);
});

/**
 * The system-js builder build script
 */

gulp.task('build-systemjs', function (done) {
    var builder = new systemBuilder("./dist", "systemjs.config.js");

    builder.buildStatic('app/main.js', 'prod/app/bundle.js', {
        normalize: true,
        minify: true,
        mangle: true,
        runtime: false,
        globalDefs: { DEBUG: false, ENV: 'production' }
    }
    )
        .then(function () {
            console.log('Build complete');
            done();
        })
        .catch(function (ex) {
            console.log('error', ex);
            done('Build failed.');
        });
});

/**
 * The production asset move script
 */
gulp.task('build:prod-asset', function (done) {

    gulp.src(['app/**/*.html'], { base: './' })
        .pipe(gulp.dest('prod/'));

    gulp.src(['*.css'], { base: './' })
        .pipe(cssnano())
        .pipe(gulp.dest('prod/'));

    gulp.src(['node_modules/bootstrap/dist/fonts/*'])
        .pipe(gulp.dest('prod/fonts'));

    gulp.src('app/**/*.css', { base: './' })
        .pipe(cssnano())
        .pipe(gulp.dest('prod/'));

    gulp.src('assets/' + '**/*.*', { base: './' })
        .pipe(gulp.dest('prod/'));

    gulp.src(['dist/lib/font-awesome/fonts/*.*'])
        .pipe(gulp.dest('prod/fonts'));

    gulp.src('dist/index.html')
        .pipe(useref())
        .pipe(gulpif('*.css', cssnano()))
        .pipe(gulpif('!*.html', rev()))
        .pipe(revReplace())
        .pipe(gulp.dest('prod/'))
        .on('finish', done);

    gulp.src('./prod/app/*.js')
        .pipe(rev())
        .pipe(revReplace())
        .pipe(gulp.dest('prod/app'))
});

gulp.task('build:inject-index', function (done) {

    var bundleSources = gulp.src('./prod/app/bundle-*.js', { read: false });
    gulp.src('./prod/index.html')
        .pipe(inject(bundleSources, { ignorePath: 'prod' }))
        .pipe(gulp.dest('prod/'))
        .on('finish', done);
});

/**
 * The production build script
 */

gulp.task('build:prod', function (callback) {
    runSequence('clean',
        'clean:prod',
        'compile',
        'copy:libs',
        'copy:assets',
        'build-systemjs',
        'build:prod-asset',
        'build:inject-index',
        callback);
});


/**
 * The deploy script
 */

gulp.task('deploy-remote', function () {
    return gulp.src('dist/**/*', { read: false })
        .pipe(deploy({
            prefix: "dist",
            repository: args.repo,
            verbose: true
        }));
});

gulp.task('deploy-remote-prod', function () {
    return gulp.src('prod/**/*', { read: false })
        .pipe(deploy({
            prefix: "prod",
            repository: args.repo,
            verbose: true
        }));
});

gulp.task('default', ['build'], function () {
    console.log("Building WebCat ...");
});





