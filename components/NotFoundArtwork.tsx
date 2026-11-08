'use client';

import type {CSSProperties} from 'react';
import {usePathname} from 'next/navigation';

/* 5x7 dot-matrix glyphs. In the zero, "2" marks the slash drawn in the accent colour. */
const GLYPHS: Record<string, string[]> = {
  '4': ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
  '0': ['01110', '10001', '10021', '10201', '12001', '10001', '01110'],
};
const CX = 320;
const CY = 245;
const PITCH = 10;
const CELL = 8;
const DIGIT_STRIDE = 64;
const MATRIX_W = DIGIT_STRIDE * 2 + PITCH * 5 - (PITCH - CELL);
const MATRIX_X = CX - MATRIX_W / 2;
const MATRIX_Y = CY - (PITCH * 7 - (PITCH - CELL)) / 2;
const SWEEP = 6; // seconds per radar revolution — everything the beam touches is timed from this

/* Deterministic pseudo-random so server and client markup match. */
const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
/* When the beam (starting at 0°, turning clockwise) passes a point. */
const sweepDelay = (x: number, y: number) => {
  const angle = (Math.atan2(y - CY, x - CX) * 180 / Math.PI + 360) % 360;
  return `${(angle / 360 * SWEEP).toFixed(3)}s`;
};

type Cell = {x: number; y: number; on: boolean; accent: boolean; i: number};
const CELLS: Cell[] = ['4', '0', '4'].flatMap((digit, d) =>
  GLYPHS[digit].flatMap((row, r) =>
    row.split('').map((bit, c) => ({
      x: MATRIX_X + d * DIGIT_STRIDE + c * PITCH,
      y: MATRIX_Y + r * PITCH,
      on: bit !== '0',
      accent: bit === '2',
      i: d * 35 + r * 5 + c,
    })),
  ),
);

/* Compass ring ticks every 5°, long ticks every 30°. */
const TICKS = Array.from({length: 72}, (_, i) => {
  const a = (i * 5 * Math.PI) / 180;
  const inner = i % 6 === 0 ? 148 : 154;
  const p = (r: number) => `${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`;
  return `M${p(inner)}L${p(160)}`;
}).join('');

const ROUTE = 'M66 245H194A126 126 0 0 0 383 354C430 327 480 371 571 371';
const LOOP = '5.2s'; // one request lifecycle; CSS keyframes on .nf-matrix/.nf-cross/.nf-glitch share this period
const ORBIT_TEXT = 'FIG. 404 — ROUTE ANALYSIS — NO MATCH IN INDEX — REROUTING TO / — GOOD SYSTEMS LEAVE A WAY BACK — ';
const TAIL = [1, 2, 3, 4, 5, 6];

/* The live status line: [label, start, end, tone] as fractions of LOOP. */
const STATUS: [string, number, number, string][] = [
  ['RESOLVING ROUTE…', 0, .28, 'nf-status-dim'],
  ['404 · NO MATCH', .28, .42, 'nf-status-hit'],
  ['REROUTING VIA /', .42, .9, 'nf-status-blue'],
  ['200 · WELCOME HOME', .9, 1, 'nf-status-blue'],
];
const statusOpacity = (a: number, b: number) =>
  a === 0 ? {values: '1;0', keyTimes: `0;${b}`} : b === 1 ? {values: '0;1', keyTimes: `0;${a}`} : {values: '0;1;0', keyTimes: `0;${a};${b}`};

const SATELLITES = [
  {label: '/WORK', x: 120, y: 96, line: 'M124 100H170L207 132', lx: 104, ly: 82},
  {label: '/ABOUT', x: 520, y: 96, line: 'M516 100H470L433 132', lx: 482, ly: 82},
  {label: '/GALLERY', x: 120, y: 394, line: 'M124 398H170L207 358', lx: 94, ly: 424},
];

