function browser() {
    if ((navigator.userAgent.indexOf("MSIE") !== -1) || (!!document.documentMode === true)) {
        document.querySelector('html').classList.add('browser-ie')
    }
}

browser()
if (!$('html').hasClass('browser-ie')) {
    console.log('browser-ie')
    $(window).on('load', function () {
        const body = $('body')
        // const header = $('.header__inner')
        body.css('margin-right', calcScroll())
        // header.css('transform', 'translateX(' + -calcScroll() / 2 + 'px)')
        setTimeout(function () {
            $('.preloader').fadeOut(500, function () {
                $(this).remove()
                if (body.hasClass('hidden--loader')) {
                    body.delay(400).removeClass('hidden--loader')
                    body.css('margin-right', '')
                    // header.css('transform', '')
                }
            })
        }, 500)
    })

    function calcScroll() {
        let div = document.createElement('div')
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }
}
$(function () {
    svg4everybody({});
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
        const productImages = $('.product__images')
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
            lazyLoad()
        }).on('beforeChange', function (event, slick, currentSlide) {
            lazyLoad()
        });
        productImages.slick({
            slidesToShow: 2,
            // slidesToScroll: 1,
            // rows: 0,
            focusOnSelect: true,
            asNavFor: productImages.length > 0 ? '.product__head-slider.product__head-slider--view' : ''
        })
        const recommendSlider = $('.recommend__slider')
        recommendSlider.slick({
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
                        slidesToShow: 2,
                        arrows: false,
                        swipe: true,
                    }
                },
            ]
        }).on('breakpoint', function () {
            sliderSpace()
        }).on('afterChange', function (event, slick, currentSlide) {
            lazyLoad()
        }).on('beforeChange', function (event, slick, currentSlide) {
            lazyLoad()
        }).on('init', function (event, slick) {
            lazyLoad()
        });
        if (recommendSlider.length > 0) {
            $(window).bind('resize', function (e) {
                if (window.RT) clearTimeout(window.RT);
                window.RT = setTimeout(function () {
                    // this.location.reload(false);
                    $('.product__images').slick('refresh')
                    $('.recommend__slider').slick('refresh')
                    $('.product__head-slider').slick('refresh')
                }, 200);
            });
        }

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
            btn.on('click', function (e) {
                e.preventDefault()
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
                $(this).find('.product__list-item').slideDown(200)
            }
        }, function () {
            $(this).removeClass('product--hover')
            for (let i = 2; i <= $(this).find('.product__list-item').length; i++) {
                $(this).find('.product__list-item').eq(i).slideUp(200)
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
            if ($this.hasClass('active')) {
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
        var dataFancybox = $('[data-fancybox]');
        dataFancybox.fancybox({
            keyboard: true,
            image: {
                preload: true
            },
            infobar: false,
            clickContent: function clickContent(current, event) {
                return current.type === "image" ? "zoom" : false;
            },
            lang: "ru",
            onInit: function (instance, current) {
                $('.popup .product__images').slick('refresh')
                $('.popup .recommend__slider').slick('refresh')
                $('.popup .product__head-slider').slick('refresh')
                lazyLoad()
            },
            beforeLoad: function (instance, current) {
                $('.popup .product__images').slick('refresh')
                $('.popup .recommend__slider').slick('refresh')
                $('.popup .product__head-slider').slick('refresh')
                lazyLoad()
            },
            afterLoad: function (instance, current) {
                $('.popup .product__images').slick('refresh')
                $('.popup .recommend__slider').slick('refresh')
                $('.popup .product__head-slider').slick('refresh')
                lazyLoad()
            },
        });

        $.fancybox.defaults.animationEffect = "circular";
        $.fancybox.defaults.animationDuration = 500;
        $('.popup-close').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $.fancybox.close();
        })
        $('.js-open-popup').each(function () {
            const dataPopupLink = $(this).attr('data-popup-link')
            $(this).on('click', function (e) {
                e.preventDefault();
                $.fancybox.close();
                setTimeout(function () {
                    $.fancybox.open({
                        src: dataPopupLink,
                        type: 'inline',
                    });
                }, 1);
            });
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
    const worksAccordion = () => {
        $('.works__item-top').on('click', function () {
            $(this).parent().toggleClass('works__item--active')
            $(this).next().slideToggle()
        })
        $('.orders-history__item-top').on('click', function () {
            $(this).parent().toggleClass('orders-history__item--active')
            $(this).next().slideToggle()
        })
    }
    const faqAccordion = () => {
        const btn = $('.faq__item-title')
        const content = $('.faq__item-content')
        btn.on('click', function () {
            btn.siblings(content).slideUp(300);
            if ($(this).siblings(content).is(':visible') === true) {
                btn.parent().removeClass('faq__item--active');
            }
            if ($(this).siblings(content).is(':hidden') === true) {
                $(this).siblings(content).slideDown(300);
                btn.parent().removeClass('faq__item--active');
                $(this).parent().addClass('faq__item--active');
            }
        });
    }
    faqAccordion()
    const deliveryAccordion = () => {
        const btn = $('.delivery__accordion-title')
        const content = $('.delivery__accordion-content')
        btn.on('click', function () {
            btn.siblings(content).slideUp(300);
            if ($(this).siblings(content).is(':visible') === true) {
                btn.parent().removeClass('delivery__accordion-item--active');
            }
            if ($(this).siblings(content).is(':hidden') === true) {
                $(this).siblings(content).slideDown(300);
                btn.parent().removeClass('delivery__accordion-item--active');
                $(this).parent().addClass('delivery__accordion-item--active');
            }
        });
    }
    deliveryAccordion()
    const tabs = () => {
        const elem = $('.catalog__tab')
        const content = $('.catalog__content')
        elem.on('click', function (e) {
            e.preventDefault()
            const $this = $(this)
            content.each(function () {
                if ($this.attr('href') === $(this).attr('data-href')) {
                    elem.removeClass('catalog__tab--current')
                    $this.addClass('catalog__tab--current')
                    content.hide()
                    $(this).show()
                }
            })
        })
        elem.each(function () {
            const $this = $(this)
            content.each(function () {
                if ($this.attr('href') === $(this).attr('data-href')) {
                    elem.removeClass('catalog__tab--current')
                    $this.addClass('catalog__tab--current')
                    content.hide()
                    $(this).show()
                }
            })
        })
    }
    const tabsOrder = () => {
        const elem = $('.order-steps__tab')
        const content = $('.order-steps__content')
        content.hide()
        content.first().show()
        elem.on('click', function (e) {
            e.preventDefault()
            const $this = $(this)
            setTimeout(function () {
                lazyLoad()
            }, 2)
            content.each(function () {
                if ($this.attr('data-href') === $(this).attr('data-id')) {
                    elem.removeClass('order-steps__tab--active')
                    $this.addClass('order-steps__tab--active')
                    content.hide()
                    $(this).show()
                    setTimeout(function () {
                        lazyLoad()
                    }, 1)
                }
            })
        })
    }
    const selectCustom = () => {
        $('.select').select2({
            width: null,
            minimumResultsForSearch: -1,
        }).on('select2:open', function (e) {
            $('.select2-results__options').scrollbar().parent().addClass('scrollbar-inner');
        });
    }
    const inputMask = () => {
        const dateMask = document.querySelector('.js-date-mask')
        if (dateMask) {
            IMask(dateMask,
                {
                    mask: Date,
                    min: new Date(1910, 0, 1),
                    max: new Date(2003, 0, 1),
                    lazy: false
                });
        }
        $('.js-show-password').on('click', function () {
            const input = $(this).parent().find('.popup__input')
            if (input.attr('type') === 'password') {
                input.attr('type', 'text')
            } else {
                input.attr('type', 'password')
            }
        })
    }
    const personalForm = () => {
        const content = $('.personal__content')
        $('.js-is-disabled').on('click', function (e) {
            e.preventDefault()
            $(this).closest(content).find('.personal__btn').text($(this).attr('data-save'))
            $(this).closest(content).find('.personal__control-input').prop("disabled", false)
            $(this).closest(content).find('.select').prop("disabled", false)
        })
        const tab = $('.personal__item--tab')

        tab.on('click', function (e) {
            e.preventDefault()
            const $this = $(this)
            const attr = $this.attr('href')
            content.each(function () {
                if ($(this).attr('id') === attr) {
                    tab.removeClass('personal__item--active')
                    $this.addClass('personal__item--active')
                    content.hide()
                    $(this).show()
                }
            })
        })
    }
    const fileUpload = () => {
        $(".file-upload input[type=file]").change(function () {
            let filename = $(this).val().replace(/.*\\/, "");
            $(this).closest('.file-upload').find('.file-upload__text').html(filename);
        });
    }
    const popupTabs = () => {
        const btn = $('.popup__tabs-btn')
        const input = $('.js-input')
        btn.on('click', function (e) {
            const $this = $(this)
            e.preventDefault()
            btn.removeClass('popup__tabs-btn--active')
            $this.addClass('popup__tabs-btn--active')
            if ($this.hasClass('popup__tabs-btn--active')) {
                input.attr('type', $this.attr('data-type'))
                input.attr('placeholder', $this.text())
            }
        })
    }
    personalForm()
    selectCustom()
    popup()
    tabsOrder()
    rangeSlider()
    like()
    hoverProducts()
    toggle('.product__head', '.js-toggle', 'icon-heart--active')
    toggle('.news__item', '.js-toggle', 'icon-heart--active')
    toggle('.blog__bg', '.js-toggle', 'icon-heart--active')
    toggle('.favorites__item', '.js-toggle', 'icon-heart--active')
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
    tabs()
    fileUpload()
    inputMask()
    popupTabs()
})
tippy('[data-tippy-content]', {
    arrow: false,
    allowHTML: true
});



