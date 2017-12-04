/*eslint-disable*/
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');

var commonModule = "modules/@themost/common/src/**/*.js";
var commonModuleBase = "./modules/@themost/common/src";
var commonModuleDist = "modules/@themost/common/";


function lint(files, options) {
    return function() {
        return gulp.src(files)
            .pipe(eslint(options))
            .pipe(eslint.format())
    };
}

function build(moduleSource, moduleBase, moduleDist) {
    return function () {
        return gulp.src(moduleSource, { base: moduleBase })
            .pipe(sourcemaps.init())
            .pipe(babel())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(moduleDist));
    }
}

// @themost/common
gulp.task('build:common', ['lint:common'],build(commonModule, commonModuleBase, commonModuleDist));

//lint @themost/common
gulp.task('lint:common', lint(commonModule));

// lint @themost
gulp.task('lint', ['lint:common']);

// build @themost
gulp.task('build', ['build:common']);

gulp.task('watch:common', ['build:common'], function () {
    gulp.watch(commonModule, function(file) {
        gutil.log(gutil.colors.green('Compiling ' + file.path));
        return build(file.path, commonModuleBase, commonModuleDist)();
    });
});



