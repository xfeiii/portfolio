import { useEffect } from 'react'

export default function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.fu')
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('v')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
