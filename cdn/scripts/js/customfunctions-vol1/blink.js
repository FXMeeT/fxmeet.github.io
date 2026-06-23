 var t = setInterval(function () {
    var blink = document.querySelector("blink");
    blink.style.visibility = (blink.style.visibility == 'hidden' ? '' : 'hidden');
}, 800);
