'use strict';

var gulp = require('gulp'),
  connect = require('gulp-connect'),
  wiredep = require('wiredep').stream,
  sass = require('gulp-sass');
 

 //SASS
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
  	.pipe(sass({
		includePaths: require('bourbon').includePaths}).on('error', sass.logError))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'))
    .pipe(connect.reload());
});
 
 //SERVER
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});
 
 //HTML
gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});
 

 //WATCH
gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html'])
  gulp.watch('./sass/**/*.scss', ['sass'])
  gulp.watch('bower.json', ['bower']);
});

//WIREDER
gulp.task('bower', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      optional: 'configuration',
      goes: 'here'
    }))
    .pipe(gulp.dest('./app'));
});
 
gulp.task('default', ['connect', 'watch']);