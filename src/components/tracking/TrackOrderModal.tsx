import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Package, 
  ShieldCheck 
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const TrackOrderModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { orders } = useShop();
  const [searchTerm, setSearchTerm] = useState('APX-2608-8841');
  const [searchedOrder, setSearchedOrder] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const term = searchTerm.trim().toLowerCase();
    const found = orders.find(
      (o) =>
        (o.id && o.id.toLowerCase().includes(term)) ||
        (o.orderNumber && o.orderNumber.toLowerCase().includes(term)) ||
        (o.customerPhone && o.customerPhone.includes(searchTerm.trim()))
    );
    setSearchedOrder(found || null);
  };

  return (
    <div id="track-order-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0c1424] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Truck className="w-4 h-4" />
            <span>Realtime Courier Logistics</span>
          </div>
          <h3 className="font-heading font-black text-xl sm:text-2xl text-white">
            Track Your Hardware Dispatch
          </h3>
          <p className="text-xs text-slate-400">
            Enter your Order ID (e.g. <strong>APX-2608-8841</strong>), Courier Tracking Number or Registered Mobile Phone.
          </p>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g. APX-2608-8841 or 01712345678"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400 font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all"
          >
            Track Order
          </button>
        </form>

        {/* Results Box */}
        {hasSearched && searchedOrder && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <span className="text-amber-400 font-mono font-bold text-sm block">{searchedOrder.id} ({searchedOrder.orderNumber})</span>
                <span className="text-slate-400 text-[11px]">Recipient: <strong>{searchedOrder.customerName}</strong> ({searchedOrder.customerPhone})</span>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 font-bold uppercase rounded-full text-[10px]">
                {searchedOrder.status}
              </span>
            </div>

            {/* Timeline checkpoints */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h6 className="font-bold text-white">Central Warehouse Order Verified &amp; Packed</h6>
                  <p className="text-slate-400 text-[11px]">Apex Central Logistics Hub, Tejgaon Industrial Area, Dhaka</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h6 className="font-bold text-amber-400">In-Transit via Express Courier Route</h6>
                  <p className="text-slate-400 text-[11px]">Dispatched to destination hub for {searchedOrder.district || searchedOrder.shippingAddress?.district || 'Dhaka'}, {searchedOrder.division || searchedOrder.shippingAddress?.division || 'Bangladesh'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 opacity-60">
                <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h6 className="font-bold text-slate-300">Out for Delivery to Customer</h6>
                  <p className="text-slate-500 text-[11px]">Recipient Address: {searchedOrder.address || searchedOrder.shippingAddress?.streetAddress || searchedOrder.area || 'Customer Address'}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between text-slate-400 text-[11px]">
              <span>Estimated Delivery: <strong className="text-white">{searchedOrder.estimatedDelivery}</strong></span>
              <span>Need help? Call <strong className="text-amber-400">+880 9612-888999</strong></span>
            </div>
          </div>
        )}

        {hasSearched && !searchedOrder && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
            <p className="text-xs text-rose-400 font-semibold">No order found matching &ldquo;{searchTerm}&rdquo;</p>
            <p className="text-[11px] text-slate-400">Please double check your Order ID or telephone number.</p>
          </div>
        )}
      </div>
    </div>
  );
};
