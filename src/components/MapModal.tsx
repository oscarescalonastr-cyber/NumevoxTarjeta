import React, { useState } from 'react';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
}

export const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, address }) => {
  const [showCopied, setShowCopied] = useState(false);

  if (!isOpen) return null;

  const mapsUrl = "https://maps.app.goo.gl/XbJdni3iXhi7hBAx9";

  const handleCopyAddress = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(address).catch(() => {});
    } else {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = address;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (err) {
        // ignore fallback errors
      }
    }
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in-up"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-[#1c1b1b] border border-[#4c4546] rounded-2xl p-6 shadow-2xl space-y-5 text-white relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="flex items-center gap-2 border-b border-[#2a2a2a] pb-3">
          <span className="material-symbols-outlined text-[#E11D48] text-2xl">location_on</span>
          <div>
            <h3 className="font-bold text-lg text-white">Ubicación</h3>
            <p className="text-xs text-gray-400">NumEvox</p>
          </div>
        </div>

        {/* Copy confirmation toast */}
        {showCopied && (
          <div className="px-3 py-2 bg-[#25D366] text-black font-semibold text-xs rounded-xl flex items-center justify-center gap-2 animate-fade-in-up">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>¡Dirección copiada al portapapeles!</span>
          </div>
        )}

        {/* Action Buttons: 1) Cómo llegar, 2) Dirección completa */}
        <div className="space-y-3 pt-1">
          {/* Button 1: Cómo llegar */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg text-center"
          >
            <span className="material-symbols-outlined text-xl">directions</span>
            <span>Cómo llegar</span>
          </a>

          {/* Button 2: Dirección completa */}
          <button
            onClick={handleCopyAddress}
            className="w-full py-3.5 bg-[#2a2a2a] hover:bg-[#333333] border border-[#4c4546] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md text-center group"
          >
            <span className="material-symbols-outlined text-xl text-[#E11D48] group-hover:scale-110 transition-transform">
              location_on
            </span>
            <span>Dirección completa</span>
          </button>
        </div>

        {/* Address text box */}
        <div className="p-3 bg-black/40 rounded-xl border border-[#2a2a2a]">
          <p className="text-xs text-gray-300 font-medium text-center leading-relaxed">{address}</p>
        </div>
      </div>
    </div>
  );
};

