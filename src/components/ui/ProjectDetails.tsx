import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import type { Project } from '../../data/portfolio';
import { GithubIcon } from './SocialIcons';

export default function ProjectDetails({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const reducedMotion = useReducedMotion();
  const [closing, setClosing] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const currentImage = project.gallery?.[activeImage] ?? project.image;
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
      {currentImage && <figure className="detail-evidence">
        <img src={currentImage.src} alt={currentImage.alt} decoding="async" />
        <figcaption>{currentImage.caption ?? currentImage.alt}</figcaption>
      </figure>}
      {project.gallery && <div className="detail-gallery" role="group" aria-label="Project screenshots">
        {project.gallery.map((image, index) => <button type="button" key={image.src}
          aria-pressed={activeImage === index} onClick={() => setActiveImage(index)}>
          <img src={image.src} alt="" loading="lazy" decoding="async" />
          <span>{image.label}</span>
        </button>)}
      </div>}
      {project.caseStudy && <div className="detail-result">
        <h3>Problem</h3><p>{project.caseStudy.problem}</p>
        <h3>Approach</h3><p>{project.caseStudy.approach}</p>
        <h3>My contribution</h3><p>{project.caseStudy.contribution}</p>
        <h3>Outcome</h3><p>{project.caseStudy.outcome}</p>
      </div>}
      {project.result && <div className="detail-result">
        <h3>Reported result</h3><p>{project.result}</p>
      </div>}
      {project.tech.length > 0 && <div className="detail-stack">
        <h3>Built with</h3>
        <ul>{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul>
      </div>}
      <div className="detail-actions">
        {project.demo && <a className="button button-primary" href={project.demo} target="_blank" rel="noopener noreferrer">
          Open live demo <ArrowUpRight size={18} />
        </a>}
        {project.github && <a className="button button-quiet" href={project.github} target="_blank" rel="noopener noreferrer">
          <GithubIcon size={17} /> {project.githubLabel ?? 'Explore source'} <ArrowUpRight size={17} />
        </a>}
      </div>
    </dialog>
  );
}
