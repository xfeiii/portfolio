import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/home.css'
import useScrollReveal from '../hooks/useScrollReveal'
import Lightbox from '../components/Lightbox'

const HERO_WORDS = ['Design', 'Apps', 'Icons']
const FOOTER_WORDS = ['create', 'design', 'build', 'craft', 'ship']

const marqueeLogos = [
  { src: '/assets/MAS-logo.png', alt: 'MAS' },
  { src: '/assets/BlacksmithKYC_Medium.png', alt: 'Blacksmith KYC' },
  { src: '/assets/ING_Logo_Transparent_Colour.svg', alt: 'ING' },
  { src: '/assets/Peaktop.webp', alt: 'PeakTop' },
  { src: '/assets/Prudential.png', alt: 'Prudential' },
  { src: '/assets/sfg_logo_black.png', alt: 'Stone For Gold' },
  { src: '/assets/Sportsrelief-Logo-01.png', alt: 'Sports Relief' },
]

const projects = [
  { to: '/mas', img: '/assets/MAS_Container.webp', name: 'Monetary Authority Singapore', cat: 'UX/UI · Government · In Progress', delay: '.05s' },
  { to: '/blacksmith-kyc', img: '/assets/ING_Container.webp', name: 'Blacksmith KYC', cat: 'UX/UI · SaaS · ING Bank', delay: '.1s' },
  { to: '/peaktop-engineering', img: '/assets/Peaktopengineeringcontainer.webp', name: 'PeakTop Engineering', cat: 'Web Design · Electrical', delay: '.15s' },
  { to: '/mypassion-app', img: '/assets/myPassion_container.png', name: 'MyPassion App', cat: 'Mobile App · UX', delay: '.2s' },
  { to: '/stone-for-gold', img: '/assets/StoneForGoldContainer.webp', name: 'Stone For Gold', cat: 'Website · E-Commerce', delay: '.05s' },
  { to: '/prudential', img: '/assets/prudential-container.avif', name: 'Prudential · NHK Associates', cat: 'Marketing · Social Media', delay: '.1s' },
]

const faqs = [
  { n: '01', q: 'How long does a typical project take?', a: 'A landing page typically takes 1–2 weeks. More comprehensive web apps take 4–8 weeks. I\'ll give a specific estimate after our initial consultation.' },
  { n: '02', q: 'Can you work with my existing brand and designs?', a: 'Absolutely. I regularly extend and evolve existing design systems. I\'ll conduct a brand audit first to ensure new work is consistent and elevates what you already have.' },
  { n: '03', q: 'What makes your design process unique?', a: 'I combine strategic thinking with pixel-perfect execution. Every decision ties back to your business goals — not just aesthetics. I provide detailed handoff docs so your dev team builds exactly what was designed.' },
  { n: '04', q: 'Do you offer ongoing support after the project?', a: 'Yes. All projects include a 30-day post-launch support window, and I offer flexible retainer arrangements for ongoing design needs.' },
  { n: '05', q: 'How do you handle confidentiality and IP rights?', a: 'All client work is fully confidential. Upon final payment, all intellectual property rights transfer to you. I\'m happy to sign NDAs for sensitive projects.' },
]

const workHistory = [
  { co: 'Monetary Authority Singapore', role: 'UX/UI Intern', badge: 'In Progress', date: 'May 2026 – Present', desc: 'Currently interning at MAS and supporting UX/UI work across digital products, with a focus on accessibility, clarity, and public-facing government services.' },
  { co: 'Prudential', role: 'Freelance Marketing Designer', badge: 'Freelance', date: 'Apr 2026 – Present', desc: 'Creating marketing collateral and social media design for Prudential\'s campaigns across Southeast Asia.', delay: '.05s' },
  { co: 'PeakTop Engineering', role: 'Website Designer', badge: 'Contract', date: 'Nov 2024 – Apr 2025', desc: 'Designed and developed the company website for PeakTop Engineering, improving their online presence and lead generation.', delay: '.1s' },
  { co: 'Stone For Gold', role: 'Graphic & Web Designer', badge: 'Internship', date: 'Mar 2024 – Aug 2024', desc: 'Designed the brand identity, e-commerce website, and marketing graphics for Stone For Gold\'s online jewellery store.', delay: '.15s' },
  { co: 'Blacksmith KYC · ING Bank', role: 'UI/UX Designer', badge: 'Internship', date: 'Sep 2020 – Nov 2020', desc: 'Designed the end-to-end KYC onboarding experience for Blacksmith, a SaaS product under ING Bank, focused on compliance and conversion.', delay: '.2s' },
]

