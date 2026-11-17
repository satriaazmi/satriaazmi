// Content for the long-form sections. Source: LinkedIn profile export and
// the latest CV (Satria_Musthofa_Azmi_CV.pdf). Nothing here is estimated;
// a section whose list is empty is not rendered.

export interface LinkRef {
  label: string;
  url: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  org: string;
  start: string;
  end: string;
  current?: boolean;
  summary: string[];
  links?: LinkRef[];
}

export interface OrgRole {
  title: string;
  start: string;
  end: string;
  current?: boolean;
  summary: string;
}

export interface OrgGroup {
  id: string;
  name: string;
  place: string;
  span: string;
  roles: OrgRole[];
}

export interface VolunteerEntry {
  id: string;
  role: string;
  event: string;
  org?: string;
  cause?: string;
  start: string;
  end: string;
  summary: string[];
  featured?: boolean;
}

export interface AwardEntry {
  id: string;
  year: string;
  month?: string;
  title: string;
  issuer: string;
}

export interface EducationEntry {
  id: string;
  school: string;
  program: string;
  start: string;
  end: string;
  score: { value: string; scale: string; label: string };
  notes: string[];
}

export interface SkillItem {
  name: string;
  evidence: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  items: SkillItem[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'sc-scsi',
    role: 'Staff of Data Analysis',
    org: 'Statistics Center UNDIP (SC-SCSI)',
    start: 'Mar 2026',
    end: 'Present',
    current: true,
    summary: [
      'Provides statistical consulting and data processing for internal and external clients.',
      'Analyzes client datasets in R, Python, and SPSS and runs data quality checks on deliverables.',
    ],
  },
  {
    id: 'kemahasiswaan-intern',
    role: 'Intern',
    org: 'Directorate of Student and Alumni Affairs, Universitas Diponegoro',
    start: 'Jul 2026',
    end: 'Aug 2026',
    summary: [
      'Selected as 1 of 52 interns from 639 applicants.',
      'Supported large-scale operations for over 15,000 incoming students.',
    ],
  },
  {
    id: 'ta-nonparametric',
    role: 'Assistant Lecturer, Non-Parametric Statistics',
    org: 'Department of Statistics, Universitas Diponegoro',
    start: 'Jan 2026',
    end: 'Jun 2026',
    summary: [
      'Ran weekly guidance sessions for 50+ students on distribution-free tests: Mann-Whitney U, Wilcoxon Signed-Rank, and Kruskal-Wallis.',
    ],
    links: [
      {
        label: 'Practicum module on GitHub',
        url: 'https://github.com/satriaazmi/NonParametric-Statistics-Module',
      },
    ],
  },
  {
    id: 'ta-algorithms',
    role: 'Assistant Lecturer, Algorithms & Programming',
    org: 'Department of Statistics, Universitas Diponegoro',
    start: 'Sep 2025',
    end: 'Dec 2025',
    summary: [
      'Taught 40+ first-year students the basics of programming logic, data structures, and algorithms.',
    ],
    links: [
      {
        label: 'Practicum module on GitHub',
        url: 'https://github.com/satriaazmi/Algorithm-Programming-Lab',
      },
    ],
  },
];

export const ORGANIZATIONS: OrgGroup[] = [
  {
    id: 'bem-undip',
    name: 'BEM Universitas Diponegoro',
    place: 'Semarang',
    span: 'Sep 2024 – Present',
    roles: [
      {
        title: 'Secretary, Kesejahteraan Mahasiswa Department',
        start: 'Feb 2026',
        end: 'Present',
        current: true,
        summary:
          'Runs administrative and financial governance for a department focused on the academic and psychological well-being of over 50,000 students.',
      },
      {
        title: 'Staff, Secretariat Bureau',
        start: 'Jan 2025',
        end: 'Jan 2026',
        summary:
          "Built and scheduled BEM Undip's monthly Instagram calendar and handled administration for the Harmonisasi Kampus & Kesejahteraan Mahasiswa division.",
      },
      {
        title: 'Intern, Secretariat Bureau',
        start: 'Sep 2024',
        end: 'Dec 2024',
        summary:
          'Built the project management planner for the Sobat Laut social initiative and was named Best Intern of the Secretariat Bureau.',
      },
    ],
  },
  {
    id: 'osis-man2kudus',
    name: 'OSIS MAN 2 Kudus',
    place: 'Kudus',
    span: 'Oct 2021 – Sep 2023',
    roles: [
      {
        title: 'General Secretary',
        start: 'Oct 2022',
        end: 'Sep 2023',
        summary: 'Led the secretariat administration of OSIS MAN 2 Kudus as Head of Secretary.',
      },
      {
        title: 'Secretary 1',
        start: 'Oct 2021',
        end: 'Sep 2022',
        summary: 'Handled secretariat administration for OSIS MAN 2 Kudus.',
      },
    ],
  },
];

