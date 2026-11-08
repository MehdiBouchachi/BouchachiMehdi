import Link from 'next/link';
import {ArrowRight, ArrowUpRight} from 'lucide-react';
import Navigation from '@/components/Navigation';
import NotFoundArtwork from '@/components/NotFoundArtwork';

export default function NotFound() {
  return <>
    <Navigation />
    <main className="not-found-page">
      <div className="wrap not-found-wrap">
        <div className="not-found-eyebrow"><span>ERROR / 404</span><span>THE ROUTE ENDS HERE</span></div>
        <div className="not-found-layout">
          <div className="not-found-copy">
            <p className="not-found-index">A small detour.</p>
            <h1><span>Lost in the</span><em>system.</em></h1>
            <p className="not-found-description">This page isn’t on the map. The rest of the work is right where you left it.</p>
            <div className="not-found-actions">
              <Link className="not-found-primary" href="/">Back to home <ArrowUpRight size={18} aria-hidden="true" /></Link>
              <Link className="not-found-secondary" href="/#work">Explore the work <ArrowRight size={18} aria-hidden="true" /></Link>
            </div>
          </div>
          <NotFoundArtwork />
        </div>
        <div className="not-found-footer"><span>GOOD SYSTEMS LEAVE A WAY BACK.</span><span>BOUCHACHI MOHAMED MEHDI / PORTFOLIO</span></div>
      </div>
    </main>
  </>;
}
