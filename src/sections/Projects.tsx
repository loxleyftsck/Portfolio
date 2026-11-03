import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { projects, filters } from '../data/portfolio';
import type { Category, Project } from '../data/portfolio';
import ProjectCard from '../components/ui/ProjectCard';
import ProjectDetails from '../components/ui/ProjectDetails';
import Reveal from '../components/ui/Reveal';
import Flagship from './Flagship';

type Filter = 'all' | Category;
const orderedProjects = [
  ...projects.filter(project => project.id === 'transit-demand'),
  ...projects.filter(project => project.id !== 'transit-demand'),
];

export default function Projects() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [16, -16]);
  const [active, setActive] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Project | null>(null);
  const [detailDirection, setDetailDirection] = useState<-1 | 1>(1);
  const detailTrigger = useRef<HTMLButtonElement | null>(null);
  const searchInput = useRef<HTMLInputElement | null>(null);
  const openDetails = (project: Project, trigger: HTMLButtonElement) => {
    detailTrigger.current = trigger;
    setSelected(project);
  };
  const closeDetails = () => {
    setSelected(null);
    requestAnimationFrame(() => detailTrigger.current?.focus({ preventScroll: true }));
  };
  const navigateDetails = (direction: -1 | 1) => {
    if (!selected) return;
    const currentIndex = orderedProjects.findIndex(project => project.id === selected.id);
    const nextIndex = (currentIndex + direction + orderedProjects.length) % orderedProjects.length;
    setDetailDirection(direction);
    setSelected(orderedProjects[nextIndex]);
  };
  const selectedIndex = selected ? orderedProjects.findIndex(project => project.id === selected.id) : -1;
  const search = query.trim().toLowerCase();
  const filtered = orderedProjects.filter(project =>
    (active === 'all' || project.category.includes(active)) &&
    [project.title, project.description, ...project.tech, ...project.category].join(' ').toLowerCase().includes(search));
  const searchAll = (term = '') => {
    setActive('all');
    setQuery(term);
    requestAnimationFrame(() => searchInput.current?.focus({ preventScroll: true }));
  };

  return (
    <section ref={sectionRef} id="projects" className="section projects-section">
      <motion.span className="section-watermark" style={reducedMotion ? undefined : { y: watermarkY }} aria-hidden="true">SYSTEMS</motion.span>
      <div className="shell">
        <Flagship />
        <Reveal className="section-heading">
          <h2 id="all-projects" tabIndex={-1}>Experiments.<br /><span className="muted-heading">Built into systems.</span></h2>
          <p>{projects.length} selected projects across AI systems, machine learning, and interactive web experiences.</p>
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
            <input ref={searchInput} id="project-search" type="search" placeholder="Search projects or tools"
              value={query} onChange={event => setQuery(event.target.value)} />
            {query && <button type="button" aria-label="Clear project search" onClick={() => setQuery('')}><X size={16} /></button>}
          </div>
        </div>
        <ProjectCount value={filtered.length} total={projects.length} />
        {filtered.length === 0 && <motion.div className="project-empty"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.3 }}>
          <div className="empty-marker" aria-hidden="true"><span>SEARCH / 00</span><strong>0</strong></div>
          <div className="empty-content">
            <p>No projects match your search.</p>
            <span>Try a different term, or start with one of these:</span>
            <div className="empty-suggestions" aria-label="Suggested searches">
              {['Python', 'React', 'RAG'].map(term => <button type="button" key={term} onClick={() => searchAll(term)}>{term} <span aria-hidden="true">↗</span></button>)}
            </div>
            <button type="button" className="button button-quiet" onClick={() => searchAll()}>Show all projects <ArrowReset /></button>
          </div>
        </motion.div>}
        <motion.div layout={!reducedMotion} className="project-grid" data-all={active === 'all' && !search}>
          <AnimatePresence initial={false} mode="popLayout">
            {filtered.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onDetails={openDetails} />)}
          </AnimatePresence>
        </motion.div>
      </div>
      {selected && <ProjectDetails project={selected} onClose={closeDetails} onNavigate={navigateDetails}
        index={selectedIndex} total={orderedProjects.length} direction={detailDirection} />}
    </section>
  );
}

function ProjectCount({ value, total }: { value: number; total: number }) {
  const countRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(countRef, { once: true, amount: 0.65 });
  const reduce = useReducedMotion();
  const count = useMotionValue(0);
  const label = useTransform(count, current => `${Math.round(current)} of ${total} projects`);
  const entered = useRef(false);

  useEffect(() => {
    if (!isInView) return;
    if (reduce) {
      count.set(value);
      entered.current = true;
      return;
    }
    if (!entered.current) count.set(0);
    const controls = animate(count, value, {
      duration: entered.current ? 0.32 : 0.82,
      ease: [0.22, 1, 0.36, 1],
    });
    entered.current = true;
    return controls.stop;
  }, [count, isInView, reduce, value]);

  return (
    <p ref={countRef} className="project-count" role="status" aria-live="polite" aria-atomic="true">
      <motion.span aria-hidden="true">{label}</motion.span>
      <span className="sr-only">{value} of {total} projects</span>
    </p>
  );
}

function ArrowReset() { return <span aria-hidden="true">↗</span>; }
