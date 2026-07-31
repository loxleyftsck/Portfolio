import { motion } from 'framer-motion';
import type { Experience } from '../../data/portfolio';

interface TimelineItemProps {
  item: Experience;
  index: number;
  isLast: boolean;
}

export default function TimelineItem({ item, index, isLast }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.12 }}
      className="flex gap-5"
    >
      {/* Stem */}
      <div className="flex flex-col items-center">
        <div className="w-9 h-9 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
          <span className="text-xs font-bold text-white dark:text-gray-900">{item.year.slice(2)}</span>
        </div>
        {!isLast && <div className="w-px flex-1 bg-gray-200 dark:bg-gray-800 mt-2" />}
      </div>

      {/* Content */}
      <div className={`pb-10 ${isLast ? '' : ''}`}>
        <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
          {item.year}
        </div>
        <h3 className="font-bold text-gray-900 dark:text-white mb-1.5">{item.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}
