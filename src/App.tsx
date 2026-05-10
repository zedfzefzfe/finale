import { useState, useCallback } from 'react';
import { siteConfig } from './config';
import type { Product, Pack } from './config';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import SubHero from './sections/SubHero';
import VideoSection from './sections/VideoSection';
import Products from './sections/Products';
import Packs from './sections/Packs';
import BrandStory from './sections/BrandStory';
import ShopCollections from './sections/ShopCollections';
import CollectionCarousel from './sections/CollectionCarousel';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
}

const sizeMultipliers: Record<string, number> = {
  '30ml': 1,
  '50ml': 1.5,
  '100ml': 2.5,
};

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = useCallback((product: Product, size: string = '30ml') => {
    const sizePrice = Math.round(product.price * sizeMultipliers[size]);
    
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id && item.size === size);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: sizePrice,
          quantity: 1,
          image: product.image,
          size: size,
        },
      ];
    });
  }, []);

  const handleRemoveFromCart = useCallback((id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const handleUpdateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]" lang={siteConfig.language || undefined}>
      <Navigation
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
      <main>
        <Hero />
       <SubHero />

        <ShopCollections />
        <CollectionCarousel />
        <Products onAddToCart={handleAddToCart} />
        <VideoSection />
        <Packs onAddToCart={(pack: Pack) => handleAddToCart(pack as unknown as Product, '30ml')} />
         <BrandStory />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
