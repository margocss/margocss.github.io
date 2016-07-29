"use strict"
var gulp = require('gulp'),
    shell = require('gulp-shell'),
    browserSync = require('browser-sync');

gulp.task('build', 
  shell.task(['jekyll build --watch'])
)

gulp.task('serve', function(){
  browserSync.init({
    server: { 
      baseDir: '_site/' // runs a serverin this directory
    }
  })

  gulp.watch('_site/**/*.*')//.on('change', function(){ browserSync.reload() })
})

gulp.task('dev', ['build', 'serve']);