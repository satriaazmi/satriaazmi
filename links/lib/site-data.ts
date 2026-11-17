export interface ProfileLink {
  id: 'github' | 'linkedin' | 'email';
  title: string;
  subtitle: string;
  handle: string;
  url: string;
  external: boolean;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  year?: string;
  context?: string;
  /** Home-screen capture of the live dashboard, served from /public. */
  screenshot?: string;
  tags?: string[];
  url: string;
  repoUrl?: string;
  repoNote?: string;
}

export const OWNER_PROFILE = {
  name: "Satria Musthofa 'Azmi",
  role: 'Statistics Undergraduate, Universitas Diponegoro',
  gpa: 'GPA 3.98 / 4.00',
  focus: 'Machine Learning · Statistical Modeling · Interactive Dashboards',
  position:
    'I build forecasting, simulation, and optimization models, then ship them as interactive web dashboards.',
  location: 'Demak, Central Java, Indonesia',
  locationShort: 'Demak, Central Java',
  email: 'azmipro93@gmail.com',
  /** Transparent cutout, 274 x 377. */
  photoSrc: '/profile.webp',
};

export const PROFILE_LINKS: ProfileLink[] = [
  {
    id: 'github',
    title: 'GitHub',
    subtitle: 'Code & Repositories',
    handle: 'github.com/satriaazmi',
    url: 'https://github.com/satriaazmi',
    external: true,
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    subtitle: 'Professional Profile',
    handle: 'linkedin.com/in/satriaazmi',
    url: 'https://www.linkedin.com/in/satriaazmi/',
    external: true,
  },
  {
    id: 'email',
    title: 'Email',
    subtitle: 'Direct Contact',
    handle: 'azmipro93@gmail.com',
    url: 'mailto:azmipro93@gmail.com',
    external: false,
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'panenvision',
    title: 'PANENVISION',
    subtitle: 'Food Security Command Center',
    description:
      'Central Java needs to see regional food supply and demand imbalances early. A forecasting ensemble (MASE 0.312) feeds MILP distribution optimisation that plans commodity flows to cut transport costs.',
    year: '2026',
    context: 'Satria Data SEC',
    tags: ['Time-Series Forecasting', 'MILP Optimization'],
    url: 'https://panenvision-jateng.vercel.app/',
    screenshot: '/projects/panenvision.webp',
    repoNote: 'Private repo: github.com/satriaazmi/panenvision',
  },
  {
    id: 'roots-to-clarity',
    title: 'Roots to Clarity',
    subtitle: 'Air Quality & Health Intelligence',
    description:
      'Air pollution and wildfire smoke put population health at risk. Spatial analytics and epidemiological models drive a health impact dashboard across 27 monitoring stations and 27 hospitals.',
    context: 'Gelar Rasa 2026, team project',
    tags: ['Spatial Analytics', 'Gelar Rasa 2026'],
    url: 'https://roots-to-clarity.vercel.app/',
    screenshot: '/projects/roots-to-clarity.webp',
  },
  {
    id: 'ucl-simulation',
    title: 'UEFA Champions League Simulation',
    subtitle: 'Monte Carlo & Poisson GLM Dashboard',
    description:
      'Estimates club progression probabilities for the Swiss-format 2026/27 tournament. A Poisson GLM on 2,867 UEFA matches drives 50,000 Monte Carlo tournament replications and a real-time What-If bracket simulation.',
    year: '2026',
    tags: ['Poisson GLM', '50k Monte Carlo'],
    url: 'https://ucl-simulation-dashboard.vercel.app/',
    screenshot: '/projects/ucl-simulation.webp',
    repoUrl: 'https://github.com/satriaazmi/ucl-simulation-dashboard',
  },
  {
    id: 'riceflow',
    title: 'RICEFLOW',
    subtitle: 'Rice Supply Chain Decision Support',
    description:
      'Diagnoses where rice supply chain efficiency drops across West Java regencies. Network DEA with Simar-Wilson correction scores each stage, and SHAP interpretability explains the bottlenecks.',
    context: 'FIT Competition 2026',
    tags: ['Network DEA', 'Simar-Wilson & SHAP'],
    url: 'https://riceflowdek-uetc.vercel.app/',
    screenshot: '/projects/riceflow.webp',
  },
];
