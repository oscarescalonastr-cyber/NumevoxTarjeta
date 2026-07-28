import React from 'react';
import { CardData } from '../types';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardData: CardData;
}

export const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose, cardData }) => {
  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('¡Enlace de tarjeta copiado al portapapeles!');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in-up"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs bg-[#1c1b1b] border border-[#4c4546] rounded-2xl p-6 shadow-2xl text-center space-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="space-y-1">
          <p className="text-xs text-[#E11D48] font-bold uppercase tracking-wider">
            Escanear Tarjeta
          </p>
          <h3 className="font-bold text-xl text-white">{cardData.title}</h3>
          <p className="text-xs text-gray-400">{cardData.contactCardHandle}</p>
        </div>

        {/* Big Crisp QR Display */}
        <div className="bg-white p-4 rounded-xl border border-gray-300 shadow-inner mx-auto w-48 h-48 flex items-center justify-center">
          <img
            src={cardData.qrCodeUrl}
            alt="Código QR de contacto"
            className="w-full h-full object-contain"
          />
        </div>

        <p className="text-xs text-gray-300">
          Apunta con la cámara de tu teléfono para abrir esta tarjeta digital.
        </p>

        <button
          onClick={handleCopyLink}
          className="w-full py-2.5 bg-[#2a2a2a] hover:bg-[#353535] border border-[#4c4546] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">content_copy</span>
          <span>Copiar enlace directo</span>
        </button>
      </div>
    </div>
  );
};
