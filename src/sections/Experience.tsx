import { experiences } from '../data/portfolio';
import Reveal from '../components/ui/Reveal';

export default function Experience() {
  return (
    <section id="experience" className="section experience-section">
      <div className="shell">
        <Reveal className="section-heading">
          <h2>Always curious.<br /><span className="muted-heading">Still building.</span></h2>
          <p>Four years of commit history, condensed. The early work is still public.</p>
        </Reveal>
        <div className="experience-grid">
          {experiences.map((item, index) => <Reveal key={item.year} delay={index * 0.08} className="experience-item">
            <p className="experience-year">{item.year}</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Reveal>)}
        </div>
      </div>
    </section>
  );
}
