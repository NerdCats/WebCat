const gulp = require('gulp');
const del = require('del');

// Loading typescript requirements
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');

// Cleanup the dist folder
gulp.task('clean', function () {
    return del('dist/**/*');
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

gulp.task('build', ['compile']);
gulp.task('default', ['build']);