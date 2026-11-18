import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { fragmentShader, MAX_RIPPLES, vertexShader } from './shaders'

type Variant = 'hero' | 'calm'

const PALETTES: Record<Variant, { deep: number[]; mid: number[]; light: number[]; caustic: number; flow: number }> = {
  // Slate-tinted lake water; light picks up the sky blue of the logo.
  hero: { deep: [0.027, 0.067, 0.11], mid: [0.08, 0.26, 0.4], light: [0.62, 0.88, 0.98], caustic: 0.95, flow: 0.8 },
  calm: { deep: [0.027, 0.067, 0.11], mid: [0.06, 0.16, 0.26], light: [0.6, 0.86, 0.96], caustic: 0.3, flow: 0.6 },
}

type Props = {
  variant?: Variant
  className?: string
  /** React to pointer movement / taps with ripples. */
  interactive?: boolean
}

/**
 * Lightweight WebGL water surface.
 *  - Renders at reduced resolution (the image is soft, so upscaling is invisible).
 *  - Adapts quality to frame time; drops to a still frame on slow devices.
 *  - Pauses when off-screen or when the tab is hidden.
 *  - prefers-reduced-motion → single still frame, no ripples.
 *  - No WebGL → CSS gradient fallback.
 */
export function WaterCanvas({ variant = 'hero', className = '', interactive = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
      preserveDrawingBuffer: false,
    })
    if (!gl) {
      setFallback(true)
      return
    }

    const program = createProgram(gl, vertexShader, fragmentShader)
    if (!program) {
      setFallback(true)
      return
    }
    gl.useProgram(program)

    // Full-screen triangle
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const u = {
      res: gl.getUniformLocation(program, 'uRes'),
      time: gl.getUniformLocation(program, 'uTime'),
      pointer: gl.getUniformLocation(program, 'uPointer'),
      pointerOn: gl.getUniformLocation(program, 'uPointerOn'),
      rip: gl.getUniformLocation(program, 'uRip'),
      caustic: gl.getUniformLocation(program, 'uCaustic'),
      flow: gl.getUniformLocation(program, 'uFlow'),
      deep: gl.getUniformLocation(program, 'uDeep'),
      mid: gl.getUniformLocation(program, 'uMid'),
      light: gl.getUniformLocation(program, 'uLight'),
    }

    const pal = PALETTES[variant]
    gl.uniform3fv(u.deep, pal.deep)
    gl.uniform3fv(u.mid, pal.mid)
    gl.uniform3fv(u.light, pal.light)
    gl.uniform1f(u.caustic, pal.caustic)
    gl.uniform1f(u.flow, pal.flow)

    // ── Quality / performance budget ─────────────────────────
    const nav = navigator as Navigator & { deviceMemory?: number }
    const lowEnd = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4
    const small = window.matchMedia('(max-width: 768px)').matches
    let quality = lowEnd ? 0.4 : small ? 0.5 : 0.6
    const MIN_QUALITY = 0.3

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, Math.round(rect.width * dpr * quality))
      const h = Math.max(1, Math.round(rect.height * dpr * quality))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
      gl.uniform2f(u.res, w, h)
    }

    // ── Ripples ──────────────────────────────────────────────
    const ripples = new Float32Array(MAX_RIPPLES * 4)
    let rippleCursor = 0
    const t0 = performance.now()
    const now = () => (performance.now() - t0) / 1000

    const addRipple = (x: number, y: number, strength: number) => {
      const i = rippleCursor * 4
      ripples[i] = x
      ripples[i + 1] = y
      ripples[i + 2] = now()
      ripples[i + 3] = strength
      rippleCursor = (rippleCursor + 1) % MAX_RIPPLES
    }

    const pointer = { x: 0.5, y: 0.5, on: 0, target: 0 }
    let lastSpawn = { x: -1, y: -1, t: 0 }

    const toLocal = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = 1 - (e.clientY - r.top) / r.height
      const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1
      return { x, y, inside, aspect: r.width / r.height }
    }

    const onMove = (e: PointerEvent) => {
      const p = toLocal(e)
      if (!p.inside) {
        pointer.target = 0
        return
      }
      pointer.x = p.x
      pointer.y = p.y
      pointer.target = e.pointerType === 'mouse' ? 1 : 0
      const dx = (p.x - lastSpawn.x) * p.aspect
      const dy = p.y - lastSpawn.y
      const t = now()
      if (Math.hypot(dx, dy) > 0.07 && t - lastSpawn.t > 0.09) {
        addRipple(p.x, p.y, 0.5)
        lastSpawn = { x: p.x, y: p.y, t }
      }
    }
    const onDown = (e: PointerEvent) => {
      const p = toLocal(e)
      if (p.inside) addRipple(p.x, p.y, 1)
    }
    const onLeave = () => {
      pointer.target = 0
    }

    // ── Loop ─────────────────────────────────────────────────
    let raf = 0
    let visible = true
    let running = false
    let frames = 0
    let acc = 0
    let last = performance.now()

    const draw = (time: number) => {
      pointer.on += (pointer.target - pointer.on) * 0.06
      gl.uniform1f(u.time, time)
      gl.uniform2f(u.pointer, pointer.x, pointer.y)
      gl.uniform1f(u.pointerOn, pointer.on)
      gl.uniform4fv(u.rip, ripples)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const frame = () => {
      const ts = performance.now()
      const dt = ts - last
      last = ts
      draw(now())

      // Adaptive quality: sample 90 frames, step down if we miss ~40fps.
      frames++
      acc += dt
      if (frames === 90) {
        const avg = acc / frames
        if (avg > 25) {
          if (quality > MIN_QUALITY) {
            quality = Math.max(MIN_QUALITY, quality * 0.75)
            resize()
          } else {
            // Device can't keep up: settle on a still frame.
            stop()
            return
          }
        }
        frames = 0
        acc = 0
      }
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (running || reduced) return
      running = true
      last = performance.now()
      frames = 0
      acc = 0
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    resize()
    draw(reduced ? 14 : 0)

    const ro = new ResizeObserver(() => {
      resize()
      if (!running) draw(reduced ? 14 : now())
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !document.hidden) start()
        else stop()
      },
      { rootMargin: '80px' },
    )
    io.observe(canvas)

    const onVisibility = () => {
      if (document.hidden) stop()
      else if (visible) start()
    }
    document.addEventListener('visibilitychange', onVisibility)

    // Listen on window: the canvas sits under the content and ignores pointer events.
    if (interactive && !reduced) {
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerdown', onDown, { passive: true })
      document.documentElement.addEventListener('pointerleave', onLeave)
    }

    const onLost = (e: Event) => {
      e.preventDefault()
      stop()
      setFallback(true)
    }
    canvas.addEventListener('webglcontextlost', onLost)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('webglcontextlost', onLost)
      gl.deleteBuffer(buf)
      gl.deleteProgram(program)
    }
  }, [variant, reduced, interactive])

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {fallback ? (
        <div className="water-fallback absolute inset-0" />
      ) : (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      )}
    </div>
  )
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)
  if (!s) return null
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn('[WaterCanvas] shader error:', gl.getShaderInfoLog(s))
    gl.deleteShader(s)
    return null
  }
  return s
}

function createProgram(gl: WebGLRenderingContext, vs: string, fs: string) {
  const v = compile(gl, gl.VERTEX_SHADER, vs)
  const f = compile(gl, gl.FRAGMENT_SHADER, fs)
  if (!v || !f) return null
  const p = gl.createProgram()
  if (!p) return null
  gl.attachShader(p, v)
  gl.attachShader(p, f)
  gl.linkProgram(p)
  gl.deleteShader(v)
  gl.deleteShader(f)
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.warn('[WaterCanvas] link error:', gl.getProgramInfoLog(p))
    return null
  }
  return p
}
