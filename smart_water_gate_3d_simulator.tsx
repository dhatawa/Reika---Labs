import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as THREE from 'three';

// ============================================================================
// 0. SELF-CONTAINED INLINE SVG ICONS & INTERACTIVE SVG TELEMETRY CHART
// (Avoids external forwardRef module-interop issues in the browser sandbox)
// ============================================================================
function SvgIcon({ children, className = 'h-4 w-4', style }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {children}
    </svg>
  );
}

const Waves = (p) => <SvgIcon {...p}><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /></SvgIcon>;
const Activity = (p) => <SvgIcon {...p}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></SvgIcon>;
const Cpu = (p) => <SvgIcon {...p}><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" /></SvgIcon>;
const Cloud = (p) => <SvgIcon {...p}><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /></SvgIcon>;
const Wifi = (p) => <SvgIcon {...p}><path d="M5 13a10 10 0 0 1 14 0" /><path d="M8.5 16.5a5 5 0 0 1 7 0" /><path d="M2 8.82a15 15 0 0 1 20 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></SvgIcon>;
const WifiOff = (p) => <SvgIcon {...p}><line x1="2" y1="2" x2="22" y2="22" /><path d="M8.5 16.5a5 5 0 0 1 7 0" /><path d="M2 8.82a15 15 0 0 1 4.17-2.65" /><path d="M10.66 5c4.01-.36 8.14.9 11.34 3.76" /><path d="M16.85 11.25a10 10 0 0 1 2.22 1.68" /><path d="M5 13a10 10 0 0 1 5.24-2.76" /><line x1="12" y1="20" x2="12.01" y2="20" /></SvgIcon>;
const Sliders = (p) => <SvgIcon {...p}><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></SvgIcon>;
const Code2 = (p) => <SvgIcon {...p}><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></SvgIcon>;
const Eye = (p) => <SvgIcon {...p}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></SvgIcon>;
const Copy = (p) => <SvgIcon {...p}><rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></SvgIcon>;
const Check = (p) => <SvgIcon {...p}><polyline points="20 6 9 17 4 12" /></SvgIcon>;
const Download = (p) => <SvgIcon {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></SvgIcon>;
const FolderTree = (p) => <SvgIcon {...p}><path d="M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z" /><path d="M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z" /><path d="M3 5a2 2 0 0 0 2 2h3" /><path d="M3 3v13a2 2 0 0 0 2 2h3" /></SvgIcon>;
const FileCode = (p) => <SvgIcon {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="m10 13-2 2 2 2" /><path d="m14 17 2-2-2-2" /></SvgIcon>;
const Play = (p) => <SvgIcon {...p}><polygon points="5 3 19 12 5 21 5 3" /></SvgIcon>;
const Square = (p) => <SvgIcon {...p}><rect width="14" height="14" x="5" y="5" rx="2" /></SvgIcon>;
const ArrowUp = (p) => <SvgIcon {...p}><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></SvgIcon>;
const ArrowDown = (p) => <SvgIcon {...p}><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></SvgIcon>;
const RotateCcw = (p) => <SvgIcon {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></SvgIcon>;
const Compass = (p) => <SvgIcon {...p}><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></SvgIcon>;
const Droplets = (p) => <SvgIcon {...p}><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" /><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" /></SvgIcon>;
const Gauge = (p) => <SvgIcon {...p}><path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></SvgIcon>;
const Home = (p) => <SvgIcon {...p}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></SvgIcon>;
const Trees = (p) => <SvgIcon {...p}><path d="M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" /><path d="M7 16v6" /><path d="M13 19v3" /><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5" /></SvgIcon>;
const AlertTriangle = (p) => <SvgIcon {...p}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></SvgIcon>;
const ShieldCheck = (p) => <SvgIcon {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></SvgIcon>;
const RefreshCw = (p) => <SvgIcon {...p}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></SvgIcon>;
const ChevronRight = (p) => <SvgIcon {...p}><polyline points="9 18 15 12 9 6" /></SvgIcon>;
const ChevronDown = (p) => <SvgIcon {...p}><polyline points="6 9 12 15 18 9" /></SvgIcon>;
const PanelLeftClose = (p) => <SvgIcon {...p}><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /><path d="m16 15-3-3 3-3" /></SvgIcon>;
const PanelLeftOpen = (p) => <SvgIcon {...p}><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /><path d="m14 9 3 3-3 3" /></SvgIcon>;
const PanelRightClose = (p) => <SvgIcon {...p}><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M15 3v18" /><path d="m8 9 3 3-3 3" /></SvgIcon>;
const PanelRightOpen = (p) => <SvgIcon {...p}><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M15 3v18" /><path d="m10 15-3-3 3-3" /></SvgIcon>;
const Layers = (p) => <SvgIcon {...p}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></SvgIcon>;
const Radio = (p) => <SvgIcon {...p}><circle cx="12" cy="12" r="2" /><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" /></SvgIcon>;
const Info = (p) => <SvgIcon {...p}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></SvgIcon>;

function TelemetryAreaChart({ data }) {
  const [hoverIdx, setHoverIdx] = useState(null);
  const w = 264;
  const h = 148;
  const padL = 24;
  const padR = 8;
  const padT = 8;
  const padB = 20;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;

  const getX = (i) => padL + (data.length > 1 ? (i / (data.length - 1)) * innerW : 0);
  const getY = (val) => padT + innerH - (Math.max(0, Math.min(100, val)) / 100) * innerH;

  const makePath = (key) =>
    data.map((d, i) => `${i === 0 ? 'M' : 'L'}${getX(i).toFixed(1)},${getY(d[key]).toFixed(1)}`).join(' ');

  const makeArea = (key) => {
    if (data.length === 0) return '';
    const line = makePath(key);
    return `${line} L${getX(data.length - 1).toFixed(1)},${(padT + innerH).toFixed(1)} L${getX(0).toFixed(1)},${(padT + innerH).toFixed(1)} Z`;
  };

  const activePoint = hoverIdx !== null && data[hoverIdx] ? data[hoverIdx] : null;

  return (
    <div className="relative h-40 w-full select-none">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-full w-full overflow-visible"
        onMouseLeave={() => setHoverIdx(null)}
      >
        <defs>
          <linearGradient id="svgGradLevel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00D4FF" stopOpacity="0.35" />
            <stop offset="95%" stopColor="#00D4FF" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="svgGradTurb" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FACC15" stopOpacity="0.22" />
            <stop offset="95%" stopColor="#FACC15" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {[0, 50, 100].map((tick) => {
          const y = getY(tick);
          return (
            <g key={tick}>
              <line x1={padL} y1={y} x2={w - padR} y2={y} stroke="rgba(148,163,184,0.14)" strokeDasharray="3 3" />
              <text x={padL - 4} y={y + 3} textAnchor="end" fill="#64748b" fontSize="8" fontFamily="monospace">
                {tick}
              </text>
            </g>
          );
        })}

        <path d={makeArea('level')} fill="url(#svgGradLevel)" />
        <path d={makeArea('turbidity')} fill="url(#svgGradTurb)" />
        <path d={makePath('level')} fill="none" stroke="#00D4FF" strokeWidth="2" />
        <path d={makePath('turbidity')} fill="none" stroke="#FACC15" strokeWidth="1.5" />
        <path d={makePath('flow')} fill="none" stroke="#22C55E" strokeWidth="1.5" />

        {data.length > 0 && [0, Math.floor((data.length - 1) / 2), data.length - 1].map((idx) => (
          <text
            key={idx}
            x={getX(idx)}
            y={h - 4}
            textAnchor={idx === 0 ? 'start' : idx === data.length - 1 ? 'end' : 'middle'}
            fill="#64748b"
            fontSize="8"
            fontFamily="monospace"
          >
            {data[idx]?.time}
          </text>
        ))}

        {hoverIdx !== null && activePoint && (
          <g>
            <line x1={getX(hoverIdx)} y1={padT} x2={getX(hoverIdx)} y2={padT + innerH} stroke="rgba(0,212,255,0.45)" strokeDasharray="2 2" />
            <circle cx={getX(hoverIdx)} cy={getY(activePoint.level)} r="3.5" fill="#00D4FF" />
            <circle cx={getX(hoverIdx)} cy={getY(activePoint.turbidity)} r="3" fill="#FACC15" />
            <circle cx={getX(hoverIdx)} cy={getY(activePoint.flow)} r="3" fill="#22C55E" />
          </g>
        )}

        {data.map((_, i) => (
          <rect
            key={i}
            x={getX(i) - innerW / (Math.max(1, data.length) * 2)}
            y={padT}
            width={innerW / Math.max(1, data.length)}
            height={innerH}
            fill="transparent"
            onMouseEnter={() => setHoverIdx(i)}
          />
        ))}
      </svg>

      {activePoint && (
        <div className="pointer-events-none absolute right-2 top-1 rounded-lg border border-cyan-500/40 bg-[#081522]/95 px-2 py-1 font-mono text-[10px] shadow-lg">
          <div className="text-slate-400">{activePoint.time}</div>
          <div className="text-[#00D4FF]">Level: {activePoint.level}%</div>
          <div className="text-amber-400">Turb: {activePoint.turbidity} NTU</div>
          <div className="text-emerald-400">Flow: {activePoint.flow}%</div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 1. AUTO-CONTROL LOGIC & TELEMETRY HELPERS
// ============================================================================
function computeAutoGateTarget(waterLevel) {
  if (waterLevel <= 35) return { target: 0, rule: 'Level ≤ 35% → Hold Closed (Retention)' };
  if (waterLevel <= 60) {
    const pct = Math.round(((waterLevel - 35) / 25) * 40 + 15);
    return { target: pct, rule: 'Level 36–60% → Controlled Release' };
  }
  if (waterLevel <= 80) {
    const pct = Math.round(((waterLevel - 60) / 20) * 35 + 55);
    return { target: pct, rule: 'Level 61–80% → High-Flow Mitigation' };
  }
  return { target: 100, rule: 'Level > 80% → Full Flood Discharge' };
}

function getLevelStatus(val) {
  if (val >= 80) return { label: 'Critical', color: '#EF4444', bg: 'rgba(239,68,68,0.14)', border: 'rgba(239,68,68,0.4)' };
  if (val >= 60) return { label: 'Warning', color: '#FACC15', bg: 'rgba(250,204,21,0.14)', border: 'rgba(250,204,21,0.4)' };
  return { label: 'Normal', color: '#22C55E', bg: 'rgba(34,197,94,0.14)', border: 'rgba(34,197,94,0.4)' };
}

function getTurbidityStatus(val) {
  if (val >= 70) return { label: 'Critical', color: '#EF4444', bg: 'rgba(239,68,68,0.14)', border: 'rgba(239,68,68,0.4)' };
  if (val >= 40) return { label: 'Warning', color: '#FACC15', bg: 'rgba(250,204,21,0.14)', border: 'rgba(250,204,21,0.4)' };
  return { label: 'Normal', color: '#22C55E', bg: 'rgba(34,197,94,0.14)', border: 'rgba(34,197,94,0.4)' };
}

function getFlowStatus(val) {
  if (val >= 82) return { label: 'Critical', color: '#EF4444', bg: 'rgba(239,68,68,0.14)', border: 'rgba(239,68,68,0.4)' };
  if (val >= 58) return { label: 'Warning', color: '#FACC15', bg: 'rgba(250,204,21,0.14)', border: 'rgba(250,204,21,0.4)' };
  return { label: 'Normal', color: '#22C55E', bg: 'rgba(34,197,94,0.14)', border: 'rgba(34,197,94,0.4)' };
}

// Component descriptions for 3D hover / click inspection
const COMPONENT_INFO = {
  staffGauge: {
    name: 'Staff Gauge',
    role: 'Visual Water Level Reference',
    desc: 'Graduated metric ruler (0.0m – 3.0m) mounted vertically at the upstream edge for direct visual verification.'
  },
  levelSensor: {
    name: 'Ultrasonic Water Level Sensor',
    role: 'Non-Contact Surface Measurement',
    desc: 'Mounted on a cantilevered corrosion-resistant arm facing straight down to measure upstream water height continuously.'
  },
  turbiditySensor: {
    name: 'Submerged Turbidity Sensor',
    role: 'Optical Water Clarity Probe',
    desc: 'Waterproof cylindrical NTU probe suspended underwater to monitor suspended sediment and water clarity.'
  },
  esp32: {
    name: 'ESP32 Controller (IP67)',
    role: 'Edge Telemetry & Control Unit',
    desc: 'Waterproof industrial enclosure housing the ESP32 MCU, sensor conduits, actuator relay driver, and wireless uplink.'
  },
  waterGate: {
    name: 'Automatic Sluice Water Gate',
    role: 'Mechanical Flow Control Plate',
    desc: 'Reinforced stainless-steel sliding gate seated inside vertical steel guide rails embedded in the concrete structure.'
  },
  actuator: {
    name: 'Electric Linear Actuator',
    role: 'Motorized Gate Drive',
    desc: 'Industrial gearbox and motorized threaded lifting screw shaft driving vertical gate elevation smoothly.'
  },
  iotCloud: {
    name: 'IoT Cloud → ML Model → Dashboard',
    role: 'Cloud Telemetry & Predictive Control',
    desc: 'Real-time wireless data pipeline streaming sensor metrics from ESP32 to cloud analytics and live dashboard.'
  }
};

// ============================================================================
// 2. PROCEDURAL CANVAS TEXTURES FOR REALISTIC PBR MATERIALS
// ============================================================================
function createStaffGaugeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#f4f7fb';
  ctx.fillRect(0, 0, 128, 512);

  // Subtle side metallic border
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, 122, 506);

  // Graduated centimeter & decimeter marks
  const totalTicks = 60;
  const stepY = 480 / totalTicks;
  for (let i = 0; i <= totalTicks; i++) {
    const y = 496 - i * stepY;
    const isMajor = i % 10 === 0;
    const isMid = i % 5 === 0 && !isMajor;

    ctx.fillStyle = i >= 48 ? '#dc2626' : '#0f172a';
    const w = isMajor ? 52 : isMid ? 34 : 20;
    const h = isMajor ? 5 : 2.5;
    ctx.fillRect(10, y - h / 2, w, h);

    if (isMajor) {
      const meters = (i / 20).toFixed(1);
      ctx.font = 'bold 20px monospace';
      ctx.fillStyle = i >= 48 ? '#dc2626' : '#0f172a';
      ctx.fillText(`${meters}m`, 66, y + 7);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function createConcreteTexture(baseHex = '#8d969e') {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, 256, 256);

  // Subtle industrial concrete grain & formwork seams
  for (let i = 0; i < 1800; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const shade = Math.random() > 0.5 ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.08)';
    ctx.fillStyle = shade;
    ctx.fillRect(x, y, 2 + Math.random() * 3, 2 + Math.random() * 3);
  }

  ctx.strokeStyle = 'rgba(15,23,42,0.14)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 128);
  ctx.lineTo(256, 128);
  ctx.moveTo(128, 0);
  ctx.lineTo(128, 256);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createIoTNodeTexture(title, subtitle, accentColor = '#00D4FF', online = true) {
  const canvas = document.createElement('canvas');
  canvas.width = 320;
  canvas.height = 112;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 320, 112);

  // Rounded glassmorphic card
  const r = 18;
  ctx.beginPath();
  ctx.moveTo(r + 6, 6);
  ctx.lineTo(314 - r, 6);
  ctx.quadraticCurveTo(314, 6, 314, r + 6);
  ctx.lineTo(314, 106 - r);
  ctx.quadraticCurveTo(314, 106, 314 - r, 106);
  ctx.lineTo(r + 6, 106);
  ctx.quadraticCurveTo(6, 106, 6, 106 - r);
  ctx.lineTo(6, r + 6);
  ctx.quadraticCurveTo(6, 6, r + 6, 6);
  ctx.closePath();

  ctx.fillStyle = online ? 'rgba(8, 25, 44, 0.88)' : 'rgba(20, 24, 34, 0.78)';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = online ? accentColor : '#64748b';
  ctx.stroke();

  // Status indicator dot
  ctx.beginPath();
  ctx.arc(34, 42, 8, 0, Math.PI * 2);
  ctx.fillStyle = online ? accentColor : '#EF4444';
  ctx.fill();

  // Title text
  ctx.font = 'bold 28px Inter, system-ui, sans-serif';
  ctx.fillStyle = online ? '#EAF6FF' : '#94a3b8';
  ctx.fillText(title, 54, 52);

  // Subtitle
  ctx.font = '500 18px monospace';
  ctx.fillStyle = online ? accentColor : '#64748b';
  ctx.fillText(online ? subtitle : 'DISCONNECTED', 54, 82);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createDaySkyTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0.0, '#1e4e8c');
  grad.addColorStop(0.38, '#5ca0d3');
  grad.addColorStop(0.56, '#b7dcf2');
  grad.addColorStop(0.62, '#628378');
  grad.addColorStop(1.0, '#162736');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);

  // Soft distant mountain ridge along horizon
  ctx.fillStyle = '#4e7385';
  ctx.beginPath();
  ctx.moveTo(0, 152);
  for (let x = 0; x <= 512; x += 12) {
    const h = Math.sin(x * 0.025) * 9 + Math.cos(x * 0.055) * 5;
    ctx.lineTo(x, 144 - Math.abs(h));
  }
  ctx.lineTo(512, 160);
  ctx.lineTo(0, 160);
  ctx.closePath();
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ============================================================================
// 3. THREE.JS 3D SCENE COMPONENT (BOTH LAKE & RESIDENTIAL RIVER ENVIRONMENTS)
// ============================================================================
function SmartWater3DCanvas({
  activePage,
  waterLevel,
  turbidity,
  waterFlow,
  gatePosition,
  gateVelocity,
  sensorOnline,
  cameraCommand,
  autoOrbit,
  onHoverComponent
}) {
  const mountRef = useRef(null);
  const [webglError, setWebglError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Keep latest simulation props in a ref so the 60fps loop reads them without rebuilding Three.js
  const simRef = useRef({
    waterLevel,
    turbidity,
    waterFlow,
    gatePosition,
    gateVelocity,
    sensorOnline,
    autoOrbit
  });
  useEffect(() => {
    simRef.current = {
      waterLevel,
      turbidity,
      waterFlow,
      gatePosition,
      gateVelocity,
      sensorOnline,
      autoOrbit
    };
  }, [waterLevel, turbidity, waterFlow, gatePosition, gateVelocity, sensorOnline, autoOrbit]);

  // Camera spherical orbit state stored in ref for smooth damping & presets
  const orbitRef = useRef({
    theta: 0.72,
    phi: 1.08,
    radius: 13.5,
    target: new THREE.Vector3(0, 1.0, 0),
    desiredTheta: 0.72,
    desiredPhi: 1.08,
    desiredRadius: 13.5,
    desiredTarget: new THREE.Vector3(0, 1.0, 0)
  });

  // React to camera preset commands from toolbar
  useEffect(() => {
    if (!cameraCommand) return;
    const o = orbitRef.current;
    if (cameraCommand.type === 'iso' || cameraCommand.type === 'reset') {
      o.desiredTheta = activePage === 'lake' ? 0.72 : 0.68;
      o.desiredPhi = 1.06;
      o.desiredRadius = activePage === 'lake' ? 13.5 : 15.2;
      o.desiredTarget.set(0, 1.1, 0);
    } else if (cameraCommand.type === 'top') {
      o.desiredTheta = 0.02;
      o.desiredPhi = 0.14;
      o.desiredRadius = 17.5;
      o.desiredTarget.set(0, 0.6, 0);
    } else if (cameraCommand.type === 'side') {
      o.desiredTheta = 0.0;
      o.desiredPhi = 1.38;
      o.desiredRadius = 13.8;
      o.desiredTarget.set(0, 1.2, 0);
    }
  }, [cameraCommand, activePage]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // WebGL availability check
    try {
      const testCanvas = document.createElement('canvas');
      if (!(window.WebGLRenderingContext && (testCanvas.getContext('webgl2') || testCanvas.getContext('webgl')))) {
        setWebglError(true);
        setIsLoading(false);
        return;
      }
    } catch {
      setWebglError(true);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Core Three.js setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x9ec5de, 0.015);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 160);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Daylight sky dome
    const skyTex = createDaySkyTexture();
    const skyMesh = new THREE.Mesh(
      new THREE.SphereGeometry(72, 32, 20),
      new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, fog: false })
    );
    scene.add(skyMesh);

    // Natural daylight lighting
    const hemiLight = new THREE.HemisphereLight(0xd9f0ff, 0x3b4d3e, 0.95);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfff7e6, 2.2);
    sunLight.position.set(12, 18, 11);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 2;
    sunLight.shadow.camera.far = 48;
    const d = 14;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x7dd3fc, 0.55);
    fillLight.position.set(-10, 8, -9);
    scene.add(fillLight);

    // Shared PBR Materials
    const concreteTex = createConcreteTexture('#8f99a3');
    const darkConcreteTex = createConcreteTexture('#68727c');
    const staffTex = createStaffGaugeTexture();

    const mats = {
      concrete: new THREE.MeshStandardMaterial({ map: concreteTex, roughness: 0.82, metalness: 0.06 }),
      darkConcrete: new THREE.MeshStandardMaterial({ map: darkConcreteTex, roughness: 0.88, metalness: 0.08 }),
      steel: new THREE.MeshStandardMaterial({ color: 0xb9c5d1, roughness: 0.28, metalness: 0.84 }),
      darkSteel: new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.42, metalness: 0.72 }),
      gatePlate: new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.26, metalness: 0.86 }),
      enclosure: new THREE.MeshStandardMaterial({ color: 0xdce4ed, roughness: 0.35, metalness: 0.25 }),
      staffGauge: new THREE.MeshStandardMaterial({ map: staffTex, roughness: 0.35, metalness: 0.15 }),
      cyanGlow: new THREE.MeshStandardMaterial({ color: 0x00d4ff, emissive: 0x00d4ff, emissiveIntensity: 1.5, roughness: 0.2 }),
      greenGlow: new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x22c55e, emissiveIntensity: 1.6, roughness: 0.2 }),
      redGlow: new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 1.6, roughness: 0.2 }),
      grass: new THREE.MeshStandardMaterial({ color: 0x4b7c42, roughness: 0.92 }),
      soil: new THREE.MeshStandardMaterial({ color: 0x6b5642, roughness: 0.95 }),
      rock: new THREE.MeshStandardMaterial({ color: 0x6d747a, roughness: 0.9 }),
      foliageDark: new THREE.MeshStandardMaterial({ color: 0x2e5e32, roughness: 0.86 }),
      foliageLight: new THREE.MeshStandardMaterial({ color: 0x4d8a42, roughness: 0.86 }),
      trunk: new THREE.MeshStandardMaterial({ color: 0x5c4230, roughness: 0.94 }),
      asphalt: new THREE.MeshStandardMaterial({ color: 0x2c333c, roughness: 0.88 }),
      sidewalk: new THREE.MeshStandardMaterial({ color: 0xb7c0c9, roughness: 0.82 })
    };

    // Helper: tag meshes for hover/click inspection & shadows
    const interactiveMeshes = [];
    function tagPart(obj, partKey) {
      obj.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (partKey) {
            child.userData.partKey = partKey;
            interactiveMeshes.push(child);
          }
        }
      });
    }

    // Helper: low-poly realistic tree
    function createTree(scale = 1) {
      const g = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.11 * scale, 0.16 * scale, 0.95 * scale, 8), mats.trunk);
      trunk.position.y = 0.47 * scale;
      g.add(trunk);

      const crown1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.68 * scale, 1), mats.foliageDark);
      crown1.position.set(0, 1.25 * scale, 0);
      g.add(crown1);

      const crown2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.5 * scale, 1), mats.foliageLight);
      crown2.position.set(0.24 * scale, 1.55 * scale, 0.14 * scale);
      g.add(crown2);

      g.traverse((c) => {
        if (c.isMesh) {
          c.castShadow = true;
          c.receiveShadow = true;
        }
      });
      return g;
    }

    // ========================================================================
    // BUILD SHARED 7 MANDATORY ENGINEERING COMPONENTS AT X = 0
    // ========================================================================
    const isLake = activePage === 'lake';
    const chanHalfW = isLake ? 1.55 : 1.85; // Half-width of water gate opening

    // 5. AUTOMATIC WATER GATE & CONCRETE SLUICE FRAME
    const gateStructure = new THREE.Group();
    scene.add(gateStructure);

    // Concrete piers on both sides of the sluice opening
    const pierHeight = 3.5;
    [-chanHalfW - 0.35, chanHalfW + 0.35].forEach((zPos) => {
      const pier = new THREE.Mesh(new THREE.BoxGeometry(1.15, pierHeight, 0.72), mats.concrete);
      pier.position.set(0, pierHeight / 2 - 0.5, zPos);
      gateStructure.add(pier);

      // Vertical stainless steel U-channel guide rails embedded on inner face of piers
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.22, pierHeight - 0.15, 0.14), mats.steel);
      rail.position.set(0, pierHeight / 2 - 0.5, zPos > 0 ? chanHalfW + 0.02 : -chanHalfW - 0.02);
      gateStructure.add(rail);
    });

    // Concrete sill floor beneath gate
    const sill = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.36, chanHalfW * 2 + 1.4), mats.darkConcrete);
    sill.position.set(0, -0.32, 0);
    gateStructure.add(sill);

    // Top steel crossbeam spanning the two piers (supports actuator & ESP32)
    const crossBeam = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.24, chanHalfW * 2 + 1.44), mats.steel);
    crossBeam.position.set(0, 3.12, 0);
    gateStructure.add(crossBeam);

    // Sliding Automatic Sluice Gate Plate (moves dynamically along Y)
    const gatePlateGroup = new THREE.Group();
    const gateW = chanHalfW * 2 + 0.04;
    const gateH = 2.05;
    const plateMain = new THREE.Mesh(new THREE.BoxGeometry(0.11, gateH, gateW), mats.gatePlate);
    gatePlateGroup.add(plateMain);

    // Horizontal structural reinforcement ribs across gate plate
    [-0.72, -0.22, 0.28, 0.78].forEach((ry) => {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.10, gateW - 0.08), mats.darkSteel);
      rib.position.y = ry;
      gatePlateGroup.add(rib);
    });

    // Top clevis bracket connecting gate plate to actuator screw
    const clevis = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.22, 0.34), mats.darkSteel);
    clevis.position.y = gateH / 2 + 0.1;
    gatePlateGroup.add(clevis);

    gatePlateGroup.position.set(0, 0.88, 0);
    gateStructure.add(gatePlateGroup);
    tagPart(gatePlateGroup, 'waterGate');
    tagPart(gateStructure, 'waterGate');

    // 6. ELECTRIC LINEAR ACTUATOR + THREADED SCREW SHAFT
    const actuatorGroup = new THREE.Group();
    actuatorGroup.position.set(0, 3.24, 0);
    scene.add(actuatorGroup);

    const gearbox = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.44, 0.56), mats.darkSteel);
    gearbox.position.y = 0.22;
    actuatorGroup.add(gearbox);

    // Horizontal cylindrical electric drive motor attached to gearbox
    const motorBody = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.72, 20), mats.steel);
    motorBody.rotation.x = Math.PI / 2;
    motorBody.position.set(0, 0.26, 0.56);
    actuatorGroup.add(motorBody);

    // Cooling fins on motor housing
    for (let f = 0; f < 5; f++) {
      const fin = new THREE.Mesh(new THREE.CylinderGeometry(0.215, 0.215, 0.03, 18), mats.darkSteel);
      fin.rotation.x = Math.PI / 2;
      fin.position.set(0, 0.26, 0.34 + f * 0.11);
      actuatorGroup.add(fin);
    }

    // Rotating threaded vertical screw shaft (moves & spins with gate)
    const screwGroup = new THREE.Group();
    const screwShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.052, 3.2, 16), mats.steel);
    screwShaft.position.y = -0.35;
    screwGroup.add(screwShaft);

    // Visual screw thread rings
    for (let r = 0; r < 24; r++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.058, 0.011, 6, 14), mats.darkSteel);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -1.85 + r * 0.13;
      screwGroup.add(ring);
    }
    actuatorGroup.add(screwGroup);
    tagPart(actuatorGroup, 'actuator');

    // 4. ESP32 CONTROLLER (WATERPROOF IP67 ENCLOSURE)
    const espGroup = new THREE.Group();
    espGroup.position.set(-0.08, 3.36, -chanHalfW - 0.35);
    scene.add(espGroup);

    const espBox = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.44, 0.54), mats.enclosure);
    espGroup.add(espBox);

    const espLid = new THREE.Mesh(new THREE.BoxGeometry(0.70, 0.07, 0.58), mats.steel);
    espLid.position.y = 0.23;
    espGroup.add(espLid);

    // Status LED on front face of ESP32 enclosure
    const espLedMat = mats.greenGlow.clone();
    const espLed = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), espLedMat);
    espLed.position.set(0, 0.05, 0.28);
    espGroup.add(espLed);

    // External Wi-Fi / IoT telemetry antenna
    const antennaBase = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.08, 12), mats.darkSteel);
    antennaBase.position.set(0.16, 0.30, -0.10);
    espGroup.add(antennaBase);
    const antennaRod = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.018, 0.52, 10), mats.darkSteel);
    antennaRod.position.set(0.16, 0.58, -0.10);
    espGroup.add(antennaRod);
    tagPart(espGroup, 'esp32');

    // 2. WATER LEVEL SENSOR (CANTILEVERED OVER UPSTREAM WATER)
    const levelSensorGroup = new THREE.Group();
    scene.add(levelSensorGroup);

    const armZ = -chanHalfW - 0.18;
    // Horizontal stainless steel cantilevered arm extending upstream (-X)
    const horizArm = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.09, 0.09), mats.steel);
    horizArm.position.set(-1.35, 2.75, armZ);
    levelSensorGroup.add(horizArm);

    // Diagonal gusset brace back to concrete pier
    const brace = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.07, 0.07), mats.steel);
    brace.position.set(-0.72, 2.38, armZ);
    brace.rotation.z = 0.72;
    levelSensorGroup.add(brace);

    // Ultrasonic sensor head facing straight down
    const sensorHousing = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 0.22), mats.enclosure);
    sensorHousing.position.set(-2.45, 2.66, armZ);
    levelSensorGroup.add(sensorHousing);

    const ultrasonicCone = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.085, 0.14, 16), mats.darkSteel);
    ultrasonicCone.position.set(-2.45, 2.50, armZ);
    levelSensorGroup.add(ultrasonicCone);

    // Neat conduit pipe connecting level sensor arm into ESP32 box
    const levelConduit = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.65, 10), mats.steel);
    levelConduit.position.set(-0.28, 3.06, armZ - 0.06);
    levelConduit.rotation.z = -0.35;
    levelSensorGroup.add(levelConduit);

    // Dynamic cyan ultrasonic beam hitting upstream water surface
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.42
    });
    const ultrasonicBeam = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.16, 1.0, 16, 1, true), beamMat);
    ultrasonicBeam.position.set(-2.45, 1.6, armZ);
    scene.add(ultrasonicBeam);

    // Ultrasonic water surface target ripple ring
    const rippleRingMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide
    });
    const rippleRing = new THREE.Mesh(new THREE.RingGeometry(0.12, 0.20, 24), rippleRingMat);
    rippleRing.rotation.x = -Math.PI / 2;
    rippleRing.position.set(-2.45, 1.0, armZ);
    scene.add(rippleRing);
    tagPart(levelSensorGroup, 'levelSensor');

    // 3. TURBIDITY SENSOR (SUBMERGED IN UPSTREAM WATER)
    const turbidityGroup = new THREE.Group();
    scene.add(turbidityGroup);

    const turbZ = -chanHalfW + 0.36;
    const turbX = -1.35;
    // Stainless steel vertical conduit pipe descending into water
    const turbPipeVert = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 2.95, 12), mats.steel);
    turbPipeVert.position.set(turbX, 1.68, turbZ);
    turbidityGroup.add(turbPipeVert);

    // Horizontal conduit run back to ESP32 enclosure
    const turbPipeHoriz = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 1.32, 12), mats.steel);
    turbPipeHoriz.rotation.z = Math.PI / 2;
    turbPipeHoriz.position.set(-0.72, 3.12, turbZ);
    turbidityGroup.add(turbPipeHoriz);

    const turbPipeCross = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.72, 12), mats.steel);
    turbPipeCross.rotation.x = Math.PI / 2;
    turbPipeCross.position.set(-0.08, 3.12, turbZ - 0.34);
    turbidityGroup.add(turbPipeCross);

    // Submerged cylindrical waterproof optical turbidity probe
    const turbProbe = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.085, 0.42, 18), mats.darkSteel);
    turbProbe.position.set(turbX, 0.25, turbZ);
    turbidityGroup.add(turbProbe);

    const turbLedMat = mats.cyanGlow.clone();
    const turbRing = new THREE.Mesh(new THREE.TorusGeometry(0.098, 0.022, 8, 20), turbLedMat);
    turbRing.rotation.x = Math.PI / 2;
    turbRing.position.set(turbX, 0.16, turbZ);
    turbidityGroup.add(turbRing);
    tagPart(turbidityGroup, 'turbiditySensor');

    // 1. STAFF GAUGE (VERTICAL METRIC RULER AT UPSTREAM EDGE)
    const staffGroup = new THREE.Group();
    if (isLake) {
      // Mounted vertically on a steel post near the lake shoreline
      staffGroup.position.set(-4.1, 1.25, 1.85);
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.09, 2.9, 0.09), mats.darkSteel);
      post.position.set(-0.06, -0.1, 0);
      staffGroup.add(post);
    } else {
      // Mounted flush against the inner concrete channel wall upstream
      staffGroup.position.set(-3.4, 1.25, -chanHalfW + 0.08);
    }
    const rulerBoard = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.55, 0.32), mats.staffGauge);
    rulerBoard.rotation.y = isLake ? 0.45 : Math.PI / 2;
    staffGroup.add(rulerBoard);
    scene.add(staffGroup);
    tagPart(staffGroup, 'staffGauge');

    // 7. IOT CONNECTIVITY (3D TELEMETRY BEAMS + HOLOGRAPHIC CLOUD / ML / DASHBOARD NODES)
    const iotGroup = new THREE.Group();
    scene.add(iotGroup);

    const nodeY = 5.45;
    const nodePositions = [
      { x: -0.08, y: nodeY, z: -chanHalfW - 0.35, title: 'IoT Cloud', sub: 'MQTT / TLS LIVE', accent: '#00D4FF' },
      { x: 2.35, y: nodeY, z: -chanHalfW - 0.35, title: 'ML Model', sub: 'FLOOD PREDICT', accent: '#38BDF8' },
      { x: 4.78, y: nodeY, z: -chanHalfW - 0.35, title: 'Dashboard', sub: 'REALTIME SYNC', accent: '#22C55E' }
    ];

    const iotNodeMats = [];
    nodePositions.forEach((n) => {
      const texOn = createIoTNodeTexture(n.title, n.sub, n.accent, true);
      const texOff = createIoTNodeTexture(n.title, n.sub, n.accent, false);
      const mat = new THREE.SpriteMaterial({ map: texOn, transparent: true, depthWrite: false });
      const sprite = new THREE.Sprite(mat);
      sprite.position.set(n.x, n.y, n.z);
      sprite.scale.set(2.15, 0.76, 1);
      sprite.userData.partKey = 'iotCloud';
      iotGroup.add(sprite);
      interactiveMeshes.push(sprite);
      iotNodeMats.push({ mat, texOn, texOff });
    });

    // Animated telemetry data packets (vertical ESP32->Cloud and horizontal Cloud->ML->Dashboard)
    const telemetryPackets = [];
    const packetGeom = new THREE.SphereGeometry(0.065, 10, 10);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff });

    // Vertical uplink packets
    for (let i = 0; i < 6; i++) {
      const p = new THREE.Mesh(packetGeom, packetMat);
      p.userData = { mode: 'vert', phase: i / 6 };
      iotGroup.add(p);
      telemetryPackets.push(p);
    }
    // Horizontal pipeline packets
    for (let i = 0; i < 6; i++) {
      const p = new THREE.Mesh(packetGeom, packetMat);
      p.userData = { mode: 'horiz', phase: i / 6 };
      iotGroup.add(p);
      telemetryPackets.push(p);
    }

    // Subtle dashed connector lines
    const lineMat = new THREE.LineDashedMaterial({ color: 0x00d4ff, dashSize: 0.16, gapSize: 0.12, transparent: true, opacity: 0.75 });
    const vertLineGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0.08, 4.15, -chanHalfW - 0.45),
      new THREE.Vector3(-0.08, nodeY - 0.38, -chanHalfW - 0.35)
    ]);
    const vertLine = new THREE.Line(vertLineGeom, lineMat);
    vertLine.computeLineDistances();
    iotGroup.add(vertLine);

    const horizLineGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0.95, nodeY, -chanHalfW - 0.35),
      new THREE.Vector3(3.75, nodeY, -chanHalfW - 0.35)
    ]);
    const horizLine = new THREE.Line(horizLineGeom, lineMat);
    horizLine.computeLineDistances();
    iotGroup.add(horizLine);

    // ========================================================================
    // ENVIRONMENT-SPECIFIC GEOMETRY: PAGE 1 (LAKE) VS PAGE 2 (RESIDENTIAL RIVER)
    // ========================================================================
    if (isLake) {
      // --- PAGE 1: NATURAL LAKE & CONCRETE OUTLET CHANNEL ---
      // Lakebed floor beneath upstream water
      const lakeBed = new THREE.Mesh(new THREE.PlaneGeometry(24, 24), mats.soil);
      lakeBed.rotation.x = -Math.PI / 2;
      lakeBed.position.set(-10, -0.38, 0);
      lakeBed.receiveShadow = true;
      scene.add(lakeBed);

      // Sculpted natural shoreline banks (left/north and right/south embankments flanking the lake outlet)
      const bankCoords = [
        { x: -5.5, z: -6.8, sx: 14, sy: 2.1, sz: 7.2 },
        { x: -5.5, z: 6.8, sx: 14, sy: 2.1, sz: 7.2 },
        { x: 5.5, z: -5.4, sx: 12, sy: 2.3, sz: 7.4 },
        { x: 5.5, z: 5.4, sx: 12, sy: 2.3, sz: 7.4 }
      ];
      bankCoords.forEach((b) => {
        const bank = new THREE.Mesh(new THREE.BoxGeometry(b.sx, b.sy, b.sz), mats.grass);
        bank.position.set(b.x, b.sy / 2 - 0.45, b.z);
        bank.receiveShadow = true;
        bank.castShadow = true;
        scene.add(bank);
      });

      // Sloped earthy embankments transitioning from lake water up to grass banks
      [-1, 1].forEach((dir) => {
        const slope = new THREE.Mesh(new THREE.BoxGeometry(11.5, 1.35, 2.6), mats.soil);
        slope.position.set(-6.0, 0.35, dir * 3.35);
        slope.rotation.x = dir * -0.45;
        slope.receiveShadow = true;
        scene.add(slope);

        // Wing walls anchoring gate into the natural lake embankment
        const wingWall = new THREE.Mesh(new THREE.BoxGeometry(0.65, 2.7, 2.4), mats.concrete);
        wingWall.position.set(-0.35, 0.85, dir * (chanHalfW + 1.5));
        wingWall.rotation.y = dir * 0.35;
        wingWall.castShadow = true;
        wingWall.receiveShadow = true;
        scene.add(wingWall);

        // Downstream concrete outlet channel walls
        const outletWall = new THREE.Mesh(new THREE.BoxGeometry(11.5, 2.25, 0.48), mats.concrete);
        outletWall.position.set(6.1, 0.68, dir * (chanHalfW + 0.24));
        outletWall.castShadow = true;
        outletWall.receiveShadow = true;
        scene.add(outletWall);
      });

      // Downstream concrete outlet floor
      const outletFloor = new THREE.Mesh(new THREE.BoxGeometry(12, 0.32, chanHalfW * 2 + 0.8), mats.darkConcrete);
      outletFloor.position.set(6.1, -0.35, 0);
      outletFloor.receiveShadow = true;
      scene.add(outletFloor);

      // Natural shoreline boulders & rocks
      const rockSpots = [
        [-3.2, 2.55, 0.55], [-4.8, 3.1, 0.72], [-6.4, 2.9, 0.48],
        [-2.8, -2.55, 0.5], [-4.6, -2.95, 0.68], [-7.2, -3.2, 0.82],
        [-1.9, 2.25, 0.35], [-5.5, 4.1, 0.44]
      ];
      rockSpots.forEach(([rx, rz, rs], idx) => {
        const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(rs, 0), mats.rock);
        rock.position.set(rx, 0.42 + (idx % 2) * 0.22, rz);
        rock.scale.set(1.25, 0.72, 1.05);
        rock.rotation.set(idx * 0.5, idx * 1.1, 0.2);
        rock.castShadow = true;
        rock.receiveShadow = true;
        scene.add(rock);
      });

      // Natural trees & shrubs around the lake edge
      const treeSpots = [
        [-7.5, -5.2, 1.25], [-4.2, -5.6, 1.05], [-9.2, 4.8, 1.35],
        [-5.8, 5.4, 1.1], [4.5, -4.6, 1.15], [7.8, 4.4, 1.2], [2.8, 4.8, 0.9]
      ];
      treeSpots.forEach(([tx, tz, ts]) => {
        const tree = createTree(ts);
        tree.position.set(tx, 1.6, tz);
        scene.add(tree);
      });
    } else {
      // --- PAGE 2: RESIDENTIAL RIVER & URBAN DRAINAGE INFRASTRUCTURE ---
      // Continuous concrete river channel bed (upstream & downstream)
      const channelBed = new THREE.Mesh(new THREE.BoxGeometry(30, 0.34, chanHalfW * 2 + 1.0), mats.darkConcrete);
      channelBed.position.set(0, -0.35, 0);
      channelBed.receiveShadow = true;
      scene.add(channelBed);

      // Left & right concrete retaining walls, sidewalks, neighborhood roads & green park strips
      [-1, 1].forEach((dir) => {
        const wallZ = dir * (chanHalfW + 0.25);
        const wall = new THREE.Mesh(new THREE.BoxGeometry(30, 2.45, 0.5), mats.concrete);
        wall.position.set(0, 0.85, wallZ);
        wall.castShadow = true;
        wall.receiveShadow = true;
        scene.add(wall);

        // Steel safety guardrail along river edge
        const railBar = new THREE.Mesh(new THREE.BoxGeometry(28, 0.06, 0.06), mats.steel);
        railBar.position.set(0, 2.65, dir * (chanHalfW + 0.45));
        scene.add(railBar);
        for (let px = -12; px <= 12; px += 2.4) {
          if (Math.abs(px) < 1.2) continue;
          const post = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.62, 0.06), mats.steel);
          post.position.set(px, 2.36, dir * (chanHalfW + 0.45));
          scene.add(post);
        }

        // Pedestrian sidewalk
        const sidewalk = new THREE.Mesh(new THREE.BoxGeometry(30, 0.16, 1.3), mats.sidewalk);
        sidewalk.position.set(0, 2.04, dir * (chanHalfW + 1.15));
        sidewalk.receiveShadow = true;
        scene.add(sidewalk);

        // Neighborhood asphalt road
        const road = new THREE.Mesh(new THREE.BoxGeometry(30, 0.14, 2.6), mats.asphalt);
        road.position.set(0, 2.02, dir * (chanHalfW + 3.1));
        road.receiveShadow = true;
        scene.add(road);

        // Green residential lawn plots behind roads
        const lawn = new THREE.Mesh(new THREE.BoxGeometry(30, 0.18, 7.5), mats.grass);
        lawn.position.set(0, 2.04, dir * (chanHalfW + 8.1));
        lawn.receiveShadow = true;
        scene.add(lawn);
      });

      // Small Concrete Pedestrian & Vehicle Bridge downstream (X = +5.6)
      const bridgeGroup = new THREE.Group();
      bridgeGroup.position.set(5.6, 2.15, 0);
      const bridgeDeck = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.24, chanHalfW * 2 + 1.5), mats.sidewalk);
      bridgeGroup.add(bridgeDeck);
      [-1.22, 1.22].forEach((bx) => {
        const parapet = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.65, chanHalfW * 2 + 1.4), mats.concrete);
        parapet.position.set(bx, 0.36, 0);
        bridgeGroup.add(parapet);
      });
      bridgeGroup.traverse((c) => {
        if (c.isMesh) {
          c.castShadow = true;
          c.receiveShadow = true;
        }
      });
      scene.add(bridgeGroup);

      // Modern Minimalist 3D Residential Houses on both sides of the river
      function createModernHouse(wallColor, roofColor) {
        const h = new THREE.Group();
        const wallMat = new THREE.MeshStandardMaterial({ color: wallColor, roughness: 0.72 });
        const roofMat = new THREE.MeshStandardMaterial({ color: roofColor, roughness: 0.65 });
        const glassMat = new THREE.MeshPhysicalMaterial({
          color: 0x38bdf8,
          roughness: 0.12,
          metalness: 0.2,
          emissive: 0x0c4a6e,
          emissiveIntensity: 0.35
        });

        // Ground floor block
        const floor1 = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.85, 2.8), wallMat);
        floor1.position.y = 0.92;
        h.add(floor1);

        // Upper cantilevered modern story
        const floor2 = new THREE.Mesh(new THREE.BoxGeometry(2.7, 1.55, 2.95), wallMat);
        floor2.position.set(-0.2, 2.55, 0.12);
        h.add(floor2);

        // Sleek flat dark architectural roof overhang
        const roof = new THREE.Mesh(new THREE.BoxGeometry(3.05, 0.18, 3.25), roofMat);
        roof.position.set(-0.2, 3.38, 0.12);
        h.add(roof);

        // Large modern windows facing the river
        const win1 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.95, 0.08), glassMat);
        win1.position.set(0.55, 1.0, 1.42);
        h.add(win1);

        const win2 = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.85, 0.08), glassMat);
        win2.position.set(-0.25, 2.55, 1.6);
        h.add(win2);

        // Wooden accent door
        const door = new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.25, 0.08), mats.trunk);
        door.position.set(-0.85, 0.62, 1.42);
        h.add(door);

        h.traverse((c) => {
          if (c.isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
          }
        });
        return h;
      }

      const housePalette = [
        [0xe2e8f0, 0x1e293b],
        [0xf1f5f9, 0x334155],
        [0xdbeafe, 0x0f172a],
        [0xf8fafc, 0x475569]
      ];
      [-7.2, -1.8, 4.2, 9.5].forEach((hx, idx) => {
        const [wc, rc] = housePalette[idx % housePalette.length];
        const houseNorth = createModernHouse(wc, rc);
        houseNorth.position.set(hx, 2.12, -(chanHalfW + 6.9));
        scene.add(houseNorth);

        const houseSouth = createModernHouse(wc, rc);
        houseSouth.position.set(hx + 0.5, 2.12, chanHalfW + 6.9);
        houseSouth.rotation.y = Math.PI;
        scene.add(houseSouth);
      });

      // Streetlamps & ornamental residential trees
      [-8, -3.5, 2.5, 8.5].forEach((tx) => {
        [-1, 1].forEach((dir) => {
          const tree = createTree(0.82);
          tree.position.set(tx, 2.1, dir * (chanHalfW + 4.9));
          scene.add(tree);

          const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 2.1, 8), mats.darkSteel);
          pole.position.set(tx + 1.4, 3.1, dir * (chanHalfW + 1.55));
          scene.add(pole);
          const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 10), mats.cyanGlow);
          lamp.position.set(tx + 1.4, 4.15, dir * (chanHalfW + 1.55));
          scene.add(lamp);
        });
      });
    }

    // ========================================================================
    // DYNAMIC WATER SIMULATION (UPSTREAM & DOWNSTREAM + FLOW PARTICLES)
    // ========================================================================
    const waterMatUp = new THREE.MeshPhysicalMaterial({
      color: 0x0e87b5,
      emissive: 0x042436,
      emissiveIntensity: 0.25,
      roughness: 0.14,
      metalness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: 0.72,
      side: THREE.DoubleSide
    });
    const waterMatDown = waterMatUp.clone();

    // Upstream water mesh
    const upW = isLake ? 16 : 15;
    const upD = isLake ? 7.6 : chanHalfW * 2 - 0.04;
    const upGeom = new THREE.PlaneGeometry(upW, upD, 36, 20);
    upGeom.rotateX(-Math.PI / 2);
    const upPosAttr = upGeom.attributes.position;
    const upWaterMesh = new THREE.Mesh(upGeom, waterMatUp);
    upWaterMesh.position.set(-upW / 2 - 0.06, 1.0, 0);
    upWaterMesh.receiveShadow = true;
    scene.add(upWaterMesh);

    // Downstream water mesh
    const downW = 13.5;
    const downD = chanHalfW * 2 - 0.04;
    const downGeom = new THREE.PlaneGeometry(downW, downD, 32, 14);
    downGeom.rotateX(-Math.PI / 2);
    const downPosAttr = downGeom.attributes.position;
    const downWaterMesh = new THREE.Mesh(downGeom, waterMatDown);
    downWaterMesh.position.set(downW / 2 + 0.06, 0.45, 0);
    downWaterMesh.receiveShadow = true;
    scene.add(downWaterMesh);

    // Animated water current flow streaks (moving from upstream through gate to downstream)
    const flowStreaks = [];
    const streakGeom = new THREE.BoxGeometry(0.65, 0.025, 0.06);
    const streakMat = new THREE.MeshBasicMaterial({ color: 0xd9f7ff, transparent: true, opacity: 0.55 });
    for (let i = 0; i < 24; i++) {
      const s = new THREE.Mesh(streakGeom, streakMat);
      s.userData = {
        x: -7 + Math.random() * 17,
        z: (Math.random() - 0.5) * (chanHalfW * 1.75),
        speedScale: 0.75 + Math.random() * 0.5
      };
      scene.add(s);
      flowStreaks.push(s);
    }

    // ========================================================================
    // INTERACTIVE ORBIT / PAN / ZOOM & RAYCAST HOVER HANDLERS
    // ========================================================================
    const dom = renderer.domElement;
    let isDragging = false;
    let isPanning = false;
    let prevX = 0;
    let prevY = 0;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let lastHoveredKey = null;

    const onPointerDown = (e) => {
      isDragging = true;
      isPanning = e.button === 2 || e.shiftKey;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerMove = (e) => {
      const rect = dom.getBoundingClientRect();
      if (isDragging) {
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        prevX = e.clientX;
        prevY = e.clientY;

        const o = orbitRef.current;
        if (isPanning) {
          const panSpeed = 0.012;
          o.desiredTarget.x -= dx * panSpeed * Math.cos(o.theta);
          o.desiredTarget.z -= dx * panSpeed * Math.sin(o.theta);
          o.desiredTarget.y += dy * panSpeed;
        } else {
          o.desiredTheta -= dx * 0.0075;
          o.desiredPhi = Math.max(0.12, Math.min(Math.PI * 0.48, o.desiredPhi - dy * 0.0075));
        }
        return;
      }

      // Hover raycast for component inspection
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(interactiveMeshes, false);
      const foundKey = hits.length > 0 ? hits[0].object.userData.partKey : null;
      if (foundKey !== lastHoveredKey) {
        lastHoveredKey = foundKey;
        dom.style.cursor = foundKey ? 'pointer' : 'grab';
        if (onHoverComponent) onHoverComponent(foundKey);
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      isPanning = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      const o = orbitRef.current;
      o.desiredRadius = Math.max(5.5, Math.min(28, o.desiredRadius + e.deltaY * 0.012));
    };

    const onContextMenu = (e) => e.preventDefault();

    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('wheel', onWheel, { passive: false });
    dom.addEventListener('contextmenu', onContextMenu);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ========================================================================
    // 60FPS ANIMATION LOOP
    // ========================================================================
    const clock = new THREE.Clock();
    let animId = 0;
    let simTime = 0;
    let lastOnlineState = true;

    const clearColor = new THREE.Color(0x0d8ec2);
    const midColor = new THREE.Color(0x4a7b58);
    const murkyColor = new THREE.Color(0x705638);
    const blendedColor = new THREE.Color();

    function animate() {
      animId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      simTime += dt;

      const s = simRef.current;

      // 1. Update smooth camera orbit
      const o = orbitRef.current;
      if (s.autoOrbit && !isDragging) {
        o.desiredTheta += dt * 0.22;
      }
      o.theta += (o.desiredTheta - o.theta) * Math.min(1, dt * 8);
      o.phi += (o.desiredPhi - o.phi) * Math.min(1, dt * 8);
      o.radius += (o.desiredRadius - o.radius) * Math.min(1, dt * 8);
      o.target.lerp(o.desiredTarget, Math.min(1, dt * 8));

      camera.position.set(
        o.target.x + o.radius * Math.sin(o.phi) * Math.sin(o.theta),
        o.target.y + o.radius * Math.cos(o.phi),
        o.target.z + o.radius * Math.sin(o.phi) * Math.cos(o.theta)
      );
      camera.lookAt(o.target);

      // 2. Automatic Water Gate & Actuator Mechanical Animation
      const gateFraction = s.gatePosition / 100;
      const gateY = 0.88 + gateFraction * 1.32;
      gatePlateGroup.position.y = gateY;
      screwGroup.position.y = gateFraction * 1.32;
      if (Math.abs(s.gateVelocity) > 0.01) {
        screwGroup.rotation.y += dt * 9.0 * Math.sign(s.gateVelocity);
      }

      // 3. Water Level & Turbidity Color Physics
      // Upstream Y aligns directly with Staff Gauge (0.15m to 2.25m)
      const upstreamY = 0.15 + (s.waterLevel / 100) * 1.85;
      // Downstream Y depends on gate opening + water flow + upstream head
      const releaseFactor = (s.gatePosition / 100) * (0.35 + (s.waterFlow / 100) * 0.65);
      const downstreamY = 0.08 + Math.min(upstreamY - 0.12, releaseFactor * upstreamY * 0.72);

      upWaterMesh.position.y = upstreamY;
      downWaterMesh.position.y = Math.max(0.06, downstreamY);

      // Turbidity color interpolation (0 NTU = crystal teal -> 50 = olive -> 100 = murky brown)
      const tNorm = s.turbidity / 100;
      if (tNorm < 0.5) {
        blendedColor.copy(clearColor).lerp(midColor, tNorm * 2);
      } else {
        blendedColor.copy(midColor).lerp(murkyColor, (tNorm - 0.5) * 2);
      }
      waterMatUp.color.copy(blendedColor);
      waterMatDown.color.copy(blendedColor);
      waterMatUp.opacity = 0.66 + tNorm * 0.24;
      waterMatDown.opacity = 0.68 + tNorm * 0.22;

      // Animate gentle surface waves
      const waveAmp = 0.022 + (s.waterFlow / 100) * 0.025;
      for (let i = 0; i < upPosAttr.count; i++) {
        const vx = upPosAttr.getX(i);
        const vz = upPosAttr.getZ(i);
        upPosAttr.setY(i, Math.sin(vx * 0.8 - simTime * 2.2) * waveAmp + Math.cos(vz * 0.9 + simTime * 1.6) * waveAmp * 0.7);
      }
      upPosAttr.needsUpdate = true;

      const downAmp = 0.015 + releaseFactor * 0.045;
      for (let i = 0; i < downPosAttr.count; i++) {
        const vx = downPosAttr.getX(i);
        const vz = downPosAttr.getZ(i);
        downPosAttr.setY(i, Math.sin(vx * 1.3 - simTime * (2.6 + releaseFactor * 4.5)) * downAmp + Math.cos(vz * 1.4 + simTime * 2.1) * downAmp * 0.5);
      }
      downPosAttr.needsUpdate = true;

      // Animate water current flow streaks
      const baseSpeed = 0.4 + (s.waterFlow / 100) * 1.4;
      const downSpeed = baseSpeed * (0.25 + (s.gatePosition / 100) * 2.4);
      flowStreaks.forEach((st) => {
        const isDown = st.userData.x > 0;
        const spd = (isDown ? downSpeed : baseSpeed * 0.65) * st.userData.speedScale;
        st.userData.x += dt * spd;
        if (!isDown && st.userData.x > -0.45 && s.gatePosition < 8) {
          st.userData.x = -7.2;
        } else if (st.userData.x > 11.5) {
          st.userData.x = -7.2;
        }
        st.position.set(st.userData.x, (st.userData.x > 0 ? downWaterMesh.position.y : upstreamY) + 0.03, st.userData.z);
        st.visible = !(st.userData.x > 0 && s.gatePosition < 4);
      });

      // 4. Water Level Sensor Ultrasonic Beam & Ripple
      const beamTop = 2.45;
      const beamHeight = Math.max(0.15, beamTop - upstreamY);
      ultrasonicBeam.scale.set(1, beamHeight, 1);
      ultrasonicBeam.position.y = upstreamY + beamHeight / 2;
      ultrasonicBeam.visible = s.sensorOnline;

      rippleRing.position.y = upstreamY + 0.035;
      const rPulse = 1 + ((simTime * 1.6) % 1) * 1.35;
      rippleRing.scale.set(rPulse, rPulse, 1);
      rippleRingMat.opacity = s.sensorOnline ? (1 - ((simTime * 1.6) % 1)) * 0.72 : 0;

      // 5. ESP32 LED, Turbidity Glow & IoT Telemetry Packets
      if (s.sensorOnline) {
        espLedMat.color.setHex(0x22c55e);
        espLedMat.emissive.setHex(0x22c55e);
        espLedMat.emissiveIntensity = 1.2 + Math.sin(simTime * 4) * 0.4;

        const tColor = s.turbidity >= 70 ? 0xef4444 : s.turbidity >= 40 ? 0xfacc15 : 0x00d4ff;
        turbLedMat.color.setHex(tColor);
        turbLedMat.emissive.setHex(tColor);
        turbLedMat.emissiveIntensity = 1.4;
      } else {
        espLedMat.color.setHex(0xef4444);
        espLedMat.emissive.setHex(0xef4444);
        espLedMat.emissiveIntensity = 1.1;
        turbLedMat.emissiveIntensity = 0.05;
      }

      if (s.sensorOnline !== lastOnlineState) {
        lastOnlineState = s.sensorOnline;
        iotNodeMats.forEach(({ mat, texOn, texOff }) => {
          mat.map = s.sensorOnline ? texOn : texOff;
          mat.needsUpdate = true;
        });
      }

      lineMat.opacity = s.sensorOnline ? 0.75 : 0.16;
      telemetryPackets.forEach((p) => {
        p.visible = s.sensorOnline;
        if (!s.sensorOnline) return;
        p.userData.phase = (p.userData.phase + dt * 0.55) % 1;
        if (p.userData.mode === 'vert') {
          p.position.set(
            0.08 - p.userData.phase * 0.16,
            4.15 + p.userData.phase * (nodeY - 4.55),
            -chanHalfW - 0.42
          );
        } else {
          p.position.set(
            0.95 + p.userData.phase * 2.8,
            nodeY,
            -chanHalfW - 0.35
          );
        }
      });

      renderer.render(scene, camera);
    }

    animate();
    setTimeout(() => setIsLoading(false), 260);

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('wheel', onWheel);
      dom.removeEventListener('contextmenu', onContextMenu);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, [activePage, onHoverComponent]);

  if (webglError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#081522] p-6 text-center">
        <div className="max-w-md rounded-2xl border border-cyan-500/30 bg-[#102438]/90 p-6">
          <AlertTriangle className="mx-auto mb-3 h-10 w-10 text-amber-400" />
          <h3 className="text-base font-semibold text-[#EAF6FF]">WebGL Context Unavailable</h3>
          <p className="mt-2 text-xs text-slate-300">
            Your browser or GPU driver does not support WebGL rendering required for the 3D Water Gate Simulator. Please enable hardware acceleration and reload.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div ref={mountRef} className="h-full w-full" />
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#081522]/90 backdrop-blur-sm">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-500/20 border-t-[#00D4FF]" />
          <p className="mt-3 font-mono text-xs tracking-widest text-[#00D4FF]">
            INITIALIZING {activePage === 'lake' ? 'LAKE' : 'RESIDENTIAL RIVER'} 3D ENGINE...
          </p>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 4. MODULAR PROJECT SOURCE CODE BUNDLE (SYNTAX-HIGHLIGHTED VIEWER)
// ============================================================================
const PROJECT_FILES = [
  {
    path: 'src/components/WaterGate.jsx',
    folder: 'src/components',
    name: 'WaterGate.jsx',
    code: `import * as THREE from 'three';

/**
 * Automatic Water Gate & Motorized Linear Actuator Builder
 * Models the concrete piers, stainless steel guide rails, sliding sluice plate,
 * electric gearbox motor, and rotating threaded lifting screw shaft.
 */
export function buildWaterGateSystem({ chanHalfW, mats, gatePosition, gateVelocity }) {
  const gateGroup = new THREE.Group();
  const gateW = chanHalfW * 2 + 0.04;
  const gateH = 2.05;

  // Concrete side piers & embedded steel guide rails
  [-chanHalfW - 0.35, chanHalfW + 0.35].forEach((zPos) => {
    const pier = new THREE.Mesh(new THREE.BoxGeometry(1.15, 3.5, 0.72), mats.concrete);
    pier.position.set(0, 1.25, zPos);
    gateGroup.add(pier);

    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.22, 3.35, 0.14), mats.steel);
    rail.position.set(0, 1.25, zPos > 0 ? chanHalfW + 0.02 : -chanHalfW - 0.02);
    gateGroup.add(rail);
  });

  // Sliding stainless-steel sluice gate plate with reinforcement ribs
  const plateGroup = new THREE.Group();
  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.11, gateH, gateW), mats.gatePlate);
  plateGroup.add(plate);

  [-0.72, -0.22, 0.28, 0.78].forEach((ry) => {
    const rib = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.10, gateW - 0.08), mats.darkSteel);
    rib.position.y = ry;
    plateGroup.add(rib);
  });

  // Elevation driven by gatePosition (0% = closed, 100% = fully open)
  plateGroup.position.y = 0.88 + (gatePosition / 100) * 1.32;
  gateGroup.add(plateGroup);

  // Motorized linear actuator & rotating threaded screw
  const actuator = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.72, 20), mats.steel);
  actuator.rotation.x = Math.PI / 2;
  actuator.position.set(0, 3.5, 0.56);
  gateGroup.add(actuator);

  return { gateGroup, plateGroup };
}`
  },
  {
    path: 'src/components/WaterSimulation.jsx',
    folder: 'src/components',
    name: 'WaterSimulation.jsx',
    code: `import * as THREE from 'three';

/**
 * Dynamic Upstream & Downstream Water Simulation
 * Updates wave vertices, upstream/downstream height differential,
 * flow streak velocity, and turbidity color shift (0-100 NTU).
 */
export function updateWaterPhysics({
  upWaterMesh,
  downWaterMesh,
  waterLevel,
  turbidity,
  waterFlow,
  gatePosition,
  simTime
}) {
  // Upstream water aligns directly with Staff Gauge markings
  const upstreamY = 0.15 + (waterLevel / 100) * 1.85;
  const releaseFactor = (gatePosition / 100) * (0.35 + (waterFlow / 100) * 0.65);
  const downstreamY = 0.08 + Math.min(upstreamY - 0.12, releaseFactor * upstreamY * 0.72);

  upWaterMesh.position.y = upstreamY;
  downWaterMesh.position.y = Math.max(0.06, downstreamY);

  // Interpolate water color from clear cyan-blue (0 NTU) to murky brown (100 NTU)
  const clearColor = new THREE.Color(0x0d8ec2);
  const murkyColor = new THREE.Color(0x705638);
  const t = turbidity / 100;

  upWaterMesh.material.color.copy(clearColor).lerp(murkyColor, t);
  downWaterMesh.material.color.copy(upWaterMesh.material.color);
  upWaterMesh.material.opacity = 0.66 + t * 0.24;

  // Gentle sinusoidal wave animation
  const posAttr = upWaterMesh.geometry.attributes.position;
  const amp = 0.022 + (waterFlow / 100) * 0.025;
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const z = posAttr.getZ(i);
    posAttr.setY(i, Math.sin(x * 0.8 - simTime * 2.2) * amp + Math.cos(z * 0.9 + simTime * 1.6) * amp * 0.7);
  }
  posAttr.needsUpdate = true;
}`
  },
  {
    path: 'src/components/Sensors.jsx',
    folder: 'src/components',
    name: 'Sensors.jsx',
    code: `import * as THREE from 'three';

/**
 * Ultrasonic Water Level Sensor & Submerged Turbidity Sensor
 * Includes cantilevered mounting arm, dynamic ultrasonic beam,
 * and waterproof underwater optical NTU probe.
 */
export function buildSensorSuite({ chanHalfW, mats }) {
  const group = new THREE.Group();
  const armZ = -chanHalfW - 0.18;

  // 1. Cantilevered Water Level Sensor over upstream water
  const arm = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.09, 0.09), mats.steel);
  arm.position.set(-1.35, 2.75, armZ);
  group.add(arm);

  const ultrasonicHead = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 0.22), mats.enclosure);
  ultrasonicHead.position.set(-2.45, 2.66, armZ);
  group.add(ultrasonicHead);

  // 2. Submerged Turbidity Sensor on vertical stainless-steel conduit
  const turbPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 2.95, 12), mats.steel);
  turbPipe.position.set(-1.35, 1.68, -chanHalfW + 0.36);
  group.add(turbPipe);

  const turbProbe = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.085, 0.42, 18), mats.darkSteel);
  turbProbe.position.set(-1.35, 0.25, -chanHalfW + 0.36);
  group.add(turbProbe);

  return group;
}`
  },
  {
    path: 'src/components/ESP32Controller.jsx',
    folder: 'src/components',
    name: 'ESP32Controller.jsx',
    code: `import * as THREE from 'three';

/**
 * IP67 Waterproof ESP32 Controller & IoT Cloud Telemetry Nodes
 * Mounted atop the sluice structure with status LED, antenna,
 * and animated data packets streaming to IoT Cloud -> ML Model -> Dashboard.
 */
export function buildESP32AndIoT({ chanHalfW, mats, sensorOnline }) {
  const espGroup = new THREE.Group();
  espGroup.position.set(-0.08, 3.36, -chanHalfW - 0.35);

  const enclosure = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.44, 0.54), mats.enclosure);
  espGroup.add(enclosure);

  // Online = Emerald Green, Offline = Alert Red
  const ledColor = sensorOnline ? 0x22c55e : 0xef4444;
  const led = new THREE.Mesh(
    new THREE.SphereGeometry(0.045, 12, 12),
    new THREE.MeshStandardMaterial({ color: ledColor, emissive: ledColor, emissiveIntensity: 1.5 })
  );
  led.position.set(0, 0.05, 0.28);
  espGroup.add(led);

  // External wireless telemetry antenna
  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.018, 0.52, 10), mats.darkSteel);
  antenna.position.set(0.16, 0.58, -0.10);
  espGroup.add(antenna);

  return espGroup;
}`
  },
  {
    path: 'src/components/StaffGauge.jsx',
    folder: 'src/components',
    name: 'StaffGauge.jsx',
    code: `import * as THREE from 'three';

/**
 * Graduated Vertical Staff Gauge (0.0m - 3.0m)
 * Procedurally renders crisp metric tick marks and red flood-zone markings.
 */
export function buildStaffGauge({ isLake, chanHalfW, staffTex, mats }) {
  const staffGroup = new THREE.Group();
  if (isLake) {
    staffGroup.position.set(-4.1, 1.25, 1.85);
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.09, 2.9, 0.09), mats.darkSteel);
    post.position.set(-0.06, -0.1, 0);
    staffGroup.add(post);
  } else {
    staffGroup.position.set(-3.4, 1.25, -chanHalfW + 0.08);
  }

  const ruler = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 2.55, 0.32),
    new THREE.MeshStandardMaterial({ map: staffTex, roughness: 0.35 })
  );
  ruler.rotation.y = isLake ? 0.45 : Math.PI / 2;
  staffGroup.add(ruler);
  return staffGroup;
}`
  },
  {
    path: 'src/components/Dashboard.jsx',
    folder: 'src/components',
    name: 'Dashboard.jsx',
    code: `import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

/**
 * Real-Time Telemetry Monitoring Panel
 * Displays color-coded KPI cards (Normal / Warning / Critical)
 * and live Recharts AreaChart for Water Level, Turbidity, and Flow Rate.
 */
export function TelemetryDashboard({ waterLevel, turbidity, waterFlow, gatePosition, history }) {
  return (
    <aside className="flex flex-col gap-3 bg-[#102438]/80 p-4 backdrop-blur-md">
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-cyan-500/20 p-2.5">
          <span className="text-[10px] text-slate-400">WATER LEVEL</span>
          <div className="text-lg font-bold text-[#00D4FF]">{waterLevel}%</div>
        </div>
        <div className="rounded-lg border border-cyan-500/20 p-2.5">
          <span className="text-[10px] text-slate-400">TURBIDITY</span>
          <div className="text-lg font-bold text-amber-400">{turbidity} NTU</div>
        </div>
      </div>

      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history}>
            <XAxis dataKey="time" hide />
            <YAxis domain={[0, 100]} hide />
            <Tooltip />
            <Area type="monotone" dataKey="level" stroke="#00D4FF" fill="#00D4FF" fillOpacity={0.2} />
            <Area type="monotone" dataKey="turbidity" stroke="#FACC15" fill="#FACC15" fillOpacity={0.12} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </aside>
  );
}`
  },
  {
    path: 'src/pages/LakePage.jsx',
    folder: 'src/pages',
    name: 'LakePage.jsx',
    code: `import React from 'react';

/**
 * Page 1: Lake Monitoring System
 * Configures the natural lake basin, soil & rock shoreline banks,
 * trees, concrete outlet wing walls, and downstream discharge channel.
 */
export default function LakePage({ simulatorProps }) {
  return (
    <section className="relative h-full w-full">
      {/* Renders SmartWater3DCanvas with activePage="lake" */}
      {/* Includes Staff Gauge at shoreline, Ultrasonic Level Sensor, Turbidity Probe,
          Automatic Sluice Gate, Motorized Actuator, ESP32, and IoT Cloud Pipeline */}
    </section>
  );
}`
  },
  {
    path: 'src/pages/ResidentialRiverPage.jsx',
    folder: 'src/pages',
    name: 'ResidentialRiverPage.jsx',
    code: `import React from 'react';

/**
 * Page 2: Residential River Monitoring System
 * Configures the concrete urban drainage channel, modern minimalist houses,
 * sidewalks, neighborhood roads, streetlamps, trees, and pedestrian bridge.
 */
export default function ResidentialRiverPage({ simulatorProps }) {
  return (
    <section className="relative h-full w-full">
      {/* Renders SmartWater3DCanvas with activePage="residential" */}
      {/* Integrates the Automatic Water Gate flush into the concrete river walls */}
    </section>
  );
}`
  },
  {
    path: 'src/App.jsx',
    folder: 'src',
    name: 'App.jsx',
    code: `import React, { useState, useEffect } from 'react';

/**
 * SMART WATER GATE 3D SIMULATOR — Root Controller
 * Manages automatic flood-mitigation logic, real-time gate kinematics,
 * environment switching (Lake / Residential River), and Source Code Viewer.
 */
export function computeAutoGateTarget(waterLevel) {
  if (waterLevel <= 35) return 0;    // Retention
  if (waterLevel <= 60) return Math.round(((waterLevel - 35) / 25) * 40 + 15);
  if (waterLevel <= 80) return Math.round(((waterLevel - 60) / 20) * 35 + 55);
  return 100;                        // Full Flood Discharge
}`
  },
  {
    path: 'src/main.jsx',
    folder: 'src',
    name: 'main.jsx',
    code: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`
  }
];

// Lightweight syntax highlighter for the Source Code Viewer
function HighlightedCode({ code }) {
  const lines = code.split('\n');
  const keywords = /\b(import|from|export|default|function|const|let|var|return|if|else|for|new|true|false|null)\b/g;

  return (
    <pre className="overflow-x-auto font-mono text-[12px] leading-relaxed text-[#EAF6FF]">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        const isComment = trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*');
        if (isComment) {
          return (
            <div key={idx} className="flex hover:bg-cyan-500/5">
              <span className="w-10 shrink-0 select-none pr-3 text-right text-slate-500">{idx + 1}</span>
              <span className="text-emerald-400/80">{line}</span>
            </div>
          );
        }

        const parts = line.split(/('[^']*'|"[^"]*"|`[^`]*`|\b\d+(?:\.\d+)?\b)/g);
        return (
          <div key={idx} className="flex hover:bg-cyan-500/5">
            <span className="w-10 shrink-0 select-none pr-3 text-right text-slate-500">{idx + 1}</span>
            <span>
              {parts.map((part, pIdx) => {
                if (!part) return null;
                if (/^['"`]/.test(part)) {
                  return <span key={pIdx} className="text-amber-300">{part}</span>;
                }
                if (/^\d+(\.\d+)?$/.test(part)) {
                  return <span key={pIdx} className="text-cyan-300">{part}</span>;
                }
                const kwSplit = part.split(keywords);
                return kwSplit.map((seg, kIdx) =>
                  keywords.test(seg) ? (
                    <span key={`${pIdx}-${kIdx}`} className="font-semibold text-sky-400">{seg}</span>
                  ) : (
                    <span key={`${pIdx}-${kIdx}`}>{seg}</span>
                  )
                );
              })}
            </span>
          </div>
        );
      })}
    </pre>
  );
}

