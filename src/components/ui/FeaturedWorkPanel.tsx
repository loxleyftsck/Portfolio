import { ArrowRight, GithubIcon } from './Icons';
import type { Project } from '../../data/portfolio';

interface FeaturedWorkPanelProps {
  project: Project;
}

const decisionStages = [
  { number: '01', title: 'Patient record', detail: 'Partial clinical context' },
  { number: '02', title: 'Safety rules', detail: 'Known contraindications' },
  { number: '03', title: 'RL policy', detail: 'Ambiguous cases' },
  { number: '04', title: 'Decision', detail: 'Recorded outcome' },
];

export default function FeaturedWorkPanel({ project }: FeaturedWorkPanelProps) {
  return (
    <article className="featured-work" aria-labelledby="featured-work-title">
      <div className="featured-work__topline">
        <span>Selected case <i aria-hidden="true" /> 01</span>
        <a href="#projects" className="featured-work__index-link">
          Project index <ArrowRight size={13} />
        </a>
      </div>

      <div className="featured-work__heading">
        <p>Clinical decision support</p>
        <h2 id="featured-work-title">{project.title}</h2>
        <p className="featured-work__summary">
          A rule layer handles clear contraindications. An RL policy assesses the uncertain cases when patient records are incomplete.
        </p>
      </div>

      <ol className="featured-work__stages" aria-label="Decision workflow">
        {decisionStages.map((stage, index) => (
          <li className="featured-work__stage" key={stage.number}>
            <span className="featured-work__stage-number">{stage.number}</span>
            <strong>{stage.title}</strong>
            <small>{stage.detail}</small>
            {index < decisionStages.length - 1 && <span className="featured-work__connector" aria-hidden="true" />}
          </li>
        ))}
      </ol>

      <div className="featured-work__bottom">
        <div className="featured-work__outcome">
          <span>Reported outcome</span>
          <strong>{project.result}</strong>
        </div>
        <div className="featured-work__links">
          {project.tech.slice(0, 3).map(technology => (
            <span key={technology}>{technology}</span>
          ))}
          <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source on GitHub`}>
            <GithubIcon size={15} /> Source
          </a>
        </div>
      </div>
    </article>
  );
}
