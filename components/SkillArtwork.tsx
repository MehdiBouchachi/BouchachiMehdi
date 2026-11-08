/* One ring slot per skill, centred on the side its path arrives from: interface (left), data (top), systems (right). */
const SLOT_CENTRES=[150,270,30];
function slots(cx:number,cy:number,r:number){
 const pt=(a:number)=>{const t=a*Math.PI/180;return `${(cx+r*Math.cos(t)).toFixed(2)} ${(cy+r*Math.sin(t)).toFixed(2)}`;};
 return SLOT_CENTRES.map(c=>`M${pt(c-54)}A${r} ${r} 0 0 1 ${pt(c+54)}`);
}
function CoreSlots({cx,cy,r}:{cx:number;cy:number;r:number}){
 return <><circle className="skill-art-slot-track" cx={cx} cy={cy} r={r}/>{slots(cx,cy,r).map(d=><path key={d} className="skill-art-slot" d={d}/>)}</>;
}

/* Icons share one drawing for desktop and mobile; .skill-art-detail is the finer secondary line work.
   Each has one small action, played when its skill sets off (the loop adds .is-active). */
function InterfaceIcon({transform}:{transform:string}){
 return <g className="skill-art-icon skill-art-icon-interface" transform={transform}>
  <rect x="-27" y="-19" width="54" height="39" rx="2"/><path d="M-27 -8H27"/>
  <g className="skill-art-detail">
   <circle cx="-22" cy="-13.5" r="1"/><circle cx="-18" cy="-13.5" r="1"/><circle cx="-14" cy="-13.5" r="1"/>
   <rect x="-8" y="-16" width="31" height="5" rx="2.5"/>
   <path d="M-13 -8V20M-22 -3h5M-22 2h5M-22 7h5"/>
  </g>
  <path className="skill-art-render" pathLength={1} d="M-8 -2H14"/>
  <path className="skill-art-detail skill-art-render" pathLength={1} d="M-8 4H20"/>
  <path className="skill-art-detail skill-art-render" pathLength={1} d="M-8 9H12"/>
  <rect className="skill-art-detail skill-art-button" x="-8" y="13" width="13" height="4" rx="1"/>
 </g>;
}
function DataIcon({transform}:{transform:string}){
 return <g className="skill-art-icon skill-art-icon-data" transform={transform}>
  <path d="M-26 -13c0-9 52-9 52 0s-52 9-52 0Zm0 0v28c0 9 52 9 52 0v-28M-26 1c0 9 52 9 52 0"/>
  <path className="skill-art-detail" d="M-18 0h12M-18 3.5h7M-18 14h12M-18 17.5h7"/>
  <circle className="skill-art-detail skill-art-led" cx="17" cy="1.5" r="1.7"/>
  <circle className="skill-art-detail skill-art-led" cx="17" cy="15.5" r="1.7"/>
 </g>;
}
function SystemsIcon({transform}:{transform:string}){
 return <g className="skill-art-icon skill-art-icon-systems" transform={transform}>
  <rect x="-19" y="-19" width="38" height="38" rx="2"/>
  <path d="M-9 -27v8M0 -27v8M9 -27v8M-9 19v8M0 19v8M9 19v8M-27 -9h8M-27 0h8M-27 9h8M19 -9h8M19 0h8M19 9h8M-8 -8H8V8H-8z"/>
  <circle className="skill-art-detail" cx="-14" cy="-14" r="1.4"/>
  <path className="skill-art-detail skill-art-trace" pathLength={1} d="M8 -8l6 -6M8 8l6 6M-8 8l-6 6"/>
  <circle className="skill-art-detail skill-art-die" cx="0" cy="0" r="2.4"/>
 </g>;
}

export default function SkillArtwork(){
 return <div className="skill-artwork" data-reveal>
  <svg className="skill-artwork-desktop" viewBox="0 0 1000 205" role="img" aria-labelledby="skill-art-title" preserveAspectRatio="xMidYMid meet">
   <title id="skill-art-title">Interface, data, and systems come together to make a working product</title>
   <path className="skill-art-guide" d="M25 150H975M250 18V180M500 18V180M750 18V180"/>
   <InterfaceIcon transform="translate(145 32)"/>
   <DataIcon transform="translate(500 32)"/>
   <SystemsIcon transform="translate(855 32)"/>
   <text className="skill-art-label" x="145" y="90" textAnchor="middle">INTERFACE</text><text className="skill-art-label" x="500" y="90" textAnchor="middle">DATA</text><text className="skill-art-label" x="855" y="90" textAnchor="middle">SYSTEMS</text>
   <path className="skill-art-path" d="M145 104C145 150 355 132 478 158"/><path className="skill-art-path" d="M500 104V149"/><path className="skill-art-path" d="M855 104C855 150 645 132 522 158"/>
   <circle className="skill-art-traveler" cx="0" cy="0" r="4"/><circle className="skill-art-traveler" cx="0" cy="0" r="4"/><circle className="skill-art-traveler" cx="0" cy="0" r="4"/>
   <circle className="skill-art-node" cx="145" cy="104" r="3"/><circle className="skill-art-node" cx="500" cy="104" r="3"/><circle className="skill-art-node" cx="855" cy="104" r="3"/>
   <circle className="skill-art-halo" cx="500" cy="159" r="18"/><CoreSlots cx={500} cy={159} r={27}/><path className="skill-art-core-shape" d="M500 143l16 16-16 16-16-16z"/><circle className="skill-art-core-dot" cx="500" cy="159" r="3"/>
   <path className="skill-art-output-beam" d="M500 176V183"/><circle className="skill-art-output-node" cx="500" cy="184" r="2"/>
   <text className="skill-art-output" x="500" y="198" textAnchor="middle">ONE WORKING PRODUCT</text>
  </svg>
  <svg className="skill-artwork-mobile" viewBox="0 0 320 210" role="img" aria-labelledby="skill-art-mobile-title" preserveAspectRatio="xMidYMid meet">
   <title id="skill-art-mobile-title">Interface, data, and systems combine into a working product</title>
   <path className="skill-art-guide" d="M15 145H305"/>
   <InterfaceIcon transform="translate(48 40) scale(.76)"/>
   <DataIcon transform="translate(160 40) scale(.76)"/>
   <SystemsIcon transform="translate(272 40) scale(.76)"/>
   <text className="skill-art-label" x="48" y="81" textAnchor="middle">INTERFACE</text><text className="skill-art-label" x="160" y="81" textAnchor="middle">DATA</text><text className="skill-art-label" x="272" y="81" textAnchor="middle">SYSTEMS</text>
   <path className="skill-art-path" d="M48 94C48 133 115 131 148 149"/><path className="skill-art-path" d="M160 94V143"/><path className="skill-art-path" d="M272 94C272 133 205 131 172 149"/>
   <circle className="skill-art-traveler" cx="0" cy="0" r="3"/><circle className="skill-art-traveler" cx="0" cy="0" r="3"/><circle className="skill-art-traveler" cx="0" cy="0" r="3"/>
   <circle className="skill-art-halo" cx="160" cy="152" r="15"/><CoreSlots cx={160} cy={152} r={22}/><path className="skill-art-core-shape" d="M160 139l13 13-13 13-13-13z"/><circle className="skill-art-core-dot" cx="160" cy="152" r="2.5"/>
   <path className="skill-art-output-beam" d="M160 166V180"/><circle className="skill-art-output-node" cx="160" cy="181" r="2"/>
   <text className="skill-art-output" x="160" y="194" textAnchor="middle">ONE WORKING PRODUCT</text>
  </svg>
 </div>
}
