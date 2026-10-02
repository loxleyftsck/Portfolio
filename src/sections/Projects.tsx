import { useState } from 'react';
import { projects, filters } from '../data/portfolio';
import type { Category } from '../data/portfolio';
import ProjectCard from '../components/ui/ProjectCard';

type Filter = 'all' | Category;

export default function Projects() {
  const [active, setActive] = useState<Filter>('all');
  const [showArchive, setShowArchive] = useState(false);

  const filtered = active === 'all'
    ? projects
    : projects.filter(p => p.category.includes(active));
  const featured = filtered.filter(project => project.featured);
  const archive = filtered.filter(project => !project.featured);
  const archiveIsVisible = showArchive || active !== 'all';
  const featuredCount = projects.filter(project => project.featured).length;

  return (
    <section id="projects" className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-10">
          <p className="section-label">Projects</p>
          <h2 className="section-title">Selected work</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl">
            {featuredCount} featured projects from a wider archive. Use the filters to explore work across retrieval, agents, ML, and infrastructure.
          </p>
        </div>

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
          {featured.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {archiveIsVisible && archive.length > 0 && (
          <div className="mt-14">
            {active === 'all' && (
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="section-label">More work</p>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">From the archive</h3>
                </div>
                <span className="text-xs font-mono text-gray-400 dark:text-gray-500">{archive.length} projects</span>
              </div>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {archive.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {active === 'all' && archive.length > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setShowArchive(value => !value)}
              aria-expanded={showArchive}
            >
              {showArchive ? 'Show featured only' : `View all ${projects.length} projects`}
              <span aria-hidden="true" className={`archive-chevron ${showArchive ? 'is-open' : ''}`}>⌄</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
