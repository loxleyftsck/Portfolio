import { motion } from 'framer-motion';
import { experiences } from '../data/portfolio';
import TimelineItem from '../components/ui/TimelineItem';

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-gray-50/70 dark:bg-gray-900/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label">Journey</p>
          <h2 className="section-title">How I got here</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-lg">
            Four years of commit history, condensed. The early stuff is still public.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-2xl">
          {experiences.map((item, i) => (
            <TimelineItem
              key={item.year}
              item={item}
              index={i}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
