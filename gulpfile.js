// loads various gulp modules
var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');

// create task
gulp.task('css', function(){
  gulp.src('stylesheets/*.css')
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('stylesheets'))
});
