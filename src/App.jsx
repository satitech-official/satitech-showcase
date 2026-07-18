import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Box,
  Building2,
  Check,
  ChevronRight,
  CircleDot,
  Code2,
  Dumbbell,
  Gem,
  Globe2,
  GraduationCap,
  HeartPulse,
  Layers3,
  Menu,
  Plane,
  Radio,
  Rocket,
  Sparkles,
  Store,
  Trophy,
  UtensilsCrossed,
  X,
  Zap,
} from 'lucide-react'
import { SceneCanvas } from './components/SceneCanvas.jsx'
import { DemoModal } from './components/DemoModal.jsx'
import { RealWorldShowcase } from './components/RealWorldShowcase.jsx'
import { capabilities, demos } from './data.js'

const iconMap = {
  commerce: Store,
  'real-estate': Building2,
  hospitality: UtensilsCrossed,
  saas: BarChart3,
  events: Sparkles,
  brands: Layers3,
  education: GraduationCap,
  fitness: Dumbbell,
  healthcare: HeartPulse,
  travel: Plane,
  jewellery: Gem,
  sports: Trophy,
}

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.2, 0.8, 0.2, 1] } },
}

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="SatiTech home">
      <span className="logo-mark">S</span>
      <span className="logo-copy"><strong>SatiTech</strong><small>Interactive Lab</small></span>
    </a>
  )
}

function DemoArtwork({ demo }) {
  const Icon = iconMap[demo.id]
  return (
    <div className={`card-art card-art-${demo.id}`} style={{ '--accent': demo.accent, '--secondary': demo.secondary }}>
      <span className="card-grid" />
      <span className="art-orbit art-orbit-one" />
      <span className="art-orbit art-orbit-two" />
      <span className="art-core"><Icon size={34} /></span>
      <span className="art-chip art-chip-one">Live</span>
      <span className="art-chip art-chip-two">3D</span>
      <span className="art-glow" />
    </div>
  )
}

