const gulp = require('gulp');
const config = require('../config');
const $ = require('gulp-load-plugins')();
const runSequence = require('run-sequence');
const rimraf = require('rimraf');

gulp.task('font.clean', function (cb) {
  return rimraf(config.font.dest, cb);
});

gulp.task('font.copy', function () {
  gulp.src(config.font.entry + '**')
      .pipe(gulp.dest(config.font.dest));
});

gulp.task('font.build',function() {
  runSequence(
    'font.clean',
    'font.copy'
  );
});