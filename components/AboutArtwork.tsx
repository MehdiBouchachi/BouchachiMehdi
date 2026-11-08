'use client';

import {useEffect,useRef} from 'react';

export default function AboutArtwork(){
 const root=useRef<HTMLDivElement>(null);
 /* play the story only while it is on screen, starting from step one the first time */
 useEffect(()=>{
  const node=root.current;
  if(!node)return;
  const observer=new IntersectionObserver(([entry])=>{node.dataset.play=entry.isIntersecting?'on':'off';},{threshold:.35});
  observer.observe(node);
  return()=>observer.disconnect();
 },[]);
 return <div ref={root} className="about-artwork" aria-label="Design and engineering come together in the work I build" role="img">
  <svg viewBox="0 0 520 154" aria-hidden="true">
   <path className="about-art-axis" d="M173 15v124M347 15v124M12 77h496"/>
   <circle className="about-art-ring about-art-ring-a" cx="88" cy="77" r="48"/>
   <path className="about-art-design" pathLength={1} d="M41 77c16-39 34 39 52 0s33-39 43 0"/>
   <circle className="about-art-design-node about-art-design-start" cx="41" cy="77" r="3"/><circle className="about-art-design-node about-art-design-end" cx="136" cy="77" r="3"/>
   <rect className="about-art-ring about-art-ring-b" x="216" y="33" width="88" height="88" rx="2"/>
   <path className="about-art-engineering" d="M238 55h44v44h-44zM238 77h44M260 55v44M216 77h-14m102 0h14m-58-44V19m0 102v14"/>
   <path className="about-art-build" pathLength={1} d="M238 77h44M260 55v44"/>
   <circle className="about-art-engineering-node" cx="260" cy="77" r="6"/>
   <path className="about-art-outcome-ring" d="M434 27a50 50 0 1 1 0 100 50 50 0 1 1 0-100"/>
   <path className="about-art-ripple" d="M433 49l27 28-27 28-27-28z"/>
   <path className="about-art-core" d="M433 49l27 28-27 28-27-28z"/>
   <path className="about-art-core-mark" pathLength={1} d="m421 77 8 8 17-18"/>
   <path className="about-art-link about-art-link-a" pathLength={1} d="M136 77H260"/>
   <path className="about-art-link about-art-link-b" pathLength={1} d="M260 77H406"/>
   <circle className="about-art-traveler" cx="136" cy="77" r="3.5"/>
   <path className="about-art-mark" d="M8 8h19M8 8v19m504-19h-19m19 0v19M8 146h19m-19 0v-19m504 19h-19m19 0v-19"/>
  </svg>
  <div className="about-art-legend"><span>01 / DESIGN</span><span>02 / ENGINEERING</span><strong>03 / BUILT WITH PURPOSE</strong></div>
 </div>
}
