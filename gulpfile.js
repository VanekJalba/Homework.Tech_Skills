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
    rigger = require('gulp-rigger'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    babel = require("gulp-babel");

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

gulp.task('17_18:build', ['scripts', 'styles']);
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
    }
};
gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});
gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});
gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(sass()) //Скомпилируем
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(autoprefixer()) //Добавим вендорные префиксы
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
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
/* -------------------------Homework JS 21-22------------------------- */
var path22 = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'JS_21_22/2/build/',
        js: 'JS_21_22/2/build/js/',
        css: 'JS_21_22/2/build/css/'
    },
    src: { //Пути откуда брать исходники
        html: 'JS_21_22/2/src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'JS_21_22/2/src/js/script.min.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'JS_21_22/2/src/style/style.min.scss'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'JS_21_22/2/src/**/*.html',
        js: 'JS_21_22/2/src/js/**/*.js',
        style: 'JS_21_22/2/src/style/**/*.scss'
    },
    clean: './JS_21_22/2/build'
};
var config22 = {
    server: {
        baseDir: "./JS_21_22/2/build"
    }
};
gulp.task('21_22:html:build', function () {
    gulp.src(path22.src.html) //Выберем файлы по нужному пути
        .pipe(gulp.dest(path22.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});
gulp.task('21_22:js:build', function () {
    gulp.src(path22.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path22.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});
gulp.task('21_22:style:build', function () {
    gulp.src(path22.src.style) //Выберем наш main.scss
        .pipe(sass()) //Скомпилируем
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(autoprefixer()) //Добавим вендорные префиксы
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path22.build.css)) //И в build
        .pipe(reload({stream: true}));
});
gulp.task('21_22:buildAll', [
    '21_22:html:build',
    '21_22:js:build',
    '21_22:style:build'
]);
gulp.task('21_22:watch', function(){
    watch([path22.watch.html], function(event, cb) {
        gulp.start('21_22:html:build');
    });
    watch([path22.watch.style], function(event, cb) {
        gulp.start('21_22:style:build');
    });
    watch([path22.watch.js], function(event, cb) {
        gulp.start('21_22:js:build');
    });
});
gulp.task('21_22:webserver', function () {
    browserSync.init(config22);
});
gulp.task('21_22:clean', function (cb) {
    rimraf(path22.clean, cb);
});
gulp.task('21_22:build', ['21_22:buildAll', '21_22:webserver', '21_22:watch']);
/* -------------------------Homework JS Exam------------------------- */
var path_exam = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'JS_Exam/build/',
        js: 'JS_Exam/build/js/',
        css: 'JS_Exam/build/css/',
        img: 'JS_Exam/build/img/',
        fonts: 'JS_Exam/build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'JS_Exam/src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'JS_Exam/src/js/*.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'JS_Exam/src/style/style.min.scss',
        img: 'JS_Exam/src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'JS_Exam/src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'JS_Exam/src/**/*.html',
        js: 'JS_Exam/src/js/**/*.js',
        style: 'JS_Exam/src/style/**/*.scss',
        img: 'JS_Exam/src/img/**/*.*',
        fonts: 'JS_Exam/src/fonts/**/*.*'
    },
    clean: './JS_Exam/build'
};
var config_exam = {
    server: {
        baseDir: "./JS_Exam/build"
    }
};
gulp.task('Exam:html:build', function () {
    gulp.src(path_exam.src.html) //Выберем файлы по нужному пути
        .pipe(gulp.dest(path_exam.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});
gulp.task('Exam:js:build', function () {
    gulp.src(path_exam.src.js) //Найдем наш main файл
        .pipe(plumber())
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path_exam.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});
gulp.task('Exam:style:build', function () {
    gulp.src(path_exam.src.style) //Выберем наш main.scss
        .pipe(plumber())
        .pipe(sass()) //Скомпилируем
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(autoprefixer({
			    browsers: ['last 2 versions', 'ie >= 8'],
			    cascade: false
		    })) //Добавим вендорные префиксы
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path_exam.build.css)) //И в build
        .pipe(reload({stream: true}));
});
gulp.task('Exam:image:build', function () {
    gulp.src(path_exam.src.img) //Выберем наши картинки
        .pipe(gulp.dest(path_exam.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});
gulp.task('Exam:fonts:build', function() {
    gulp.src(path_exam.src.fonts)
        .pipe(gulp.dest(path_exam.build.fonts))
});
gulp.task('Exam:build', [
    'Exam:html:build',
    'Exam:js:build',
    'Exam:style:build',
    'Exam:fonts:build',
    'Exam:image:build'
]);
gulp.task('Exam:watch', function(){
    watch([path_exam.watch.html], function(event, cb) {
        gulp.start('Exam:html:build');
    });
    watch([path_exam.watch.style], function(event, cb) {
        gulp.start('Exam:style:build');
    });
    watch([path_exam.watch.js], function(event, cb) {
        gulp.start('Exam:js:build');
    });
    watch([path_exam.watch.img], function(event, cb) {
        gulp.start('Exam:image:build');
    });
    watch([path_exam.watch.fonts], function(event, cb) {
        gulp.start('Exam:fonts:build');
    });
});
gulp.task('Exam:webserver', function () {
    browserSync.init(config_exam);
});
gulp.task('exam:clean', function (cb) {
    rimraf(path_exam.clean, cb);
});
gulp.task('exam:build:all', ['Exam:build', 'Exam:webserver', 'Exam:watch']);
