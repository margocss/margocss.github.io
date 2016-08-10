"use strict"
var gulp = require('gulp'),
    shell = require('gulp-shell'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
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

gulp.task('minify-dist-css', function(){
  return gulp.src('./_site/css/main.css')
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename('margo.min.css'))
    .pipe(gulp.dest('dist'))


})

gulp.task('minify-production-css', function(){
  return gulp.src('./_site/css/main.css')
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('./_site/css'))

})


gulp.task('build-production', shell.task([
    'jekyll build'
]))


gulp.task('build-dist', shell.task([
  'rm -rf ./dist/*', 
  'jekyll build',
  'echo "done building...."',
  'cp ./_site/css/main.css ./dist/margo.css',
  'cp -rf ./_sass/lib/* ./dist/',
]))




gulp.task('dev', ['build-dev', 'serve']);

gulp.task('production', ['build-production', 'minify-production-css']);

gulp.task('dist', ['build-dist', 'minify-dist-css']);