// ============================================================================
// 5. MAIN APPLICATION COMPONENT (AREA A: 3D PREVIEW + AREA B: SOURCE CODE)
// ============================================================================
export default function App() {
  // Primary navigation states
  const [activeArea, setActiveArea] = useState('preview'); // 'preview' | 'source'
  const [activePage, setActivePage] = useState('lake');    // 'lake' | 'residential'

  // Collapsible side panels for 14-inch laptop comfort
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  // Interactive sensor & gate simulation state
  const [waterLevel, setWaterLevel] = useState(52);
  const [turbidity, setTurbidity] = useState(24);
  const [waterFlow, setWaterFlow] = useState(48);
  const [sensorOnline, setSensorOnline] = useState(true);

  const [autoMode, setAutoMode] = useState(true);
  const [gatePosition, setGatePosition] = useState(42);
  const [targetGate, setTargetGate] = useState(42);
  const [gateVelocity, setGateVelocity] = useState(0);

  // Camera controls & 3D hover inspection
  const [cameraCommand, setCameraCommand] = useState({ type: 'iso', id: 0 });
  const [autoOrbit, setAutoOrbit] = useState(false);
  const [hoveredPart, setHoveredPart] = useState(null);

  // Source Code Viewer state
  const [selectedFile, setSelectedFile] = useState(PROJECT_FILES[0].path);
  const [copied, setCopied] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState({
    'src': true,
    'src/components': true,
    'src/pages': true
  });

  // Real-time Recharts telemetry history
  const [history, setHistory] = useState(() => {
    const now = Date.now();
    return Array.from({ length: 14 }, (_, i) => ({
      time: new Date(now - (13 - i) * 1500).toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
      level: 48 + Math.round(Math.sin(i * 0.6) * 4),
      turbidity: 22 + Math.round(Math.cos(i * 0.5) * 3),
      flow: 45 + Math.round(Math.sin(i * 0.4) * 5)
    }));
  });

  const autoDecision = useMemo(() => computeAutoGateTarget(waterLevel), [waterLevel]);

  // Update target gate automatically when AUTO MODE & Sensor Online
  useEffect(() => {
    if (autoMode && sensorOnline) {
      setTargetGate(autoDecision.target);
    }
  }, [autoMode, sensorOnline, autoDecision.target]);

  // Smooth real-time gate kinematics animation loop
  useEffect(() => {
    let rafId = 0;
    let lastTime = performance.now();

    const step = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      setGatePosition((prev) => {
        const diff = targetGate - prev;
        if (Math.abs(diff) < 0.25) {
          setGateVelocity(0);
          return targetGate;
        }
        const speed = 32; // % per second
        const delta = Math.sign(diff) * Math.min(Math.abs(diff), speed * dt);
        setGateVelocity(Math.sign(diff));
        return Number((prev + delta).toFixed(2));
      });

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [targetGate]);

  // Append simulated telemetry sample every 1.4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const stamp = new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' });
      const jitter = sensorOnline ? (Math.random() - 0.5) * 1.6 : 0;
      setHistory((prev) => [
        ...prev.slice(-17),
        {
          time: stamp,
          level: sensorOnline ? Math.max(0, Math.min(100, Number((waterLevel + jitter).toFixed(1)))) : 0,
          turbidity: sensorOnline ? Math.max(0, Math.min(100, Number((turbidity + jitter).toFixed(1)))) : 0,
          flow: sensorOnline ? Math.max(0, Math.min(100, Number((waterFlow + jitter).toFixed(1)))) : 0
        }
      ]);
    }, 1400);
    return () => clearInterval(timer);
  }, [waterLevel, turbidity, waterFlow, sensorOnline]);

  // Gate Control Button Handlers
  const handleOpenGate = () => {
    setAutoMode(false);
    setTargetGate(100);
  };

  const handleCloseGate = () => {
    setAutoMode(false);
    setTargetGate(0);
  };

  const handleAutoMode = () => {
    setAutoMode(true);
    if (sensorOnline) {
      setTargetGate(computeAutoGateTarget(waterLevel).target);
    }
  };

  const handleStopGate = () => {
    setAutoMode(false);
    setTargetGate(Math.round(gatePosition));
    setGateVelocity(0);
  };

  const triggerCamera = useCallback((type) => {
    setCameraCommand({ type, id: Date.now() });
    if (type === 'reset') setAutoOrbit(false);
  }, []);

  // Active file in Source Code Viewer
  const activeFileObj = useMemo(
    () => PROJECT_FILES.find((f) => f.path === selectedFile) || PROJECT_FILES[0],
    [selectedFile]
  );

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(activeFileObj.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = activeFileObj.code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const handleDownloadSource = () => {
    const bundleText = PROJECT_FILES.map(
      (f) => `// ============================================================================\n// FILE: ${f.path}\n// ============================================================================\n${f.code}\n`
    ).join('\n');

    const blob = new Blob([bundleText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'smart-water-gate-3d-simulator-source.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Status colors & computed discharge metrics
  const levelSt = getLevelStatus(waterLevel);
  const turbSt = getTurbidityStatus(turbidity);
  const flowSt = getFlowStatus(waterFlow);
  const flowM3s = ((waterFlow / 100) * (0.15 + (gatePosition / 100) * 4.2)).toFixed(2);
  const upstreamMeters = (0.3 + (waterLevel / 100) * 2.5).toFixed(2);
  const downstreamMeters = Math.max(0.18, Number(upstreamMeters) * (0.2 + (gatePosition / 100) * 0.58)).toFixed(2);

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#081522] text-[#EAF6FF] selection:bg-cyan-500/30">
      {/* ==================== TOP HEADER ==================== */}
      <header className="z-30 flex shrink-0 items-center justify-between gap-3 border-b border-cyan-500/20 bg-[#0b1b2d]/90 px-4 py-2.5 backdrop-blur-md">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#00D4FF]/40 bg-[#00D4FF]/10 shadow-[0_0_15px_rgba(0,212,255,0.2)]">
            <Waves className="h-5 w-5 text-[#00D4FF]" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold tracking-wider text-[#EAF6FF] sm:text-base">
              SMART WATER GATE <span className="text-[#00D4FF]">3D SIMULATOR</span>
            </h1>
            <p className="hidden truncate text-[11px] text-slate-400 md:block">
              Interactive 3D Visualization of IoT-Based Automatic Water Management System
            </p>
          </div>
        </div>

        {/* Area A / Area B Switcher */}
        <div className="flex items-center rounded-xl border border-cyan-500/25 bg-[#081522] p-1">
          <button
            type="button"
            onClick={() => setActiveArea('preview')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeArea === 'preview'
                ? 'bg-[#00D4FF] text-[#051320] shadow-[0_0_12px_rgba(0,212,255,0.4)]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>3D Live Preview</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveArea('source')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeArea === 'source'
                ? 'bg-[#00D4FF] text-[#051320] shadow-[0_0_12px_rgba(0,212,255,0.4)]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Source Code</span>
          </button>
        </div>

        {/* Live System Status Pills */}
        <div className="hidden items-center gap-2 lg:flex">
          <div
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
              sensorOnline
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                : 'border-red-500/40 bg-red-500/10 text-red-300'
            }`}
          >
            {sensorOnline ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
            <span>ESP32 {sensorOnline ? 'ONLINE' : 'OFFLINE'}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-[#102438] px-2.5 py-1 text-[11px] font-medium text-[#00D4FF]">
            <Cpu className="h-3.5 w-3.5" />
            <span>{autoMode ? 'AUTO MODE' : 'MANUAL'}</span>
          </div>
        </div>
      </header>

      {/* ==================== MAIN CONTENT AREA ==================== */}
      {activeArea === 'preview' ? (
        <div className="relative flex min-h-0 flex-1 overflow-hidden">
          {/* ---------- LEFT SIDEBAR: NAVIGATION + CONTROLS ---------- */}
          <aside
            className={`z-20 flex shrink-0 flex-col border-r border-cyan-500/20 bg-[#0d1f33]/92 backdrop-blur-md transition-all duration-300 ${
              leftOpen ? 'w-72' : 'w-0 overflow-hidden border-r-0'
            }`}
          >
            <div className="flex-1 space-y-4 overflow-y-auto p-3.5">
              {/* Environment Page Switcher */}
              <div>
                <div className="mb-2 flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-cyan-400">
                  <Layers className="h-3.5 w-3.5" />
                  <span>3D Environment Pages</span>
                </div>
                <div className="grid gap-2">
                  <button
                    type="button"
                    onClick={() => setActivePage('lake')}
                    className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all ${
                      activePage === 'lake'
                        ? 'border-[#00D4FF] bg-[#00D4FF]/15 shadow-[0_0_14px_rgba(0,212,255,0.16)]'
                        : 'border-slate-700/60 bg-[#102438]/60 hover:border-cyan-500/40'
                    }`}
                  >
                    <div className={`rounded-lg p-2 ${activePage === 'lake' ? 'bg-[#00D4FF] text-[#081522]' : 'bg-[#081522] text-cyan-400'}`}>
                      <Trees className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#EAF6FF]">Page 1: Lake Monitoring</div>
                      <div className="truncate text-[10px] text-slate-400">Natural lake outlet &amp; shoreline</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivePage('residential')}
                    className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all ${
                      activePage === 'residential'
                        ? 'border-[#00D4FF] bg-[#00D4FF]/15 shadow-[0_0_14px_rgba(0,212,255,0.16)]'
                        : 'border-slate-700/60 bg-[#102438]/60 hover:border-cyan-500/40'
                    }`}
                  >
                    <div className={`rounded-lg p-2 ${activePage === 'residential' ? 'bg-[#00D4FF] text-[#081522]' : 'bg-[#081522] text-cyan-400'}`}>
                      <Home className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#EAF6FF]">Page 2: Residential River</div>
                      <div className="truncate text-[10px] text-slate-400">Urban concrete channel &amp; housing</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Automatic Gate Controls */}
              <div className="rounded-xl border border-cyan-500/20 bg-[#102438]/70 p-3">
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-cyan-400">
                    <Gauge className="h-3.5 w-3.5" />
                    Gate Actuator Control
                  </span>
                  <span className="font-mono text-[11px] font-bold text-[#00D4FF]">{Math.round(gatePosition)}%</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleOpenGate}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/15 py-2 text-[11px] font-semibold text-[#EAF6FF] transition hover:bg-cyan-500/30"
                  >
                    <ArrowUp className="h-3.5 w-3.5 text-[#00D4FF]" />
                    OPEN GATE
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseGate}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-600/70 bg-[#081522]/80 py-2 text-[11px] font-semibold text-slate-200 transition hover:border-cyan-400/50"
                  >
                    <ArrowDown className="h-3.5 w-3.5 text-amber-400" />
                    CLOSE GATE
                  </button>
                  <button
                    type="button"
                    onClick={handleAutoMode}
                    className={`flex items-center justify-center gap-1.5 rounded-lg border py-2 text-[11px] font-semibold transition ${
                      autoMode
                        ? 'border-[#22C55E] bg-[#22C55E]/20 text-emerald-300 shadow-[0_0_10px_rgba(34,197,94,0.2)]'
                        : 'border-slate-600/70 bg-[#081522]/80 text-slate-300 hover:border-emerald-400/50'
                    }`}
                  >
                    <Play className="h-3.5 w-3.5" />
                    AUTO MODE
                  </button>
                  <button
                    type="button"
                    onClick={handleStopGate}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-red-500/40 bg-red-500/15 py-2 text-[11px] font-semibold text-red-300 transition hover:bg-red-500/30"
                  >
                    <Square className="h-3.5 w-3.5" />
                    STOP
                  </button>
                </div>

                {/* Active Auto-Rule Readout */}
                <div className="mt-2.5 rounded-lg border border-cyan-500/15 bg-[#081522]/80 px-2.5 py-2 text-[10.5px] leading-snug text-slate-300">
                  <span className="font-mono text-[9.5px] uppercase text-cyan-400">Active Logic: </span>
                  {!sensorOnline
                    ? 'Paused safely (Sensor Offline)'
                    : autoMode
                    ? autoDecision.rule
                    : `Manual Override → Target ${targetGate}%`}
                </div>
              </div>

              {/* Interactive Sensor Simulation Sliders */}
              <div className="rounded-xl border border-cyan-500/20 bg-[#102438]/70 p-3">
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-cyan-400">
                    <Sliders className="h-3.5 w-3.5" />
                    Sensor Simulation
                  </span>
                  <button
                    type="button"
                    onClick={() => setSensorOnline((v) => !v)}
                    className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold transition ${
                      sensorOnline
                        ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300'
                        : 'border-red-500/50 bg-red-500/15 text-red-300'
                    }`}
                  >
                    {sensorOnline ? 'ONLINE' : 'OFFLINE'}
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Water Level Slider */}
                  <div>
                    <div className="mb-1 flex justify-between text-[11px]">
                      <span className="text-slate-300">Water Level</span>
                      <span className="font-mono font-semibold" style={{ color: levelSt.color }}>
                        {waterLevel}% ({upstreamMeters}m)
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={waterLevel}
                      onChange={(e) => setWaterLevel(Number(e.target.value))}
                      className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-[#00D4FF]"
                    />
                  </div>

                  {/* Turbidity Slider */}
                  <div>
                    <div className="mb-1 flex justify-between text-[11px]">
                      <span className="text-slate-300">Turbidity</span>
                      <span className="font-mono font-semibold" style={{ color: turbSt.color }}>
                        {turbidity} NTU
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={turbidity}
                      onChange={(e) => setTurbidity(Number(e.target.value))}
                      className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-amber-400"
                    />
                  </div>

                  {/* Water Flow Slider */}
                  <div>
                    <div className="mb-1 flex justify-between text-[11px]">
                      <span className="text-slate-300">Water Flow</span>
                      <span className="font-mono font-semibold" style={{ color: flowSt.color }}>
                        {waterFlow}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={waterFlow}
                      onChange={(e) => setWaterFlow(Number(e.target.value))}
                      className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-emerald-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ---------- CENTER 3D VIEWPORT ---------- */}
          <main className="relative min-w-0 flex-1 bg-[#081522]">
            <SmartWater3DCanvas
              activePage={activePage}
              waterLevel={waterLevel}
              turbidity={turbidity}
              waterFlow={waterFlow}
              gatePosition={gatePosition}
              gateVelocity={gateVelocity}
              sensorOnline={sensorOnline}
              cameraCommand={cameraCommand}
              autoOrbit={autoOrbit}
              onHoverComponent={setHoveredPart}
            />

            {/* Panel Collapse Toggles */}
            <button
              type="button"
              onClick={() => setLeftOpen((v) => !v)}
              title={leftOpen ? 'Collapse Controls' : 'Expand Controls'}
              className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/30 bg-[#081522]/80 text-cyan-300 backdrop-blur-md hover:border-[#00D4FF]"
            >
              {leftOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={() => setRightOpen((v) => !v)}
              title={rightOpen ? 'Collapse Monitoring' : 'Expand Monitoring'}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/30 bg-[#081522]/80 text-cyan-300 backdrop-blur-md hover:border-[#00D4FF]"
            >
              {rightOpen ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
            </button>

            {/* Upstream / Downstream Head Differential Badge */}
            <div className="pointer-events-none absolute left-14 top-3 z-10 hidden items-center gap-3 rounded-xl border border-cyan-500/25 bg-[#081522]/80 px-3 py-1.5 backdrop-blur-md sm:flex">
              <div className="text-[10.5px]">
                <span className="text-slate-400">Upstream: </span>
                <span className="font-mono font-bold text-[#00D4FF]">{upstreamMeters}m</span>
              </div>
              <div className="h-3 w-px bg-cyan-500/30" />
              <div className="text-[10.5px]">
                <span className="text-slate-400">Downstream: </span>
                <span className="font-mono font-bold text-emerald-300">{downstreamMeters}m</span>
              </div>
              <div className="h-3 w-px bg-cyan-500/30" />
              <div className="text-[10.5px]">
                <span className="text-slate-400">ΔH: </span>
                <span className="font-mono font-bold text-amber-300">
                  {(Number(upstreamMeters) - Number(downstreamMeters)).toFixed(2)}m
                </span>
              </div>
            </div>

            {/* 3D Component Hover Inspector Pill */}
            {hoveredPart && COMPONENT_INFO[hoveredPart] && (
              <div className="pointer-events-none absolute left-1/2 top-14 z-10 w-72 -translate-x-1/2 rounded-xl border border-[#00D4FF]/50 bg-[#081522]/90 p-3 shadow-2xl backdrop-blur-md">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#00D4FF]">
                  <Info className="h-3.5 w-3.5 shrink-0" />
                  <span>{COMPONENT_INFO[hoveredPart].name}</span>
                </div>
                <div className="mt-0.5 font-mono text-[10px] text-emerald-300">
                  {COMPONENT_INFO[hoveredPart].role}
                </div>
                <p className="mt-1 text-[11px] leading-snug text-slate-300">
                  {COMPONENT_INFO[hoveredPart].desc}
                </p>
              </div>
            )}

            {/* Bottom 3D Camera Controls Overlay */}
            <div className="absolute bottom-3.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-[#081522]/85 p-1.5 shadow-xl backdrop-blur-md">
              <button
                type="button"
                onClick={() => triggerCamera('iso')}
                className="rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-slate-200 transition hover:bg-[#00D4FF]/20 hover:text-[#00D4FF]"
              >
                Isometric
              </button>
              <button
                type="button"
                onClick={() => triggerCamera('top')}
                className="rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-slate-200 transition hover:bg-[#00D4FF]/20 hover:text-[#00D4FF]"
              >
                Top View
              </button>
              <button
                type="button"
                onClick={() => triggerCamera('side')}
                className="rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-slate-200 transition hover:bg-[#00D4FF]/20 hover:text-[#00D4FF]"
              >
                Side View
              </button>
              <div className="mx-0.5 h-4 w-px bg-cyan-500/25" />
              <button
                type="button"
                onClick={() => setAutoOrbit((v) => !v)}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition ${
                  autoOrbit ? 'bg-[#00D4FF] text-[#081522]' : 'text-slate-200 hover:bg-[#00D4FF]/20'
                }`}
              >
                <Compass className="h-3.5 w-3.5" />
                <span>Orbit</span>
              </button>
              <button
                type="button"
                onClick={() => triggerCamera('reset')}
                className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-slate-200 transition hover:bg-[#00D4FF]/20 hover:text-[#00D4FF]"
                title="Reset Camera"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </main>

          {/* ---------- RIGHT PANEL: SENSOR MONITORING DASHBOARD ---------- */}
          <aside
            className={`z-20 flex shrink-0 flex-col border-l border-cyan-500/20 bg-[#0d1f33]/92 backdrop-blur-md transition-all duration-300 ${
              rightOpen ? 'w-80' : 'w-0 overflow-hidden border-l-0'
            }`}
          >
            <div className="flex-1 space-y-3 overflow-y-auto p-3.5">
              {/* Header & Simulated Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-cyan-400">
                  <Activity className="h-3.5 w-3.5" />
                  <span>Live Telemetry</span>
                </div>
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 font-mono text-[9.5px] text-amber-300">
                  Simulated Telemetry Data
                </span>
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-2 gap-2">
                {/* Water Level */}
                <div
                  className="rounded-xl border p-2.5"
                  style={{ backgroundColor: levelSt.bg, borderColor: levelSt.border }}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-300">
                    <span>WATER LEVEL</span>
                    <Droplets className="h-3.5 w-3.5" style={{ color: levelSt.color }} />
                  </div>
                  <div className="mt-1 font-mono text-xl font-bold text-[#EAF6FF]">
                    {sensorOnline ? `${waterLevel}%` : '--'}
                  </div>
                  <div className="mt-0.5 text-[10px] font-semibold" style={{ color: levelSt.color }}>
                    {sensorOnline ? `${levelSt.label} • ${upstreamMeters}m` : 'No Signal'}
                  </div>
                </div>

                {/* Turbidity */}
                <div
                  className="rounded-xl border p-2.5"
                  style={{ backgroundColor: turbSt.bg, borderColor: turbSt.border }}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-300">
                    <span>TURBIDITY</span>
                    <Waves className="h-3.5 w-3.5" style={{ color: turbSt.color }} />
                  </div>
                  <div className="mt-1 font-mono text-xl font-bold text-[#EAF6FF]">
                    {sensorOnline ? `${turbidity}` : '--'}
                    <span className="ml-1 text-xs font-normal text-slate-300">NTU</span>
                  </div>
                  <div className="mt-0.5 text-[10px] font-semibold" style={{ color: turbSt.color }}>
                    {sensorOnline ? turbSt.label : 'No Signal'}
                  </div>
                </div>

                {/* Water Flow Rate */}
                <div
                  className="rounded-xl border p-2.5"
                  style={{ backgroundColor: flowSt.bg, borderColor: flowSt.border }}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-300">
                    <span>FLOW RATE</span>
                    <RefreshCw className="h-3.5 w-3.5" style={{ color: flowSt.color }} />
                  </div>
                  <div className="mt-1 font-mono text-lg font-bold text-[#EAF6FF]">
                    {sensorOnline ? `${flowM3s}` : '--'}
                    <span className="ml-1 text-[11px] font-normal text-slate-300">m³/s</span>
                  </div>
                  <div className="mt-0.5 text-[10px] font-semibold" style={{ color: flowSt.color }}>
                    {sensorOnline ? `${waterFlow}% • ${flowSt.label}` : 'No Signal'}
                  </div>
                </div>

                {/* Operating Mode */}
                <div className="rounded-xl border border-cyan-500/25 bg-[#102438]/80 p-2.5">
                  <div className="flex items-center justify-between text-[10px] text-slate-300">
                    <span>CONTROL MODE</span>
                    <Cpu className="h-3.5 w-3.5 text-[#00D4FF]" />
                  </div>
                  <div className="mt-1 font-mono text-lg font-bold text-[#00D4FF]">
                    {autoMode ? 'AUTO' : 'MANUAL'}
                  </div>
                  <div className="mt-0.5 text-[10px] text-slate-400">
                    {gateVelocity !== 0 ? (gateVelocity > 0 ? 'Opening...' : 'Closing...') : 'Standby'}
                  </div>
                </div>
              </div>

              {/* Gate Position Progress Bar */}
              <div className="rounded-xl border border-cyan-500/20 bg-[#102438]/75 p-3">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-300">Gate Position</span>
                  <span className="font-mono font-bold text-[#00D4FF]">{Math.round(gatePosition)}% Open</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#081522]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-150"
                    style={{ width: `${gatePosition}%` }}
                  />
                </div>
              </div>

              {/* ESP32 & IoT Cloud Connection Status */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 rounded-xl border border-slate-700/60 bg-[#102438]/75 p-2.5">
                  <Radio className={`h-4 w-4 shrink-0 ${sensorOnline ? 'text-emerald-400' : 'text-red-400'}`} />
                  <div className="min-w-0">
                    <div className="text-[9.5px] uppercase text-slate-400">ESP32 Link</div>
                    <div className={`truncate text-xs font-bold ${sensorOnline ? 'text-emerald-400' : 'text-red-400'}`}>
                      {sensorOnline ? 'Online' : 'Offline'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-slate-700/60 bg-[#102438]/75 p-2.5">
                  <Cloud className={`h-4 w-4 shrink-0 ${sensorOnline ? 'text-[#00D4FF]' : 'text-slate-500'}`} />
                  <div className="min-w-0">
                    <div className="text-[9.5px] uppercase text-slate-400">IoT Cloud</div>
                    <div className={`truncate text-xs font-bold ${sensorOnline ? 'text-[#00D4FF]' : 'text-red-400'}`}>
                      {sensorOnline ? 'Connected' : 'Disconnected'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-Time Telemetry AreaChart */}
              <div className="rounded-xl border border-cyan-500/20 bg-[#102438]/75 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
                    Sensor Telemetry Trend
                  </span>
                  <div className="flex items-center gap-2 text-[9.5px]">
                    <span className="text-[#00D4FF]">● Level</span>
                    <span className="text-amber-400">● NTU</span>
                    <span className="text-emerald-400">● Flow</span>
                  </div>
                </div>
                <TelemetryAreaChart data={history} />
              </div>

              {/* Legend Note */}
              <div className="flex items-start gap-2 rounded-lg border border-cyan-500/15 bg-[#081522]/70 p-2.5 text-[10.5px] text-slate-400">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#00D4FF]" />
                <span>
                  Hover over any 3D component (Staff Gauge, Sensors, ESP32, Actuator, Gate, IoT Cloud) to inspect its engineering role.
                </span>
              </div>
            </div>
          </aside>
        </div>
      ) : (
        /* ==================== AREA B: SOURCE CODE VIEWER ==================== */
        <div className="flex min-h-0 flex-1 overflow-hidden bg-[#081522]">
          {/* Project Folder Tree */}
          <aside className="flex w-64 shrink-0 flex-col border-r border-cyan-500/20 bg-[#0c1d30] p-3">
            <div className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-[#00D4FF]">
              <FolderTree className="h-4 w-4" />
              <span>Project Explorer</span>
            </div>

            <div className="flex-1 space-y-1 overflow-y-auto text-xs">
              {['src/components', 'src/pages', 'src'].map((folder) => {
                const filesInFolder = PROJECT_FILES.filter((f) => f.folder === folder);
                const isExpanded = expandedFolders[folder];
                return (
                  <div key={folder} className="mb-1.5">
                    <button
                      type="button"
                      onClick={() => setExpandedFolders((prev) => ({ ...prev, [folder]: !prev[folder] }))}
                      className="flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 font-mono text-[11px] font-semibold text-slate-300 hover:bg-cyan-500/10"
                    >
                      {isExpanded ? <ChevronDown className="h-3.5 w-3.5 text-cyan-400" /> : <ChevronRight className="h-3.5 w-3.5 text-cyan-400" />}
                      <span>{folder}/</span>
                    </button>
                    {isExpanded && (
                      <div className="ml-3 mt-0.5 space-y-0.5 border-l border-cyan-500/20 pl-2">
                        {filesInFolder.map((file) => (
                          <button
                            key={file.path}
                            type="button"
                            onClick={() => setSelectedFile(file.path)}
                            className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left font-mono text-[11.5px] transition ${
                              selectedFile === file.path
                                ? 'bg-[#00D4FF]/20 font-semibold text-[#00D4FF]'
                                : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-200'
                            }`}
                          >
                            <FileCode className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">{file.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleDownloadSource}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#00D4FF] bg-[#00D4FF]/15 py-2.5 text-xs font-semibold text-[#EAF6FF] transition hover:bg-[#00D4FF]/30"
            >
              <Download className="h-4 w-4 text-[#00D4FF]" />
              <span>DOWNLOAD SOURCE CODE</span>
            </button>
          </aside>

          {/* Code Display Panel */}
          <section className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center justify-between border-b border-cyan-500/20 bg-[#102438]/70 px-4 py-2.5">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-300">
                <FileCode className="h-4 w-4" />
                <span>{activeFileObj.path}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 rounded-lg border border-cyan-500/35 bg-[#081522] px-3 py-1.5 text-xs font-semibold text-[#EAF6FF] transition hover:border-[#00D4FF]"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-[#00D4FF]" />}
                  <span>{copied ? 'COPIED!' : 'COPY CODE'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadSource}
                  className="flex items-center gap-1.5 rounded-lg bg-[#00D4FF] px-3 py-1.5 text-xs font-bold text-[#081522] transition hover:bg-cyan-300"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">DOWNLOAD</span>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto bg-[#06101b] p-4">
              <HighlightedCode code={activeFileObj.code} />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}