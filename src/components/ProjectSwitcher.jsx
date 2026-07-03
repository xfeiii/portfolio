import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import projects from '../data/projects'

export default function ProjectSwitcher() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const current = projects.find((p) => p.path === location.pathname) || projects[0]

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') setOpen(false) }
    function onClick(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [])

  function go(path) {
    setOpen(false)
    navigate(path)
  }

  return (
    <div className="ps-wrap" ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button className="ps-trigger" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="ps-label">{current.label}</span>
        <span className="ps-tag">{current.tag}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: open ? 'rotate(180deg)' : '', transition: 'transform .2s', flexShrink: 0 }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="ps-menu" role="listbox">
          {projects.map((p) => (
            <button
              key={p.path}
              className={`ps-item${p.path === location.pathname ? ' active' : ''}`}
              onClick={() => go(p.path)}
              role="option"
              aria-selected={p.path === location.pathname}
            >
              <span className="ps-item-label">{p.label}</span>
              <span className="ps-item-tag">{p.tag}</span>
            </button>
          ))}
        </div>
      )}

      <style>{`
        .ps-trigger{display:inline-flex;align-items:center;gap:10px;background:#fff;border:1.5px solid #e2e2e2;border-radius:100px;padding:8px 16px;cursor:pointer;font-family:inherit;transition:border-color .2s,box-shadow .2s;box-shadow:0 2px 8px rgba(0,0,0,.04)}
        .ps-trigger:hover{border-color:#bbb;box-shadow:0 4px 16px rgba(0,0,0,.08)}
        .ps-label{font-size:14px;font-weight:700;color:#111}
        .ps-tag{font-size:12px;color:#888;font-weight:400}
        .ps-menu{position:absolute;top:calc(100% + 8px);left:0;background:#fff;border:1px solid #e2e2e2;border-radius:14px;box-shadow:0 16px 48px rgba(0,0,0,.12),0 4px 16px rgba(0,0,0,.06);min-width:240px;overflow:hidden;z-index:200;animation:psIn .18s cubic-bezier(.22,1,.36,1)}
        @keyframes psIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
        .ps-item{display:flex;flex-direction:column;gap:2px;width:100%;padding:12px 16px;background:none;border:none;cursor:pointer;text-align:left;transition:background .12s;font-family:inherit}
        .ps-item:hover{background:#f5f5f5}
        .ps-item.active{background:#f0f0f0}
        .ps-item-label{font-size:14px;font-weight:600;color:#111}
        .ps-item-tag{font-size:12px;color:#888}
        .ps-item.active .ps-item-label{color:var(--accent,#111)}
      `}</style>
    </div>
  )
}
