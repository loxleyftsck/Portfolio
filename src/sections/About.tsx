import { motion } from 'framer-motion';
import { skillGroups } from '../data/portfolio';
import Badge from '../components/ui/Badge';

export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-50/70 dark:bg-gray-900/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label">About</p>
          <h2 className="section-title mb-5">What I actually work on</h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl text-base">
            Most of my work sits in the same place: a model that has to make a decision on incomplete
            information, and the retrieval or agent scaffolding that gets it enough context to try.
            That started with routing in disconnected networks, and turned into RAG pipelines,
            negotiating agents, and clinical decision support. The MLOps side — DVC, MLflow,
            scheduled retraining — is there because a result you cannot reproduce is not a result.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, scale: 1.008 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.07, type: 'spring', stiffness: 260, damping: 28 }}
              className="card card-hover"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map(s => (
                  <Badge key={s} label={s} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
