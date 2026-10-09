import { GithubIcon } from './SocialIcons';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowUpRight, Radio } from 'lucide-react';
import type { PointerEvent } from 'react';
import type { Project } from '../../data/portfolio';

const art: Record<string, string> = {
  'adaptive-cdss': '/art/chrome.webp',
  equilibriumx: '/art/dialogue.webp',
  luminawall: '/art/attractor.webp',
};

export default function ProjectCard({ project, index, onDetails }: { project: Project; index: number; onDetails: (project: Project, trigger: HTMLButtonElement) => void }) {
  const reduce = useReducedMotion();
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const rotateX = useSpring(targetX, { stiffness: 150, damping: 23 });
  const rotateY = useSpring(targetY, { stiffness: 150, damping: 23 });
  const image = project.image?.src ?? art[project.id];
  const isEvidence = Boolean(project.image);
  const move = (event: PointerEvent<HTMLElement>) => {
    if (reduce || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    targetX.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 6);
    targetY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 6);
  };
  const reset = () => { targetX.set(0); targetY.set(0); };
  return (
    <motion.article layout className={'project-card' + (image ? ' has-visual' : ' compact-project')}
      data-project={project.id}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.025, 0.12) }}
      onPointerMove={move} onPointerLeave={reset}>
      {image && <motion.div className={'project-visual' + (isEvidence ? ' evidence-visual' : '')}
        style={{ rotateX, rotateY, transformPerspective: 900 }}>
        <img src={image} alt={project.image?.alt ?? ''} loading="lazy" decoding="async"
          width="1280" height="853" />
      </motion.div>}
      <div className="project-content">
        <div className="project-categories">
          <span>{project.category.map(category => category === 'ml' ? 'ML / RL' : category.toUpperCase()).join(' / ')}</span>
          {project.demo && <span className="demo-indicator"><Radio size={12} /> Live demo</span>}
        </div>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        {project.result && <p className="project-result">{project.result}</p>}
        <div className="project-tech">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div>
        <div className="project-links">
          <button type="button" onClick={event => onDetails(project, event.currentTarget)} aria-label={"View " + project.title + " details"} aria-haspopup="dialog">Details <ArrowUpRight size={15} /></button>
          {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-demo">
            Live demo <ArrowUpRight size={17} />
          </a>}
          <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={'View ' + project.title + ' source on GitHub'}>
            <GithubIcon size={15} /> Source <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
