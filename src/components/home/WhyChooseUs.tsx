import React from 'react';
import { 
  ShieldCheck, 
  BadgePercent, 
  Truck, 
  CreditCard, 
  RotateCcw, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      id: 'pillar-quality',
      icon: ShieldCheck,
      title: 'Genuine Quality Products',
      subtitle: 'Carefully selected products from trusted international & local manufacturers with verifiable authenticity barcodes.',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
    {
      id: 'pillar-prices',
      icon: BadgePercent,
      title: 'Competitive Wholesale Prices',
      subtitle: 'Direct-from-factory pricing for corporate builders, engineering contractors, and individual home improvement projects.',
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    },
    {
      id: 'pillar-delivery',
      icon: Truck,
      title: 'Fast 24-48h Delivery',
      subtitle: 'Reliable express logistics across all 64 districts in Bangladesh with real-time GPS tracking and careful handling.',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      id: 'pillar-payment',
      icon: CreditCard,
      title: '100% Secure Payments',
      subtitle: 'Safe payment gateways supporting bKash, Nagad, Rocket, Visa, MasterCard, and Cash on Delivery at your doorstep.',
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    },
    {
      id: 'pillar-returns',
      icon: RotateCcw,
      title: '7-Day Easy Returns',
      subtitle: 'Simple, no-hassle return and replacement process with dedicated engineering support and warranty assistance.',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    },
  ];

  return (
    <section id="why-choose-us-section" className="py-14 sm:py-20 bg-[#080d1a] relative z-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The ApexBuild Commitment</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
            Why Contractors &amp; Homeowners Trust Us
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            We bridge international industrial standards with local Bangladeshi logistical speed to guarantee smooth project completions.
          </p>
        </div>

        {/* 5 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                id={pillar.id}
                className="group flex flex-col justify-between p-6 rounded-3xl bg-[#0c1424] border border-slate-800 hover:border-amber-500/40 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-amber-500/5 hover:-translate-y-1"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${pillar.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-heading font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {pillar.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Guarantee</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
