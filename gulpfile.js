var gulp = require('gulp');
var jspm = require('jspm');
var del = require('del');
var jade = require('gulp-jade');
var serve = require('gulp-live-server');
var sass = require('gulp-sass');

gulp.task('build', ['bundle', 'jade', 'sass']);

gulp.task('serve', ['build'], function() {
  var server = serve.static('dist').start();

  gulp.watch(['src/**/*'], server.notify);
  gulp.watch(['src/**/*'], ['build']);
});

gulp.task('clean', function(done) {
  del(['dist/*'], done);
});

gulp.task('bundle', ['clean'], function(done) {
  jspm.bundleSFX('src/js/main', 'dist/app.js', { minify: true, sourceMaps: true })
    .then(done);
});

gulp.task('jade', ['clean'], function() {
  gulp.src('src/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', ['clean'], function() {
  gulp.src('src/styles/main.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('dist'));
});
