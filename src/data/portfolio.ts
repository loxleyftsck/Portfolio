// ─── PROJECTS ───────────────────────────────────────────────────────────────
export type Category = 'rag' | 'agents' | 'ml' | 'web3' | 'infra' | 'web';

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: Category[];
  github?: string;
  /** Label for a related repository when it is not the demo source. */
  githubLabel?: string;
  /** Live, clickable deployment. Only set when the URL actually resolves. */
  demo?: string;
  /** Project screenshot or clearly labeled explanatory diagram. */
  image?: { src: string; alt: string; caption?: string };
  gallery?: { src: string; alt: string; caption: string; label: string }[];
  /** Only set when there is a real measured number to report. */
  result?: string;
  featured?: boolean;
  caseStudy?: { problem: string; approach: string; contribution: string; outcome: string };
}

export const projects: Project[] = [
  {
    id: 'monitor-forecast-diagnose',
    title: 'Monitor. Forecast. Diagnose.',
    description:
      'A collaborative infrastructure monitoring application that brings hardware telemetry, short-term temperature forecasts, alerts, and diagnostic assistance together in one dashboard.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'SQLite', 'LightGBM', 'Chart.js'],
    category: ['ml', 'infra', 'agents'],
    image: {
      src: '/projects/monitoring-landing.png',
      alt: 'THETA Monitoring landing page introducing the Monitor, Forecast, Diagnose platform.',
      caption: 'Landing page introducing the monitoring, forecasting, and diagnostic workflow.',
    },
    gallery: [
      { src: '/projects/monitoring-landing.png', label: 'Landing', alt: 'THETA Monitoring landing page with the headline Monitor, Forecast, Diagnose.', caption: 'Landing page introducing the monitoring platform.' },
      { src: '/projects/monitoring-analytics-live.png', label: 'Analytics', alt: 'Monitoring analytics view showing host status and temperatures by rack.', caption: 'Analytics view showing host status and rack temperatures.' },
      { src: '/projects/monitoring-assistant-live.png', label: 'Diagnosis', alt: 'Diagnostic assistant showing an analysis of host telemetry.', caption: 'Diagnostic assistant analyzing host telemetry and temperature forecasts.' },
      { src: '/projects/monitoring-settings-live.png', label: 'Settings', alt: 'Monitoring settings showing thermal thresholds and assistant status.', caption: 'Settings view for thermal thresholds and diagnostic assistant status.' },
      { src: '/projects/monitoring-overview.png', label: 'Overview', alt: 'Archived monitoring overview with host telemetry and temperature forecasts.', caption: 'Archived capture: host status, sensor readings and thermal forecasts.' },
      { src: '/projects/monitoring-hosts.png', label: 'Hosts', alt: 'Archived rack and host monitoring view with some network identifiers redacted.', caption: 'Archived capture: rack inventory and host reporting status; some identifiers are redacted.' },
      { src: '/projects/monitoring-alerts.png', label: 'Alerts', alt: 'Archived hardware alert investigation view with some identifiers redacted.', caption: 'Archived capture: alerts and investigation actions; some identifiers are redacted.' },
      { src: '/projects/monitoring-diagnostic.png', label: 'Assistant', alt: 'Archived diagnostic assistant response comparing rack temperatures, with some identifiers redacted.', caption: 'Archived capture: a diagnostic assistant response; some identifiers are redacted.' },
    ],
    caseStudy: {
      problem: 'Infrastructure operators need a clear view of device health, thermal warnings, and the context needed to investigate them.',
      approach: 'The team combined telemetry dashboards, short-term temperature forecasts, alerts, and diagnostic assistance grounded in available monitoring evidence.',
      contribution: 'I contributed to dashboard views, monitoring status consistency, diagnostic assistant improvements, testing, and technical documentation.',
      outcome: 'The project includes a monitoring application, forecasting models, tests, documentation, and archived captures of the dashboard and diagnostic workflow.',
    },
  },
  {
    id: 'time-series-forecasting-dashboard',
    title: 'Time-Series Forecasting Dashboard',
    description:
      'A collaborative forecasting application for exploring historical data, comparing model predictions, and working with uploaded datasets. I selected and trained stock forecasting models and contributed to the dashboard, API, and chatbot integration.',
    tech: ['Python', 'Next.js', 'FastAPI', 'React', 'Recharts'],
    category: ['ml', 'web'],
    image: {
      src: '/projects/forecasting-dashboard.jpg',
      alt: 'Stock forecasting dashboard showing model selection, forecast metrics, and a chart of actual and predicted prices.',
      caption: 'Stock forecasting dashboard showing model selection and historical predictions.',
    },
    gallery: [
      { src: '/projects/forecasting-dashboard.jpg', label: 'Stocks', alt: 'Stock forecasting dashboard with model selection and a chart of actual and predicted prices.', caption: 'Explore historical stock data and forecasts by model.' },
      { src: '/projects/forecasting-home.jpg', label: 'Home', alt: 'Forecasting application home page.', caption: 'The application home page introduces its forecasting tools.' },
      { src: '/projects/forecasting-rainfall.jpg', label: 'Rainfall', alt: 'Rainfall forecasting dashboard.', caption: 'A second dashboard presents rainfall forecasts.' },
      { src: '/projects/forecasting-comparison.jpg', label: 'Model comparison', alt: 'Forecasting model comparison screen.', caption: 'Compare forecasting model results and evaluation metrics.' },
    ],
    caseStudy: {
      problem: 'Historical data, forecasts, and model evaluations need a clear place to be explored and compared.',
      approach: 'The team built a Next.js and FastAPI application that presents forecasting results and supports uploaded CSV datasets and a conversational interface.',
      contribution: 'I selected and trained models for stock forecasting, contributed to the frontend and API migration, improved dashboard interactions and chat streaming, and integrated uploaded datasets into the chatbot workflow.',
      outcome: 'The application brings forecasting views, model comparisons, user-provided datasets, and chat into one interface.',
    },
  },
  {
    id: 'fotorame',
    title: 'FotoRame',
    description:
      'A digital photobooth for people in different places to share a frame. The browser experience brings together room invitations, participant and pose selection, a shared countdown, and photostrip collages, with a warm editorial visual identity.',
    tech: [],
    category: ['web'],
    demo: 'https://fotorame-room.loxleyherakd.chatgpt.site/',
    image: {
      src: '/projects/fotorame.webp',
      alt: 'FotoRame digital photobooth homepage with a shared-photo invitation, warm brown and peach styling, and sample group photostrips',
    },
  },
  {
    id: 'adaptive-cdss',
    title: 'Adaptive CDSS',
    description:
      'Clinical decision support that has to decide whether a prescription is safe when half the patient record is missing. A rule layer catches the hard contraindications; an RL policy handles the ambiguous rest.',
    tech: ['Python', 'PyTorch', 'MLflow', 'DVC', 'Docker'],
    result: 'False-negative rate 12.18% → 0.25% over 1,000 decisions',
    category: ['ml', 'agents'],
    github: 'https://github.com/loxleyftsck/adaptive-cdss-under-uncertainty',
    featured: true,
  },
  {
    id: 'equilibriumx',
    title: 'EquilibriumX',
    description:
      'Two agents haggle over a price. The RL half optimises for payoff, the LLM half writes the actual messages, so you can watch a bargaining strategy converge and read what it said while getting there.',
    tech: ['Python', 'Reinforcement Learning', 'LLM', 'MLflow', 'Docker'],
    result: 'Converges toward Nash equilibrium price in bilateral bargaining',
    category: ['agents', 'ml'],
    github: 'https://github.com/loxleyftsck/EquilibriumX-Multi-Agent-Negotiation-Sandbox',
    image: {
      src: '/projects/equilibrium-concept.svg',
      alt: 'Conceptual illustration of reinforcement learning strategy, an LLM message, and repeated negotiation rounds.',
      caption: 'A simplified illustration based on the project description, not an implementation diagram.',
    },
    featured: true,
  },
  {
    id: 'luminawall',
    title: 'LuminaWall',
    description:
      'A browser-based wallpaper studio with procedural styles, curated palettes, and previews for phones, tablets, and desktops. Canvas rendering runs in a Web Worker, with PNG exports up to 8K and no image uploads.',
    tech: ['Next.js 15', 'TypeScript', 'Canvas API', 'Web Workers', 'Tailwind v4'],
    category: ['web'],
    github: 'https://github.com/loxleyftsck/LuminaWall',
    demo: 'https://lumina-wall-jet.vercel.app',
    image: {
      src: '/projects/luminawall-studio.webp',
      alt: 'LuminaWall wallpaper studio showing a Misty Pine Forest wallpaper in a desktop monitor preview, with style and palette controls and PNG export',
    },
    featured: true,
  },
  {
    id: 'microllm',
    title: 'MicroLLM-PrivateStack',
    description:
      'A local LLM serving stack with an API layer, inference optimizations, caching, input validation, and audit logging. Memory use and security coverage depend on the deployment configuration.',
    tech: ['Python', 'FastAPI', 'Ollama', 'Docker', 'React'],
    category: ['rag', 'infra'],
    github: 'https://github.com/loxleyftsck/MicroLLM-PrivateStack',
    image: {
      src: '/projects/microllm-flow.svg',
      alt: 'Simplified MicroLLM diagram showing a request through an API layer, cache and local inference to a response, with audit logging. Configuration may vary.',
    },
  },
  {
    id: 'indogovrag',
    title: 'Acuan (formerly IndoGovRAG)',
    description:
      'The latest evolution of IndoGovRAG: Indonesian regulation research with traceable source excerpts. This standalone portfolio demo uses BM25, curated synonyms, and extractive summaries over a bundled corpus; it does not run the full RAG or LLM pipeline.',
    tech: ['Next.js', 'TypeScript', 'BM25', 'Vercel'],
    category: ['rag', 'web'],
    github: 'https://github.com/loxleyftsck/IndoGovRAG',
    githubLabel: 'IndoGovRAG source',
    demo: 'https://acuan-portfolio-demo.vercel.app/',
    image: {
      src: '/projects/acuan-demo.webp',
      alt: 'Acuan portfolio demo homepage with Indonesian regulation search, example queries, and an explicit notice that summaries are extractive without AI generation',
    },
  },
  {
    id: 'careeros',
    title: 'CareerOS',
    description:
      'Job matching that reads the posting instead of grepping it. Separate agents scout listings, score semantic fit, redraft the CV against each one, and run interview practice.',
    tech: ['Python', 'FastAPI', 'LangChain', 'PostgreSQL', 'React'],
    category: ['agents', 'rag'],
    github: 'https://github.com/loxleyftsck/CareerOS',
  },
  {
    id: 'stockflowml',
    title: 'StockFlowML',
    description:
      'Next-day trend prediction on Indonesian exchange data, with DVC-versioned data, model evaluation, and a scheduled GitHub Actions retraining workflow. The most recent workflow runs failed during job setup and need investigation.',
    tech: ['Python', 'DVC', 'MLflow', 'GitHub Actions', 'Docker'],
    result: 'Scheduled retraining configured; latest recorded runs failed during setup (June 2026)',
    category: ['ml', 'infra'],
    github: 'https://github.com/loxleyftsck/StockFlowML',
    image: {
      src: '/projects/stockflowml.jpg',
      alt: 'Pipeline diagram: data ingestion from Yahoo Finance through feature engineering, model training, evaluation and reporting, with DVC versioning and weekly retraining on GitHub Actions',
    },
  },
  {
    id: 'nexscan',
    title: 'NexScan',
    description:
      'Port scanner in Go, goroutine pool with backpressure, protocol probes for SSH/HTTP/FTP/MySQL/Redis/RDP, TTL-based OS guessing, and a gRPC bridge so you can bolt on Python analysis plugins.',
    tech: ['Go', 'gRPC', 'Python', 'Concurrency'],
    result: 'Embedded CVE database covering 9 services, 4 evasion levels',
    category: ['infra'],
    github: 'https://github.com/loxleyftsck/HackClaw',
  },
  {
    id: 'transit-demand',
    title: 'Transit Demand Forecasting',
    description:
      'Hourly ridership per station on real MTA data. Most of the work was the unglamorous part, profiling and cleaning ~7.5 GB before LightGBM saw any of it, then Optuna tuning tracked in MLflow.',
    tech: ['Python', 'LightGBM', 'Optuna', 'MLflow', 'Pandas'],
    result: 'Full test-set MAE: 25.06 LightGBM vs 42.24 last-week baseline',
    category: ['ml'],
    github: 'https://github.com/loxleyftsck/transit-demand-forecasting',
    demo: 'https://transit-demand-forecasting-portfoli.vercel.app',
    image: {
      src: '/projects/transit-pred.jpg',
      alt: 'Test-set plot for Times Sq-42 St: actual hourly entries against tuned LightGBM predictions and a last-week naive baseline, March to May 2024',
      caption: 'The chart shows Times Sq–42 St from March to May 2024. The MAE below covers the full test set, not just this station.',
    },
  },
  {
    id: 'rl-minigrid',
    title: 'Partial-Observability RL',
    description:
      'Four RL paradigms, PPO, recurrent LSTM policies, curriculum learning and GAIL, trained on partially observed MiniGrid, with the debugging process written down rather than tidied away.',
    tech: ['Python', 'PyTorch', 'PPO', 'GAIL', 'MiniGrid'],
    category: ['ml'],
    github: 'https://github.com/loxleyftsck/partial-observability-rl-minigrid',
  },
  {
    id: 'carl-dtn',
    title: 'CARL-DTN',
    description:
      'Undergraduate research on routing in delay-tolerant networks, where nodes are rarely connected and there is no end-to-end path. Q-learning picks relays from multi-dimensional context, with adaptive copy control.',
    tech: ['Java', 'THE ONE Simulator', 'Q-Learning'],
    category: ['ml'],
    github: 'https://github.com/loxleyftsck/Routing-Berbasis-Sadar-Konteks',
  },
  {
    id: 'bnb-staking',
    title: 'BNB Staking DApp',
    description:
      'BEP-20 token with staking on BNB Smart Chain testnet, Solidity contracts, Hardhat deploy scripts and test suite, plus a minimal Next.js frontend for wallet connect, transfer and stake.',
    tech: ['Solidity', 'Hardhat', 'Next.js', 'BNB Chain'],
    category: ['web3'],
    github: 'https://github.com/loxleyftsck/bnb-staking-dapp',
  },
  {
    id: 'caiss',
    title: 'CAISS',
    description:
      'Desktop scraper that learns a per-domain request rhythm instead of hammering a fixed rate. XGBoost policy engine drives the throttle; ships as a cross-platform Electron app.',
    tech: ['Python', 'XGBoost', 'Electron', 'FastAPI', 'Docker'],
    category: ['ml', 'infra'],
    github: 'https://github.com/loxleyftsck/CAISS-Context-Aware-Intelligent-Scraping-System-',
  },
  {
    id: 'bonku',
    title: 'BONKU',
    description:
      'Personal finance app aimed at Indonesian users, transactions, dashboard, bite-sized financial literacy lessons, and AI summaries. Built deliberately on free tiers end to end.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Vercel', 'Tailwind'],
    category: ['web'],
    github: 'https://github.com/loxleyftsck/BONKU',
  },
];

