const gulp = require('gulp');
const del = require('del');

// Loading typescript requirements
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');

// npm
var install = require("gulp-install");

// Cleanup the dist folder
gulp.task('clean', function () {
    return del(['dist/**/*', '!dist/node_modules', '!dist/node_modules/**/*']);
});

// Hard cleanup the dist folder
gulp.task('clean:hard', function () {
    return del(['dist/**/*']);
});


// Compile Typescript
gulp.task('compile', ['clean'], function () {
    var tsProject = typescript.createProject('tsconfig.json');
    return tsProject
        .src('app/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/app'));
});

// Tslint
gulp.task('tslint', function() {
  return gulp.src('app/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

// copy dependencies from node_modules
// we are just mimicking the dev environment now, but for production a lot more has to be done
gulp.task('copy:libs', ['clean'], function () {
    return gulp.src([
        'node_modules/**/*'
    ])
        .pipe(gulp.dest('dist/node_modules'))
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', ['clean'], function () {
    return gulp.src(['app/**/*', 'assets/**/*', 'systemjs.config.js', 'config.js', 'package.json', 'index.html', 'styles.css', '!app/**/*.ts'], { base: './' })
        .pipe(gulp.dest('dist'))
});

// install packages in dist, its still dev mode, we will have different folders for dev and prod mode later
gulp.task('copy:dep', ['copy:assets'], function () {
    gulp.src(['./dist/package.json'])
        .pipe(install());
});

gulp.task('build', ['copy:dep', 'compile']);
gulp.task('default', ['build']);




