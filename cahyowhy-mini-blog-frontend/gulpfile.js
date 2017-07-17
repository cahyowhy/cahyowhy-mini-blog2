var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gulp = require('gulp');
var order = require("gulp-order");

var jsFiles = 'vendor/**/*.js', jsDest = 'public';
gulp.task('default', function () {
  return gulp.src(jsFiles)
    .pipe(order([
      "vendor/lib/**/*.js",
      "vendor/layout/**/*.js"
    ]))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(jsDest))
    .pipe(rename('bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
});
