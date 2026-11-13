import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  Lock, 
  ArrowLeft, 
  Sparkles,
  Zap,
  Phone,
  MapPin,
  Clock,
  PackageCheck
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Order } from '../../types';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    deliveryFee, 
    cartDiscount, 
    cartTotal,
    appliedCoupon, 
    userProfile, 
    placeOrder, 
    navigateTo,
    showToast 
  } = useShop();

  const [fullName, setFullName] = useState(userProfile.name || '');
  const [email, setEmail] = useState(userProfile.email || '');
  const [phone, setPhone] = useState(userProfile.phone || '+880 1712 345678');
  const [division, setDivision] = useState(userProfile.division || 'Dhaka');
  const [district, setDistrict] = useState(userProfile.district || 'Dhaka');
  const [area, setArea] = useState(userProfile.area || 'Gulshan 2');
  const [address, setAddress] = useState(userProfile.address || 'House 42, Road 71, Diplomatic Zone');
  const [orderNotes, setOrderNotes] = useState('');
  
  // Payment methods
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'card' | 'cod'>('bkash');
  const [bkashNumber, setBkashNumber] = useState('01712345678');
  const [bkashTrxId, setBkashTrxId] = useState('TRX' + Math.floor(10000000 + Math.random() * 90000000));
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Empty Cart', 'Please add products before checking out.', 'error');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const order = placeOrder({
        customerName: fullName,
        customerPhone: phone,
        customerEmail: email,
        division,
        district,
        area,
        address,
        paymentMethod: paymentMethod === 'bkash' ? 'bkash' : paymentMethod === 'nagad' ? 'nagad' : paymentMethod === 'card' ? 'card' : 'cod',
      });

      setIsProcessing(false);
      setCompletedOrder(order);
      showToast('Order Confirmed!', `Order ${order.orderNumber} placed successfully.`, 'success');
    }, 1200);
  };

  // Order Confirmation Success View
  if (completedOrder) {
    return (
      <div id="order-success-screen" className="min-h-screen bg-[#080d1a] py-12 sm:py-20 relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0c1424] border border-amber-500/40 shadow-2xl text-center space-y-6">
            
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs rounded-full uppercase tracking-wider">
                Order Received &amp; Processing
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white">
                Thank You For Your Order!
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                We have received your order and our logistics team is preparing your dispatch. An SMS notification has been sent to <strong>{completedOrder.customerPhone}</strong>.
              </p>
            </div>

            {/* Order Details Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Order Reference:</span>
                <span className="font-bold text-amber-400 font-mono text-sm">{completedOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Customer:</span>
                <span className="font-bold text-white">{completedOrder.customerName} ({completedOrder.customerPhone})</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Payment Status:</span>
                <span className="font-bold text-emerald-400 uppercase">{completedOrder.paymentStatus} ({completedOrder.paymentMethod.toUpperCase()})</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Delivery Address:</span>
                <span className="text-white font-medium text-right max-w-xs">{completedOrder.address}, {completedOrder.district}, {completedOrder.division}</span>
              </div>
              <div className="flex justify-between items-center pt-1 text-sm font-bold">
                <span className="text-slate-200">Total Amount:</span>
                <span className="text-amber-400 text-base font-black">৳{completedOrder.total.toLocaleString()} BDT</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                id="view-my-orders-btn"
                onClick={() => navigateTo('account')}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all"
              >
                Track Live in My Orders
              </button>
              <button
                id="continue-shopping-btn"
                onClick={() => navigateTo('catalog')}
                className="w-full sm:w-auto px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#080d1a] py-16 flex items-center justify-center">
        <div className="max-w-md mx-auto p-8 bg-[#0c1424] border border-slate-800 rounded-3xl text-center space-y-4">
          <Truck className="w-12 h-12 text-amber-400 mx-auto" />
          <h3 className="font-heading font-bold text-xl text-white">Your Shopping Cart is Empty</h3>
          <p className="text-xs text-slate-400">Add some high quality industrial hardware before proceeding to checkout.</p>
          <button
            onClick={() => navigateTo('catalog')}
            className="px-6 py-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="checkout-page-container" className="min-h-screen bg-[#080d1a] py-8 sm:py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              onClick={() => navigateTo('catalog')}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Shopping</span>
            </button>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Secure Checkout &amp; Express Dispatch
            </h1>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        {/* 2-Column Form Layout */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Details & Address (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Customer Contact */}
            <div className="p-6 rounded-3xl bg-[#0c1424] border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center text-xs">
                  1
                </span>
                <span className="text-white">Customer Contact Information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 font-semibold mb-1 block">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Engr. Tanvir Ahmed"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold mb-1 block">Mobile Number (For Delivery SMS) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 17XX-XXXXXX"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs text-slate-300 font-semibold mb-1 block">Email Address (For Invoice &amp; Warranty PDF)</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tanvir@company.com.bd"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination in Bangladesh */}
            <div className="p-6 rounded-3xl bg-[#0c1424] border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center text-xs">
                  2
                </span>
                <span className="text-white">Delivery Location in Bangladesh</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-slate-300 font-semibold mb-1 block">Division *</label>
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-xs text-white outline-none focus:border-amber-400"
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barishal">Barishal</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold mb-1 block">District / City *</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Dhaka, Gazipur, Chittagong"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold mb-1 block">Thana / Area *</label>
                  <input
                    type="text"
                    required
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. Gulshan, Uttara, Agrabad"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="text-xs text-slate-300 font-semibold mb-1 block">Detailed Street Address (House/Road/Flat/Project Site) *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Plot 12, Road 4, Sector 7, Uttara, Dhaka-1230"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="text-xs text-slate-300 font-semibold mb-1 block">Special Delivery Notes (Optional)</label>
                  <input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="e.g. Call before arrival, leave with site supervisor"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment Gateway Selector */}
            <div className="p-6 rounded-3xl bg-[#0c1424] border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center text-xs">
                  3
                </span>
                <span className="text-white">Choose Secure Payment Method</span>
              </div>

              {/* Payment Methods Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bkash')}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'bkash'
                      ? 'border-rose-500 bg-rose-500/10 shadow-lg shadow-rose-500/10'
                      : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900 text-slate-400'
                  }`}
                >
                  <span className="text-xs font-black text-rose-400 block">bKash</span>
                  <span className="text-[10px] text-slate-400">Mobile Wallet</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('nagad')}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'nagad'
                      ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                      : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900 text-slate-400'
                  }`}
                >
                  <span className="text-xs font-black text-amber-400 block">Nagad</span>
                  <span className="text-[10px] text-slate-400">Instant Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'card'
                      ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/10'
                      : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900 text-slate-400'
                  }`}
                >
                  <span className="text-xs font-black text-cyan-400 block">Debit / Credit</span>
                  <span className="text-[10px] text-slate-400">Visa / Amex</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10'
                      : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900 text-slate-400'
                  }`}
                >
                  <span className="text-xs font-black text-emerald-400 block">Cash on Delivery</span>
                  <span className="text-[10px] text-slate-400">Pay at Door</span>
                </button>
              </div>

              {/* Dynamic Payment Details form */}
              {paymentMethod === 'bkash' && (
                <div className="p-4 rounded-2xl bg-slate-900 border border-rose-500/30 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-rose-400 font-bold">bKash Merchant Pay (01999-888777)</span>
                    <span className="text-slate-400">Simulated Gateway</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your bKash Account Number"
                      value={bkashNumber}
                      onChange={(e) => setBkashNumber(e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Transaction TrxID"
                      value={bkashTrxId}
                      onChange={(e) => setBkashTrxId(e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/30 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-bold">Credit / Debit Card (VISA / Mastercard)</span>
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="16-digit Card Number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <PackageCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>You can inspect the hardware seals and pay cash to the courier representative.</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[#0c1424] border border-slate-800 shadow-2xl space-y-5 sticky top-28">
              <h3 className="font-heading font-bold text-lg text-white pb-3 border-b border-slate-800">
                Order Summary ({cart.length} Products)
              </h3>

              {/* Items List Mini Scroll */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const pPrice = item.product?.discountPrice ?? item.product?.regularPrice ?? 0;
                  const itemImg = item.product?.images?.[0] || 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=400&q=80';
                  const pName = item.product?.name || 'Hardware Item';
                  return (
                    <div key={item.product?.id || Math.random()} className="flex items-center gap-3 text-xs">
                      <img
                        src={itemImg}
                        alt={pName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h6 className="text-white font-semibold truncate">{pName}</h6>
                        <span className="text-slate-400 text-[11px]">
                          Qty: <strong>{item.quantity}</strong> × ৳{pPrice.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-amber-400 font-bold shrink-0">
                        ৳{(pPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Pricing breakdown */}
              <div className="space-y-2 pt-3 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Subtotal:</span>
                  <span className="font-medium text-white">৳{cartSubtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Shipping:</span>
                  <span className="font-medium text-cyan-400">
                    {deliveryFee === 0 ? 'FREE (Over ৳5,000)' : `৳${deliveryFee}`}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Coupon Discount ({appliedCoupon.code}):</span>
                    <span>-৳{cartDiscount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between items-baseline pt-3 border-t border-slate-800">
                  <span className="font-heading font-bold text-base text-white">Total Payable:</span>
                  <div className="text-right">
                    <span className="font-heading font-black text-2xl text-amber-400">
                      ৳{cartTotal.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500 block uppercase">BDT (All Taxes Inc.)</span>
                  </div>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <button
                id="place-order-confirm-btn"
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-heading font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </div>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>Confirm &amp; Place Order</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-slate-500 text-center">
                By clicking Confirm, you agree to ApexBuild Terms of Service and 7-Day Guarantee.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
