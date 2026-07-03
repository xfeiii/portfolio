import { useEffect, useState } from 'react'
import OriginalCaseStudy from '../components/OriginalCaseStudy'

export default function MAS() {
  const [code, setCode] = useState('')
  const [allowed, setAllowed] = useState(() => sessionStorage.getItem('mas-admin') === 'true')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('admin') === 'fabio2026') {
      sessionStorage.setItem('mas-admin', 'true')
      setAllowed(true)
      window.history.replaceState({}, '', '/mas')
    }
  }, [])

  function unlock(e) {
    e.preventDefault()
    if (code.trim() === 'fabio2026') {
      sessionStorage.setItem('mas-admin', 'true')
      setAllowed(true)
      return
    }
    setCode('')
  }

  if (!allowed) {
    return (
      <main style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#fff',
        color: '#111',
        fontFamily: 'Inter, sans-serif',
        padding: 24,
      }}>
        <form onSubmit={unlock} style={{
          width: 'min(420px, 100%)',
          border: '1px solid #e8e8e8',
          borderRadius: 14,
          padding: 28,
          boxShadow: '0 20px 60px rgba(0,0,0,.08)',
          background: 'rgba(255,255,255,.94)',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: '#888', marginBottom: 12 }}>Admin Only</div>
          <h1 style={{ fontSize: 28, letterSpacing: '-.03em', marginBottom: 10 }}>MAS Project Locked</h1>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: '#666', marginBottom: 22 }}>This in-progress internship project is private for now.</p>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            type="password"
            placeholder="Enter admin code"
            style={{
              width: '100%',
              border: '1px solid #ddd',
              borderRadius: 10,
              padding: '13px 14px',
              fontSize: 14,
              marginBottom: 12,
              outline: 'none',
            }}
          />
          <button type="submit" style={{
            width: '100%',
            border: 0,
            borderRadius: 999,
            background: '#111',
            color: '#fff',
            padding: '13px 18px',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
          }}>Unlock</button>
        </form>
      </main>
    )
  }

  return <OriginalCaseStudy src="/mas.html" title="Monetary Authority of Singapore in progress project" />
}
