import React, { useState } from 'react';
import { socialLinks } from '../data/cardData';
import { CardData } from '../types';
import { downloadVCard } from '../utils/vcard';

interface SocialGridProps {
  cardData: CardData;
  onOpenMessageModal: () => void;
  onOpenShareModal: () => void;
}

export const SocialGrid: React.FC<SocialGridProps> = ({
  cardData,
  onOpenMessageModal,
  onOpenShareModal,
}) => {
  const [showCopyToast, setShowCopyToast] = useState(false);

  const handleSaveContact = () => {
    downloadVCard(cardData);
  };

  const handlePhoneClick = (e: React.MouseEvent) => {
    const phoneNumber = cardData.phone || '3315205180';
    // Copy number to clipboard for convenience (ideal for desktop users)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(phoneNumber).catch(() => {});
    } else {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = phoneNumber;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (err) {
        // ignore fallback errors
      }
    }
    setShowCopyToast(true);
    setTimeout(() => {
      setShowCopyToast(false);
    }, 3500);
  };

  return (
    <div className="w-full px-5 flex flex-col items-center">
      {/* Messaging Section */}
      <section className="w-full flex flex-col items-center mb-12 animate-fade-in-up delay-200">
        {cardData.tagline && <p className="font-bold text-sm text-white mb-2">{cardData.tagline}</p>}
        <div className="border border-[#E11D48] text-[#E11D48] px-3 py-1 rounded-[0.75rem] text-sm mb-4">
          {cardData.directMessageLabel}
        </div>
        <button
          onClick={onOpenMessageModal}
          className="w-full bg-[#1c1b1b] border border-[#4c4546] rounded-xl py-4 px-4 flex items-center gap-3 hover:border-[#E11D48] hover:scale-[1.01] active:scale-95 transition-all duration-200 group cursor-pointer shadow-sm"
        >
          <span
            className="material-symbols-outlined text-[#c6c6c7] group-hover:text-[#E11D48] group-hover:scale-110 transition-all duration-200"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            chat
          </span>
          <span className="text-base text-[#c6c6c7] group-hover:text-white transition-colors">
            Escribe tu mensaje:
          </span>
        </button>
      </section>

      {/* Social & Links Section */}
      <section className="w-full flex flex-col items-center mb-12 animate-fade-in-up delay-300">
        <div className="flex flex-col items-center gap-2 mb-6">
          <p className="font-bold text-sm text-white">Haz click</p>
          <span className="material-symbols-outlined text-[#E11D48] animate-bounce">
            keyboard_double_arrow_down
          </span>
        </div>

        {/* Social Grid */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 w-full max-w-[280px]">
          {socialLinks.map((link, idx) => {
            const renderIcon = () => {
              if (link.id === 'whatsapp') {
                return (
                  <svg className="w-5 h-5 fill-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.982 9.982 0 004.779 1.221h.005c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.038-5.176-2.925-7.062A9.925 9.925 0 0012.012 2zm5.835 14.125c-.247.692-1.228 1.267-1.986 1.433-.518.113-1.196.204-3.473-.736-2.915-1.203-4.793-4.175-4.938-4.368-.145-.193-1.182-1.572-1.182-2.999 0-1.427.747-2.129 1.012-2.418.266-.289.578-.362.771-.362.193 0 .386.002.554.01.18.008.423-.068.662.505.247.59.843 2.06.916 2.205.072.145.12.313.024.506-.096.193-.145.313-.289.482-.145.169-.305.378-.435.508-.145.145-.296.303-.127.592.169.289.75 1.238 1.609 2.003 1.106.985 2.039 1.29 2.328 1.435.289.145.458.12.627-.072.169-.193.723-.843.916-1.132.193-.289.386-.241.651-.145.265.096 1.687.795 1.976.94.289.145.482.217.554.337.072.12.072.699-.175 1.391z" />
                  </svg>
                );
              }
              if (link.id === 'instagram') {
                return (
                  <svg className="w-5 h-5 fill-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                );
              }
              if (link.id === 'facebook') {
                return (
                  <svg className="w-5 h-5 fill-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                );
              }
              if (link.id === 'linkedin') {
                return (
                  <svg className="w-5 h-5 fill-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                );
              }
              return (
                <span className="material-symbols-outlined text-xl transition-transform duration-200 group-hover:scale-110">
                  {link.iconName}
                </span>
              );
            };

            const isPhone = link.id === 'phone';

            return (
              <a
                key={link.id}
                href={link.url}
                target={isPhone ? undefined : "_blank"}
                rel={isPhone ? undefined : "noopener noreferrer"}
                onClick={isPhone ? handlePhoneClick : undefined}
                title={isPhone ? `Llamar a ${cardData.phone || '3315205180'} (Copia al portapapeles)` : link.name}
                style={{ animationDelay: `${idx * 60 + 350}ms` }}
                className="w-10 h-10 rounded-[0.75rem] bg-[#1c1b1b] border border-[#4c4546] flex items-center justify-center text-white hover:text-[#E11D48] hover:border-[#E11D48] hover:bg-[#E11D48]/15 hover:-translate-y-1 hover:shadow-md hover:shadow-[#E11D48]/20 active:scale-90 transition-all duration-200 group cursor-pointer relative animate-pop-in"
              >
                {renderIcon()}
              </a>
            );
          })}
        </div>

        {/* Copy Notification Toast */}
        {showCopyToast && (
          <div className="mb-6 px-4 py-2 bg-[#E11D48] text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-2 animate-fade-in-up">
            <span className="material-symbols-outlined text-sm">call</span>
            <span>Iniciando llamada a {cardData.phone || '3315205180'} (¡número copiado!)</span>
          </div>
        )}

        {/* Action Buttons */}
        <button
          onClick={handleSaveContact}
          className="px-8 py-3 bg-[#E11D48] rounded-[0.75rem] font-bold text-sm text-white hover:bg-[#BE123C] hover:scale-[1.02] active:scale-95 transition-all duration-200 mb-4 animate-pulse-glow border border-[#E11D48] cursor-pointer shadow-lg hover:shadow-red-900/40"
        >
          Guárdame
        </button>

        <button
          onClick={onOpenShareModal}
          className="p-2.5 rounded-[0.75rem] hover:bg-[#1c1b1b] active:scale-90 transition-all duration-200 group cursor-pointer"
          title="Compartir"
        >
          <span className="material-symbols-outlined text-[#c6c6c7] group-hover:text-white group-hover:scale-110 transition-all duration-200 text-2xl">
            share
          </span>
        </button>
      </section>
    </div>
  );
};

