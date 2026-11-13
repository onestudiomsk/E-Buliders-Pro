import React, { useState } from 'react';
import { Star, ArrowRight, Zap, Award, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../product/ProductCard';

export const FeaturedProducts: React.FC = () => {
  const { products, navigateTo } = useShop();
  const [activeTab, setActiveTab] = useState<'featured' | 'bestsellers' | 'new' | 'all'>('featured');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'featured') return p.isFeatured;
    if (activeTab === 'bestsellers') return p.isBestSeller || p.rating >= 4.9;
    if (activeTab === 'new') return p.isNewArrival || p.id.includes('04') || p.id.includes('02');
    return true;
  });

  return (
    <section id="featured-products-section" className="py-14 sm:py-20 bg-[#080d1a] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 pb-4 border-b border-slate-800 gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Engineered Quality &amp; Precision</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
              Featured Products
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Curated selection of top-selling switches, CPVC pipes, heavy power tools, and high-spec bathroom systems.
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 self-start lg:self-auto">
            <button
              id="tab-featured"
              onClick={() => setActiveTab('featured')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'featured'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Featured
            </button>
            <button
              id="tab-bestsellers"
              onClick={() => setActiveTab('bestsellers')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'bestsellers'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Best Sellers
            </button>
            <button
              id="tab-new"
              onClick={() => setActiveTab('new')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'new'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              New Arrivals
            </button>
            <button
              id="tab-all"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Items
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Catalog CTA */}
        <div className="mt-12 text-center">
          <button
            id="browse-full-catalog-btn"
            onClick={() => navigateTo('catalog')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider rounded-xl shadow-xl shadow-amber-500/20 hover:scale-105 transition-all group"
          >
            <span>Explore Full Catalog ({products.length}+ Verified Items)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