function Matrix({ghost = false}: {ghost?: boolean}) {
  return <>
    {CELLS.map(cell => {
      const scan = sweepDelay(cell.x + CELL / 2, cell.y + CELL / 2);
      if (!cell.on) return ghost ? null : <rect key={cell.i} className="nf-ghost" x={cell.x + .5} y={cell.y + .5} width={CELL - 1} height={CELL - 1} rx="1" style={{'--s': scan} as CSSProperties} />;
      const style = {
        '--s': scan,
        '--d': `${Math.round(250 + rand(cell.i) * 700)}ms`,
        '--dx': `${Math.round((rand(cell.i + 99) - .5) * 260)}px`,
        '--dy': `${Math.round((rand(cell.i + 7) - .5) * 200)}px`,
        '--r': `${Math.round((rand(cell.i + 3) - .5) * 180)}deg`,
      } as CSSProperties;
      return <rect key={cell.i} className={cell.accent ? 'nf-cell nf-cell-accent' : 'nf-cell'} x={cell.x} y={cell.y} width={CELL} height={CELL} rx="1" style={style} />;
    })}
  </>;
}

export default function NotFoundArtwork() {
  const pathname = usePathname() || '/';
  const shownPath = pathname.length > 16 ? `${pathname.slice(0, 15)}…` : pathname;

  return <div className="not-found-art" aria-label={`Diagram: the request for ${pathname} finds no route and is redirected home`} role="img">
    <div className="not-found-art-top"><span>FIG. 404 / ROUTE ANALYSIS</span><span><i className="nf-live" />STATUS: RECOVERABLE</span></div>
    <svg viewBox="0 0 640 490" fill="none" aria-hidden="true">
      <defs>
        <pattern id="nf-dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r=".9" /></pattern>
        <linearGradient id="nf-sweep-fill" gradientUnits="userSpaceOnUse" x1="150" y1="18" x2="104" y2="-118">
          <stop offset="0" stopColor="currentColor" stopOpacity=".28" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="nf-core-glow">
          <stop offset="0" stopColor="currentColor" stopOpacity=".1" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* paper */}
      <rect className="nf-dots" width="640" height="490" fill="url(#nf-dots)" />
      <path className="nf-grid" d="M0 80H640M0 160H640M0 240H640M0 320H640M0 400H640M80 0V490M160 0V490M240 0V490M320 0V490M400 0V490M480 0V490M560 0V490" />
      <path className="nf-guide" d="M40 245H600M320 40V450" />

      {/* instrument */}
      <circle cx={CX} cy={CY} r="170" fill="url(#nf-core-glow)" />
      <g transform={`translate(${CX} ${CY})`}>
        <g className="nf-sweep"><path d="M0 0L160 0A160 160 0 0 0 122.6 -102.8Z" fill="url(#nf-sweep-fill)" /><path className="nf-sweep-edge" d="M0 0H160" /></g>
        <path className="nf-ticks" d={TICKS} />
        <circle className="nf-ring nf-ring-outer" r="160" />
        <circle className="nf-ring nf-ring-dash" r="126" />
        <circle className="nf-ring nf-ring-inner" r="100" />
        <path className="nf-ring-markers" d="M0 -172V-164M172 0H164M0 172V164M-172 0H-164" />
        <path id="nf-orbit-path" d="M0 -184A184 184 0 1 1 0 184A184 184 0 1 1 0 -184" />
        <g className="nf-orbit-text">
          <text className="nf-label nf-label-orbit"><textPath href="#nf-orbit-path" textLength="1150" lengthAdjust="spacing">{ORBIT_TEXT + ORBIT_TEXT}</textPath></text>
        </g>
      </g>

      {/* network */}
      {SATELLITES.map(s => <g key={s.label} className="nf-sat" style={{'--s': sweepDelay(s.x, s.y + 4)} as CSSProperties}>
        <path className="nf-sat-line" d={s.line} />
        <circle className="nf-sat-blip" cx={s.x} cy={s.y + 4} r="14" />
        <rect className="nf-sat-node" x={s.x - 4} y={s.y} width="8" height="8" />
        <text className="nf-label nf-label-sm" x={s.lx} y={s.ly}>{s.label}</text>
      </g>)}

      <path className="nf-route-base" d={ROUTE} />
      <path className="nf-route-trail" d={ROUTE} pathLength={1}>
        <animate attributeName="stroke-dashoffset" values="1;0.784;0.784;0;0" keyTimes="0;0.28;0.42;0.9;1" dur={LOOP} repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.9;1" dur={LOOP} repeatCount="indefinite" />
      </path>

      {/* the dead end */}
      <path className="nf-dead" d="M194 245H222" />
      <path className="nf-cross" d="M205 240l7 10M212 240l-7 10" />

      <circle className="nf-node" cx="66" cy="245" r="6" />
      <circle className="nf-node nf-node-home" cx="571" cy="371" r="6" />

      <circle className="nf-ping" cx="194" cy="245" r="4">
        <animate attributeName="r" values="4;4;28;4" keyTimes="0;0.28;0.42;1" dur={LOOP} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.279;0.28;0.42;1" dur={LOOP} repeatCount="indefinite" />
      </circle>
      <circle className="nf-ping" cx="571" cy="371" r="6">
        <animate attributeName="r" values="6;6;32" keyTimes="0;0.9;1" dur={LOOP} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0;1;0" keyTimes="0;0.899;0.9;1" dur={LOOP} repeatCount="indefinite" />
      </circle>

      {/* the failed attempt dissolves; the request is rerouted */}
      <circle className="nf-packet-ghost" r="4">
        <animateMotion path="M194 245H228" keyPoints="0;0;1;1" keyTimes="0;0.28;0.4;1" calcMode="linear" dur={LOOP} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.28;0.3;0.4;1" dur={LOOP} repeatCount="indefinite" />
      </circle>
      {TAIL.map(k => {
        const begin = `${(k * .045).toFixed(3)}s`;
        const peak = (.55 - k * .08).toFixed(2);
        return <circle key={k} className="nf-packet-tail" r={4.4 - k * .5} visibility="hidden">
          <set attributeName="visibility" to="visible" begin={begin} fill="freeze" />
          <animateMotion path={ROUTE} keyPoints="0;0.216;0.216;1;1" keyTimes="0;0.28;0.42;0.9;1" calcMode="linear" dur={LOOP} begin={begin} repeatCount="indefinite" />
          <animate attributeName="opacity" values={`${peak};${peak};0;0`} keyTimes="0;0.9;0.93;1" dur={LOOP} begin={begin} repeatCount="indefinite" />
        </circle>;
      })}
      <g className="nf-packet">
        <circle className="nf-packet-halo" r="11" />
        <circle r="4.5" />
        <animateMotion path={ROUTE} keyPoints="0;0.216;0.216;1;1" keyTimes="0;0.28;0.42;0.9;1" calcMode="linear" dur={LOOP} repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.9;0.93;1" dur={LOOP} repeatCount="indefinite" />
      </g>

      <text className="nf-label nf-label-path" x="40" y="222">GET {shownPath}</text>
      {STATUS.map(([label, a, b, tone]) => <text key={label} className={`nf-label nf-label-sm ${tone}`} x="40" y="274" opacity={a === 0 ? 1 : 0}>
        {label}
        <animate attributeName="opacity" calcMode="discrete" dur={LOOP} repeatCount="indefinite" {...statusOpacity(a, b)} />
      </text>)}
      <text className="nf-label nf-label-sm" x="527" y="400">HOME</text>

      {/* the matrix */}
      <g className="nf-matrix"><Matrix /></g>
      <g className="nf-glitch nf-glitch-a"><Matrix ghost /></g>
      <g className="nf-glitch nf-glitch-b"><Matrix ghost /></g>
      <text className="nf-label nf-label-sm nf-label-blue nf-caption" x={CX} y="312" textAnchor="middle">NO ROUTE MATCHED</text>

      <path className="nf-corners" d="M28 48V28H48M592 28H612V48M28 442V462H48M592 462H612V442" />
      <text className="nf-label nf-label-sm nf-label-blue" x={CX} y="42" textAnchor="middle">ROUTE NOT FOUND</text>
      <text className="nf-label nf-label-sm nf-label-blue nf-recalc" x={CX} y="458" textAnchor="middle">RECALCULATING<tspan>.</tspan><tspan>.</tspan><tspan>.</tspan></text>
    </svg>
    <div className="not-found-art-bottom"><span>01 / UNKNOWN PATH</span><span>02 / A WAY BACK</span></div>
  </div>;
}