export const VOLUNTEER: VolunteerEntry[] = [
  {
    id: 'bakti-champions',
    role: 'Project Team Leader',
    event: 'Bakti Champions Movement',
    org: 'PT Bank Central Asia Tbk (BCA)',
    cause: 'Economic Empowerment',
    start: 'May 2026',
    end: 'Aug 2026',
    featured: true,
    summary: [
      'Led a 9-member student team on a community project for Tempe Sejahtera, a micro-business in Semarang.',
      'Ran field surveys and business diagnostics on branding, visibility, and payment systems.',
      'Delivered product diversification prototypes, a logo and banner, a Google Maps listing, and QRIS BCA integration via BCA Merchant.',
      'Unit economics and HPP calculations projected Rp6,000,000 in added monthly cash flow (13.3% revenue growth projection).',
    ],
  },
  {
    id: 'pilmapres',
    role: 'Secretary',
    event: 'PILMAPRES 2025',
    org: 'Universitas Diponegoro',
    start: 'Jul 2025',
    end: 'Oct 2025',
    summary: ['Drafted the project roadmap and timeline for running PILMAPRES 2025.'],
  },
  {
    id: 'ekspedisi-restorasi',
    role: 'Design & Decoration Staff',
    event: 'Ekspedisi Restorasi',
    org: 'BEM Universitas Diponegoro',
    cause: 'Environment',
    start: 'Jun 2025',
    end: 'Aug 2025',
    summary: ['Community service program to Karimun Jawa. Handled the grand launching and documentation.'],
  },
  {
    id: 'dokter-data',
    role: 'Competition Division Staff',
    event: 'Dokter Data 2025',
    org: 'Himasta Undip',
    start: 'May 2025',
    end: 'Sep 2025',
    summary: [
      'Ran the Data Analytics Olympiad (DAO): compiled the questions, worked with the judges, and hosted the final session.',
    ],
  },
  {
    id: 'statistics-back-to-society',
    role: 'Volunteer',
    event: 'Statistics Back to Society',
    org: 'Himasta Undip',
    start: 'May 2025',
    end: 'Oct 2025',
    summary: ['Secured IDR 2.5 million in funding from corporate partners and local businesses.'],
  },
  {
    id: 'sobat-laut',
    role: 'General Secretary',
    event: 'Sobat Laut Project, internship program',
    org: 'BEM Universitas Diponegoro',
    cause: 'Environment',
    start: 'Oct 2024',
    end: 'Present',
    summary: ['Managed MoUs, reports, letters, and the project management plan.'],
  },
  {
    id: 'mef',
    role: '1st Secretary',
    event: 'Mandaku Education Fair (MEF)',
    cause: 'Education',
    start: 'Oct 2024',
    end: 'Jan 2025',
    summary: ['Served as secretary for the MANDAKU Education Fair.'],
  },
  {
    id: 'dyresstica',
    role: '1st Secretary',
    event: 'Dyresstica',
    org: 'OSIS MAN 2 Kudus',
    cause: 'Education',
    start: 'Jul 2023',
    end: 'Sep 2023',
    summary: ['Managed event administration: proposals, letters, and MoUs.'],
  },
  {
    id: 'magnifesto',
    role: 'Design & Decoration Staff',
    event: 'MAGNIFESTO',
    org: 'OSIS MAN 2 Kudus',
    cause: 'Education',
    start: 'Sep 2022',
    end: 'Dec 2022',
    summary: ["Designed the event's Instagram feed."],
  },
];

