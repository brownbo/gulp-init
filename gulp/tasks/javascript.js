const gulp = require('gulp')
const rollup = require('rollup')
const config = require('../config')
const $ = require('gulp-load-plugins')()
const runSequence = require('run-sequence')
const rimraf = require('rimraf')
const babel = require('rollup-plugin-babel')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const pug = require('rollup-plugin-pug')
const resolve = require('rollup-plugin-node-resolve')
const concat = require('gulp-concat-util')
const rollupUglify = require('rollup-plugin-uglify')

gulp.task('js.clean', (cb) => {
  return rimraf(config.js.dest, cb)
})

gulp.task('js.vendor', () => {
  return gulp.src([
    'node_modules/babel-polyfill/dist/polyfill.js',
    'node_modules/fastclick/lib/fastclick.js',
    config.vendor.entry + '*.js',
    config.js.entry + 'lib/' + '*.js'
  ])
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(config.js.dest))

})

gulp.task('js.main', () => {
  return rollup.rollup({
    input: config.js.entry + 'application.js',
    plugins: [
      resolve(),
      pug({}),
      babel({
        exclude: 'node_modules/**'
      }),
      rollupUglify.uglify({})
    ]
  }).then(bundle => {
    return bundle.write({
      file: config.js.dest + 'application.min.js',
      format: 'umd',
      sourcemap: true
    })
  })
})

gulp.task('js.copy', () => {
  return gulp.src(config.js.dest+ '*')
    .pipe(gulp.dest(config.js.resource))
})

gulp.task('js.build', () => {
  runSequence(
    'js.clean',
    'js.vendor',
    'js.main',
    // 'js.copy',
    'browserSync.reload'
  )
})