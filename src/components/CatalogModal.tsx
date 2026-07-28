import React, { useState } from 'react';
import { ProductItem } from '../types';

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  phone: string;
}

export const CatalogModal: React.FC<CatalogModalProps> = ({
  isOpen,
  onClose,
  products,
  phone,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  if (!isOpen) return null;

  const categories = ['Todos', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts =
    selectedCategory === 'Todos'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleOrder = (product: ProductItem) => {
    const text = encodeURIComponent(
      `Hola Aura by Simplifik, me interesa pedir el producto: "${product.name}" ($${product.price} MXN).`
    );
    window.open(`https://wa.me/52${phone}?text=${text}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 animate-fade-in-up"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#1c1b1b] border border-[#4c4546] rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl space-y-4 text-white max-h-[85vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2a2a2a] pb-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#E11D48] text-2xl">grid_view</span>
            <div>
              <h3 className="font-bold text-lg text-white">Catálogo Aura</h3>
              <p className="text-xs text-gray-400">Aromas y Difusores Destacados</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#E11D48] text-white border border-[#E11D48]'
                  : 'bg-[#2a2a2a] text-gray-300 border border-[#4c4546] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product List Grid */}
        <div className="overflow-y-auto pr-1 space-y-3 flex-grow">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-black/60 border border-[#4c4546] rounded-xl p-3 flex gap-3 hover:border-[#E11D48] transition-colors group"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 rounded-lg object-cover bg-[#2a2a2a] shrink-0"
              />
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-bold text-sm text-white group-hover:text-[#E11D48] transition-colors">
                      {product.name}
                    </h4>
                    {product.tag && (
                      <span className="text-[10px] bg-[#E11D48]/20 text-[#E11D48] font-bold px-1.5 py-0.5 rounded border border-[#E11D48]/40 shrink-0">
                        {product.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-0.5">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#2a2a2a]/60">
                  <span className="font-bold text-sm text-white">
                    ${product.price.toLocaleString('es-MX')} MXN
                  </span>
                  <button
                    onClick={() => handleOrder(product)}
                    className="px-3 py-1 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs rounded-lg flex items-center gap-1 transition-transform active:scale-95"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span>
                    <span>Pedir</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
