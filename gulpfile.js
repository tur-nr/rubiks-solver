var gulp = require('gulp');
var jspm = require('jspm');
var del = require('del');
var jade = require('gulp-jade');
var serve = require('gulp-live-server');
var sass = require('gulp-sass');

gulp.task('default', ['build']);

gulp.task('build', ['bundle', 'jade', 'sass', 'images']);

gulp.task('serve', ['build'], function() {
  var server = serve.static('dist').start();

  gulp.watch(['src/*.jade'], ['jade']);
  gulp.watch(['src/js/*.js'], ['bundle']);
  gulp.watch(['src/styles/*.scss'], ['sass']);
  gulp.watch(['src/assets/*'], ['images']);
  gulp.watch(['src/**/*'], server.notify);
});

gulp.task('clean:style', function(done) {
  del(['dist/*.css'], done);
});

gulp.task('clean:js', function(done) {
  del(['dist/*.js'], done);
});

gulp.task('clean:image', function(done) {
  del(['dist/assets/*'], done);
});

gulp.task('clean:html', function(done) {
  del(['dist/*.html'], done);
});

gulp.task('images', ['clean:image'], function() {
  gulp.src('src/assets/*')
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('bundle', ['clean:js'], function(done) {
  jspm.bundleSFX('src/js/main', 'dist/app.js', { minify: false, sourceMaps: false })
    .then(function() {
      gulp.src('jspm_packages/github/rcombs/Cube.js@master/CubeWorker.js')
        .pipe(gulp.dest('dist'))
        .on('end', done);
    });
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
