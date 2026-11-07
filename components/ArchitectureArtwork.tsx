'use client';

import {useEffect,useRef,useState} from 'react';
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

export default function ArchitectureArtwork(){
 const root=useRef<HTMLElement>(null);
 const [active,setActive]=useState(0);
 useEffect(()=>{
  const node=root.current;
  if(!node||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const route=node.querySelector<SVGPathElement>('.architecture-route');
  const signal=node.querySelector<SVGPathElement>('.architecture-signal');
  const traveler=node.querySelector<SVGCircleElement>('.architecture-traveler');
  if(!route||!signal||!traveler)return;
  const length=route.getTotalLength();
  signal.style.strokeDasharray=`115 ${length+115}`;
  const position={distance:0};
  let lastStage=-1;
  const animations:gsap.core.Tween[]=[];
  const context=gsap.context(()=>{
   animations.push(gsap.to(position,{distance:length,duration:9,ease:'none',repeat:-1,repeatDelay:.65,onUpdate:()=>{
    const point=route.getPointAtLength(position.distance);
    traveler.setAttribute('cx',String(point.x));
    traveler.setAttribute('cy',String(point.y));
    signal.style.strokeDashoffset=String(115-position.distance);
    const stage=Math.min(5,Math.floor(position.distance/length*6));
    if(stage!==lastStage){lastStage=stage;setActive(stage);}
   }}));
   animations.push(gsap.to('.architecture-core-ring',{rotation:360,transformOrigin:'50% 50%',duration:32,ease:'none',repeat:-1}));
   animations.push(gsap.to('.architecture-core-pulse',{scale:1.035,transformOrigin:'50% 50%',duration:2.1,ease:'sine.inOut',yoyo:true,repeat:-1}));
  },node);
  const observer=new IntersectionObserver(([entry])=>{
   animations.forEach(animation=>entry.isIntersecting?animation.play():animation.pause());
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
      <defs><pattern id="architecture-grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="currentColor" strokeOpacity=".08" strokeWidth="1"/></pattern></defs>
      <rect width="1200" height="430" fill="url(#architecture-grid)"/>
      <g className="architecture-muted-lines" fill="none" stroke="currentColor" strokeWidth="1"><path d="M75 214H1125"/><path d="M600 55V375"/><path d="M143 85H316M884 344h173"/><path d="M340 95H470M730 95h130M340 335h130M730 335h130"/></g>
      <path className="architecture-route" d="M90 214H260Q292 214 310 186L365 110Q380 88 410 88H505Q538 88 554 122L600 214L646 306Q662 340 695 340H790Q820 340 835 318L890 242Q908 214 940 214H1110" fill="none" stroke="var(--blue)" strokeWidth="2" strokeOpacity=".42" strokeLinecap="round"/>
      <path className="architecture-signal" d="M90 214H260Q292 214 310 186L365 110Q380 88 410 88H505Q538 88 554 122L600 214L646 306Q662 340 695 340H790Q820 340 835 318L890 242Q908 214 940 214H1110" fill="none" stroke="var(--blue)" strokeWidth="4" strokeLinecap="round"/>
      <circle className="architecture-traveler" cx="90" cy="214" r="6" fill="var(--architecture-bg)" stroke="var(--blue)" strokeWidth="3"/>
      <g className="architecture-joints" fill="var(--architecture-bg)" stroke="var(--blue)" strokeWidth="2"><circle cx="260" cy="214" r="5"/><circle cx="410" cy="88" r="5"/><circle cx="790" cy="340" r="5"/><circle cx="940" cy="214" r="5"/></g>
      <g className="architecture-schematic" fill="none" stroke="currentColor" strokeWidth="1.5">
       <g className="architecture-card architecture-requirements-card"><rect x="75" y="165" width="160" height="98"/><path d="M75 184h160M92 206h126M92 225h126M92 244h126"/><text x="92" y="180">01 / REQUIREMENTS</text><text className="architecture-card-detail" x="111" y="200">USER NEED</text><text className="architecture-card-detail" x="111" y="219">CONSTRAINTS</text><text className="architecture-card-detail" x="111" y="238">SUCCESS CRITERIA</text><path className="architecture-check architecture-step-check" d="m94 196 4 4 7-8"/><path className="architecture-check architecture-step-check" d="m94 215 4 4 7-8"/><path className="architecture-check architecture-step-check" d="m94 234 4 4 7-8"/><text className="architecture-card-pass" x="92" y="256">SCOPE DEFINED</text></g>
       <g className="architecture-card architecture-blueprint-card"><rect x="365" y="55" width="150" height="100"/><path d="M365 74h150"/><path className="architecture-map-lines" d="M379 96h36v32h-36zM423 96h36v32h-36zM467 96h36v32h-36zM415 112h8m36 0h8M397 128v13h88v-13"/><text x="379" y="70">02 / BLUEPRINT</text><text className="architecture-card-detail" x="385" y="115">UI</text><text className="architecture-card-detail" x="432" y="115">API</text><text className="architecture-card-detail" x="474" y="115">DATA</text><text className="architecture-card-pass" x="419" y="150">SYSTEM MAP</text></g>
       <g className="architecture-card architecture-quality-card"><rect x="685" y="282" width="150" height="100"/><path d="M685 301h150M701 321h116M701 340h116M701 359h116"/><text x="701" y="297">04 / QUALITY</text><text className="architecture-card-detail" x="722" y="315">UNIT TESTS</text><text className="architecture-card-detail" x="722" y="334">INTEGRATION</text><text className="architecture-card-detail" x="722" y="353">REVIEW</text><path className="architecture-check architecture-step-check" d="m705 311 4 4 7-8"/><path className="architecture-check architecture-step-check" d="m705 330 4 4 7-8"/><path className="architecture-check architecture-step-check" d="m705 349 4 4 7-8"/><text className="architecture-card-pass" x="802" y="315">PASS</text><text className="architecture-card-pass" x="802" y="334">PASS</text><text className="architecture-card-pass" x="802" y="353">PASS</text></g>
       <g className="architecture-card architecture-production-card"><rect x="965" y="165" width="160" height="98"/><path d="M965 184h160M984 249h120"/><path className="architecture-server-shape" d="M984 198h105v17H984zM984 220h105v17H984zM1098 198v39"/><text x="984" y="180">05 / RELEASE</text><text className="architecture-card-detail" x="1009" y="210">APP SERVER</text><text className="architecture-card-detail" x="1009" y="232">DATA LAYER</text><text className="architecture-card-pass" x="984" y="258">DEPLOYED · MONITORED</text><circle className="architecture-status-dot" cx="996" cy="207" r="3"/><circle className="architecture-status-dot" cx="996" cy="229" r="3"/><path className="architecture-server-link" d="M1098 207h10v22h-10"/></g>
      </g>
      <g className="architecture-core-ring" fill="none" stroke="var(--blue)" strokeWidth="1.5"><circle cx="600" cy="214" r="101" strokeDasharray="8 10"/><path d="M600 100v24m0 180v24M486 214h24m180 0h24"/></g>
      <circle className="architecture-core-pulse" cx="600" cy="214" r="76" fill="var(--architecture-core)" stroke="var(--blue)" strokeWidth="2"/>
      <g className="architecture-core-mark" fill="none" stroke="var(--blue)" strokeWidth="3" strokeLinecap="square"><path d="M566 189l-25 25 25 25M634 189l25 25-25 25M615 179l-30 70"/></g>
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
