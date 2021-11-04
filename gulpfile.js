/* jshint strict: true */
'use strict';

const gulp = require('gulp');
const { watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const pug = require('gulp-pug');

function css(cb) {
    gulp.src('./src/sass/app.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass()).pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/'));
    cb();
}

function html(cb) {
    gulp.src('./src/pug/index.pug').pipe(plumber())
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(pug({
            pretty: true,
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/'));
    cb();
}

exports.default = parallel(css, html);
exports.watch = function() {
    watch('./src/sass/**/*.scss', { ignoreInitial: false }, css);
    watch('./src/pug/**/*.pug', { ignoreInitial: false }, html);
};
