// Clean up any stale exit state — also fires on bfcache restore (pageshow)
document.body.classList.remove('page-exit');
window.addEventListener('pageshow', function() {
  document.body.classList.remove('page-exit');
  document.body.style.pointerEvents = '';
});

// Intercept internal link clicks and fade out before navigating
document.addEventListener('click', function(e) {
  const a = e.target.closest('a[href]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel')) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  document.body.classList.add('page-exit');
  // Safety fallback — if navigation hasn't fired after 600ms, remove exit state
  const fallback = setTimeout(function() { document.body.classList.remove('page-exit'); }, 600);
  setTimeout(function() { clearTimeout(fallback); window.location.href = href; }, 290);
});
