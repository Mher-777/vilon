"use strict";

$(function () {
  svg4everybody({});

  var mainSliders = function mainSliders() {
    $('.slider__carousel').slick({
      fade: true,
      arrows: false,
      dots: true,
      autoplay: true,
      touchThreshold: 40,
      dotsClass: 'pagination slider__pagination',
      cssEase: 'linear'
    }).on('afterChange', function (event, slick, currentSlide) {
      lazyLoad();
    }).on('beforeChange', function (event, slick, currentSlide) {
      lazyLoad();
    });
    $('.category__slider').slick({
      slidesToShow: 7,
      slidesToScroll: 1,
      touchThreshold: 40,
      prevArrow: '<button type="button" class="arrow arrow--left"><img class="arrow__icon" src="static/images/common/arrow-left.svg" alt=""></button>',
      nextArrow: '<button type="button" class="arrow arrow--right"><img class="arrow__icon" src="static/images/common/arrow-right.svg" alt=""></button>',
      responsive: [{
        breakpoint: 1660,
        settings: {
          slidesToShow: 6
        }
      }, {
        breakpoint: 1460,
        settings: {
          slidesToShow: 5
        }
      }, {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4
        }
      }, {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 773,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 601,
        settings: {
          slidesToShow: 1
        }
      }]
    }).on('breakpoint', function () {
      sliderSpace();
    }).on('afterChange', function (event, slick, currentSlide) {
      lazyLoad();
    }).on('beforeChange', function (event, slick, currentSlide) {
      lazyLoad();
    });
    $('.product__head-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      dotsClass: 'pagination product__pagination pagination--white',
      infinite: false,
      touchThreshold: 40
    }).on('afterChange', function (event, slick, currentSlide) {
      lazyLoad();
    }).on('beforeChange', function (event, slick, currentSlide) {
      lazyLoad();
    });
    $('.recommend__slider').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      swipe: false,
      rows: 0,
      prevArrow: '<button type="button" class="arrow arrow--left"><img class="arrow__icon" src="static/images/common/arrow-left.svg" alt=""></button>',
      nextArrow: '<button type="button" class="arrow arrow--right"><img class="arrow__icon" src="static/images/common/arrow-right.svg" alt=""></button>',
      responsive: [{
        breakpoint: 1171,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 951,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 666,
        settings: {
          slidesToShow: 1
        }
      }]
    }).on('setPosition', function (event, slick) {
      slick.$slides.css('height', slick.$slideTrack.height() + 'px');
    }).on('breakpoint', function () {
      sliderSpace();
    }).on('afterChange', function (event, slick, currentSlide) {
      lazyLoad();
    }).on('beforeChange', function (event, slick, currentSlide) {
      lazyLoad();
    });
  };

  var sliderSpace = function sliderSpace() {
    $('[data-space]').each(function () {
      var $this = $(this),
          $space = $this.attr('data-space');
      $this.find('.slick-slide').css({
        marginLeft: $space + 'px',
        marginRight: $space + 'px'
      });
      $this.find('.slick-list').css({
        marginLeft: -$space + 'px',
        marginRight: -$space / 2 + 'px'
      });
      return false;
    });
  };

  var toggle = function toggle(parent, elem, elemClass) {
    var box = $(parent);
    var item = $(elem);
    box.each(function () {
      var boxThis = $(this);
      $(this).find(item).on('click', function () {
        boxThis.find(item).toggleClass(elemClass);
      });
    });
  };

  var menuToggle = function menuToggle() {
    var menu = $('.header__menu-list');
    var button = $('.hamburger');
    button.on('click', function () {
      $(this).toggleClass('is-active');
      menu.slideToggle();
    });
    $(window).resize(function () {
      var w = $(window).width();

      if (w > 970) {
        menu.removeAttr('style');
        button.removeClass('is-active');
      }
    });
  };

  var counter = function counter() {
    var counterPlus = function counterPlus(el, val) {
      el.val(+val + 1);
    };

    var counterMinus = function counterMinus(el, val) {
      if (val - 1) {
        el.val(+val - 1);
      }
    };

    $('.counter__btn').each(function () {
      var btn = $(this);
      btn.on('click', function () {
        if ($(this).attr('data-direction') === 'plus') {
          counterPlus(btn.prev(), btn.prev().val());
        } else {
          counterMinus(btn.next(), btn.next().val());
        }
      });
    });
  };

  toggle('.product__head', '.js-toggle', 'icon-heart--active');
  mainSliders();
  sliderSpace();
  menuToggle();
  counter();

  var lazyLoad = function lazyLoad() {
    $('.lazy').Lazy({
      effect: "fadeIn",
      effectTime: 777,
      threshold: 0,
      visibleOnly: true
    });
  };

  lazyLoad();
});

function browser() {
  if (navigator.userAgent.indexOf("MSIE") !== -1 || !!document.documentMode === true) {
    document.querySelector('html').classList.add('browser-ie');
  }
}

browser();