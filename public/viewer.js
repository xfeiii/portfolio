(function () {
  var style = document.createElement('style');
  style.textContent = `
    #iv-overlay {
      display: none;
      position: fixed;
      top: 0; left: 0;
      width: 100dvw;
      height: 100dvh;
      z-index: 2147483647;
      background: #000;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    #iv-overlay.open {
      display: flex;
    }
    #iv-img {
      display: block;
      max-width: calc(100dvw - 64px);
      max-height: calc(100dvh - 64px);
      width: auto;
      height: auto;
      object-fit: contain;
      border-radius: 6px;
      cursor: zoom-in;
      transform-origin: center center;
      user-select: none;
      -webkit-user-drag: none;
      touch-action: none;
    }
    #iv-close {
      position: fixed;
      top: 16px;
      right: 20px;
      color: #fff;
      font-size: 44px;
      font-weight: 200;
      line-height: 1;
      cursor: pointer;
      opacity: 0.7;
      user-select: none;
      z-index: 2147483647;
    }
    #iv-close:hover { opacity: 1; }
    #iv-hint {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      color: rgba(255,255,255,0.4);
      font-size: 12px;
      font-family: Inter, sans-serif;
      letter-spacing: 0.05em;
      pointer-events: none;
      white-space: nowrap;
    }
    body.iv-open {
      overflow: hidden !important;
    }
  `;
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.id = 'iv-overlay';

  var closeBtn = document.createElement('span');
  closeBtn.id = 'iv-close';
  closeBtn.innerHTML = '&times;';

  var img = document.createElement('img');
  img.id = 'iv-img';

  var hint = document.createElement('div');
  hint.id = 'iv-hint';
  hint.textContent = 'Scroll to zoom  -  Drag to move  -  Esc to close';

  overlay.appendChild(closeBtn);
  overlay.appendChild(img);
  overlay.appendChild(hint);

  var scale = 1;
  var panX = 0;
  var panY = 0;
  var dragStartX = 0;
  var dragStartY = 0;
  var dragPanX = 0;
  var dragPanY = 0;
  var isDragging = false;
  var didDrag = false;

  function applyTransform() {
    if (scale <= 1) {
      panX = 0;
      panY = 0;
    }
    img.style.transform = 'translate3d(' + panX + 'px,' + panY + 'px,0) scale(' + scale + ')';
    img.style.cursor = scale > 1 ? 'grab' : 'zoom-in';
  }

  function open(src) {
    scale = 1;
    panX = 0;
    panY = 0;
    applyTransform();
    img.draggable = false;
    img.onload = function () {
      overlay.classList.add('open');
      document.body.classList.add('iv-open');
    };
    img.src = src;
    // Already cached
    if (img.complete && img.naturalWidth > 0) {
      img.onload = null;
      overlay.classList.add('open');
      document.body.classList.add('iv-open');
    }
  }

  function close() {
    overlay.classList.remove('open');
    document.body.classList.remove('iv-open');
    img.onload = null;
    img.src = '';
    scale = 1;
    panX = 0;
    panY = 0;
    isDragging = false;
    didDrag = false;
    applyTransform();
  }

  overlay.addEventListener('wheel', function (e) {
    e.preventDefault();
    scale = Math.min(Math.max(scale + (e.deltaY < 0 ? 0.15 : -0.15), 1), 5);
    applyTransform();
  }, { passive: false });

  img.addEventListener('click', function (e) {
    e.stopPropagation();
    if (didDrag) {
      didDrag = false;
      return;
    }
    scale = scale > 1 ? 1 : 2;
    applyTransform();
  });

  img.addEventListener('pointerdown', function (e) {
    if (scale <= 1) return;
    e.preventDefault();
    e.stopPropagation();
    isDragging = true;
    didDrag = false;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    dragPanX = panX;
    dragPanY = panY;
    img.style.cursor = 'grabbing';
    if (img.setPointerCapture) img.setPointerCapture(e.pointerId);
  });

  img.addEventListener('pointermove', function (e) {
    if (!isDragging) return;
    e.preventDefault();
    var dx = e.clientX - dragStartX;
    var dy = e.clientY - dragStartY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didDrag = true;
    panX = dragPanX + dx;
    panY = dragPanY + dy;
    applyTransform();
    img.style.cursor = 'grabbing';
  });

  function stopDrag(e) {
    if (!isDragging) return;
    if (e) e.stopPropagation();
    isDragging = false;
    img.style.cursor = scale > 1 ? 'grab' : 'zoom-in';
  }

  img.addEventListener('pointerup', stopDrag);
  img.addEventListener('pointercancel', stopDrag);
  img.addEventListener('lostpointercapture', function () {
    isDragging = false;
    img.style.cursor = scale > 1 ? 'grab' : 'zoom-in';
  });

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
    var sel = '.img-card img, .img-full img, .hero-img img, .hero-container img';
    document.querySelectorAll(sel).forEach(function (el) {
      if (el.closest('.tool-chip')) return;
      if (el.dataset.iv) return;
      el.dataset.iv = '1';
      el.style.cursor = 'zoom-in';
      el.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var src = el.currentSrc || el.src;
        if (src) open(src);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      document.body.appendChild(overlay);
      attach();
    });
  } else {
    document.body.appendChild(overlay);
    attach();
  }
})();
