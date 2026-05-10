const cards = [
  {
    image: '/images/perfume_bottle_1_with_logo.jpg.png',
    category: 'PARFUM · BERGAMOTE · CÈDRE',
    name: 'Velvet Storm',
    price: '',
  },
  {
    image: '/images/Bottle Swap (2).png',
    category: 'PARFUM · OUD · ENCENS',
    name: 'Noir Absolu',
    price: '',
  },
  {
    image: '/images/bottle_3_logo.jpg.png',
    category: 'PARFUM · VÉTIVER · CÈDRE',
    name: 'Imagination',
    price: '',
  },
  {
    image: '/images/perfume_bottle_logo_applied.jpg.png',
    category: 'PARFUM · OUD · CAFÉ',
    name: 'Khamra Qahwa',
    price: '',
  },
  {
    image: '/images/perfume_bottle_logo_replacement.jpg (1).png',
    category: 'PARFUM · PIVOINE · VANILLE',
    name: "Bombshell — Victoria's Secret",
    price: '',
  },
  {
    image: '/images/perfume_bottle_logo_replacement.jpg.png',
    category: 'PARFUM · CASSIS · JASMIN',
    name: 'Burberry Her + Musk',
    price: '',
  },
];

const Card = ({ card }: { card: typeof cards[0] }) => (
  <a
    href="#products"
    onClick={(e) => { e.preventDefault(); document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' }); }}
    className="cc-card"
    aria-label={card.name}
  >
    {/* full background image */}
    <img src={card.image} alt={card.name} className="cc-bg" />

    {/* gradient overlay */}
    <div className="cc-gradient" aria-hidden />

    {/* content overlay */}
    <div className="cc-content">
      <span className="cc-name">{card.name}</span>
      <span className="cc-meta">{card.category}</span>
      <span className="cc-price">{card.price}</span>
    </div>
  </a>
);

const CollectionCarousel = () => (
  <section className="cc-section">
    <style>{`
      .cc-section {
        position: relative;
        background:
          radial-gradient(circle at 50% 0%, rgba(201,168,76,0.04), transparent 55%),
          #050505;
        padding: 100px 0 110px;
        overflow: hidden;
        width: 100%;
      }

      /* ── HEADER ───────────────────────────────────────── */
      .cc-header {
        max-width: 1100px;
        margin: 0 auto;
        text-align: center;
        padding: 0 24px 70px;
      }
      .cc-eyebrow {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        margin-bottom: 28px;
      }
      .cc-eyebrow-line {
        width: 40px;
        height: 1px;
        background: #C9A84C;
        opacity: 0.5;
      }
      .cc-eyebrow-text {
        font-family: 'Jost', sans-serif;
        font-weight: 200;
        font-size: 11px;
        letter-spacing: 0.45em;
        text-transform: uppercase;
        color: #C9A84C;
      }
      .cc-title {
        font-family: 'Cormorant Garamond', serif;
        font-weight: 300;
        font-size: clamp(40px, 5.2vw, 76px);
        letter-spacing: -0.02em;
        line-height: 1.05;
        color: #ffffff;
        margin: 0;
      }
      .cc-title-italic {
        font-style: italic;
        color: #C9A84C;
        font-weight: 300;
      }

      /* ── TRACK / MARQUEE ──────────────────────────────── */
      @keyframes cc-marquee {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .cc-wrapper {
        overflow: hidden;
        width: 100%;
        padding: 8px 0;
      }
      .cc-track {
        display: flex;
        gap: 24px;
        width: max-content;
        animation: cc-marquee 60s linear infinite;
        padding: 0 24px;
      }
      .cc-wrapper:hover .cc-track {
        animation-play-state: paused;
      }

      /* ── CARD — BIG EDITORIAL ─────────────────────────── */
      .cc-card {
        position: relative;
        width: 380px;
        min-width: 380px;
        height: 600px;
        flex-shrink: 0;
        overflow: hidden;
        background: #0a0a0a;
        cursor: pointer;
        text-decoration: none;
        display: block;
        transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .cc-card:hover { transform: translateY(-6px); }

      .cc-bg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .cc-card:hover .cc-bg { transform: scale(1.06); }

      .cc-gradient {
        position: absolute;
        inset: 0;
        background:
          linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 38%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0) 100%);
        pointer-events: none;
      }

      .cc-content {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 32px 32px 36px;
        display: flex;
        flex-direction: column;
        z-index: 2;
      }
      .cc-name {
        font-family: 'Cormorant Garamond', serif;
        font-style: italic;
        font-weight: 300;
        font-size: 32px;
        line-height: 1.1;
        letter-spacing: -0.01em;
        color: #ffffff;
        margin-bottom: 10px;
      }
      .cc-meta {
        font-family: 'Jost', sans-serif;
        font-weight: 300;
        font-size: 10px;
        letter-spacing: 0.32em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.55);
        margin-bottom: 14px;
      }
      .cc-price {
        font-family: 'Jost', sans-serif;
        font-weight: 300;
        font-size: 12px;
        letter-spacing: 0.18em;
        color: #C9A84C;
      }

      /* mobile */
      @media (max-width: 768px) {
        .cc-card { width: 280px; min-width: 280px; height: 460px; }
        .cc-name { font-size: 26px; }
        .cc-track { animation-duration: 35s; gap: 16px; padding: 0 16px; }
        .cc-content { padding: 24px 24px 28px; }
      }
    `}</style>

    {/* HEADER */}
    <div className="cc-header">
      <div className="cc-eyebrow">
        <span className="cc-eyebrow-line" />
        <span className="cc-eyebrow-text">NOS CRÉATIONS</span>
        <span className="cc-eyebrow-line" />
      </div>

      <h2 className="cc-title">
        Les Plus <span className="cc-title-italic">Populaires.</span>
      </h2>
    </div>

    {/* CAROUSEL */}
    <div className="cc-wrapper">
      <div className="cc-track">
        {cards.map((card, i) => <Card key={`a-${i}`} card={card} />)}
        {cards.map((card, i) => <Card key={`b-${i}`} card={card} />)}
      </div>
    </div>
  </section>
);

export default CollectionCarousel;
