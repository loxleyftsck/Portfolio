import { GithubIcon, ExternalLink } from '../ui/Icons';
import type { Project } from '../../data/portfolio';
import Badge from './Badge';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className="card card-hover group flex flex-col gap-4"
    >
      {/* Fixed aspect + object-contain: diagrams letterbox instead of cropping,
          so every image card is the same height and nothing gets cut off. */}
      {project.image && (
        <div className="-mx-2 -mt-2 aspect-[16/10] overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 bg-white">
          <img
            src={project.image.src}
            alt={project.image.alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain dark:opacity-85 group-hover:opacity-100 transition-opacity duration-200"
          />
        </div>
      )}

      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-bold text-gray-900 dark:text-white text-base">{project.title}</h3>
            {project.featured && (
              <span className="text-xs px-2 py-0.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold">
                Featured
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      {project.result && (
        <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 rounded-lg px-3 py-2">
          {project.result}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {project.tech.map(t => (
          <Badge key={t} label={t} />
        ))}
      </div>

      <div className="flex items-center gap-3 mt-auto pt-2">
        <a
          href={project.github}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <GithubIcon size={14} />
          Source
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-900 dark:text-white hover:underline underline-offset-4 transition-colors"
          >
            <ExternalLink size={14} />
            Live demo
          </a>
        )}
      </div>
    </article>
  );
}
