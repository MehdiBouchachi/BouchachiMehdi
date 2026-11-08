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
       const labels=Array.from(svg.querySelectorAll<SVGTextElement>('.skill-art-label'));
       const slotArcs=Array.from(svg.querySelectorAll<SVGPathElement>('.skill-art-slot'));
       const slotLengths=slotArcs.map(arc=>arc.getTotalLength());
       slotArcs.forEach((arc,i)=>gsap.set(arc,{strokeDasharray:slotLengths[i],strokeDashoffset:slotLengths[i]}));
       /* one story: each skill leaves in turn, lands in its own slot of the core; the third completes the product */
       const GAP=.5,TRAVEL=1.3;
       const loop=gsap.timeline({paused:true,repeat:-1,repeatDelay:1});
       paths.forEach((path,index)=>{
         const dot=dots[index],icon=icons[index],label=labels[index],slot=slotArcs[index];
         const start=.15+index*GAP,arrive=start+TRAVEL;
         loop.to(icon,{opacity:1,y:'-=3',duration:.3,ease:'power2.out'},start)
           .call(()=>{label?.classList.add('is-active');icon?.classList.add('is-active');},[],start)
           .to(path,{strokeWidth:2.7,opacity:1,duration:.3},start)
           .fromTo(dot,{opacity:0},{opacity:1,duration:.15},start+.05)
           .to(dot,{motionPath:{path},duration:TRAVEL,ease:'power2.inOut'},start+.05)
           .to(dot,{opacity:0,duration:.12},arrive)
           .to(path,{strokeWidth:1.6,opacity:.85,duration:.45},arrive)
           .to(icon,{opacity:.7,y:'+=3',duration:.45,ease:'power2.inOut'},arrive);
         if(slot)loop.to(slot,{strokeDashoffset:0,duration:.4,ease:'power2.out'},arrive);
         if(core)loop.fromTo(core,{scale:1,transformOrigin:'center center'},{scale:1.1,duration:.14,yoyo:true,repeat:1,ease:'sine.inOut'},arrive);
       });
       const done=.15+2*GAP+TRAVEL+.4;
       if(core&&halo){
         loop.fromTo(halo,{scale:.65,opacity:.65,transformOrigin:'center center'},{scale:2.3,opacity:0,duration:.8,ease:'power2.out'},done)
           .fromTo(core,{scale:1,transformOrigin:'center center'},{scale:1.25,duration:.25,yoyo:true,repeat:1,ease:'back.out(2)'},done);
       }
       if(beam&&outputNode&&outputLabel){
         const beamLength=beam.getTotalLength();
         loop.fromTo(beam,{strokeDasharray:beamLength,strokeDashoffset:beamLength},{strokeDashoffset:0,duration:.35,ease:'power2.out'},done+.15)
           .fromTo(outputNode,{opacity:0,scale:.4,transformOrigin:'center center'},{opacity:1,scale:1,duration:.3,ease:'back.out(2)'},done+.4)
           .fromTo(outputLabel,{opacity:.45},{opacity:1,duration:.4},done+.35);
       }
       /* hold the finished product, then clear for the next build */
       const clear=done+1.6;
       loop.call(()=>[...labels,...icons].forEach(el=>el.classList.remove('is-active')),[],clear)
         .to(slotArcs,{opacity:0,duration:.5,ease:'sine.inOut'},clear);
       if(outputLabel)loop.to(outputLabel,{opacity:.75,duration:.5},clear);
       loop.set(slotArcs,{opacity:1,strokeDashoffset:(i:number)=>slotLengths[i]},clear+.55);
       ScrollTrigger.create({trigger:'.skill-artwork',start:'top 80%',end:'bottom top',onEnter:()=>loop.play(),onEnterBack:()=>loop.play(),onLeave:()=>loop.pause(),onLeaveBack:()=>loop.pause()});
     });
     gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach(el=>{
       gsap.to(el,{y:-46,ease:'none',scrollTrigger:{trigger:el.parentElement,start:'top bottom',end:'bottom top',scrub:1}});
     });
     const certificateArt=document.querySelector('.certificate-artwork');
     if(certificateArt){
       const select=(selector:string)=>gsap.utils.toArray<Element>(selector,certificateArt);
       const paper=select('.certificate-art-paper,.certificate-art-corner,.certificate-art-heading,.certificate-art-rule,.certificate-art-signature,.certificate-art-seal,.certificate-art-spark');
       const certificateLoop=gsap.timeline({paused:true,repeat:-1,repeatDelay:.5})
         .to('.certificate-art-base',{x:7,y:4,duration:1.4,ease:'sine.inOut'},0)
         .to('.certificate-art-back',{x:4,y:2,duration:1.4,ease:'sine.inOut'},0)
         .to(paper,{y:-2,duration:1.4,ease:'sine.inOut'},0)
         .to('.certificate-art-seal',{rotation:5,transformOrigin:'center center',duration:1.4,ease:'sine.inOut'},0)
         .to('.certificate-art-index-dot',{opacity:.4,duration:.45,stagger:.22,yoyo:true,repeat:1,ease:'sine.inOut'},.85)
         .to('.certificate-art-base,.certificate-art-back',{x:0,y:0,duration:1.4,ease:'sine.inOut'},2)
         .to(paper,{y:0,duration:1.4,ease:'sine.inOut'},2)
         .to('.certificate-art-seal',{rotation:0,duration:1.4,ease:'sine.inOut'},2);
       ScrollTrigger.create({trigger:certificateArt,start:'top 92%',end:'bottom top',onEnter:()=>certificateLoop.play(),onEnterBack:()=>certificateLoop.play(),onLeave:()=>certificateLoop.pause(),onLeaveBack:()=>certificateLoop.pause()});
     }
     const contactArt=document.querySelector('.contact-artwork');
     if(contactArt){
       /* a conversation: a message arrives from the left, the core writes a reply, the reply goes out to the right */
       const traces=gsap.utils.toArray<SVGPathElement>('.contact-art-traces path',contactArt);
       const pulses=gsap.utils.toArray<SVGCircleElement>('.contact-art-pulses circle',contactArt);
       const modules=gsap.utils.toArray<SVGGElement>('.contact-art-module',contactArt);
       const toggles=modules.map(module=>module.querySelector('circle')).filter((c):c is SVGCircleElement=>!!c);
       const lines=gsap.utils.toArray<SVGPathElement>('.contact-art-core-line',contactArt);
       const lengths=traces.map(path=>path.getTotalLength());
       const lineLengths=lines.map(line=>line.getTotalLength());
       gsap.set(traces,{opacity:0});
       gsap.set(pulses,{opacity:0});
       gsap.set(modules,{opacity:.55});
       lines.forEach((line,i)=>gsap.set(line,{strokeDasharray:lineLengths[i],strokeDashoffset:lineLengths[i]}));
       const contactLoop=gsap.timeline({paused:true,repeat:-1,repeatDelay:.6});
       const send=(i:number,at:number,inbound:boolean)=>{
         const path=traces[i],length=lengths[i];
         const route={path,align:path,alignOrigin:[.5,.5] as [number,number]};
         contactLoop.fromTo(path,{strokeDasharray:length,strokeDashoffset:inbound?length:-length,opacity:.85},{strokeDashoffset:0,duration:1,ease:'power2.inOut'},at)
           .fromTo(pulses[i],{opacity:0},{opacity:1,duration:.12},at)
           .fromTo(pulses[i],{motionPath:{...route,start:inbound?0:1,end:inbound?0:1}},{motionPath:{...route,start:inbound?0:1,end:inbound?1:0},duration:1,ease:'power2.inOut'},at)
           .to(pulses[i],{opacity:0,duration:.12},at+.95);
       };
       const wake=(i:number,at:number)=>{
         contactLoop.to(modules[i],{opacity:1,duration:.35,ease:'sine.out'},at);
         if(toggles[i])contactLoop.to(toggles[i],{x:'+=10',duration:.35,ease:'back.out(2)'},at);
       };
       /* 1. the message leaves the left modules */
       wake(0,0);wake(1,.12);
       send(0,.3,true);send(1,.45,true);
       /* 2. the core receives and writes a reply, line by line, then the caret blinks */
       contactLoop.fromTo('.contact-art-core-dot',{scale:1,transformOrigin:'center center'},{scale:2,duration:.2,yoyo:true,repeat:1,ease:'sine.inOut'},1.4);
       /* the core dot becomes the caret: it rides the end of each line as it types (line ends at x 20, 4, 20; dot lives at x 18) */
       const caret=contactArt.querySelector('.contact-art-core-dot');
       const rows=[{y:-8,end:20},{y:0,end:4},{y:8,end:20}];
       lines.forEach((line,i)=>{
         const at=1.55+i*.24;
         if(caret)contactLoop.set(caret,{x:-20-18+3,y:rows[i].y},at)
           .to(caret,{x:rows[i].end-18+4,duration:.28,ease:'power1.inOut'},at);
         contactLoop.to(line,{strokeDashoffset:0,duration:.28,ease:'power1.inOut'},at);
       });
       contactLoop.to('.contact-art-core-dot',{opacity:.2,duration:.12,yoyo:true,repeat:3,ease:'steps(1)'},2.3);
       /* junction dots pop as a pulse passes through them; the vertical taps tick while the reply is written */
       const junctions=gsap.utils.toArray<SVGCircleElement>('.contact-art-signal circle',contactArt);
       const pop=(el:Element|undefined,at:number)=>{if(el)contactLoop.fromTo(el,{scale:1,transformOrigin:'center center'},{scale:2.2,duration:.16,yoyo:true,repeat:1,ease:'sine.out'},at);};
       pop(junctions[0],.79);pop(junctions[0],.94);
       pop(junctions[2],1.6);pop(junctions[3],2.05);
       pop(junctions[1],3.26);pop(junctions[1],3.41);
       /* 3. the reply goes out to the right */
       send(2,2.75,false);send(3,2.9,false);
       wake(2,3.75);wake(3,3.9);
       /* 4. hold, then clear for the next message */
       const clear=5.1;
       contactLoop.to(traces,{opacity:0,duration:.5,stagger:.06},clear)
         .to(modules,{opacity:.55,duration:.5},clear)
         .to(toggles,{x:'-=10',duration:.4,ease:'power2.inOut'},clear)
         .to(lines,{strokeDashoffset:(i:number)=>lineLengths[i],duration:.4,ease:'power1.in'},clear)
         .to('.contact-art-core-dot',{x:0,y:0,opacity:1,duration:.4,ease:'power2.inOut'},clear);
       const orbit=gsap.to('.contact-art-orbit',{rotation:360,transformOrigin:'center center',duration:22,repeat:-1,ease:'none',paused:true});
       ScrollTrigger.create({trigger:contactArt,start:'top 90%',end:'bottom top',onEnter:()=>{contactLoop.play();orbit.play()},onEnterBack:()=>{contactLoop.play();orbit.play()},onLeave:()=>{contactLoop.pause();orbit.pause()},onLeaveBack:()=>{contactLoop.pause();orbit.pause()}});
     }
   });
   return ()=>ctx.revert();
 },[]);
 return null;
}
