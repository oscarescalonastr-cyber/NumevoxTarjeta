import React from 'react';
import { CardData } from '../types';

interface ContactInfoSectionProps {
  cardData: CardData;
  onOpenMapModal: () => void;
}

export const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({
  cardData,
  onOpenMapModal,
}) => {
  return (
    <section className="w-full px-5 flex flex-col items-center text-center space-y-1 mb-12 animate-fade-in-up">
      <p className="font-semibold text-sm text-[#E11D48] mb-2">{cardData.hoursStatus}</p>
      <p className="text-sm text-[#c6c6c7]">{cardData.hoursDetail}</p>
      <a href={`tel:${cardData.phone}`} className="text-sm text-[#c6c6c7] hover:text-[#E11D48]">
        {cardData.phone}
      </a>
      <a href={`mailto:${cardData.email}`} className="text-sm text-[#c6c6c7] hover:text-[#E11D48]">
        {cardData.email}
      </a>
      <button
        onClick={onOpenMapModal}
        className="text-sm text-[#c6c6c7] hover:text-[#E11D48] cursor-pointer text-center"
      >
        {cardData.address}
      </button>
      <a
        href={cardData.website}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-[#E11D48] hover:underline pt-1"
      >
        {cardData.websiteDisplay}
      </a>
    </section>
  );
};

