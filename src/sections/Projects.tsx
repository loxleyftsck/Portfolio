import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { projects, filters } from '../data/portfolio';
import type { Category, Project } from '../data/portfolio';
import ProjectCard from '../components/ui/ProjectCard';
import ProjectDetails from '../components/ui/ProjectDetails';
import Reveal from '../components/ui/Reveal';

type Filter = 'all' | Category;
const orderedProjects = [
  ...projects.filter(project => project.id === 'transit-demand'),
  ...projects.filter(project => project.id !== 'transit-demand'),
];

export default function Projects() {
  const [active, setActive] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Project | null>(null);
  const detailTrigger = useRef<HTMLButtonElement | null>(null);
  const openDetails = (project: Project, trigger: HTMLButtonElement) => {
    detailTrigger.current = trigger;
    setSelected(project);
  };
  const closeDetails = () => {
    setSelected(null);
    requestAnimationFrame(() => detailTrigger.current?.focus({ preventScroll: true }));
  };
  const search = query.trim().toLowerCase();
  const filtered = orderedProjects.filter(project =>
    (active === 'all' || project.category.includes(active)) &&
    [project.title, project.description, ...project.tech, ...project.category].join(' ').toLowerCase().includes(search));
  const reset = () => { setActive('all'); setQuery(''); };

  return (
    <section id="projects" className="section projects-section">
      <div className="shell">
        <Reveal className="section-heading">
          <h2>Experiments.<br /><span className="muted-heading">Built into systems.</span></h2>
          <p>{projects.length} selected projects across retrieval, agents, machine learning, and the infrastructure behind them.</p>
        </Reveal>
        <div className="project-toolbar">
          <div className="project-filter" role="group" aria-label="Filter projects">
            {filters.map(filter => <button type="button" key={filter.value}
              onClick={() => setActive(filter.value)} aria-pressed={active === filter.value}>
              {filter.label}
            </button>)}
          </div>
          <div className="project-search">
            <Search size={17} aria-hidden="true" />
            <label htmlFor="project-search" className="sr-only">Search projects</label>
            <input id="project-search" type="search" placeholder="Search projects or tools"
              value={query} onChange={event => setQuery(event.target.value)} />
            {query && <button type="button" aria-label="Clear project search" onClick={() => setQuery('')}><X size={16} /></button>}
          </div>
        </div>
        <p className="project-count" role="status" aria-live="polite" aria-atomic="true">
          {filtered.length} of {projects.length} projects
        </p>
        {filtered.length === 0 && <div className="project-empty">
          <p>No projects match your search.</p>
          <span>Try another tool or explore all projects.</span>
          <button type="button" className="button button-quiet" onClick={reset}>Reset filters <ArrowReset /></button>
        </div>}
        <motion.div layout className="project-grid" data-all={active === 'all' && !search}>
          <AnimatePresence initial={false}>
            {filtered.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onDetails={openDetails} />)}
          </AnimatePresence>
        </motion.div>
      </div>
      {selected && <ProjectDetails key={selected.id} project={selected} onClose={closeDetails} />}
    </section>
  );
}

function ArrowReset() { return <span aria-hidden="true">↗</span>; }
