import { useState } from 'react';
import { X } from 'lucide-react';

const WHATSAPP_NUMBER = '212700099462';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size?: string;
}

interface OrderModalProps {
  cartItems: CartItem[];
  totalPrice: number;
  onClose: () => void;
}

const OrderModal = ({ cartItems, totalPrice, onClose }: OrderModalProps) => {
  const [form, setForm] = useState({ name: '', address: '', phone: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const itemLines = cartItems
      .map((item) => `• ${item.name}${item.size ? ` (${item.size})` : ''} x${item.quantity} — ${item.price * item.quantity} MAD`)
      .join('\n');

    const message = [
      '🛍️ *Nouvelle Commande — Alaa Parfum*',
      '',
      `👤 *Nom:* ${form.name}`,
      `📍 *Adresse:* ${form.address}`,
      `📞 *Téléphone:* ${form.phone}`,
      '',
      '*Produits:*',
      itemLines,
      '',
      `💰 *Total: ${totalPrice} MAD*`,
    ].join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* modal */}
      <div className="relative w-full max-w-md bg-[#111111] border border-[#C9A84C]/30 p-8">
        {/* close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#C9A84C]" />
            <span className="text-[11px] tracking-[0.5em] uppercase text-[#C9A84C] font-medium">Finaliser</span>
          </div>
          <h3 className="text-4xl font-semibold text-white leading-tight">Votre Commande</h3>
        </div>

        {/* order summary */}
        <div className="mb-6 space-y-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <span className="text-base font-medium text-white/80">
                {item.name}
                {item.size && <span className="text-[10px] tracking-widest text-[#C9A84C]/60 ml-2 uppercase">{item.size}</span>}
                <span className="text-white/40 text-sm ml-1">× {item.quantity}</span>
              </span>
              <span className="text-base font-semibold text-[#C9A84C]">{item.price * item.quantity} dh</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4 border-t border-[#C9A84C]/20">
            <span className="text-sm tracking-[0.35em] uppercase text-white/50">Total</span>
            <span className="text-2xl font-bold text-[#C9A84C]">{totalPrice} dh</span>
          </div>
        </div>

        <div className="w-full h-px bg-[#C9A84C]/20 mb-6" />

        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Votre nom complet"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/40 py-3 focus:outline-none focus:border-[#C9A84C] transition-colors text-base font-medium"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Adresse de livraison"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
              className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/40 py-3 focus:outline-none focus:border-[#C9A84C] transition-colors text-base font-medium"
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="Numéro de téléphone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/40 py-3 focus:outline-none focus:border-[#C9A84C] transition-colors text-base font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#C9A84C] text-black text-[11px] tracking-[0.4em] uppercase font-medium hover:bg-[#b8963e] transition-colors mt-2"
          >
            Commander via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
