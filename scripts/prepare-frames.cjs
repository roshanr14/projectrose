/**
 * prepare-frames.cjs
 * Unpacks frames from public/frames_150.zip if available,
 * or generates 150 ultra-high-definition dark gold luxury 3D kinetic sequence frames.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const publicDir = path.join(__dirname, '..', 'public');
const framesDir = path.join(publicDir, 'frames');
const zipFile = path.join(publicDir, 'frames_150.zip');
const rootZipFile = path.join(__dirname, '..', 'frames_150.zip');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

if (!fs.existsSync(framesDir)) {
  fs.mkdirSync(framesDir, { recursive: true });
}

// Check if zip exists in public or root
let foundZip = null;
if (fs.existsSync(zipFile)) {
  foundZip = zipFile;
} else if (fs.existsSync(rootZipFile)) {
  foundZip = rootZipFile;
}

if (foundZip) {
  console.log(`Found zip file at ${foundZip}, attempting extraction...`);
  try {
    execSync(`powershell -Command "Expand-Archive -Path '${foundZip}' -DestinationPath '${framesDir}' -Force"`);
  } catch (err) {
    console.warn('Failed to extract via powershell:', err.message);
  }
}

const existingFrames = fs.existsSync(framesDir)
  ? fs.readdirSync(framesDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.webp') || f.endsWith('.svg'))
  : [];

console.log(`Current frames count in public/frames: ${existingFrames.length}`);

if (existingFrames.length < 150) {
  console.log('Generating procedural luxury dark-gold 3D sequence frames (150 frames)...');

  for (let i = 1; i <= 150; i++) {
    const frameNumber = String(i).padStart(3, '0');
    const filename = path.join(framesDir, `frame-${frameNumber}.png`);

    const progress = (i - 1) / 149; // 0 to 1
    const angle = progress * Math.PI * 4;
    const scale = 0.85 + 0.3 * Math.sin(progress * Math.PI);
    const goldGradStart = progress > 0.5 ? '#f6d365' : '#d4af37';
    const goldGradEnd = progress > 0.5 ? '#fda085' : '#aa771c';
    const corePulse = 180 + Math.sin(progress * Math.PI * 6) * 35;
    const ringRotate1 = (progress * 360 * 1.5).toFixed(1);
    const ringRotate2 = (-progress * 360 * 2.2).toFixed(1);
    const ringRotate3 = (progress * 360 * 3.0 + 45).toFixed(1);

    const rings = [];
    for (let r = 0; r < 8; r++) {
      const rProgress = (r / 7);
      const rAngle = angle + rProgress * Math.PI;
      const rx = 960 + Math.cos(rAngle) * (260 + r * 30 * Math.sin(progress * Math.PI));
      const ry = 540 + Math.sin(rAngle * 1.2) * (140 + r * 20);
      const radius = (60 + r * 22) * scale;
      const opacity = (0.25 + 0.7 * Math.sin((progress + rProgress) * Math.PI)).toFixed(2);
      rings.push(`<circle cx="${rx.toFixed(1)}" cy="${ry.toFixed(1)}" r="${radius.toFixed(1)}" stroke="url(#goldGrad)" stroke-width="${1.5 + r * 0.4}" fill="none" opacity="${opacity}" filter="url(#goldGlow)" />`);
    }

    const particles = [];
    for (let p = 0; p < 36; p++) {
      const pAngle = (p / 36) * Math.PI * 2 + progress * Math.PI * 3;
      const pDist = 340 + Math.sin(pAngle * 3 + progress * 4) * 80;
      const px = (960 + Math.cos(pAngle) * pDist).toFixed(1);
      const py = (540 + Math.sin(pAngle) * (pDist * 0.55)).toFixed(1);
      const pSize = (2 + Math.sin(p * 2 + progress * 8) * 1.8).toFixed(1);
      const pOp = (0.3 + 0.7 * Math.abs(Math.sin(p + progress * 6))).toFixed(2);
      particles.push(`<circle cx="${px}" cy="${py}" r="${pSize}" fill="#ffeaa7" opacity="${pOp}" filter="url(#goldGlow)" />`);
    }

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" style="background:#070709;">
      <defs>
        <radialGradient id="bgVignette" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#1c160e" stop-opacity="0.9" />
          <stop offset="50%" stop-color="#0e0d0b" stop-opacity="0.96" />
          <stop offset="100%" stop-color="#060607" stop-opacity="1" />
        </radialGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${goldGradStart}" />
          <stop offset="50%" stop-color="#fff2c6" />
          <stop offset="100%" stop-color="${goldGradEnd}" />
        </linearGradient>
        <linearGradient id="roseGoldGrad" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ff7675" />
          <stop offset="50%" stop-color="#fab1a0" />
          <stop offset="100%" stop-color="#fdcb6e" />
        </linearGradient>
        <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="heavyGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="28" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <rect width="1920" height="1080" fill="url(#bgVignette)" />

      <circle cx="960" cy="540" r="${(corePulse * 2.2).toFixed(1)}" fill="${goldGradStart}" opacity="0.12" filter="url(#heavyGlow)" />
      <circle cx="${(960 + Math.cos(angle) * 120).toFixed(1)}" cy="${(540 + Math.sin(angle) * 80).toFixed(1)}" r="220" fill="#e17055" opacity="0.08" filter="url(#heavyGlow)" />

      <g transform="translate(960, 540) rotate(${ringRotate1}) scale(${scale.toFixed(3)})">
        <ellipse cx="0" cy="0" rx="440" ry="240" stroke="url(#goldGrad)" stroke-width="2.5" fill="none" opacity="0.75" filter="url(#goldGlow)" />
        <ellipse cx="0" cy="0" rx="360" ry="360" stroke="url(#roseGoldGrad)" stroke-width="1.5" stroke-dasharray="8 14" fill="none" opacity="0.5" />
      </g>

      <g transform="translate(960, 540) rotate(${ringRotate2}) scale(${scale.toFixed(3)})">
        <ellipse cx="0" cy="0" rx="480" ry="180" stroke="url(#goldGrad)" stroke-width="2" stroke-dasharray="16 8" fill="none" opacity="0.6" filter="url(#goldGlow)" />
        <circle cx="0" cy="0" r="280" stroke="rgba(255, 234, 167, 0.4)" stroke-width="1" fill="none" />
      </g>

      <g transform="translate(960, 540) rotate(${ringRotate3}) scale(${scale.toFixed(3)})">
        <ellipse cx="0" cy="0" rx="520" ry="300" stroke="url(#roseGoldGrad)" stroke-width="2" fill="none" opacity="0.65" />
      </g>

      ${rings.join('\n      ')}

      <g transform="translate(960, 540) scale(${scale.toFixed(3)})">
        <circle cx="0" cy="0" r="${corePulse.toFixed(1)}" fill="url(#goldGrad)" opacity="0.22" filter="url(#heavyGlow)" />
        <circle cx="0" cy="0" r="${(corePulse * 0.75).toFixed(1)}" stroke="url(#goldGrad)" stroke-width="3" fill="none" opacity="0.9" filter="url(#goldGlow)" />
        <circle cx="0" cy="0" r="${(corePulse * 0.4).toFixed(1)}" fill="#fffdfa" opacity="0.85" filter="url(#goldGlow)" />

        <line x1="-120" y1="0" x2="120" y2="0" stroke="#f6d365" stroke-width="1.2" opacity="0.6" stroke-dasharray="4 6" />
        <line x1="0" y1="-120" x2="0" y2="120" stroke="#f6d365" stroke-width="1.2" opacity="0.6" stroke-dasharray="4 6" />
      </g>

      ${particles.join('\n      ')}

      <path d="M 80 120 L 80 80 L 120 80" stroke="#d4af37" stroke-width="2" fill="none" opacity="0.4" />
      <path d="M 1840 120 L 1840 80 L 1800 80" stroke="#d4af37" stroke-width="2" fill="none" opacity="0.4" />
      <path d="M 80 960 L 80 1000 L 120 1000" stroke="#d4af37" stroke-width="2" fill="none" opacity="0.4" />
      <path d="M 1840 960 L 1840 1000 L 1800 1000" stroke="#d4af37" stroke-width="2" fill="none" opacity="0.4" />

      <text x="960" y="1020" font-family="'Outfit', sans-serif" font-size="13" font-weight="600" fill="#aa8c4a" letter-spacing="0.35em" text-anchor="middle" opacity="0.6">
        ROSEFIT KINETIC CORE // SEQUENCE ${frameNumber} / 150
      </text>
    </svg>`;

    fs.writeFileSync(filename, svgContent);
    fs.writeFileSync(filename.replace('.png', '.svg'), svgContent);
  }

  console.log('Successfully generated 150 frames in public/frames/ !');
}
