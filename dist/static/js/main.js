"use strict";

$(function () {
  svg4everybody({});
  $('.js-popup-map').magnificPopup({
    type: 'inline',
    fixedContentPos: false,
    fixedBgPos: true,
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in',
    callbacks: {
      open: function open() {
        $('body').addClass('hidden');
      },
      close: function close() {
        $('body').removeClass('hidden');
      }
    }
  });

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
          rows: 2,
          slidesToShow: 2
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
      infinite: false,
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
          slidesToShow: 1,
          swipe: true
        }
      }]
    }).on('setPosition', function (event, slick) {
      slick.$slides.css('min-height', slick.$slideTrack.height() + 'px');
      $('.recommend__slider').css('min-height', slick.$slideTrack.height() + 30 + 'px');
    }).on('breakpoint', function () {
      sliderSpace();
    }).on('afterChange', function (event, slick, currentSlide) {
      lazyLoad();
    }).on('beforeChange', function (event, slick, currentSlide) {
      lazyLoad();
    }).on('init', function (event, slick) {
      $('.recommend__slider').css('min-height', slick.$slideTrack.height() + 30 + 'px');
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
    var subButton = $('.header__menu-icon');
    var dropdown = $('.header__dropdown');
    var item = $('.header__menu-item'); // subButton.on('click', function (e) {
    //     e.preventDefault()
    //     $(this).siblings('.header__dropdown').slideToggle(300)
    //     $(this).parent().toggleClass('header__menu-item--open')
    // })

    button.on('click', function () {
      $(this).toggleClass('is-active');
      menu.slideToggle();
    });
    subButton.on('click', function () {
      dropdown.slideUp(300);

      if ($(this).siblings(dropdown).is(':visible') === true) {
        subButton.parent().removeClass('header__menu-item--open');
      }

      if ($(this).siblings(dropdown).is(':hidden') === true) {
        $(this).siblings(dropdown).slideDown(300);
        subButton.parent().removeClass('header__menu-item--open');
        $(this).parent().addClass('header__menu-item--open');
      }
    });
    $(window).resize(function () {
      var w = $(window).width();

      if (w > 970) {
        dropdown.removeAttr('style');
        item.removeClass('header__menu-item--open');
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

  var hoverProducts = function hoverProducts() {
    var elem = $('.product');
    elem.hover(function () {
      $(this).toggleClass('product--hover');

      if ($(this).hasClass('product--hover')) {
        $(this).find('.product__list-item').slideDown();
      }
    }, function () {
      $(this).removeClass('product--hover');

      for (var i = 2; i <= $(this).find('.product__list-item').length; i++) {
        $(this).find('.product__list-item').eq(i).slideUp();
      }
    });
  };

  var lazyLoad = function lazyLoad() {
    $('.lazy').Lazy({
      effect: "fadeIn",
      effectTime: 777,
      threshold: 0,
      visibleOnly: true
    });
  };

  var introSlider = function introSlider() {
    $('.intro__slider').slick({
      arrows: false,
      dots: true,
      dotsClass: 'pagination intro__pagination pagination--white',
      cssEase: 'linear',
      touchThreshold: 40,
      lazyLoad: 'ondemand',
      infinite: false,
      autoplay: true
    });
  };

  var like = function like() {
    $('.js-like').on('click', function () {
      var $this = $(this);
      var number = $this.text();
      $this.toggleClass('active');

      if ($this.hasClass('active')) {
        $this.find('span').html(++number);
      } else {
        $this.find('span').html(--number);
      }
    });
  };

  var newsSlider = function newsSlider() {
    $('.news__slider').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      touchThreshold: 40,
      prevArrow: '<button type="button" class="arrow arrow--left"><img class="arrow__icon" src="static/images/common/arrow-left.svg" alt=""></button>',
      nextArrow: '<button type="button" class="arrow arrow--right"><img class="arrow__icon" src="static/images/common/arrow-right.svg" alt=""></button>',
      responsive: [{
        breakpoint: 901,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 651,
        settings: {
          slidesToShow: 1
        }
      }]
    });
  };

  var bannerSlider = function bannerSlider() {
    $('.banner__slider').slick({
      slidesToScroll: 1,
      slidesToShow: 1,
      arrows: false,
      dots: true,
      dotsClass: 'pagination banner__slider-pagination pagination--white',
      cssEase: 'linear',
      touchThreshold: 40,
      rows: 0
    }).on('afterChange', function (event, slick, currentSlide) {
      lazyLoad();
    }).on('beforeChange', function (event, slick, currentSlide) {
      lazyLoad();
    });
  };

  var rangeSlider = function rangeSlider() {
    var inputPrice = $('.input-range--price');
    var inputCalorie = $('.input-range--calorie');
    inputPrice.ionRangeSlider({
      skin: "round",
      type: "double",
      hide_min_max: true,
      hide_from_to: true,
      onChange: function onChange(data) {
        inputPrice.parent().find('.input-from').val(data.from);
        inputPrice.parent().find('.input-to').val(data.to);
      }
    });
    inputCalorie.ionRangeSlider({
      skin: "round",
      type: "double",
      hide_min_max: true,
      hide_from_to: true,
      onChange: function onChange(data) {
        inputCalorie.parent().find('.input-from').val(data.from);
        inputCalorie.parent().find('.input-to').val(data.to);
      }
    });
  };

  rangeSlider();
  like();
  hoverProducts();
  toggle('.product__head', '.js-toggle', 'icon-heart--active');
  mainSliders();
  menuToggle();
  counter();
  lazyLoad();
  introSlider();
  newsSlider();
  bannerSlider();
  sliderSpace();
});

function browser() {
  if (navigator.userAgent.indexOf("MSIE") !== -1 || !!document.documentMode === true) {
    document.querySelector('html').classList.add('browser-ie');
  }
}

browser();