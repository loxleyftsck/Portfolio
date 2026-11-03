import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Project } from '../../data/portfolio';
import { GithubIcon } from './SocialIcons';

export default function ProjectDetails({ project, onClose, onNavigate, index, total, direction }: {
  project: Project; onClose: () => void; onNavigate: (direction: -1 | 1) => void;
  index: number; total: number; direction: -1 | 1;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const reducedMotion = useReducedMotion();
  const [closing, setClosing] = useState(false);
  const [gallerySelection, setGallerySelection] = useState<{ projectId: string; index: number }>({ projectId: project.id, index: 0 });
  const activeImage = gallerySelection.projectId === project.id ? gallerySelection.index : 0;
  const currentImage = project.gallery?.[activeImage] ?? project.image;
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useLayoutEffect(() => {
    dialog.current?.scrollTo({ top: 0 });
  }, [project.id]);
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
        <div className="detail-project-nav" role="group" aria-label="Browse projects">
          <span>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          <button type="button" aria-label="Previous project" onClick={() => onNavigate(-1)}><ChevronLeft size={17} /></button>
          <button type="button" aria-label="Next project" onClick={() => onNavigate(1)}><ChevronRight size={17} /></button>
        </div>
        <button type="button" className="icon-button" aria-label="Close project details" onClick={requestClose} autoFocus>
          <X size={20} />
        </button>
      </div>
      <AnimatePresence mode="wait" initial={false} custom={direction}>
      <motion.div key={project.id} custom={direction}
        variants={{ enter: (step: number) => ({ opacity: 0, x: step * 18 }), center: { opacity: 1, x: 0 }, exit: (step: number) => ({ opacity: 0, x: step * -18 }) }}
        initial={reducedMotion ? false : 'enter'} animate="center" exit={reducedMotion ? undefined : 'exit'}
        transition={{ duration: reducedMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}>
      <h2 id="project-detail-title">{project.title}</h2>
      <p className="detail-description">{project.description}</p>
      <AnimatePresence mode="wait" initial={false}>
        {currentImage && <motion.figure key={currentImage.src} className="detail-evidence"
          initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: reducedMotion ? 0 : 0.2 }}>
          <img src={currentImage.src} alt={currentImage.alt} decoding="async" />
          <figcaption>{currentImage.caption ?? currentImage.alt}</figcaption>
        </motion.figure>}
      </AnimatePresence>
      {project.gallery && <div className="detail-gallery" role="group" aria-label="Project screenshots">
        {project.gallery.map((image, index) => <button type="button" key={image.src}
          aria-pressed={activeImage === index} onClick={() => setGallerySelection({ projectId: project.id, index })}>
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
      </motion.div>
      </AnimatePresence>
    </dialog>
  );
}
