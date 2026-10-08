import { GithubIcon } from '../components/ui/SocialIcons';
import { lazy, Suspense, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { meta, social } from '../data/portfolio';

const HeroScene = lazy(() => import('../components/visuals/HeroScene'));

export default function Hero() {
  const [paused, setPaused] = useState(false);
  const [form, setForm] = useState<'chrome' | 'network'>('chrome');
  const reducedMotion = useReducedMotion();

  return (
    <section id="hero" className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="shell hero-inner">
        <div className="hero-copy">
          <motion.p className="hero-role"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {meta.title} <span>/</span> RAG & multi-agent systems
          </motion.p>
          <motion.h1 initial={reducedMotion ? false : { opacity: 0, y: 38 }}
            animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
            Herald<br /><span>Ginting<span className="accent">.</span></span>
          </motion.h1>
          <motion.div initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.28 }}>
            <p className="hero-description">{meta.tagline}</p>
            <div className="hero-actions">
              <a href="#projects" className="button button-primary">View Projects <ArrowUpRight size={18} /></a>
              <a href={social.github} className="button button-quiet" target="_blank" rel="noopener noreferrer">
                <GithubIcon size={17} /> GitHub
              </a>
            </div>
          </motion.div>
        </div>
        <div className="hero-visual">
          <Suspense fallback={<img className="scene-loading" src="/art/chrome.webp" alt="" width="1280" height="853" />}>
            <HeroScene paused={paused} form={form} />
          </Suspense>
          <div className="scene-controls" aria-label="Interactive sculpture controls">
            <div className="scene-forms" role="group" aria-label="Sculpture form">
              <button type="button" aria-pressed={form === 'chrome'} onClick={() => setForm('chrome')}>Chrome</button>
              <button type="button" aria-pressed={form === 'network'} onClick={() => setForm('network')}>Network</button>
            </div>
            <button type="button" className="scene-pause" onClick={() => setPaused(value => !value)}
              aria-pressed={paused} aria-label={paused ? 'Resume sculpture animation' : 'Pause sculpture animation'}>
              {paused ? <Play size={15} /> : <Pause size={15} />}
            </button>
          </div>
        </div>
        <div className="hero-bottom">
          <p className="availability"><span />{meta.available ? 'Available for opportunities' : 'Building AI systems'}</p>
          <p>{meta.location}</p>
        </div>
      </div>
    </section>
  );
}
