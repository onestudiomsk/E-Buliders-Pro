import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Truck, 
  ShieldCheck, 
  PhoneCall, 
  Menu, 
  X, 
  Sparkles, 
  ChevronDown, 
  LayoutDashboard,
  Zap,
  ArrowRight,
  Droplets,
  Wrench,
  Layers
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { MegaMenu } from './MegaMenu';

export const Header: React.FC<{ onOpenTrackOrder: () => void }> = ({ onOpenTrackOrder }) => {
  const { 
    cartCount, 
    cartSubtotal, 
    wishlist, 
    setIsCartDrawerOpen, 
    navigateTo, 
    activePage,
    categories,
    products
  } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);
  const [expandedMobileCategories, setExpandedMobileCategories] = useState<Record<string, boolean>>({});
  const searchRef = useRef<HTMLDivElement>(null);

  const toggleMobileCat = (catId: string) => {
    setExpandedMobileCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  // Filter search live suggestions
  const liveSuggestions = searchQuery.trim().length > 1
    ? products
        .filter((p) => {
          const matchQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             p.categoryId.toLowerCase().includes(searchQuery.toLowerCase());
          const matchCat = selectedCategoryFilter === 'all' || p.categoryId === selectedCategoryFilter;
          return matchQuery && matchCat;
        })
        .slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('catalog', { 
        query: searchQuery.trim(),
        categoryId: selectedCategoryFilter !== 'all' ? selectedCategoryFilter : undefined 
      });
      setIsSearchOpen(false);
    }
  };

  const trendingSearches = [
    'Modular Switch',
    'Cordless Impact Drill',
    '2.5RM Copper Wire',
    'Rimless Commode',
    'CPVC Water Pipe'
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main Sticky Header */}
      <div className="bg-[#080d1a]/95 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Left: Brand Logo & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo */}
            <button
              id="brand-logo-btn"
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-[1.5px] shadow-lg shadow-amber-500/10 group-hover:shadow-amber-500/25 transition-all">
                <div className="w-full h-full bg-[#080d1a] rounded-[10px] flex items-center justify-center">
                  <span className="font-heading font-black text-xl text-amber-400 tracking-tighter">A</span>
                  <span className="font-heading font-black text-xl text-white tracking-tighter -ml-0.5">B</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-black text-xl tracking-wider text-white group-hover:text-amber-400 transition-colors">
                    APEX<span className="text-amber-400">BUILD</span>
                  </span>
                  <span className="hidden sm:inline-block text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    LUXURY
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase -mt-0.5 hidden sm:block">
                  Industrial Hardware & Supplies
                </p>
              </div>
            </button>
          </div>

          {/* Center: Intelligent Product Search Bar */}
          <div ref={searchRef} className="flex-1 max-w-2xl relative hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="relative flex-1 flex items-center bg-[#0e1626] border border-slate-700/80 rounded-2xl focus-within:border-amber-400/80 focus-within:ring-2 focus-within:ring-amber-500/20 shadow-inner transition-all overflow-hidden">
                
                {/* Category Dropdown Picker */}
                <div className="relative border-r border-slate-700/80 shrink-0">
                  <button
                    type="button"
                    id="search-category-dropdown-btn"
                    onClick={() => setIsCategorySelectOpen(!isCategorySelectOpen)}
                    className="h-11 px-3.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/40 hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
                  >
                    <span>
                      {selectedCategoryFilter === 'all' 
                        ? 'All Categories' 
                        : categories.find(c => c.id === selectedCategoryFilter)?.name.split('&')[0] || 'Category'}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Dropdown Options */}
                  <AnimatePresence>
                    {isCategorySelectOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-0 mt-1.5 w-56 bg-[#0c1424] border border-slate-700 rounded-xl py-1 shadow-2xl z-50 overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => { setSelectedCategoryFilter('all'); setIsCategorySelectOpen(false); }}
                          className={`w-full text-left px-3.5 py-2 text-xs hover:bg-slate-800 transition-colors ${
                            selectedCategoryFilter === 'all' ? 'text-amber-400 font-semibold bg-amber-500/10' : 'text-slate-300'
                          }`}
                        >
                          All Categories
                        </button>
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => { setSelectedCategoryFilter(cat.id); setIsCategorySelectOpen(false); }}
                            className={`w-full text-left px-3.5 py-2 text-xs hover:bg-slate-800 transition-colors ${
                              selectedCategoryFilter === cat.id ? 'text-amber-400 font-semibold bg-amber-500/10' : 'text-slate-300'
                            }`}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Main Text Input */}
                <input
                  type="text"
                  id="main-product-search-input"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder="Search electrical, plumbing & hardware tools..."
                  className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-400 px-4 py-2.5 outline-none font-normal"
                />

                {/* Clear search query */}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1.5 text-slate-400 hover:text-white mr-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                {/* Submit Search Icon Button */}
                <button
                  type="submit"
                  id="main-search-submit-btn"
                  className="h-11 px-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-sm transition-all flex items-center justify-center gap-1.5"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Live Search Suggestions Dropdown */}
            {isSearchOpen && (searchQuery.trim().length > 1 || trendingSearches.length > 0) && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#0c1424] border border-slate-700/90 rounded-2xl p-4 shadow-2xl z-50 max-h-96 overflow-y-auto">
                {liveSuggestions.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 pb-1 border-b border-slate-800">
                      Product Matches ({liveSuggestions.length})
                    </p>
                    {liveSuggestions.map((item) => (
                      <div
                        key={item.id}
                        id={`search-item-${item.id}`}
                        onClick={() => {
                          navigateTo('product-detail', { productId: item.id });
                          setIsSearchOpen(false);
                        }}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/80 cursor-pointer transition-colors group"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg border border-slate-700 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-200 group-hover:text-white truncate font-medium">
                            {item.name}
                          </p>
                          <p className="text-xs font-bold text-white mt-0.5">
                            ৳{(item.discountPrice ?? item.regularPrice).toLocaleString()}
                            {item.discountPrice && (
                              <span className="text-[11px] text-slate-400 line-through ml-2 font-normal">
                                ৳{item.regularPrice.toLocaleString()}
                              </span>
                            )}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                    ))}
                  </div>
                ) : searchQuery.trim().length > 1 ? (
                  <div className="py-4 text-center text-slate-400 text-sm">
                    No exact products found for &ldquo;{searchQuery}&rdquo;. Try browsing all categories.
                  </div>
                ) : null}

                {/* Trending searches */}
                <div className="mt-3 pt-3 border-t border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Popular Inquiries:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {trendingSearches.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setSearchQuery(tag);
                          navigateTo('catalog', { query: tag });
                          setIsSearchOpen(false);
                        }}
                        className="text-xs bg-slate-800/80 hover:bg-amber-500/10 hover:text-amber-300 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Actions (Wishlist, Account, Cart Drawer, Admin Toggle) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Wishlist button */}
            <button
              id="header-wishlist-btn"
              onClick={() => navigateTo('account')}
              className={`relative p-2.5 rounded-xl border transition-all ${
                wishlist.length > 0
                  ? 'border-amber-500/30 bg-amber-500/5 text-amber-400 hover:bg-amber-500/10'
                  : 'border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-500 text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center shadow-md">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account Dashboard button */}
            <button
              id="header-account-btn"
              onClick={() => navigateTo('account')}
              className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 ${
                activePage === 'account'
                  ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                  : 'border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
              title="My Account"
              aria-label="User Account"
            >
              <User className="w-5 h-5" />
              <span className="hidden xl:inline text-xs font-semibold text-slate-200">Account</span>
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              id="header-cart-drawer-trigger"
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
              aria-label="Open Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-slate-950 text-amber-400 font-black text-[10px] rounded-full flex items-center justify-center border border-amber-400">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="text-left hidden sm:block">
                <span className="text-[10px] uppercase tracking-wider block font-semibold text-slate-900 leading-none">
                  Cart
                </span>
                <span className="text-xs font-black text-slate-950 leading-tight">
                  ৳{cartSubtotal.toLocaleString()}
                </span>
              </div>
            </button>

            {/* Admin Hub Toggle Button */}
            <button
              id="header-admin-hub-btn"
              onClick={() => navigateTo('admin')}
              className={`p-2.5 rounded-xl border transition-all text-xs font-semibold flex items-center gap-1.5 ${
                activePage === 'admin'
                  ? 'border-amber-400 bg-amber-400 text-slate-950 shadow-md'
                  : 'border-slate-700 bg-slate-900/80 text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/10'
              }`}
              title="Admin Management Panel"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden md:inline">Admin Hub</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              id="mobile-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products & tools in BD..."
              className="w-full bg-[#0c1424] border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3 bg-amber-500 text-slate-950 rounded-lg flex items-center justify-center font-bold text-xs"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* 3. Mega-Menu Navigation */}
      <MegaMenu />

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[110px] z-50 bg-[#080d1a]/95 backdrop-blur-2xl lg:hidden p-5 overflow-y-auto border-t border-slate-800">
          <div className="space-y-4">
            <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Categories</span>
              <button
                onClick={() => {
                  navigateTo('catalog');
                  setIsMobileMenuOpen(false);
                }}
                className="text-xs text-amber-400 font-semibold hover:underline"
              >
                View All Catalog
              </button>
            </div>
            
            {categories.map((cat) => {
              const isExpanded = !!expandedMobileCategories[cat.id];
              return (
                <div key={cat.id} className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden">
                  <div className="flex items-center justify-between p-3">
                    <button
                      id={`mobile-cat-${cat.id}`}
                      onClick={() => {
                        navigateTo('catalog', { categoryId: cat.id });
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex-1 text-left text-sm font-semibold text-slate-200 hover:text-amber-400 transition-colors"
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-slate-500 font-normal ml-2">({cat.featuredCount})</span>
                    </button>
                    <button
                      onClick={() => toggleMobileCat(cat.id)}
                      className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                      title={isExpanded ? 'Collapse' : 'Expand subcategories'}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-amber-400' : 'text-slate-500'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Subcategories Drawer */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        key={`mobile-drawer-${cat.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-[#0b1222] border-t border-slate-800/80 px-3 py-2 space-y-1 overflow-hidden"
                      >
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          variants={{
                            hidden: { opacity: 0 },
                            visible: {
                              opacity: 1,
                              transition: { staggerChildren: 0.025 }
                            }
                          }}
                          className="space-y-1"
                        >
                          <motion.button
                            variants={{
                              hidden: { opacity: 0, y: -4 },
                              visible: { opacity: 1, y: 0, transition: { duration: 0.18 } }
                            }}
                            onClick={() => {
                              navigateTo('catalog', { categoryId: cat.id });
                              setIsMobileMenuOpen(false);
                            }}
                            className="w-full text-left py-1.5 px-2 text-xs font-bold text-amber-400 hover:bg-slate-800/60 rounded-lg flex items-center justify-between transition-colors"
                          >
                            <span>All {cat.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{cat.featuredCount}</span>
                          </motion.button>
                          {cat.subcategories.map((sub) => (
                            <motion.button
                              key={sub.id}
                              variants={{
                                hidden: { opacity: 0, y: -4 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.18 } }
                              }}
                              onClick={() => {
                                navigateTo('catalog', { categoryId: cat.id, subcategoryId: sub.id });
                                setIsMobileMenuOpen(false);
                              }}
                              className="w-full text-left py-1.5 px-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg flex items-center justify-between transition-colors"
                            >
                              <span className="truncate pr-2">{sub.name}</span>
                              <span className="text-[10px] text-slate-500 font-mono">{sub.count}</span>
                            </motion.button>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <button
                onClick={() => { navigateTo('offers'); setIsMobileMenuOpen(false); }}
                className="w-full text-left p-2.5 text-sm font-semibold text-amber-400 hover:bg-slate-800 rounded-lg"
              >
                🔥 Flash Deals & Discounts
              </button>
              <button
                onClick={() => { onOpenTrackOrder(); setIsMobileMenuOpen(false); }}
                className="w-full text-left p-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-800 rounded-lg"
              >
                🚚 Track My Order
              </button>
              <button
                onClick={() => { navigateTo('admin'); setIsMobileMenuOpen(false); }}
                className="w-full text-left p-2.5 text-sm font-semibold text-amber-300 bg-amber-500/10 rounded-lg"
              >
                ⚙️ Admin Management Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
