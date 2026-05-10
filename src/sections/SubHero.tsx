import { useEffect, useRef, useState } from 'react';
import { subHeroConfig } from '../config';


const SubHero = () => {
  if (!subHeroConfig.heading) return null;

  const outerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Fade-up animations trigger once when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.05 }
    );
    if (outerRef.current) observer.observe(outerRef.current);
    return () => observer.disconnect();
  }, []);

  const headingLines = subHeroConfig.heading.split('\n');
  const [para0, para1, para2] = subHeroConfig.bodyParagraphs;

  const fadeUp = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
  });

  // Shared CTA element rendered in two places (desktop right col / mobile+tablet below grid)
  const ctaLink = subHeroConfig.linkText ? (
    <a
      href={subHeroConfig.linkTarget}
      onClick={(e) => {
        e.preventDefault();
        document.querySelector(subHeroConfig.linkTarget)?.scrollIntoView({ behavior: 'smooth' });
      }}
      className="group inline-flex items-center gap-3 text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-medium self-start"
    >
      <span className="border-b border-[#C9A84C]/40 group-hover:border-[#C9A84C] transition-colors duration-300 pb-0.5">
        {subHeroConfig.linkText}
      </span>
      <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
    </a>
  ) : null;

  return (
    <section id="subhero" className="relative bg-[#0a0a0a]">
      <div ref={outerRef}>

        <div className="min-h-screen md:h-screen md:overflow-hidden flex flex-col justify-start pt-6 md:justify-center md:pt-0">

          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, #C9A84C07 0%, transparent 65%)' }}
          />

          {/* Watermark */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            aria-hidden
          >
            <span
              className="font-serif text-[18vw] md:text-[15vw] font-light uppercase tracking-widest whitespace-nowrap"
              style={{ color: '#C9A84C', opacity: 0.025 }}
            >
              PHILOSOPHIE
            </span>
          </div>

          {/* Top / bottom accent lines */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

          {/* ── Content ── */}
          <div className="relative max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20 w-full flex flex-col items-center gap-3 md:gap-4">

            {/* Tag */}
            <div className="flex items-center justify-center gap-4" style={fadeUp(100)}>
              <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#C9A84C]" />
              <span className="text-[9px] md:text-[10px] tracking-[0.5em] text-[#C9A84C] uppercase font-medium whitespace-nowrap">
                {subHeroConfig.tag}
              </span>
              <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#C9A84C]" />
            </div>

            {/* Heading */}
            <div className="text-center" style={fadeUp(200)}>
              <h2 className="font-serif leading-[1.05]">
                <span className="block text-2xl md:text-4xl lg:text-5xl text-white">
                  {headingLines[0]}
                </span>
                {headingLines[1] && (
                  <span className="block text-2xl md:text-4xl lg:text-5xl italic text-[#C9A84C]">
                    {headingLines[1]}
                  </span>
                )}
              </h2>
            </div>

            {/* Ornamental divider */}
            <div className="flex items-center justify-center gap-3" style={fadeUp(320)}>
              <div className="w-14 md:w-24 h-[1px] bg-gradient-to-r from-transparent to-[#C9A84C]/50" />
              <div className="w-1.5 h-1.5 border border-[#C9A84C]/50 rotate-45" />
              <div className="w-5 h-[1px] bg-[#C9A84C]/60" />
              <div className="w-2 h-2 border border-[#C9A84C] rotate-45" />
              <div className="w-5 h-[1px] bg-[#C9A84C]/60" />
              <div className="w-1.5 h-1.5 border border-[#C9A84C]/50 rotate-45" />
              <div className="w-14 md:w-24 h-[1px] bg-gradient-to-l from-transparent to-[#C9A84C]/50" />
            </div>

            {/* ── Editorial three-column grid ──
                Mobile:  1 col — text (all 3 paras) → bottle → CTA
                Tablet:  2 col — [text left | bottle right], CTA below spanning both
                Desktop: 3 col — [text | rule | bottle | rule | text+CTA]         */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(0,260px)] lg:grid-cols-[1fr_1px_minmax(0,280px)_1px_1fr] gap-0 items-center w-full">

              {/* Left text column
                  – Desktop: para0 + para1 only
                  – Tablet/Mobile: para0 + para1 + para2 (para2 moves to right col on desktop) */}
              <div className="flex flex-col gap-4 md:pr-8 lg:pr-12 pb-6 md:pb-0" style={fadeUp(400)}>
                <p className="text-gray-400 text-[13px] md:text-[14px] leading-[1.8] font-light">{para0}</p>
                <p className="text-gray-400 text-[13px] md:text-[14px] leading-[1.8] font-light">{para1}</p>
                {/* Para2 visible on mobile/tablet; hidden on desktop where it appears in right col */}
                {para2 && (
                  <p className="lg:hidden text-gray-400 text-[13px] md:text-[14px] leading-[1.8] font-light">
                    {para2}
                  </p>
                )}
              </div>

              {/* Left vertical gold rule — desktop only */}
              <div
                className="hidden lg:block w-[1px] self-stretch"
                style={{ background: 'linear-gradient(to bottom, transparent, #C9A84C50, transparent)' }}
              />

              {/* Center: bottle — vignette mask lives on the canvas element inside BottleReveal */}
              <div
                className="flex justify-center items-center py-5 md:py-3 lg:py-0 md:pl-8 lg:pl-0"
                style={fadeUp(500)}
              >
                <img
                  src="/bottle-frames/frame_001.jpg"
                  alt="Parfum"
                  className="w-full max-w-[280px] h-auto mx-auto block"
                  style={{
                    WebkitMaskImage: 'radial-gradient(ellipse 70% 85% at center, black 45%, transparent 100%)',
                    maskImage: 'radial-gradient(ellipse 70% 85% at center, black 45%, transparent 100%)',
                  }}
                />
              </div>

              {/* Right vertical gold rule — desktop only */}
              <div
                className="hidden lg:block w-[1px] self-stretch"
                style={{ background: 'linear-gradient(to bottom, transparent, #C9A84C50, transparent)' }}
              />

              {/* Right text column — desktop only: para2 + CTA */}
              <div className="hidden lg:flex flex-col gap-4 lg:pl-12" style={fadeUp(600)}>
                {para2 && (
                  <p className="text-gray-400 text-[14px] leading-[1.8] font-light">{para2}</p>
                )}
                {ctaLink}
              </div>

              {/* CTA for mobile + tablet — spans both tablet columns, hidden on desktop */}
              <div
                className="lg:hidden md:col-span-2 pt-4 md:pt-6"
                style={fadeUp(600)}
              >
                {ctaLink}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubHero;
