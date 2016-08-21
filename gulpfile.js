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


gulp.task('minify-production-css', ['run-autoprefix'], function(){
  return gulp.src('./_site/css/main.css')
    .pipe(cleanCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('./_site/css'))
})

gulp.task('build-production', shell.task([
    'jekyll build'
]))

gulp.task('run-autoprefix', function(){
  return gulp.src('./_site/css/main.css')
    .pipe(autoprefixer({ browsers: ['> 5%'] }))
    .pipe(gulp.dest('./_site/css/'))
})



gulp.task('minify-dist-css', ['run-autoprefix-dist'], function(){
  return gulp.src('./dist/margo.css')
    .pipe(cleanCSS())
    .pipe(rename('margo.min.css'))
    .pipe(gulp.dest('dist'))
})

gulp.task('run-autoprefix-dist', function(){
  return gulp.src('./dist/margo.css')
    .pipe(autoprefixer({ browsers: ['> 5%'] }))
    .pipe(gulp.dest('./dist'))
})







gulp.task('dev', ['build-dev', 'serve']);

gulp.task('production', ['build-production', 'minify-production-css']);

gulp.task('dist', ['minify-dist-css']); 