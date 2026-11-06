import type {Metadata,Viewport} from 'next';
import './globals.css';
import {site} from '@/data/site';
export const metadata: Metadata={
  title:{default:'Bouchachi Mohamed Mehdi | Creative Software Engineer',template:'%s | Bouchachi Mohamed Mehdi'},
  description:'Portfolio of Bouchachi Mohamed Mehdi, a full-stack developer and software engineer in Blida, Algeria. Explore EmpreinteFlex, ITC Blida, ITCP, AeroLab, Healance, and more.',
  keywords:['Bouchachi Mohamed Mehdi','Mehdi Bouchachi','Software Engineer','Full-Stack Developer','Next.js','Algeria','ITC','IoT'],
  openGraph:{title:'Bouchachi Mohamed Mehdi | Creative Software Engineer',description:'Ideas, interfaces and real-world systems. Selected work and moments from the journey.',type:'website',locale:'en_US'},
  robots:{index:true,follow:true},
};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#070a0d'};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><body>{children}</body></html>
}
