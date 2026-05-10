import { useEffect, useRef, useState } from 'react';
import { ShoppingBag, Check, X } from 'lucide-react';
import { creamsConfig } from '../config';
import type { Cream } from '../config';

interface CreamsProps {
  onAddToCart: (cream: Cream) => void;
}

const Creams = ({ onAddToCart }: CreamsProps) => {
  if (!creamsConfig.heading && creamsConfig.creams.length === 0) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(creamsConfig.categories[0] || 'Tous');
  const [addedItems, setAddedItems] = useState<number[]>([]);
  const [selectedCream, setSelectedCream] = useState<Cream | null>(null);

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredCreams = activeCategory === creamsConfig.categories[0]
    ? creamsConfig.creams
    : creamsConfig.creams.filter(c => c.category === activeCategory);

  const handleAddToCart = (cream: Cream) => {
    onAddToCart(cream);
    setAddedItems(prev => [...prev, cream.id]);
    setTimeout(() => {
      setAddedItems(prev => prev.filter(id => id !== cream.id));
    }, 2000);
  };

  return (
    <>
      <section
        id="creams"
        ref={sectionRef}
        className="py-24 md:py-32 bg-[#0a0a0a]"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-[60px]">

          {/* Header */}
          <div className="text-center mb-12">
            <span
              className={`inline-block mb-4 text-sm tracking-[0.3em] text-[#C9A84C] font-medium uppercase transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {creamsConfig.tag}
            </span>
            <h2
              className={`font-serif text-4xl md:text-5xl text-white mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {creamsConfig.heading}
            </h2>
            <p
              className={`max-w-2xl mx-auto text-gray-400 text-lg transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              {creamsConfig.description}
            </p>
          </div>

          {/* Category Filter */}
          {creamsConfig.categories.length > 0 && (
            <div
              className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              {creamsConfig.categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 text-sm tracking-wide transition-all duration-300 border ${
                    activeCategory === category
                      ? 'bg-[#C9A84C] text-black border-[#C9A84C]'
                      : 'bg-transparent text-gray-400 border-[#C9A84C]/30 hover:border-[#C9A84C] hover:text-[#C9A84C]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreams.map((cream, index) => (
              <div
                key={cream.id}
                className={`group bg-[#111111] border border-[#C9A84C]/20 transition-all duration-700 hover:border-[#C9A84C]/50 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${800 + index * 100}ms` }}
              >
                {/* Image */}
                <div
                  className="relative h-[400px] overflow-hidden bg-[#0a0a0a] cursor-pointer"
                  onClick={() => setSelectedCream(cream)}
                >
                  <img
                    src={cream.image}
                    alt={cream.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-6 py-3 border border-[#C9A84C] text-[#C9A84C] text-sm tracking-widest">
                      VOIR LE DÉTAIL
                    </span>
                  </div>

                  {/* Quick Add */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(cream);
                    }}
                    className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 flex items-center gap-2 text-sm tracking-wide transition-all duration-300 whitespace-nowrap ${
                      addedItems.includes(cream.id)
                        ? 'bg-green-600 text-white opacity-100 translate-y-0'
                        : 'bg-[#C9A84C] text-black opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'
                    }`}
                  >
                    {addedItems.includes(cream.id) ? (
                      <><Check size={16} />{creamsConfig.addedToCartText}</>
                    ) : (
                      <><ShoppingBag size={16} />{creamsConfig.addToCartText}</>
                    )}
                  </button>
                </div>

                {/* Info */}
                <div className="p-5 bg-[#111111]">
                  <span className="text-xs text-[#C9A84C]/70 tracking-wide uppercase">{cream.category}</span>
                  <h3 className="font-serif text-xl text-white mt-1 group-hover:text-[#C9A84C] transition-colors">
                    {cream.name}
                  </h3>
                  <p className="text-[#C9A84C] font-medium mt-2">{cream.price} dh</p>
                </div>
              </div>
            ))}
          </div>

          {/* View All */}
          {creamsConfig.viewAllText && (
            <div
              className={`text-center mt-12 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '1200ms' }}
            >
              <button
                onClick={() => document.querySelector('#creams')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-12 py-4 border-2 border-[#C9A84C] text-[#C9A84C] font-light tracking-widest text-sm hover:bg-[#C9A84C] hover:text-black transition-all duration-300"
              >
                {creamsConfig.viewAllText}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Cream Detail Modal */}
      {selectedCream && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setSelectedCream(null)} />
          <div className="relative bg-[#111111] max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#C9A84C]/30">
            <button
              onClick={() => setSelectedCream(null)}
              className="absolute top-4 right-4 z-10 p-2 text-white hover:text-[#C9A84C] transition-colors"
            >
              <X size={24} />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="h-[400px] md:h-full bg-[#0a0a0a]">
                <img
                  src={selectedCream.image}
                  alt={selectedCream.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="p-8">
                <span className="text-xs text-[#C9A84C]/70 tracking-wide uppercase">{selectedCream.category}</span>
                <h2 className="font-serif text-3xl text-white mt-2">{selectedCream.name}</h2>
                <p className="text-gray-400 mt-4 leading-relaxed">{selectedCream.description}</p>

                <div className="mt-8 space-y-5">
                  {selectedCream.keyIngredients && (
                    <div>
                      <h4 className="text-[#C9A84C] text-sm tracking-wide uppercase mb-2">Ingrédients Clés</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCream.keyIngredients.map((item) => (
                          <span key={item} className="px-3 py-1 bg-[#0a0a0a] text-gray-300 text-sm border border-[#C9A84C]/20">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedCream.benefits && (
                    <div>
                      <h4 className="text-[#C9A84C] text-sm tracking-wide uppercase mb-2">Bienfaits</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCream.benefits.map((b) => (
                          <span key={b} className="px-3 py-1 bg-[#0a0a0a] text-gray-300 text-sm border border-[#C9A84C]/20">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedCream.skinType && (
                    <div>
                      <h4 className="text-[#C9A84C] text-sm tracking-wide uppercase mb-2">Type de Peau</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCream.skinType.map((s) => (
                          <span key={s} className="px-3 py-1 bg-[#0a0a0a] text-gray-300 text-sm border border-[#C9A84C]/20">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-[#C9A84C]/20">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-gray-400">Prix</span>
                    <span className="font-serif text-2xl text-[#C9A84C]">{selectedCream.price} dh</span>
                  </div>
                  <button
                    onClick={() => {
                      handleAddToCart(selectedCream);
                      setSelectedCream(null);
                    }}
                    className="w-full py-4 bg-[#C9A84C] text-black font-light tracking-widest btn-hover flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={18} />
                    AJOUTER AU PANIER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Creams;
