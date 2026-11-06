'use client';
import {useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {MotionPathPlugin} from 'gsap/MotionPathPlugin';
export default function Reveal(){
 useEffect(()=>{
   if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
   gsap.registerPlugin(ScrollTrigger,MotionPathPlugin);
   const ctx=gsap.context(()=>{
     gsap.timeline({defaults:{ease:'power3.out'}})
       .fromTo('.hero-eyebrow,.hero-preface',{y:18,opacity:0},{y:0,opacity:1,duration:.65,stagger:.12,clearProps:'transform,opacity'},.1)
       .fromTo('.hero-heading-main,.hero-heading-accent',{y:34,opacity:0},{y:0,opacity:1,duration:.85,stagger:.16,clearProps:'transform,opacity'},.35)
       .fromTo('.hero-lead,.hero-actions,.hero-meta',{y:18,opacity:0},{y:0,opacity:1,duration:.7,stagger:.1,clearProps:'transform,opacity'},.85)
       .fromTo('.hero-visual',{x:28,opacity:0},{x:0,opacity:1,duration:1,clearProps:'transform,opacity'},.55);
     gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el=>{
       gsap.fromTo(el,{y:48,opacity:0},{y:0,opacity:1,duration:.95,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',once:true},clearProps:'transform,opacity'});
     });
     gsap.utils.toArray<SVGPathElement>('.skill-art-path').forEach(path=>{
       const length=path.getTotalLength();
       gsap.fromTo(path,{strokeDasharray:length,strokeDashoffset:length},{strokeDashoffset:0,duration:1.35,ease:'power2.out',scrollTrigger:{trigger:'.skill-artwork',start:'top 80%',once:true}});
     });
     gsap.utils.toArray<SVGSVGElement>('.skill-artwork svg').forEach(svg=>{
       const paths=Array.from(svg.querySelectorAll<SVGPathElement>('.skill-art-path'));
       const dots=Array.from(svg.querySelectorAll<SVGCircleElement>('.skill-art-traveler'));
       const icons=Array.from(svg.querySelectorAll<SVGGElement>('.skill-art-icon'));
       const core=svg.querySelector<SVGPathElement>('.skill-art-core-shape');
       const halo=svg.querySelector<SVGCircleElement>('.skill-art-halo');
       const beam=svg.querySelector<SVGPathElement>('.skill-art-output-beam');
       const outputNode=svg.querySelector<SVGCircleElement>('.skill-art-output-node');
       const outputLabel=svg.querySelector<SVGTextElement>('.skill-art-output');
       const loop=gsap.timeline({paused:true,repeat:-1,repeatDelay:1.05});
       paths.forEach((path,index)=>{
         const dot=dots[index];
         const icon=icons[index];
         loop.to(icon,{opacity:1,duration:.26},.16+index*.14)
           .to(path,{strokeWidth:2.7,opacity:1,duration:.3},.2+index*.14)
           .fromTo(dot,{opacity:0},{opacity:1,duration:.18},.2+index*.14)
           .to(dot,{motionPath:{path},duration:1.45,ease:'power2.inOut'},.25+index*.14)
           .to(dot,{opacity:0,duration:.2},1.65+index*.14)
           .to(path,{strokeWidth:1.6,opacity:.85,duration:.45},1.7+index*.14)
           .to(icon,{opacity:.7,duration:.45},1.7+index*.14);
       });
       if(core&&halo){
         loop.fromTo(halo,{scale:.65,opacity:.65,transformOrigin:'center center'},{scale:2.3,opacity:0,duration:.75,ease:'power2.out'},2.1)
           .fromTo(core,{scale:1,transformOrigin:'center center'},{scale:1.2,duration:.28,yoyo:true,repeat:1,ease:'sine.inOut'},2.1);
       }
       if(beam&&outputNode&&outputLabel){
         const beamLength=beam.getTotalLength();
         loop.fromTo(beam,{strokeDasharray:beamLength,strokeDashoffset:beamLength},{strokeDashoffset:0,duration:.38,ease:'power2.out'},2.28)
           .fromTo(outputNode,{opacity:0,scale:.4,transformOrigin:'center center'},{opacity:1,scale:1,duration:.3,ease:'back.out(2)'},2.52)
           .fromTo(outputLabel,{opacity:.45},{opacity:1,duration:.45},2.5)
           .to(outputLabel,{opacity:.75,duration:.7},3.2);
       }
       ScrollTrigger.create({trigger:'.skill-artwork',start:'top 80%',end:'bottom top',onEnter:()=>loop.play(),onEnterBack:()=>loop.play(),onLeave:()=>loop.pause(),onLeaveBack:()=>loop.pause()});
     });
     gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach(el=>{
       gsap.to(el,{y:-46,ease:'none',scrollTrigger:{trigger:el.parentElement,start:'top bottom',end:'bottom top',scrub:1}});
     });
     const aboutArt=document.querySelector('.about-artwork');
     if(aboutArt){
       const strokes=gsap.utils.toArray<SVGPathElement>('.about-art-design,.about-art-engineering,.about-art-core-mark',aboutArt);
       const lengths=strokes.map(path=>path.getTotalLength());
       strokes.forEach((path,i)=>gsap.set(path,{strokeDasharray:lengths[i],strokeDashoffset:lengths[i],opacity:.15}));
       const aboutLoop=gsap.timeline({paused:true,repeat:-1,repeatDelay:.45});
       aboutLoop.to(strokes[0],{strokeDashoffset:0,opacity:1,duration:.9,ease:'power2.out'},.1)
         .to('.about-art-design-node',{scale:1.7,transformOrigin:'center center',duration:.35,yoyo:true,repeat:1,ease:'sine.inOut'},.42)
         .to('.about-art-ring-a',{rotation:28,transformOrigin:'center center',duration:1.25,ease:'sine.inOut'},.1)
         .to(strokes[1],{strokeDashoffset:0,opacity:1,duration:1,ease:'power2.out'},1.15)
         .to('.about-art-engineering-node',{scale:1.7,transformOrigin:'center center',duration:.4,yoyo:true,repeat:1,ease:'sine.inOut'},1.68)
         .fromTo('.about-art-core',{scale:.8,transformOrigin:'center center'},{scale:1.13,duration:.48,yoyo:true,repeat:1,ease:'back.out(1.7)'},2.35)
         .to(strokes[2],{strokeDashoffset:0,opacity:1,duration:.6,ease:'power2.out'},2.48)
         .to('.about-art-outcome-ring',{rotation:-35,transformOrigin:'center center',duration:1.1,ease:'sine.inOut'},2.3)
         .to(strokes,{opacity:.15,duration:.6,ease:'sine.inOut'},3.55)
         .to('.about-art-core',{scale:1,duration:.4,ease:'sine.inOut'},3.55)
         .to('.about-art-ring-a,.about-art-outcome-ring',{rotation:0,duration:.8,ease:'sine.inOut'},3.55)
         .set(strokes,{strokeDashoffset:(i:number)=>lengths[i]},4.4);
       ScrollTrigger.create({trigger:aboutArt,start:'top 88%',end:'bottom top',onEnter:()=>aboutLoop.play(),onEnterBack:()=>aboutLoop.play(),onLeave:()=>aboutLoop.pause(),onLeaveBack:()=>aboutLoop.pause()});
     }
     const certificateArt=document.querySelector('.certificate-artwork');
     if(certificateArt){
       const certificateLines=gsap.utils.toArray<SVGPathElement>('.certificate-art-rule,.certificate-art-signature',certificateArt);
       certificateLines.forEach(path=>{const length=path.getTotalLength();gsap.set(path,{strokeDasharray:length,strokeDashoffset:length})});
       const certificateLoop=gsap.timeline({paused:true,repeat:-1,repeatDelay:1.2})
         .to('.certificate-art-shadow',{x:5,y:3,duration:1.2,ease:'sine.inOut'},0)
         .to('.certificate-art-back',{x:3,y:2,duration:1.2,ease:'sine.inOut'},.12)
         .to('.certificate-art-seal',{rotation:4,transformOrigin:'center center',duration:1.1,ease:'sine.inOut'},.15)
         .fromTo('.certificate-art-spark',{opacity:.25},{opacity:1,duration:.6,yoyo:true,repeat:1,ease:'sine.inOut'},.65)
         .to('.certificate-art-index-dot',{opacity:.3,duration:.35,stagger:.16,yoyo:true,repeat:1},.75)
         .to('.certificate-art-shadow,.certificate-art-back',{x:0,y:0,duration:1.1,ease:'sine.inOut'},1.9)
         .to('.certificate-art-seal',{rotation:0,duration:1.1,ease:'sine.inOut'},1.9);
       gsap.timeline({scrollTrigger:{trigger:certificateArt,start:'top 88%',once:true},onComplete:()=>{const bounds=certificateArt.getBoundingClientRect();if(bounds.top<window.innerHeight&&bounds.bottom>0) certificateLoop.play()}})
         .fromTo('.certificate-art-shadow,.certificate-art-back,.certificate-art-paper',{y:18,opacity:0},{y:0,opacity:1,duration:.65,stagger:.12,ease:'power3.out'},0)
         .to(certificateLines,{strokeDashoffset:0,duration:.8,stagger:.12,ease:'power2.out'},.55)
         .fromTo('.certificate-art-seal',{scale:1.4,rotation:-12,opacity:0,transformOrigin:'center center'},{scale:1,rotation:0,opacity:1,duration:.65,ease:'back.out(2)'},1.15)
         .fromTo('.certificate-art-index-dot',{scale:.2,opacity:0,transformOrigin:'center center'},{scale:1,opacity:1,duration:.28,stagger:.13,ease:'back.out(2)'},1.5);
       ScrollTrigger.create({trigger:certificateArt,start:'top bottom',end:'bottom top',onEnterBack:()=>certificateLoop.play(),onLeave:()=>certificateLoop.pause(),onLeaveBack:()=>certificateLoop.pause()});
     }
     const contactArt=document.querySelector('.contact-artwork');
     if(contactArt){
       const traces=gsap.utils.toArray<SVGPathElement>('.contact-art-traces path',contactArt);
       const pulses=gsap.utils.toArray<SVGCircleElement>('.contact-art-pulses circle',contactArt);
       gsap.set(traces,{opacity:0});
       gsap.set(pulses,{opacity:0});
       const contactLoop=gsap.timeline({paused:true,repeat:-1,repeatDelay:.55});
       contactLoop.fromTo('.contact-art-module',{opacity:.55},{opacity:1,duration:.55,stagger:.12,ease:'sine.inOut'},0);
       traces.forEach((path,i)=>{
         const length=path.getTotalLength();
         contactLoop.fromTo(path,{strokeDasharray:length,strokeDashoffset:length,opacity:0},{strokeDashoffset:0,opacity:.85,duration:1.1,ease:'power2.inOut'},.28+i*.15);
         contactLoop.fromTo(pulses[i],{opacity:0},{opacity:1,duration:.16},.4+i*.15)
           .to(pulses[i],{motionPath:{path,align:path,alignOrigin:[.5,.5]},duration:1.05,ease:'power2.inOut'},.4+i*.15)
           .to(pulses[i],{opacity:0,duration:.17},1.36+i*.15);
       });
       contactLoop.fromTo('.contact-art-core-dot',{scale:.6,opacity:.5,transformOrigin:'center center'},{scale:2.4,opacity:1,duration:.55,yoyo:true,repeat:1,ease:'sine.inOut'},1.35)
         .to(traces,{opacity:0,duration:.6,stagger:.08},2.35)
         .to('.contact-art-module',{opacity:.55,duration:.65,stagger:.09},2.5);
       const orbit=gsap.to('.contact-art-orbit',{rotation:360,transformOrigin:'center center',duration:22,repeat:-1,ease:'none',paused:true});
       ScrollTrigger.create({trigger:contactArt,start:'top 90%',end:'bottom top',onEnter:()=>{contactLoop.play();orbit.play()},onEnterBack:()=>{contactLoop.play();orbit.play()},onLeave:()=>{contactLoop.pause();orbit.pause()},onLeaveBack:()=>{contactLoop.pause();orbit.pause()}});
     }
   });
   return ()=>ctx.revert();
 },[]);
 return null;
}
