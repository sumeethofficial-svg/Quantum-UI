import { useEffect, useRef } from "react";

const norm = (v) => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
};

// Icosphere: an icosahedron, optionally subdivided, as vertices + unique edges
function buildIcosphere(subdivisions) {
  const t = (1 + Math.sqrt(5)) / 2;
  const verts = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ].map(norm);

  let faces = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];

  for (let s = 0; s < subdivisions; s++) {
    const cache = new Map();
    const mid = (a, b) => {
      const key = a < b ? `${a}_${b}` : `${b}_${a}`;
      if (cache.has(key)) return cache.get(key);
      const m = norm([
        (verts[a][0] + verts[b][0]) / 2,
        (verts[a][1] + verts[b][1]) / 2,
        (verts[a][2] + verts[b][2]) / 2,
      ]);
      verts.push(m);
      cache.set(key, verts.length - 1);
      return verts.length - 1;
    };
    const next = [];
    for (const [a, b, c] of faces) {
      const ab = mid(a, b);
      const bc = mid(b, c);
      const ca = mid(c, a);
      next.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
    }
    faces = next;
  }

  const seen = new Set();
  const edges = [];
  for (const [a, b, c] of faces) {
    for (const [p, q] of [[a, b], [b, c], [c, a]]) {
      const key = p < q ? `${p}_${q}` : `${q}_${p}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([p, q]);
      }
    }
  }
  return { verts, edges };
}

const clamp01 = (x) => Math.min(1, Math.max(0, x));

/* ---------- Polished chrome ----------
   A tube is drawn with a gradient ACROSS its width that mimics a mirror
   finish: dark edge, sharp specular streak, dark horizon, bounce light. */
const CHROME = [
  [0.0, [7, 8, 10]],
  [0.1, [43, 48, 54]],
  [0.24, [244, 248, 251]],
  [0.34, [170, 179, 186]],
  [0.46, [58, 64, 70]],
  [0.55, [11, 13, 15]],
  [0.68, [77, 85, 92]],
  [0.8, [217, 226, 232]],
  [0.92, [58, 64, 70]],
  [1.0, [7, 8, 10]],
];

const shade = (c, f) =>
  `rgb(${Math.min(255, c[0] * f) | 0},${Math.min(255, c[1] * f) | 0},${Math.min(255, c[2] * f) | 0})`;

function drawChromeTube(ctx, x0, y0, x1, y1, sw, lit, lx, ly) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.hypot(dx, dy);
  if (len < 1) return;

  let th = Math.atan2(dy, dx);
  // keep the bright side of the tube facing the light
  if (-Math.sin(th) * lx + Math.cos(th) * ly > 0) th += Math.PI;

  const f = 0.62 + 0.55 * lit;
  const hw = sw / 2;
  const he = hw * 0.5; // thinner toward the joints, like liquid metal
  const hc = 2 * hw - he;
  const half = len / 2;

  ctx.save();
  ctx.translate((x0 + x1) / 2, (y0 + y1) / 2);
  ctx.rotate(th);
  const g = ctx.createLinearGradient(0, -hw, 0, hw);
  for (let i = 0; i < CHROME.length; i++) g.addColorStop(CHROME[i][0], shade(CHROME[i][1], f));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(-half, -he);
  ctx.quadraticCurveTo(0, -hc, half, -he);
  ctx.lineTo(half, he);
  ctx.quadraticCurveTo(0, hc, -half, he);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawChromeJoint(ctx, x, y, r, f, lx, ly, glint) {
  const g = ctx.createRadialGradient(x + lx * r * 0.42, y + ly * r * 0.42, r * 0.04, x, y, r);
  g.addColorStop(0, shade([255, 255, 255], f));
  g.addColorStop(0.22, shade([230, 236, 240], f));
  g.addColorStop(0.5, shade([108, 116, 123], f));
  g.addColorStop(0.78, shade([18, 20, 22], f));
  g.addColorStop(0.92, shade([74, 82, 89], f));
  g.addColorStop(1, shade([10, 11, 12], f));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();

  // tiny specular dot
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.beginPath();
  ctx.arc(x + lx * r * 0.42, y + ly * r * 0.42, Math.max(0.8, r * 0.13), 0, Math.PI * 2);
  ctx.fill();

  // sharp glint on joints that catch the light, like the spikes in chrome renders
  if (glint > 0.05) {
    const L = r * 2.6;
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = `rgba(255,255,255,${0.45 * glint})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x - L, y);
    ctx.lineTo(x + L, y);
    ctx.moveTo(x, y - L * 0.8);
    ctx.lineTo(x, y + L * 0.8);
    ctx.stroke();
    ctx.globalCompositeOperation = "source-over";
  }
}

