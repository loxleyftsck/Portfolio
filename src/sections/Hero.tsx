import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Zap, GithubIcon } from '../components/ui/Icons';
import { meta, social, stats } from '../data/portfolio';

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-16"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {meta.available && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Available for opportunities
              </div>
            )}

            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight mb-2">
              {meta.name.split(' ')[0]}
              <br />
              <span className="text-gray-400 dark:text-gray-500">
                {meta.name.split(' ')[1]}
              </span>
            </h1>


            <p className="text-xs text-gray-400 dark:text-gray-600 font-mono mb-4">
              {meta.fullName}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-5">
              <Zap size={14} className="text-gray-700 dark:text-gray-300" />
              <span className="font-semibold text-gray-700 dark:text-gray-200">{meta.title}</span>
            </div>

            <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-md mb-8">
              {meta.tagline}
            </p>

            <div className="flex items-center gap-6 mb-10">
              {stats.map(s => (
                <div key={s.label}>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{s.val}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <motion.a
                href="#projects"
                className="btn-primary"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              >
                View Projects <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href={social.github}
                target="_blank"
                rel="noopener"
                className="btn-secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              >
                <GithubIcon size={16} /> GitHub
              </motion.a>
            </div>

            <div className="flex items-center gap-1.5 mt-8 text-xs text-gray-400 dark:text-gray-600">
              <MapPin size={12} />
              {meta.location}
            </div>
          </motion.div>

          {/* Right — Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-300 to-gray-500 dark:from-gray-600 dark:to-gray-800 blur-2xl opacity-30 scale-105" />
              <div className="relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-xl w-72">
                <div className="relative overflow-hidden rounded-xl mb-4 aspect-[3/4]">
                  <img
                    src="/PhotoProfile.jpg"
                    alt="Herald Ginting"
                    className="w-full h-full object-cover object-[center_30%]"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-900 dark:text-white">{meta.name}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{meta.title} · Jakarta</div>
                </div>
                <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                  {['RAG', 'Agents', 'MLOps', 'Go'].map(t => (
                    <span key={t} className="badge text-[10px]">{t}</span>
                  ))}
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
