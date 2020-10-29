const gulp = require('gulp')
const concat = require('gulp-concat')
const gulpif = require('gulp-if')
const argv = require('yargs').argv

const vendorsScripts = [
  'node_modules/svg4everybody/dist/svg4everybody.min.js',
  'dev/static/js/vendor/jquery-3.3.1.min.js',
  'dev/static/js/vendor/responsive.js',
  'node_modules/slick-carousel/slick/slick.js',
  'node_modules/jquery-lazy/jquery.lazy.min.js',
  'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
  'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
  'dev/static/js/vendor/rateyo.js',
  'node_modules/svg4everybody/dist/svg4everybody.js',
]

module.exports = function vendors(cb) {
  return vendorsScripts.length
    ? gulp.src(vendorsScripts)
      .pipe(concat('libs.js'))
      .pipe(gulp.dest('dist/static/js/'))
    : cb();
};
