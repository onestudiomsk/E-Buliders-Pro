import React from 'react';
import { 
  Star, 
  Heart, 
  Eye, 
  ShoppingBag, 
  Check, 
  Sparkles,
  Zap
} from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct, 
    navigateTo 
  } = useShop();

  const price = product.discountPrice ?? product.regularPrice;
  const hasDiscount = Boolean(product.discountPrice && product.discountPrice < product.regularPrice);
  const discountPercent = hasDiscount 
    ? Math.round(((product.regularPrice - product.discountPrice!) / product.regularPrice) * 100)
    : 0;

  const isLiked = isInWishlist(product.id);

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col justify-between bg-[#0b1220] border border-slate-800/90 hover:border-amber-500/50 rounded-2xl p-3.5 sm:p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1 overflow-hidden"
    >
      {/* Top Badges & Wishlist */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-900 mb-3 border border-slate-800/60">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {hasDiscount && (
            <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[10px] sm:text-xs rounded-md shadow-md">
              -{discountPercent}% OFF
            </span>
          )}
          {product.isFlashSale && (
            <span className="px-2 py-0.5 bg-rose-600/90 text-white font-bold text-[10px] rounded-md shadow-md flex items-center gap-1 backdrop-blur-sm">
              <Zap className="w-3 h-3 fill-white" /> FLASH
            </span>
          )}
          {product.isNewArrival && !hasDiscount && (
            <span className="px-2 py-0.5 bg-cyan-600/90 text-white font-bold text-[10px] rounded-md shadow-md backdrop-blur-sm">
              NEW
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isLiked
              ? 'bg-rose-500/20 border border-rose-500/40 text-rose-400'
              : 'bg-slate-900/70 border border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          title="Save to Wishlist"
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-400' : ''}`} />
        </button>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-4">
          <button
            id={`quick-view-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="px-3.5 py-2 bg-white/90 hover:bg-white text-slate-950 text-xs font-bold rounded-xl shadow-xl transition-all flex items-center gap-1.5 hover:scale-105"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Stock & SKU Spec */}
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="font-semibold text-slate-400 font-mono text-[10px]">
              SKU: {product.sku}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {product.weightOrSize || product.originCountry}
            </span>
          </div>

          {/* Product Title */}
          <h4
            id={`product-title-${product.id}`}
            onClick={() => navigateTo('product-detail', { productId: product.id })}
            className="text-sm font-semibold text-slate-100 hover:text-amber-300 line-clamp-2 transition-colors cursor-pointer leading-snug"
            title={product.name}
          >
            {product.name}
          </h4>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="ml-1 font-bold text-white text-xs">{product.rating}</span>
            </div>
            <span className="text-[11px] text-slate-500">({product.reviewCount})</span>
            <span className="text-slate-700">•</span>
            <span className="text-[10px] text-emerald-400 font-medium">In Stock</span>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="flex items-baseline justify-between mb-2.5">
            <div>
              <span className="text-base sm:text-lg font-black font-heading text-amber-400">
                ৳{price.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-xs text-slate-500 line-through ml-2 font-normal">
                  ৳{product.regularPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 uppercase">BDT</span>
          </div>

          <button
            id={`add-to-cart-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1, true);
            }}
            className="w-full py-2.5 px-3 bg-slate-800 hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-600 text-slate-200 hover:text-slate-950 border border-slate-700 hover:border-transparent text-xs font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
