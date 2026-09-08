/* ZerX website: "Copy" buttons for code blocks. The site works without this file. */
(function () {
  var d = document;
  d.documentElement.className += ' js';
  d.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('.copy') : null;
    if (!b) return;
    var t = b.getAttribute('data-copy') || '';
    function done() {
      var o = b.textContent;
      b.textContent = b.getAttribute('data-done') || 'Copied';
      b.classList.add('is-done');
      setTimeout(function () { b.textContent = o; b.classList.remove('is-done'); }, 1500);
    }
    function fallback() {
      var ta = d.createElement('textarea');
      ta.value = t;
      ta.setAttribute('readonly', '');
      ta.className = 'vh';
      d.body.appendChild(ta);
      ta.select();
      try { if (d.execCommand('copy')) done(); } catch (x) {}
      d.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(t).then(done, fallback);
    } else {
      fallback();
    }
  });
})();
