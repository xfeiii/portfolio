(function () {
  var style = document.createElement('style');
  style.textContent = `
    #lb-overlay {
      position: fixed;
      inset: 0;
      width: 100dvw;
      height: 100dvh;
      z-index: 999999;
      background: rgba(0,0,0,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 32px;
      box-sizing: border-box;
      overflow: hidden;
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
      isolation: isolate;
    }

    #lb-overlay.open {
      visibility: visible;
      opacity: 1;
      pointer-events: auto;
    }

    #lb-overlay img {
      display: block;
      max-width: calc(100dvw - 64px);
      max-height: calc(100dvh - 64px);
      width: auto;
      height: auto;
      object-fit: contain;
      border-radius: 8px;
      pointer-events: none;
    }

    #lb-close {
      position: fixed;
      top: 20px;
      right: 24px;
      color: #fff;
      font-size: 40px;
      font-weight: 300;
      line-height: 1;
      cursor: pointer;
      opacity: 0.8;
      user-select: none;
      z-index: 1000000;
    }

    #lb-close:hover {
      opacity: 1;
    }

    body.lb-open {
      overflow: hidden !important;
    }
  `;
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.id = 'lb-overlay';

  var closeBtn = document.createElement('span');
  closeBtn.id = 'lb-close';
  closeBtn.innerHTML = '&times;';

  var img = document.createElement('img');

  overlay.appendChild(closeBtn);
  overlay.appendChild(img);

  // Append after DOMContentLoaded so it's the last child of body,
  // outside any stacking context created by page content
  function appendOverlay() {
    document.body.appendChild(overlay);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', appendOverlay);
  } else {
    appendOverlay();
  }

  function open(src) {
    img.src = src;
    overlay.classList.add('open');
    document.body.classList.add('lb-open');
  }

  function close() {
    overlay.classList.remove('open');
    document.body.classList.remove('lb-open');
    img.removeAttribute('src');
  }

  closeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    close();
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });

  function attach() {
    // Exclude tool chips (small logo icons) and any img without a real photo src
    var sel = '.img-card img, .img-full img, .hero-img img, .hero-container img';

    document.querySelectorAll(sel).forEach(function (el) {
      // Skip tool chip images (small icons inside .tool-chip)
      if (el.closest('.tool-chip')) return;
      if (el.dataset.lb) return;

      el.dataset.lb = '1';
      el.style.cursor = 'zoom-in';

      el.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var src = el.currentSrc || el.src;
        if (!src) return;

        open(src);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attach);
  } else {
    attach();
  }
})();
