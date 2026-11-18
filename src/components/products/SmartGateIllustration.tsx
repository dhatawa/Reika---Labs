/**
 * Conceptual cross-section of the Smart Gate system.
 * Purely illustrative — it does not display or imply live sensor data.
 */
export function SmartGateIllustration({ className = '' }: { className?: string }) {
  const sky = '#00b7f9'
  const line = 'rgb(201 212 222 / 0.45)'
  const label = 'rgb(201 212 222 / 0.9)'
  const mono = 'JetBrains Mono Variable, monospace'

  // Staff gauge on the lake bed: tick every 8 units, long tick every 32
  const gaugeTicks = []
  for (let y = 248; y <= 408; y += 8) {
    const major = (y - 248) % 32 === 0
    gaugeTicks.push(<line key={y} x1={70} x2={major ? 84 : 78} y1={y} y2={y} stroke={label} strokeWidth="1" />)
  }

  return (
    <svg viewBox="0 0 640 480" className={className} role="img" aria-labelledby="sg-fig-title sg-fig-desc" fill="none">
      <title id="sg-fig-title">Smart Gate concept diagram</title>
      <desc id="sg-fig-desc">
        Cross-section of a lake and an automated gate. A staff gauge marks the lake level. A water level sensor and a
        turbidity sensor connect to an ESP32 controller that drives the gate actuator and sends data to a cloud
        platform, a machine learning model and a web dashboard.
      </desc>

      <defs>
        <linearGradient id="sg-lake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12507e" />
          <stop offset="1" stopColor="#0d2a44" />
        </linearGradient>
      </defs>

      {/* ── Data pipeline ─────────────────────────────── */}
      <g fontFamily={mono} fontSize="11">
        {[
          { x: 300, label: 'IoT cloud' },
          { x: 410, label: 'ML model' },
          { x: 520, label: 'Dashboard' },
        ].map((n, i) => (
          <g key={n.label}>
            <rect x={n.x} y="40" width="96" height="32" rx="8" stroke={i === 1 ? sky : line} />
            <text x={n.x + 48} y="60" textAnchor="middle" fill={i === 1 ? sky : label}>
              {n.label}
            </text>
          </g>
        ))}
        <path d="M396 56 H410 M506 56 H520" stroke={line} />
      </g>
      <path d="M346 188 V72" stroke={sky} strokeOpacity="0.7" strokeDasharray="4 6" />

      {/* ── Banks ─────────────────────────────────────── */}
      <path d="M20 296 C 60 296, 70 296, 90 326 C 120 396, 200 426, 270 416 L 300 416 L 300 296" stroke={line} />
      <path d="M392 356 L 392 416 L 620 416" stroke={line} />

      {/* Lake */}
      <path
        d="M28 296 C 60 292, 90 300, 120 296 S 180 292, 210 296 S 270 300, 300 296 L 300 416 L 270 416 C 200 426, 120 396, 90 326 C 74 302, 60 297, 28 296 Z"
        fill="url(#sg-lake)"
      />
      <path d="M28 296 C 60 292, 90 300, 120 296 S 180 292, 210 296 S 270 300, 300 296" stroke={sky} />
      <path d="M120 384 C 170 396, 230 408, 296 404" stroke="rgb(201 212 222 / 0.25)" strokeDasharray="2 6" />

      {/* Staff gauge — the signature */}
      <path d="M70 240 V 412" stroke={label} strokeWidth="1.5" />
      {gaugeTicks}

      {/* Channel */}
      <path d="M392 376 C 450 372, 520 380, 620 376 L 620 416 L 392 416 Z" fill="#0f3a5c" />
      <path d="M392 376 C 450 372, 520 380, 620 376" stroke={sky} strokeOpacity="0.7" />

      {/* ── Gate ──────────────────────────────────────── */}
      <rect x="300" y="228" width="14" height="188" fill="#0d1b2a" stroke={line} />
      <rect x="378" y="228" width="14" height="188" fill="#0d1b2a" stroke={line} />
      <rect x="300" y="220" width="92" height="12" fill="#0d1b2a" stroke={line} />
      <rect x="318" y="296" width="56" height="84" rx="4" fill="#12507e" stroke={sky} />
      <path d="M346 232 V296" stroke={sky} strokeWidth="2" />
      <path d="M300 400 H392 M300 408 H392" stroke={sky} strokeOpacity="0.6" />

      {/* Controller */}
      <rect x="326" y="188" width="40" height="32" rx="6" fill="#07111c" stroke={sky} />
      <circle cx="338" cy="204" r="3" fill={sky} />

      {/* ── Sensors ───────────────────────────────────── */}
      <path d="M150 296 V200 H186" stroke={line} />
      <rect x="186" y="192" width="28" height="16" rx="4" fill="#07111c" stroke={sky} />
      <path d="M200 208 V292" stroke={sky} strokeDasharray="3 5" strokeOpacity="0.8" />
      <path d="M240 296 V356" stroke={line} />
      <rect x="234" y="352" width="12" height="24" rx="6" fill="#07111c" stroke={sky} />
      <path d="M214 200 H290 Q300 200 300 206 H326" stroke={line} strokeDasharray="1 4" />
      <path d="M240 296 V284 H284 Q296 284 296 272 V212 H326" stroke={line} strokeDasharray="1 4" />

      {/* ── Annotations ───────────────────────────────── */}
      <g fontFamily={mono} fontSize="11" fill={label}>
        <text x="150" y="180">Level sensor</text>
        <text x="200" y="456">Turbidity sensor</text>
        <path d="M240 376 V444" stroke={line} />
        <text x="380" y="184">ESP32 + actuator</text>
        <text x="408" y="260">Gate</text>
        <path d="M392 256 H402" stroke={line} />
        <text x="24" y="228">Staff gauge</text>
        <text x="500" y="400">Channel</text>
      </g>
    </svg>
  )
}
