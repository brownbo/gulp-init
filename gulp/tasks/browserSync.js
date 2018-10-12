const gulp = require('gulp');
const browserSync = require("browser-sync").create('My Server');
const config = require('../config');
const proxy = require('http-proxy-middleware');

const apiProxy = proxy('/proxy/', {
  target: 'https://dev.hodaiweb.com/',
  changeOrigin: true,   // for vhosted sites
  pathRewrite: {
    '^/proxy/': '',     // rewrite path
  },
});

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: config.dest,
      port: 3000,
      middleware: [apiProxy]
    },
    startPath: '/top/top.html?isDev=true',
  });
});

gulp.task('browserSync.reload', function () {
  browserSync.reload();
});