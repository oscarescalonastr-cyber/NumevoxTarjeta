import React, { useState } from 'react';
import { CardData } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardData: CardData;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, cardData }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: cardData.title,
          text: `${cardData.title} - ${cardData.description}`,
          url: currentUrl,
        });
      } catch (e) {
        // user cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`Mira la tarjeta digital de ${cardData.title}: ${currentUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in-up"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs bg-[#1c1b1b] border border-[#4c4546] rounded-2xl p-6 shadow-2xl text-white space-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="flex items-center gap-2 border-b border-[#2a2a2a] pb-3">
          <span className="material-symbols-outlined text-[#E11D48] text-2xl">share</span>
          <h3 className="font-bold text-lg text-white">Compartir Tarjeta</h3>
        </div>

        <p className="text-xs text-gray-300">
          Envía la tarjeta digital de {cardData.title} a tus contactos o redes sociales.
        </p>

        {/* Copy URL Input */}
        <div className="flex items-center gap-2 bg-black/70 border border-[#4c4546] rounded-xl p-2">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="w-full bg-transparent text-xs text-gray-300 focus:outline-none px-1 overflow-hidden text-ellipsis whitespace-nowrap"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-[#2a2a2a] hover:bg-[#353535] text-xs text-white font-semibold rounded-lg shrink-0 transition-colors"
          >
            {copied ? '¡Copiado!' : 'Copiar'}
          </button>
        </div>

        {/* Share Action Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={shareWhatsApp}
            className="py-3 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow"
          >
            <span className="material-symbols-outlined text-lg">chat</span>
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="py-3 px-3 bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow"
          >
            <span className="material-symbols-outlined text-lg">ios_share</span>
            <span>Compartir</span>
          </button>
        </div>
      </div>
    </div>
  );
};
