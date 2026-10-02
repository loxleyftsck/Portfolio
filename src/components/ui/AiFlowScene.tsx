/** A quiet, diagrammatic view of a retrieval workflow. */
const steps = [
  { number: '01', className: 'system-node--source', title: 'Source material', detail: 'PDFs · policies · notes' },
  { number: '02', className: 'system-node--retrieve', title: 'Retrieve', detail: 'FAISS · reranking' },
  { number: '03', className: 'system-node--reason', title: 'Reason', detail: 'Tools · decision rules' },
  { number: '04', className: 'system-node--answer', title: 'Response', detail: 'Grounded · traceable' },
];

export default function AiFlowScene() {
  return (
    <div className="system-map" aria-hidden="true">
      <div className="system-map__topline">
        <span>Field note&nbsp; / &nbsp;01</span>
        <span>Retrieval system</span>
      </div>

      <div className="system-map__intro">
        <p>From source to answer</p>
        <span>Four steps, one accountable result.</span>
      </div>

      <div className="system-map__canvas">
        <svg className="system-map__routes" viewBox="0 0 520 260" preserveAspectRatio="none">
          <path className="system-map__route" d="M 110 48 H 410 V 212 H 110" />
          <path className="system-map__trace" d="M 110 48 H 410 V 212 H 110" />
        </svg>

        {steps.map(step => (
          <div key={step.number} className={`system-node ${step.className}`}>
            <span className="system-node__number">{step.number}</span>
            <span className="system-node__copy">
              <b>{step.title}</b>
              <small>{step.detail}</small>
            </span>
          </div>
        ))}
      </div>

      <div className="system-map__footer">
        <span>Retrieval</span><span>Evaluation</span><span>Observability</span>
      </div>
    </div>
  );
}
