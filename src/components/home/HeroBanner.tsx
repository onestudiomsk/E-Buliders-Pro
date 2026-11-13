import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Award, 
  Sparkles, 
  Zap, 
  Droplets, 
  Wrench, 
  CheckCircle2 
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const HeroBanner: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section id="hero-banner-section" className="relative overflow-hidden bg-[#070c18] py-12 md:py-20 lg:py-24 border-b border-slate-800">
      {/* Cinematic ambient background glow lights */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle grid line overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Copy & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* VIP Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>BANGLADESH&rsquo;S #1 LUXURY INDUSTRIAL MARKETPLACE</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-black text-3xl sm:text-5xl xl:text-6xl text-white tracking-tight leading-[1.1]">
              Everything You Need for{' '}
              <span className="gold-gradient-text">Electrical</span>,{' '}
              <span className="electric-gradient-text">Plumbing</span> &amp; Hardware
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Premium quality products for homes, offices, construction and professional projects. Certified genuine materials delivered across all 64 districts in Bangladesh.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-shop-now-btn"
                onClick={() => navigateTo('catalog')}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-heading font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-explore-categories-btn"
                onClick={() => {
                  const el = document.getElementById('shop-by-category-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-4 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-heading font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Categories</span>
              </button>
            </div>

            {/* Key Trust Checkmarks */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300 border-t border-slate-800/80">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                15,000+ Verified SKUs
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                64 Districts Fast Delivery
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                100% Genuine Guaranteed
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Display (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Luxury Hero Visual Card */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-gradient-to-b from-slate-900 to-[#080d1a] p-2">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=900&q=80"
                    alt="Luxury Industrial Hardware"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-[#080d1a]/40 to-transparent" />
                  
                  {/* Floating Overlays */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0c1424]/90 backdrop-blur-md border border-slate-700/90 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                          Featured Collection Spotlight
                        </span>
                        <h4 className="text-sm font-bold text-white">Architectural &amp; Industrial Line</h4>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
                        Save 20%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Electrical & Switches */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute -top-6 -left-6 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-[#0e172a]/95 backdrop-blur-xl border border-amber-500/30 shadow-2xl z-20"
              >
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Modular Gang Switch</p>
                  <p className="text-[10px] text-amber-400 font-semibold">Frameless Luxury Gold</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Sanitary & Commode */}
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-[#0e172a]/95 backdrop-blur-xl border border-cyan-500/30 shadow-2xl z-20"
              >
                <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Rimless Smart Commode</p>
                  <p className="text-[10px] text-cyan-400 font-semibold">Nano-Glaze Sanitary</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
