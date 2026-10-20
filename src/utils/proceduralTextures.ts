/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as THREE from 'three';

// Helper to configure procedural canvas textures
function createTextureFromCanvas(
  drawFn: (ctx: CanvasRenderingContext2D, width: number, height: number) => void,
  width = 1024,
  height = 512
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    drawFn(ctx, width, height);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// 1. Earth Texture
export function createEarthTexture(): THREE.CanvasTexture {
  return createTextureFromCanvas((ctx, w, h) => {
    // Deep Ocean Base
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#0c2340');
    grad.addColorStop(0.5, '#0b3260');
    grad.addColorStop(1, '#0c2340');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Continental landmasses (procedural blobs mimicking Africa, Eurasia, Americas, Australia)
    ctx.fillStyle = '#2d5a27'; // Dark green vegetation
    const landmasses = [
      // Africa & Europe
      { x: 0.50, y: 0.35, rx: 0.08, ry: 0.12 },
      { x: 0.52, y: 0.55, rx: 0.07, ry: 0.18 },
      // Eurasia
      { x: 0.65, y: 0.30, rx: 0.18, ry: 0.12 },
      { x: 0.75, y: 0.40, rx: 0.12, ry: 0.14 },
      // Americas
      { x: 0.22, y: 0.30, rx: 0.12, ry: 0.14 },
      { x: 0.28, y: 0.65, rx: 0.08, ry: 0.20 },
      // Australia
      { x: 0.82, y: 0.72, rx: 0.06, ry: 0.06 },
    ];

    landmasses.forEach((lm) => {
      ctx.beginPath();
      ctx.ellipse(lm.x * w, lm.y * h, lm.rx * w, lm.ry * h, 0, 0, Math.PI * 2);
      ctx.fill();

      // Deserts / arid zones (Sahara, Australia, Gobi)
      ctx.fillStyle = '#8f7743';
      ctx.beginPath();
      ctx.ellipse(lm.x * w, (lm.y - 0.02) * h, lm.rx * w * 0.6, lm.ry * h * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#2d5a27';
    });

    // Shallow coastlines / shelves
    ctx.strokeStyle = '#1e758a';
    ctx.lineWidth = 4;
    landmasses.forEach((lm) => {
      ctx.beginPath();
      ctx.ellipse(lm.x * w, lm.y * h, lm.rx * w + 3, lm.ry * h + 3, 0, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Polar Ice Caps
    ctx.fillStyle = '#ffffff';
    // North pole
    ctx.fillRect(0, 0, w, h * 0.09);
    // South pole
    ctx.fillRect(0, h * 0.90, w, h * 0.10);
  }, 1024, 512);
}

// 2. Earth Clouds Texture
export function createCloudsTexture(): THREE.CanvasTexture {
  return createTextureFromCanvas((ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';

    // Swirling cloud belts
    for (let i = 0; i < 45; i++) {
      const cx = Math.random() * w;
      const cy = (0.2 + Math.random() * 0.6) * h;
      const rx = (40 + Math.random() * 120);
      const ry = (10 + Math.random() * 35);
      const rot = (Math.random() - 0.5) * 0.4;

      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, rot, 0, Math.PI * 2);
      ctx.fill();
    }
  }, 1024, 512);
}

// 3. Moon (Luna) Texture
export function createMoonTexture(): THREE.CanvasTexture {
  return createTextureFromCanvas((ctx, w, h) => {
    ctx.fillStyle = '#8e9299'; // Basaltic regolith
    ctx.fillRect(0, 0, w, h);

    // Dark Maria (Mare Tranquillitatis, Imbrium, Oceanus Procellarum)
    ctx.fillStyle = '#52565e';
    const maria = [
      { x: 0.35, y: 0.4, r: 90 },
      { x: 0.48, y: 0.35, r: 75 },
      { x: 0.28, y: 0.55, r: 80 },
      { x: 0.60, y: 0.48, r: 60 },
      { x: 0.42, y: 0.62, r: 50 },
    ];
    maria.forEach((m) => {
      ctx.beginPath();
      ctx.arc(m.x * w, m.y * h, m.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Impact craters with white ejecta rays (Tycho, Copernicus)
    ctx.fillStyle = '#c7cbd2';
    for (let i = 0; i < 120; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 2 + Math.random() * 14;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      // Rim shadow
      ctx.strokeStyle = '#3e4147';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI);
      ctx.stroke();
    }
  }, 512, 256);
}

// 4. Mars Texture
export function createMarsTexture(): THREE.CanvasTexture {
  return createTextureFromCanvas((ctx, w, h) => {
    // Rust red surface
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#ab4a26');
    grad.addColorStop(0.5, '#c9542a');
    grad.addColorStop(1, '#9e4222');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Dark volcanic regions (Syrtis Major, Acidalia Planitia)
    ctx.fillStyle = '#612a17';
    const darkZones = [
      { x: 0.62, y: 0.45, rx: 70, ry: 50 },
      { x: 0.35, y: 0.52, rx: 90, ry: 40 },
      { x: 0.80, y: 0.38, rx: 60, ry: 35 },
    ];
    darkZones.forEach((z) => {
      ctx.beginPath();
      ctx.ellipse(z.x * w, z.y * h, z.rx, z.ry, 0.2, 0, Math.PI * 2);
      ctx.fill();
    });

    // Olympus Mons caldera ring
    ctx.strokeStyle = '#f58756';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0.25 * w, 0.42 * h, 30, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#82371c';
    ctx.beginPath();
    ctx.arc(0.25 * w, 0.42 * h, 14, 0, Math.PI * 2);
    ctx.fill();

    // Valles Marineris canyon scar
    ctx.strokeStyle = '#3d160a';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0.35 * w, 0.55 * h);
    ctx.quadraticCurveTo(0.48 * w, 0.58 * h, 0.60 * w, 0.56 * h);
    ctx.stroke();

    // Polar ice caps (frozen CO2 + water ice)
    ctx.fillStyle = '#fcece8';
    ctx.fillRect(0, 0, w, h * 0.06);
    ctx.fillRect(0, h * 0.94, w, h * 0.06);
  }, 1024, 512);
}

// 5. Jupiter Texture
export function createJupiterTexture(): THREE.CanvasTexture {
  return createTextureFromCanvas((ctx, w, h) => {
    // Alternating belts and zones
    const bands = [
      '#664634', '#b8896a', '#ecd0b3', '#a86540', '#d8aa80',
      '#7a4c33', '#ecd0b3', '#be7b4a', '#8b5336', '#eedac2',
      '#985f42', '#dfba9b', '#6d4533', '#bb8664'
    ];

    const step = h / bands.length;
    bands.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(0, i * step, w, step + 1);

      // Turbulence noise
      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
      for (let j = 0; j < 6; j++) {
        ctx.fillRect(Math.random() * w, i * step, 60 + Math.random() * 80, step);
      }
    });

    // Great Red Spot
    const grsX = 0.62 * w;
    const grsY = 0.66 * h;
    const grsGrad = ctx.createRadialGradient(grsX, grsY, 5, grsX, grsY, 55);
    grsGrad.addColorStop(0, '#c73b22');
    grsGrad.addColorStop(0.7, '#a62e19');
    grsGrad.addColorStop(1, '#662215');
    ctx.fillStyle = grsGrad;
    ctx.beginPath();
    ctx.ellipse(grsX, grsY, 52, 28, -0.05, 0, Math.PI * 2);
    ctx.fill();

    // White storm vortices
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.arc((0.15 + i * 0.11) * w, 0.78 * h, 6 + Math.random() * 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, 1024, 512);
}

// 6. Saturn Texture
export function createSaturnTexture(): THREE.CanvasTexture {
  return createTextureFromCanvas((ctx, w, h) => {
    const bands = [
      '#a89269', '#ceb78c', '#e2cfab', '#cbb387', '#dfcaa3',
      '#eedebd', '#cfb88b', '#e8d7b3', '#d6be92', '#bba377'
    ];
    const step = h / bands.length;
    bands.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(0, i * step, w, step + 1);
    });

    // North polar hexagon tint
    ctx.fillStyle = 'rgba(110, 125, 95, 0.35)';
    ctx.fillRect(0, 0, w, h * 0.08);
  }, 1024, 512);
}

// 7. Saturn Rings Texture (Radial)
export function createSaturnRingsTexture(): THREE.CanvasTexture {
  return createTextureFromCanvas((ctx, w, h) => {
    // Rings mapped from center out along vertical strip
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    // Inner C Ring (semi-transparent)
    grad.addColorStop(0.00, 'rgba(140, 120, 90, 0.05)');
    grad.addColorStop(0.18, 'rgba(175, 150, 110, 0.4)');
    // B Ring (brightest and densest)
    grad.addColorStop(0.20, 'rgba(230, 215, 175, 0.95)');
    grad.addColorStop(0.58, 'rgba(210, 190, 150, 0.90)');
    // Cassini Division (dark gap)
    grad.addColorStop(0.59, 'rgba(20, 15, 10, 0.05)');
    grad.addColorStop(0.66, 'rgba(25, 20, 15, 0.08)');
    // A Ring
    grad.addColorStop(0.67, 'rgba(195, 175, 140, 0.85)');
    grad.addColorStop(0.88, 'rgba(180, 160, 130, 0.70)');
    // Encke Gap
    grad.addColorStop(0.89, 'rgba(10, 10, 10, 0.02)');
    // Outer F-Ring band edge
    grad.addColorStop(0.92, 'rgba(160, 140, 110, 0.45)');
    grad.addColorStop(1.00, 'rgba(0, 0, 0, 0.0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }, 512, 64);
}

// 8. Uranus Texture
export function createUranusTexture(): THREE.CanvasTexture {
  return createTextureFromCanvas((ctx, w, h) => {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#59c7b8');
    grad.addColorStop(0.5, '#7ee3d6');
    grad.addColorStop(1, '#51b8a9');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle faint bands
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    for (let i = 0; i < 8; i++) {
      ctx.fillRect(0, (0.15 + i * 0.1) * h, w, 15);
    }
  }, 512, 256);
}

// 9. Neptune Texture
export function createNeptuneTexture(): THREE.CanvasTexture {
  return createTextureFromCanvas((ctx, w, h) => {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#1c4cb8');
    grad.addColorStop(0.5, '#2e6cf6');
    grad.addColorStop(1, '#153c98');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Great Dark Spot (Voyager storm)
    ctx.fillStyle = '#0f2766';
    ctx.beginPath();
    ctx.ellipse(0.45 * w, 0.45 * h, 40, 20, 0.1, 0, Math.PI * 2);
    ctx.fill();

    // High altitude white methane cirrus cloud streaks
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.lineWidth = 3;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      const sy = (0.35 + i * 0.1) * h;
      ctx.moveTo(0.1 * w, sy);
      ctx.bezierCurveTo(0.3 * w, sy - 10, 0.7 * w, sy + 15, 0.95 * w, sy);
      ctx.stroke();
    }
  }, 512, 256);
}

// 10. Europa Texture (Cracked Ice & Lineae)
export function createEuropaTexture(): THREE.CanvasTexture {
  return createTextureFromCanvas((ctx, w, h) => {
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(0, 0, w, h);

    // Chaotic reddish brown crack lines (lineae)
    ctx.strokeStyle = '#994d38';
    ctx.lineWidth = 2.5;
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      const x1 = Math.random() * w;
      const y1 = Math.random() * h;
      ctx.moveTo(x1, y1);
      ctx.bezierCurveTo(
        x1 + (Math.random() - 0.5) * 300,
        y1 + (Math.random() - 0.5) * 150,
        x1 + (Math.random() - 0.5) * 300,
        y1 + (Math.random() - 0.5) * 150,
        x1 + (Math.random() - 0.5) * 200,
        y1 + (Math.random() - 0.5) * 200
      );
      ctx.stroke();
    }

    // Chaos terrain blotches
    ctx.fillStyle = 'rgba(168, 92, 70, 0.35)';
    for (let i = 0; i < 15; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, 15 + Math.random() * 25, 0, Math.PI * 2);
      ctx.fill();
    }
  }, 512, 256);
}

// 11. Rocket Metal / Panels Texture
export function createRocketMetalTexture(): THREE.CanvasTexture {
  return createTextureFromCanvas((ctx, w, h) => {
    ctx.fillStyle = '#e8ecf2';
    ctx.fillRect(0, 0, w, h);

    // Metal seams & weld lines
    ctx.strokeStyle = '#c0c7d4';
    ctx.lineWidth = 2;
    for (let x = 0; x < w; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Rivet dots along seams
    ctx.fillStyle = '#8f9baa';
    for (let x = 0; x < w; x += 64) {
      for (let y = 16; y < h; y += 32) {
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, 512, 512);
}

// 12. Solar Panel Photovoltaic Texture
export function createSolarPanelTexture(): THREE.CanvasTexture {
  return createTextureFromCanvas((ctx, w, h) => {
    // Deep iridescent space blue
    ctx.fillStyle = '#0a1d3b';
    ctx.fillRect(0, 0, w, h);

    // Grid of solar cell wafers
    const cellW = 32;
    const cellH = 32;
    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 0.5;

    for (let x = 0; x < w; x += cellW) {
      for (let y = 0; y < h; y += cellH) {
        ctx.strokeRect(x + 1, y + 1, cellW - 2, cellH - 2);

        // Thin conductive busbars
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.moveTo(x + cellW / 2, y + 1);
        ctx.lineTo(x + cellW / 2, y + cellH - 1);
        ctx.stroke();
        ctx.strokeStyle = '#00f3ff';
      }
    }
  }, 256, 256);
}

// 13. Gold Kapton Foil Thermal Blanket Texture
export function createGoldFoilTexture(): THREE.CanvasTexture {
  return createTextureFromCanvas((ctx, w, h) => {
    ctx.fillStyle = '#e5a110';
    ctx.fillRect(0, 0, w, h);

    // Wrinkle facets
    for (let i = 0; i < 200; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? '#f5bf38' : '#b87c09';
      ctx.beginPath();
      const x = Math.random() * w;
      const y = Math.random() * h;
      ctx.moveTo(x, y);
      ctx.lineTo(x + (Math.random() - 0.5) * 40, y + (Math.random() - 0.5) * 40);
      ctx.lineTo(x + (Math.random() - 0.5) * 40, y + (Math.random() - 0.5) * 40);
      ctx.closePath();
      ctx.fill();
    }
  }, 256, 256);
}

// 14. Solar Plasma Texture (Sun)
export function createSunTexture(): THREE.CanvasTexture {
  return createTextureFromCanvas((ctx, w, h) => {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#ff8800');
    grad.addColorStop(0.5, '#ffcc22');
    grad.addColorStop(1, '#ff7700');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Solar granulation cells & active sunspot regions
    for (let i = 0; i < 350; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 4 + Math.random() * 22;
      ctx.fillStyle = Math.random() > 0.15 ? 'rgba(255, 245, 180, 0.35)' : 'rgba(180, 60, 0, 0.45)';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }, 512, 256);
}

// 15. Mercury Texture
export function createMercuryTexture(): THREE.CanvasTexture {
  return createTextureFromCanvas((ctx, w, h) => {
    ctx.fillStyle = '#8b8c91';
    ctx.fillRect(0, 0, w, h);

    // Caloris Basin & dense silicate cratering
    for (let i = 0; i < 160; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 3 + Math.random() * 18;
      ctx.fillStyle = Math.random() > 0.5 ? '#6d6e73' : '#a8aab0';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#4e5054';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI);
      ctx.stroke();
    }
  }, 512, 256);
}

// 16. Venus Texture (Sulfuric Acid Clouds)
export function createVenusTexture(): THREE.CanvasTexture {
  return createTextureFromCanvas((ctx, w, h) => {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#c2934f');
    grad.addColorStop(0.5, '#e6be7a');
    grad.addColorStop(1, '#ba8b46');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // V-shaped chevron super-rotating cloud bands
    ctx.strokeStyle = 'rgba(255, 240, 200, 0.28)';
    ctx.lineWidth = 14;
    for (let i = 0; i < 12; i++) {
      const y = (i / 12) * h;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.quadraticCurveTo(w * 0.5, y + 35, w, y);
      ctx.stroke();
    }
  }, 512, 256);
}

