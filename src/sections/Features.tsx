import { useEffect, useRef, useState } from 'react';
import { Truck, ShieldCheck, Leaf, Heart, Sparkles, Gift } from 'lucide-react';
import { featuresConfig } from '../config';

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Truck, ShieldCheck, Leaf, Heart, Sparkles, Gift,
};

const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];

const Features = () => {
  if (featuresConfig.features.length === 0) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#0a0a0a] overflow-hidden">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

      {/* Radial background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, #C9A84C06 0%, transparent 70%)' }}
      />

      {/* ── Section label ── */}
      <div
        className="pt-20 pb-12 text-center"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.8s ease 100ms, transform 0.8s ease 100ms',
        }}
      >
        <div className="flex items-center justify-center gap-4">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#C9A84C]/60" />
          <span className="text-[10px] tracking-[0.5em] text-[#C9A84C] uppercase font-medium">
            L'Excellence Alaa
          </span>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#C9A84C]/60" />
        </div>
      </div>

      {/* ── Features grid ── */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-[#C9A84C]/15"
      >
        {featuresConfig.features.map((feature, index) => {
          const IconComponent = iconMap[feature.icon];
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={feature.title}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative group flex flex-col px-10 py-14 border-b lg:border-b-0 border-r border-[#C9A84C]/15 last:border-r-0 overflow-hidden cursor-default transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${200 + index * 130}ms` }}
            >
              {/* Animated top gold border */}
              <div
                className="absolute top-0 left-0 h-[2px] bg-[#C9A84C] transition-all duration-500"
                style={{ width: isHovered ? '100%' : '0%' }}
              />

              {/* Roman numeral watermark */}
              <div
                className="absolute -top-4 -right-2 font-serif text-[100px] lg:text-[120px] font-light leading-none select-none pointer-events-none transition-all duration-500"
                style={{
                  color: '#C9A84C',
                  opacity: isHovered ? 0.07 : 0.035,
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                }}
                aria-hidden
              >
                {romanNumerals[index]}
              </div>

              {/* Icon in minimal frame */}
              <div className="relative z-10 mb-8">
                <div
                  className="inline-flex items-center justify-center w-14 h-14 border border-[#C9A84C]/30 transition-all duration-500"
                  style={{
                    borderColor: isHovered ? 'rgba(201,168,76,0.7)' : 'rgba(201,168,76,0.25)',
                    background: isHovered ? 'rgba(201,168,76,0.06)' : 'transparent',
                  }}
                >
                  {IconComponent && (
                    <IconComponent size={22} strokeWidth={1.2} className="text-[#C9A84C]" />
                  )}
                </div>
              </div>

              {/* Index number */}
              <span className="relative z-10 text-[10px] tracking-[0.4em] text-[#C9A84C]/50 uppercase mb-4 font-medium">
                0{index + 1}
              </span>

              {/* Title */}
              <h3
                className="relative z-10 font-serif text-2xl lg:text-[26px] leading-tight mb-4 transition-colors duration-300"
                style={{ color: isHovered ? '#C9A84C' : '#ffffff' }}
              >
                {feature.title}
              </h3>

              {/* Thin divider */}
              <div
                className="relative z-10 w-8 h-[1px] bg-[#C9A84C]/40 mb-5 transition-all duration-500"
                style={{ width: isHovered ? '40px' : '32px' }}
              />

              {/* Description */}
              <p className="relative z-10 text-gray-500 text-[14px] leading-[1.8] font-light">
                {feature.description}
              </p>

              {/* Bottom subtle glow on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(to top, rgba(201,168,76,0.04), transparent)',
                  opacity: isHovered ? 1 : 0,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
    </section>
  );
};

export default Features;
