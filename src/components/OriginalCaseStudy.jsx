import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ROUTES = {
  'index.html': '/',
  'mas.html': '/mas',
  'blacksmith-kyc.html': '/blacksmith-kyc',
  'peaktop-engineering.html': '/peaktop-engineering',
  'stone-for-gold.html': '/stone-for-gold',
  'mypassion-app.html': '/mypassion-app',
  'pawswipe.html': '/pawswipe',
  'prudential.html': '/prudential',
}

export default function OriginalCaseStudy({ src, title }) {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  function wireLinks(event) {
    const doc = event.currentTarget.contentDocument
    if (!doc) return

    doc.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute('href')
      if (!href) return

      const cleanHref = href.split('#')[0]
      const route = ROUTES[cleanHref]
      if (!route) return

      link.addEventListener('click', (clickEvent) => {
        clickEvent.preventDefault()
        navigate(route)
      })
    })
  }

  return (
    <iframe
      key={src}
      src={src}
      title={title}
      onLoad={wireLinks}
      style={{
        display: 'block',
        width: '100%',
        maxWidth: '100%',
        height: '100vh',
        border: 0,
        background: '#fff',
      }}
    />
  )
}
