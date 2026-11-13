import React from 'react';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CategoryGrid: React.FC = () => {
  const { categories, navigateTo } = useShop();

  return (
    <section id="shop-by-category-section" className="py-14 sm:py-20 bg-[#080d1a] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Layers className="w-4 h-4" />
              <span>Engineered Architectural Collections</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
              Shop by Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Select an industrial or residential category to browse certified parts, fittings and high-performance equipment.
            </p>
          </div>

          <button
            id="view-all-categories-btn"
            onClick={() => navigateTo('catalog')}
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors self-start md:self-auto group"
          >
            <span>Browse All {categories.length} Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              id={`category-card-${category.id}`}
              onClick={() => navigateTo('catalog', { categoryId: category.id })}
              className="group relative flex flex-col justify-between rounded-3xl overflow-hidden bg-[#0c1424] border border-slate-800 hover:border-amber-500/50 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer"
            >
              {/* Clear, High-Definition Image Container */}
              <div className="relative h-52 sm:h-56 -mx-6 -mt-6 mb-5 overflow-hidden bg-slate-900 border-b border-slate-800/80">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                {/* Subtle bottom edge blend only for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1424] via-transparent to-transparent opacity-60 pointer-events-none" />
                
                {/* Badge */}
                {category.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs rounded-full shadow-lg">
                    {category.badge}
                  </span>
                )}

                <span className="absolute top-4 right-4 px-2.5 py-1 bg-slate-950/90 text-amber-400 text-xs font-bold rounded-lg border border-slate-700 shadow-md">
                  {category.featuredCount}+ Items
                </span>
              </div>

              {/* Category Info */}
              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-xl text-white group-hover:text-amber-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {category.tagline}
                  </p>
                </div>

                {/* Subcategory Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {category.subcategories.slice(0, 5).map((sub) => (
                    <span
                      key={sub.id}
                      className="text-[11px] bg-slate-900 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-800 group-hover:border-slate-700 transition-colors"
                    >
                      {sub.name}
                    </span>
                  ))}
                  {category.subcategories.length > 5 && (
                    <span className="text-[11px] bg-amber-500/10 text-amber-400 font-semibold px-2 py-1 rounded-lg">
                      +{category.subcategories.length - 5} more
                    </span>
                  )}
                </div>

                {/* Explore Button */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 group-hover:text-amber-400 flex items-center gap-1.5 transition-colors">
                    Explore Category
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-800 group-hover:bg-amber-500 text-slate-300 group-hover:text-slate-950 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
