const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');

// clean the contents of the distribution directory
gulp.task('clean', function() {
  return del('dist/**/*');
});

// TypeScript compile
gulp.task('compile', function() {
  return gulp
    .src('src/app/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/app'));
});

// copy dependencies
gulp.task('copy:libs', function() {
  return gulp.src([
      'node_modules/es6-shim/es6-shim.min.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/systemjs/dist/system.src.js'
    ])
    .pipe(gulp.dest('dist/lib'));
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', function() {
  return gulp.src(['src/**/*', 'index.html', 'styles.css', '!src/app/**/*.ts'], { base : './' })
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean','copy:libs', 'copy:assets', 'compile']);
gulp.task('default', ['build']);
