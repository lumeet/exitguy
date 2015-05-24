gulp        = require 'gulp'
rimraf      = require 'rimraf'
coffee      = require 'gulp-coffee'
sass        = require 'gulp-sass'
concat      = require 'gulp-concat'
runSequence = require 'run-sequence'

paths =
  lib: './src/lib/**/*.coffee'
  examples:
    coffee: './src/examples/**/*.coffee'
    sass: './src/examples/**/*.scss'
    html: './src/examples/**/*.html'
  dist: './dist'

gulp.task 'clean', (callback) ->
  rimraf(paths.dist, callback)

gulp.task 'lib', ->
  gulp.src(paths.lib)
    .pipe(coffee({ bare: true }))
    .pipe(concat('exitman.js'))
    .pipe(gulp.dest("#{paths.dist}/lib"))

gulp.task 'examples', ['examples-coffee', 'examples-sass', 'examples-html']

gulp.task 'examples-coffee', ->
  gulp.src(paths.examples.coffee)
    .pipe(coffee({ bare: true }))
    .pipe(gulp.dest("#{paths.dist}/examples"))

gulp.task 'examples-sass', ->
  gulp.src(paths.examples.sass)
    .pipe(sass.sync())
    .pipe(gulp.dest("#{paths.dist}/examples"))

gulp.task 'examples-html', ->
  gulp.src(paths.examples.html)
    .pipe(gulp.dest("#{paths.dist}/examples"))

gulp.task 'build', (callback) ->
  runSequence('clean', ['lib', 'examples'], callback)

gulp.task 'watch', ->
  gulp.watch paths.lib, ['lib']
  gulp.watch paths.examples.coffee, ['examples-coffee']
  gulp.watch paths.examples.sass, ['examples-sass']
  gulp.watch paths.examples.html, ['examples-html']

gulp.task 'default', ['watch', 'build']
