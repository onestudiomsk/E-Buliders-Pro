import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  ShoppingBag, 
  Heart, 
  Plus, 
  Minus, 
  Check, 
  Truck, 
  ExternalLink,
  Zap
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    navigateTo 
  } = useShop();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const price = quickViewProduct.discountPrice ?? quickViewProduct.regularPrice;
  const hasDiscount = Boolean(quickViewProduct.discountPrice && quickViewProduct.discountPrice < quickViewProduct.regularPrice);
  const discountPercent = hasDiscount 
    ? Math.round(((quickViewProduct.regularPrice - quickViewProduct.discountPrice!) / quickViewProduct.regularPrice) * 100)
    : 0;

  const isLiked = isInWishlist(quickViewProduct.id);

  return (
    <AnimatePresence>
      <div id="quick-view-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl bg-[#0c1424] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Close button */}
          <button
            id="close-quick-view-btn"
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-800 transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
            {/* Left: Product Images Gallery */}
            <div className="md:col-span-6 flex flex-col gap-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/80 group">
                <img
                  src={quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {hasDiscount && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs rounded-full shadow-lg">
                    SAVE {discountPercent}%
                  </span>
                )}

                <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-slate-300 text-[11px] font-semibold rounded-lg border border-slate-700">
                  {quickViewProduct.originCountry}
                </span>
              </div>

              {/* Thumbnails */}
              {quickViewProduct.images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {quickViewProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/20'
                          : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Purchase Form */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                {/* Category & Stock */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                    {quickViewProduct.categoryName}
                  </span>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 font-semibold">
                      In Stock ({quickViewProduct.stockQuantity} units)
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl text-white leading-snug">
                  {quickViewProduct.name}
                </h3>

                {/* Rating & SKU */}
                <div className="flex items-center gap-4 text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-bold text-white text-sm">{quickViewProduct.rating}</span>
                    <span className="text-slate-400">({quickViewProduct.reviewCount} reviews)</span>
                  </div>
                  <span className="text-slate-700">|</span>
                  <span>SKU: <strong className="text-slate-300 font-mono">{quickViewProduct.sku}</strong></span>
                </div>

                {/* Pricing */}
                <div className="flex items-baseline gap-3">
                  <span className="font-heading font-black text-2xl sm:text-3xl text-amber-400">
                    ৳{price.toLocaleString()}
                  </span>
                  {hasDiscount && (
                    <span className="text-base text-slate-400 line-through">
                      ৳{quickViewProduct.regularPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-xs text-slate-400 font-normal">
                    (Inclusive of all taxes)
                  </span>
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                  {quickViewProduct.shortDescription || quickViewProduct.description}
                </p>

                {/* Key Features Bullet points */}
                <div className="space-y-1.5 py-2">
                  {quickViewProduct.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Trust guarantee badge */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{quickViewProduct.warranty}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>24-48h Delivery BD</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons & Quantity */}
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center bg-[#080d1a] border border-slate-700 rounded-xl p-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors"
                      aria-label="Decrease"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-bold text-white px-3 min-w-[32px] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors"
                      aria-label="Increase"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    id="quick-view-add-to-cart-btn"
                    onClick={() => {
                      addToCart(quickViewProduct, quantity, true);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart (৳{(price * quantity).toLocaleString()})</span>
                  </button>

                  {/* Wishlist toggle */}
                  <button
                    id="quick-view-wishlist-toggle"
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className={`p-3 rounded-xl border transition-all ${
                      isLiked
                        ? 'border-rose-500 bg-rose-500/10 text-rose-400'
                        : 'border-slate-700 bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-400' : ''}`} />
                  </button>
                </div>

                {/* View Full Product Page Link */}
                <button
                  id="view-full-product-page-btn"
                  onClick={() => {
                    setQuickViewProduct(null);
                    navigateTo('product-detail', { productId: quickViewProduct.id });
                  }}
                  className="w-full text-center py-2 text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center justify-center gap-1.5"
                >
                  <span>View Full Technical Specifications &amp; Customer Reviews</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
