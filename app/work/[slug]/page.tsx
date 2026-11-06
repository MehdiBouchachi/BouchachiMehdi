import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowLeft,ArrowUpRight,ArrowRight,ExternalLink,Mail} from 'lucide-react';
import {projects,site} from '@/data/site';
import {ProjectArt} from '@/components/ProjectArt';
import Navigation from '@/components/Navigation';
import Reveal from '@/components/Reveal';
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}))}
export function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{return params.then(({slug})=>{const p=projects.find(x=>x.slug===slug);return {title:p?`${p.title} | Case Study`:'Project',description:p?.description}})}
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const project=projects.find(p=>p.slug===slug); if(!project)notFound();
 const current=projects.findIndex(p=>p.slug===slug);const next=projects[(current+1)%projects.length];
 return <><Navigation/><Reveal/><main className="case-page">
   <section className="case-hero"><div className="wrap"><Link href="/#work" className="case-back"><ArrowLeft size={17}/> ALL PROJECTS</Link><div className="case-heading-row"><div><div className="case-kicker hero-anim">PROJECT / {project.number} · {project.categoryLabel.toUpperCase()}</div><h1 className="case-title hero-anim">{project.title}<span>.</span></h1><p className="case-lead hero-anim">{project.lead}</p></div><div className="case-hero-index hero-anim">{project.number}<span>/06</span></div></div><div className="case-artwork hero-anim" style={{'--art-accent':project.accent} as React.CSSProperties}><ProjectArt type={project.art} image={project.image} title={project.title}/></div></div></section>
   <section className="case-body section-pad"><div className="wrap"><div className="case-overview" data-reveal><span className="case-label">OVERVIEW</span><p>{project.description}</p></div><div className="case-columns"><aside className="case-sidebar" data-reveal><div><span className="case-label">YEAR</span><strong>{project.year}</strong></div><div><span className="case-label">CATEGORY</span><strong>{project.categoryLabel}</strong></div><div><span className="case-label">TECHNOLOGIES</span><div className="case-tags">{project.stack.map(tag=><span key={tag}>{tag}</span>)}</div></div>{project.links?.map(link=><a className="case-external" key={link.href} href={link.href} rel="noopener noreferrer" target="_blank">{link.label}<ArrowUpRight size={17}/></a>)}</aside>
    <div className="case-narrative"><div className="case-block" data-reveal><span className="case-block-n">01</span><div><h3>The challenge</h3><p>{project.detail.challenge}</p></div></div><div className="case-block" data-reveal><span className="case-block-n">02</span><div><h3>The approach</h3><p>{project.detail.approach}</p></div></div><div className="case-block" data-reveal><span className="case-block-n">03</span><div><h3>The outcome</h3><p>{project.detail.outcome}</p></div></div><div className="case-responsibilities" data-reveal><span className="case-label">MY CONTRIBUTIONS / FOCUS</span>{project.responsibilities.map((r,i)=><p key={r}><span>{String(i+1).padStart(2,'0')}</span>{r}</p>)}</div></div>
   </div></div></section>
   <section className="case-next"><Link href={`/work/${next.slug}/`} className="wrap case-next-inner"><div><span>UP NEXT / {next.number}</span><h2>{next.title}<ArrowUpRight size={40}/></h2></div><ArrowRight className="case-next-large" size={80} strokeWidth={1}/></Link></section>
   <div className="case-footer wrap"><a href={`mailto:${site.email}`}>LET’S COLLABORATE <Mail size={15}/></a><Link href="/#work">BACK TO ALL PROJECTS ↑</Link></div>
 </main></>
}
