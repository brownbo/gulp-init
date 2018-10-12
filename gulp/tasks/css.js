const gulp = require('gulp');
const config = require('../config');
const $ = require("gulp-load-plugins")();
const runSequence = require('run-sequence');
const rimraf = require('rimraf');
$.sourcemaps = require('gulp-sourcemaps');

gulp.task('css.clean', function (cb) {
  return rimraf(config.stylesheet.dest, cb);
});

gulp.task('css.scss', function () {
  return gulp.src(config.stylesheet.entry + 'application.scss')
    .pipe($.sourcemaps.init())
    .pipe($.plumber({
      errorHandler: $.notify.onError('<%= error.message %>')
    }))
    .pipe($.sass({
      outputStyle: 'expanded'
    }))
    .pipe($.autoprefixer({
      browsers: ['last 10 versions', 'IE 11'],
      cascade: false
    }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(config.stylesheet.dest));
});

gulp.task('css.min', function () {
  return gulp.src(['!' + config.stylesheet.dest + '*.min.css', config.stylesheet.dest + '*.css'])
    .pipe($.cssmin())
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.stylesheet.dest));
});

gulp.task('css.vendor', () => {
  return gulp.src([config.vendor.entry + '*.*.css'])
    .pipe(gulp.dest(config.vendor.dest))
})

gulp.task('css.copy', () => {
  return gulp.src(config.stylesheet.dest +'*')
    .pipe(gulp.dest(config.stylesheet.resource))
})

gulp.task('css.build', function () {
  runSequence(
    'css.vendor',
    'css.clean',
    'css.scss',
    ['browserSync.reload', 'css.min'],
    // 'css.copy'
  );
});