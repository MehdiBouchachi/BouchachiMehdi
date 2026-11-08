'use client';

import {useEffect,useRef,useState,type CSSProperties} from 'react';
import {gsap} from 'gsap';
import Heading from './ui/Heading';
import Text from './ui/Text';

const stages=[
 {number:'01',name:'Discover',detail:'Requirements & constraints',output:'A defined problem'},
 {number:'02',name:'Design',detail:'Architecture & data',output:'A system blueprint'},
 {number:'03',name:'Build',detail:'Interfaces & services',output:'Working software'},
 {number:'04',name:'Verify',detail:'Tests & review',output:'Evidence it works'},
 {number:'05',name:'Deploy',detail:'Infrastructure & release',output:'A live product'},
 {number:'06',name:'Observe',detail:'Measure & improve',output:'A better next version'},
];

const ROUTE='M90 214H260Q292 214 310 186L365 110Q380 88 410 88H505Q538 88 554 122L600 214L646 306Q662 340 695 340H790Q820 340 835 318L890 242Q908 214 940 214H1110';
const CARDS=[{id:'requirements',x:75,y:165,w:160,h:98},{id:'blueprint',x:365,y:55,w:150,h:100},{id:'quality',x:685,y:282,w:150,h:100},{id:'production',x:965,y:165,w:160,h:98}];
const CARD=Object.fromEntries(CARDS.map(c=>[c.id,c]));
/* Comet made of stacked dashes that all end at the traveller: wide glow, body, bright head. */
const SIGNALS=[{cls:'architecture-signal-glow',len:150},{cls:'architecture-signal-body',len:95},{cls:'architecture-signal-head',len:28}];

const vars=(v:Record<string,string|number>)=>v as CSSProperties;

/* Scan sweep that "reads" a card when the signal enters it, clipped to the card. */
function CardScan({id}:{id:string}){
 const c=CARD[id];
 return <g clipPath={`url(#arch-clip-${id})`}><g className="architecture-card-scan"><rect x={c.x} y={c.y-24} width={c.w} height="24" fill="url(#arch-scan-grad)"/><path d={`M${c.x} ${c.y}h${c.w}`}/></g></g>;
}

