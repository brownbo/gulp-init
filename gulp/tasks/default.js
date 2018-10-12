var minimist = require('minimist');

const gulp = require('gulp');

let knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'production' }
};

let options = minimist(process.argv.slice(2), knownOptions);

if (options.env === 'production') {
  gulp.task('default', [
    'moc.build',
    'css.build',
    'image.build',
    'js.build',
  ]);
} else {
  gulp.task('default', [
    'moc.build',
    'css.build',
    // 'font.build',
    'image.build',
    'js.build',
    'browserSync',
    'watch'
  ]);
}