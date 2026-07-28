import React, { useState } from 'react';

interface DirectMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  phone: string;
  email: string;
}

export const DirectMessageModal: React.FC<DirectMessageModalProps> = ({
  isOpen,
  onClose,
  phone,
  email,
}) => {
  const [message, setMessage] = useState('');
  const [copiedToast, setCopiedToast] = useState(false);

  if (!isOpen) return null;

  const quickTemplates = [
    '¡Hola, equipo de NumEvox! Visité su página web y busco asesoría.',
    'Quisiera cotizar asesoría en finanzas y cumplimiento fiscal.',
    'Me gustaría conocer más sobre sus servicios para Pymes.',
    '¿Podrían agendar una llamada con un especialista?'
  ];

  const handleSendWhatsApp = () => {
    const text = message.trim() || '¡Hola, equipo de NumEvox! Visité su página web y busco asesoría.';
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/52${phone}?text=${encoded}`, '_blank');
    onClose();
  };

  const handleSendEmail = () => {
    const text = message.trim() || '¡Hola, equipo de NumEvox! Visité su página web y busco asesoría.';
    const encodedBody = encodeURIComponent(text);
    const encodedSubject = encodeURIComponent('Consulta sobre NumEvox Finanzas y Talento');
    window.open(`mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in-up">
      <div
        className="w-full max-w-md bg-[#1c1b1b] border border-[#4c4546] rounded-2xl p-6 shadow-2xl relative text-white space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2a2a2a] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#E11D48]">chat</span>
            <h3 className="font-bold text-lg text-white">Mensaje Directo</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <p className="text-xs text-[#cfc4c5]">
          Escribe tu consulta y conéctate directamente con nuestro equipo por WhatsApp o correo:
        </p>

        {/* Textarea */}
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            rows={4}
            className="w-full bg-black/70 border border-[#4c4546] rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#E11D48] transition-colors resize-none"
          />
        </div>

        {/* Quick Templates */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
            Mensajes rápidos:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickTemplates.map((tmpl, idx) => (
              <button
                key={idx}
                onClick={() => setMessage(tmpl)}
                className="text-xs bg-[#2a2a2a] hover:bg-[#353535] text-gray-300 hover:text-white px-2.5 py-1 rounded-lg border border-[#4c4546]/50 transition-colors text-left"
              >
                {tmpl.slice(0, 32)}...
              </button>
            ))}
          </div>
        </div>

        {/* Send Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleSendWhatsApp}
            className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
          >
            <svg className="w-5 h-5 fill-current text-black" viewBox="0 0 24 24">
              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.982 9.982 0 004.779 1.221h.005c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.038-5.176-2.925-7.062A9.925 9.925 0 0012.012 2zm5.835 14.125c-.247.692-1.228 1.267-1.986 1.433-.518.113-1.196.204-3.473-.736-2.915-1.203-4.793-4.175-4.938-4.368-.145-.193-1.182-1.572-1.182-2.999 0-1.427.747-2.129 1.012-2.418.266-.289.578-.362.771-.362.193 0 .386.002.554.01.18.008.423-.068.662.505.247.59.843 2.06.916 2.205.072.145.12.313.024.506-.096.193-.145.313-.289.482-.145.169-.305.378-.435.508-.145.145-.296.303-.127.592.169.289.75 1.238 1.609 2.003 1.106.985 2.039 1.29 2.328 1.435.289.145.458.12.627-.072.169-.193.723-.843.916-1.132.193-.289.386-.241.651-.145.265.096 1.687.795 1.976.94.289.145.482.217.554.337.072.12.072.699-.175 1.391z" />
            </svg>
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleSendEmail}
            className="w-full py-3 px-4 bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
          >
            <span className="material-symbols-outlined text-xl">mail</span>
            <span>Correo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
