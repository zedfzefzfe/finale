import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, X, Search, Instagram, Facebook, Twitter } from 'lucide-react';
import { navigationConfig } from '../config';
import OrderModal from '../components/OrderModal';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

interface NavigationProps {
  cartItems: CartItem[];
  onRemoveFromCart: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Instagram,
  Facebook,
  Twitter,
};

const Navigation = ({ cartItems, onRemoveFromCart, onUpdateQuantity }: NavigationProps) => {
  if (!navigationConfig.brandName) return null;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 50);
      if (currentY > lastScrollY.current && currentY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-sm shadow-lg shadow-black/20' : 'bg-transparent'
        } ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        {/* ── Mobile layout: [hamburger | centered logo | cart] ── */}
        {/* ── Desktop layout: [logo | cart + hamburger] ── */}
        <div className="flex items-center h-[140px] md:h-[170px] px-6 md:px-12 lg:px-[30px]">

          {/* Column 1 — logo always (left on mobile, left on desktop) */}
          <div className="flex-1 lg:flex-none flex justify-start items-center h-full">
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
              className="gold-glow-hover inline-flex items-center h-full lg:ml-10"
              aria-label={navigationConfig.brandName}
            >
              {navigationConfig.logoImage ? (
                <img
                  src={navigationConfig.logoImage}
                  alt={navigationConfig.brandName}
                  className="block h-full w-auto max-w-[220px] lg:max-w-[420px] object-contain py-1"
                />
              ) : (
                <span className="font-serif text-2xl tracking-wider" style={{ color: isScrolled ? '#C9A84C' : '#fff' }}>
                  {navigationConfig.brandName}
                </span>
              )}
            </a>
          </div>

          {/* Column 2 — cart always + hamburger always */}
          <div className="flex-1 flex justify-end items-center gap-6 lg:mr-10">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative btn-hover"
              style={{ color: isScrolled ? '#C9A84C' : '#fff' }}
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs text-black bg-[#C9A84C] rounded-full font-medium">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Hamburger — always visible */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-col gap-1.5 w-7 btn-hover"
            >
              <span className={`h-[2px] w-full transition-all duration-300 ${isScrolled ? 'bg-[#C9A84C]' : 'bg-white'}`} />
              <span className={`h-[2px] w-full transition-all duration-300 ${isScrolled ? 'bg-[#C9A84C]' : 'bg-white'}`} />
            </button>
          </div>

        </div>
      </nav>

      {/* Full Screen Menu */}
      <div
        className={`fixed inset-0 z-[9999] transition-all duration-700 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 lg:hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${navigationConfig.menuBackgroundImage})` }}
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/80 lg:bg-[#0a0a0a]" />
        <div className="relative h-full flex">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 lg:right-20 z-10 p-2 text-white hover:text-[#C9A84C] transition-colors"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
          <div className="flex-1 flex flex-col justify-center items-center px-8 lg:px-20">

            <div className="w-full max-w-md mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder={navigationConfig.searchPlaceholder}
                  className="w-full py-3 border-b-2 border-[#C9A84C] bg-transparent focus:outline-none font-light text-lg text-white placeholder:text-gray-500"
                />
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-[#C9A84C]" size={20} />
              </div>
            </div>

            <nav className="flex flex-col items-center gap-6">
              {navigationConfig.menuLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="font-serif text-3xl lg:text-[45px] text-white hover:text-[#C9A84C] transition-colors duration-300 gold-glow-hover"
                  style={{
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.5s ease ${index * 0.1}s`,
                    whiteSpace: 'nowrap',
                    fontSize: 'clamp(1.2rem, 5vw, 2.5rem)',
                    letterSpacing: '0.15em',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-6 mt-12">
              {navigationConfig.socialLinks.map((social) => {
                const IconComponent = iconMap[social.icon];
                if (!IconComponent) return null;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-gray-400 hover:text-[#C9A84C] transition-colors"
                    aria-label={social.label}
                  >
                    <IconComponent size={20} strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Cart Sidebar */}
      <div
        className={`fixed inset-0 z-[9999] transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setIsCartOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#111111] shadow-xl shadow-black/50 transition-transform duration-500 ${
            isCartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-[#C9A84C]/30">
              <h3 className="text-2xl font-light tracking-[0.2em] uppercase text-[#C9A84C]">{navigationConfig.brandName}</h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-white hover:text-[#C9A84C] transition-colors"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-[#C9A84C]/40 mb-4" strokeWidth={1} />
                  <p className="text-gray-400 text-lg">{navigationConfig.cartEmptyText}</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 px-8 py-3 bg-[#C9A84C] text-black font-light tracking-wide btn-hover"
                  >
                    {navigationConfig.continueShoppingText}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-6 border-b border-[#C9A84C]/20">
                      <div className="w-24 h-24 bg-[#0a0a0a] overflow-hidden gold-border-thin">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-white leading-snug">{item.name}</h4>
                        {item.size && <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A84C]/70 mt-1">{item.size}</p>}
                        <p className="text-lg font-semibold text-[#C9A84C] mt-1">{item.price} dh</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center border border-[#C9A84C]/30 text-white hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-white">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-[#C9A84C]/30 text-white hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="text-gray-500 hover:text-red-400 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-[#C9A84C]/30 bg-[#0a0a0a]">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm tracking-[0.3em] uppercase text-white/60">Sous-total</span>
                  <span className="text-2xl font-semibold text-[#C9A84C]">{totalPrice} dh</span>
                </div>
                <button
                  onClick={() => { setIsCartOpen(false); setIsOrderOpen(true); }}
                  className="w-full py-4 bg-[#C9A84C] text-black font-light tracking-widest btn-hover"
                >
                  {navigationConfig.cartCheckoutText}
                </button>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3 mt-3 text-gray-400 font-light tracking-wide hover:text-[#C9A84C] transition-colors"
                >
                  {navigationConfig.continueShoppingText}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isOrderOpen && (
        <OrderModal
          cartItems={cartItems}
          totalPrice={totalPrice}
          onClose={() => setIsOrderOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;
