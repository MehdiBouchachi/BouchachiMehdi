import type { ArtType } from '@/data/site';

export function ProjectArt({type, compact = false, image, title}:{type:ArtType;compact?:boolean;image?:string;title?:string}) {
  if(image)return <div className="project-art project-art-image"><img className="project-image" src={image} alt={`${title??'Project'} preview`} loading="lazy"/></div>;
  return <div className={`project-art art-${type} ${compact ? 'art-compact' : ''}`} aria-hidden="true">
    <span className="art-grain"/>
    {type === 'mattress' && <div className="commerce-scene">
      <div className="commerce-top"><span>empreinte<span className="commerce-bold">flex</span></span><span>COLLECTION / 26&nbsp;&nbsp; ↗</span></div>
      <div className="commerce-title">Rest is an<br/><em>art form.</em></div>
      <div className="mattress-bed"><div className="mattress-pillow"/><div className="mattress-mattress"/><div className="mattress-base"/></div>
      <div className="commerce-bottom"><span>REIMAGINE COMFORT</span><span>01 / 04</span></div>
    </div>}
    {type === 'community' && <div className="community-scene">
      <div className="community-eyebrow">IT COMMUNITY / BLIDA</div>
      <div className="community-giant">IT<span>C</span></div>
      <div className="community-blueprint"><div className="community-ring ring-one"/><div className="community-ring ring-two"/><div className="community-ring ring-three"/><div className="community-point"/></div>
      <div className="community-caption"><span>CREATE</span><span>CONNECT</span><span>LEVEL UP</span></div>
    </div>}
    {type === 'tournament' && <div className="tournament-scene">
      <div className="tournament-top"><span>ITCP / ARENA</span><span>ROUND OF 16</span></div>
      <div className="tournament-word">THE<br/><i>ARENA</i></div>
      <div className="matchup"><div>TEAM A <b>01</b></div><span>VS</span><div><b>02</b> TEAM B</div></div>
      <div className="tournament-arch">⌒</div>
      <div className="tournament-footer">LOGIC. PRESSURE. VICTORY.</div>
    </div>}
    {type === 'aerolab' && <div className="aero-scene">
      <div className="aero-header"><span>AEROLAB / SYSTEMS</span><span className="aero-online">● LIVE</span></div>
      <div className="aero-panel"><div className="aero-panel-label">PLANT HEALTH INDEX</div><div className="aero-data">92<span>%</span></div><div className="aero-meter"><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/></div></div>
      <div className="aero-wire"><i/><i/><i/><i/><i/><i/><i/></div>
      <div className="aero-bottom"><span>SENSOR / NETWORK / GROW</span><span>ESP32 / MQTT</span></div>
    </div>}
    {type === 'healance' && <div className="health-scene">
      <div className="health-header"><span>HEALANCE / EMERGENCY SYSTEM</span><span>● SIMULATION</span></div>
      <div className="health-core"><span>+</span><div className="health-ring-a"/><div className="health-ring-b"/></div>
      <svg className="heartbeat" viewBox="0 0 700 100" preserveAspectRatio="none"><path d="M0 50 L132 50 L154 38 L173 61 L204 8 L242 93 L270 50 L380 50 L395 45 L411 52 L435 20 L460 75 L478 50 L700 50" fill="none" stroke="currentColor" strokeWidth="2.3"/></svg>
      <div className="health-bottom"><span>DETECT → LOCATE → RESPOND</span><span>SOS / 01</span></div>
    </div>}
    {type === 'imalex' && <div className="imalex-scene">
      <div className="imalex-top"><span>IMALEX / ALGERIA</span><span>NATURAL FORMULATION + R&amp;D</span></div>
      <div className="imalex-copy"><strong>Science meets<br/><em>nature.</em></strong><span>Research-led solutions for a more sustainable future.</span></div>
      <svg className="imalex-art" viewBox="0 0 420 420" aria-hidden="true"><circle cx="210" cy="210" r="150"/><circle cx="210" cy="210" r="108"/><path d="M211 306c-2-109 19-166 88-202-2 95-26 159-88 202Zm-1-3c-62-31-87-92-89-176 65 29 93 80 89 176Z"/><path d="M211 306c-6-71-1-121 36-173m-37 170c-15-63-32-103-62-137"/><circle cx="210" cy="210" r="6"/><circle cx="298" cy="103" r="5"/><circle cx="121" cy="127" r="5"/></svg>
      <div className="imalex-bottom"><span>COSMETICS</span><span>NUTRACEUTICALS</span><span>AGRI-FOOD</span><span>+ MORE</span></div>
    </div>}
  </div>
}
