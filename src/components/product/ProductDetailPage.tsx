import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  Plus, 
  Minus, 
  Share2, 
  ArrowLeft, 
  Layers, 
  Zap, 
  Sparkles,
  MessageSquare,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from './ProductCard';
import { ProductReview } from '../../types';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProductId, 
    products, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    navigateTo,
    showToast 
  } = useShop();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'delivery' | 'reviews'>('desc');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  // New review form states
  const [newRating, setNewRating] = useState(5);
  const [newReviewerName, setNewReviewerName] = useState('');
  const [newReviewerLocation, setNewReviewerLocation] = useState('Dhaka');
  const [newReviewText, setNewReviewText] = useState('');
  const [customReviews, setCustomReviews] = useState<ProductReview[]>(product?.reviews || []);

  React.useEffect(() => {
    if (product?.reviews) {
      setCustomReviews(product.reviews);
    }
    setSelectedImageIndex(0);
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#080d1a] py-16 text-center text-slate-300">
        <p>No product selected.</p>
        <button onClick={() => navigateTo('catalog')} className="mt-4 px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs">
          Browse Catalog
        </button>
      </div>
    );
  }

  const price = product.discountPrice ?? product.regularPrice;
  const hasDiscount = Boolean(product.discountPrice && product.discountPrice < product.regularPrice);
  const discountPercent = hasDiscount 
    ? Math.round(((product.regularPrice - product.discountPrice!) / product.regularPrice) * 100)
    : 0;

  const isLiked = isInWishlist(product.id);

  // Frequently bought together bundle
  const frequentlyBoughtProducts = product.frequentlyBoughtWith 
    ? products.filter((p) => product.frequentlyBoughtWith?.includes(p.id))
    : products.filter((p) => p.id !== product.id && p.categoryId === product.categoryId).slice(0, 2);

  const bundleItems = [product, ...frequentlyBoughtProducts].filter(Boolean);
  const bundleTotalPrice = bundleItems.reduce((acc, item) => acc + (item ? (item.discountPrice ?? item.regularPrice ?? 0) : 0), 0);
  const bundleOriginalPrice = bundleItems.reduce((acc, item) => acc + (item ? (item.regularPrice ?? 0) : 0), 0);

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 4);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddBundle = () => {
    bundleItems.forEach((item) => {
      addToCart(item, 1, false);
    });
    showToast('Bundle Added to Cart', `${bundleItems.length} items added with bundle discount!`, 'success');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewerName.trim() || !newReviewText.trim()) return;

    const review: ProductReview = {
      id: 'rev-' + Date.now(),
      userName: newReviewerName,
      userLocation: newReviewerLocation,
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      comment: newReviewText,
      verifiedPurchase: true,
    };

    setCustomReviews([review, ...customReviews]);
    setNewReviewerName('');
    setNewReviewText('');
    showToast('Review Submitted', 'Thank you for your feedback!', 'success');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Product link copied to clipboard.', 'info');
    }
  };

  return (
    <div id="product-detail-page" className="min-h-screen bg-[#080d1a] py-8 sm:py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 overflow-x-auto whitespace-nowrap pb-2">
          <button 
            onClick={() => navigateTo('home')}
            className="hover:text-amber-400 transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <button 
            onClick={() => navigateTo('catalog', { categoryId: product.categoryId })}
            className="hover:text-amber-400 transition-colors capitalize"
          >
            {product.categoryId.replace('-', ' ')}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <span className="text-amber-400 font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Top Split Layout: Gallery & Buy Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-16 border-b border-slate-800">
          
          {/* Left Column: Image Gallery & Zoom Preview (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Image with Zoom on hover */}
            <div
              className="relative aspect-square rounded-3xl overflow-hidden bg-[#0c1424] border border-slate-800 p-2 cursor-crosshair group shadow-2xl"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl"
              />

              {/* Magnified Loupe View Overlay */}
              {isZoomed && (
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none hidden md:block"
                  style={{
                    backgroundImage: `url(${product.images[selectedImageIndex] || product.images[0]})`,
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                    backgroundSize: '220%',
                  }}
                />
              )}

              {/* Floating badges */}
              <div className="absolute top-5 left-5 flex flex-col gap-2 z-10">
                {hasDiscount && (
                  <span className="px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs rounded-full shadow-lg">
                    SAVE {discountPercent}%
                  </span>
                )}
                <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md text-slate-200 text-xs font-semibold rounded-full border border-slate-700">
                  {product.originCountry}
                </span>
              </div>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-amber-400 scale-105 shadow-lg shadow-amber-500/20'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust highlights under gallery */}
            <div className="grid grid-cols-3 gap-3 pt-4 text-center">
              <div className="p-3 bg-[#0c1424] border border-slate-800 rounded-2xl">
                <ShieldCheck className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-slate-200 block">{product.warranty}</span>
                <span className="text-[10px] text-slate-500">Authorized Warranty</span>
              </div>
              <div className="p-3 bg-[#0c1424] border border-slate-800 rounded-2xl">
                <Truck className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-slate-200 block">24-48h Dispatch</span>
                <span className="text-[10px] text-slate-500">64 Districts in BD</span>
              </div>
              <div className="p-3 bg-[#0c1424] border border-slate-800 rounded-2xl">
                <RotateCcw className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-slate-200 block">7-Day Easy Return</span>
                <span className="text-[10px] text-slate-500">100% Refund Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Pricing, Actions (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Category & SKU */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  {product.categoryName}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  SKU: <strong className="text-slate-300">{product.sku}</strong>
                </span>
              </div>

              {/* Share & Wishlist */}
              <div className="flex items-center gap-2">
                <button
                  id="share-product-btn"
                  onClick={handleShare}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Share product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  id="pdp-wishlist-toggle"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2 rounded-lg border transition-all ${
                    isLiked
                      ? 'border-rose-500 bg-rose-500/10 text-rose-400'
                      : 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-400' : ''}`} />
                </button>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white leading-tight">
              {product.name}
            </h1>

            {/* Ratings & Stock */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1 text-amber-400">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-white ml-1 text-sm">{product.rating}</span>
                <span className="text-slate-400">({customReviews.length} Verified Reviews)</span>
              </div>

              <span className="text-slate-700">|</span>

              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>In Stock ({product.stockQuantity} Units Ready in Warehouse)</span>
              </div>
            </div>

            {/* Price Display */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0c1424] border border-slate-800 space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="font-heading font-black text-3xl sm:text-4xl text-amber-400">
                  ৳{price.toLocaleString()}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-slate-500 line-through">
                    ৳{product.regularPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-slate-400">
                  (VAT / AIT included)
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                ⚡ Orders above ৳5,000 qualify for <strong>FREE Delivery</strong> anywhere in Bangladesh.
              </p>
            </div>

            {/* Short Description */}
            <p className="text-sm text-slate-300 leading-relaxed">
              {product.description}
            </p>

            {/* Key Feature Bullets */}
            <div className="space-y-2 py-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Key Industrial Highlights:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase Controls (Quantity + Add to Cart + Buy Now) */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center bg-[#0c1424] border border-slate-700 rounded-2xl p-1 shrink-0">
                  <button
                    id="pdp-dec-quantity"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 text-slate-400 hover:text-white rounded-xl transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold text-white px-4 min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    id="pdp-inc-quantity"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 text-slate-400 hover:text-white rounded-xl transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  id="pdp-add-to-cart-btn"
                  onClick={() => addToCart(product, quantity, true)}
                  className="flex-1 py-4 px-5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-heading font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart (৳{(price * quantity).toLocaleString()})</span>
                </button>
              </div>

              {/* Buy Now Button (Direct checkout) */}
              <button
                id="pdp-buy-now-btn"
                onClick={() => {
                  addToCart(product, quantity, false);
                  navigateTo('checkout');
                }}
                className="w-full py-3.5 px-4 bg-slate-850 hover:bg-slate-800 text-amber-400 hover:text-amber-300 border border-amber-500/40 hover:border-amber-400 font-heading font-bold text-xs uppercase tracking-wider rounded-2xl transition-all"
              >
                Instant Buy Now (Direct Checkout)
              </button>
            </div>
          </div>
        </div>

        {/* Frequently Bought Together Bundle Section */}
        {frequentlyBoughtProducts.length > 0 && (
          <div className="my-16 p-6 sm:p-8 rounded-3xl bg-[#0c1424] border border-slate-800 space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                Frequently Bought Together
              </h3>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Bundle items list */}
              <div className="flex flex-wrap items-center gap-4">
                {bundleItems.map((item, idx) => (
                  <React.Fragment key={item.id}>
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 max-w-xs">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-xl border border-slate-700 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-semibold text-slate-400 font-mono">SKU: {item.sku}</span>
                        <h5 className="text-xs font-semibold text-white line-clamp-1">{item.name}</h5>
                        <span className="text-xs font-bold text-amber-400">
                          ৳{(item.discountPrice ?? item.regularPrice).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    {idx < bundleItems.length - 1 && (
                      <span className="font-bold text-amber-400 text-lg">+</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Bundle Pricing & Add Button */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 text-center lg:text-right shrink-0 space-y-2">
                <span className="text-xs text-slate-400">Bundle Price for {bundleItems.length} items:</span>
                <div className="flex items-baseline justify-center lg:justify-end gap-2">
                  <span className="font-heading font-black text-2xl text-amber-400">
                    ৳{bundleTotalPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-500 line-through">
                    ৳{bundleOriginalPrice.toLocaleString()}
                  </span>
                </div>
                <button
                  id="add-frequently-bought-bundle-btn"
                  onClick={handleAddBundle}
                  className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  Add All {bundleItems.length} to Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabbed Info Section: Specs, Reviews, Delivery */}
        <div className="my-16 space-y-6">
          {/* Tabs */}
          <div className="flex border-b border-slate-800 gap-4 sm:gap-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 text-sm font-bold tracking-wide transition-colors relative ${
                activeTab === 'desc' ? 'text-amber-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              Product Description
              {activeTab === 'desc' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 text-sm font-bold tracking-wide transition-colors relative ${
                activeTab === 'specs' ? 'text-amber-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              Technical Specifications
              {activeTab === 'specs' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('delivery')}
              className={`pb-3 text-sm font-bold tracking-wide transition-colors relative ${
                activeTab === 'delivery' ? 'text-amber-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              Delivery &amp; Returns
              {activeTab === 'delivery' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-sm font-bold tracking-wide transition-colors relative ${
                activeTab === 'reviews' ? 'text-amber-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              Customer Reviews ({customReviews.length})
              {activeTab === 'reviews' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1424] border border-slate-800 text-sm text-slate-300">
            {activeTab === 'desc' && (
              <div className="space-y-4 leading-relaxed">
                <h4 className="font-heading font-bold text-lg text-white">Full Overview</h4>
                <p>{product.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-200">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-4">
                <h4 className="font-heading font-bold text-lg text-white">Technical Specifications</h4>
                <div className="divide-y divide-slate-800 border border-slate-800 rounded-2xl overflow-hidden">
                  {product.specifications.map((spec, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 p-3.5 text-xs bg-slate-900/40 hover:bg-slate-900/80">
                      <span className="font-bold text-slate-400">{spec.label}</span>
                      <span className="sm:col-span-2 text-white font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="space-y-4 leading-relaxed text-xs">
                <h4 className="font-heading font-bold text-lg text-white">Delivery Policy in Bangladesh</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <h5 className="font-bold text-amber-400">Inside Dhaka Metropolitan</h5>
                    <p>Standard Delivery: 24 Hours (৳60 delivery charge). Free delivery for orders over ৳5,000.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <h5 className="font-bold text-cyan-400">Outside Dhaka (63 Districts)</h5>
                    <p>Inter-district Express Courier: 48 to 72 Hours (৳120 delivery charge). Free delivery for orders over ৳5,000.</p>
                  </div>
                </div>
                <h5 className="font-bold text-white pt-2">7 Days Return Guarantee</h5>
                <p>If the product is damaged, defective, or incorrect upon delivery, you can request an instant replacement or full refund within 7 days.</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Review Header & Add Review Form */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Rating Breakdown (5 cols) */}
                  <div className="md:col-span-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
                    <span className="font-heading font-black text-5xl text-amber-400">
                      {product.rating}
                    </span>
                    <div className="flex justify-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-400">Based on {customReviews.length} customer ratings</p>
                  </div>

                  {/* Add Review Form (7 cols) */}
                  <div className="md:col-span-7 space-y-3">
                    <h5 className="font-bold text-white text-sm">Write a Product Review</h5>
                    <form onSubmit={handleAddReview} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">Your Rating:</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setNewRating(star)}
                              className="text-amber-400 hover:scale-110 transition-transform"
                            >
                              <Star className={`w-5 h-5 ${star <= newRating ? 'fill-amber-400' : 'text-slate-600'}`} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Your Name / Title"
                          value={newReviewerName}
                          onChange={(e) => setNewReviewerName(e.target.value)}
                          className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
                        />
                        <input
                          type="text"
                          placeholder="City (e.g. Gulshan, Dhaka)"
                          value={newReviewerLocation}
                          onChange={(e) => setNewReviewerLocation(e.target.value)}
                          className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
                        />
                      </div>

                      <textarea
                        required
                        rows={3}
                        placeholder="Share details of your experience with this industrial hardware..."
                        value={newReviewText}
                        onChange={(e) => setNewReviewText(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
                      />

                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all"
                      >
                        Submit Verified Review
                      </button>
                    </form>
                  </div>
                </div>

                {/* Review Items List */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  {customReviews.length === 0 ? (
                    <p className="text-slate-400 text-xs italic">Be the first to review this product!</p>
                  ) : (
                    customReviews.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">{rev.userName}</span>
                            <span className="text-slate-500">• {rev.userLocation}</span>
                            {rev.verifiedPurchase && (
                              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-semibold">
                                Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-slate-500 text-[11px]">{rev.date}</span>
                        </div>
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed pt-1">{rev.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="my-16 space-y-6">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
              Related Products in this Category
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
