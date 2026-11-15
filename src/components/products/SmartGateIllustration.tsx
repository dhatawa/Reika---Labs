/**
 * Conceptual cross-section of the Smart Gate system.
 * Purely illustrative — it does not display or imply live sensor data.
 */
export function SmartGateIllustration({ className = '' }: { className?: string }) {
  const line = '#8ae7f2'
  const muted = 'rgb(243 246 247 / 0.35)'
  return (
    <svg
      viewBox="0 0 640 490"
      className={className}
      role="img"
      aria-labelledby="sg-fig-title sg-fig-desc"
      fill="none"
    >
      <title id="sg-fig-title">Smart Gate concept diagram</title>
      <desc id="sg-fig-desc">
        Cross-section of a lake and an automated gate. A water level sensor and a turbidity sensor connect to an
        ESP32 controller that drives the gate actuator and sends data to a cloud platform, a machine learning model
        and a web dashboard.
      </desc>

      <defs>
        <pattern id="sg-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="rgb(243 246 247 / 0.08)" />
        </pattern>
        <linearGradient id="sg-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2fb6c9" stopOpacity="0.55" />
          <stop offset="1" stopColor="#0c2f55" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="sg-channel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2fb6c9" stopOpacity="0.35" />
          <stop offset="1" stopColor="#0c2f55" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      <rect width="640" height="490" fill="url(#sg-dots)" />

      {/* ── Data pipeline (top) ─────────────────────────── */}
      <g fontFamily="JetBrains Mono Variable, monospace" fontSize="9.5" letterSpacing="1.4">
        {[
          { x: 300, label: 'IoT CLOUD' },
          { x: 410, label: 'ML MODEL' },
          { x: 520, label: 'DASHBOARD' },
        ].map((n, i) => (
          <g key={n.label}>
            <rect x={n.x} y="40" width="92" height="34" rx="3" stroke={i === 1 ? line : muted} />
            <text x={n.x + 46} y="61" textAnchor="middle" fill={i === 1 ? line : 'rgb(243 246 247 / 0.75)'}>
              {n.label}
            </text>
          </g>
        ))}
        <path d="M392 57 H410 M502 57 H520" stroke={muted} className="flow-line" />
      </g>

      {/* Uplink from controller to cloud */}
      <path d="M346 190 V74" stroke={line} strokeOpacity="0.6" className="flow-line" />
      <g transform="translate(346 150)">
        <circle r="10" stroke={line} className="signal" />
        <circle r="10" stroke={line} className="signal" style={{ animationDelay: '1.4s' }} />
      </g>

      {/* ── Ground / banks ─────────────────────────────── */}
      <path
        d="M20 300 C 60 300, 70 300, 90 330 C 120 400, 200 430, 270 420 L 300 420 L 300 300"
        stroke={muted}
      />
      <path d="M392 360 L 392 420 L 620 420" stroke={muted} />

      {/* Lake water */}
      <g className="bob">
        <path
          d="M28 300 C 60 296, 90 304, 120 300 S 180 296, 210 300 S 270 304, 300 300 L 300 420 L 270 420 C 200 430, 120 400, 90 330 C 74 306, 60 301, 28 300 Z"
          fill="url(#sg-water)"
        />
        <path
          d="M28 300 C 60 296, 90 304, 120 300 S 180 296, 210 300 S 270 304, 300 300"
          stroke={line}
          strokeOpacity="0.8"
        />
      </g>

      {/* Sediment */}
      <path d="M120 388 C 170 400, 230 412, 296 408" stroke="rgb(243 246 247 / 0.18)" strokeDasharray="2 5" />

      {/* Channel water (right) */}
      <path d="M392 380 C 450 376, 520 384, 620 380 L 620 420 L 392 420 Z" fill="url(#sg-channel)" />
      <path d="M392 380 C 450 376, 520 384, 620 380" stroke={line} strokeOpacity="0.6" />

      {/* ── Gate structure ─────────────────────────────── */}
      <rect x="300" y="230" width="14" height="190" fill="#0a1730" stroke={muted} />
      <rect x="378" y="230" width="14" height="190" fill="#0a1730" stroke={muted} />
      <rect x="300" y="222" width="92" height="10" fill="#0a1730" stroke={muted} />
      {/* Gate leaf — partially raised */}
      <rect x="318" y="300" width="56" height="84" rx="2" fill="#12507e" fillOpacity="0.55" stroke={line} />
      <path d="M346 232 V300" stroke={line} strokeWidth="2" />
      {/* Flow through the opening */}
      <path d="M300 402 H392" stroke={line} strokeOpacity="0.9" className="flow-line" />
      <path d="M300 412 H392" stroke={line} strokeOpacity="0.5" className="flow-line" style={{ animationDelay: '-1.2s' }} />

      {/* Actuator + controller */}
      <rect x="326" y="190" width="40" height="32" rx="3" fill="#060d1c" stroke={line} />
      <circle cx="336" cy="206" r="2.5" fill={line} />

      {/* ── Sensors ────────────────────────────────────── */}
      {/* Water level sensor on a post */}
      <path d="M150 300 V200 H186" stroke={muted} />
      <rect x="186" y="192" width="26" height="16" rx="2" fill="#060d1c" stroke={line} />
      <path d="M199 208 V296" stroke={line} strokeDasharray="3 5" strokeOpacity="0.8" />
      {/* Turbidity probe */}
      <path d="M240 300 V360" stroke={muted} />
      <rect x="234" y="356" width="12" height="22" rx="6" fill="#060d1c" stroke={line} />
      {/* Wiring to controller */}
      <path d="M212 200 H290 Q300 200 300 206 H326" stroke={muted} strokeDasharray="1 4" />
      <path d="M240 300 V286 H284 Q296 286 296 274 V214 H326" stroke={muted} strokeDasharray="1 4" />

      {/* ── Annotations ────────────────────────────────── */}
      <g fontFamily="JetBrains Mono Variable, monospace" fontSize="9.5" letterSpacing="1.4" fill="rgb(243 246 247 / 0.75)">
        <text x="150" y="178">LEVEL SENSOR</text>
        <text x="200" y="470">TURBIDITY SENSOR</text>
        <path d="M240 380 V458" stroke={muted} />
        <text x="380" y="186">ESP32 + ACTUATOR</text>
        <text x="410" y="262">GATE</text>
        <path d="M392 258 H404" stroke={muted} />
        <text x="118" y="340" fill="rgb(138 231 242 / 0.85)">SITU BUGEL</text>
        <text x="500" y="404" fill="rgb(138 231 242 / 0.85)">CHANNEL</text>
      </g>

    </svg>
  )
}
