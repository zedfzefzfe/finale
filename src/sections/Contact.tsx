import { useEffect, useRef, useState } from 'react';
import { MapPin, Mail, Phone, Send } from 'lucide-react';
import { contactConfig } from '../config';

const Contact = () => {
  if (!contactConfig.heading) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = [
      '✉️ *Message Contact — Alaa Parfum*',
      '',
      `👤 *Nom:* ${formData.name}`,
      `📧 *Email:* ${formData.email}`,
      '',
      `💬 *Message:*\n${formData.message}`,
    ].join('\n');

    const url = `https://wa.me/212700099462?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center"
    >
      {/* Background Image */}
      {contactConfig.backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${contactConfig.backgroundImage})` }}
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Gold accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
          {/* Left Side - Info */}
          <div
            className={`lg:w-1/2 text-white transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Logo */}
            <h2 className="font-serif text-5xl md:text-6xl lg:text-[70px] mb-8 leading-none gold-gradient-text">
              {contactConfig.heading}
            </h2>

            {/* Decorative line */}
            <div className="w-16 h-[1px] bg-[#C9A84C] mb-8" />

            <p className="text-xl font-light leading-relaxed text-gray-300 mb-12 max-w-md">
              {contactConfig.description}
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-12">
              {contactConfig.location && (
                <div className="flex items-center gap-4">
                  <MapPin size={20} strokeWidth={1.5} className="text-[#C9A84C]" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">{contactConfig.locationLabel}</span>
                    <span className="font-light text-gray-300">{contactConfig.location}</span>
                  </div>
                </div>
              )}

              {contactConfig.email && (
                <div className="flex items-center gap-4">
                  <Mail size={20} strokeWidth={1.5} className="text-[#C9A84C]" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">{contactConfig.emailLabel}</span>
                    <a href={`mailto:${contactConfig.email}`} className="font-light text-gray-300 hover:text-[#C9A84C] transition-colors">
                      {contactConfig.email}
                    </a>
                  </div>
                </div>
              )}

              {contactConfig.phone && (
                <div className="flex items-center gap-4">
                  <Phone size={20} strokeWidth={1.5} className="text-[#C9A84C]" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">{contactConfig.phoneLabel}</span>
                    <a href={`tel:${contactConfig.phone}`} className="font-light text-gray-300 hover:text-[#C9A84C] transition-colors">
                      {contactConfig.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Form */}
          <div
            className={`lg:w-1/2 max-w-md w-full transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <input
                  type="text"
                  placeholder={contactConfig.formFields.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-gray-500 py-4 focus:outline-none focus:border-[#C9A84C] transition-colors font-light text-lg"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder={contactConfig.formFields.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-gray-500 py-4 focus:outline-none focus:border-[#C9A84C] transition-colors font-light text-lg"
                />
              </div>

              <div>
                <textarea
                  placeholder={contactConfig.formFields.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-gray-500 py-4 focus:outline-none focus:border-[#C9A84C] transition-colors font-light text-lg resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 py-5 bg-[#C9A84C] text-black font-light tracking-widest text-sm btn-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">{contactConfig.submittingText}</span>
                ) : isSubmitted ? (
                  <>
                    <span>{contactConfig.submittedText}</span>
                  </>
                ) : (
                  <>
                    <span>{contactConfig.submitText}</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>

            {isSubmitted && (
              <p className="mt-6 text-[#C9A84C] text-center font-light">
                {contactConfig.successMessage}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
    </section>
  );
};

export default Contact;
