import React from 'react';
import { 
  Home, 
  Grid, 
  Search, 
  Heart, 
  ShoppingBag, 
  User 
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const MobileBottomNav: React.FC<{ onOpenSearch: () => void }> = ({ onOpenSearch }) => {
  const { 
    activePage, 
    navigateTo, 
    cartCount, 
    wishlist, 
    setIsCartDrawerOpen 
  } = useShop();

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      onClick: () => navigateTo('home'),
      isActive: activePage === 'home',
    },
    {
      id: 'catalog',
      label: 'Categories',
      icon: Grid,
      onClick: () => navigateTo('catalog'),
      isActive: activePage === 'catalog',
    },
    {
      id: 'search',
      label: 'Search',
      icon: Search,
      onClick: onOpenSearch,
      isActive: false,
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: Heart,
      badge: wishlist.length > 0 ? wishlist.length : null,
      onClick: () => navigateTo('account'),
      isActive: false,
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: ShoppingBag,
      badge: cartCount > 0 ? cartCount : null,
      onClick: () => setIsCartDrawerOpen(true),
      isActive: false,
      isSpecial: true,
    },
    {
      id: 'account',
      label: 'Account',
      icon: User,
      onClick: () => navigateTo('account'),
      isActive: activePage === 'account',
    },
  ];

  return (
    <div 
      id="mobile-bottom-navigation-bar" 
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#080d1a]/95 backdrop-blur-xl border-t border-slate-800/90 py-2 px-3 lg:hidden"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              id={`mobile-nav-btn-${item.id}`}
              onClick={item.onClick}
              className={`relative flex flex-col items-center justify-center min-w-[48px] min-h-[44px] px-1 py-1 rounded-xl transition-all ${
                item.isActive
                  ? 'text-amber-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${item.isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 bg-amber-500 text-slate-950 font-black text-[9px] rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
