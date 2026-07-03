import { useEffect } from 'react'

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
        window.location.href = route
      })
    })
  }

  return (
    <iframe
      src={src}
      title={title}
      onLoad={wireLinks}
      style={{
        display: 'block',
        width: '100vw',
        height: '100vh',
        border: 0,
        background: '#fff',
      }}
    />
  )
}
