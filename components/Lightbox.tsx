'use client';
import {useEffect} from 'react';
import {X,ArrowLeft,ArrowRight} from 'lucide-react';
import Button from './ui/Button';
export type LightboxItem={src:string;title:string;subtitle?:string};
export default function Lightbox({items,index,onClose,onChange}:{items:LightboxItem[];index:number|null;onClose:()=>void;onChange:(index:number)=>void}){
 useEffect(()=>{
  if(index===null)return;
  function onKey(e:KeyboardEvent){if(e.key==='Escape')onClose();if(e.key==='ArrowRight')onChange((index!+1)%items.length);if(e.key==='ArrowLeft')onChange((index!+items.length-1)%items.length)}
  document.addEventListener('keydown',onKey);const old=document.body.style.overflow;document.body.style.overflow='hidden';
  return()=>{document.removeEventListener('keydown',onKey);document.body.style.overflow=old};
 },[index,items.length,onClose,onChange]);
 if(index===null)return null;
 const item=items[index];
 return <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.title} onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
   <Button variant="icon" className="lightbox-close icon-button" onClick={onClose} aria-label="Close photo"><X size={20}/></Button>
   <div className="lightbox-inner">
    <img key={item.src} src={item.src} alt={item.title}/>
    <div className="lightbox-bar"><div><strong>{item.title}</strong><span>{item.subtitle||''}</span></div><div className="lightbox-controls"><span>{String(index+1).padStart(2,'0')} / {String(items.length).padStart(2,'0')}</span><Button variant="icon" onClick={()=>onChange((index+items.length-1)%items.length)} aria-label="Previous photo"><ArrowLeft size={19}/></Button><Button variant="icon" onClick={()=>onChange((index+1)%items.length)} aria-label="Next photo"><ArrowRight size={19}/></Button></div></div>
   </div>
  </div>
}
