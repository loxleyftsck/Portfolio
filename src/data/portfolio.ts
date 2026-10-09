// ─── PROJECTS ───────────────────────────────────────────────────────────────
export type Category = 'rag' | 'agents' | 'ml' | 'web3' | 'infra' | 'web';

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: Category[];
  github: string;
  /** Live, clickable deployment. Only set when the URL actually resolves. */
  demo?: string;
  /**
   * Only set when a real screenshot or diagram exists in the project's repo.
   * Never a stock photo, an illustration, or an AI-generated mockup, a card
   * with no image is better than a card with a decorative one.
   */
  image?: { src: string; alt: string };
  /** Only set when there is a real measured number to report. */
  result?: string;
  featured?: boolean;
}

export const projects: Project[] = [
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
    featured: true,
  },
  {
    id: 'luminawall',
    title: 'LuminaWall',
    description:
      'Wallpaper generator that runs entirely in your tab, chaos-theory attractors and particle physics drawn straight to Canvas, with the heavy loops compiled to WASM. No API key, no server, no upload.',
    tech: ['Next.js 15', 'TypeScript', 'Canvas API', 'WASM', 'Tailwind v4'],
    category: ['web'],
    github: 'https://github.com/loxleyftsck/LuminaWall',
    demo: 'https://lumina-wall-jet.vercel.app',
    featured: true,
  },
  {
    id: 'microllm',
    title: 'MicroLLM-PrivateStack',
    description:
      'A private LLM stack for hardware nobody wants to run LLMs on. Sliding-window attention, memory mapping and prompt-prefix caching to fit in 2GB RAM, with OWASP ASVS L2 controls on the serving layer.',
    tech: ['Python', 'FastAPI', 'Ollama', 'Docker', 'React'],
    result: 'Serves on 2GB RAM under OWASP ASVS L2 controls',
    category: ['rag', 'infra'],
    github: 'https://github.com/loxleyftsck/MicroLLM-PrivateStack',
    image: {
      src: '/projects/microllm-arch.jpg',
      alt: 'Architecture diagram: API layer with JWT auth and OWASP ASVS L2 validation, splitting into a Redis semantic cache and the inference engine, then post-processing and audit logging',
    },
  },
  {
    id: 'indogovrag',
    title: 'IndoGovRAG',
    description:
      'Retrieval over Indonesian government documents, which are long, formally structured, and break naive chunkers. Custom chunking tuned to that structure, FAISS search, FastAPI on top.',
    tech: ['Python', 'LangChain', 'FAISS', 'FastAPI', 'Docker'],
    category: ['rag'],
    github: 'https://github.com/loxleyftsck/IndoGovRAG',
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
      'Next-day trend prediction on Indonesian exchange data, built mostly as an excuse to do the MLOps properly: DVC-versioned data, MLflow runs, and a GitHub Actions job that retrains weekly without me.',
    tech: ['Python', 'DVC', 'MLflow', 'GitHub Actions', 'Docker'],
    result: 'Automated weekly retraining pipeline, fully reproducible runs',
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
    result: 'Cleaned ~7.5 GB of raw MTA data; beats naive baseline',
    category: ['ml'],
    github: 'https://github.com/loxleyftsck/transit-demand-forecasting',
    demo: 'https://transit-demand-forecasting-portfoli.vercel.app',
    image: {
      src: '/projects/transit-pred.jpg',
      alt: 'Test-set plot for Times Sq-42 St: actual hourly entries against tuned LightGBM predictions and a last-week naive baseline, March to May 2024',
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
      'Context-aware DTN routing in Java on THE ONE simulator became the thread I pulled hardest. Alongside it: first ML notebooks, LSTM tuning, and a Solidity staking contract on BNB testnet out of curiosity. 13 repos.',
  },
  {
    year: '2026',
    title: 'AI systems',
    description:
      'Shifted from experiments to systems that hold together, RAG pipelines, multi-agent negotiation, MLOps with DVC and MLflow, a Go network scanner. 14 repos, and the habit of finishing them.',
  },
];

// ─── SOCIAL / CONTACT ────────────────────────────────────────────────────────
export const social = {
  github: 'https://github.com/loxleyftsck',
  linkedin: 'https://www.linkedin.com/in/herald-michain-samuel-theo-ginting-9b70762a3/',
  email: 'heraldmsamueltheo@gmail.com',
};

// ─── STATS ───────────────────────────────────────────────────────────────────
// Verified against the GitHub API, 30 July 2026. Update alongside the profile.
export const stats = [
  { val: '28', label: 'Public repositories' },
  { val: '7', label: 'Languages shipped in' },
  { val: '2022', label: 'First commit' },
];

export const meta = {
  name: 'Herald Ginting',
  fullName: 'Herald Michain Samuel Theo Ginting',
  title: 'AI Engineer',
  tagline:
    'I build retrieval and multi-agent systems, and the MLOps plumbing that keeps them reproducible. Everything here is open source.',
  location: 'Jakarta, Indonesia',
  available: true,
};
