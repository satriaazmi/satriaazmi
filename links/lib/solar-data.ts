export type BodyKind = 'profile' | 'project';

export interface SolarBody {
  id: string;
  kind: BodyKind;
  planetName: string;
  orbitRing: 1 | 2 | 3;
  startAngleDeg: number;
  sizePx: number;
  hasRing?: boolean;
  orbitCode: string;
  title: string;
  subtitle: string;
  handle?: string;
  description?: string;
  tags?: string[];
  url: string;
  repoUrl?: string;
  repoNote?: string;
  external: boolean;
  accentHex: string;
  sphereGradient: string;
  glowColor: string;
}

export const OWNER_PROFILE = {
  name: "Satria Musthofa 'Azmi",
  upperName: "SATRIA MUSTHOFA 'AZMI",
  role: 'Statistics Undergraduate, Universitas Diponegoro',
  gpa: 'GPA 3.98 / 4.00',
  focus: 'Machine Learning · Statistical Modeling · Interactive Dashboards',
  location: 'Demak, Central Java, Indonesia',
  email: 'azmipro93@gmail.com',
  photoSrc: '/foto.jpg',
};

export const PROFILE_ORBITS: SolarBody[] = [
  {
    id: 'github',
    kind: 'profile',
    planetName: 'Mercury',
    orbitRing: 1,
    startAngleDeg: 210,
    sizePx: 14,
    orbitCode: 'IN-01',
    title: 'GitHub',
    subtitle: 'Code & Repositories',
    handle: 'github.com/satriaazmi',
    url: 'https://github.com/satriaazmi',
    external: true,
    accentHex: '#cbd5e1',
    sphereGradient:
      'radial-gradient(circle at 32% 30%, #f1f5f9 0%, #94a3b8 58%, #334155 100%)',
    glowColor: 'rgba(203, 213, 225, 0.45)',
  },
  {
    id: 'linkedin',
    kind: 'profile',
    planetName: 'Venus',
    orbitRing: 1,
    startAngleDeg: 330,
    sizePx: 16,
    orbitCode: 'IN-02',
    title: 'LinkedIn',
    subtitle: 'Professional Profile',
    handle: 'linkedin.com/in/satriaazmi',
    url: 'https://www.linkedin.com/in/satriaazmi/',
    external: true,
    accentHex: '#fbbf24',
    sphereGradient:
      'radial-gradient(circle at 32% 30%, #fef08a 0%, #f59e0b 58%, #92400e 100%)',
    glowColor: 'rgba(251, 191, 36, 0.45)',
  },
  {
    id: 'email',
    kind: 'profile',
    planetName: 'Mars',
    orbitRing: 1,
    startAngleDeg: 90,
    sizePx: 15,
    orbitCode: 'IN-03',
    title: 'Email',
    subtitle: 'Direct Contact',
    handle: 'azmipro93@gmail.com',
    url: 'mailto:azmipro93@gmail.com',
    external: false,
    accentHex: '#fb7185',
    sphereGradient:
      'radial-gradient(circle at 32% 30%, #fda4af 0%, #e11d48 58%, #881337 100%)',
    glowColor: 'rgba(251, 113, 133, 0.45)',
  },
];

export const PROJECT_ORBITS: SolarBody[] = [
  {
    id: 'panenvision',
    kind: 'project',
    planetName: 'Jupiter',
    orbitRing: 2,
    startAngleDeg: 35,
    sizePx: 22,
    orbitCode: 'ORBIT 01',
    title: 'PANENVISION',
    subtitle: 'Food Security Command Center',
    description:
      'Forecasting ensemble (MASE 0.312) and MILP distribution optimisation for Central Java.',
    tags: ['Time-Series Forecasting', 'MILP Optimization'],
    url: 'https://panenvision-jateng.vercel.app/',
    repoNote: 'Private repo: github.com/satriaazmi/panenvision',
    external: true,
    accentHex: '#f59e0b',
    sphereGradient:
      'radial-gradient(circle at 30% 28%, #fde68a 0%, #d97706 55%, #78350f 100%)',
    glowColor: 'rgba(245, 158, 11, 0.42)',
  },
  {
    id: 'roots-to-clarity',
    kind: 'project',
    planetName: 'Earth',
    orbitRing: 2,
    startAngleDeg: 215,
    sizePx: 19,
    orbitCode: 'ORBIT 02',
    title: 'Roots to Clarity',
    subtitle: 'Air Quality & Health Intelligence',
    description:
      'Air pollution and health impact dashboard across 27 monitoring stations and 27 hospitals (Gelar Rasa 2026, team project).',
    tags: ['Spatial Analytics', 'Gelar Rasa 2026'],
    url: 'https://roots-to-clarity.vercel.app/',
    external: true,
    accentHex: '#2dd4bf',
    sphereGradient:
      'radial-gradient(circle at 30% 28%, #99f6e4 0%, #0d9488 55%, #115e59 100%)',
    glowColor: 'rgba(45, 212, 191, 0.42)',
  },
  {
    id: 'ucl-simulation',
    kind: 'project',
    planetName: 'Neptune',
    orbitRing: 3,
    startAngleDeg: 135,
    sizePx: 20,
    orbitCode: 'ORBIT 03',
    title: 'UEFA Champions League Simulation',
    subtitle: 'Monte Carlo & Poisson GLM Dashboard',
    description:
      'Poisson GLM on 2,867 UEFA matches with 50,000 Monte Carlo tournament replications and real-time What-If bracket simulation.',
    tags: ['Poisson GLM', '50k Monte Carlo'],
    url: 'https://ucl-simulation-dashboard.vercel.app/',
    repoUrl: 'https://github.com/satriaazmi/ucl-simulation-dashboard',
    external: true,
    accentHex: '#38bdf8',
    sphereGradient:
      'radial-gradient(circle at 30% 28%, #bae6fd 0%, #0284c7 55%, #0c4a6e 100%)',
    glowColor: 'rgba(56, 189, 248, 0.45)',
  },
  {
    id: 'riceflow',
    kind: 'project',
    planetName: 'Saturn',
    orbitRing: 3,
    startAngleDeg: 315,
    sizePx: 20,
    hasRing: true,
    orbitCode: 'ORBIT 04',
    title: 'RICEFLOW',
    subtitle: 'Rice Supply Chain Decision Support',
    description:
      'Network DEA efficiency analysis with Simar-Wilson correction and SHAP interpretability for West Java.',
    tags: ['Network DEA', 'Simar-Wilson & SHAP'],
    url: 'https://riceflowdek-uetc.vercel.app/',
    external: true,
    accentHex: '#eab308',
    sphereGradient:
      'radial-gradient(circle at 30% 28%, #fef08a 0%, #ca8a04 58%, #713f12 100%)',
    glowColor: 'rgba(234, 179, 8, 0.42)',
  },
];

export const ALL_SOLAR_BODIES: SolarBody[] = [...PROFILE_ORBITS, ...PROJECT_ORBITS];
