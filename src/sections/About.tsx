import { ArrowUpRight, Plus } from 'lucide-react';
import { skillGroups, meta, social } from '../data/portfolio';
import Reveal from '../components/ui/Reveal';

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="shell">
        <Reveal className="about-intro">
          <div className="profile-asset">
            <div className="portrait-frame">
            <img src="/portrait.webp" alt={meta.fullName} width="720" height="960" loading="lazy" decoding="async" />
            </div>
            <div className="profile-caption"><span>HG / RESEARCH PROFILE</span><span>JAKARTA, ID</span></div>
          </div>
          <div className="about-copy">
            <p className="about-kicker">THE PERSON BEHIND THE SYSTEMS / 01</p>
            <h2>Curious about<br /><span className="muted-heading">how things connect.</span></h2>
            <p>My work began with routing in disconnected networks: how can a message find its way when there is no reliable path? That question grew into an interest in systems that make decisions with incomplete information.</p>
            <p>Today I explore retrieval, multi-agent systems, and applied machine learning. I enjoy working through the full process: shaping the data, building a useful interface, and making experiments easier to reproduce.</p>
            <div className="about-notes"><span>RETRIEVAL & SOURCES</span><span>MULTI-AGENT SYSTEMS</span><span>REPRODUCIBLE ML</span></div>
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-link">Connect on LinkedIn <ArrowUpRight size={17} /></a>
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
