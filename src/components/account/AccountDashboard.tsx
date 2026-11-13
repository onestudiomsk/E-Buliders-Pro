import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  Plus, 
  Trash2,
  ExternalLink,
  ChevronRight,
  Phone,
  Mail
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../product/ProductCard';

export const AccountDashboard: React.FC = () => {
  const { 
    userProfile, 
    updateUserProfile,
    addSavedAddress,
    deleteSavedAddress,
    orders, 
    wishlist, 
    products, 
    navigateTo,
    showToast 
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'profile' | 'warranty'>('orders');
  
  // Profile edit states
  const [name, setName] = useState(userProfile?.name || '');
  const [email, setEmail] = useState(userProfile?.email || '');
  const [phone, setPhone] = useState(userProfile?.phone || '');
  const [division, setDivision] = useState(userProfile?.division || 'Dhaka');
  const [district, setDistrict] = useState(userProfile?.district || 'Dhaka City');
  const [area, setArea] = useState(userProfile?.area || 'Gulshan 2');
  const [address, setAddress] = useState(userProfile?.address || '');

  // New Address state
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newAddrTitle, setNewAddrTitle] = useState('Home / Site');
  const [newAddrFull, setNewAddrFull] = useState('');
  const [newAddrPhone, setNewAddrPhone] = useState(userProfile?.phone || '');

  const savedAddresses = userProfile?.savedAddresses || [];
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      phone,
      division,
      district,
      area,
      address,
    });
    showToast('Profile Updated', 'Your profile details have been saved.', 'success');
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrFull.trim()) return;

    addSavedAddress({
      title: newAddrTitle || 'Site Address',
      fullAddress: newAddrFull,
      phone: newAddrPhone || phone,
      isDefault: savedAddresses.length === 0,
    });

    setShowAddAddressModal(false);
    setNewAddrFull('');
    showToast('Address Added', 'New delivery address saved.', 'success');
  };

  const handleDeleteAddress = (id: string) => {
    deleteSavedAddress(id);
    showToast('Address Deleted', 'Address removed from your profile.', 'info');
  };

  return (
    <div id="account-dashboard-page" className="min-h-screen bg-[#080d1a] py-8 sm:py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* User Greeting Bar */}
        <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-[#0c1424] border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 p-[2px]">
              <div className="w-full h-full bg-[#080d1a] rounded-[14px] flex items-center justify-center text-amber-400 font-heading font-black text-2xl">
                {userProfile?.name?.charAt(0) || 'U'}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-black text-xl sm:text-2xl text-white">
                  {userProfile?.name || 'Customer Account'}
                </h1>
                <span className="px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold rounded-full uppercase">
                  Verified Contractor VIP
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{userProfile?.email} • {userProfile?.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('admin')}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold transition-all"
            >
              Switch to Admin Portal
            </button>
          </div>
        </div>

        {/* 2-Column Layout: Navigation Tabs & Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Tab Menu (Desktop 3 cols) */}
          <div className="lg:col-span-3 space-y-2">
            <div className="p-3 bg-[#0c1424] border border-slate-800 rounded-2xl space-y-1">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'orders'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4" />
                  <span>My Orders</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-slate-950/40 rounded-md">
                  {orders?.length || 0}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'wishlist'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4" />
                  <span>Wishlist Items</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-slate-950/40 rounded-md">
                  {wishlist?.length || 0}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'addresses'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4" />
                  <span>Saved Addresses</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-slate-950/40 rounded-md">
                  {savedAddresses.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'profile'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4" />
                  <span>Account Settings</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('warranty')}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'warranty'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Warranty &amp; Returns</span>
                </div>
              </button>
            </div>
          </div>

          {/* Right: Tab Panels (9 cols) */}
          <div className="lg:col-span-9">
            
            {/* 1. Orders Tab with Visual Timeline */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="font-heading font-bold text-lg text-white">
                  Order History &amp; Live Tracking
                </h3>

                {(!orders || orders.length === 0) ? (
                  <div className="p-8 bg-[#0c1424] border border-slate-800 rounded-3xl text-center space-y-3">
                    <Package className="w-10 h-10 text-amber-400 mx-auto" />
                    <p className="text-sm text-slate-300">You haven&rsquo;t placed any orders yet.</p>
                    <button
                      onClick={() => navigateTo('catalog')}
                      className="px-5 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-6 rounded-3xl bg-[#0c1424] border border-slate-800 shadow-xl space-y-5"
                    >
                      {/* Order Header */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-heading font-black text-base text-amber-400 font-mono">
                              {order.id}
                            </span>
                            <span className="text-slate-400 text-xs font-mono">
                              ({order.orderNumber})
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              order.status === 'delivered' 
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <span className="text-xs text-slate-400 mt-1 block">
                            Placed on {order.createdAt} • Delivery: {order.estimatedDelivery}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="font-heading font-black text-lg text-white">
                            ৳{order.total.toLocaleString()} BDT
                          </span>
                          <span className="text-[10px] text-slate-400 block uppercase">
                            Payment: {order.paymentMethod} ({order.paymentStatus})
                          </span>
                        </div>
                      </div>

                      {/* Visual Status Progress Steps */}
                      <div className="py-2">
                        <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                          <div className="flex flex-col items-center">
                            <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center mb-1">
                              ✓
                            </div>
                            <span className="text-emerald-400 font-semibold">Order Placed</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center mb-1 font-bold ${
                              ['processing', 'shipped', 'out_for_delivery', 'delivered'].includes(order.status)
                                ? 'bg-emerald-500 text-slate-950'
                                : 'bg-slate-800 text-slate-500'
                            }`}>
                              ✓
                            </div>
                            <span className={['processing', 'shipped', 'out_for_delivery', 'delivered'].includes(order.status) ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>
                              Warehouse Packed
                            </span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center mb-1 font-bold ${
                              ['shipped', 'out_for_delivery', 'delivered'].includes(order.status)
                                ? 'bg-emerald-500 text-slate-950'
                                : 'bg-slate-800 text-slate-500'
                            }`}>
                              <Truck className="w-3.5 h-3.5" />
                            </div>
                            <span className={['shipped', 'out_for_delivery', 'delivered'].includes(order.status) ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>
                              Express Dispatch
                            </span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center mb-1 font-bold ${
                              order.status === 'delivered'
                                ? 'bg-emerald-500 text-slate-950'
                                : 'bg-slate-800 text-slate-500'
                            }`}>
                              ✓
                            </div>
                            <span className={order.status === 'delivered' ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>
                              Delivered
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Items Mini Row */}
                      <div className="space-y-2 pt-2 border-t border-slate-800/60">
                        {order.items?.map((it, idx) => {
                          const itemImg = it.productImage || (it as any).product?.images?.[0] || 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=400&q=80';
                          const itemName = it.productName || (it as any).product?.name || 'Hardware Item';
                          const itemPrice = it.price || (it as any).product?.discountPrice || (it as any).product?.regularPrice || 0;
                          return (
                            <div key={it.productId || idx} className="flex items-center justify-between text-xs text-slate-300">
                              <div className="flex items-center gap-2.5 truncate">
                                <img
                                  src={itemImg}
                                  alt={itemName}
                                  className="w-9 h-9 rounded-lg object-cover border border-slate-700 shrink-0"
                                />
                                <span className="truncate">{itemName}</span>
                              </div>
                              <span className="text-amber-400 font-bold shrink-0 ml-4">
                                {it.quantity} × ৳{itemPrice.toLocaleString()}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Tracking number badge */}
                      <div className="flex items-center justify-between text-xs pt-2 text-slate-400 border-t border-slate-800">
                        <span>Courier Code: <strong className="text-cyan-400 font-mono">{order.orderNumber || order.id}</strong></span>
                        <span className="text-emerald-400">24/7 Hotline Support: +880 9612-888999</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* 2. Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h3 className="font-heading font-bold text-lg text-white">
                  My Saved Wishlist ({wishlistProducts.length} Products)
                </h3>

                {wishlistProducts.length === 0 ? (
                  <div className="p-8 bg-[#0c1424] border border-slate-800 rounded-3xl text-center space-y-3">
                    <Heart className="w-10 h-10 text-rose-400 mx-auto" />
                    <p className="text-sm text-slate-300">Your wishlist is currently empty.</p>
                    <button
                      onClick={() => navigateTo('catalog')}
                      className="px-5 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {wishlistProducts.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. Saved Addresses */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-lg text-white">
                    Saved Delivery Addresses in Bangladesh
                  </h3>
                  <button
                    onClick={() => setShowAddAddressModal(true)}
                    className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Address</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-5 rounded-2xl bg-[#0c1424] border border-slate-800 space-y-2 relative"
                    >
                      {addr.isDefault && (
                        <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold rounded-md">
                          Default Address
                        </span>
                      )}
                      <h4 className="font-bold text-white text-sm">{addr.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{addr.fullAddress}</p>
                      <p className="text-xs text-slate-400 font-mono flex items-center gap-1">
                        <Phone className="w-3 h-3 text-amber-400" />
                        <span>{addr.phone}</span>
                      </p>

                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-xs text-rose-400 hover:text-rose-300 pt-2 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add address modal inline */}
                {showAddAddressModal && (
                  <form onSubmit={handleAddAddress} className="p-6 rounded-3xl bg-[#0c1424] border border-amber-500/40 space-y-4">
                    <h4 className="font-bold text-white text-sm">Add New Address Location</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Address Label</label>
                        <input
                          type="text"
                          required
                          value={newAddrTitle}
                          onChange={(e) => setNewAddrTitle(e.target.value)}
                          placeholder="e.g. Site Office, Factory, Home"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Contact Phone</label>
                        <input
                          type="tel"
                          required
                          value={newAddrPhone}
                          onChange={(e) => setNewAddrPhone(e.target.value)}
                          placeholder="+880 1712 345678"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs text-slate-400 block mb-1">Full Detailed Address (House/Road/Area/City)</label>
                        <input
                          type="text"
                          required
                          value={newAddrFull}
                          onChange={(e) => setNewAddrFull(e.target.value)}
                          placeholder="e.g. Plot 24, Road 11, Banani DOHS, Dhaka 1206"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="px-5 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
                      >
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddAddressModal(false)}
                        className="px-5 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* 4. Profile Settings */}
            {activeTab === 'profile' && (
              <div className="p-6 rounded-3xl bg-[#0c1424] border border-slate-800 space-y-5">
                <h3 className="font-heading font-bold text-lg text-white">Account Details</h3>
                <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-xl">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Full Legal / Company Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Mobile Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Division</label>
                      <input
                        type="text"
                        value={division}
                        onChange={(e) => setDivision(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">District / City</label>
                      <input
                        type="text"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Default Street / Site Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* 5. Warranty & Returns */}
            {activeTab === 'warranty' && (
              <div className="p-6 rounded-3xl bg-[#0c1424] border border-slate-800 space-y-4">
                <h3 className="font-heading font-bold text-lg text-white">Official Warranty &amp; Return Claims</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  All products sold on ApexBuild come with official manufacturer warranties (1 to 10 years depending on product category). If your hardware requires service or replacement:
                </p>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                  <p className="text-amber-400 font-bold">Direct Claim Helpline:</p>
                  <p className="text-slate-300">Call <strong>+880 9612-888999</strong> or email <strong>warranty@apexbuild.com.bd</strong> with your Order ID and photo of the issue.</p>
                  <p className="text-slate-400">Our engineering technicians provide doorstep pickup within Dhaka Metropolitan for warranty claims.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
