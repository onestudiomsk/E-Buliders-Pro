import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  ArrowLeft, 
  Search, 
  Tag, 
  ShieldCheck,
  Zap,
  Layers,
  Filter
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Product, Order, Coupon } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    orders, 
    categories, 
    coupons, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateOrderStatus, 
    navigateTo,
    showToast 
  } = useShop();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'products' | 'orders' | 'coupons'>('overview');
  
  // Search in Admin
  const [productSearch, setProductSearch] = useState('');
  
  // Add/Edit Product Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Form states for Product
  const [pName, setPName] = useState('');
  const [pCategory, setPCategory] = useState('electrical');
  const [pRegularPrice, setPRegularPrice] = useState(1500);
  const [pDiscountPrice, setPDiscountPrice] = useState(1200);
  const [pStock, setPStock] = useState(45);
  const [pSku, setPSku] = useState('AB-EL-NEW');
  const [pDescription, setPDescription] = useState('');
  const [pImage, setPImage] = useState('https://images.unsplash.com/photo-1558384661-820d88b43f9a?auto=format&fit=crop&w=600&q=80');

  // Stats
  const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);
  const totalOrdersCount = orders.length;
  const lowStockCount = products.filter((p) => p.stockQuantity < 10).length;

  const openAddModal = () => {
    setEditingProductId(null);
    setPName('');
    setPCategory('electrical');
    setPRegularPrice(1500);
    setPDiscountPrice(1200);
    setPStock(50);
    setPSku('AB-SKU-' + Math.floor(100 + Math.random() * 900));
    setPDescription('High durability professional hardware.');
    setPImage('https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=600&q=80');
    setShowProductModal(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProductId(p.id);
    setPName(p.name);
    setPCategory(p.categoryId);
    setPRegularPrice(p.regularPrice);
    setPDiscountPrice(p.discountPrice || p.regularPrice);
    setPStock(p.stockQuantity);
    setPSku(p.sku);
    setPDescription(p.description);
    setPImage(p.images[0]);
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName.trim()) return;

    if (editingProductId) {
      updateProduct(editingProductId, {
        name: pName,
        categoryId: pCategory as any,
        regularPrice: Number(pRegularPrice),
        discountPrice: Number(pDiscountPrice),
        stockQuantity: Number(pStock),
        sku: pSku,
        description: pDescription,
        images: [pImage],
      });
      showToast('Product Updated', `${pName} updated successfully.`, 'success');
    } else {
      const newProd: Product = {
        id: 'prod-' + Date.now(),
        name: pName,
        categoryId: pCategory as any,
        subcategoryId: 'sub-' + pCategory,
        regularPrice: Number(pRegularPrice),
        discountPrice: Number(pDiscountPrice),
        rating: 4.9,
        reviewCount: 1,
        inStock: true,
        stockQuantity: Number(pStock),
        sku: pSku,
        images: [pImage],
        shortDescription: pDescription,
        description: pDescription,
        features: ['Heavy-duty engineering standard', 'BSTI certified', 'Premium finish'],
        specifications: [
          { label: 'SKU', value: pSku },
          { label: 'Category', value: pCategory },
          { label: 'Warranty', value: '2 Years Manufacturer' },
        ],
        warranty: '2 Years Manufacturer',
        weightOrSize: 'Standard Pack',
        originCountry: 'Bangladesh',
        isFeatured: true,
        reviews: [],
      };
      addProduct(newProd);
      showToast('Product Added', `${pName} added to catalog.`, 'success');
    }

    setShowProductModal(false);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.categoryId.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div id="admin-management-portal" className="min-h-screen bg-[#060a14] py-8 sm:py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Admin Header */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0c1424] border border-amber-500/30 shadow-2xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>ApexBuild Executive Control Panel</span>
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Store &amp; Inventory Management
            </h1>
          </div>

          <button
            onClick={() => navigateTo('home')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Storefront</span>
          </button>
        </div>

        {/* 4 Key Performance Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-[#0c1424] border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Total Revenue (BDT)</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="font-heading font-black text-2xl text-emerald-400">
              ৳{totalRevenue.toLocaleString()}
            </h3>
            <span className="text-[10px] text-emerald-400/80 font-semibold">+18.4% this week</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c1424] border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Total Dispatched Orders</span>
              <ShoppingBag className="w-4 h-4 text-amber-400" />
            </div>
            <h3 className="font-heading font-black text-2xl text-white">
              {totalOrdersCount}
            </h3>
            <span className="text-[10px] text-slate-400">Live order sync</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c1424] border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Active Catalog SKUs</span>
              <Package className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="font-heading font-black text-2xl text-white">
              {products.length}
            </h3>
            <span className="text-[10px] text-cyan-400 font-semibold">Across {categories.length} categories</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c1424] border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Low Stock Alerts</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <h3 className="font-heading font-black text-2xl text-rose-400">
              {lowStockCount}
            </h3>
            <span className="text-[10px] text-rose-400/80 font-semibold">Under 10 units</span>
          </div>
        </div>

        {/* Navigation Tabs for Admin */}
        <div className="flex items-center gap-2 mb-8 bg-[#0c1424] p-1.5 rounded-2xl border border-slate-800 w-fit">
          <button
            onClick={() => setActiveAdminTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeAdminTab === 'overview'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveAdminTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeAdminTab === 'products'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeAdminTab === 'orders'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('coupons')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeAdminTab === 'coupons'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Coupons ({coupons.length})
          </button>
        </div>

        {/* Tab 1: Products Management */}
        {activeAdminTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by product name, category or SKU..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-[#0c1424] border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
                />
              </div>

              <button
                id="admin-add-product-btn"
                onClick={openAddModal}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Product Table */}
            <div className="rounded-2xl border border-slate-800 bg-[#0c1424] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 uppercase font-semibold border-b border-slate-800 text-[11px]">
                    <tr>
                      <th className="p-4">Product</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">SKU / Code</th>
                      <th className="p-4">Price (BDT)</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-900/40">
                        <td className="p-4 flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-700 shrink-0"
                          />
                          <div>
                            <span className="font-bold text-white block">{p.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">ID: {p.id}</span>
                          </div>
                        </td>
                        <td className="p-4 capitalize">{p.categoryId.replace('-', ' ')}</td>
                        <td className="p-4 font-mono font-semibold text-slate-300">{p.sku}</td>
                        <td className="p-4 font-bold text-white">
                          ৳{(p.discountPrice ?? p.regularPrice).toLocaleString()}
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.stockQuantity < 10 
                              ? 'bg-rose-500/20 text-rose-400' 
                              : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {p.stockQuantity} units
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditModal(p)}
                              className="p-1.5 text-slate-400 hover:text-amber-400 rounded-lg hover:bg-slate-800 transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                                  deleteProduct(p.id);
                                  showToast('Product Deleted', 'Item removed from database.', 'info');
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Orders Management */}
        {activeAdminTab === 'orders' && (
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-lg text-white">Customer Orders Management</h3>
            <div className="rounded-2xl border border-slate-800 bg-[#0c1424] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 uppercase font-semibold border-b border-slate-800 text-[11px]">
                    <tr>
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Destination</th>
                      <th className="p-4">Total (BDT)</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-slate-900/40">
                        <td className="p-4 font-mono font-bold text-amber-400">{o.id}</td>
                        <td className="p-4">
                          <span className="font-bold text-white block">{o.customerName || (o as any).shippingAddress?.fullName || 'Customer'}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{o.customerPhone || (o as any).shippingAddress?.phone}</span>
                        </td>
                        <td className="p-4">{o.district || (o as any).shippingAddress?.district || 'Dhaka'}, {o.division || (o as any).shippingAddress?.division || 'Dhaka'}</td>
                        <td className="p-4 font-bold text-white">৳{o.total.toLocaleString()}</td>
                        <td className="p-4 uppercase">{o.paymentMethod} ({o.paymentStatus})</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            o.status === 'delivered'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <select
                            value={o.status}
                            onChange={(e) => {
                              updateOrderStatus(o.id, e.target.value as any);
                              showToast('Status Updated', `Order ${o.id} status changed to ${e.target.value}`, 'success');
                            }}
                            className="bg-slate-900 border border-slate-700 text-white text-[11px] rounded-lg px-2 py-1 outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Coupons */}
        {activeAdminTab === 'coupons' && (
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-lg text-white">Active Discount Coupons</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div key={c.code} className="p-5 rounded-2xl bg-[#0c1424] border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-base text-amber-400">{c.code}</span>
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-md">
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{c.description}</p>
                  <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                    <span>
                      Discount:{' '}
                      <strong>
                        {c.discountType === 'percentage' || (c as any).discountPercentage
                          ? `${c.discountValue || (c as any).discountPercentage || 10}% OFF`
                          : `৳${c.discountValue} OFF`}
                      </strong>{' '}
                      (Min Spend: ৳{(c.minOrderAmount ?? (c as any).minSpend ?? 0).toLocaleString()})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Overview Chart / Recent Activities */}
        {activeAdminTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 rounded-3xl bg-[#0c1424] border border-slate-800 space-y-4">
              <h4 className="font-heading font-bold text-base text-white">Recent Hardware Orders</h4>
              <div className="space-y-3">
                {orders.slice(0, 3).map((ord) => (
                  <div key={ord.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-amber-400 font-mono">{ord.id}</span>
                      <span className="text-slate-400 block">{ord.customerName || (ord as any).shippingAddress?.fullName || 'Customer'} • {ord.items?.length || 0} items</span>
                    </div>
                    <span className="font-bold text-white">৳{ord.total.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#0c1424] border border-slate-800 space-y-4">
              <h4 className="font-heading font-bold text-base text-white">Warehouse Inventory Alerts</h4>
              <div className="space-y-3">
                {products.filter(p => p.stockQuantity < 30).slice(0, 3).map((prod) => (
                  <div key={prod.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white block">{prod.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">SKU: {prod.sku}</span>
                    </div>
                    <span className="text-amber-400 font-bold">{prod.stockQuantity} in stock</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add or Edit Product */}
        {showProductModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl bg-[#0c1424] border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="font-heading font-bold text-lg text-white">
                {editingProductId ? 'Edit Product Catalog Item' : 'Add New Hardware Product'}
              </h3>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={pName}
                    onChange={(e) => setPName(e.target.value)}
                    placeholder="e.g. Premium 3-Gang Luxury Switch"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">SKU / Model</label>
                    <input
                      type="text"
                      value={pSku}
                      onChange={(e) => setPSku(e.target.value)}
                      placeholder="e.g. AB-MOD-3G"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Category</label>
                    <select
                      value={pCategory}
                      onChange={(e) => setPCategory(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Regular Price (BDT)</label>
                    <input
                      type="number"
                      required
                      value={pRegularPrice}
                      onChange={(e) => setPRegularPrice(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Discount Price (BDT)</label>
                    <input
                      type="number"
                      value={pDiscountPrice}
                      onChange={(e) => setPDiscountPrice(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Warehouse Stock</label>
                    <input
                      type="number"
                      required
                      value={pStock}
                      onChange={(e) => setPStock(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">SKU Code</label>
                    <input
                      type="text"
                      required
                      value={pSku}
                      onChange={(e) => setPSku(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Image URL</label>
                  <input
                    type="url"
                    required
                    value={pImage}
                    onChange={(e) => setPImage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={pDescription}
                    onChange={(e) => setPDescription(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="px-5 py-2 bg-slate-800 text-slate-300 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl shadow-md hover:bg-amber-400"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
