import React from 'react';
import { Sparkles, Tag, Zap, ArrowRight, Copy, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../product/ProductCard';

export const OffersPage: React.FC = () => {
  const { products, coupons, applyCoupon, showToast, navigateTo } = useShop();

  const discountedProducts = products.filter((p) => p.discountPrice || p.isFlashSale);

  const handleCopyCoupon = (code: string) => {
    applyCoupon(code);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
  };

  return (
    <div id="offers-page-container" className="min-h-screen bg-[#080d1a] py-8 sm:py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Banner */}
        <div className="mb-10 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0c1424] via-[#1a142c] to-[#0c1424] border border-amber-500/40 shadow-2xl text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>Exclusive Contractor &amp; Homeowner Discounts</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Special Deals &amp; Promo Coupons
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Take advantage of instant coupon codes and seasonal price markdowns on electrical cables, sanitary fixtures, and German power tools.
          </p>
        </div>

        {/* Coupons Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {coupons.map((coupon) => (
            <div
              key={coupon.code}
              className="p-6 rounded-3xl bg-[#0c1424] border border-amber-500/30 relative overflow-hidden space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs rounded-full font-mono">
                  {coupon.code}
                </span>
                <span className="text-amber-400 font-bold text-sm">
                  {coupon.discountType === 'percentage' || (coupon as any).discountPercentage
                    ? `${coupon.discountValue || (coupon as any).discountPercentage || 10}% OFF`
                    : `৳${coupon.discountValue} OFF`}
                </span>
              </div>

              <p className="text-xs text-slate-300">{coupon.description}</p>
              <p className="text-[11px] text-slate-500">
                Minimum Spend: ৳{(coupon.minOrderAmount ?? (coupon as any).minSpend ?? 0).toLocaleString()} BDT
              </p>

              <button
                onClick={() => handleCopyCoupon(coupon.code)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy &amp; Apply Coupon</span>
              </button>
            </div>
          ))}
        </div>

        {/* Discounted Products Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
              Currently On Sale ({discountedProducts.length} Items)
            </h3>
            <button
              onClick={() => navigateTo('catalog')}
              className="text-xs font-bold text-amber-400 hover:underline"
            >
              View Entire Catalog
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {discountedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
