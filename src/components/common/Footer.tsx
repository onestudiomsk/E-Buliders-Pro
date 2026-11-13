import React from 'react';
import { 
  Truck, 
  MapPin, 
  Phone, 
  Mail, 
  CreditCard
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Footer: React.FC<{ onOpenTrackOrder: () => void }> = ({ onOpenTrackOrder }) => {
  const { navigateTo } = useShop();

  return (
    <footer id="main-luxury-footer" className="bg-[#050811] text-slate-400 text-xs border-t border-slate-800/80 relative z-20 pb-20 lg:pb-0">
      
      {/* Main Multi-column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Contact (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 p-[1.5px]">
                <div className="w-full h-full bg-[#080d1a] rounded-[9px] flex items-center justify-center">
                  <span className="font-heading font-black text-lg text-amber-400">A</span>
                  <span className="font-heading font-black text-lg text-white -ml-0.5">B</span>
                </div>
              </div>
              <span className="font-heading font-black text-xl text-white tracking-wider">
                APEX<span className="text-amber-400">BUILD</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Bangladesh&rsquo;s premier luxury industrial and architectural marketplace. Supplying verified electrical, plumbing, heavy tools, and construction essentials for modern homes, commercial towers, and mega infrastructure projects.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Apex Tower, Plot 48, Bir Uttam Mir Shawkat Road, Tejgaon I/A, Dhaka-1208, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hotline: +880 9612-888999 / +880 1712-345678</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>support@apexbuild.com.bd</span>
              </div>
            </div>
          </div>

          {/* Col 2: Shop Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white tracking-wider uppercase">
              Shop Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => navigateTo('catalog', { categoryId: 'electrical' })}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Electrical
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('catalog', { categoryId: 'plumbing' })}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Plumbing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('catalog', { categoryId: 'tools-hardware' })}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Others
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('offers')}
                  className="text-amber-400 font-semibold hover:underline text-left"
                >
                  Special Deals &amp; Offers
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Service (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white tracking-wider uppercase">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={onOpenTrackOrder}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <Truck className="w-3.5 h-3.5 text-amber-400" />
                  Track Live Shipment
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('account')}
                  className="hover:text-amber-400 transition-colors"
                >
                  My Customer Account
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('account')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Orders &amp; Invoices
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('account')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Warranty &amp; Returns Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('admin')}
                  className="text-amber-400 font-semibold hover:underline"
                >
                  Admin Management Portal
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Payment Methods & Trust Badges */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CreditCard className="w-4 h-4 text-amber-400" />
            <span>Supported Payment Gateways in Bangladesh:</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-rose-400 font-bold text-[11px]">
              bKash
            </span>
            <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-amber-500 font-bold text-[11px]">
              Nagad
            </span>
            <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-purple-400 font-bold text-[11px]">
              Rocket
            </span>
            <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-blue-400 font-bold text-[11px]">
              VISA / Mastercard
            </span>
            <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-emerald-400 font-bold text-[11px]">
              Cash on Delivery (COD)
            </span>
          </div>
        </div>

        {/* 4. Copyright & Disclaimer */}
        <div className="mt-8 pt-6 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 ApexBuild Luxury Industrial Ltd. All rights reserved. BSTI &amp; ISO 9001 Registered.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Contractor Wholesale</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
