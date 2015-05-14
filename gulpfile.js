var gulp = require('gulp');
var jspm = require('jspm');
var del = require('del');
var jade = require('gulp-jade');
var serve = require('gulp-live-server');

gulp.task('build', ['bundle', 'jade']);

gulp.task('serve', ['build'], function() {
  var server = serve.static('dist').start();

  gulp.watch(['src/*.jade'], ['jade']);
  gulp.watch(['src/js/*.js'], ['bundle']);
  gulp.watch(['src'], server.notify);
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
