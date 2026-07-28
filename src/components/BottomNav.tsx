import React from 'react';

interface BottomNavProps {
  onOpenShareModal: () => void;
  onSaveContact: () => void;
  onOpenMapModal: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  onOpenShareModal,
  onSaveContact,
  onOpenMapModal,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-5 py-2 bg-[#1c1b1b]/95 backdrop-blur-md border-t border-[#4c4546] shadow-lg rounded-t-xl md:hidden">
      <button
        onClick={onOpenShareModal}
        className="flex flex-col items-center hover:bg-[#353535] transition-colors text-[#c6c6c7] p-2 group rounded-xl cursor-pointer"
        title="Compartir"
      >
        <span className="material-symbols-outlined text-2xl group-hover:scale-90 group-hover:text-[#E11D48] transition-all">
          share
        </span>
      </button>

      <button
        onClick={onSaveContact}
        className="flex flex-col items-center bg-[#E11D48] text-white rounded-[0.75rem] p-2 transition-transform scale-90 hover:scale-95 shadow-[0_0_10px_rgba(225,29,72,0.4)] cursor-pointer"
        title="Guardar contacto"
      >
        <span
          className="material-symbols-outlined text-2xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          person_add
        </span>
      </button>

      <button
        onClick={onOpenMapModal}
        className="flex flex-col items-center hover:bg-[#353535] transition-colors text-[#c6c6c7] p-2 group rounded-xl cursor-pointer"
        title="Ubicación"
      >
        <span className="material-symbols-outlined text-2xl group-hover:scale-90 group-hover:text-[#E11D48] transition-all">
          location_on
        </span>
      </button>
    </nav>
  );
};


