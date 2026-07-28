import React, { useState } from 'react';
import { initialCardData } from './data/cardData';
import { HeroSection } from './components/HeroSection';
import { SocialGrid } from './components/SocialGrid';
import { ContactInfoSection } from './components/ContactInfoSection';
import { DirectMessageModal } from './components/DirectMessageModal';
import { ShareModal } from './components/ShareModal';
import { MapModal } from './components/MapModal';
import { BottomNav } from './components/BottomNav';
import { downloadVCard } from './utils/vcard';

export default function App() {
  const [cardData] = useState(initialCardData);

  // Modal states
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handleSaveContact = () => {
    downloadVCard(cardData);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center selection:bg-[#E11D48] selection:text-white">
      {/* Main Container constrained to mobile max width */}
      <main className="w-full max-w-[420px] flex-grow flex flex-col items-center pb-24 relative z-10">
        {/* Profile Hero Header */}
        <HeroSection data={cardData} />

        {/* Messaging & Social Links Grid */}
        <SocialGrid
          cardData={cardData}
          onOpenMessageModal={() => setIsMessageModalOpen(true)}
          onOpenShareModal={() => setIsShareModalOpen(true)}
        />

        {/* Business Details & Opening Hours */}
        <ContactInfoSection
          cardData={cardData}
          onOpenMapModal={() => setIsMapModalOpen(true)}
        />
      </main>

      {/* Fixed Bottom Navigation for Mobile */}
      <BottomNav
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onSaveContact={handleSaveContact}
        onOpenMapModal={() => setIsMapModalOpen(true)}
      />

      {/* Modals */}
      <DirectMessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        phone={cardData.phone}
        email={cardData.email}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        cardData={cardData}
      />

      <MapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        address={cardData.address}
      />
    </div>
  );
}



