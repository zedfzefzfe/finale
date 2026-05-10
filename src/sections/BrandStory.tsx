import { useEffect, useRef, useState } from 'react';
import { brandStoryConfig } from '../config';

const BrandStory = () => {
  if (!brandStoryConfig.heading) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fadeUp = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.85s ease ${delay}ms, transform 0.85s ease ${delay}ms`,
  });

  const fadeIn = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transition: `opacity 1.1s ease ${delay}ms`,
  });

  return (
    <section
      id="notre-histoire"
      ref={sectionRef}
      className="w-full bg-[#0a0a0a] overflow-hidden"
    >
      {/* gold separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

      <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0">

        {/* ── LEFT: single image ── */}
        <div className="relative overflow-hidden" style={{ minHeight: '420px', ...fadeIn(0) }}>
          <img
            src="/images/botl.jpg"
            alt="Maître parfumeur"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: isVisible ? 'scale(1)' : 'scale(1.07)',
              transition: 'transform 1.8s ease',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%), linear-gradient(to right, transparent 0%, black 15%, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%), linear-gradient(to right, transparent 0%, black 15%, black 80%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
            }}
          />
        </div>

        {/* ── RIGHT: text — flex col, vertically centered to image height ── */}
        <div className="flex flex-col justify-center px-8 py-12 lg:px-14 lg:py-16 self-stretch">

          {/* tag — line on each side for symmetry */}
          <div className="flex items-center gap-3 mb-7" style={fadeUp(120)}>
            <div className="w-6 h-px bg-[#C9A84C]" />
            <span className="text-[9px] tracking-[0.5em] uppercase text-[#C9A84C]">
              {brandStoryConfig.tag}
            </span>
            <div className="w-6 h-px bg-[#C9A84C]" />
          </div>

          {/* heading */}
          <h2 style={{ ...fadeUp(220) }}>
            <span
              className="block text-white font-serif"
              style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)', lineHeight: 1.1, letterSpacing: '-0.01em' }}
            >
              L'Âme d'une
            </span>
            <span
              className="block font-serif text-[#C9A84C]"
              style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)', lineHeight: 1.1, letterSpacing: '-0.01em', fontStyle: 'italic' }}
            >
              Maison de Luxe
            </span>
          </h2>

          {/* gold rule — wider & thicker */}
          <div
            className="mt-7 mb-8"
            style={{ width: '40px', height: '2px', background: '#C9A84C', ...fadeUp(320), opacity: isVisible ? 0.7 : 0 }}
          />

          {/* paragraphs */}
          <p
            className="text-white/50 text-[14px] leading-[1.85] max-w-[420px]"
            style={{ marginBottom: '1.5rem', ...fadeUp(400) }}
          >
            {brandStoryConfig.bodyParagraphs?.[0]}
          </p>
          <p
            className="text-white/50 text-[14px] leading-[1.85] max-w-[420px]"
            style={{ marginBottom: '3rem', ...fadeUp(470) }}
          >
            {brandStoryConfig.bodyParagraphs?.[1]}
          </p>

          {/* CTA — line on each side for symmetry */}
          {brandStoryConfig.ctaText && (
            <div style={fadeUp(560)}>
              <a
                href={brandStoryConfig.ctaTarget}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(brandStoryConfig.ctaTarget)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-4"
              >
                <span
                  className="w-6 h-px bg-[#C9A84C]/50 group-hover:bg-[#C9A84C] transition-colors duration-300"
                  style={{ display: 'inline-block' }}
                />
                <span className="text-[10px] tracking-[0.45em] uppercase text-white group-hover:text-[#C9A84C] transition-colors duration-300">
                  {brandStoryConfig.ctaText}
                </span>
                <span
                  className="h-px bg-[#C9A84C]/50 group-hover:bg-[#C9A84C] transition-all duration-300"
                  style={{ display: 'inline-block', width: '24px' }}
                />
              </a>
            </div>
          )}
        </div>

      </div>

      {/* gold separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
    </section>
  );
};

export default BrandStory;
