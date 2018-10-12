const gulp = require('gulp');
const config = require('../config');
const $ = require('gulp-load-plugins')();
const runSequence = require('run-sequence');
const rimraf = require('rimraf');

gulp.task('image.clean', function (cb) {
  return rimraf(config.image.dest, cb);
});

gulp.task('image.copy', function () {
  return gulp.src(config.image.entry + '**')
    .pipe(gulp.dest(config.image.dest))
    // .pipe(gulp.dest(config.image.resource));
});

gulp.task('image.min', function () {
  return gulp.src(config.image.dest + '**')
    .pipe($.imagemin())
    .pipe(gulp.dest(config.image.dest));
});

gulp.task('image.build', function () {
  runSequence(
    'image.clean',
    'image.copy'
  );
});