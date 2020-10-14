const gulp = require('gulp')
const svgstore = require('gulp-svgstore')
const rename = require('gulp-rename')
const cheerio = require('gulp-cheerio')

module.exports = function svgSprite() {
  return gulp.src('src/img/sprite/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[style]').removeAttr('style');
      },
      parserOptions: {xmlMode: true}
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img/sprite'))
}

