"use strict";

$(window).on('load', function () {
  var body = $('body'); // const header = $('.header__inner')

  body.css('margin-right', calcScroll()); // header.css('transform', 'translateX(' + -calcScroll() / 2 + 'px)')

  setTimeout(function () {
    $('.preloader').fadeOut(500, function () {
      $(this).remove();

      if (body.hasClass('hidden--loader')) {
        body.delay(400).removeClass('hidden--loader');
        body.css('margin-right', ''); // header.css('transform', '')
      }
    });
  }, 500);
});

function calcScroll() {
  var div = document.createElement('div');
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.overflowY = 'scroll';
  div.style.visibility = 'hidden';
  document.body.appendChild(div);
  var scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
}

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
        $('.mfp-content').addClass('mfp-content-width');
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
    var productImages = $('.product__images');
    $('.product__head-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      dotsClass: 'pagination product__pagination pagination--white',
      infinite: false,
      touchThreshold: 40,
      rows: 0,
      asNavFor: productImages.length > 0 ? '.product__images' : ''
    }).on('afterChange', function (event, slick, currentSlide) {
      lazyLoad();
    }).on('beforeChange', function (event, slick, currentSlide) {
      lazyLoad();
    });
    productImages.slick({
      slidesToShow: 2,
      // slidesToScroll: 1,
      // rows: 0,
      focusOnSelect: true,
      asNavFor: productImages.length > 0 ? '.product__head-slider.product__head-slider--view' : ''
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
        $(this).find('.product__list-item').slideDown(200);
      }
    }, function () {
      $(this).removeClass('product--hover');

      for (var i = 2; i <= $(this).find('.product__list-item').length; i++) {
        $(this).find('.product__list-item').eq(i).slideUp(200);
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

  var popup = function popup() {
    $('.js-popup-inline').magnificPopup({
      type: 'inline',
      removalDelay: 300,
      mainClass: 'my-mfp-zoom-in',
      closeOnBgClick: true,
      midClick: true,
      callbacks: {
        open: function open() {
          // $('body').addClass('hidden');
          lazyLoad();
        },
        close: function close() {// $('body').removeClass('hidden');
        }
      }
    });
  };

  var reviewCustom = function reviewCustom() {
    $('.js-stars').rateYo({
      starWidth: "18px",
      normalFill: "#e0e0e0",
      ratedFill: "#efe74f",
      spacing: "4px",
      halfStar: true,
      starSvg: "\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"17\" height=\"18\" viewBox=\"0 0 17 18\">\n                <g>\n                    <g><path d=\"M17.072 8.77a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0z\"/></g>\n                     <g><path class=\"svg-ellipse\" d=\"M8.572 3.457L9.786 7.19h3.926l-3.177 2.307 1.214 3.734-3.177-2.308-3.176 2.308L6.61 9.498 3.433 7.19H7.36z\"/></g>\n                </g>\n            </svg>\n        ",
      onChange: function onChange(rating, rateYoInstance) {
        console.log(rateYoInstance);
      }
    });
  };

  var worksAccordion = function worksAccordion() {
    $('.works__item-top').on('click', function () {
      $(this).parent().toggleClass('works__item--active');
      $(this).next().slideToggle();
    });
  };

  var tabs = function tabs() {
    var elem = $('.catalog__tab');
    var content = $('.catalog__content');
    elem.on('click', function (e) {
      e.preventDefault();
      var $this = $(this);
      content.each(function () {
        if ($this.attr('href') === $(this).attr('data-href')) {
          elem.removeClass('catalog__tab--current');
          $this.addClass('catalog__tab--current');
          content.hide();
          $(this).show();
        }
      });
    });
    elem.each(function () {
      var $this = $(this);
      content.each(function () {
        if ($this.attr('href') === $(this).attr('data-href')) {
          elem.removeClass('catalog__tab--current');
          $this.addClass('catalog__tab--current');
          content.hide();
          $(this).show();
        }
      });
    });
  };

  popup();
  rangeSlider();
  like();
  hoverProducts();
  toggle('.product__head', '.js-toggle', 'icon-heart--active');
  toggle('.news__item', '.js-toggle', 'icon-heart--active');
  toggle('.blog__bg', '.js-toggle', 'icon-heart--active');
  mainSliders();
  menuToggle();
  counter();
  lazyLoad();
  introSlider();
  newsSlider();
  bannerSlider();
  sliderSpace();
  reviewCustom();
  worksAccordion();
  tabs();
});

function browser() {
  if (navigator.userAgent.indexOf("MSIE") !== -1 || !!document.documentMode === true) {
    document.querySelector('html').classList.add('browser-ie');
  }
}

browser();