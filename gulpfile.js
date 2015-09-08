var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var inject = require('gulp-inject');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon')
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var node;

var files = require('./gulp/gulp.config.js');

gulp.task('default', function(callback) {
  runSequence('postgres', 'build', 'watch', callback);
});

gulp.task('build', function (callback) {
  runSequence('clean',
    'lint',
    'copy-build',
    'index',
    'server',
    callback);
});

gulp.task('index', function() {
  return gulp.src('./public/index.html')
    .pipe(inject(gulp.src(files.app_files.tpl_src), {ignorePath: 'build/public'}))
    .pipe(gulp.dest('./build/public'));
});

gulp.task('clean', function (callback) {
  del([files.build_dir], {force: true})
  callback();
});

gulp.task('copy-build', ['copy-public', 'copy-server']);

gulp.task('copy-public', function() {
  return gulp.src('./public/**/*')
    .pipe(gulp.dest('./build/public'));
});

gulp.task('copy-server', function() {
  return gulp.src('./server/**/*')
    .pipe(gulp.dest('./build/server'));
});

gulp.task('lint', function() {
  return gulp.src(files.app_files.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  gulp.watch(files.app_files.js, ['build']);
});

gulp.task('start', function () {
  nodemon({
    script: './build/server/server.js'
  })
});

gulp.task('postgres', function() {
  exec('postgres -D /usr/local/var/postgres', function(err,stdout,stderr){
    console.log(stdout);
  });
});

gulp.task('server', function() {
  if (node) node.kill();
  node = spawn('node', ['./build/server/server.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
})