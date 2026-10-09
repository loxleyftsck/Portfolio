import { ArrowUpRight, Plus } from 'lucide-react';
import { skillGroups, meta, social } from '../data/portfolio';
import Reveal from '../components/ui/Reveal';

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="shell">
        <Reveal className="about-intro">
          <div className="portrait-frame">
            <img src="/portrait.webp" alt={meta.fullName} width="720" height="960" loading="lazy" decoding="async" />
          </div>
          <div className="about-copy">
            <h2>What I actually<br /><span className="muted-heading">work on.</span></h2>
            <p>Most of my work sits in the same place: a model that has to make a decision on incomplete information, and the retrieval or agent scaffolding that gets it enough context to try.</p>
            <p>That started with routing in disconnected networks, and turned into RAG pipelines, negotiating agents, and clinical decision support. DVC, MLflow, and scheduled retraining keep the work reproducible.</p>
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-link">More about me <ArrowUpRight size={17} /></a>
          </div>
        </Reveal>
        <div className="skills-grid">
          {skillGroups.map((group, index) => <Reveal key={group.label} delay={index * 0.04}>
            <details className="skill-group" open>
              <summary>{group.label}<Plus size={17} /></summary>
              <div className="skill-tags">{group.skills.map(skill => <span key={skill}>{skill}</span>)}</div>
            </details>
          </Reveal>)}
        </div>
      </div>
    </section>
  );
}
