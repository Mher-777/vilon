import $ from '../local_modules/jquery/dist/jquery.min'

$(document).ready(() => {
    // eslint-disable-next-line no-console
    console.log(`document ready`)
})
function browser() {
    if ((navigator.userAgent.indexOf("MSIE") !== -1) || (!!document.documentMode === true)) {
      [].forEach.call(document.querySelectorAll('svg'), function (svg) {
        let use = svg.querySelector('use');

        if (use) {
          let img = document.createElement('img');
          use = use.getAttribute('xlink:href').split('#')
          img.src = 'img/sprite/' + use[1] + '.svg';
          img.className = svg.getAttribute('class');
          svg.parentNode.replaceChild(img, svg);
        }
      });
    }
}
browser()
