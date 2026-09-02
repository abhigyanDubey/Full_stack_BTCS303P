import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

/**
 * Hero Component - Otakuverse Cyberpunk Storefront Banner
 */
export default function Hero({ onExploreCatalog }) {
  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-tag">
          <Sparkles size={14} className="hero-sparkle" />
          <span>PHASE 4 // REACT COMPONENTS & STATE VAULT</span>
        </div>

        <h1 className="hero-title">
          AUTHENTIC ANIME & GAMING ARTIFACTS
        </h1>

        <p className="hero-description">
          Equip your collection with exclusive miHoYo scale figures, official Lord of the Mysteries translated novels, and premium cyberpunk desk accessories.
        </p>

        <div className="hero-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onExploreCatalog}
          >
            <span>Browse Artifacts</span>
            <ArrowRight size={18} />
          </button>
          <a
            href="#features"
            className="btn btn-secondary"
          >
            Store Guarantees
          </a>
        </div>

        {/* Value Props Bar */}
        <div className="features-grid" id="features">
          <div className="feature-pill">
            <ShieldCheck size={18} className="feat-icon" />
            <span>100% Genuine Licensed Figures</span>
          </div>
          <div className="feature-pill">
            <Zap size={18} className="feat-icon" />
            <span>Free Express Dispatch Over $150</span>
          </div>
          <div className="feature-pill">
            <Sparkles size={18} className="feat-icon" />
            <span>Collector Grade Safe Packaging</span>
          </div>
        </div>
      </div>
    </section>
  );
}