// ─── PROJECT FILTERS ─────────────────────────────────────────────────────────
// Derived from `projects`, so a filter can never point at an empty result.
export const filters: { label: string; value: 'all' | Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'RAG', value: 'rag' },
  { label: 'Agents', value: 'agents' },
  { label: 'ML / RL', value: 'ml' },
  { label: 'Infra', value: 'infra' },
  { label: 'Web', value: 'web' },
  { label: 'Web3', value: 'web3' },
].filter(
  f => f.value === 'all' || projects.some(p => p.category.includes(f.value as Category)),
) as { label: string; value: 'all' | Category }[];

// ─── SKILLS ─────────────────────────────────────────────────────────────────
export interface SkillGroup {
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'AI / ML',
    skills: ['LangChain', 'FAISS', 'Ollama', 'PyTorch', 'LightGBM', 'XGBoost', 'Q-Learning', 'PPO'],
  },
  {
    label: 'Backend',
    skills: ['Python', 'FastAPI', 'Go', 'Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    label: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite'],
  },
  {
    label: 'MLOps',
    skills: ['MLflow', 'DVC', 'Docker', 'GitHub Actions', 'Optuna'],
  },
  {
    label: 'Data / Research',
    skills: ['Pandas', 'NumPy', 'NetworkX', 'Jupyter', 'THE ONE Simulator'],
  },
  {
    label: 'Other',
    skills: ['Java', 'Solidity', 'Hardhat', 'Electron', 'Supabase'],
  },
];

