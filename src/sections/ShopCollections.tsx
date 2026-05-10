import { useEffect, useRef, useState } from 'react';

const cards = [
  {
    id: 'femme',
    label: 'FEMME',
    title: "L'Art de\nSéduire",
    subtitle: 'Collection Féminine',
    cta: 'Découvrir',
    image: 'images/botles.jpg',
    large: true,
    target: '#products',
  },
  {
    id: 'homme',
    label: 'HOMME',
    title: 'Le Bois\nSacré',
    subtitle: 'Collection Masculine',
    cta: 'Découvrir',
    image: 'images/perfume-4.jpg',
    large: false,
    target: '#packs',
  },
  {
    id: 'maison',
    label: 'MAISON',
    title: 'Notre\nHistoire',
    subtitle: "Depuis toujours, l'excellence",
    cta: 'En savoir plus',
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&auto=format&fit=crop&q=80',
    large: false,
    target: '#notre-histoire',
  },
];

const ShopCollections = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="collections"
      style={{
        background: '#0a0a0a',
        padding: '80px 40px',
        fontFamily: "'Jost', sans-serif",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .sc-card { position: relative; overflow: hidden; cursor: pointer; }
        .sc-card-img {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          transition: transform 0.6s ease;
          will-change: transform;
        }
        .sc-card:hover .sc-card-img { transform: scale(1.05); }
        .sc-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.08) 100%);
          transition: background 0.4s ease;
        }
        .sc-card:hover .sc-card-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.28) 55%, rgba(0,0,0,0.15) 100%);
        }
        .sc-btn {
          display: inline-block;
          padding: 9px 24px;
          border: 1px solid rgba(255,255,255,0.7);
          color: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 400;
          background: transparent;
          transition: background 0.35s ease, color 0.35s ease, border-color 0.35s ease;
          cursor: pointer;
          text-decoration: none;
        }
        .sc-card:hover .sc-btn {
          background: #fff;
          color: #0a0a0a;
          border-color: #fff;
        }

        @media (max-width: 768px) {
          .sc-grid { grid-template-columns: 1fr !important; grid-template-rows: auto !important; }
          .sc-card-large { grid-row: auto !important; height: 400px !important; }
          .sc-card-small { height: 400px !important; }
        }
      `}</style>

      {/* Section header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '48px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: '10px',
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: '#C9A84C',
          marginBottom: '14px',
        }}>
          Alaa Luxury Parfumes
        </p>
        <h2 style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 'clamp(11px, 1.2vw, 13px)',
          letterSpacing: '0.55em',
          textTransform: 'uppercase',
          color: '#fff',
          fontWeight: 400,
          marginBottom: '16px',
        }}>
          NOS COLLECTIONS
        </h2>
        {/* gold underline */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, transparent, #C9A84C)' }} />
          <div style={{ width: '5px', height: '5px', border: '1px solid #C9A84C', transform: 'rotate(45deg)' }} />
          <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to left, transparent, #C9A84C)' }} />
        </div>
      </div>

      {/* Grid */}
      <div
        className="sc-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '340px 340px',
          gap: '12px',
        }}
      >
        {cards.map((card, i) => {
          const isHovered = hovered === card.id;
          const delay = i * 120;

          return (
            <div
              key={card.id}
              className={`sc-card ${card.large ? 'sc-card-large' : 'sc-card-small'}`}
              style={{
                gridRow: card.large ? '1 / 3' : 'auto',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.85s ease ${delay}ms, transform 0.85s ease ${delay}ms`,
              }}
              onMouseEnter={() => setHovered(card.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => document.querySelector(card.target)?.scrollIntoView({ behavior: 'smooth' })}
            >
              {/* background image */}
              <div
                className="sc-card-img"
                style={{ backgroundImage: `url(${card.image})` }}
              />

              {/* gradient overlay */}
              <div className="sc-card-overlay" />

              {/* content */}
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                padding: card.large ? '40px 36px' : '28px 28px',
              }}>
                {/* label */}
                <p style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '9px',
                  letterSpacing: '0.5em',
                  textTransform: 'uppercase',
                  color: '#C9A84C',
                  marginBottom: card.large ? '14px' : '10px',
                  fontWeight: 400,
                }}>
                  {card.label}
                </p>

                {/* title */}
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: card.large ? 'clamp(2.2rem, 3.5vw, 3rem)' : 'clamp(1.6rem, 2.2vw, 2.1rem)',
                  fontWeight: 300,
                  color: '#fff',
                  lineHeight: 1.05,
                  letterSpacing: '-0.01em',
                  marginBottom: card.large ? '10px' : '7px',
                  whiteSpace: 'pre-line',
                }}>
                  {card.title}
                </h3>

                {/* subtitle */}
                <p style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                  color: 'rgba(255,255,255,0.5)',
                  fontWeight: 300,
                  marginBottom: card.large ? '28px' : '20px',
                  textTransform: 'uppercase',
                }}>
                  {card.subtitle}
                </p>

                {/* button */}
                <a href={card.target} className="sc-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(card.target)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {card.cta}
                </a>
              </div>

              {/* top-right card number */}
              <div style={{
                position: 'absolute',
                top: card.large ? '28px' : '20px',
                right: card.large ? '28px' : '20px',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '11px',
                color: 'rgba(255,255,255,0.25)',
                letterSpacing: '0.1em',
                opacity: isHovered ? 1 : 0.4,
                transition: 'opacity 0.4s ease',
              }}>
                0{i + 1}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ShopCollections;
