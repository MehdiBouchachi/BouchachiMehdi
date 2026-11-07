'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight,Menu,X,Sun,Moon} from 'lucide-react';
import {site} from '@/data/site';
import Button from './ui/Button';
export default function Navigation(){
 const [menu,setMenu]=useState(false);
 const [theme,setTheme]=useState<'dark'|'light'>('dark');
 const [scrolled,setScrolled]=useState(false);
 const [hidden,setHidden]=useState(false);
 const [active,setActive]=useState('');
 const [progress,setProgress]=useState(0);
 const lastScroll=useRef(0);
 useEffect(()=>{
   const saved=localStorage.getItem('portfolio-theme');if(saved==='light'){setTheme('light');document.documentElement.dataset.theme='light'}
 },[]);
 useEffect(()=>{
   if(!menu) return;
   const onKeyDown=(event:KeyboardEvent)=>{if(event.key==='Escape') setMenu(false)};
   window.addEventListener('keydown',onKeyDown);
   return()=>window.removeEventListener('keydown',onKeyDown);
 },[menu]);
 useEffect(()=>{
   let frame=0;
   const update=()=>{
     const current=Math.max(0,window.scrollY);
     const difference=current-lastScroll.current;
     setScrolled(current>30);
     const maxScroll=document.documentElement.scrollHeight-window.innerHeight;
     setProgress(maxScroll>0?Math.min(100,current/maxScroll*100):0);
     const currentSection=['work','about','recognition','gallery'].reduce((found,id)=>{
       const section=document.getElementById(id);
       return section&&section.getBoundingClientRect().top<=window.innerHeight*.38?id:found;
     },'');
     const contact=document.getElementById('contact');
     setActive(contact&&contact.getBoundingClientRect().top<=window.innerHeight*.38?'':currentSection);
     if(current<120||menu) setHidden(false);
     else if(difference>6) setHidden(true);
     else if(difference< -6) setHidden(false);
     lastScroll.current=current;
     frame=0;
   };
   const onScroll=()=>{if(!frame) frame=requestAnimationFrame(update)};
   lastScroll.current=window.scrollY;update();window.addEventListener('scroll',onScroll,{passive:true});
   return()=>{window.removeEventListener('scroll',onScroll);if(frame) cancelAnimationFrame(frame)};
 },[menu]);
 function toggle(){const t=theme==='dark'?'light':'dark';setTheme(t);document.documentElement.dataset.theme=t;localStorage.setItem('portfolio-theme',t)}
 return <header className={`site-header ${scrolled?'scrolled':''} ${hidden?'is-hidden':''}`} onFocusCapture={()=>setHidden(false)}>
  <div className="header-inner wrap">
    <Link href="/#home" className="brand" aria-label="Mehdi Bouchachi, homepage" onClick={()=>setMenu(false)}>
      <img className="brand-dark" src="/brand/logo-light.svg" alt="Mehdi Bouchachi"/>
      <img className="brand-light" src="/brand/logo-dark.svg" alt="" aria-hidden="true"/>
    </Link>
    <div className={`nav-backdrop ${menu?'is-open':''}`} onClick={()=>setMenu(false)} aria-hidden="true"/>
    <nav className={`main-nav ${menu?'is-open':''}`} aria-label="Main navigation">
      {[['Work','/#work','work'],['About','/#about','about'],['Recognition','/#recognition','recognition'],['Gallery','/#gallery','gallery']].map(([name,href,id])=><Link href={href} key={name} aria-current={active===id?'location':undefined} onClick={()=>setMenu(false)}>{name}</Link>)}
      <a className="mobile-nav-contact" href={`mailto:${site.email}`} onClick={()=>setMenu(false)}>Let’s talk <ArrowUpRight size={18}/></a>
    </nav>
    <div className="header-actions"><Button variant="icon" className="theme-button" onClick={toggle} aria-label={theme==='dark'?'Switch to light mode':'Switch to dark mode'} title="Change theme">{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</Button><Button variant="solid" className="header-contact" href={`mailto:${site.email}`}>Let’s talk <ArrowUpRight size={16}/></Button><Button variant="icon" className="menu-button" aria-label={menu?'Close menu':'Open menu'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X size={22}/>:<Menu size={22}/>}</Button></div>
  </div>
  <span className="header-progress" style={{width:`${progress}%`}} aria-hidden="true"/>
 </header>
}
