import React from 'react';
import { ArrowRight, Zap, Droplets, Wrench } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const PromoBanners: React.FC = () => {
  const { navigateTo } = useShop();

  const banners = [
    {
      id: 'promo-electrical',
      title: 'Electrical - Up to 40% Off',
      subtitle: 'Luxury modular switches, pure copper building cables & smart DB circuit breakers.',
      badge: 'POWER MEGA DEALS',
      badgeColor: 'bg-amber-500 text-slate-950',
      image: 'https://raw.githubusercontent.com/mskhereiam/E-Commerce-Category-Images/refs/heads/main/Electrical.jpg',
      icon: Zap,
      accentBorder: 'hover:border-amber-400',
      onClick: () => navigateTo('catalog', { categoryId: 'electrical' }),
    },
    {
      id: 'promo-plumbing',
      title: 'Plumbing Solutions',
      subtitle: 'Premium vitreous porcelain fixtures, brass mixer sets, thermostatic rain showers & CPVC lines.',
      badge: 'SANITARY EXCELLENCE',
      badgeColor: 'bg-cyan-500 text-slate-950',
      image: 'https://raw.githubusercontent.com/mskhereiam/E-Commerce-Category-Images/refs/heads/main/Plumbing%20New.jpg',
      icon: Droplets,
      accentBorder: 'hover:border-cyan-400',
      onClick: () => navigateTo('catalog', { categoryId: 'plumbing' }),
    },
    {
      id: 'promo-tools',
      title: 'Others (Tools & Hardware)',
      subtitle: 'Heavy-duty brushless combi drill kits, chrome vanadium mechanics sets, safety gear & fasteners.',
      badge: 'INDUSTRIAL GRADE GEAR',
      badgeColor: 'bg-amber-400 text-slate-950',
      image: 'https://raw.githubusercontent.com/mskhereiam/E-Commerce-Category-Images/refs/heads/main/others.jpg',
      icon: Wrench,
      accentBorder: 'hover:border-amber-400',
      onClick: () => navigateTo('catalog', { categoryId: 'tools-hardware' }),
    },
  ];

  return (
    <section id="promotional-banners-section" className="py-14 sm:py-20 bg-[#080d1a] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {banners.map((banner) => {
            const Icon = banner.icon;
            return (
              <div
                key={banner.id}
                id={banner.id}
                onClick={banner.onClick}
                className={`group relative h-72 rounded-3xl overflow-hidden border border-slate-800 ${banner.accentBorder} p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1`}
              >
                {/* Clear, Vivid Image with Gentle Bottom Gradient */}
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-[#080d1a]/40 to-transparent" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${banner.badgeColor}`}>
                    {banner.badge}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-white flex items-center justify-center">
                    <Icon className="w-4 h-4 text-amber-400" />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 space-y-2">
                  <h3 className="font-heading font-black text-lg sm:text-xl text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {banner.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {banner.subtitle}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs font-bold text-amber-400 group-hover:text-amber-300">
                    <span>Explore Products</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