export default function ParticleOrb({ className = "", size = 0.34, speed = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let w = 0;
    let h = 0;
    let raf = 0;

    const shells = [
      { ...buildIcosphere(1), radius: 1, strut: 0.034, metal: 1 }, // outer cage
      { ...buildIcosphere(0), radius: 0.55, strut: 0.017, metal: 0.5 }, // inner lattice
    ].map((s) => ({
      ...s,
      rx: new Float32Array(s.verts.length),
      ry: new Float32Array(s.verts.length),
      rz: new Float32Array(s.verts.length),
      sx: new Float32Array(s.verts.length),
      sy: new Float32Array(s.verts.length),
      pp: new Float32Array(s.verts.length),
    }));

    const light = norm([-0.45, -0.6, 0.66]);
    const l2 = Math.hypot(light[0], light[1]) || 1;
    const lightX = light[0] / l2;
    const lightY = light[1] / l2;

    // Mouse tilt
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      pointer.tx = ((e.clientX - r.left) / r.width - 0.5) * 0.9;
      pointer.ty = ((e.clientY - r.top) / r.height - 0.5) * 0.9;
    };
    const onLeave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
    };

    // Click / tap -> cage opens up and the core flares, then settles
    let burstStart = -1e9;
    let curSpread = 0;
    const onDown = () => {
      const el = 0.35 * (1 - Math.cbrt(1 - Math.min(1, curSpread)));
      burstStart = performance.now() - el * 1000;
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time, spread) => {
      const t = time * speed;
      ctx.clearRect(0, 0, w, h);

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * size;
      const fp = 5;
      const breathe = 0.5 + 0.5 * Math.sin(t * 1.4);

      // Project both shells
      const angles = [
        { ay: t * 0.2 + pointer.x + spread * 1.4, ax: 0.35 + Math.sin(t * 0.17) * 0.18 + pointer.y },
        { ay: -t * 0.38 - pointer.x * 0.5 - spread * 2.2, ax: 0.2 + Math.cos(t * 0.23) * 0.3 - pointer.y * 0.5 },
      ];
      const scales = [1 + spread * 0.32, 1 - spread * 0.05];

      for (let si = 0; si < shells.length; si++) {
        const s = shells[si];
        const { ay, ax } = angles[si];
        const cay = Math.cos(ay);
        const say = Math.sin(ay);
        const cax = Math.cos(ax);
        const sax = Math.sin(ax);
        const k = s.radius * scales[si];
        for (let i = 0; i < s.verts.length; i++) {
          const v = s.verts[i];
          const x1 = v[0] * cay + v[2] * say;
          const z1 = -v[0] * say + v[2] * cay;
          const y2 = v[1] * cax - z1 * sax;
          const z2 = v[1] * sax + z1 * cax;
          s.rx[i] = x1;
          s.ry[i] = y2;
          s.rz[i] = z2;
          const persp = fp / (fp - z2 * k);
          s.pp[i] = persp;
          s.sx[i] = cx + x1 * k * R * persp;
          s.sy[i] = cy + y2 * k * R * persp;
        }
      }

      // Collect everything that needs drawing, then paint back to front
      const items = [];
      for (let si = 0; si < shells.length; si++) {
        const s = shells[si];
        const k = s.radius * scales[si];
        for (let e = 0; e < s.edges.length; e++) {
          const [a, b] = s.edges[e];
          items.push({ z: ((s.rz[a] + s.rz[b]) / 2) * k, kind: 0, si, a, b });
        }
        for (let i = 0; i < s.verts.length; i++) {
          items.push({ z: s.rz[i] * k + 0.001, kind: 1, si, a: i, b: 0 });
        }
      }
      items.push({ z: 0, kind: 2, si: 0, a: 0, b: 0 });
      items.sort((p, q) => p.z - q.z);

      const coreR = R * 0.42 * (1 + spread * 0.12);
      const flare = spread;

      for (const it of items) {
        if (it.kind === 2) {
          // Outer glow
          ctx.globalCompositeOperation = "lighter";
          const glow = ctx.createRadialGradient(cx, cy, coreR * 0.8, cx, cy, coreR * (2.1 + flare));
          glow.addColorStop(0, `rgba(60,200,235,${0.32 + 0.1 * breathe + 0.3 * flare})`);
          glow.addColorStop(1, "rgba(20,120,170,0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(cx, cy, coreR * (2.1 + flare), 0, Math.PI * 2);
          ctx.fill();
          ctx.globalCompositeOperation = "source-over";

          // Core sphere: dark teal body with a bright rim
          const body = ctx.createRadialGradient(cx - coreR * 0.15, cy - coreR * 0.2, coreR * 0.05, cx, cy, coreR);
          body.addColorStop(0, "rgba(4,26,36,1)");
          body.addColorStop(0.62, "rgba(6,52,70,1)");
          body.addColorStop(0.86, `rgba(70,200,235,${0.85 + 0.15 * flare})`);
          body.addColorStop(0.96, `rgba(205,248,255,${0.95})`);
          body.addColorStop(1, "rgba(205,248,255,0.0)");
          ctx.fillStyle = body;
          ctx.beginPath();
          ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }

        const s = shells[it.si];
        const k = s.radius * scales[it.si];

        if (it.kind === 1) {
          // Joint
          const i = it.a;
          const front = clamp01((s.rz[i] + 1) / 2);
          if (s.metal === 1) {
            const jl = Math.max(0, s.rx[i] * light[0] + s.ry[i] * light[1] + s.rz[i] * light[2]);
            const jr = Math.max(2, s.strut * R * 1.5 * s.pp[i]);
            ctx.globalAlpha = 0.6 + 0.4 * front;
            drawChromeJoint(ctx, s.sx[i], s.sy[i], jr, 0.65 + 0.5 * jl, lightX, lightY, jl > 0.7 ? (jl - 0.7) * front * 3.3 : 0);
            ctx.globalAlpha = 1;
            continue;
          }
          const r = Math.max(1.5, s.strut * R * 1.35 * s.pp[i]);
          ctx.globalAlpha = 0.5 + 0.5 * front;
          ctx.fillStyle = s.metal === 1 ? "#1c2124" : "#0a1114";
          ctx.beginPath();
          ctx.arc(s.sx[i], s.sy[i], r, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = s.metal === 1 ? "rgba(170,185,190,0.55)" : "rgba(80,200,230,0.45)";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.globalAlpha = 1;
          continue;
        }

        // Strut
        const { a, b } = it;
        const x0 = s.sx[a];
        const y0 = s.sy[a];
        const x1 = s.sx[b];
        const y1 = s.sy[b];
        const persp = (s.pp[a] + s.pp[b]) / 2;
        const mx = (s.rx[a] + s.rx[b]) / 2;
        const my = (s.ry[a] + s.ry[b]) / 2;
        const mz = (s.rz[a] + s.rz[b]) / 2;
        const ml = Math.hypot(mx, my, mz) || 1;
        const lit = Math.max(0, (mx * light[0] + my * light[1] + mz * light[2]) / ml);
        const front = clamp01((mz / ml + 1) / 2);
        const sw = s.strut * R * persp;

        if (s.metal === 1) {
          ctx.globalAlpha = 0.55 + 0.45 * front;
          drawChromeTube(ctx, x0, y0, x1, y1, sw, lit, lightX, lightY);
          ctx.globalAlpha = 1;
          continue;
        }

        const g = (45 + 125 * lit) * s.metal + 14;
        ctx.globalAlpha = 0.5 + 0.5 * front;
        ctx.lineCap = "round";

        ctx.strokeStyle = "#05080a";
        ctx.lineWidth = sw + 2;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();

        ctx.strokeStyle =
          s.metal === 1
            ? `rgb(${g * 0.93},${g * 0.98},${g})`
            : `rgb(${g * 0.7},${g * 1.1},${g * 1.25})`;
        ctx.lineWidth = sw;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();

        // Cyan edge light along the strut
        const dx = x1 - x0;
        const dy = y1 - y0;
        const len = Math.hypot(dx, dy) || 1;
        const off = sw * 0.38;
        const ox = (-dy / len) * off;
        const oy = (dx / len) * off;
        ctx.strokeStyle = `rgba(90,215,240,${0.25 + 0.45 * (1 - lit)})`;
        ctx.lineWidth = Math.max(1, sw * 0.25);
        ctx.beginPath();
        ctx.moveTo(x0 + ox, y0 + oy);
        ctx.lineTo(x1 + ox, y1 + oy);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      ctx.globalAlpha = 1;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const t0 = performance.now();
    const frame = (now) => {
      const el = (now - burstStart) / 1000;
      let spread = 0;
      if (el >= 0) {
        spread =
          el < 0.35
            ? 1 - Math.pow(1 - el / 0.35, 3)
            : Math.exp(-(el - 0.35) * 1.7);
      }
      if (spread < 0.002) spread = 0;
      curSpread = spread;

      draw(reduceMotion ? 3 : (now - t0) / 1000, spread);
      if (!reduceMotion) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
    };
  }, [size, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block h-full w-full cursor-pointer ${className}`}
    />
  );
}