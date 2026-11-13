import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Droplets, 
  Wrench, 
  HardHat, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Tag, 
  ChevronDown,
  ArrowRight,
  Flame
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CategoryId } from '../../types';

export const MegaMenu: React.FC = () => {
  const { categories, navigateTo, activePage, filters } = useShop();
  const [hoveredCategory, setHoveredCategory] = useState<CategoryId | 'offers' | null>(null);

  const getCategoryIcon = (id: CategoryId) => {
    switch (id) {
      case 'electrical':
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 'plumbing':
        return <Droplets className="w-4 h-4 text-cyan-400" />;
      case 'tools-hardware':
        return <Wrench className="w-4 h-4 text-amber-500" />;
      default:
        return <Wrench className="w-4 h-4 text-slate-300" />;
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', isLink: true, onClick: () => navigateTo('home') },
    ...categories.map((cat) => ({
      id: cat.id,
      label: cat.name.split('&')[0].trim(),
      fullCategory: cat,
      isLink: false,
    })),
    { id: 'offers', label: 'Offers & Deals', isOffer: true, isLink: false },
  ];

  return (
    <nav id="main-navigation-bar" className="relative border-t border-slate-800/80 bg-[#0c1424]/95 backdrop-blur-md hidden lg:block z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ul className="flex items-center justify-between text-sm font-medium tracking-wide">
          {navItems.map((item) => {
            const isSelected = 
              (item.id === 'home' && activePage === 'home') ||
              (item.id === 'offers' && activePage === 'offers') ||
              (filters.selectedCategory === item.id && activePage === 'catalog');

            return (
              <li
                key={item.id}
                onMouseEnter={() => setHoveredCategory(item.id as any)}
                onMouseLeave={() => setHoveredCategory(null)}
                className="relative group py-3"
              >
                <button
                  id={`nav-item-${item.id}`}
                  onClick={() => {
                    if (item.id === 'home') navigateTo('home');
                    else if (item.id === 'offers') navigateTo('offers');
                    else {
                      navigateTo('catalog', { categoryId: item.id });
                    }
                  }}
                  className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg transition-all duration-200 ${
                    isSelected
                      ? 'text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/30'
                      : item.isOffer
                      ? 'text-amber-300 font-semibold hover:text-amber-200'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.id !== 'home' && item.id !== 'offers' && (
                    getCategoryIcon(item.id as CategoryId)
                  )}
                  {item.isOffer && <Flame className="w-4 h-4 text-amber-400 animate-pulse" />}
                  <span>{item.label}</span>
                  {item.id !== 'home' && (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </button>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {hoveredCategory === item.id && item.id !== 'home' && (
                    <motion.div
                      key={`megamenu-${item.id}`}
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-0 mt-1.5 w-[700px] xl:w-[840px] bg-[#0c1424] border border-slate-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-xl z-50 overflow-hidden"
                      style={{ left: item.id === 'offers' ? 'auto' : 0, right: item.id === 'offers' ? 0 : 'auto' }}
                    >
                      {/* Decorative background glow */}
                      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

                      {/* Category Mega Menu Content */}
                      {item.fullCategory && (
                        <div className="grid grid-cols-12 gap-6 relative z-10">
                          <div className="col-span-8">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                              <div className="flex items-center gap-2">
                                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                                  {getCategoryIcon(item.fullCategory.id)}
                                </div>
                                <div>
                                  <h4 className="text-base font-bold text-white tracking-wide">
                                    {item.fullCategory.name}
                                  </h4>
                                  <p className="text-xs text-slate-400">
                                    {item.fullCategory.tagline}
                                  </p>
                                </div>
                              </div>
                              <button
                                id={`explore-all-${item.fullCategory.id}`}
                                onClick={() => {
                                  navigateTo('catalog', { categoryId: item.fullCategory.id });
                                  setHoveredCategory(null);
                                }}
                                className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 group/btn"
                              >
                                View All ({item.fullCategory.featuredCount}+)
                                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                              </button>
                            </div>

                            {/* Subcategories list */}
                            <div className="grid grid-cols-2 gap-2.5">
                              {item.fullCategory.subcategories.map((sub) => (
                                <button
                                  key={sub.id}
                                  id={`subcat-link-${sub.id}`}
                                  onClick={() => {
                                    navigateTo('catalog', { 
                                      categoryId: item.fullCategory.id, 
                                      subcategoryId: sub.id 
                                    });
                                    setHoveredCategory(null);
                                  }}
                                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/60 border border-transparent hover:border-slate-700/60 text-left transition-all group/item"
                                >
                                  <span className="text-sm text-slate-300 group-hover/item:text-white group-hover/item:translate-x-0.5 transition-all">
                                    {sub.name}
                                  </span>
                                  <span className="text-[11px] font-medium text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded-md group-hover/item:text-amber-400 group-hover/item:bg-amber-500/10 transition-colors">
                                    {sub.count}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Category Highlight Card */}
                          <div className="col-span-4 flex flex-col">
                            <div className="relative h-full rounded-xl overflow-hidden border border-slate-700/80 flex flex-col justify-end p-4 group/card">
                              <img
                                src={item.fullCategory.image}
                                alt={item.fullCategory.name}
                                className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-[#080d1a]/30 to-transparent" />
                              <div className="relative z-10 space-y-2">
                                <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-amber-500 text-slate-950 rounded-full">
                                  {item.fullCategory.badge || 'Verified'}
                                </span>
                                <h5 className="text-sm font-bold text-white">
                                  Top-Grade {item.fullCategory.name.split('&')[0]}
                                </h5>
                                <p className="text-xs text-slate-300 line-clamp-2">
                                  ISO certified heavy industrial specs backed by manufacturer warranty.
                                </p>
                                <button
                                  id={`mega-cta-${item.fullCategory.id}`}
                                  onClick={() => {
                                    navigateTo('catalog', { categoryId: item.fullCategory.id });
                                    setHoveredCategory(null);
                                  }}
                                  className="w-full mt-2 py-2 px-3 bg-white/10 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5"
                                >
                                  Explore Collection
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Offers Mega Menu */}
                      {item.id === 'offers' && (
                        <div className="p-2 space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <div className="flex items-center gap-2">
                              <Tag className="w-5 h-5 text-amber-400" />
                              <h4 className="text-base font-bold text-white">Deals & Promotional Specials</h4>
                            </div>
                            <span className="text-xs text-amber-400 font-semibold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                              Limited Time Discounts
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div 
                              onClick={() => { navigateTo('offers'); setHoveredCategory(null); }}
                              className="cursor-pointer p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/30 hover:border-amber-400 transition-all group"
                            >
                              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Flash Event</span>
                              <h5 className="text-sm font-bold text-white mt-1 group-hover:text-amber-300">Up to 40% Off Electrical</h5>
                              <p className="text-xs text-slate-400 mt-1">Copper building cables, switch sets & breakers</p>
                            </div>
                            <div 
                              onClick={() => { navigateTo('offers'); setHoveredCategory(null); }}
                              className="cursor-pointer p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/30 hover:border-cyan-400 transition-all group"
                            >
                              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Bundle Savings</span>
                              <h5 className="text-sm font-bold text-white mt-1 group-hover:text-cyan-300">Plumbing & Sanitary Mixers</h5>
                              <p className="text-xs text-slate-400 mt-1">Luxury commodes & rain shower sets</p>
                            </div>
                            <div 
                              onClick={() => { navigateTo('offers'); setHoveredCategory(null); }}
                              className="cursor-pointer p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/30 hover:border-emerald-400 transition-all group"
                            >
                              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Coupon Bonus</span>
                              <h5 className="text-sm font-bold text-white mt-1 group-hover:text-emerald-300">Use Code: APEX10</h5>
                              <p className="text-xs text-slate-400 mt-1">Extra 10% on orders above ৳2,000</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
