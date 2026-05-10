import React, { useEffect, useRef, useState } from 'react';
import './notre-histoire.css';

const NosHistoire: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);
  const [vis, setVis] = useState(new Set<number>());

  // Fade-up on scroll via IntersectionObserver
  useEffect(() => {
    const nodes = sectionRef.current?.querySelectorAll<HTMLElement>('[data-nh]');
    if (!nodes?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVis((prev) => new Set([...prev, +(e.target as HTMLElement).dataset.nh!]));
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // Subtle parallax on "1999"
  useEffect(() => {
    const tick = () => {
      const el = yearRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const offset = (top + height / 2 - window.innerHeight / 2) / window.innerHeight;
      el.style.transform = `translateY(calc(-50% + ${offset * 52}px))`;
    };
    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, []);

  // Returns inline style for fade-up animation keyed to block index
  const fu = (i: number, d = 0): React.CSSProperties => ({
    opacity: vis.has(i) ? 1 : 0,
    transform: vis.has(i) ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 600ms ease-out ${d}ms, transform 600ms ease-out ${d}ms`,
  });

  const milestones: [string, string, string][] = [
    [
      '1999',
      'La Première Goutte',
      'Première composition créée dans un atelier à Grasse, au cœur des champs en fleurs.',
    ],
    [
      '2007',
      'La Maison Naît',
      'Ouverture de la première maison Alaa à Casablanca, porte entre l’Orient et l’Occident.',
    ],
    [
      '2015',
      'L’Oud Sacré',
      'Voyage au Cambodge — sourcing direct des bois d’agar, sélectionnés à la main.',
    ],
    [
      '2024',
      'L’Héritage Continue',
      'Lancement de la collection Aurum Noir, 25ᵉ anniversaire de la Maison.',
    ],
  ];

  return (
    <section id="notre-histoire" ref={sectionRef} className="nh">

      {/* Grain texture — SVG feTurbulence tiled over the full section */}
      <svg className="nh__grain" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <filter id="nh-noise-f">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
            result="n"
          />
          <feColorMatrix in="n" type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#nh-noise-f)" opacity="0.038" />
      </svg>


      {/* ── Block 1 · Opening Statement ─────────────────────── */}
      <div className="nh-opening" data-nh={0}>

        <div className="nh-opening__left" style={fu(0)}>
          <span className="nh-eyebrow">
            Chapitre&#x202f;I&#x202f;&#x2014;&#x202f;L&#x2019;Origine
          </span>
          <h2 className="nh-headline">
            <span>Une obsession n&#xe9;e dans</span>
            <span>les ateliers de Grasse,</span>
            <em>transmise &#xe0; Casablanca.</em>
          </h2>
        </div>

        <div className="nh-opening__right">
          <div className="nh-opening__body" style={fu(0, 220)}>
            <p className="nh-prose">
              Tout commence par une m&#xe9;moire olfactive&#x202f;&#x2014; celle d&#x2019;un enfant
              &#xe0; Grasse, envelopp&#xe9; de jasmin et de rose de mai. Vingt-cinq ans plus tard,
              cette obsession prend la forme d&#x2019;une maison. Une vision. Un h&#xe9;ritage.
            </p>
          </div>
          <div className="nh-hairline" aria-hidden="true" />
          <span ref={yearRef} className="nh-year" aria-hidden="true">
            1999
          </span>
        </div>

      </div>


      {/* ── Block 2 · Founder Quote ─────────────────────────── */}
      <div className="nh-quote-section" data-nh={1} style={fu(1)}>

        <blockquote className="nh-pullquote">
          Je ne cr&#xe9;e pas des parfums. Je mets en flacon des souvenirs
          qui n&#x2019;ont pas encore eu lieu.
        </blockquote>

        {/* Custom rhombus SVG divider — no unicode characters */}
        <svg
          className="nh-rhombus"
          width="240"
          height="16"
          viewBox="0 0 240 16"
          fill="none"
          aria-hidden="true"
        >
          <line x1="0" y1="8" x2="106" y2="8" stroke="#c9a961" strokeWidth="0.75" />
          <polygon points="120,2 128,8 120,14 112,8" fill="#c9a961" />
          <line x1="134" y1="8" x2="240" y2="8" stroke="#c9a961" strokeWidth="0.75" />
        </svg>

        <cite className="nh-cite">
          &#x2014;&#xa0;Alaa, Fondateur &amp; Ma&#xee;tre Parfumeur
        </cite>

      </div>


      {/* ── Block 3 · Timeline ──────────────────────────────── */}
      <div className="nh-tl-section" data-nh={2} style={fu(2)}>
        <div className="nh-tl" role="list">

          <div className="nh-tl__rail" aria-hidden="true" />

          {milestones.map(([year, title, body]) => (
            <div className="nh-tl__item" key={year} role="listitem">
              <div className="nh-tl__marker">
                <svg
                  className="nh-tl__diamond"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <polygon points="7,1 13,7 7,13 1,7" stroke="#c9a961" strokeWidth="1" />
                </svg>
              </div>
              <div className="nh-tl__text">
                <span className="nh-tl__year">{year}</span>
                <strong className="nh-tl__title">{title}</strong>
                <p className="nh-tl__body">{body}</p>
              </div>
            </div>
          ))}

        </div>
      </div>


      {/* ── Block 4 · Numbers ───────────────────────────────── */}
      <div className="nh-nums-section" data-nh={3} style={fu(3)}>
        <div className="nh-nums">

          <div className="nh-num">
            <span className="nh-num__n">25</span>
            <div className="nh-num__rule" aria-hidden="true" />
            <span className="nh-num__l">ann&#xe9;es d&#x2019;expertise</span>
          </div>

          <div className="nh-num">
            <span className="nh-num__n">47</span>
            <div className="nh-num__rule" aria-hidden="true" />
            <span className="nh-num__l">ingr&#xe9;dients rares sourc&#xe9;s &#xe0; la main</span>
          </div>

          <div className="nh-num">
            {/* ∞ in italic Cormorant reads as calligraphic, not icon */}
            <span className="nh-num__n nh-num__n--i">&#x221e;</span>
            <div className="nh-num__rule" aria-hidden="true" />
            <span className="nh-num__l">heures d&#xe9;di&#xe9;es &#xe0; chaque flacon</span>
          </div>

        </div>
      </div>


      {/* ── Block 5 · Closing CTA ───────────────────────────── */}
      <div className="nh-close" data-nh={4} style={fu(4)}>

        {/* Background placeholder — swap for atelier photograph when available */}
        <div className="nh-close__bg" aria-hidden="true" />

        <div className="nh-close__inner">
          <span className="nh-eyebrow nh-eyebrow--c">L&#x2019;Invitation</span>
          <h3 className="nh-close__h">
            Entrez dans <em>la Maison.</em>
          </h3>
          <p className="nh-close__sub">
            Chaque flacon est une confidence&#x202f;&#x2014; une invitation &#xe0; entrer dans
            un monde qui ne ressemble &#xe0; aucun autre.
          </p>
          <a
            href="#products"
            className="nh-btn"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="nh-btn__t">D&#xe9;couvrir notre savoir-faire</span>
            <span className="nh-btn__a" aria-hidden="true">&#x2014;&#x203a;</span>
          </a>
        </div>

      </div>

    </section>
  );
};

export default NosHistoire;
