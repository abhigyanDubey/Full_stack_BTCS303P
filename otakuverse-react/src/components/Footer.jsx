import React from 'react';
import { Heart } from 'lucide-react';

/**
 * Footer Component
 * COER University Full Stack Development (BTCS303P) Coursework Footer
 */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="logo">
            OTAKU<span>VERSE</span> <span className="badge">⛩️ VAULT</span>
          </div>
          <p className="footer-desc">
            COER University, Roorkee — Department of Computer Science & Engineering<br />
            <strong>BTCS303P: Full Stack Web Development</strong> (Mini E-Commerce Lab 3)
          </p>
        </div>

        <div className="footer-links-group">
          <h4>Course Deliverables</h4>
          <ul>
            <li><span>Lab 1:</span> HTML5 & CSS3 Responsive Storefront</li>
            <li><span>Lab 2:</span> Vanilla JS Cart & Validation</li>
            <li><span>Lab 3:</span> Rebuilding with React (Components, Props, useState)</li>
          </ul>
        </div>

        <div className="footer-bottom">
          <p>
            Developed with <Heart size={14} className="heart-icon" fill="#ff2a74" color="#ff2a74" /> using <strong>React 19 + Vite</strong>.
          </p>
          <p className="copyright-text">
            © 2026 OTAKUVERSE Storefront. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
