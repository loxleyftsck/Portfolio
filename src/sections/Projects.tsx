import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects, filters } from '../data/portfolio';
import type { Category } from '../data/portfolio';
import ProjectCard from '../components/ui/ProjectCard';
import Reveal from '../components/ui/Reveal';

type Filter = 'all' | Category;
// Put the new interactive demo first; retain every existing project.
const orderedProjects = [
  ...projects.filter(project => project.id === 'transit-demand'),
  ...projects.filter(project => project.id !== 'transit-demand'),
];

export default function Projects() {
  const [active, setActive] = useState<Filter>('all');
  const filtered = active === 'all' ? orderedProjects : orderedProjects.filter(project => project.category.includes(active));
  return (
    <section id="projects" className="section projects-section">
      <div className="shell">
        <Reveal className="section-heading">
          <h2>Experiments.<br /><span className="muted-heading">Built into systems.</span></h2>
          <p>{projects.length} selected projects across retrieval, agents, machine learning, and the infrastructure behind them.</p>
        </Reveal>
        <div className="project-filter" role="group" aria-label="Filter projects">
          {filters.map(filter => <button type="button" key={filter.value}
            onClick={() => setActive(filter.value)} aria-pressed={active === filter.value}>
            {filter.label}
          </button>)}
        </div>
        <p className="sr-only" aria-live="polite">{filtered.length} projects shown</p>
        <motion.div layout className="project-grid" data-all={active === 'all'}>
          <AnimatePresence initial={false}>
            {filtered.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
