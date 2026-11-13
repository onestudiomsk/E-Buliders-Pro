import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Clock, 
  ArrowRight, 
  Flame, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../product/ProductCard';

export const FlashSaleSection: React.FC = () => {
  const { products, navigateTo } = useShop();

  // Realtime countdown timer logic
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = products.filter((p) => p.isFlashSale || p.discountPrice);

  return (
    <section id="flash-sale-section" className="py-14 sm:py-20 bg-gradient-to-b from-[#080d1a] via-[#0b1324] to-[#080d1a] border-y border-slate-800 relative z-10 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Flash Sale Header with Live Countdown */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 p-6 sm:p-8 rounded-3xl bg-[#0e172a]/90 border border-amber-500/30 shadow-2xl backdrop-blur-md">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
                <Flame className="w-3.5 h-3.5 fill-rose-400" />
                LIMITED TIME FLASH SALE
              </span>
              <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
                Limited Warehouse Allocations
              </span>
            </div>

            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
              Mega Deals on Power Tools &amp; Electricals
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Save up to 40% on top premium industrial supplies. Stock reserved on first-come basis.
            </p>
          </div>

          {/* Countdown Clock Box */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 hidden sm:block">
              Deals End In:
            </span>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center bg-[#070c18] border border-amber-500/40 rounded-2xl px-3.5 py-2 min-w-[56px] shadow-inner">
                <span className="font-heading font-black text-xl text-amber-400">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase">Hours</span>
              </div>
              <span className="text-amber-400 font-bold text-lg">:</span>
              <div className="flex flex-col items-center bg-[#070c18] border border-amber-500/40 rounded-2xl px-3.5 py-2 min-w-[56px] shadow-inner">
                <span className="font-heading font-black text-xl text-amber-400">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase">Mins</span>
              </div>
              <span className="text-amber-400 font-bold text-lg">:</span>
              <div className="flex flex-col items-center bg-[#070c18] border border-amber-500/40 rounded-2xl px-3.5 py-2 min-w-[56px] shadow-inner">
                <span className="font-heading font-black text-xl text-amber-400">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase">Secs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashProducts.slice(0, 4).map((product) => {
            const soldCount = Math.floor(product.stockQuantity * 1.8);
            const totalStock = product.stockQuantity + soldCount;
            const percentageSold = Math.round((soldCount / totalStock) * 100);

            return (
              <div key={product.id} className="flex flex-col">
                <ProductCard product={product} />

                {/* Live Stock Progress Bar */}
                <div className="mt-2 p-3 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Available Stock:</span>
                    <span className="font-bold text-amber-400">
                      {product.stockQuantity} units left
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full"
                      style={{ width: `${percentageSold}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 text-right">
                    {percentageSold}% already claimed
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Deals button */}
        <div className="mt-10 text-center">
          <button
            id="view-all-flash-deals-btn"
            onClick={() => navigateTo('offers')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-850 hover:bg-slate-800 text-amber-400 border border-amber-500/30 hover:border-amber-400 font-heading font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg group"
          >
            <span>View All Flash Discounts &amp; Coupons</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
