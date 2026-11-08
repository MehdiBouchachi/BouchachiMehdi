'use client';
import {useCallback,useMemo,useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight,ArrowDownRight,ArrowRight,Mail,MoveUpRight,Download,ExternalLink,Plus,Code2,Globe2,Layers3,TerminalSquare,Wifi,Medal,Camera,ArrowDown} from 'lucide-react';
import Navigation from './Navigation';
import Reveal from './Reveal';
import Lightbox,{type LightboxItem} from './Lightbox';
import {ProjectArt} from './ProjectArt';
import SkillArtwork from './SkillArtwork';
import AwardRank from './AwardRank';
import ContactArtwork from './ContactArtwork';
import CertificateArtwork from './CertificateArtwork';
import AboutArtwork from './AboutArtwork';
import ArchitectureArtwork from './ArchitectureArtwork';
import Heading from './ui/Heading';
import Text from './ui/Text';
import Button from './ui/Button';
import {site,projects,milestones,certificates,gallery,type ProjectCategory} from '@/data/site';

type Category='all'|ProjectCategory;
const filters:{key:Category;label:string}[]=[{key:'all',label:'All work'},{key:'platform',label:'Platforms'},{key:'community',label:'Community'},{key:'iot',label:'IoT & systems'}];
const skillGroups=[
 {name:'Front-end & Experience',icon:Layers3,skills:['Next.js','React','TypeScript','JavaScript','GSAP','CSS / Tailwind']},
 {name:'Back-end & Data',icon:TerminalSquare,skills:['Node.js','NestJS','REST APIs','PostgreSQL','Supabase','MySQL']},
 {name:'Systems & Delivery',icon:Wifi,skills:['Nginx','Docker','Git / GitHub','Windows Server','MQTT','ESP32 / Raspberry Pi']},
];
export default function Portfolio(){
 const [category,setCategory]=useState<Category>('all');
 const [lightbox,setLightbox]=useState<{items:LightboxItem[];index:number}|null>(null);
 const works=useMemo(()=>category==='all'?projects:projects.filter(p=>p.category===category),[category]);
 const close=useCallback(()=>setLightbox(null),[]);
 const change=useCallback((index:number)=>setLightbox(cur=>cur?{...cur,index}:null),[]);
 const galleryItems=gallery.map(g=>({src:g.src,title:g.title,subtitle:g.tag}));
 const certificateItems=certificates.map(c=>({src:c.path,title:c.title,subtitle:c.subtitle}));
 return <>
   <Navigation/><Reveal/>
   <main>
     <section className="hero" id="home" aria-labelledby="hero-heading">
      <div className="hero-grid" aria-hidden="true"/>
      <div className="wrap hero-layout">
       <div className="hero-copy">
        <div className="hero-eyebrow hero-anim">Based in Blida, Algeria</div>
        <div className="hero-heading-wrap"><Text variant="lead" className="hero-preface hero-anim">Hello, I'm Mehdi. I turn</Text><Heading level={1} variant="hero" id="hero-heading" className="hero-heading"><span className="hero-heading-main">complexity</span><span className="hero-heading-accent">into <em>clarity.</em></span></Heading></div>
        <Text className="hero-lead hero-anim">I build useful digital products, thoughtful interfaces, and connected systems that make difficult ideas feel simple.</Text>
        <div className="hero-actions hero-anim"><Button variant="solid" className="hero-primary" href="#work">Explore my work <ArrowUpRight size={18}/></Button><Button variant="text" className="hero-secondary" href="#about">More about me <ArrowRight size={17}/></Button></div>
        <div className="hero-meta hero-anim"><span>01 / INTRODUCTION</span><span>FULL-STACK / DESIGN / IOT</span></div>
       </div>
       <div className="hero-visual hero-anim"><div className="hero-photo-frame"><img src="/media/photos/portrait-main.webp" alt="Mehdi Bouchachi in a black sweater and glasses" fetchPriority="high"/></div><div className="hero-image-foot"><span>FIG. 01 / MEHDI BOUCHACHI</span><span>SOFTWARE ENGINEER</span></div></div>
      </div>
     </section>
     <div className="ticker" aria-label="Skills and focus"><div className="ticker-run" aria-hidden="true">{Array.from({length:2},(_,i)=><span key={i}>FULL-STACK DEVELOPMENT <i aria-hidden="true"/> CREATIVE ENGINEERING <i aria-hidden="true"/> IOT SYSTEMS <i aria-hidden="true"/> DESIGN THAT WORKS <i aria-hidden="true"/> </span>)}</div></div>

     <ArchitectureArtwork/>

     <section id="work" className="work-section section-pad">
      <div className="wrap">
       <div className="section-overline" data-reveal><span className="section-index">01 / SELECTED WORK</span><span className="section-marker">THE THINGS I’VE BUILT</span></div>
       <div className="section-heading-row" data-reveal><Heading level={2} variant="section" className="section-title">A few things<br/><em>I’ve made.</em></Heading><Text variant="intro" className="section-intro">From brand experiences to real-world systems. Different challenges, one approach: make every detail count.</Text></div>
       <div className="filter-bar" role="group" aria-label="Filter projects" data-reveal>{filters.map(f=><Button variant="filter" key={f.key} onClick={()=>setCategory(f.key)} className="filter" active={category===f.key} aria-pressed={category===f.key}>{f.label}{category===f.key&&<span className="filter-count">{String(works.length).padStart(2,'0')}</span>}</Button>)}</div>
       <div className="projects-grid">{works.map((p,idx)=><Link href={`/work/${p.slug}/`} key={p.slug} className={`project-card ${idx===0&&category==='all'?'featured':''}`} data-reveal style={{'--art-accent':p.accent} as React.CSSProperties}>
          <div className="project-cover"><ProjectArt type={p.art} image={p.image} title={p.title}/><div className="project-hover-arrow"><ArrowUpRight size={24}/></div></div>
          <div className="project-meta"><span>{p.number} / {p.categoryLabel}</span><span>{p.year}</span></div>
          <div className="project-details"><div><Heading level={3} variant="card">{p.title}</Heading><Text>{p.lead}</Text></div><ArrowUpRight size={25}/></div>
         </Link>)}</div>
        <div className="work-end" data-reveal><span>EVERY PROJECT HAS A STORY.</span><a href={site.github} target="_blank" rel="noopener noreferrer" className="inline-link">More on GitHub <ArrowUpRight size={18}/></a></div>
      </div>
     </section>

     <section id="about" className="about-section section-pad">
       <div className="wrap about-layout">
         <div className="about-visual" data-reveal><div className="about-portrait"><img src="/media/photos/portrait-outdoors.webp" alt="Mehdi standing outdoors in a black sweater" loading="lazy" data-parallax/></div><div className="about-image-note"><span>FIG. 02 / MEHDI BOUCHACHI</span><span>BLIDA, ALGERIA</span></div><AboutArtwork/></div>
         <div className="about-copy"><div className="section-overline" data-reveal><span className="section-index">02 / ABOUT ME</span><span className="section-marker">BEYOND THE CODE</span></div><Heading level={2} variant="section" className="section-title about-title" data-reveal>Engineer by trade.<br/><em>Builder at heart.</em></Heading>
          <Text variant="lead" className="about-lead" data-reveal>I'm Mehdi, a software engineer drawn to the space where thoughtful design meets practical engineering.</Text>
          <Text className="about-body" data-reveal>I am pursuing a <strong>Master 2 in Software Engineering</strong> at the University of Blida 1. My work spans full-stack products, interface design, and IoT-connected systems, from client websites to offline-first prototypes.</Text>
          <Text className="about-body" data-reveal>Outside the editor, I mentor developers and coach programming events. Sharing what I learn is part of how I build.</Text>
          <div className="about-signature" data-reveal><span>THE PRINCIPLE</span><blockquote>“Make it useful.<br/>Make it memorable.”</blockquote></div>
          <div className="about-actions" data-reveal><Button variant="solid" className="button-solid" href={site.cv} download><Download size={17}/> Download my CV <ArrowUpRight size={17}/></Button><span>OPEN TO MEANINGFUL PROJECTS</span></div>
         </div>
       </div>
     </section>

     <section className="skills-section section-pad">
       <div className="wrap"><div className="section-overline" data-reveal><span className="section-index">03 / THE TOOLKIT</span><span className="section-marker">HOW I WORK</span></div><div className="section-heading-row" data-reveal><Heading level={2} variant="section" className="section-title">The craft<br/><em>behind the work.</em></Heading><Text variant="intro" className="section-intro">Comfortable moving between interface detail, system architecture, and the infrastructure that keeps products running.</Text></div>
       <SkillArtwork/>
       <div className="skills-grid">{skillGroups.map(({name,icon:Icon,skills},i)=><article className="skill-card" key={name} data-reveal><div className="skill-card-top"><Icon size={28} strokeWidth={1.4}/><span>0{i+1}</span></div><Heading level={3} variant="card">{name}</Heading><div className="skill-chips">{skills.map(skill=><span key={skill}>{skill}</span>)}</div></article>)}</div>
       <div className="infra-note" data-reveal><span className="infra-icon"><Globe2 size={22}/></span><Text><strong>Beyond localhost:</strong> deployed a live Next.js application on Windows Server 2012 behind Nginx, with automatic process recovery after crashes and power restoration.</Text><span>REAL WORLD / REAL SERVERS</span></div>
       </div>
     </section>

     <section id="recognition" className="recognition-section section-pad">
       <div className="wrap"><div className="section-overline" data-reveal><span className="section-index">04 / HIGHLIGHTS</span><span className="section-marker">MILESTONES THAT MATTER</span></div>
       <div className="recognition-top" data-reveal><div><Text variant="overline" className="eyebrow-blue">A PROUD MOMENT</Text><Heading level={2} variant="section" className="section-title">The work<br/><em>speaks louder.</em></Heading></div><div className="award-number"><AwardRank/><Text variant="caption">PLACE / HUAWEI AI HACKATHON 2026<br/>AGRITECH & ENVIRONMENTAL PROTECTION</Text></div></div>
       <div className="featured-award" data-reveal><Button variant="bare" className="featured-award-image image-button" onClick={()=>setLightbox({items:[{src:'/media/photos/huawei-stage.webp',title:'Huawei AI Hackathon 2026: Second place',subtitle:'Team ITC Randoms'}],index:0})} aria-label="View Huawei hackathon photo"><img src="/media/photos/huawei-stage.webp" alt="Team ITC Randoms receiving the Huawei second-place award" loading="lazy"/><span className="zoom-corner"><Plus size={22}/></span></Button><div className="featured-award-copy"><div className="featured-award-label"><Medal size={22}/> ACHIEVEMENT / 2026</div><Heading level={3} variant="feature">Second place.<br/><em>First-class memories.</em></Heading><Text variant="small" className="award-context-mobile">Huawei AI Hackathon 2026<br/>Agritech &amp; Environmental Protection</Text><Text>With team ITC Randoms, earned second place in the Agritech & Environmental Protection category at the Huawei AI Hackathon 2026.</Text><div className="award-foot"><span>HUAWEI AI HACKATHON</span><span>TEAM ITC RANDOMS</span></div></div></div>
       <div className="milestone-list">{milestones.map((m,i)=><div className="milestone" key={m.title} data-reveal><span className="milestone-n">0{i+1}</span><div><strong>{m.title}</strong><span>{m.subtitle}</span></div><span className="milestone-year">{m.year}</span><ArrowUpRight size={18}/></div>)}</div>
       </div>
     </section>

     <section className="cert-section section-pad" id="certificates"><div className="wrap"><div className="section-overline" data-reveal><span className="section-index">05 / CERTIFICATIONS</span><span className="section-marker">A PAPER TRAIL OF DOING</span></div><div className="section-heading-row cert-heading-row" data-reveal><div className="cert-heading-copy"><Heading level={2} variant="section" className="section-title">Proof of<br/><em>showing up.</em></Heading><Text variant="intro" className="section-intro">A collection of certificates and recognitions from hackathons, community events, and university contributions. Tap to view in detail.</Text></div><CertificateArtwork/></div>
      <div className="cert-grid">{certificates.map((c,i)=><Button variant="bare" key={c.id} className="cert-card" onClick={()=>setLightbox({items:certificateItems,index:i})} data-reveal><div className="cert-picture"><img src={c.path} alt={`${c.title} certificate`} loading="lazy"/><div className="cert-zoom"><Plus size={21}/></div></div><div className="cert-description"><span>{String(i+1).padStart(2,'0')} / CERTIFICATE</span><strong>{c.title}</strong><small>{c.subtitle}</small></div></Button>)}</div>
      </div></section>

     <section id="gallery" className="gallery-section section-pad"><div className="wrap"><div className="section-overline" data-reveal><span className="section-index">06 / MOMENTS</span><span className="section-marker">NOT EVERYTHING HAPPENS BEHIND A SCREEN</span></div><div className="section-heading-row" data-reveal><Heading level={2} variant="section" className="section-title">People. Places.<br/><em>Progress.</em></Heading><Text variant="intro" className="section-intro">A few frames from the journey. Competitions, collaborations, communities, and the people who make it worthwhile.</Text></div><div className="gallery-grid">{gallery.map((g,i)=><Button variant="bare" className={`gallery-item gallery-item-${i}`} key={g.src} data-reveal onClick={()=>setLightbox({items:galleryItems,index:i})}><img src={g.src} alt={g.title} loading="lazy"/><span className="gallery-overlay"><span><strong>{g.title}</strong><small>{g.tag}</small></span><Plus size={22}/></span></Button>)}</div></div></section>

     <section className="contact-section" id="contact"><div className="wrap contact-wrap">
       <div className="section-overline" data-reveal><span className="section-index">07 / CONTACT</span><span className="section-marker">A CONVERSATION STARTS HERE</span></div>
       <div className="contact-main"><div className="contact-copy"><Text className="contact-prelude" data-reveal>Have something in mind?</Text><Heading level={2} variant="section" className="contact-headline" data-reveal>Let's build<br/><em>something useful.</em></Heading></div>
        <div className="contact-panel" data-reveal><span className="contact-panel-label">NEW PROJECT / QUESTION / HELLO</span><Text>Tell me what you're working on and where you need a hand.</Text><Button variant="inverse" className="contact-action" href={`mailto:${site.email}`}>Start a conversation <ArrowUpRight size={20}/></Button></div></div>
       <ContactArtwork/>
       <div className="contact-bottom" data-reveal><a href={`mailto:${site.email}`}><Mail size={19}/>{site.email}<ArrowUpRight size={16}/></a><div><span>BLIDA, ALGERIA</span><span className="contact-bottom-divider"/><span>WORKING EVERYWHERE</span></div><a className="contact-github" href={site.github} target="_blank" rel="noopener noreferrer">GITHUB <ArrowUpRight size={16}/></a></div>
      </div></section>
   </main>
   <footer className="site-footer"><div className="wrap footer-inner"><div className="footer-brand"><img className="brand-dark" src="/brand/logo-light.svg" alt="Mehdi Bouchachi"/><img className="brand-light" src="/brand/logo-dark.svg" alt=""/></div><span>BUILT WITH INTENTION · © {new Date().getFullYear()}</span><div><a href={site.github} target="_blank" rel="noopener noreferrer">GITHUB <ArrowUpRight size={14}/></a><a href={site.cv} download>RESUME <ArrowUpRight size={14}/></a><a href="#home">BACK TO TOP ↑</a></div></div></footer>
   <Lightbox items={lightbox?.items??galleryItems} index={lightbox?.index??null} onClose={close} onChange={change}/>
  </>
}