export default function ArchitectureArtwork(){
 const root=useRef<HTMLElement>(null);
 const [active,setActive]=useState(0);

 /* Choreographed entrance the first time the board scrolls into view. */
 useEffect(()=>{
  const node=root.current;
  if(!node||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  node.dataset.reveal='armed';
  const observer=new IntersectionObserver(([entry])=>{
   if(!entry.isIntersecting)return;
   node.dataset.reveal='in';
   observer.disconnect();
  },{threshold:.2});
  observer.observe(node);
  return()=>observer.disconnect();
 },[]);

 useEffect(()=>{
  const node=root.current;
  if(!node||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const route=node.querySelector<SVGPathElement>('.architecture-route');
  const signals=Array.from(node.querySelectorAll<SVGPathElement>('.architecture-signal'));
  const progress=Array.from(node.querySelectorAll<SVGPathElement>('.architecture-progress'));
  const spot=node.querySelector<SVGCircleElement>('.arch-spot');
  const joints=Array.from(node.querySelectorAll<SVGCircleElement>('.architecture-joints circle'));
  const travelers=Array.from(node.querySelectorAll<SVGCircleElement>('.architecture-traveler'));
  if(!route||!signals.length||!travelers.length)return;
  const length=route.getTotalLength();
  const lens=signals.map(signal=>Number(signal.dataset.len)||100);
  signals.forEach((signal,i)=>{signal.style.strokeDasharray=`${lens[i]} ${length+lens[i]}`;signal.style.strokeDashoffset=String(lens[i]);});
  progress.forEach(path=>{path.style.strokeDasharray=`0 ${length}`;});
  /* where along the route each joint sits, so it lights the moment the signal reaches it */
  const jointAt=joints.map(joint=>{
   const jx=Number(joint.getAttribute('cx')),jy=Number(joint.getAttribute('cy'));
   let best=0,bestDist=Infinity;
   for(let d=0;d<=length;d+=2){const p=route.getPointAtLength(d);const dist=(p.x-jx)**2+(p.y-jy)**2;if(dist<bestDist){bestDist=dist;best=d;}}
   return best;
  });
  let previous=0;
  const position={distance:0};
  let lastStage=-1;
  const animations:gsap.core.Tween[]=[];
  const context=gsap.context(()=>{
   animations.push(gsap.to(position,{distance:length,duration:9,ease:'none',repeat:-1,repeatDelay:1.4,delay:1.6,onUpdate:()=>{
    const point=route.getPointAtLength(position.distance);
    travelers.forEach(traveler=>{traveler.setAttribute('cx',String(point.x));traveler.setAttribute('cy',String(point.y));});
    if(spot){spot.setAttribute('cx',String(point.x));spot.setAttribute('cy',String(point.y));}
    if(position.distance<previous)delete node.dataset.complete;
    previous=position.distance;
    joints.forEach((joint,i)=>joint.classList.toggle('is-lit',position.distance>=jointAt[i]));
    if(position.distance>=length-.5)node.dataset.complete='';
    signals.forEach((signal,i)=>{signal.style.strokeDashoffset=String(lens[i]-position.distance);});
    progress.forEach(path=>{path.style.strokeDasharray=`${position.distance} ${length}`;});
    const stage=Math.min(5,Math.floor(position.distance/length*6));
    if(stage!==lastStage){lastStage=stage;setActive(stage);}
   }}));
   animations.push(gsap.to('.architecture-core-ring',{rotation:360,transformOrigin:'50% 50%',duration:32,ease:'none',repeat:-1}));
   animations.push(gsap.to('.architecture-core-pulse',{scale:1.035,transformOrigin:'50% 50%',duration:2.1,ease:'sine.inOut',yoyo:true,repeat:-1}));
  },node);
  const svg=node.querySelector<SVGSVGElement>('.architecture-diagram>svg');
  const observer=new IntersectionObserver(([entry])=>{
   animations.forEach(animation=>entry.isIntersecting?animation.play():animation.pause());
   if(svg)entry.isIntersecting?svg.unpauseAnimations():svg.pauseAnimations();
  },{threshold:.12});
  observer.observe(node);
  return()=>{observer.disconnect();context.revert();};
 },[]);

 return <section ref={root} className="architecture-section" data-active={active+1} aria-labelledby="architecture-heading">
  <div className="wrap">
   <div className="architecture-intro"><div><Text variant="overline" className="architecture-kicker">FROM FIRST PRINCIPLE TO PRODUCTION</Text><Heading level={2} variant="section" id="architecture-heading">Built with <em>structure.</em><br/>Made to <em>last.</em></Heading></div><Text variant="intro" className="architecture-summary">Good software starts with a clear model. I shape the system, build its parts, prove they work, then keep improving what ships.</Text></div>
   <div className="architecture-board">
    <div className="architecture-board-top"><span>FIG. 01 / THE ENGINEERING SYSTEM</span><span>IDEA → RUNNING PRODUCT</span></div>
    <div className="architecture-diagram">
     <div className="architecture-readout"><span className="architecture-readout-label">CURRENT OUTPUT <b>{stages[active].number} / 06</b></span><strong key={active}>{stages[active].output}</strong><span className="architecture-readout-track"><i style={{width:`${(active+1)/stages.length*100}%`}}/></span></div>
     <svg viewBox="0 0 1200 430" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
       <pattern id="architecture-grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="currentColor" strokeOpacity=".08" strokeWidth="1"/></pattern>
       <radialGradient id="arch-grid-fade" cx="50%" cy="50%" r="60%"><stop offset="0" stopColor="#fff"/><stop offset=".75" stopColor="#fff" stopOpacity=".55"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></radialGradient>
       <mask id="arch-grid-mask"><rect width="1200" height="430" fill="url(#arch-grid-fade)"/></mask>
       <radialGradient id="arch-core-halo"><stop offset="0" className="arch-stop-a" stopOpacity=".16"/><stop offset=".5" className="arch-stop-a" stopOpacity=".05"/><stop offset="1" className="arch-stop-a" stopOpacity="0"/></radialGradient>
       <pattern id="arch-grid-lit" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" className="arch-grid-lit-line" strokeWidth="1"/><circle cx="0" cy="0" r="1.6" className="arch-grid-lit-dot"/></pattern>
       <radialGradient id="arch-spot-grad"><stop offset="0" stopColor="#fff"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></radialGradient>
       <mask id="arch-spot-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="430"><circle className="arch-spot" cx="90" cy="214" r="130" fill="url(#arch-spot-grad)"/></mask>
       <mask id="arch-progress-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="430"><path className="architecture-progress" d={ROUTE} fill="none" stroke="#fff" strokeWidth="10" strokeDasharray="0 99999"/></mask>
       <linearGradient id="arch-scan-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" className="arch-stop-a" stopOpacity="0"/><stop offset="1" className="arch-stop-a" stopOpacity=".22"/></linearGradient>
       {CARDS.map(c=><clipPath key={c.id} id={`arch-clip-${c.id}`}><rect x={c.x} y={c.y} width={c.w} height={c.h}/></clipPath>)}
      </defs>
      <rect width="1200" height="430" fill="url(#architecture-grid)" mask="url(#arch-grid-mask)"/>
      <rect className="arch-grid-lit" width="1200" height="430" fill="url(#arch-grid-lit)" mask="url(#arch-spot-mask)"/>

      <path className="architecture-route" d={ROUTE} fill="none" stroke="var(--blue)" strokeWidth="2" strokeOpacity=".42" strokeLinecap="round"/>
      <path className="architecture-progress architecture-progress-line" d={ROUTE} fill="none" strokeLinecap="round" strokeDasharray="0 99999"/>
      <path className="architecture-flow" d={ROUTE} fill="none" mask="url(#arch-progress-mask)"/>
      {SIGNALS.map(s=><path key={s.cls} className={`architecture-signal ${s.cls}`} data-len={s.len} d={ROUTE} fill="none" strokeLinecap="round" strokeDasharray="0 99999"/>)}
      <g className="architecture-joints" fill="var(--architecture-bg)" stroke="var(--blue)" strokeWidth="2"><circle cx="260" cy="214" r="5"/><circle cx="410" cy="88" r="5"/><circle cx="790" cy="340" r="5"/><circle cx="940" cy="214" r="5"/></g>
      <circle className="architecture-traveler" cx="90" cy="214" r="6" fill="var(--architecture-bg)" stroke="var(--blue)" strokeWidth="3"/>

      <g className="architecture-schematic" fill="none" stroke="currentColor" strokeWidth="1.5">
       <g className="architecture-card architecture-requirements-card" style={vars({'--i':0})}><rect x="75" y="165" width="160" height="98"/><path d="M75 184h160M92 206h126M92 225h126M92 244h126"/><text x="92" y="180">01 / REQUIREMENTS</text><text className="architecture-card-detail" x="111" y="200">USER NEED</text><text className="architecture-card-detail" x="111" y="219">CONSTRAINTS</text><text className="architecture-card-detail" x="111" y="238">SUCCESS CRITERIA</text><path className="architecture-check architecture-step-check" d="m94 196 4 4 7-8"/><path className="architecture-check architecture-step-check" d="m94 215 4 4 7-8"/><path className="architecture-check architecture-step-check" d="m94 234 4 4 7-8"/><text className="architecture-card-pass" x="92" y="256">SCOPE DEFINED</text><CardScan id="requirements"/><g className="architecture-card-ping"><rect x="75" y="165" width="160" height="98"/></g></g>
       <g className="architecture-card architecture-blueprint-card" style={vars({'--i':1})}><rect x="365" y="55" width="150" height="100"/><path d="M365 74h150"/><path className="architecture-map-lines" d="M379 96h36v32h-36zM423 96h36v32h-36zM467 96h36v32h-36zM415 112h8m36 0h8M397 128v13h88v-13"/><text x="379" y="70">02 / BLUEPRINT</text><text className="architecture-card-detail" x="385" y="115">UI</text><text className="architecture-card-detail" x="432" y="115">API</text><text className="architecture-card-detail" x="474" y="115">DATA</text><text className="architecture-card-pass" x="419" y="150">SYSTEM MAP</text><CardScan id="blueprint"/><g className="architecture-card-ping"><rect x="365" y="55" width="150" height="100"/></g></g>
       <g className="architecture-card architecture-quality-card" style={vars({'--i':2})}><rect x="685" y="282" width="150" height="100"/><path d="M685 301h150M701 321h116M701 340h116M701 359h116"/><text x="701" y="297">04 / QUALITY</text><text className="architecture-card-detail" x="722" y="315">UNIT TESTS</text><text className="architecture-card-detail" x="722" y="334">INTEGRATION</text><text className="architecture-card-detail" x="722" y="353">REVIEW</text><path className="architecture-check architecture-step-check" d="m705 311 4 4 7-8"/><path className="architecture-check architecture-step-check" d="m705 330 4 4 7-8"/><path className="architecture-check architecture-step-check" d="m705 349 4 4 7-8"/><text className="architecture-card-pass" x="802" y="315">PASS</text><text className="architecture-card-pass" x="802" y="334">PASS</text><text className="architecture-card-pass" x="802" y="353">PASS</text><CardScan id="quality"/><g className="architecture-card-ping"><rect x="685" y="282" width="150" height="100"/></g></g>
       <g className="architecture-card architecture-production-card" style={vars({'--i':3})}><rect x="965" y="165" width="160" height="98"/><path d="M965 184h160M984 249h120"/><path className="architecture-server-shape" d="M984 198h105v17H984zM984 220h105v17H984zM1098 198v39"/><text x="984" y="180">05 / RELEASE</text><text className="architecture-card-detail" x="1009" y="210">APP SERVER</text><text className="architecture-card-detail" x="1009" y="232">DATA LAYER</text><text className="architecture-card-pass" x="984" y="258">DEPLOYED · MONITORED</text><circle className="architecture-status-dot" cx="996" cy="207" r="3"/><circle className="architecture-status-dot" cx="996" cy="229" r="3"/><path className="architecture-server-link" d="M1098 207h10v22h-10"/><CardScan id="production"/><g className="architecture-card-ping"><rect x="965" y="165" width="160" height="98"/></g></g>
      </g>

      {/* the core */}
      <g className="arch-core">
       <circle className="arch-core-halo" cx="600" cy="214" r="150" fill="url(#arch-core-halo)"/>
       <g className="architecture-core-ring" fill="none" stroke="var(--blue)" strokeWidth="1.5"><circle cx="600" cy="214" r="101" strokeDasharray="8 10"/><path d="M600 100v24m0 180v24M486 214h24m180 0h24"/></g>
       <circle className="arch-core-ping" cx="600" cy="214" r="76"/>
       <circle className="architecture-core-pulse" cx="600" cy="214" r="76" fill="var(--architecture-core)" stroke="var(--blue)" strokeWidth="2"/>
       <g className="architecture-core-mark" fill="none" stroke="var(--blue)" strokeWidth="3" strokeLinecap="square"><path pathLength={1} d="M566 189l-25 25 25 25"/><path pathLength={1} d="M634 189l25 25-25 25"/><path pathLength={1} d="M615 179l-30 70"/></g>
      </g>

      <g className="architecture-labels" fill="currentColor"><text x="75" y="288">REQUIREMENTS</text><text x="365" y="180">SYSTEM MODEL</text><text x="685" y="406">VERIFICATION</text><text x="965" y="288">PRODUCTION</text><text x="600" y="368" textAnchor="middle">DESIGN × DELIVERY</text></g>
     </svg>
     <div className="architecture-mobile-focus" aria-label="Current engineering stage">
      <div className="architecture-mobile-focus-top"><span>STEP {stages[active].number} / 06</span><span>THE ENGINEERING PROCESS</span></div>
      <svg className="architecture-mobile-art" viewBox="0 0 340 210" role="img" aria-label="Six engineering stages connected around a central system">
       <path className="architecture-mobile-art-grid" d="M0 52H340M0 105H340M0 158H340M85 0V210M170 0V210M255 0V210"/>
       <path className="architecture-mobile-art-frame" d="M170 17 246 61 246 149 170 193 94 149 94 61Z"/>
       {[{x:170,y:17},{x:246,y:61},{x:246,y:149},{x:170,y:193},{x:94,y:149},{x:94,y:61}].map((point,index)=><g key={index} className={`architecture-mobile-art-node ${active===index?'is-active':''}`}><path d={`M170 105L${point.x} ${point.y}`}/><circle cx={point.x} cy={point.y} r="11"/><circle className="architecture-mobile-art-core-dot" cx={point.x} cy={point.y} r="3"/></g>)}
       <g className="architecture-mobile-art-orbit"><circle cx="170" cy="105" r="58"/></g>
       <circle className="architecture-mobile-art-center" cx="170" cy="105" r="44"/>
       <path className="architecture-mobile-art-mark" d="m155 91-14 14 14 14m30-28 14 14-14 14m-8-36-14 44"/>
      </svg>
      <div className="architecture-mobile-focus-body" key={active}><span className="architecture-mobile-focus-number" aria-hidden="true">{stages[active].number}</span><Heading level={3} variant="card">{stages[active].name}</Heading><Text variant="lead">{stages[active].output}</Text><Text as="small" variant="small">{stages[active].detail}</Text></div>
      <div className="architecture-mobile-focus-progress" aria-hidden="true">{stages.map((stage,index)=><i key={stage.number} className={index===active?'is-active':''}/>)}</div>
     </div>
    </div>
    <div className="architecture-stages" aria-label="My software engineering process">{stages.map((stage,index)=><div className={`architecture-stage ${active===index?'is-active':''}`} key={stage.number}><span>{stage.number}</span><strong>{stage.name}</strong><small>{stage.detail}</small></div>)}</div>
    <div className="architecture-board-bottom"><span>AN IDEA IS ONLY THE START.</span><span>DESIGN / IMPLEMENT / TEST / DEPLOY / ITERATE</span></div>
   </div>
  </div>
 </section>;
}