export const AWARDS: AwardEntry[] = [
  {
    id: 'satria-data-bdc',
    year: '2026',
    title: 'Ranked 30th nationwide, Big Data Challenge',
    issuer: 'Satria Data 2026',
  },
  {
    id: 'best-young-staff',
    year: '2025',
    month: 'Dec',
    title: 'Best Young Staff 2025, Secretariat Bureau',
    issuer: 'BEM Universitas Diponegoro',
  },
  {
    id: 'bakti-bca',
    year: '2025',
    month: 'Nov',
    title: 'BaktiBCA Scholarship Awardee',
    issuer: 'BCA',
  },
  {
    id: 'best-intern',
    year: '2024',
    month: 'Dec',
    title: 'Best Participant, Internship Program in Secretariat Bureau',
    issuer: 'BEM Universitas Diponegoro',
  },
  {
    id: 'best-student',
    year: '2024',
    month: 'May',
    title: '2nd Best Student, Science Program',
    issuer: 'MAN 2 Kudus',
  },
  {
    id: 'osnk-2023',
    year: '2023',
    month: 'Jun',
    title: '2nd Place, OSN-K Informatics, Kudus Region',
    issuer: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi',
  },
  {
    id: 'osnk-2022',
    year: '2022',
    month: 'Jun',
    title: '2nd Place, OSN-K Informatics, Kudus Region',
    issuer: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi',
  },
];

export const EDUCATION: EducationEntry[] = [
  {
    id: 'undip',
    school: 'Universitas Diponegoro',
    program: 'B.S. in Statistics',
    start: 'Aug 2024',
    end: 'Aug 2028',
    score: { value: '3.98', scale: '/ 4.00', label: 'GPA, 88 credits' },
    notes: ['BaktiBCA Scholarship 2025 recipient.'],
  },
  {
    id: 'man2kudus',
    school: 'MAN 2 Kudus',
    program: 'Science and Mathematics',
    start: 'Jul 2021',
    end: 'Jun 2024',
    score: { value: '92.81', scale: '/ 100', label: 'Final grade' },
    notes: ['2nd Best Student, Science Program.'],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'modeling',
    title: 'Modeling & Statistics',
    items: [
      { name: 'Time-series forecasting', evidence: 'PANENVISION' },
      { name: 'Mixed-Integer Linear Programming (MILP)', evidence: 'PANENVISION' },
      { name: 'Poisson GLM', evidence: 'UCL Simulation' },
      { name: 'Monte Carlo simulation', evidence: 'UCL Simulation' },
      { name: 'Network DEA with Simar-Wilson correction', evidence: 'RICEFLOW' },
      { name: 'SHAP interpretability', evidence: 'RICEFLOW' },
      { name: 'Spatial analytics, epidemiological models', evidence: 'Roots to Clarity' },
      { name: 'Non-parametric tests', evidence: 'Teaching' },
    ],
  },
  {
    id: 'dashboards',
    title: 'Data & Dashboards',
    items: [
      { name: 'Interactive web dashboards', evidence: '4 projects above' },
      { name: 'Python scripts behind dashboards', evidence: 'PANENVISION' },
      { name: 'Statistical consulting and data processing', evidence: 'SC-SCSI' },
      { name: 'Data quality checks on client deliverables', evidence: 'SC-SCSI' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    items: [
      { name: 'Python', evidence: 'Projects, SC-SCSI' },
      { name: 'R', evidence: 'Teaching, SC-SCSI' },
      { name: 'SPSS', evidence: 'SC-SCSI' },
      { name: 'SciPy', evidence: 'PANENVISION' },
      { name: 'React, TypeScript, TailwindCSS', evidence: 'Projects' },
      { name: 'Git & GitHub', evidence: 'github.com/satriaazmi' },
    ],
  },
];
