"use strict";

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat');

gulp.task('scripts', function () {
    gulp.src('JS_17_18/src/js/*.js')
        .pipe(concat('script.min.js', {newLine: ';'}))
        .pipe(uglify())
        .pipe(gulp.dest('JS_17_18/dist/js/'));
});

gulp.task('styles', function () {
    gulp.src('JS_17_18/src/css/*.css')
        .pipe(concat('style.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('JS_17_18/dist/css/'));
});

gulp.task('default', ['scripts', 'styles']);
