"use strict";

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    rimraf = require('rimraf'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    rigger = require('gulp-rigger');

/* -------------------------Homework JS 17-18------------------------- */
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
/* -------------------------Homework JS 19-20------------------------- */
var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'JS_19_20/build/',
        js: 'JS_19_20/build/js/',
        css: 'JS_19_20/build/css/',
        img: 'JS_19_20/build/img/',
        fonts: 'JS_19_20/build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'JS_19_20/src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'JS_19_20/src/js/script.min.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'JS_19_20/src/style/style.min.scss',
        img: 'JS_19_20/src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'JS_19_20/src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'JS_19_20/src/**/*.html',
        js: 'JS_19_20/src/js/**/*.js',
        style: 'JS_19_20/src/style/**/*.scss',
        img: 'JS_19_20/src/img/**/*.*',
        fonts: 'JS_19_20/src/fonts/**/*.*'
    },
    clean: './JS_19_20/build'
};
var config = {
    server: {
        baseDir: "./JS_19_20/build"
    },
    // tunnel: true,
    // host: 'localhost',
    // port: 9000,
    // logPrefix: "Frontend_Devil"
};
gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});
gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        // .pipe(uglify()) //Сожмем наш js
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});
gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(sass()) //Скомпилируем
        .pipe(autoprefixer()) //Добавим вендорные префиксы
        // .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
});
gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});
gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);
gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});
gulp.task('webserver', function () {
    browserSync.init(config);
});
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});
gulp.task('19_20:build', ['build', 'webserver', 'watch']);
