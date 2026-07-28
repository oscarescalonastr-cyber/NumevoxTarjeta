import React from 'react';
import { CardData } from '../types';

interface QRCodeSectionProps {
  cardData: CardData;
  onOpenQRModal: () => void;
}

export const QRCodeSection: React.FC<QRCodeSectionProps> = ({
  cardData,
  onOpenQRModal,
}) => {
  return (
    <section className="w-full px-5 flex flex-col items-center mt-auto pb-8 animate-fade-in-up">
      {/* QR Container */}
      <div
        onClick={onOpenQRModal}
        className="w-32 h-32 bg-white border-2 border-[#4c4546] p-2 rounded-lg shadow-sm mb-2 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
        title="Ampliar código QR"
      >
        <img
          src={cardData.qrCodeUrl}
          alt="Código QR"
          className="w-full h-full object-contain"
        />
      </div>
    </section>
  );
};