// ─── JOURNEY ─────────────────────────────────────────────────────────────────
export interface Experience {
  year: string;
  title: string;
  description: string;
}

export const experiences: Experience[] = [
  {
    year: '2022',
    title: 'Coursework',
    description:
      'First commits. PHP assignments and lab exercises, the ordinary starting point, kept public rather than quietly deleted.',
  },
  {
    year: '2025',
    title: 'Research, then everything else',
    description:
      'Context-aware DTN routing in Java on THE ONE simulator became the thread I pulled hardest. Alongside it: first ML notebooks, LSTM tuning, and a Solidity staking contract on BNB testnet out of curiosity.',
  },
  {
    year: '2026',
    title: 'AI systems',
    description:
      'Shifted from experiments to systems that hold together, RAG pipelines, multi-agent negotiation, MLOps with DVC and MLflow, and a Go network scanner.',
  },
];

// ─── SOCIAL / CONTACT ────────────────────────────────────────────────────────
export const social = {
  github: 'https://github.com/loxleyftsck',
  linkedin: 'https://www.linkedin.com/in/herald-michain-samuel-theo-ginting-9b70762a3/',
  email: 'heraldmsamueltheo@gmail.com',
};

export const meta = {
  name: 'Herald Samuel Ginting',
  fullName: 'Herald Michain Samuel Theo Ginting',
  title: 'AI Engineer',
  tagline:
    'I build retrieval and multi-agent systems, and the MLOps plumbing that keeps them reproducible. Explore the projects and live demos below.',
  location: 'Jakarta, Indonesia',
  available: true,
};
