/** Everything displayed in the portfolio can be edited here. */
export const site = {
  name: 'Bouchachi Mohamed Mehdi',
  firstName: 'Mehdi',
  title: 'Creative Software Engineer & Full-Stack Developer',
  shortTitle: 'Software engineer / Creative developer',
  location: 'Blida, Algeria',
  email: 'mehdibch.dev@gmail.com',
  phone: '+213 667 284 306',
  github: 'https://github.com/MehdiBouchachi',
  cv: '/resume/Bouchachi-Mohamed-Mehdi-CV.pdf',
  availability: 'Available for select collaborations',
  education: 'Master 2 · Software Engineering · University of Blida 1',
};

export type ProjectCategory = 'platform' | 'community' | 'iot';
export type ArtType = 'mattress' | 'community' | 'tournament' | 'aerolab' | 'healance' | 'imalex';
export type Project = {
  slug: string;
  number: string;
  title: string;
  short: string;
  category: ProjectCategory;
  categoryLabel: string;
  year: string;
  lead: string;
  description: string;
  responsibilities: string[];
  stack: string[];
  art: ArtType;
  image?: string;
  accent: string;
  links?: { label: string; href: string }[];
  detail: { challenge: string; approach: string; outcome: string };
};

export const projects: Project[] = [
  {
    slug:'empreinteflex',number:'01',title:'EmpreinteFlex',short:'A softer way to shop.',category:'platform',categoryLabel:'E-commerce / Brand Experience',year:'2025–2026',
    lead:'A considered digital storefront for a mattress brand.',
    description:'A responsive e-commerce experience focused on product discovery, visual consistency and a smoother journey from browsing to purchase.',
    responsibilities:['Front-end architecture and product interface','Next.js application development','Supabase integration and deployment workflow'],
    stack:['Next.js','React','Supabase','CSS','Deployment'],art:'mattress',image:'/projects/Empreinte_Flex.webp',accent:'#bcaec9',
    links:[{label:'Visit website',href:'https://empreinteflex.com'}],
    detail:{challenge:'Build an elegant product experience without sacrificing practical catalog and commerce workflows.',approach:'Focused on a consistent design system, responsive product browsing, API/data integration and maintainable component architecture.',outcome:'A production-oriented brand storefront, with deployment and infrastructure experience extending beyond the UI.'}
  },
  {
    slug:'itc-blida',number:'02',title:'ITC Blida',short:'A home for the community.',category:'community',categoryLabel:'Community / Web Platform',year:'2025–2026',
    lead:'Making a tech community feel as ambitious online as it does in person.',
    description:'The digital home for IT Community, designed around clearer navigation, strong visual identity, and an adaptable architecture for events and member experiences.',
    responsibilities:['Community website interfaces','Reusable components and responsive design','Collaboration and site delivery workflows'],
    stack:['Next.js','React','UI Architecture','Git'],art:'community',image:'/projects/ITC_Blida.webp',accent:'#8fbcfe',
    links:[{label:'Project repository',href:'https://github.com/MehdiBouchachi/itc-website'}],
    detail:{challenge:'Translate the energy of an active student technology community into a credible web presence.',approach:'Designed reusable page sections, responsive layouts and a cohesive visual approach around community information and activities.',outcome:'An extensible web experience and a shared foundation for future community initiatives.'}
  },
  {
    slug:'itcp',number:'03',title:'ITCP',short:'Code. Compete. Conquer.',category:'community',categoryLabel:'Competition / Product Design',year:'2025–2026',
    lead:'A platform built around the drama of competitive programming.',
    description:'A team-based tournament product concept with challenges, test cases, competition phases, submission workflows, standings and organizer controls.',
    responsibilities:['Tournament flows and product architecture','Participant and organizer journeys','Competition interface and systems planning'],
    stack:['Next.js','NestJS','PostgreSQL','System Design'],art:'tournament',image:'/projects/ITCP.webp',accent:'#e7a17d',
    detail:{challenge:'Organize a multi-stage competitive coding event with rules and interfaces that are understandable to participants and organizers.',approach:'Mapped actor permissions, challenge submissions, tournament phases, public and hidden tests, and admin-controlled transitions.',outcome:'A detailed product and systems blueprint designed to support a structured competitive programming experience.'}
  },
  {
    slug:'aerolab',number:'04',title:'AeroLab',short:'Where software meets the real world.',category:'iot',categoryLabel:'IoT / Connected Systems',year:'2025',
    lead:'Monitoring and control for automated aeroponic cultivation.',
    description:'A multi-tenant B2B platform linking dashboards, remote configuration and IoT devices. It is designed for reliability and offline operation.',
    responsibilities:['Web dashboard and access-control flows','IoT communication with MQTT / ESP-NOW','Failure and disconnected-operation scenarios'],
    stack:['React','MQTT','ESP32','Raspberry Pi','IoT'],art:'aerolab',accent:'#a7d8a6',
    detail:{challenge:'Make cultivation infrastructure observable and manageable even when connectivity is unreliable.',approach:'Designed the platform, permission model and device communication around local resilience, calibration and remote monitoring.',outcome:'An integrated direction for practical aeroponic automation combining hardware and software.'}
  },
  {
    slug:'healance',number:'05',title:'Healance',short:'Every second matters.',category:'iot',categoryLabel:'HealthTech / Hackathon',year:'2026',
    lead:'A smarter path from road accident to emergency response.',
    description:'Developed during SolveX 3.0, this collaborative concept combines a simulated IoT bracelet, accident alerts, location sharing, hospital response flows and emergency medical records.',
    responsibilities:['Platform and response workflow design','Wearable-to-software communication concept','Emergency dashboards and LDX medical record access'],
    stack:['IoT','React','MQTT','Emergency Systems','Figma'],art:'healance',image:'/projects/Healance.webp',accent:'#e8a5a2',
    links:[{label:'Team repository',href:'https://github.com/DanaAmine/iot-clinic'}],
    detail:{challenge:'Reduce avoidable delays between detecting a road accident and coordinating medical assistance.',approach:'Combined simulated sensor data and SOS workflows with location-aware hospital coordination, offline considerations and the LDX emergency patient record concept.',outcome:'A hackathon prototype and architecture exploring connected emergency response in the Algerian context.'}
  },
  {
    slug:'imalex',number:'06',title:'IMALEX',short:'Nature, backed by science.',category:'platform',categoryLabel:'Startup / R&D Website',year:'2026',
    lead:'A digital introduction to natural formulation and scientific R&D.',
    description:'The official website for IMALEX, an Algerian startup developing research-led natural formulations for cosmetics, nutraceuticals, biopesticides, animal nutrition and agri-food.',
    responsibilities:['Present the company vision and research approach','Explain formulation expertise and industry applications','Create a clear path for partners and collaborators to get in touch'],
    stack:['Next.js','React','Tailwind CSS','CSS Modules','Vercel'],art:'imalex',image:'/projects/IMALEX_portfolio_poster.webp',accent:'#9dbba5',
    links:[{label:'Project repository',href:'https://github.com/MehdiBouchachi/IMALEX'}],
    detail:{challenge:'Communicate scientific rigor and sustainability clearly across five distinct application areas.',approach:'Structure the site around the company vision, R&D capabilities, industry applications and partnership contact.',outcome:'A professional digital entry point for partners, clients and collaborators interested in IMALEX.'}
  }
];

