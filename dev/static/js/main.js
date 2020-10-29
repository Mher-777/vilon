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
            open: function() {
                $('body').addClass('hidden');
                $('.mfp-content').addClass('mfp-content-width')
            },
            close: function() {
                $('body').removeClass('hidden');
            }
        }
    });
    const mainSliders = () => {
        $('.slider__carousel').slick({
            fade: true,
            arrows: false,
            dots: true,
            autoplay: true,
            touchThreshold: 40,
            dotsClass: 'pagination slider__pagination',
            cssEase: 'linear'
        }).on('afterChange', function (event, slick, currentSlide) {
            lazyLoad()
        }).on('beforeChange', function (event, slick, currentSlide) {
            lazyLoad()
        });
        $('.category__slider').slick({
            slidesToShow: 7,
            slidesToScroll: 1,
            touchThreshold: 40,
            prevArrow: '<button type="button" class="arrow arrow--left"><img class="arrow__icon" src="static/images/common/arrow-left.svg" alt=""></button>',
            nextArrow: '<button type="button" class="arrow arrow--right"><img class="arrow__icon" src="static/images/common/arrow-right.svg" alt=""></button>',
            responsive: [
                {
                    breakpoint: 1660,
                    settings: {
                        slidesToShow: 6,
                    }
                },
                {
                    breakpoint: 1460,
                    settings: {
                        slidesToShow: 5,
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        rows: 2,
                        slidesToShow: 2,
                    }
                },
            ]
        }).on('breakpoint', function () {
            sliderSpace()
        }).on('afterChange', function (event, slick, currentSlide) {
            lazyLoad()
        }).on('beforeChange', function (event, slick, currentSlide) {
            lazyLoad()
        });
        $('.product__head-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            dotsClass: 'pagination product__pagination pagination--white',
            infinite: false,
            touchThreshold: 40,
        }).on('afterChange', function (event, slick, currentSlide) {
            lazyLoad()
        }).on('beforeChange', function (event, slick, currentSlide) {
            lazyLoad()
        });
        $('.recommend__slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            swipe: false,
            rows: 0,
            prevArrow: '<button type="button" class="arrow arrow--left"><img class="arrow__icon" src="static/images/common/arrow-left.svg" alt=""></button>',
            nextArrow: '<button type="button" class="arrow arrow--right"><img class="arrow__icon" src="static/images/common/arrow-right.svg" alt=""></button>',
            infinite: false,
            responsive: [
                {
                    breakpoint: 1171,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 951,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 666,
                    settings: {
                        slidesToShow: 1,
                        swipe: true,
                    }
                },
            ]
        }).on('setPosition', function (event, slick) {
            slick.$slides.css('min-height', slick.$slideTrack.height() + 'px');
            $('.recommend__slider').css('min-height', slick.$slideTrack.height() + 30 + 'px');
        }).on('breakpoint', function () {
            sliderSpace()
        }).on('afterChange', function (event, slick, currentSlide) {
            lazyLoad()
        }).on('beforeChange', function (event, slick, currentSlide) {
            lazyLoad()
        }).on('init', function (event, slick) {
            $('.recommend__slider').css('min-height', slick.$slideTrack.height() + 30 + 'px');
        });

    }
    const sliderSpace = () => {
        $('[data-space]').each(function () {
            let $this = $(this),
                $space = $this.attr('data-space');
            $this.find('.slick-slide').css({
                marginLeft: $space + 'px',
                marginRight: $space + 'px'
            });
            $this.find('.slick-list').css({
                marginLeft: -$space + 'px',
                marginRight: -$space / 2 + 'px'
            })
            return false
        });
    }
    const toggle = (parent, elem, elemClass) => {
        let box = $(parent)
        const item = $(elem)
        box.each(function () {
            const boxThis = $(this)
            $(this).find(item).on('click', function () {
                boxThis.find(item).toggleClass(elemClass)
            })
        })

    }
    const menuToggle = () => {
        const menu = $('.header__menu-list')
        const button = $('.hamburger')
        const subButton = $('.header__menu-icon')
        const dropdown = $('.header__dropdown')
        const item = $('.header__menu-item')

        // subButton.on('click', function (e) {
        //     e.preventDefault()
        //     $(this).siblings('.header__dropdown').slideToggle(300)
        //     $(this).parent().toggleClass('header__menu-item--open')
        // })
        button.on('click', function () {
            $(this).toggleClass('is-active')
            menu.slideToggle()
        })
        subButton.on('click',function () {
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
            let w = $(window).width();
            if (w > 970) {
                dropdown.removeAttr('style');
                item.removeClass('header__menu-item--open')
                menu.removeAttr('style');
                button.removeClass('is-active')
            }
        });
    }
    const counter = () => {
        const counterPlus = (el, val) => {
            el.val(+val + 1);
        };

        const counterMinus = (el, val) => {
            if (val - 1) {
                el.val(+val - 1);
            }
        };
        $('.counter__btn').each(function () {
            let btn = $(this)
            btn.on('click', function () {
                if ($(this).attr('data-direction') === 'plus') {
                    counterPlus(btn.prev(), btn.prev().val())
                } else {
                    counterMinus(btn.next(), btn.next().val())
                }
            })
        })
    }
    const hoverProducts = () => {
        const elem = $('.product')
        elem.hover(function () {
            $(this).toggleClass('product--hover')
            if ($(this).hasClass('product--hover')) {
                $(this).find('.product__list-item').slideDown()
            }
        }, function () {
            $(this).removeClass('product--hover')
            for (let i = 2; i <= $(this).find('.product__list-item').length; i++) {
                $(this).find('.product__list-item').eq(i).slideUp()
            }
        })
    }
    const lazyLoad = () => {
        $('.lazy').Lazy({
            effect: "fadeIn",
            effectTime: 777,
            threshold: 0,
            visibleOnly: true,
        });
    }
    const introSlider = () => {
        $('.intro__slider').slick({
            arrows: false,
            dots: true,
            dotsClass: 'pagination intro__pagination pagination--white',
            cssEase: 'linear',
            touchThreshold: 40,
            lazyLoad: 'ondemand',
            infinite: false,
            autoplay: true
        })
    }
    const like = () => {
        $('.js-like').on('click', function () {
            const $this = $(this)
            let number = $this.text()
            $this.toggleClass('active')
            if($this.hasClass('active')) {
                $this.find('span').html(++number)
            } else {
                $this.find('span').html(--number)
            }
        })
    }
    const newsSlider = () => {
        $('.news__slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            touchThreshold: 40,
            prevArrow: '<button type="button" class="arrow arrow--left"><img class="arrow__icon" src="static/images/common/arrow-left.svg" alt=""></button>',
            nextArrow: '<button type="button" class="arrow arrow--right"><img class="arrow__icon" src="static/images/common/arrow-right.svg" alt=""></button>',
            responsive: [
                {
                    breakpoint: 901,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 651,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        })
    }
    const bannerSlider = () => {
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
            lazyLoad()
        }).on('beforeChange', function (event, slick, currentSlide) {
            lazyLoad()
        });
    }
    const rangeSlider = () => {
        const inputPrice = $('.input-range--price')
        const inputCalorie = $('.input-range--calorie')
        inputPrice.ionRangeSlider({
            skin: "round",
            type: "double",
            hide_min_max: true,
            hide_from_to: true,
            onChange: function (data) {
                inputPrice.parent().find('.input-from').val(data.from)
                inputPrice.parent().find('.input-to').val(data.to)
            },
        });
        inputCalorie.ionRangeSlider({
            skin: "round",
            type: "double",
            hide_min_max: true,
            hide_from_to: true,
            onChange: function (data) {
                inputCalorie.parent().find('.input-from').val(data.from)
                inputCalorie.parent().find('.input-to').val(data.to)
            },
        });
    }
    const popup = () => {
        $('.js-popup-inline').magnificPopup({
            type: 'inline',
            removalDelay: 300,
            mainClass: 'my-mfp-zoom-in',
            closeOnBgClick: true,
            midClick: true,
            callbacks: {
                open: function() {
                    // $('body').addClass('hidden');
                    lazyLoad()
                },
                close: function() {
                    // $('body').removeClass('hidden');
                }
            }
        })
    }
    const reviewCustom = () => {
        $('.js-stars').rateYo({
            starWidth: "18px",
            normalFill: "#e0e0e0",
            ratedFill: "#efe74f",
            spacing: "4px",
            halfStar: true,
            starSvg: `
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18">
                <g>
                    <g><path d="M17.072 8.77a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0z"/></g>
                     <g><path class="svg-ellipse" d="M8.572 3.457L9.786 7.19h3.926l-3.177 2.307 1.214 3.734-3.177-2.308-3.176 2.308L6.61 9.498 3.433 7.19H7.36z"/></g>
                </g>
            </svg>
        `,
            onChange: function (rating, rateYoInstance) {
                console.log(rateYoInstance)
            }
        });
    }
    const worksAccordion  = () => {
        $('.works__item-top').on('click', function () {
            $(this).parent().toggleClass('works__item--active')
            $(this).next().slideToggle()
        })
    }

    popup()
    rangeSlider()
    like()
    hoverProducts()
    toggle('.product__head', '.js-toggle', 'icon-heart--active')
    toggle('.news__item', '.js-toggle', 'icon-heart--active')
    toggle('.blog__bg', '.js-toggle', 'icon-heart--active')
    mainSliders()
    menuToggle()
    counter()
    lazyLoad()
    introSlider()
    newsSlider()
    bannerSlider()
    sliderSpace()
    reviewCustom()
    worksAccordion()
})

function browser() {
    if ((navigator.userAgent.indexOf("MSIE") !== -1) || (!!document.documentMode === true)) {
        document.querySelector('html').classList.add('browser-ie')
    }
}

browser()
