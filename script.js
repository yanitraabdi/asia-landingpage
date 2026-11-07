// Gallery / facilities sliders: step one image, wrap around at either end.
document.querySelectorAll('[data-slide]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var el = document.getElementById(btn.dataset.slide), d = +btn.dataset.dir;
    var items = el.querySelectorAll('img'), max = el.scrollWidth - el.clientWidth, x0 = items[0].offsetLeft;
    var i = 0; // current index = first image at or past scrollLeft
    while (i < items.length - 1 && items[i].offsetLeft - x0 < el.scrollLeft - 8) i++;
    if (d > 0 && el.scrollLeft >= max - 8) i = 0;
    else if (d < 0 && el.scrollLeft <= 8) i = items.length - 1;
    else i = Math.max(0, Math.min(items.length - 1, i + d));
    el.scrollTo({ left: Math.min(max, items[i].offsetLeft - x0), behavior: 'smooth' });
  });
});

// Sticky WhatsApp bar appears once the hero is off screen.
var hero = document.getElementById('hero'), bar = document.getElementById('bar');
if (hero && bar && 'IntersectionObserver' in window) {
  new IntersectionObserver(function (e) { bar.hidden = e[0].isIntersecting; }).observe(hero);
}
