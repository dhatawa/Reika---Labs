export const MAX_RIPPLES = 12

export const vertexShader = /* glsl */ `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

/**
 * Underwater surface: domain-warped currents, animated caustic web,
 * soft light shafts from above, and pointer-driven ripple rings that
 * displace everything they pass through.
 */
export const fragmentShader = /* glsl */ `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 vUv;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform float uPointerOn;
uniform vec4 uRip[${MAX_RIPPLES}];
uniform float uCaustic;
uniform float uFlow;
uniform vec3 uDeep;
uniform vec3 uMid;
uniform vec3 uLight;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

// Distance between nearest and second-nearest moving cell points.
// Small values trace the bright "web" of light seen on a pool floor.
float cellEdge(vec2 p, float t) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float f1 = 8.0;
  float f2 = 8.0;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 g = vec2(float(x), float(y));
      vec2 o = hash2(i + g);
      o = 0.5 + 0.42 * sin(t + 6.2831 * o);
      float d = length(g + o - f);
      if (d < f1) { f2 = f1; f1 = d; }
      else if (d < f2) { f2 = d; }
    }
  }
  return f2 - f1;
}

void main() {
  vec2 uv = vUv;
  float aspect = uRes.x / uRes.y;
  float t = uTime * uFlow;

  // ── Ripples ────────────────────────────────────────────
  vec2 disp = vec2(0.0);
  float hi = 0.0;
  for (int i = 0; i < ${MAX_RIPPLES}; i++) {
    vec4 r = uRip[i];
    if (r.w <= 0.0) continue;
    float age = uTime - r.z;
    if (age < 0.0 || age > 3.6) continue;
    vec2 d = (uv - r.xy) * vec2(aspect, 1.0);
    float dist = length(d);
    float w = dist - age * 0.26;
    float env = r.w * exp(-age * 1.15) * exp(-w * w * 110.0);
    float wave = sin(w * 58.0 - age * 2.0);
    disp += (d / max(dist, 1e-3)) * wave * env * 0.03;
    hi += max(wave, 0.0) * env;
  }

  vec2 p = vec2(uv.x * aspect, uv.y) * 1.5 + disp;

  // ── Currents (domain-warped body of water) ─────────────
  vec2 q = vec2(fbm(p + vec2(0.0, t * 0.02)), fbm(p + vec2(5.2, -t * 0.017)));
  float body = fbm(p * 1.15 + q * 2.0 + vec2(t * 0.01, 0.0));
  float depth = smoothstep(-0.1, 1.05, uv.y);

  vec3 col = mix(uDeep, uMid, smoothstep(0.25, 0.85, body) * (0.25 + 0.75 * depth));

  // ── Caustics ───────────────────────────────────────────
  vec2 warp = (q - 0.5) * 1.4;
  float e1 = cellEdge(p * 2.6 + warp, t * 0.55);
  float e2 = cellEdge(p * 4.4 - warp * 0.8 + 3.1, t * 0.7);
  // Soft, broken light rather than a crisp web: wide falloff, squared,
  // and faded by the current so it never reads as a mesh.
  float c1 = 1.0 - smoothstep(0.0, 0.32, e1);
  float c2 = 1.0 - smoothstep(0.0, 0.22, e2);
  float caustic = c1 * c1 * 0.6 + c2 * c2 * 0.3;
  caustic *= smoothstep(0.2, 0.75, body);
  col += uLight * caustic * uCaustic * (0.04 + 0.3 * depth * depth);

  // ── Light shafts from the surface ──────────────────────
  float rays = fbm(vec2(uv.x * 4.0 - uv.y * 1.4 + 0.3, t * 0.035));
  rays = smoothstep(0.5, 0.92, rays) * smoothstep(0.25, 1.0, uv.y);
  col += uLight * rays * 0.08 * uCaustic;

  // ── Ripple glints + pointer glow ───────────────────────
  col += uLight * hi * 0.18;
  vec2 pd = (uv - uPointer) * vec2(aspect, 1.0);
  col += uLight * 0.045 * exp(-dot(pd, pd) * 7.0) * uPointerOn;

  // ── Vignette, keep text area calm ──────────────────────
  float vig = smoothstep(1.35, 0.25, length((uv - vec2(0.58, 0.62)) * vec2(0.85, 1.0)));
  col *= mix(0.62, 1.0, vig);

  // Dither to prevent banding on dark gradients
  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.012;

  gl_FragColor = vec4(col, 1.0);
}
`
