
$(function () {
    svg4everybody({});
    $('.slider__carousel').slick({
        fade: true,
        arrows: false,
        dots: true,
        autoplay: true,
        touchThreshold: 40,
        dotsClass: 'pagination slider__pagination'
    })
})
function browser() {
    if ((navigator.userAgent.indexOf("MSIE") !== -1) || (!!document.documentMode === true)) {
        document.querySelector('html').classList.add('browser-ie')
    }
}
browser()
