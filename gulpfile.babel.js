/*eslint-disable*/
var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');

var commonModule = [
    'modules/@themost/common/**/*.es6.js',
    '!modules/@themost/common/node_modules/**/*.es6.js'
];


function lint(files, options) {
    return function() {
        return gulp.src(files)
            .pipe(eslint(options))
            .pipe(eslint.format())
    };
}

function build(files) {
    return function () {

        return gulp.src(files)
        // .once('data', bundleTimer.start)
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(sourcemaps.init())
            .pipe(babel())
            .pipe(sourcemaps.write('.'))
            //  .pipe(bundleTimer)
            .pipe(gulp.dest(function (file) {
                return file.base.replace(/\.es6$/,"");
            }));
    }
}

// @themost/common
gulp.task('build:common', ['lint:common'],build(commonModule));

//lint @themost/common
gulp.task('lint:common', lint(commonModule));

// lint @themost
gulp.task('lint', ['lint:common']);

// build @themost
gulp.task('build', ['build:common']);

gulp.task('watch', ['build'], function () {
    var files = commonModule;
    gulp.watch(files, function(file) {
        gutil.log(gutil.colors.green('Compiling ' + file.path));
        return build(file.path)();
    });
});



