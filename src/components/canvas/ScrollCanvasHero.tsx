import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, ArrowRight, ChevronDown, Flame, Compass, ShieldCheck } from 'lucide-react';
import { AuthMode } from '../auth/AuthModal';
import '../../styles/scroll-canvas.css';

interface ScrollCanvasHeroProps {
  onOpenAuth: (mode: AuthMode) => void;
  onExplorePrograms: () => void;
}

const TOTAL_FRAMES = 150;
const LERP_SPEED = 0.09; // Apple-like smooth interpolation factor

export const ScrollCanvasHero: React.FC<ScrollCanvasHeroProps> = ({
  onOpenAuth,
  onExplorePrograms
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Image cache array
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const imagesLoadedMap = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  
  // State for rendering loop
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);
  const lastDrawnFrameRef = useRef<number>(-1);
  
  // UI state
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [initialReady, setInitialReady] = useState<boolean>(false);
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [activeNarrativeIndex, setActiveNarrativeIndex] = useState<number>(0);

  // Helper to format frame path
  const getFrameUrl = (index: number) => {
    const frameNum = String(index + 1).padStart(3, '0');
    return `/frames/frame-${frameNum}.png`;
  };

  // Draw image preserving 'cover' aspect ratio and centered on DPR canvas
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find closest loaded frame if requested frame is still buffering
    let frameToDraw = Math.round(frameIdx);
    frameToDraw = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameToDraw));

    let img = imagesRef.current[frameToDraw];
    if (!img || !imagesLoadedMap.current[frameToDraw]) {
      // Find nearest loaded frame
      let nearestDist = Infinity;
      let nearestIdx = -1;
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (imagesLoadedMap.current[i] && imagesRef.current[i]) {
          const dist = Math.abs(i - frameToDraw);
          if (dist < nearestDist) {
            nearestDist = dist;
            nearestIdx = i;
          }
        }
      }
      if (nearestIdx !== -1) {
        img = imagesRef.current[nearestIdx];
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width;
    const height = canvas.height;

    // Calculate aspect ratio 'cover'
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let renderW = width;
    let renderH = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > imgAspect) {
      renderW = width;
      renderH = width / imgAspect;
      offsetY = (height - renderH) / 2;
    } else {
      renderH = height;
      renderW = height * imgAspect;
      offsetX = (width - renderW) / 2;
    }

    // Clear and draw
    ctx.clearRect(0, 0, width, height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

    lastDrawnFrameRef.current = frameToDraw;
  }, []);

  // Update canvas DPR size on resize
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5); // Cap for performance on 4k
    const rect = canvas.getBoundingClientRect();
    
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      drawFrame(currentFrameRef.current);
    }
  }, [drawFrame]);

  // Progressive Preloading Engine
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    // Preload single frame helper
    const loadSingleFrame = (idx: number): Promise<void> => {
      return new Promise((resolve) => {
        if (imagesRef.current[idx] && imagesLoadedMap.current[idx]) {
          resolve();
          return;
        }

        const img = new Image();
        img.src = getFrameUrl(idx);
        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current[idx] = img;
          imagesLoadedMap.current[idx] = true;
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));

          // As soon as initial critical frames are ready, set ready state
          if (idx === 0 || loadedCount >= 5) {
            setInitialReady(true);
            drawFrame(currentFrameRef.current);
          }
          resolve();
        };
        img.onerror = () => {
          // Fallback: try .svg extension
          const svgImg = new Image();
          svgImg.src = getFrameUrl(idx).replace('.png', '.svg');
          svgImg.onload = () => {
            if (isCancelled) return;
            imagesRef.current[idx] = svgImg;
            imagesLoadedMap.current[idx] = true;
            loadedCount++;
            setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
            if (idx === 0 || loadedCount >= 5) {
              setInitialReady(true);
              drawFrame(currentFrameRef.current);
            }
            resolve();
          };
          svgImg.onerror = () => {
            resolve(); // proceed anyway to not block
          };
        };
      });
    };

    // 1. First priority: Load first frame immediately
    loadSingleFrame(0).then(() => {
      if (isCancelled) return;
      // 2. Next priority: load first 20 frames (critical landing view)
      const firstBatch: Promise<void>[] = [];
      for (let i = 1; i < Math.min(25, TOTAL_FRAMES); i++) {
        firstBatch.push(loadSingleFrame(i));
      }

      Promise.all(firstBatch).then(() => {
        if (isCancelled) return;
        // 3. Progressive streaming: load the remaining frames evenly in parallel batches
        const remaining: Promise<void>[] = [];
        for (let i = 25; i < TOTAL_FRAMES; i++) {
          remaining.push(loadSingleFrame(i));
        }
        Promise.all(remaining);
      });
    });

    return () => {
      isCancelled = true;
    };
  }, [drawFrame]);

  // Scroll Event Listener with Clamped 0..1 Progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableHeight = containerRef.current.scrollHeight - window.innerHeight;
      
      if (scrollableHeight <= 0) return;

      // Calculate how far the top of the container has scrolled past the viewport top
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

      setScrollPercent(Math.round(progress * 100));

      // Calculate Target Frame (0 to 149)
      const target = progress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = target;

      // Update narrative waypoint stages based on progress
      if (progress < 0.25) {
        setActiveNarrativeIndex(0);
      } else if (progress < 0.52) {
        setActiveNarrativeIndex(1);
      } else if (progress < 0.78) {
        setActiveNarrativeIndex(2);
      } else {
        setActiveNarrativeIndex(3);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas);
    handleScroll();
    resizeCanvas();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas]);

  // Persistent requestAnimationFrame Lerp Engine
  useEffect(() => {
    let running = true;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderLoop = () => {
      if (!running) return;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      
      const factor = prefersReducedMotion ? 1.0 : LERP_SPEED;
      const delta = target - current;

      if (Math.abs(delta) > 0.001) {
        currentFrameRef.current += delta * factor;
        drawFrame(currentFrameRef.current);
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      running = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [drawFrame]);

  const scrollToNextSection = () => {
    if (!containerRef.current) return;
    const nextOffset = containerRef.current.offsetTop + containerRef.current.scrollHeight - 50;
    window.scrollTo({ top: nextOffset, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="scroll-hero-container" id="scroll-hero">
      
      {/* Sticky Fullscreen Pinned Canvas Stage */}
      <div className="scroll-hero-sticky">
        
        {/* Background Atmospheric Aureole */}
        <div className="scroll-hero-ambient-glow" />

        {/* HTML5 Canvas */}
        <canvas ref={canvasRef} className="scroll-canvas-element" />

        {/* Edge-softening Vignette Overlay */}
        <div className="scroll-hero-vignette" />

        {/* Initial Loader Barrier */}
        <div className={`scroll-canvas-loader ${initialReady ? 'loaded' : ''}`}>
          <div className="loader-spinner-gold" />
          <div style={{ fontFamily: 'Outfit, sans-serif', color: '#d4af37', fontSize: '0.875rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Calibrating Kinetic Sequence {loadProgress}%
          </div>
        </div>

        {/* Floating Narrative Content & UI HUD Layer */}
        <div className="scroll-hero-content-layer">
          
          {/* Top Status HUD */}
          <div className="scroll-hero-top-hud">
            <div className="scroll-hero-hud-pill">
              <span className="scroll-hero-pulse-dot" />
              <span>ROSEFIT CINEMATIC CORE</span>
            </div>

            <div className="scroll-hero-hud-pill" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
              <Compass size={14} style={{ color: '#d4af37' }} />
              <span>Scroll to Interact ({scrollPercent}%)</span>
            </div>
          </div>

          {/* Narrative Story Cards (Transitions seamlessly as user scrolls) */}
          <div className="scroll-hero-center-stage">
            
            {/* Stage 1: Initial Hook (0% - 25%) */}
            <div className={`scroll-narrative-card ${activeNarrativeIndex === 0 ? 'active' : 'inactive'}`}>
              <div className="scroll-luxury-subtitle">
                The Science of Athletic Mastery
              </div>
              <h1 className="scroll-luxury-title">
                ELEVATE BEYOND <br />
                ORDINARY LIMITS
              </h1>
              <p className="scroll-luxury-desc">
                Welcome to the next evolution of human training. Precision biomechanics, curated masterclasses, and an intelligent training ecosystem.
              </p>
              <div className="scroll-actions-row">
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="btn-gold"
                >
                  <Sparkles size={18} />
                  <span>Begin Free Journey</span>
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={onExplorePrograms}
                  className="btn-glass-gold"
                >
                  <Flame size={17} style={{ color: '#ff7675' }} />
                  <span>View Flagship Splits</span>
                </button>
              </div>
            </div>

            {/* Stage 2: Biomechanical Precision (25% - 52%) */}
            <div className={`scroll-narrative-card ${activeNarrativeIndex === 1 ? 'active' : 'inactive'}`}>
              <div className="scroll-luxury-subtitle">
                Phase 01 // Biomechanical Precision
              </div>
              <h2 className="scroll-luxury-title">
                ENGINEERED FOR <br />
                PEAK KINETICS
              </h2>
              <p className="scroll-luxury-desc">
                Every movement pattern is calibrated with anatomical precision. Maximize muscle recruitment while eliminating joint strain.
              </p>
              <div className="scroll-actions-row">
                <button
                  onClick={() => {
                    const el = document.getElementById('exercise-vault');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-glass-gold"
                >
                  <ShieldCheck size={18} style={{ color: '#10b981' }} />
                  <span>Explore Exercise Vault</span>
                </button>
              </div>
            </div>

            {/* Stage 3: The Gold Standard (52% - 78%) */}
            <div className={`scroll-narrative-card ${activeNarrativeIndex === 2 ? 'active' : 'inactive'}`}>
              <div className="scroll-luxury-subtitle">
                Phase 02 // The Gold Standard
              </div>
              <h2 className="scroll-luxury-title">
                SCULPTED POWER. <br />
                UNYIELDING FOCUS.
              </h2>
              <p className="scroll-luxury-desc">
                Join over 140,000 disciplined athletes globally transforming their physique through structured high-velocity programming.
              </p>
              <div className="scroll-actions-row">
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="btn-gold"
                >
                  <Sparkles size={18} />
                  <span>Unlock Member Access</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Stage 4: Climax & Call to Action (78% - 100%) */}
            <div className={`scroll-narrative-card ${activeNarrativeIndex === 3 ? 'active' : 'inactive'}`}>
              <div className="scroll-luxury-subtitle">
                Phase 03 // Dominate Your Potential
              </div>
              <h2 className="scroll-luxury-title">
                YOUR TRANSFORMATION <br />
                STARTS TODAY
              </h2>
              <p className="scroll-luxury-desc">
                The complete platform is unlocked. Dive into interactive workouts, macro calculations, and comprehensive athlete tracking.
              </p>
              <div className="scroll-actions-row">
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="btn-gold"
                >
                  <span>Start Training Free</span>
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={scrollToNextSection}
                  className="btn-glass-gold"
                >
                  <span>Explore Channel Features</span>
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>

          </div>

          {/* Bottom HUD: Progress Bar & Scroll Prompter */}
          <div className="scroll-hero-bottom-hud">
            
            {/* Realtime Progress Metric */}
            <div className="scroll-progress-container">
              <div className="scroll-progress-bar-track">
                <div
                  className="scroll-progress-bar-fill"
                  style={{ width: `${scrollPercent}%` }}
                />
              </div>
              <div className="scroll-frame-counter">
                FRAME {String(Math.min(TOTAL_FRAMES, Math.max(1, Math.round((currentFrameRef.current || 0) + 1)))).padStart(3, '0')} / {TOTAL_FRAMES}
              </div>
            </div>

            {/* Downward Scroll Prompter */}
            <div
              className="scroll-prompter"
              onClick={scrollToNextSection}
              style={{ opacity: scrollPercent > 95 ? 0.2 : 1 }}
            >
              <div className="scroll-mouse-icon">
                <div className="scroll-mouse-wheel" />
              </div>
              <span>SCROLL</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
