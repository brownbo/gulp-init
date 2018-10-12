const gulp = require('gulp');
const config = require('../config');
const runSequence = require('run-sequence');
const rimraf = require('rimraf');
const fs = require('fs');
const junk = require('junk');
const $ = require("gulp-load-plugins")();
const data = require('gulp-data');
const extname = require('gulp-extname');
var async = require('async');

const rename = require('gulp-rename');

/**************************************************
 * config
 *************************************************/


/**************************************************
 * task
 *************************************************/

gulp.task('moc.staticDataFile', () => {
  let staticFileArr = ['privacyPolicy', 'termsOfService']

  for (let fileItem of staticFileArr) {
    const template = `./assets/dev/html/static/${fileItem}.pug`;
    const jsonPath = `./assets/dev/html/data/${fileItem}.json`;
    const dest = './assets/build/static/';
    const json = JSON.parse(fs.readFileSync(jsonPath));
    var option = {
      pretty: true,
      basedir: config.moc.entry
    }

    for (var i = 0; i < json.length; i++) {
      var item = json[i]
      gulp.src(template)
        .pipe($.plumber({
          errorHandler: $.notify.onError('<%= error.message %>')
        }))
        .pipe(rename(item.file_name + ".html"))
        .pipe(data(function (file) {
          var _file_name = file.path.split('/').pop().replace('.html', '');
          var data
          json.forEach(function (el) {
            if (el.file_name === _file_name) {

              data = el
            }
          });
          return {
            ['data_' + fileItem]: data
          }
        }))
        .pipe(data(function (file) {
          var dirname = config.moc.entry + 'data/';
          var files = fs.readdirSync(dirname).filter(junk.not);
          var json = {};
          files.forEach(function (filename) {
            json[filename.replace(".json", "")] = require('../../assets/dev/html/data/' + filename);
          });
          return {data: json};
        }))
        .pipe($.pug(option))
        .pipe(gulp.dest(dest));
    }

  }
});

gulp.task('moc.generate', function () {
  var option = {
    pretty: true,
    basedir: config.moc.entry
  }
  return gulp.src([config.moc.entry + '**/*.pug','!'+config.moc.entry + 'static/*.pug', '!' + config.moc.entry + '**/_*.pug'])
    .pipe($.plumber({
      errorHandler: $.notify.onError('<%= error.message %>')
    }))
    .pipe(data(function (file) {
      var dirname = config.moc.entry + 'data/';
      var files = fs.readdirSync(dirname).filter(junk.not);
      var json = {};
      files.forEach(function (filename) {
        json[filename.replace(".json", "")] = require('../../assets/dev/html/data/' + filename);
      });
      return {data: json};
    }))
    .pipe($.pug(option))
    .pipe(gulp.dest(config.moc.dest));
});

gulp.task('moc.prettify', function () {
  return gulp.src([config.moc.dest + '/*.html', config.moc.dest + '/**/*.html'])
    .pipe($.prettify({indent_size: 2}))
    .pipe(gulp.dest(config.moc.dest))
});

gulp.task('moc.build', function () {
  runSequence(
    'moc.generate',
    'moc.staticDataFile',
    'moc.prettify',
    ['browserSync.reload']
  );
});