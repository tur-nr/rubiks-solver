var gulp = require('gulp');
var jspm = require('jspm');
var del = require('del');
var jade = require('gulp-jade');
var serve = require('gulp-live-server');
var sass = require('gulp-sass');

gulp.task('default', ['build']);

gulp.task('build', ['bundle', 'jade', 'sass']);

gulp.task('serve', ['build'], function() {
  var server = serve.static('dist').start();

  gulp.watch(['src/**/*'], server.notify);
  gulp.watch(['src/**/*'], ['build']);
});

gulp.task('clean:style', function(done) {
  del(['dist/*.css'], done);
});

gulp.task('clean:js', function(done) {
  del(['dist/*.js'], done);
});

gulp.task('clean:html', function(done) {
  del(['dist/*.html'], done);
});

gulp.task('bundle', ['clean:js'], function(done) {
  jspm.bundleSFX('src/js/main', 'dist/app.js', { minify: false, sourceMaps: false })
    .then(done);
});

gulp.task('jade', ['clean:html'], function() {
  gulp.src('src/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', ['clean:style'], function() {
  gulp.src('src/styles/main.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('dist'));
});
