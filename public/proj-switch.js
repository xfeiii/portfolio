(function () {
  var projects = [
    { label: 'MAS',                 tag: 'UX/UI · Government',      file: 'mas.html', protectedRoute: '/mas' },
    { label: 'Blacksmith KYC',      tag: 'SaaS · Banking',         file: 'blacksmith-kyc.html' },
    { label: 'Stone for Gold',      tag: 'Branding · Web',         file: 'stone-for-gold.html' },
    { label: 'PeakTop Engineering', tag: 'Web Design · Electrical',  file: 'peaktop-engineering.html' },
    { label: 'MyPassion App',       tag: 'Mobile · UX',            file: 'mypassion-app.html' },
    { label: 'PawSwipe',            tag: 'Mobile · Product',       file: 'pawswipe.html' },
    { label: 'Prudential',          tag: 'Insurance · Social Media', file: 'prudential.html' },
  ];

  function getCurrentFile() {
    var currentFile = window.location.pathname.split('/').pop();
    if (currentFile) return currentFile;
    try {
      var frameSrc = window.frameElement && window.frameElement.getAttribute('src');
      if (frameSrc) return frameSrc.split('/').pop().split('?')[0].split('#')[0];
    } catch (_) {}
    return '';
  }

  var current = getCurrentFile();
  var active = projects.find(function(p){ return p.file === current; }) || projects[0];

  var style = document.createElement('style');
  style.textContent = `
    html,
    body {
      max-width: 100%;
      overflow-x: hidden;
      overscroll-behavior-x: none;
    }
    img,
    video,
    iframe,
    canvas {
      max-width: 100%;
    }
    .psw-trigger {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px 5px 14px;
      background: #fff;
      border: 1px solid #e2e2e2;
      border-radius: 100px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
      font-family: Inter, sans-serif;
      color: #444;
      letter-spacing: 0.02em;
      transition: border-color 0.15s, box-shadow 0.15s;
      user-select: none;
      white-space: nowrap;
    }
    .psw-trigger:hover {
      border-color: #bbb;
      box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    }
    .psw-trigger.open {
      border-color: #aaa;
      box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    }
    .psw-chevron {
      width: 14px;
      height: 14px;
      opacity: 0.4;
      transition: transform 0.2s;
      flex-shrink: 0;
    }
    .psw-trigger.open .psw-chevron {
      transform: rotate(180deg);
    }
    .psw-menu {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      background: #fff;
      border: 1px solid #e8e8e8;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
      padding: 6px;
      min-width: 220px;
      max-width: calc(100vw - 32px);
      max-height: min(360px, calc(100vh - 120px));
      overflow-y: auto;
      overflow-x: hidden;
      z-index: 9999;
      opacity: 0;
      transform: translateY(-6px) scale(0.98);
      transform-origin: top left;
      pointer-events: none;
      transition: opacity 0.15s ease, transform 0.15s ease;
      text-align: left;
    }
    .psw-menu.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }
    .psw-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 9px 12px;
      border-radius: 10px;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.1s;
    }
    .psw-item:hover {
      background: #f5f5f5;
    }
    .psw-item.active {
      background: #f0f0f0;
    }
    .psw-item-left {
      display: flex;
      flex-direction: column;
      gap: 1px;
      flex: 1;
      text-align: left;
    }
    .psw-item-name {
      font-size: 13px;
      font-weight: 600;
      color: #111;
      font-family: Inter, sans-serif;
      line-height: 1.3;
    }
    .psw-item-tag {
      font-size: 11px;
      color: #aaa;
      font-family: Inter, sans-serif;
    }
    .psw-item.active .psw-item-name {
      color: #111;
    }
    .psw-item:not(.active) .psw-item-name {
      color: #444;
    }
    .psw-check {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      opacity: 0;
    }
    .psw-item.active .psw-check {
      opacity: 1;
    }
    .psw-wrap {
      position: relative;
      display: inline-block;
      margin-left: 16px;
      max-width: 100%;
      flex-shrink: 1;
    }
    @media (max-width: 520px) {
      .psw-trigger {
        max-width: calc(100vw - 40px);
      }
      .psw-trigger span {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .psw-menu {
        min-width: min(220px, calc(100vw - 32px));
      }
    }
  `;
  document.head.appendChild(style);

  function build() {
    var heroTag = document.querySelector('.hero-tag');
    if (!heroTag) return;

    var wrap = document.createElement('div');
    wrap.className = 'psw-wrap';

    var trigger = document.createElement('button');
    trigger.className = 'psw-trigger';
    trigger.innerHTML =
      '<span>' + active.label + '</span>' +
      '<svg class="psw-chevron" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';

    var menu = document.createElement('div');
    menu.className = 'psw-menu';

    projects.forEach(function (p) {
      var a = document.createElement('a');
      a.className = 'psw-item' + (p.file === current ? ' active' : '');
      a.href = p.file;
      if (p.protectedRoute) {
        a.href = p.protectedRoute;
        a.addEventListener('click', function (e) {
          e.preventDefault();
          var target = p.protectedRoute;
          try {
            if (window.top && window.top !== window) {
              window.top.location.href = target;
            } else {
              window.location.href = target;
            }
          } catch (_) {
            window.location.href = target;
          }
        });
      }

      var left = document.createElement('div');
      left.className = 'psw-item-left';

      var name = document.createElement('div');
      name.className = 'psw-item-name';
      name.textContent = p.label;

      var tag = document.createElement('div');
      tag.className = 'psw-item-tag';
      tag.textContent = p.tag;

      var check = document.createElement('svg');
      check.className = 'psw-check';
      check.setAttribute('viewBox', '0 0 16 16');
      check.setAttribute('fill', 'none');
      check.innerHTML = '<path d="M3 8l3.5 3.5L13 5" stroke="#111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>';

      left.appendChild(name);
      left.appendChild(tag);
      a.appendChild(left);
      a.appendChild(check);
      menu.appendChild(a);
    });

    wrap.appendChild(trigger);
    wrap.appendChild(menu);

    // Wrap hero-tag and dropdown together in a flex row
    var row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;margin-bottom:20px;max-width:100%;min-width:0;';
    heroTag.style.marginBottom = '0';
    heroTag.parentNode.insertBefore(row, heroTag);
    row.appendChild(heroTag);
    row.appendChild(wrap);

    var open = false;
    function fitMenuToViewport() {
      menu.style.left = '0px';
      menu.style.right = 'auto';
      menu.style.width = '';

      var vw = document.documentElement.clientWidth || window.innerWidth;
      var rect = menu.getBoundingClientRect();
      var gutter = 16;

      if (rect.width > vw - gutter * 2) {
        menu.style.width = (vw - gutter * 2) + 'px';
        rect = menu.getBoundingClientRect();
      }

      if (rect.right > vw - gutter) {
        menu.style.left = Math.floor(vw - gutter - rect.right) + 'px';
      }

      rect = menu.getBoundingClientRect();
      if (rect.left < gutter) {
        menu.style.left = Math.ceil(gutter - rect.left) + 'px';
      }
    }

    function openMenu() {
      open = true;
      trigger.classList.add('open');
      menu.classList.add('open');
      requestAnimationFrame(fitMenuToViewport);
    }
    function closeMenu() {
      open = false;
      trigger.classList.remove('open');
      menu.classList.remove('open');
      menu.style.left = '0px';
      menu.style.width = '';
    }

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (open) closeMenu();
      else openMenu();
    });

    document.addEventListener('click', function () { closeMenu(); });
    menu.addEventListener('click', function (e) { e.stopPropagation(); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', function () {
      if (open) fitMenuToViewport();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
