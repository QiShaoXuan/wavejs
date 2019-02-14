const gulp = require("gulp")
const browserify = require("browserify")
const source = require('vinyl-source-stream')
const tsify = require("tsify")
const uglify = require('gulp-uglify')
const uglifyEs = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps')
const buffer = require('vinyl-buffer')
const browserSync = require("browser-sync").create()
const rollup = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript');
const rename = require('gulp-rename')

// gulp.task("build", function () {
//   return browserify({
//     basedir: '.',
//     debug: true,
//     entries: ['src/wave.ts'],
//     cache: {},
//     packageCache: {}
//   })
//     .plugin(tsify)
//     .bundle()
//     .on('error', (error)=>console.log(error))
//     .pipe(source('wave.js'))
//     .pipe(buffer())
//     .pipe(sourcemaps.init({loadMaps: true}))
//     // .pipe(uglify())
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest("dist"))
//     .pipe(browserSync.reload({stream: true}))
// })
gulp.task('build',['buildTs'],function () {
  gulp.src('dist/wave.js')
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.reload({stream: true}))

  gulp.src('dist/wave.es.js')
    .pipe(uglifyEs())
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(gulp.dest("dist"))
})

gulp.task('buildTs', async function () {
  const bundle = await rollup.rollup({
    input: './src/wave.ts',
    plugins: [
      rollupTypescript()
    ]
  });

  await bundle.write({
    file: './dist/wave.js',
    format: 'iife',
    name: 'Wave',
    sourcemap: false
  })
  await bundle.write({
    file: './dist/wave.es.js',
    format: 'es',
    sourcemap: false
  })
})

gulp.task("html", function () {
  return gulp.src('./index.html')
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('default', ['build'], function () {
  gulp.start('buildTs')
  browserSync.init({
    port: (new Date).getFullYear(),
    server: {
      baseDir: ['./']
    }
  })
  gulp.watch('src/**/*.ts', ['build'])
  gulp.watch('./index.html', ['html'])
})

