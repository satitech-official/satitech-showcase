import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  ExternalLink,
  Images,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Pause,
  Phone,
  Play,
  Radio,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import { mediaCredits, realWorldSites } from '../realWorldData.js'

const reveal = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.2, 0.8, 0.2, 1] } },
}

function formatTime(date) {
  return new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit' }).format(date)
}

function RealSiteCard({ site, index, onOpen }) {
  return (
    <motion.article
      className="rw-card"
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.16 }}
      transition={{ delay: (index % 3) * 0.06 }}
      style={{ '--rw-accent': site.accent, '--rw-accent-2': site.accent2 }}
    >
      <div className="rw-card-media">
        <img src={site.heroImage} alt={`${site.brand} ${site.industry} website preview`} loading="lazy" />
        <span className="rw-card-shade" />
        <span className="rw-card-number">0{index + 1}</span>
        <span className="rw-card-live"><Radio size={12} /> Live concept</span>
        {site.video ? <span className="rw-card-video"><Play size={12} fill="currentColor" /> Real video</span> : null}
        <div className="rw-card-brand"><strong>{site.brand}</strong><small>{site.industry}</small></div>
      </div>
      <div className="rw-card-body">
        <p>{site.description}</p>
        <div className="rw-card-actions">
          <span>{site.features.slice(0, 2).join(' · ')}</span>
          <button type="button" onClick={() => onOpen(site)}>
            Open full website <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </motion.article>
  )
}

