import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  ShieldCheck, 
  Sparkles, 
  Truck 
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const { 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    cartSubtotal, 
    cartDiscount, 
    deliveryFee, 
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    navigateTo,
    deliveryZone,
    setDeliveryZone
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  // Free shipping threshold at ৳5,000
  const freeShippingThreshold = 5000;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <div id="cart-drawer-overlay" className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartDrawerOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-[#0c1424] border-l border-slate-700/80 shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#080d1a]">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-white">Your Shopping Cart</h3>
                    <p className="text-xs text-slate-400">
                      {cart.length} {cart.length === 1 ? 'item' : 'items'} selected
                    </p>
                  </div>
                </div>
                <button
                  id="close-cart-drawer-btn"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="p-4 bg-[#091120] border-b border-slate-800/80">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                    <Truck className="w-3.5 h-3.5 text-amber-400" />
                    {amountNeededForFreeShipping === 0 ? (
                      <span className="text-emerald-400 font-semibold">🎉 You unlocked FREE Delivery!</span>
                    ) : (
                      <span>Add <strong className="text-amber-400">৳{amountNeededForFreeShipping.toLocaleString()}</strong> more for FREE Delivery</span>
                    )}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">{progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-slate-700 flex items-center justify-center text-slate-500">
                      <ShoppingBag className="w-8 h-8 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Your Cart is Empty</h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-xs">
                        Explore our luxury electrical switches, German power tools, and sanitary fixtures.
                      </p>
                    </div>
                    <button
                      id="cart-empty-shop-now-btn"
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        navigateTo('catalog');
                      }}
                      className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-bold rounded-xl shadow-lg hover:from-amber-400 hover:to-amber-500 transition-all"
                    >
                      Browse Catalog
                    </button>
                  </div>
                ) : (
                  cart.map((item) => {
                    if (!item.product) return null;
                    const price = item.product.discountPrice ?? item.product.regularPrice ?? 0;
                    const itemSubtotal = price * (item.quantity || 1);
                    const itemImg = item.product.images?.[0] || 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=400&q=80';

                    return (
                      <div
                        key={item.product.id}
                        id={`cart-item-${item.product.id}`}
                        className="flex gap-3 p-3.5 bg-slate-900/70 border border-slate-800 rounded-2xl hover:border-slate-700 transition-all"
                      >
                        {/* Image */}
                        <img
                          src={itemImg}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-xl border border-slate-700/80 shrink-0"
                        />

                        {/* Info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[10px] font-mono text-slate-400">
                                SKU: {item.product.sku}
                              </span>
                              <h5 
                                onClick={() => {
                                  setIsCartDrawerOpen(false);
                                  navigateTo('product-detail', { productId: item.product.id });
                                }}
                                className="text-xs font-semibold text-slate-100 hover:text-amber-300 line-clamp-1 cursor-pointer transition-colors"
                              >
                                {item.product.name}
                              </h5>
                            </div>
                            <button
                              id={`remove-cart-item-${item.product.id}`}
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-slate-500 hover:text-rose-400 p-1 rounded-md transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-800/80">
                            {/* Quantity buttons */}
                            <div className="flex items-center gap-1.5 bg-[#080d1a] border border-slate-700/80 rounded-lg p-0.5">
                              <button
                                id={`dec-qty-${item.product.id}`}
                                onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 text-slate-400 hover:text-white rounded transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold text-white px-1.5 min-w-[20px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                id={`inc-qty-${item.product.id}`}
                                onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 text-slate-400 hover:text-white rounded transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <span className="text-xs font-bold text-amber-400">
                                ৳{itemSubtotal.toLocaleString()}
                              </span>
                              <span className="text-[10px] text-slate-400 block font-normal">
                                @ ৳{price.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Drawer Footer / Checkout Summary */}
              {cart.length > 0 && (
                <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#080d1a] space-y-3.5">
                  
                  {/* Delivery Location Selector */}
                  <div className="flex items-center justify-between p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-300 font-medium">Delivery Destination:</span>
                    <div className="flex items-center gap-1 bg-[#080d1a] p-0.5 rounded-lg border border-slate-700">
                      <button
                        type="button"
                        onClick={() => setDeliveryZone('dhaka')}
                        className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                          deliveryZone === 'dhaka' 
                            ? 'bg-amber-500 text-slate-950 shadow-sm' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Inside Dhaka (৳60)
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryZone('outside')}
                        className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                          deliveryZone === 'outside' 
                            ? 'bg-amber-500 text-slate-950 shadow-sm' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Outside Dhaka (৳120)
                      </button>
                    </div>
                  </div>

                  {/* Coupon Input */}
                  <div className="space-y-1.5">
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
                        <span className="flex items-center gap-1.5 font-semibold">
                          <Tag className="w-3.5 h-3.5" />
                          Code &ldquo;{appliedCoupon.code}&rdquo; applied!
                        </span>
                        <button
                          onClick={removeCoupon}
                          className="text-xs text-emerald-400 hover:text-emerald-200 underline font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            placeholder="Enter promo code (e.g. APEX10)"
                            className="w-full bg-[#0c1424] border border-slate-700 text-xs text-white placeholder-slate-500 rounded-xl px-3 py-2 outline-none focus:border-amber-400"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-bold rounded-xl transition-colors shrink-0"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Summary Rows */}
                  <div className="space-y-1 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Subtotal</span>
                      <span className="font-semibold text-white">৳{cartSubtotal.toLocaleString()}</span>
                    </div>
                    {cartDiscount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Promotional Discount</span>
                        <span>-৳{cartDiscount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-400">Delivery Charge</span>
                      <span>
                        {deliveryFee === 0 ? (
                          <span className="text-emerald-400 font-bold uppercase">FREE</span>
                        ) : (
                          `৳${deliveryFee}`
                        )}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                      <span className="text-sm font-bold text-white">Estimated Total</span>
                      <span className="text-lg font-black text-amber-400">৳{cartTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      id="proceed-checkout-from-drawer-btn"
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        navigateTo('checkout');
                      }}
                      className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-heading font-black text-sm tracking-wide rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 group"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      id="view-full-cart-btn"
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        navigateTo('cart');
                      }}
                      className="w-full py-2 text-center text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                    >
                      View Detailed Cart Page
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
