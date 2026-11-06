export default function ContactArtwork(){
 return <div className="contact-artwork" aria-hidden="true">
  <svg viewBox="0 0 1200 190" preserveAspectRatio="xMidYMid meet">
   <defs><pattern id="contact-grid" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="white" opacity=".26"/></pattern></defs>
   <rect width="1200" height="190" fill="url(#contact-grid)" opacity=".6"/>
   <g className="contact-art-circuit" fill="none" stroke="white" strokeWidth="1.2" opacity=".65">
    <path d="M210 47h120v48h187M210 143h120V95h187M990 47H870v48H683M990 143H870V95H683"/>
    <path d="M490 95h-75M710 95h75M600 0v40M600 150v40" strokeDasharray="3 6"/>
   </g>
   <g className="contact-art-traces" fill="none" stroke="white" strokeWidth="1.8">
    <path d="M210 47h120v48h187"/>
    <path d="M210 143h120V95h187"/>
    <path d="M990 47H870v48H683"/>
    <path d="M990 143H870V95H683"/>
   </g>
   <g className="contact-art-module" transform="translate(70 25)"><rect width="140" height="44"/><path d="M15 23h32m9 0h12m10 0h44"/><circle cx="102" cy="23" r="5"/></g>
   <g className="contact-art-module" transform="translate(70 121)"><rect width="140" height="44"/><path d="M15 23h20m10 0h45m9 0h23"/><circle cx="55" cy="23" r="5"/></g>
   <g className="contact-art-module" transform="translate(990 25)"><rect width="140" height="44"/><path d="M15 23h38m9 0h17m10 0h33"/><circle cx="70" cy="23" r="5"/></g>
   <g className="contact-art-module" transform="translate(990 121)"><rect width="140" height="44"/><path d="M15 23h25m9 0h28m10 0h35"/><circle cx="98" cy="23" r="5"/></g>
   <g className="contact-art-core" transform="translate(600 95)">
    <circle className="contact-art-orbit" r="63"/><circle className="contact-art-orbit" r="52"/>
    <rect x="-34" y="-34" width="68" height="68" rx="2"/>
    <path d="M-20-8h40M-20 0h24M-20 8h40"/>
    <circle className="contact-art-core-dot" cx="18" cy="0" r="3"/>
   </g>
   <g className="contact-art-pulses" fill="white"><circle r="4"/><circle r="4"/><circle r="4"/><circle r="4"/></g>
   <g className="contact-art-signal" fill="white"><circle cx="330" cy="95" r="3"/><circle cx="870" cy="95" r="3"/><circle cx="600" cy="40" r="3"/><circle cx="600" cy="150" r="3"/></g>
  </svg>
 </div>
}
