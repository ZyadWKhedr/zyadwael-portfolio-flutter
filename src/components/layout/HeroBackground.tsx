import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Concept 1: The Architectural Atelier
 * Precision drafting matrix with controlled ambient terracotta spotlight and analog paper grain.
 *
 * Layers:
 * 1. Atmospheric Ambient Spotlight: Dual-mode terracotta ember & slate directional illumination.
 * 2. Precision Drafting Matrix: 28px coordinate dots with elliptical radial-gradient alpha mask.
 * 3. Analog Paper Grain: Hardware-accelerated SVG feTurbulence filter eliminating digital banding.
 * 4. Architectural Registration Marks: Subtle geometric alignment marks reinforcing craftsmanship.
 */
export const HeroBackground: React.FC = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Layer 1: Directional Atmospheric Ambient Glow (Terracotta Ember + Slate Depth) */}
      <div
        className="absolute inset-0"
        style={{
          background: isRtl
            ? `radial-gradient(ellipse 650px 420px at 30% 30%, var(--accent-subtle) 0%, transparent 70%),
               radial-gradient(ellipse 550px 380px at 75% 45%, rgba(120, 140, 160, 0.05) 0%, transparent 65%)`
            : `radial-gradient(ellipse 650px 420px at 70% 30%, var(--accent-subtle) 0%, transparent 70%),
               radial-gradient(ellipse 550px 380px at 25% 45%, rgba(120, 140, 160, 0.05) 0%, transparent 65%)`,
        }}
      />

      {/* Layer 2: Precision Drafting Coordinate Matrix with Radial Vignette Alpha Falloff */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--border-strong) 1px, transparent 0)`,
          backgroundSize: '28px 28px',
          backgroundPosition: 'center center',
          opacity: 0.38,
          maskImage:
            'radial-gradient(ellipse 75% 65% at 50% 25%, black 20%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 75% 65% at 50% 25%, black 20%, transparent 75%)',
        }}
      />

      {/* Layer 3: Subtle Architectural Registration Crosshairs */}
      <div className="container max-w-6xl mx-auto h-full relative">
        <div className="absolute top-4 left-4 text-border-strong opacity-40 font-mono text-[10px] hidden sm:block">
          +
        </div>
        <div className="absolute top-4 right-4 text-border-strong opacity-40 font-mono text-[10px] hidden sm:block">
          +
        </div>
        <div className="absolute bottom-6 left-4 text-border-strong opacity-30 font-mono text-[10px] hidden sm:block">
          +
        </div>
        <div className="absolute bottom-6 right-4 text-border-strong opacity-30 font-mono text-[10px] hidden sm:block">
          +
        </div>
      </div>

      {/* Layer 4: Analog Tactile Paper Grain (Eliminates CSS Banding, Adds Physical Tooth) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035] dark:opacity-[0.045] pointer-events-none mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="hero-analog-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-analog-grain)" />
      </svg>

      {/* Soft Bottom Horizon Blend into next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-canvas to-transparent"
      />
    </div>
  );
};

export default HeroBackground;