export type Milestone = { year:string; type:'award'|'event'|'certificate'; title:string; subtitle:string; image?:string; detail:string };
export const milestones: Milestone[] = [
  {year:'2026',type:'award',title:'Huawei AI Hackathon · 2nd Place',subtitle:'ITC Randoms · Agritech & Environmental Protection',image:'/media/photos/huawei-stage.webp',detail:'Second-place team finish at the Huawei AI Hackathon 2026.'},
  {year:'2026',type:'event',title:'SolveX 3.0 Hackathon',subtitle:'Healance · road accident emergency response',detail:'Participated with an IoT-assisted emergency response platform concept.'},
  {year:'2024 & 2025',type:'event',title:'ITCP Coach',subtitle:'Competitive programming event',image:'/media/certificates/itcp-coach.webp',detail:'Coached participants across two editions of ITCP.'},
  {year:'2024–2025',type:'certificate',title:'ITC Tech Team Recognition',subtitle:'Infrastructure, clean code & incident response',image:'/media/certificates/tech-recognition.webp',detail:'Recognition for contributions to ITC programs and events.'},
  {year:'2026',type:'certificate',title:'University Workshop Contributions',subtitle:'Blida 1 University · web development & pedagogical AI',image:'/media/certificates/pedagogical-ai.webp',detail:'Participated in designing and deploying event and workshop websites.'},
];
export const certificates = [
  {id:'huawei-appreciation',title:'Huawei AI Hackathon',subtitle:'Appreciation certificate · March 2026',path:'/media/certificates/huawei-appreciation.webp'},
  {id:'tech-recognition',title:'ITC Tech Team',subtitle:'Certificate of recognition · 2024–2025',path:'/media/certificates/tech-recognition.webp'},
  {id:'itcp-coach',title:'ITCP Event Coach',subtitle:'Certificate of appreciation · December 2024',path:'/media/certificates/itcp-coach.webp'},
  {id:'pedagogical-ai',title:'Pedagogical AI Workshop',subtitle:'Website development · April 2026',path:'/media/certificates/pedagogical-ai.webp'},
  {id:'workshop-registration',title:'Distance Learning Workshop',subtitle:'Registration website · February 2026',path:'/media/certificates/workshop-registration.webp'},
];
export const gallery = [
  {src:'/media/photos/huawei-award.webp',title:'The moment of recognition',tag:'Huawei · 2026'},
  {src:'/media/photos/huawei-team-wide.webp',title:'ITC Randoms on stage',tag:'Hackathon · 2026'},
  {src:'/media/photos/university-pedagogy.webp',title:'University workshop contribution',tag:'Blida 1 · 2026'},
  {src:'/media/photos/recognition-ceremony.webp',title:'University recognition',tag:'Community · 2026'},
  {src:'/media/photos/community-photo.webp',title:'Working with people who build',tag:'Community'},
  {src:'/media/photos/ict-day.webp',title:'ICT Day 2026',tag:'Huawei / ITC'},
];
