import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import type { Project } from '../../data/portfolio';
import { GithubIcon } from './SocialIcons';

export default function ProjectDetails({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const reducedMotion = useReducedMotion();
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestClose = () => {
    if (closeTimer.current !== null || closing) return;
    if (reducedMotion) { onClose(); return; }
    setClosing(true);
    closeTimer.current = setTimeout(onClose, 180);
  };
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      if (closeTimer.current !== null) clearTimeout(closeTimer.current);
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog ref={dialog} className="project-dialog" data-closing={closing} aria-labelledby="project-detail-title"
      onCancel={event => { event.preventDefault(); requestClose(); }} onClick={event => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom) requestClose();
        }
      }}>
      <div className="detail-topline">
        <p className="detail-eyebrow">Project overview</p>
        <button type="button" className="icon-button" aria-label="Close project details" onClick={requestClose} autoFocus>
          <X size={20} />
        </button>
      </div>
      <h2 id="project-detail-title">{project.title}</h2>
      <p className="detail-description">{project.description}</p>
      {project.image && <figure className="detail-evidence">
        <img src={project.image.src} alt={project.image.alt} decoding="async" />
        <figcaption>{project.image.alt}</figcaption>
      </figure>}
      {project.result && <div className="detail-result">
        <h3>Reported result</h3><p>{project.result}</p>
      </div>}
      <div className="detail-stack">
        <h3>Built with</h3>
        <ul>{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul>
      </div>
      <div className="detail-actions">
        {project.demo && <a className="button button-primary" href={project.demo} target="_blank" rel="noopener noreferrer">
          Open live demo <ArrowUpRight size={18} />
        </a>}
        <a className="button button-quiet" href={project.github} target="_blank" rel="noopener noreferrer">
          <GithubIcon size={17} /> Explore source <ArrowUpRight size={17} />
        </a>
      </div>
    </dialog>
  );
}
