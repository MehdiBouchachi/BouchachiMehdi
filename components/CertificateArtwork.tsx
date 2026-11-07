export default function CertificateArtwork(){
 return <div className="certificate-artwork" aria-hidden="true">
  <svg viewBox="0 0 430 205" role="presentation">
   <g className="certificate-art-base">
    <path className="certificate-art-shadow" d="M78 38h272v145H78z"/>
    <path className="certificate-art-index" d="M350 46h48m-48 55h48m-48 55h48"/>
    <circle className="certificate-art-index-dot" cx="350" cy="46" r="3"/>
    <circle className="certificate-art-index-dot" cx="350" cy="101" r="3"/>
    <circle className="certificate-art-index-dot" cx="350" cy="156" r="3"/>
   </g>
   <path className="certificate-art-back" d="M59 28h272v145H59z"/>
   <path className="certificate-art-paper" d="M39 17h272v145H39z"/>
   <path className="certificate-art-corner" d="M49 27h16m-16 0v16m252-16h-16m16 0v16M49 152h16m-16 0v-16m252 16h-16m16 0v-16"/>
   <text className="certificate-art-heading" x="67" y="43">CERTIFICATE</text>
   <path className="certificate-art-rule" d="M67 51h72M67 67h172M67 80h143M67 104h130M67 116h95"/>
   <path className="certificate-art-signature" d="M68 137c14-20 17 12 29-5 5-7 5 2 14-5 8-7 7 4 17 0"/>
   <g transform="translate(246 115)"><g className="certificate-art-seal">
    <path className="certificate-art-ribbon" d="M-15 18-26 49l20-8 9 19 11-37M15 18l26 31-20-8-9 19-11-37"/>
    <circle r="30"/><circle r="22"/>
    <path d="m0-13 4 9 10 2-7 7 2 10L0 10l-9 5 2-10-7-7 10-2z"/>
   </g></g>
   <g className="certificate-art-spark"><path d="M246 72v-9m-43 52h-9m94 0h9m-15-35 6-6m-82 6-6-6"/></g>
  </svg>
  <div className="certificate-artwork-caption"><span>HACKATHONS</span><span>COMMUNITY</span><span>UNIVERSITY</span></div>
 </div>
}
