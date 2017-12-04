/*eslint-disable*/
var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');

var commonModule = 'modules/@themost/common/src/*.js';
var commonModuleDist = "modules/@themost/common";


function lint(files, options) {
    return function() {
        return gulp.src(files)
            .pipe(eslint(options))
            .pipe(eslint.format())
    };
}

function build(files, base) {
    return function () {
        return gulp.src(files)
            .pipe(sourcemaps.init())
            .pipe(babel())
            .pipe(sourcemaps.write('.'))
            //  .pipe(bundleTimer)
            .pipe(gulp.dest(base));
    }
}

// @themost/common
gulp.task('build:common', ['lint:common'],build(commonModule, commonModuleDist));

//lint @themost/common
gulp.task('lint:common', lint(commonModule));

// lint @themost
gulp.task('lint', ['lint:common']);

// build @themost
gulp.task('build', ['build:common']);

gulp.task('watch:common', ['build:common'], function () {
    gulp.watch(commonModule, function(file) {
        gutil.log(gutil.colors.green('Compiling ' + file.path));
        return build(file.path, commonModuleDist)();
    });
});



