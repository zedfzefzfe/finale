import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { blogConfig } from '../config';

const Blog = () => {
  if (!blogConfig.heading && blogConfig.posts.length === 0) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="py-24 bg-[#0a0a0a] relative"
    >
      {/* Gold accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

      <div className="max-w-[1100px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className={`inline-block mb-4 text-sm tracking-[0.3em] text-[#C9A84C] font-medium uppercase transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {blogConfig.tag}
          </span>
          <h2
            className={`font-serif text-4xl md:text-5xl text-white mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {blogConfig.heading}
          </h2>
          {/* Decorative line */}
          <div
            className={`w-16 h-[1px] bg-[#C9A84C] mx-auto mt-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          />
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogConfig.posts.map((post, index) => (
            <article
              key={post.id}
              className={`group relative h-[500px] overflow-hidden cursor-pointer transition-all duration-700 gold-border-thin ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-600"
                style={{ backgroundImage: `url(${post.image})` }}
              />

              {/* Gradient Overlay - appears on hover */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-600"
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                {/* Date */}
                <span className="text-sm font-light tracking-wide text-[#C9A84C] mb-3 transform translate-y-0 group-hover:-translate-y-4 transition-transform duration-600">
                  {post.date}
                </span>

                {/* Title */}
                <h3 className="font-serif text-2xl md:text-[26px] leading-tight mb-4 transform translate-y-0 group-hover:-translate-y-4 transition-transform duration-600">
                  {post.title}
                </h3>

                {/* Excerpt - hidden by default, shows on hover */}
                <p className="text-sm font-light opacity-0 transform translate-y-4 group-hover:opacity-80 group-hover:translate-y-0 transition-all duration-600 mb-4 text-gray-300">
                  {post.excerpt}
                </p>

                {/* Read More Link */}
                <div className="flex items-center gap-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-600">
                  <span className="text-sm tracking-[0.2em] uppercase text-[#C9A84C]">{blogConfig.readMoreText}</span>
                  <ArrowRight size={16} className="text-[#C9A84C]" />
                  {/* Underline animation */}
                  <div className="absolute bottom-6 left-6 h-[1px] bg-[#C9A84C] w-0 group-hover:w-24 transition-all duration-600" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Link */}
        {blogConfig.viewAllText && (
          <div
            className={`text-center mt-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '900ms' }}
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 text-[#C9A84C] font-medium tracking-wide hover:gap-4 transition-all duration-300 gold-glow-hover"
            >
              {blogConfig.viewAllText}
              <ArrowRight size={18} />
            </a>
          </div>
        )}
      </div>

      {/* Bottom gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
    </section>
  );
};

export default Blog;
