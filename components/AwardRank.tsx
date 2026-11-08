'use client';

import {useEffect,useRef} from 'react';

/* Same "02nd" markup as before; once in view it is coloured in from the bottom up. */
export default function AwardRank(){
 const root=useRef<HTMLSpanElement>(null);
 useEffect(()=>{
  const node=root.current;
  if(!node||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  node.dataset.fill='armed';
  const observer=new IntersectionObserver(([entry])=>{
   if(!entry.isIntersecting)return;
   node.dataset.fill='in';
   observer.disconnect();
  },{threshold:.6});
  observer.observe(node);
  return()=>observer.disconnect();
 },[]);
 return <span ref={root} className="award-fill">02<span className="award-suffix">nd</span></span>;
}
