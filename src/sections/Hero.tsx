import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { heroConfig } from '../config';

const Hero = () => {
  if (!heroConfig.title) return null;

  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.querySelector('#subhero');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const titleLines = heroConfig.title.split('\n');

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 parallax-bg"
        style={{
          backgroundImage: `url(${heroConfig.backgroundImage})`,
        }}
      />

      {/* Dark Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      {/* Gold accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />

      {/* Content - Left Aligned Layout */}
      <div className="relative z-10 h-full w-full flex items-center">
        {/* Left side - Text content */}
        <div className="w-full lg:w-1/2 h-full flex flex-col items-center lg:items-start justify-center px-8 md:px-12 lg:px-16 pt-[140px] md:pt-[170px] lg:pt-0">
          {/* Content wrapper */}
          <div className="relative z-10 max-w-2xl w-full text-center lg:text-left">
            {/* Tagline */}
            <div
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 md:mb-8">
                <div className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-[#C9A84C] to-transparent" />
                <span className="text-[11px] md:text-sm tracking-[0.3em] md:tracking-[0.3em] font-light uppercase text-[#C9A84C]">
                  {heroConfig.tagline}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1
              className={`font-serif text-5xl md:text-6xl lg:text-7xl leading-tight transition-all duration-1000 mb-4 md:mb-8 text-white ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              {titleLines.map((line, i) => (
                <span key={i} className={i === 0 ? 'gold-gradient-text' : 'text-white'}>
                  {line}
                  {i < titleLines.length - 1 && <br />}
                </span>
              ))}
            </h1>

            {/* Decorative line */}
            <div
              className={`w-10 md:w-16 h-[2px] bg-gradient-to-r from-[#C9A84C] to-transparent mb-4 md:mb-8 transition-all duration-1000 mx-auto lg:mx-0 ${
                isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
              style={{ transitionDelay: '500ms', transformOrigin: 'left' }}
            />

            {/* CTA Buttons */}
            <div
              className={`flex flex-col lg:flex-row gap-3 lg:gap-4 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              {heroConfig.ctaPrimaryText && (
                <a
                  href={heroConfig.ctaPrimaryTarget}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(heroConfig.ctaPrimaryTarget)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group w-full lg:w-auto px-5 md:px-12 py-4 md:py-5 bg-[#C9A84C] text-black font-light tracking-wider text-xs md:text-sm uppercase relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A84C]/40 hover:-translate-y-1"
                >
                  <span className="relative z-10">{heroConfig.ctaPrimaryText}</span>
                  <div className="absolute inset-0 bg-white/20 -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>
              )}
              {heroConfig.ctaSecondaryText && (
                <a
                  href={heroConfig.ctaSecondaryTarget}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(heroConfig.ctaSecondaryTarget)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group w-full lg:w-auto px-5 md:px-12 py-4 md:py-5 border-2 border-[#C9A84C] text-[#C9A84C] font-light tracking-wider text-xs md:text-sm uppercase relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A84C]/30 hover:-translate-y-1"
                >
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300">{heroConfig.ctaSecondaryText}</span>
                  <div className="absolute inset-0 bg-[#C9A84C] -translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right side - Empty space for visual balance */}
        <div className="hidden lg:block w-1/2 h-full" />
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-[#C9A84C] animate-bounce transition-opacity duration-1000 ${
          isVisible ? 'opacity-70' : 'opacity-0'
        }`}
        style={{ transitionDelay: '800ms' }}
      >
        <ChevronDown size={32} strokeWidth={1} />
      </button>

      {/* Bottom gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
    </section>
  );
};

export default Hero;
