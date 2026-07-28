import React, { useState } from 'react';
import { CardData, SocialLink, ProductItem } from '../types';
import { socialLinks } from '../data/cardData';
import { downloadVCard } from '../utils/vcard';

interface DesktopViewProps {
  cardData: CardData;
  onOpenMessageModal: () => void;
  onOpenShareModal: () => void;
  onOpenMapModal: () => void;
  onOpenQRModal: () => void;
}

export const DesktopView: React.FC<DesktopViewProps> = ({
  cardData,
  onOpenMessageModal,
  onOpenShareModal,
  onOpenMapModal,
  onOpenQRModal,
}) => {
  const [activeTab, setActiveTab] = useState<'channels' | 'catalog' | 'message' | 'location'>('channels');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', ...Array.from(new Set(cardData.products.map((p) => p.category)))];

  const filteredProducts =
    selectedCategory === 'Todos'
      ? cardData.products
      : cardData.products.filter((p) => p.category === selectedCategory);

  const handleOrderProduct = (product: ProductItem) => {
    const text = encodeURIComponent(
      `Hola Aura by Simplifik, me interesa pedir el producto: "${product.name}" ($${product.price} MXN).`
    );
    window.open(`https://wa.me/52${cardData.phone}?text=${text}`, '_blank');
  };

  const handleSaveContact = () => {
    downloadVCard(cardData);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Profile & Key Action Sidebar (Col 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Main Card Container */}
          <div className="bg-[#1c1b1b] border border-[#4c4546] rounded-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute -top-16 -left-16 w-32 h-32 bg-[#E11D48]/10 blur-2xl rounded-full pointer-events-none"></div>
            
            {/* Logo Image */}
            <div className="w-28 h-28 rounded-2xl border-2 border-[#4c4546] overflow-hidden bg-black mb-4 shadow-xl flex items-center justify-center p-1">
              <img
                src={cardData.logoUrl}
                alt={cardData.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* Profile Header */}
            <h2 className="text-2xl font-bold text-white tracking-tight">{cardData.title}</h2>
            <p className="text-sm font-semibold text-[#E11D48] mt-0.5">{cardData.subtitle}</p>
            <p className="text-xs text-[#cfc4c5] mt-2 max-w-xs leading-relaxed">
              {cardData.description}
            </p>

            <div className="w-12 h-[2px] bg-[#E11D48] my-4 rounded-full"></div>

            {/* Main Action Buttons */}
            <div className="w-full space-y-2.5">
              <button
                onClick={handleSaveContact}
                className="w-full py-3 bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-sm rounded-xl transition-all shadow-lg animate-pulse-glow flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                  person_add
                </span>
                <span>Guárdame en Contactos (vCard)</span>
              </button>

              <button
                onClick={onOpenShareModal}
                className="w-full py-2.5 bg-[#2a2a2a] hover:bg-[#353535] border border-[#4c4546] text-white font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">share</span>
                <span>Compartir Tarjeta Digital</span>
              </button>
            </div>

            {/* Operating Info Brief */}
            <div className="w-full mt-6 pt-5 border-t border-[#2a2a2a] text-left space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <span className="material-symbols-outlined text-[#E11D48] text-base">schedule</span>
                <span className="font-semibold text-white">{cardData.hoursStatus}</span>
                <span className="text-gray-400">• {cardData.hoursDetail}</span>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <span className="material-symbols-outlined text-gray-400 text-base">call</span>
                <a href={`tel:${cardData.phone}`} className="hover:text-[#E11D48] transition-colors">{cardData.phone}</a>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-300">
                <span className="material-symbols-outlined text-gray-400 text-base">mail</span>
                <a href={`mailto:${cardData.email}`} className="hover:text-[#E11D48] transition-colors truncate">{cardData.email}</a>
              </div>

              <div className="flex items-start gap-2 text-xs text-gray-300 pt-1">
                <span className="material-symbols-outlined text-gray-400 text-base shrink-0 mt-0.5">location_on</span>
                <button onClick={onOpenMapModal} className="text-left hover:text-[#E11D48] transition-colors underline cursor-pointer">
                  {cardData.address}
                </button>
              </div>
            </div>
          </div>

          {/* Interactive QR Code Card */}
          <div className="bg-[#1c1b1b] border border-[#4c4546] rounded-2xl p-5 shadow-xl flex items-center gap-4">
            <div
              onClick={onOpenQRModal}
              className="w-24 h-24 bg-white p-1.5 rounded-xl border border-gray-300 shrink-0 cursor-pointer hover:scale-105 transition-transform relative group shadow"
            >
              <img src={cardData.qrCodeUrl} alt="QR Code" className="w-full h-full object-contain" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-black opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-0.5 rounded-full text-sm">
                  zoom_in
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-[#E11D48] uppercase tracking-wider">Código QR de Contacto</p>
              <h4 className="font-bold text-sm text-white mt-0.5">Escanear para Celular</h4>
              <p className="text-[11px] text-gray-400 mt-1 leading-normal">
                Haz clic en el código para ampliarlo o guardarlo.
              </p>
              <div className="flex items-center gap-1.5 mt-2 text-[#c6c6c7] text-xs">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>layers</span>
                <span className="font-bold text-white">Lucard Digital</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Tabbed Content Area (Col 8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Navigation Tabs Header */}
          <div className="bg-[#1c1b1b] border border-[#4c4546] p-1.5 rounded-2xl flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('channels')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'channels'
                  ? 'bg-[#E11D48] text-white shadow-lg'
                  : 'text-gray-300 hover:bg-[#2a2a2a] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-lg">grid_view</span>
              <span>Canales y Redes</span>
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'catalog'
                  ? 'bg-[#E11D48] text-white shadow-lg'
                  : 'text-gray-300 hover:bg-[#2a2a2a] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-lg">storefront</span>
              <span>Catálogo ({cardData.products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('message')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'message'
                  ? 'bg-[#E11D48] text-white shadow-lg'
                  : 'text-gray-300 hover:bg-[#2a2a2a] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-lg">chat</span>
              <span>Mensaje Directo</span>
            </button>

            <button
              onClick={() => setActiveTab('location')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'location'
                  ? 'bg-[#E11D48] text-white shadow-lg'
                  : 'text-gray-300 hover:bg-[#2a2a2a] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-lg">location_on</span>
              <span>Ubicación</span>
            </button>
          </div>

          {/* TAB 1: Channels Grid */}
          {activeTab === 'channels' && (
            <div className="bg-[#1c1b1b] border border-[#4c4546] rounded-2xl p-6 shadow-xl space-y-6 animate-fade-in-up">
              <div>
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#E11D48]">forum</span>
                  <span>Todos los Canales de Atención</span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Haz clic en cualquier canal para conectarte al instante.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-black/60 border border-[#4c4546] hover:border-[#E11D48] hover:bg-[#E11D48]/5 rounded-xl transition-all flex items-center gap-3.5 group cursor-pointer shadow-md"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#2a2a2a] border border-[#4c4546] flex items-center justify-center shrink-0 group-hover:border-[#E11D48] group-hover:scale-105 transition-all">
                      <span className="material-symbols-outlined text-white group-hover:text-[#E11D48] text-xl">
                        {link.iconName}
                      </span>
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-sm text-white group-hover:text-[#E11D48] transition-colors truncate">
                        {link.name}
                      </h4>
                      <p className="text-[11px] text-gray-400 truncate mt-0.5">
                        {link.type.toUpperCase()}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Product Showcase & Catalog */}
          {activeTab === 'catalog' && (
            <div className="bg-[#1c1b1b] border border-[#4c4546] rounded-2xl p-6 shadow-xl space-y-6 animate-fade-in-up">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2a2a2a] pb-4">
                <div>
                  <h3 className="font-bold text-lg text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#E11D48]">storefront</span>
                    <span>Catálogo de Productos</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Aromas y Difusores listos para envío inmediato.
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-[#E11D48] text-white border border-[#E11D48]'
                          : 'bg-[#2a2a2a] text-gray-300 border border-[#4c4546] hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-black/60 border border-[#4c4546] rounded-xl p-4 flex flex-col justify-between hover:border-[#E11D48] transition-all group shadow-md"
                  >
                    <div>
                      <div className="w-full h-40 rounded-lg overflow-hidden bg-[#2a2a2a] mb-3 relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.tag && (
                          <span className="absolute top-2 right-2 text-[10px] bg-[#E11D48] text-white font-bold px-2 py-0.5 rounded shadow">
                            {product.tag}
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-base text-white group-hover:text-[#E11D48] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#2a2a2a]">
                      <span className="font-extrabold text-base text-white">
                        ${product.price.toLocaleString('es-MX')} MXN
                      </span>
                      <button
                        onClick={() => handleOrderProduct(product)}
                        className="px-3.5 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs rounded-xl flex items-center gap-1.5 transition-transform active:scale-95 shadow cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">chat</span>
                        <span>Pedir por WhatsApp</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Direct Messaging */}
          {activeTab === 'message' && (
            <div className="bg-[#1c1b1b] border border-[#4c4546] rounded-2xl p-6 shadow-xl space-y-6 animate-fade-in-up">
              <div>
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#E11D48]">chat</span>
                  <span>Enviar Mensaje Directo</span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Escribe tu consulta y el equipo de Aura te responderá al instante.
                </p>
              </div>

              <div className="space-y-4">
                <textarea
                  placeholder="Escribe tu mensaje o solicitud aquí..."
                  rows={5}
                  className="w-full bg-black/70 border border-[#4c4546] rounded-xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#E11D48] transition-colors resize-none"
                  id="desktop-direct-msg-input"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      const input = document.getElementById('desktop-direct-msg-input') as HTMLTextAreaElement;
                      const msg = input?.value || 'Hola Aura by Simplifik, me gustaría solicitar información.';
                      window.open(`https://wa.me/52${cardData.phone}?text=${encodeURIComponent(msg)}`, '_blank');
                    }}
                    className="py-3.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xl">chat</span>
                    <span>Enviar vía WhatsApp</span>
                  </button>

                  <button
                    onClick={() => {
                      const input = document.getElementById('desktop-direct-msg-input') as HTMLTextAreaElement;
                      const msg = input?.value || 'Hola Aura by Simplifik, me gustaría solicitar información.';
                      window.open(`mailto:${cardData.email}?subject=Consulta%20Aura&body=${encodeURIComponent(msg)}`, '_blank');
                    }}
                    className="py-3.5 px-4 bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xl">mail</span>
                    <span>Enviar por Correo</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Location & Branch Details */}
          {activeTab === 'location' && (
            <div className="bg-[#1c1b1b] border border-[#4c4546] rounded-2xl p-6 shadow-xl space-y-6 animate-fade-in-up">
              <div>
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#E11D48]">location_on</span>
                  <span>Ubicación y Horarios</span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Visítanos en nuestra sucursal de Interlomas o agenda una cita.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-black/60 rounded-xl border border-[#4c4546] space-y-2">
                    <p className="text-xs text-[#E11D48] font-bold uppercase tracking-wider">Dirección</p>
                    <p className="text-sm text-white font-semibold">{cardData.address}</p>
                    <p className="text-xs text-gray-400">Estado de México, C.P. 52787</p>
                  </div>

                  <div className="p-4 bg-black/60 rounded-xl border border-[#4c4546] space-y-2">
                    <p className="text-xs text-[#E11D48] font-bold uppercase tracking-wider">Horario Comercial</p>
                    <p className="text-sm text-white font-semibold">{cardData.hoursDetail}</p>
                    <p className="text-xs font-semibold text-[#25D366]">Status: {cardData.hoursStatus}</p>
                  </div>
                </div>

                <div className="bg-black/60 border border-[#4c4546] rounded-xl p-4 flex flex-col justify-between text-center relative overflow-hidden">
                  <div className="space-y-2">
                    <span className="material-symbols-outlined text-4xl text-[#E11D48]">
                      map
                    </span>
                    <h4 className="font-bold text-base text-white">Google Maps</h4>
                    <p className="text-xs text-gray-400">
                      Abre el mapa con un clic para iniciar la navegación GPS hacia nuestra ubicación.
                    </p>
                  </div>

                  <button
                    onClick={onOpenMapModal}
                    className="mt-4 w-full py-3 bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer shadow"
                  >
                    <span className="material-symbols-outlined text-base">directions</span>
                    <span>Abrir Ubicación en Google Maps</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