const testimonials = [
  { src: '/assets/client-steven.jpg', alt: 'Steven', name: 'Steven', role: 'SportsRelief Therapy', quote: '"Fabio\'s creative work helped us showcase our brand in a more engaging and professional way."', delay: '.05s', marginTop: 0, animDelay: '0s' },
  { src: '/assets/client-ng.jpg', alt: 'Ng Hian Keong', name: 'Ng Hian Keong', role: 'Senior Finance Service Manager \u00b7 NHK Associates (Prudential)', quote: '"Fabio\'s social media marketing significantly improved our online engagement and brand presence."', delay: '.12s', marginTop: 36, animDelay: '.85s' },
  { src: '/assets/client-andy.jpg', alt: 'Andy Chong', name: 'Andy Chong', role: 'CEO \u00b7 Peak Top Engineering Pte Ltd', quote: '"Fabio delivered a clean and professional landing page that made it easier for customers to reach us."', delay: '.19s', marginTop: 0, animDelay: '.4s' },
]

export default function Home() {
  useScrollReveal()

  const [heroWord, setHeroWord] = useState('Design')
  const [openFaq, setOpenFaq] = useState(null)
  const [openWork, setOpenWork] = useState({})
  const [footerWord, setFooterWord] = useState('create')
  const [navScrolled, setNavScrolled] = useState(false)
  const [navUp, setNavUp] = useState(false)
  const lastScrollY = useRef(0)

  // Typewriter
  useEffect(() => {
    let wordIdx = 0, charIdx = 0, deleting = false
    let timeout
    function tick() {
      const current = HERO_WORDS[wordIdx]
      if (!deleting) {
        charIdx++
        setHeroWord(current.slice(0, charIdx))
        if (charIdx === current.length) { deleting = true; timeout = setTimeout(tick, 1800); return }
      } else {
        charIdx--
        setHeroWord(current.slice(0, charIdx))
        if (charIdx === 0) { deleting = false; wordIdx = (wordIdx + 1) % HERO_WORDS.length }
      }
      timeout = setTimeout(tick, deleting ? 55 : 90)
    }
    timeout = setTimeout(tick, 1200)
    return () => clearTimeout(timeout)
  }, [])

  // Footer cycling word
  useEffect(() => {
    let i = 0
    const iv = setInterval(() => {
      i = (i + 1) % FOOTER_WORDS.length
      setFooterWord(FOOTER_WORDS[i])
    }, 2000)
    return () => clearInterval(iv)
  }, [])

  // Nav scroll
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      setNavScrolled(y > 50)
      setNavUp(y > lastScrollY.current && y > 80)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Count-up for pricing stats
  useEffect(() => {
    function animCount(el, target, suffix, duration) {
      let start = null
      function step(ts) {
        if (!start) start = ts
        const progress = Math.min((ts - start) / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3)
        el.textContent = Math.floor(ease * target) + suffix
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        const el = e.target
        animCount(el, parseInt(el.dataset.count) || 0, el.dataset.suffix || '', 1200)
        obs.unobserve(el)
      })
    }, { threshold: 0.5 })
    document.querySelectorAll('.prv-num[data-count]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Scroll progress bar
  useEffect(() => {
    const bar = document.createElement('div')
    bar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:#0A0A0A;z-index:9999;width:0%;transition:width .1s linear;pointer-events:none'
    document.body.appendChild(bar)
    function onScroll() {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100
      bar.style.width = Math.min(pct, 100) + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); bar.remove() }
  }, [])

  function scrollToWork(e) {
    e.preventDefault()
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="home-page">
      <Lightbox />
      <div className="home-animated-bg" aria-hidden="true" />
      {/* NAV */}
      <nav id="nav" className={`${navScrolled ? 'scrolled' : ''} ${navUp ? 'up' : ''}`}>
        <a href="#" className="nav-brand">
          <img src="/assets/KohFabio_Transparent.png" className="nav-av" alt="Fabio Koh" />
        </a>
        <ul className="nav-links">
          <li><a href="#work">Projects</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
        <div className="avail"><span className="dot"></span>Available for projects</div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-dot-grid"></div>
        <div className="hero-left fu">
          <h1 className="hero-h">
            <span id="hero-word">{heroWord}</span> that
            <span className="heavy">delivers results.</span>
          </h1>
          <p className="hero-p"><strong>Strategic design that drives growth, not just looks good.</strong> I create everything your brand needs to attract customers and turn them into sales.</p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:kohfabio47@gmail.com" className="btn-dk">Get In Touch</a>
            <a href="https://www.linkedin.com/in/kohfabio/" target="_blank" rel="noreferrer" className="btn-li" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              Connect
            </a>
          </div>
          <div className="proof">
            <div className="av-stack">
              <img src="/assets/client-steven.jpg" alt="Steven" />
              <img src="/assets/client-ng.jpg" alt="Ng Hian Keong" />
              <img src="/assets/client-andy.jpg" alt="Andy Chong" />
              <img src="/assets/client-chew.jpg" alt="Client" />
            </div>
            <div>
              <div className="stars">★★★★★</div>
              <div className="proof-sub">20+ Clients Served</div>
            </div>
          </div>
        </div>
        <div className="hero-r fu" style={{ transitionDelay: '.2s' }}>
          <div className="hero-cards">
            <a className="hc" href="#work" onClick={scrollToWork} title="Monetary Authority Singapore">
              <img src="/assets/MAS_Container.webp" className="hc-img" alt="MAS" />
              <div className="hc-label"><span className="hc-name">MAS</span><span className="hc-cat">UX/UI · Gov · In Progress</span></div>
            </a>
            <a className="hc" href="#work" onClick={scrollToWork} title="Blacksmith KYC">
              <img src="/assets/ING_Container.webp" className="hc-img" alt="Blacksmith KYC" />
              <div className="hc-label"><span className="hc-name">Blacksmith KYC</span><span className="hc-cat">SaaS · ING Bank</span></div>
            </a>
            <a className="hc" href="#work" onClick={scrollToWork} title="MyPassion App">
              <img src="/assets/myPassion_container.png" className="hc-img" alt="MyPassion App" />
              <div className="hc-label"><span className="hc-name">MyPassion App</span><span className="hc-cat">Mobile · UX</span></div>
            </a>
            <a className="hc" href="#work" onClick={scrollToWork} title="PeakTop Engineering">
              <img src="/assets/Peaktopengineeringcontainer.webp" className="hc-img" alt="PeakTop Engineering" />
              <div className="hc-label"><span className="hc-name">PeakTop Engineering</span><span className="hc-cat">Web · Electrical</span></div>
            </a>
          </div>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...marqueeLogos, ...marqueeLogos].map((m, i) => (
            <span key={i} className="mi"><img src={m.src} className="mi-logo" alt={m.alt} /></span>
          ))}
        </div>
      </div>

      {/* PROJECTS */}
      <div className="sec" id="work">
        <div className="sec-hd fu">
          <h2 className="sec-title">My Projects <em style={{ fontWeight: 300, fontStyle: 'normal', background: 'linear-gradient(135deg,#4285F4,#9334E9,#EA4335)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>✦</em></h2>
          <div className="sec-meta">Fabio Koh →</div>
        </div>
        <div className="pg">
          {projects.map((p) => (
            <Link key={p.to} className="pc fu" to={p.to} style={{ transitionDelay: p.delay, textDecoration: 'none', display: 'block', color: 'inherit' }}>
              <div className="pt"><img src={p.img} className="pc-img" alt={p.name} /></div>
              <div className="po">
                <div><div className="pn">{p.name}</div><div className="pcat">{p.cat}</div></div>
                <div className="parr" aria-hidden="true">
                  <svg width="17" height="17" viewBox="0 0 16 16" fill="none">
                    <path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
          <Link className="pc wide fu" to="/pawswipe" style={{ transitionDelay: '.05s', textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div className="pt" style={{ height: '100%' }}>
              <img src="/assets/pawswipecontainer.webp" className="pc-img" alt="PawSwipe" style={{ objectPosition: 'center 10%' }} />
            </div>
            <div className="po">
              <div><div className="pn">PawSwipe</div><div className="pcat">Mobile App · Product Design</div></div>
              <div className="parr" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 16 16" fill="none">
                  <path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
        <div className="view-all fu"><a href="#">View all my projects ↗</a></div>
      </div>

      {/* TESTIMONIALS */}
      <div className="sec">
        <div className="tr-hd fu">
          <div className="trusted-row">Trusted by many
            <img src="/assets/Peaktop.webp" className="trusted-logo" alt="PeakTop" />
            <img src="/assets/Prudential.png" className="trusted-logo" alt="Prudential" />
            <img src="/assets/sfg_logo_black.png" className="trusted-logo" alt="Stone For Gold" />
            <img src="/assets/Sportsrelief-Logo-01.png" className="trusted-logo" alt="Sports Relief" />
          </div>
          <div className="th-wrap">
            <h2 className="th">Hear from what my<br /><em>clients have to say.</em></h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <div className="av-stack">
                <img src="/assets/client-steven.jpg" alt="Steven" />
                <img src="/assets/client-ng.jpg" alt="Ng Hian Keong" />
                <img src="/assets/client-andy.jpg" alt="Andy Chong" />
                <img src="/assets/client-chew.jpg" alt="Client" />
              </div>
              <div><div className="stars">★★★★★</div><div style={{ fontSize: 12, color: 'var(--muted)' }}>20+ Clients Served</div></div>
            </div>
          </div>
        </div>
        <div className="tbubbles">
          {testimonials.map((t, i) => (
            <div key={i} className="tb-item">
              <div
                className="tb-float"
                style={{ animationDelay: t.animDelay }}
              >
                <span className="tb-avatar"><img src={t.src} alt={t.alt} loading="lazy" /></span>
              </div>
              <div className="tb-card">
                <div className="tb-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p className="tb-quote">{t.quote}</p>
                <div className="tb-name">{t.name}</div>
                <div className="tb-role">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* SERVICES */}
      <div className="sec" id="services">
        <div className="sg">
          <div className="fu">
            <h2 className="svc-h">Services that<br /><span style={{ color: 'var(--text)', fontWeight: 900 }}>supercharge your</span><br />business.</h2>
            <div className="ts-label">My tech stack</div>
            <div className="ts-icons">
              {[
                { src: '/assets/Figma-skill.webp', alt: 'Figma', title: 'Figma' },
                { src: '/assets/Adobe-skill.webp', alt: 'Adobe', title: 'Adobe' },
                { src: '/assets/mircosoftoffice-skill.webp', alt: 'Microsoft Office', title: 'Microsoft Office' },
                { src: '/assets/unity-skill.png', alt: 'Unity', title: 'Unity' },
                { src: '/assets/visualstudio-skill.webp', alt: 'Visual Studio', title: 'Visual Studio' },
              ].map((t) => (
                <div key={t.title} className="ti" title={t.title}>
                  <img src={t.src} alt={t.alt} className="ti-img" />
                </div>
              ))}
            </div>
          </div>
          <div className="sl fu" style={{ transitionDelay: '.15s' }}>
            {[
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>, name: 'UX / UI Design' },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>, name: 'Landing Pages' },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>, name: 'Web Apps' },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>, name: 'Marketing Design' },
            ].map((s) => (
              <div key={s.name} className="si">
                <div className="si-icon">{s.icon}</div>
                <span className="si-name">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WORK HISTORY */}
      <div className="sec">
        <div className="wh-label fu">My Experiences</div>
        <div className="wh-full">
          {workHistory.map((w, i) => (
            <div key={i} className={`wi${openWork[i] ? ' open' : ''}`} style={w.delay ? { transitionDelay: w.delay } : {}} onClick={() => setOpenWork(prev => ({ ...prev, [i]: !prev[i] }))}>
              <div className="wi-top">
                <div>
                  <div className="wco">{w.co}</div>
                  <div className="wro">{w.role} <span className="wbadge">{w.badge}</span></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="wda">{w.date}</span>
                  <button className="wtog" onClick={e => { e.stopPropagation(); setOpenWork(prev => ({ ...prev, [i]: !prev[i] })) }}>
                    {openWork[i] ? '×' : '+'}
                  </button>
                </div>
              </div>
              <div className="wd">{w.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PRICING */}
      <div className="sec" id="pricing">
        <div className="prg">
          <div className="pr-val fu">
            <div>
              <div className="prv-avail"><span className="dot"></span> Available now</div>
              <p className="prv-tag">Why work with me directly?</p>
            </div>
            <div className="prv-stats">
              <div className="prv-stat">
                <div className="prv-num" data-count="20" data-suffix="+">20+</div>
                <div className="prv-label">Projects delivered</div>
              </div>
              <hr className="prv-divider" />
              <div className="prv-stat">
                <div className="prv-num" data-count="4" data-suffix="+">4+</div>
                <div className="prv-label">Years of design experience</div>
              </div>
              <hr className="prv-divider" />
              <div className="prv-stat">
                <div className="prv-num" data-count="48" data-suffix="hrs">48hrs</div>
                <div className="prv-label">Average turnaround</div>
              </div>
            </div>
            <ul className="prv-list">
              <li>No agency overhead — direct collaboration</li>
              <li>Pixel-perfect handoff to your dev team</li>
              <li>Revisions until you're 100% happy</li>
            </ul>
          </div>
          <div className="fu" style={{ transitionDelay: '.1s' }}>
            <div className="pr-card-inner">
              <div style={{ fontSize: 24, fontWeight: 700, color: '#0a0a0a', letterSpacing: '-.01em', marginBottom: 8 }}>Landing Page</div>
              <div className="pr-desc">Complete landing page design &amp; development. <strong style={{ color: '#0a0a0a' }}>Perfect for your next product launch.</strong></div>
              <hr className="pr-divider" />
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 52, fontWeight: 900, letterSpacing: '-.04em', lineHeight: 1 }}>$2,500</span>
                <span style={{ fontSize: 16, color: 'var(--muted)', fontWeight: 500 }}>/ project</span>
              </div>
              <div className="pr-feats">
                {['Custom design', 'Mobile responsive', '3 revision rounds', 'Fast turnaround', 'SEO optimised', 'Animations included'].map(f => (
                  <div key={f} className="prf"><span className="prf-ck">✓</span> {f}</div>
                ))}
              </div>
              <div className="pr-actions">
                <a href="https://wa.me/6596311820" target="_blank" rel="noreferrer" className="btn-dk">WhatsApp Me →</a>
              </div>
            </div>
            <div className="pr-dark-bar">
              <div>
                <div className="pdb-l">
                  <div className="pdb-title">Custom Project</div>
                  <div className="pdb-desc">Comprehensive design for any scope. Ideal for web apps, brand systems &amp; marketing campaigns.</div>
                </div>
                <div className="pdb-feats">
                  {['Clearly defined scope', 'Fixed timeline', '3 revision rounds', 'Milestone updates'].map(f => (
                    <div key={f} className="pdbf"><span>✓</span> {f}</div>
                  ))}
                </div>
              </div>
              <a href="https://wa.me/6596311820" target="_blank" rel="noreferrer" className="btn-wh">Get quote</a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="sec" id="faq">
        <h2 className="fqh">Your questions<br />answered.</h2>
        {faqs.map((f, i) => (
          <div key={i} className={`fi${openFaq === i ? ' open' : ''}`}>
            <div className="fq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <span><span className="fn">{f.n}</span>{f.q}</span>
              <span className="ftog">+</span>
            </div>
            <div className="fa">{f.a}</div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer>
        <div className="ft-inner">
          <div className="ft-cta fu">
            <div>Let's <span className="cy-word">{footerWord}</span></div>
            <div>design incredible</div>
            <div>work together.</div>
          </div>
          <div className="ft-row fu">
            <div>
              <div className="ft-cl">Email</div>
              <a href="mailto:kohfabio47@gmail.com" className="ft-cv">kohfabio47@gmail.com</a>
            </div>
            <div>
              <div className="ft-cl">Book a call</div>
              <a href="https://wa.me/6596311820" target="_blank" rel="noreferrer" className="ft-cv">+65 9631 1820 →</a>
            </div>
            <div>
              <div className="ft-cl">Social</div>
              <div className="sp-wrap">
                <a href="https://www.linkedin.com/in/fabiokoh" target="_blank" rel="noreferrer" className="sp">in LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="ft-nav fu">
            <div>
              <div className="ft-nl">Menu</div>
              <div className="ft-nls">
                <a href="#work">Work</a>
                <a href="#services">Services</a>
                <a href="#pricing">Pricing</a>
                <a href="#">Blog</a>
              </div>
            </div>
            <div>
              <div className="ft-nl">Legal</div>
              <div className="ft-nls">
                <a href="#">Terms of service</a>
                <a href="#">Privacy Policy</a>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
              <div className="ft-copy">© 2026 Fabio Koh</div>
            </div>
          </div>
        </div>
        <div className="giant">FABIO KOH</div>
      </footer>
    </div>
  )
}
