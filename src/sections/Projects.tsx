import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, filters } from '../data/portfolio';
import type { Category } from '../data/portfolio';
import ProjectCard from '../components/ui/ProjectCard';

type Filter = 'all' | Category;

export default function Projects() {
  const [active, setActive] = useState<Filter>('all');

  const filtered = active === 'all'
    ? projects
    : projects.filter(p => p.category.includes(active));

  return (
    <section id="projects" className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="section-label">Projects</p>
          <h2 className="section-title">Selected work</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl">
            {projects.length} of 28 public repositories — the ones that got finished. Source is open
            for every one; a result is quoted only where there is a number worth quoting.
          </p>
        </motion.div>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter projects">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              aria-pressed={active === f.value}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 border ${
                active === f.value
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-transparent shadow-sm'
                  : 'bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
