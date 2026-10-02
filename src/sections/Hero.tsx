import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Mail, MapPin } from '../components/ui/Icons';
import FeaturedWorkPanel from '../components/ui/FeaturedWorkPanel';
import { meta, projects, social } from '../data/portfolio';

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const featuredProject = projects.find(project => project.id === 'adaptive-cdss');

  return (
    <section
      id="hero"
      className="hero-section min-h-screen flex items-center pt-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full py-16 lg:py-20">
        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-12 lg:gap-8 items-center">

          {/* Left — Text */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' }}
          >
            {meta.available && (
              <div className="hero-availability">
                <span className="hero-availability-dot" />
                Open to AI engineering roles
              </div>
            )}

            <h1 className="hero-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-[0.98] tracking-tight mb-5">
              {meta.name.split(' ')[0]}{' '}
              <span className="hero-name-accent">{meta.name.split(' ')[1]}.</span>
            </h1>

            <div className="hero-roleline">
              <span>{meta.title}</span>
              <i />
              <span>RAG · Agents · MLOps</span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg mb-8 text-base sm:text-lg">
              {meta.tagline}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <motion.a
                href="#projects"
                className="btn-primary"
                whileHover={reduceMotion ? undefined : { scale: 1.04, y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              >
                Explore selected work <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href={`mailto:${social.email}`}
                className="btn-secondary"
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              >
                <Mail size={16} /> Get in touch
              </motion.a>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <MapPin size={12} />
              {meta.location}
            </div>
          </motion.div>

          {/* Put a real project outcome in the first screen, not a generic tech illustration. */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.08, ease: 'easeOut' }}
            className="flex justify-center lg:justify-end"
          >
            {featuredProject && <FeaturedWorkPanel project={featuredProject} />}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
