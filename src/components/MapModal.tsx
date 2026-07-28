import React from 'react';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
}

export const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, address }) => {
  if (!isOpen) return null;

  const encodedAddress = encodeURIComponent(address);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in-up"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-[#1c1b1b] border border-[#4c4546] rounded-2xl p-6 shadow-2xl space-y-4 text-white relative"
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
            <h3 className="font-bold text-lg text-white">Ubicación y Sucursal</h3>
            <p className="text-xs text-gray-400">NumEvox</p>
          </div>
        </div>

        <div className="p-3 bg-black/60 rounded-xl border border-[#4c4546] space-y-2">
          <p className="text-sm text-gray-200 font-medium">{address}</p>
          <p className="text-xs text-gray-400">Horario de atención: Lun - Vie 09:00 - 18:00 hrs</p>
        </div>

        {/* Map Preview Box */}
        <div className="w-full h-44 bg-[#2a2a2a] rounded-xl overflow-hidden border border-[#4c4546] relative flex flex-col items-center justify-center p-4 text-center group">
          <div className="absolute inset-0 bg-[radial-gradient(#4c4546_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
          <span className="material-symbols-outlined text-4xl text-[#E11D48] mb-1 group-hover:scale-110 transition-transform">
            distance
          </span>
          <p className="text-xs text-white font-semibold relative z-10">{address}</p>
          <p className="text-[11px] text-gray-400 relative z-10 mt-1">Haz clic abajo para abrir en Google Maps</p>
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg block text-center"
        >
          <span className="material-symbols-outlined text-lg">directions</span>
          <span>Cómo llegar en Google Maps</span>
        </a>
      </div>
    </div>
  );
};
