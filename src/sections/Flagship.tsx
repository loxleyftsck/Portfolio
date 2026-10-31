import { ArrowUpRight } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import { projects } from '../data/portfolio';

const studies = [
  {
    id: 'indogovrag', number: '01', label: 'DOCUMENT RETRIEVAL', title: 'Acuan',
    lead: 'Find the passage. Follow it to the source.',
    problem: 'Indonesian regulations are difficult to navigate when a useful answer is buried inside a long document.',
    approach: 'The portfolio demo searches a curated corpus with BM25 and returns extractive passages linked to their source.',
    evidence: '20 documents · 148 passages · curated snapshot, 24 Oct 2026',
    note: 'Standalone demo: no generative AI or full RAG pipeline. OCR text has not been verified against official documents.',
    imageLabel: 'LIVE DEMO / REGULATION SEARCH', flow: ['Query', 'BM25 search', 'Source excerpts'],
  },
  {
    id: 'transit-demand', number: '02', label: 'TIME-SERIES FORECASTING', title: 'Transit Demand Forecasting',
    lead: 'Forecast the next hour, station by station.',
    problem: 'Transit planning depends on knowing when and where passenger demand changes across a large network.',
    approach: 'A reproducible pipeline cleans hourly MTA data, trains LightGBM, and compares its predictions with a last-week baseline.',
    evidence: 'Test MAE: 25.06 LightGBM vs 42.24 last-week baseline · 428 stations',
    note: 'MAE is measured across the full test set; the chart shows one station. Results depend on the evaluation period and baseline.',
    imageLabel: 'EVALUATION / ACTUAL VS PREDICTED', flow: ['MTA data', 'LightGBM', 'Baseline comparison'],
  },
  {
    id: 'microllm', number: '03', label: 'PRIVATE INFERENCE', title: 'MicroLLM-PrivateStack',
    lead: 'A closer look at private model serving.',
    problem: 'Running an LLM locally requires trade-offs between available memory, inference speed, and application security.',
    approach: 'A private inference stack combines an API layer, caching, inference, validation, and audit logging.',
    evidence: 'Local inference · API layer · security controls',
    note: 'Architecture diagram from the project repository. Resource requirements and security coverage depend on the configuration.',
    imageLabel: 'ARCHITECTURE / PRIVATE LLM STACK', flow: ['API', 'Cache / inference', 'Audit log'],
  },
] as const;

export default function Flagship() {
  return <div className="flagship" aria-labelledby="flagship-title">
    <Reveal className="flagship-heading">
      <div><p className="flagship-kicker">SELECTED CASE STUDIES / 01—03</p><h2 id="flagship-title">A closer look.<br /><span className="muted-heading">From idea to system.</span></h2></div>
      <div className="flagship-intro"><p>Three projects, three different questions. A look at the problems, decisions, and evidence behind the work.</p><a href="#all-projects">Browse all projects <ArrowUpRight size={15} /></a></div>
    </Reveal>
    <div className="flagship-list">
      {studies.map(study => {
        const project = projects.find(item => item.id === study.id);
        if (!project?.image) return null;
        return <Reveal key={study.id} className="flagship-reveal">
          <article className="flagship-case">
            <div className="flagship-content">
              <div className="flagship-meta"><span>CASE STUDY / {study.number}</span><span>{study.label}</span></div>
              <h3>{study.title}</h3><p className="flagship-lead">{study.lead}</p>
              <dl className="flagship-story"><div><dt>THE QUESTION</dt><dd>{study.problem}</dd></div><div><dt>THE APPROACH</dt><dd>{study.approach}</dd></div></dl>
              <div className="case-flow"><p>PROCESS / SIMPLIFIED</p><ol>{study.flow.map(step => <li key={step}>{step}</li>)}</ol></div>
              <p className="flagship-evidence">{study.evidence}</p>
              <div className="flagship-actions">
                {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={15} /></a>}
                {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">View source <ArrowUpRight size={15} /></a>}
              </div>
            </div>
            <figure className="flagship-figure"><div className="flagship-image"><img src={project.image.src} alt={project.image.alt} loading="lazy" decoding="async" /></div><figcaption><span>{study.imageLabel}</span><span>{study.note}</span></figcaption></figure>
          </article>
        </Reveal>;
      })}
    </div>
  </div>;
}
