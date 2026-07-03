import { useState, useEffect, useCallback, useRef } from 'react'

export default function Lightbox({ selector = '.img-card img, .img-full img, .hero-img img' }) {
  const [src, setSrc] = useState(null)
  const [zoomed, setZoomed] = useState(false)
  const overlayRef = useRef(null)

  const close = useCallback(() => {
    setSrc(null)
    setZoomed(false)
  }, [])

  useEffect(() => {
    function attach() {
      const imgs = document.querySelectorAll(selector)
      imgs.forEach((img) => {
        img.style.cursor = 'zoom-in'
        img._lbHandler = () => setSrc(img.src)
        img.addEventListener('click', img._lbHandler)
      })
    }

    attach()
    const mo = new MutationObserver(attach)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      mo.disconnect()
      document.querySelectorAll(selector).forEach((img) => {
        if (img._lbHandler) img.removeEventListener('click', img._lbHandler)
      })
    }
  }, [selector])

  useEffect(() => {
    if (!src) return
    const onKey = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [src, close])

  if (!src) return null

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) close() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'zoom-out',
        animation: 'lbIn .2s ease',
      }}
    >
      <style>{`@keyframes lbIn{from{opacity:0}to{opacity:1}}`}</style>
      <button
        onClick={close}
        style={{
          position: 'absolute', top: 20, right: 24,
          background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)',
          borderRadius: '50%', width: 40, height: 40,
          color: '#fff', fontSize: 20, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background .15s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,.18)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,.1)'}
        aria-label="Close"
      >×</button>
      <img
        src={src}
        onClick={() => setZoomed((z) => !z)}
        style={{
          maxWidth: zoomed ? 'none' : '90vw',
          maxHeight: zoomed ? 'none' : '90vh',
          width: zoomed ? 'auto' : undefined,
          objectFit: 'contain',
          borderRadius: 10,
          cursor: zoomed ? 'zoom-out' : 'zoom-in',
          transition: 'transform .25s',
          boxShadow: '0 32px 80px rgba(0,0,0,.5)',
        }}
        alt=""
      />
    </div>
  )
}
