const gulp = require("gulp")
const browserify = require("browserify")
const source = require('vinyl-source-stream')
const tsify = require("tsify")
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')
const buffer = require('vinyl-buffer')
const browserSync = require("browser-sync").create()


gulp.task("build", function () {
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['src/wave.ts'],
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .bundle()
    .pipe(source('wave.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.reload({stream: true}))
})

gulp.task("html", function () {
  return gulp.src('./index.html')
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('default', ['build'], function () {
  gulp.start('build')
  browserSync.init({
    port: (new Date).getFullYear(),
    server: {
      baseDir: ['./']
    }
  })
  gulp.watch('src/**/*.ts', ['build'])
  gulp.watch('./index.html', ['html'])
})
