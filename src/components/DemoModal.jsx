import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, Gauge, MousePointer2, Palette, Radio, Rotate3D, X } from 'lucide-react'
import { SceneCanvas } from './SceneCanvas.jsx'

function useLiveMetrics(type) {
  const initial = useMemo(() => {
    if (type === 'saas') return { primary: 128.4, secondary: 94.2, tertiary: 38 }
    if (type === 'commerce') return { primary: 84, secondary: 12.8, tertiary: 26 }
    if (type === 'real-estate') return { primary: 42, secondary: 18, tertiary: 7 }
    if (type === 'hospitality') return { primary: 73, secondary: 16, tertiary: 4.9 }
    if (type === 'events') return { primary: 1240, secondary: 86, tertiary: 12 }
    if (type === 'education') return { primary: 428, secondary: 37, tertiary: 8 }
    if (type === 'fitness') return { primary: 164, secondary: 28, tertiary: 14 }
    if (type === 'healthcare') return { primary: 32, secondary: 11, tertiary: 6 }
    if (type === 'travel') return { primary: 87, secondary: 24, tertiary: 9 }
    if (type === 'jewellery') return { primary: 112, secondary: 19, tertiary: 7 }
    if (type === 'sports') return { primary: 680, secondary: 42, tertiary: 16 }
    return { primary: 96, secondary: 31, tertiary: 8 }
  }, [type])
  const [metrics, setMetrics] = useState(initial)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setMetrics((current) => ({
        primary: Math.max(1, current.primary + (Math.random() - 0.42) * 2.2),
        secondary: Math.max(1, current.secondary + (Math.random() - 0.48) * 0.7),
        tertiary: Math.max(1, Math.round(current.tertiary + (Math.random() > 0.62 ? 1 : -1))),
      }))
    }, 1800)
    return () => window.clearInterval(timer)
  }, [])

  return metrics
}

function MetricStrip({ type, metrics }) {
  const labels = type === 'saas'
    ? [['₹' + metrics.primary.toFixed(1) + 'K', 'Live revenue'], [metrics.secondary.toFixed(1) + '%', 'System health'], [metrics.tertiary, 'Active workflows']]
    : type === 'commerce'
      ? [[Math.round(metrics.primary), 'Viewing now'], [metrics.secondary.toFixed(1) + '%', 'Conversion'], [metrics.tertiary, 'Orders today']]
      : type === 'education'
        ? [[Math.round(metrics.primary), 'Active learners'], [Math.round(metrics.secondary), 'Enquiries'], [metrics.tertiary, 'New notices']]
        : type === 'fitness'
          ? [[Math.round(metrics.primary), 'Active members'], [Math.round(metrics.secondary), 'Trial leads'], [metrics.tertiary, 'Classes today']]
          : type === 'healthcare'
            ? [[Math.round(metrics.primary), 'Appointments'], [Math.round(metrics.secondary), 'Doctors online'], [metrics.tertiary, 'Open slots']]
            : type === 'travel'
              ? [[Math.round(metrics.primary), 'Trip views'], [Math.round(metrics.secondary), 'Enquiries'], [metrics.tertiary, 'Live packages']]
              : type === 'jewellery'
                ? [[Math.round(metrics.primary), 'Collection views'], [Math.round(metrics.secondary), 'Enquiries'], [metrics.tertiary, 'New arrivals']]
                : type === 'sports'
                  ? [[Math.round(metrics.primary), 'Live viewers'], [Math.round(metrics.secondary), 'Registrations'], [metrics.tertiary, 'Fixtures']]
                  : [[Math.round(metrics.primary), 'Live sessions'], [Math.round(metrics.secondary), 'Enquiries'], [metrics.tertiary, 'Updates']]

  return (
    <div className="demo-metrics" aria-label="Live simulated metrics">
      {labels.map(([value, label]) => (
        <div key={label} className="demo-metric">
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}

export function DemoModal({ demo, onClose }) {
  const [colour, setColour] = useState(demo.accent)
  const [intensity, setIntensity] = useState(68)
  const [mode, setMode] = useState(demo.modes[0])
  const metrics = useLiveMetrics(demo.id)
  const colours = useMemo(() => [demo.accent, demo.secondary, '#f4f7ff', '#ff815f', '#111827'], [demo])
  const whatsappMessage = encodeURIComponent(`Hi SatiTech, I explored the ${demo.title} experience and would like to discuss a website for my business.`)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        className="demo-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-title"
      >
        <button className="demo-backdrop" onClick={onClose} aria-label="Close demo" />
        <motion.div
          className="demo-shell"
          initial={{ opacity: 0, y: 30, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.985 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        >
          <button className="demo-close" onClick={onClose} aria-label="Close interactive demo"><X size={20} /></button>

          <div className="demo-stage" style={{ '--demo-accent': colour, '--demo-secondary': demo.secondary }}>
            <div className="demo-stage-top">
              <span><Radio size={13} /> Interactive preview</span>
              <span className="demo-mode-pill">{mode}</span>
            </div>
            <div className="demo-canvas">
              <SceneCanvas type={demo.id} color={colour} secondary={demo.secondary} intensity={intensity} mode={mode} />
            </div>
            <div className="orbit-hint"><MousePointer2 size={15} /> Drag to explore · Scroll to zoom</div>
            <MetricStrip type={demo.id} metrics={metrics} />
          </div>

          <div className="demo-panel">
            <div className="demo-panel-head">
              <span className="eyebrow">{demo.eyebrow}</span>
              <h2 id="demo-title">{demo.title}</h2>
              <p>{demo.description}</p>
            </div>

            <div className="demo-control">
              <div className="control-title"><Palette size={16} /> Accent colour</div>
              <div className="swatches">
                {colours.map((item) => (
                  <button
                    key={item}
                    className={colour === item ? 'swatch is-active' : 'swatch'}
                    style={{ '--swatch': item }}
                    onClick={() => setColour(item)}
                    aria-label={`Use ${item} colour`}
                  >{colour === item ? <CheckCircle2 size={14} /> : null}</button>
                ))}
              </div>
            </div>

            <div className="demo-control">
              <div className="control-row">
                <span className="control-title"><Gauge size={16} /> Experience energy</span>
                <strong>{intensity}%</strong>
              </div>
              <input
                className="energy-range"
                type="range"
                min="20"
                max="100"
                value={intensity}
                onChange={(event) => setIntensity(Number(event.target.value))}
                aria-label="Experience energy"
              />
            </div>

            <div className="demo-control">
              <div className="control-title"><Rotate3D size={16} /> Experience mode</div>
              <div className="mode-switcher">
                {demo.modes.map((item) => <button key={item} className={mode === item ? 'is-active' : ''} onClick={() => setMode(item)}>{item}</button>)}
              </div>
            </div>

            <div className="demo-feature-list">
              {demo.features.map((feature) => <span key={feature}><CheckCircle2 size={15} /> {feature}</span>)}
            </div>

            <a className="button button-primary demo-cta" href={`https://wa.me/919131043573?text=${whatsappMessage}`} target="_blank" rel="noreferrer">
              Build an experience like this <ArrowUpRight size={17} />
            </a>
            <p className="demo-note">Live UI simulation for capability demonstration. Production builds connect to the client’s secure APIs, CMS and database.</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
