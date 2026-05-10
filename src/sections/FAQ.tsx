import { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { faqConfig } from '../config';

const FAQ = () => {
  if (!faqConfig.heading && faqConfig.faqs.length === 0) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#111111] relative"
    >
      {/* Gold accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className={`inline-block mb-4 text-sm tracking-[0.3em] text-[#C9A84C] font-medium uppercase transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {faqConfig.tag}
          </span>
          <h2
            className={`font-serif text-4xl md:text-5xl text-white mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {faqConfig.heading}
          </h2>
          {/* Decorative line */}
          <div
            className={`w-16 h-[1px] bg-[#C9A84C] mx-auto mt-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          />
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqConfig.faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              {/* Question */}
              <button
                onClick={() => toggleFaq(faq.id)}
                className={`w-full flex items-center justify-between px-6 lg:px-8 py-5 bg-[#0a0a0a] border border-[#C9A84C]/20 text-left transition-all duration-300 hover:border-[#C9A84C]/50 hover:shadow-[0_1px_20px_rgba(201,168,76,0.1)] ${
                  openId === faq.id ? 'border-b-0' : ''
                }`}
              >
                <span className="font-sans text-lg text-white font-light pr-4">
                  {faq.question}
                </span>
                <div
                  className={`flex-shrink-0 w-6 h-6 flex items-center justify-center border border-[#C9A84C]/50 rounded-full transition-transform ${
                    openId === faq.id ? 'rotate-45' : ''
                  }`}
                  style={{ transition: 'transform 0.7s cubic-bezier(0.55, 0.055, 0.675, 0.19)' }}
                >
                  <Plus size={14} strokeWidth={1.5} className="text-[#C9A84C]" />
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 lg:px-8 py-6 bg-[#0a0a0a] border border-t-0 border-[#C9A84C]/20">
                  <p className="text-gray-400 text-base font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        {faqConfig.ctaText && (
          <div
            className={`text-center mt-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            <p className="text-gray-400 mb-4">Still have questions?</p>
            <a
              href={faqConfig.ctaTarget}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(faqConfig.ctaTarget)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-[#C9A84C] font-medium tracking-wide hover:gap-4 transition-all duration-300 gold-glow-hover"
            >
              {faqConfig.ctaText}
              <span className="text-lg">&rarr;</span>
            </a>
          </div>
        )}
      </div>

      {/* Bottom gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
    </section>
  );
};

export default FAQ;