function MediaControl({ videoRef, playing, muted, setPlaying, setMuted }) {
  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => setPlaying(false))
    } else {
      video.pause()
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  return (
    <div className="rw-media-controls">
      <button type="button" onClick={togglePlay} aria-label={playing ? 'Pause background video' : 'Play background video'}>
        {playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
      </button>
      <button type="button" onClick={toggleMute} aria-label={muted ? 'Unmute background video' : 'Mute background video'}>
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </div>
  )
}

function RealWorldSite({ site, onClose }) {
  const rootRef = useRef(null)
  const videoRef = useRef(null)
  const [filter, setFilter] = useState('All')
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const [now, setNow] = useState(new Date())
  const [slots, setSlots] = useState(5)
  const [playing, setPlaying] = useState(Boolean(site.video))
  const [muted, setMuted] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  const visibleItems = useMemo(
    () => filter === 'All' ? site.items : site.items.filter((item) => item.category === filter),
    [filter, site.items],
  )

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const clock = window.setInterval(() => setNow(new Date()), 30000)
    const availability = window.setInterval(() => {
      setSlots((current) => Math.max(3, Math.min(9, current + (Math.random() > 0.5 ? 1 : -1))))
    }, 4800)
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      if (lightbox) setLightbox(null)
      else onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.clearInterval(clock)
      window.clearInterval(availability)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [lightbox, onClose])

  const scrollTo = useCallback((section) => {
    const target = rootRef.current?.querySelector(`[data-rw-section="${section}"]`)
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const message = [
      `Hi SatiTech, I explored the ${site.brand} ${site.industry} sample website.`,
      `Name: ${form.get('name')}`,
      `Phone: ${form.get('phone')}`,
      `Requirement: ${form.get('requirement')}`,
    ].join('\n')
    setSubmitted(true)
    window.open(`https://wa.me/919131043573?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  const recoverImage = (event) => {
    if (event.currentTarget.src !== site.heroImage) event.currentTarget.src = site.heroImage
  }

  const theme = {
    '--rw-accent': site.accent,
    '--rw-accent-2': site.accent2,
    '--rw-bg': site.background,
    '--rw-surface': site.surface,
    '--rw-text': site.text,
    '--rw-muted': site.muted,
  }

  return (
    <motion.div
      className={`rw-site rw-site-${site.id}`}
      style={theme}
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.28 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${site.brand} full sample website`}
    >
      <div className="rw-site-scroll" ref={rootRef}>
        <header className="rw-site-header">
          <button className="rw-back" type="button" onClick={onClose}><X size={17} /> Back to SatiTech showcase</button>
          <div className="rw-site-logo"><strong>{site.brand}</strong><small>Concept by SatiTech</small></div>
          <nav className={menuOpen ? 'rw-site-nav is-open' : 'rw-site-nav'} aria-label={`${site.brand} navigation`}>
            <button type="button" onClick={() => scrollTo('about')}>About</button>
            <button type="button" onClick={() => scrollTo('offerings')}>Explore</button>
            <button type="button" onClick={() => scrollTo('gallery')}>Gallery</button>
            <button type="button" onClick={() => scrollTo('contact')}>Contact</button>
          </nav>
          <a className="rw-header-cta" href={`https://wa.me/919131043573?text=${encodeURIComponent(`Hi SatiTech, I am interested in a ${site.industry} website like ${site.brand}.`)}`} target="_blank" rel="noreferrer">
            <MessageCircle size={15} /> Enquire
          </a>
          <button className="rw-site-menu" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle website navigation">
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </header>

        <main>
          <section className="rw-hero" data-rw-section="about" style={{ backgroundImage: `url(${site.heroImage})` }}>
            {site.video ? (
              <video
                ref={videoRef}
                src={site.video}
                poster={site.heroImage}
                autoPlay
                muted
                loop
                playsInline
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              />
            ) : null}
            <span className="rw-hero-overlay" />
            <div className="rw-hero-topline">
              <span><span className="rw-pulse" /> {site.status}</span>
              <span><Clock3 size={14} /> {formatTime(now)} IST</span>
            </div>
            <div className="rw-hero-copy">
              <span className="rw-kicker">{site.kicker}</span>
              <h1>{site.headline}</h1>
              <p>{site.description}</p>
              <div className="rw-hero-actions">
                <button className="rw-btn rw-btn-primary" type="button" onClick={() => scrollTo('contact')}>{site.primaryAction} <ArrowRight size={17} /></button>
                <button className="rw-btn rw-btn-glass" type="button" onClick={() => scrollTo('offerings')}>{site.secondaryAction}</button>
              </div>
            </div>
            <div className="rw-live-card">
              <span><Radio size={13} /> Live demo data</span>
              <strong>{slots}</strong>
              <small>{site.liveLabel}</small>
            </div>
            {site.video ? <MediaControl videoRef={videoRef} playing={playing} muted={muted} setPlaying={setPlaying} setMuted={setMuted} /> : null}
          </section>

          <section className="rw-stats" aria-label={`${site.brand} highlights`}>
            {site.stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
            <button type="button" onClick={() => scrollTo('contact')}><CalendarDays size={18} /> Check availability <ArrowUpRight size={15} /></button>
          </section>

          <section className="rw-offerings" data-rw-section="offerings">
            <div className="rw-section-head">
              <div><span>{site.sectionLabel}</span><h2>{site.sectionTitle}</h2></div>
              <p>Use the filters and explore a realistic customer journey. Every control in this concept is interactive.</p>
            </div>
            <div className="rw-filters" aria-label="Filter website content">
              {site.categories.map((category) => (
                <button type="button" key={category} className={filter === category ? 'is-active' : ''} onClick={() => setFilter(category)}>{category}</button>
              ))}
            </div>
            <div className="rw-items">
              <AnimatePresence mode="popLayout">
                {visibleItems.map((item, index) => (
                  <motion.article
                    layout
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <span>{item.category}</span><h3>{item.title}</h3><p>{item.text}</p><strong>{item.meta}</strong>
                    <button type="button" onClick={() => scrollTo('contact')}>Enquire <ArrowUpRight size={15} /></button>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </section>

          <section className="rw-story">
            <div className="rw-story-image"><img src={site.gallery[0]} onError={recoverImage} alt={`${site.brand} experience`} loading="lazy" /><span><Sparkles size={16} /> Real-world visual storytelling</span></div>
            <div className="rw-story-copy">
              <span>Built around business outcomes</span>
              <h2>{site.quote}</h2>
              <div className="rw-feature-list">
                {site.features.map((feature) => <div key={feature}><Check size={16} /><span>{feature}</span></div>)}
              </div>
              <button className="rw-text-action" type="button" onClick={() => scrollTo('contact')}>Discuss a similar website <ArrowRight size={17} /></button>
            </div>
          </section>

          <section className="rw-gallery" data-rw-section="gallery">
            <div className="rw-section-head">
              <div><span>Real photography</span><h2>A visual system customers can trust.</h2></div>
              <p>Open any image for a full-screen preview. Production projects use the client’s own approved media library.</p>
            </div>
            <div className="rw-gallery-grid">
              {site.gallery.map((source, index) => (
                <button type="button" key={source} onClick={() => setLightbox({ source, index })} aria-label={`Open ${site.brand} gallery image ${index + 1}`}>
                  <img src={source} onError={recoverImage} alt={`${site.brand} gallery ${index + 1}`} loading="lazy" />
                  <span><Images size={17} /> View image</span>
                </button>
              ))}
            </div>
          </section>

          <section className="rw-contact" data-rw-section="contact">
            <div className="rw-contact-copy">
              <span>Working enquiry flow</span>
              <h2>{site.formTitle}</h2>
              <p>{site.formPrompt} Submitting opens a pre-filled WhatsApp conversation with SatiTech.</p>
              <div className="rw-contact-links">
                <a href="tel:+919131043573"><Phone size={16} /> +91 91310 43573</a>
                <a href="mailto:satitechinfo@gmail.com"><Mail size={16} /> satitechinfo@gmail.com</a>
                <a href="https://maps.google.com/?q=Indore%2C%20Madhya%20Pradesh" target="_blank" rel="noreferrer"><MapPin size={16} /> Indore, Madhya Pradesh</a>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <label>Name<input name="name" type="text" placeholder="Your name" required /></label>
              <label>Phone<input name="phone" type="tel" inputMode="tel" placeholder="Your WhatsApp number" minLength="8" required /></label>
              <label>Requirement<textarea name="requirement" placeholder={site.formPrompt} rows="4" required /></label>
              <button className="rw-btn rw-btn-primary" type="submit"><Send size={16} /> {submitted ? 'Open WhatsApp again' : site.primaryAction}</button>
              {submitted ? <p className="rw-form-success"><Check size={15} /> Your pre-filled WhatsApp enquiry is ready.</p> : null}
            </form>
          </section>
        </main>

        <footer className="rw-site-footer">
          <div><strong>{site.brand}</strong><span>Original fictional concept by SatiTech</span></div>
          <div className="rw-site-footer-links">
            <button type="button" onClick={() => scrollTo('about')}>Back to top</button>
            <a href="https://unsplash.com/license" target="_blank" rel="noreferrer">Unsplash media <ExternalLink size={12} /></a>
            {site.videoCredit ? <a href={site.videoCredit} target="_blank" rel="noreferrer">Coverr video <ExternalLink size={12} /></a> : null}
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {lightbox ? (
          <motion.div className="rw-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Image preview">
            <button className="rw-lightbox-backdrop" type="button" onClick={() => setLightbox(null)} aria-label="Close image preview" />
            <img src={lightbox.source} onError={recoverImage} alt={`${site.brand} enlarged gallery ${lightbox.index + 1}`} />
            <button className="rw-lightbox-close" type="button" onClick={() => setLightbox(null)} aria-label="Close image preview"><X size={20} /></button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}

export function RealWorldShowcase() {
  const [activeSite, setActiveSite] = useState(null)
  const closeSite = useCallback(() => setActiveSite(null), [])

  return (
    <section className="real-world section-shell" id="real-sites">
      <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.32 }}>
        <div>
          <span className="eyebrow">Full real-world websites</span>
          <h2>Real media. Real journeys. Working actions.</h2>
        </div>
        <p>Open any concept as a complete responsive website with real photography, selected stock video, live interface states, filters, gallery, contact links and WhatsApp enquiry.</p>
      </motion.div>

      <div className="rw-notice"><Check size={15} /><span>All brands are original fictional concepts. {mediaCredits.images} {mediaCredits.videos}</span></div>

      <div className="rw-grid">
        {realWorldSites.map((site, index) => <RealSiteCard key={site.id} site={site} index={index} onOpen={setActiveSite} />)}
      </div>

      <AnimatePresence>{activeSite ? <RealWorldSite key={activeSite.id} site={activeSite} onClose={closeSite} /> : null}</AnimatePresence>
    </section>
  )
}