function App() {
  const [activeDemo, setActiveDemo] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeDemo = useCallback(() => setActiveDemo(null), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="app" id="top">
      <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
        <div className="nav-shell">
          <Logo />
          <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Primary navigation">
            <a href="#real-sites" onClick={closeMenu}>Real Sites</a>
            <a href="#work" onClick={closeMenu}>3D Lab</a>
            <a href="#capabilities" onClick={closeMenu}>Capabilities</a>
            <a href="#process" onClick={closeMenu}>Process</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </nav>
          <a className="nav-cta" href="https://www.satitechnologies.com/" target="_blank" rel="noreferrer">Company website <ArrowUpRight size={15} /></a>
          <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle navigation">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero section-shell">
          <div className="hero-noise" />
          <div className="hero-copy">
            <motion.div className="availability" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
              <span className="live-dot" /> Now building next-generation web
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              Web experiences<br />people <em>remember.</em>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.65 }}>
              SatiTech creates immersive 3D websites, real-time digital products and conversion-focused experiences for modern businesses.
            </motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.65 }}>
              <a className="button button-primary" href="#real-sites">Explore real websites <ArrowDownRight size={18} /></a>
              <a className="button button-ghost" href="https://wa.me/919131043573?text=Hi%20SatiTech%2C%20I%20would%20like%20to%20discuss%20a%20website%20for%20my%20business." target="_blank" rel="noreferrer">Start a project <ArrowUpRight size={17} /></a>
            </motion.div>
            <motion.div className="hero-proof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <span><Check size={15} /> Real photos & video</span>
              <span><Check size={15} /> Mobile responsive</span>
              <span><Check size={15} /> Performance focused</span>
            </motion.div>
          </div>

          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.1 }}>
            <div className="hero-canvas"><SceneCanvas hero interactive={false} /></div>
            <div className="visual-label visual-label-top"><Radio size={14} /> Real-time render</div>
            <div className="visual-label visual-label-bottom"><Box size={14} /> WebGL / Three.js</div>
            <div className="visual-index">S/01</div>
          </motion.div>

          <div className="hero-stats">
            <div><strong>09</strong><span>Full real-world sites</span></div>
            <div><strong>3D</strong><span>Browser-native visuals</span></div>
            <div><strong>100%</strong><span>Responsive experience</span></div>
            <div><strong>24/7</strong><span>Digital sales presence</span></div>
          </div>
        </section>

        <div className="capability-rail" aria-label="Core capabilities">
          <div className="rail-track">
            {[...capabilities, ...capabilities].map((item, index) => <span key={`${item}-${index}`}><CircleDot size={13} /> {item}</span>)}
          </div>
        </div>

        <RealWorldShowcase />

        <section className="work section-shell" id="verified-projects">
          <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <div>
              <span className="eyebrow">Verified repository and live demo</span>
              <h2>Official Sati Technologies website.</h2>
            </div>
            <p>A sanitized, production-build verified company website published through a feature branch and pull request.</p>
          </motion.div>

          <div className="demo-grid">
            <motion.article
              className="demo-card"
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              style={{ '--accent': '#77f7d2', '--secondary': '#4f7cff' }}
            >
              <div className="card-art card-art-brands" style={{ '--accent': '#77f7d2', '--secondary': '#4f7cff' }}>
                <span className="card-grid" />
                <span className="art-orbit art-orbit-one" />
                <span className="art-orbit art-orbit-two" />
                <span className="art-core"><Globe2 size={34} /></span>
                <span className="art-chip art-chip-one">Live</span>
                <span className="art-chip art-chip-two">GitHub</span>
                <span className="art-glow" />
              </div>
              <div className="card-content">
                <div className="card-meta"><span>Official Corporate Website</span><span>Verified</span></div>
                <h3>Sati Technologies Website</h3>
                <p>Services, portfolio concepts, pricing and conversion-focused contact journeys for the Sati Technologies brand.</p>
                <div className="tag-row"><span>React</span><span>Vite</span><span>GitHub Pages</span></div>
                <a className="card-link" href="https://satitech-official.github.io/sati-technologies-website/" target="_blank" rel="noreferrer">
                  View live website <span><ArrowUpRight size={17} /></span>
                </a>
                <a className="card-link" href="https://github.com/satitech-official/sati-technologies-website" target="_blank" rel="noreferrer">
                  View repository <span><Code2 size={17} /></span>
                </a>
              </div>
            </motion.article>
          </div>
        </section>

        <section className="work section-shell" id="work">
          <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <div>
              <span className="eyebrow">Interactive 3D capability lab</span>
              <h2>Twelve industries. Browser-native 3D.</h2>
            </div>
            <p>Open any demo to change its visual style, inspect live simulated data and interact with the 3D scene.</p>
          </motion.div>

          <div className="demo-grid">
            {demos.map((demo, index) => (
              <motion.article
                className="demo-card"
                key={demo.id}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.18 }}
                transition={{ delay: (index % 2) * 0.08 }}
                style={{ '--accent': demo.accent, '--secondary': demo.secondary }}
              >
                <DemoArtwork demo={demo} />
                <div className="card-content">
                  <div className="card-meta"><span>{demo.number} / {demo.eyebrow}</span><span>{demo.stat}</span></div>
                  <h3>{demo.title}</h3>
                  <p>{demo.description}</p>
                  <div className="tag-row">{demo.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <button className="card-link" onClick={() => setActiveDemo(demo)}>
                    Launch interactive demo <span><ArrowUpRight size={17} /></span>
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="capabilities section-shell" id="capabilities">
          <motion.div className="capability-intro" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
            <span className="eyebrow">Beyond the visual layer</span>
            <h2>Beautiful outside.<br /><em>Business-ready</em> inside.</h2>
            <p>Every experience is designed around a measurable business goal—from attention and trust to enquiries, bookings and sales.</p>
            <a href="#contact" className="text-link">Discuss your idea <ArrowRight size={16} /></a>
          </motion.div>
          <div className="capability-list">
            {[
              { icon: Globe2, title: 'Immersive frontends', text: 'Responsive WebGL, smooth motion and thoughtful interactions engineered for the modern web.', number: '01' },
              { icon: Code2, title: 'Connected products', text: 'APIs, secure authentication, CMS, payments, bookings and real-time data when the product needs them.', number: '02' },
              { icon: Zap, title: 'Performance & growth', text: 'Fast-loading architecture, SEO foundations, analytics and conversion paths built into the experience.', number: '03' },
              { icon: Rocket, title: 'Launch & support', text: 'Deployment, domain setup, quality checks and practical post-launch support for reliable delivery.', number: '04' },
            ].map((item) => (
              <motion.article key={item.title} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
                <span className="cap-number">{item.number}</span>
                <span className="cap-icon"><item.icon size={22} /></span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
                <ChevronRight size={19} className="cap-arrow" />
              </motion.article>
            ))}
          </div>
        </section>

        <section className="process section-shell" id="process">
          <div className="process-card">
            <motion.div className="process-heading" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
              <span className="eyebrow">Our process</span>
              <h2>From first idea to live experience.</h2>
              <p>A focused delivery system keeps the project clear, collaborative and ready for growth.</p>
            </motion.div>
            <div className="process-steps">
              {[
                ['01', 'Discover', 'Business goals, audience, content and the strongest digital opportunity.'],
                ['02', 'Design & build', 'A distinctive visual direction developed into a fast, interactive product.'],
                ['03', 'Test & launch', 'Responsive QA, performance checks, deployment and a clean handover.'],
              ].map(([number, title, text]) => (
                <motion.div key={number} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}>
                  <span>{number}</span><h3>{title}</h3><p>{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section-shell" id="contact">
          <motion.div className="contact-card" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
            <div className="contact-orb"><span /><span /><span /></div>
            <span className="eyebrow">Start something memorable</span>
            <h2>Have an ambitious<br />website idea?</h2>
            <p>Tell us about your business. We’ll help shape the right experience and show you what is possible.</p>
            <div className="contact-actions">
              <a className="button button-light" href="https://wa.me/919131043573?text=Hi%20SatiTech%2C%20I%20would%20like%20to%20discuss%20a%20website%20for%20my%20business." target="_blank" rel="noreferrer">Chat on WhatsApp <ArrowUpRight size={18} /></a>
              <a className="contact-email" href="mailto:satitechinfo@gmail.com">satitechinfo@gmail.com <ArrowRight size={16} /></a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="footer section-shell">
        <Logo />
        <div className="footer-links">
          <a href="https://github.com/satitech-official" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.instagram.com/satitech.official" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.satitechnologies.com/" target="_blank" rel="noreferrer">Website</a>
        </div>
        <p>© 2026 Sati Technologies · Indore, India</p>
      </footer>

      <AnimatePresence>{activeDemo ? <DemoModal key={activeDemo.id} demo={activeDemo} onClose={closeDemo} /> : null}</AnimatePresence>
    </div>
  )
}

export default App
