import { useEffect, useRef, useState } from 'react';
import { videoSectionConfig } from '../config';

const VideoSection = () => {
  if (!videoSectionConfig.heading) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          videoRef.current?.play().catch(() => {});
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const headingLines = videoSectionConfig.heading.split('\n');

  const fadeUp = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 1s ease ${delay}ms, transform 1s ease ${delay}ms`,
  });

  return (
    <section
      id="video"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: '600px' }}
    >
      {/* ── Video Background ── */}
      <video
        ref={videoRef}
        src="/images/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster={videoSectionConfig.backgroundImage}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: isVisible ? 'scale(1.0)' : 'scale(1.06)',
          transition: 'transform 2s ease',
        }}
      />

      {/* ── Layered overlays ── */}
      {/* Base dark */}
      <div className="absolute inset-0 bg-black/55" />
      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      {/* Left/right fade */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />


      {/* ── Top & bottom gold lines ── */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />

      {/* ── Centered Content ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12">

        {/* Tag */}
        <div className="flex items-center justify-center gap-4 mb-8" style={fadeUp(200)}>
          <div className="w-10 md:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#C9A84C]" />
          <span className="text-[10px] md:text-xs tracking-[0.5em] text-[#C9A84C] uppercase font-medium">
            {videoSectionConfig.tag}
          </span>
          <div className="w-10 md:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#C9A84C]" />
        </div>

        {/* Heading */}
        <h2 className="font-serif mb-8 max-w-4xl" style={fadeUp(400)}>
          <span className="block text-4xl md:text-6xl lg:text-7xl xl:text-[80px] text-white leading-[1.05]">
            {headingLines[0]}
          </span>
          {headingLines[1] && (
            <span className="block text-4xl md:text-6xl lg:text-7xl xl:text-[80px] italic text-[#C9A84C] leading-[1.05]">
              {headingLines[1]}
            </span>
          )}
        </h2>

        {/* Ornamental line */}
        <div className="flex items-center justify-center gap-3 mb-10" style={fadeUp(550)}>
          <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#C9A84C]/60" />
          <div className="w-2 h-2 border border-[#C9A84C] rotate-45" />
          <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#C9A84C]/60" />
        </div>

        {/* Body paragraphs */}
        <div className="max-w-2xl space-y-4 mb-12">
          {videoSectionConfig.bodyParagraphs.map((para, i) => (
            <p
              key={i}
              className="text-gray-300 text-[15px] md:text-base leading-[1.85] font-light"
              style={fadeUp(650 + i * 120)}
            >
              {para}
            </p>
          ))}
        </div>

        {/* CTA */}
        {videoSectionConfig.ctaText && (
          <div style={fadeUp(900)}>
            <a
              href={videoSectionConfig.ctaTarget}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(videoSectionConfig.ctaTarget)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center gap-4 px-10 md:px-14 py-4 md:py-5 border border-[#C9A84C] text-[#C9A84C] text-xs tracking-[0.35em] uppercase overflow-hidden transition-all duration-500 hover:text-black hover:shadow-lg hover:shadow-[#C9A84C]/30"
            >
              <span className="relative z-10">{videoSectionConfig.ctaText}</span>
              <div className="absolute inset-0 bg-[#C9A84C] -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoSection;
