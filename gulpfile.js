"use strict"
var gulp = require('gulp'),
    shell = require('gulp-shell'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync');

gulp.task('build-dev', 
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

gulp.task('minify-css', function(){
  return gulp.src('./_site/css/main.css')
    .pipe(cleanCSS())
    .pipe(rename('margo.min.css'))
    .pipe(gulp.dest('dist/margo-lib'))

})

gulp.task('build-production', shell.task([
  'rm -rf ./dist/margo-lib; ', 
  'mkdir ./dist/margo-lib',
  'jekyll build',
  'echo "done building...."',
  'cp ./_site/css/main.css ./dist/margo-lib/main.css',
  'cp -rf ./_sass/lib/* ./dist/margo-lib/'
]))




gulp.task('dev', ['build-dev', 'serve']);

gulp.task('production', ['minify-css', 'build-production']);