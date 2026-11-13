import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Filter, 
  Grid3X3, 
  List, 
  RotateCcw, 
  Search, 
  Star, 
  X, 
  ChevronDown,
  ChevronRight, 
  Sparkles,
  SlidersHorizontal,
  Check,
  Zap,
  Droplets,
  Wrench,
  Layers,
  FolderOpen
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../product/ProductCard';
import { Product, CategoryId } from '../../types';

export const CatalogPage: React.FC = () => {
  const { 
    products, 
    categories, 
    filters, 
    setFilters, 
    updateFilter, 
    resetFilters,
    navigateTo 
  } = useShop();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Track which category drawers/accordions are expanded in the sidebar
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    electrical: true,
    plumbing: true,
    'tools-hardware': true,
  });

  // Auto-expand the currently selected category drawer when filters.selectedCategory changes
  useEffect(() => {
    if (filters.selectedCategory) {
      setExpandedCategories((prev) => ({
        ...prev,
        [filters.selectedCategory!]: true,
      }));
    }
  }, [filters.selectedCategory]);

  const toggleCategoryDrawer = (catId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const handleCategoryClick = (catId: string) => {
    if (filters.selectedCategory === catId) {
      // Toggle expansion if already selected
      toggleCategoryDrawer(catId);
    } else {
      // Select category and open its drawer
      updateFilter('selectedCategory', catId);
      updateFilter('selectedSubcategory', null);
      setExpandedCategories((prev) => ({
        ...prev,
        [catId]: true,
      }));
    }
  };

  const handleSubcategoryClick = (catId: string, subId: string | null) => {
    if (filters.selectedCategory !== catId) {
      updateFilter('selectedCategory', catId);
    }
    updateFilter('selectedSubcategory', subId);
    if (isMobileFilterOpen) {
      setIsMobileFilterOpen(false);
    }
  };

  // Helper for category icons
  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'electrical':
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 'plumbing':
        return <Droplets className="w-4 h-4 text-cyan-400" />;
      case 'tools-hardware':
        return <Wrench className="w-4 h-4 text-emerald-400" />;
      default:
        return <Layers className="w-4 h-4 text-amber-400" />;
    }
  };

  // Filter computation
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matches = 
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.categoryId.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // 2. Category
      if (filters.selectedCategory && p.categoryId !== filters.selectedCategory) {
        return false;
      }

      // 3. Subcategory
      if (filters.selectedSubcategory && p.subcategoryId !== filters.selectedSubcategory) {
        return false;
      }

      // 4. Price Range
      const effectivePrice = p.discountPrice ?? p.regularPrice;
      if (effectivePrice < filters.priceRange[0] || effectivePrice > filters.priceRange[1]) {
        return false;
      }

      // 5. In Stock
      if (filters.inStockOnly && (!p.inStock || p.stockQuantity <= 0)) {
        return false;
      }

      // 6. Rating
      if (filters.minRating && p.rating < filters.minRating) {
        return false;
      }

      // 7. Discount Only
      if (filters.discountOnly && !p.discountPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.discountPrice ?? a.regularPrice;
      const priceB = b.discountPrice ?? b.regularPrice;

      switch (filters.sortBy) {
        case 'price-low':
          return priceA - priceB;
        case 'price-high':
          return priceB - priceA;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        case 'popular':
        default:
          return b.reviewCount - a.reviewCount;
      }
    });
  }, [products, filters]);

  const renderFilterSidebarContent = () => (
    <div className="space-y-6">
      {/* Category Filter with Drawer / Accordion Subcategories */}
      <div className="p-5 bg-[#0c1424] border border-slate-800 rounded-2xl space-y-3 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Categories &amp; Subcategories</span>
          </h4>
          {filters.selectedCategory && (
            <button
              onClick={() => {
                updateFilter('selectedCategory', null);
                updateFilter('selectedSubcategory', null);
              }}
              className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold"
            >
              Clear
            </button>
          )}
        </div>

        {/* All Categories Option */}
        <button
          onClick={() => {
            updateFilter('selectedCategory', null);
            updateFilter('selectedSubcategory', null);
          }}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            filters.selectedCategory === null
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-slate-300 hover:bg-slate-800/60'
          }`}
        >
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>All Categories</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md">
            {products.length}
          </span>
        </button>

        {/* Categories List with Drawer Accordions */}
        <div className="space-y-2 pt-1">
          {categories.map((cat) => {
            const isCategoryActive = filters.selectedCategory === cat.id;
            const isDrawerOpen = !!expandedCategories[cat.id];

            return (
              <div 
                key={cat.id} 
                className={`rounded-xl border transition-all overflow-hidden ${
                  isCategoryActive 
                    ? 'bg-[#101a2f] border-amber-500/30 shadow-md shadow-amber-500/5' 
                    : 'bg-slate-900/40 border-slate-800/70 hover:border-slate-700/80'
                }`}
              >
                {/* Category Header Row / Trigger */}
                <div 
                  className={`flex items-center justify-between p-2.5 cursor-pointer transition-colors ${
                    isCategoryActive ? 'bg-amber-500/10 text-amber-300' : 'text-slate-200 hover:bg-slate-800/50'
                  }`}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`p-1.5 rounded-lg border shrink-0 ${
                      isCategoryActive 
                        ? 'bg-amber-500/20 border-amber-500/40' 
                        : 'bg-slate-800/80 border-slate-700'
                    }`}>
                      {getCategoryIcon(cat.id)}
                    </div>
                    <div className="truncate">
                      <span className={`text-xs font-bold block truncate ${
                        isCategoryActive ? 'text-white' : 'text-slate-200'
                      }`}>
                        {cat.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                      {cat.featuredCount}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCategoryDrawer(cat.id);
                      }}
                      className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-700/50 transition-colors"
                      title={isDrawerOpen ? 'Close Subcategories' : 'Open Subcategories'}
                    >
                      <ChevronDown 
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isDrawerOpen ? 'rotate-180 text-amber-400' : 'text-slate-500'
                        }`} 
                      />
                    </button>
                  </div>
                </div>

                {/* Subcategory Drawer Container (Accordion) */}
                <AnimatePresence initial={false}>
                  {isDrawerOpen && (
                    <motion.div
                      key={`drawer-${cat.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden bg-[#0a101f]/95 border-t border-slate-800/80"
                    >
                      <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.03,
                            },
                          },
                        }}
                        className="p-2 space-y-1"
                      >
                        {/* All in this category */}
                        <motion.button
                          variants={{
                            hidden: { opacity: 0, y: -4 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
                          }}
                          type="button"
                          onClick={() => handleSubcategoryClick(cat.id, null)}
                          className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all ${
                            isCategoryActive && !filters.selectedSubcategory
                              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            All {cat.name}
                          </span>
                          <span className="text-[10px] font-mono opacity-80">
                            {cat.featuredCount}
                          </span>
                        </motion.button>

                        {/* Subcategory list items */}
                        {cat.subcategories.map((sub) => {
                          const isSubActive = isCategoryActive && filters.selectedSubcategory === sub.id;

                          return (
                            <motion.button
                              key={sub.id}
                              variants={{
                                hidden: { opacity: 0, y: -4 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
                              }}
                              type="button"
                              id={`sidebar-subcat-${sub.id}`}
                              onClick={() => handleSubcategoryClick(cat.id, sub.id)}
                              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all text-left group ${
                                isSubActive
                                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold shadow-sm'
                                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                              }`}
                            >
                              <span className="truncate pr-2 group-hover:translate-x-0.5 transition-transform">
                                {sub.name}
                              </span>
                              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded shrink-0 ${
                                isSubActive
                                  ? 'bg-amber-500/30 text-amber-200 font-semibold'
                                  : 'text-slate-500 bg-slate-800/70 group-hover:text-slate-300'
                              }`}>
                                {sub.count}
                              </span>
                            </motion.button>
                          );
                        })}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Price Slider Filter */}
      <div className="p-5 bg-[#0c1424] border border-slate-800 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-400">
            Price Range (৳)
          </h4>
          <span className="text-xs font-bold text-amber-400">
            ৳{filters.priceRange[0].toLocaleString()} - ৳{filters.priceRange[1].toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="50000"
          step="500"
          value={filters.priceRange[1]}
          onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], Number(e.target.value)])}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
        />
      </div>

      {/* Toggles (Stock & Discounts) */}
      <div className="p-5 bg-[#0c1424] border border-slate-800 rounded-2xl space-y-3">
        <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-400">
          Preferences
        </h4>
        <div className="space-y-2 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => updateFilter('inStockOnly', e.target.checked)}
              className="w-4 h-4 rounded border-slate-700 text-amber-500 bg-slate-800"
            />
            <span>In Stock Only</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={filters.discountOnly}
              onChange={(e) => updateFilter('discountOnly', e.target.checked)}
              className="w-4 h-4 rounded border-slate-700 text-amber-500 bg-slate-800"
            />
            <span>Discounted Deals Only</span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div id="catalog-page-container" className="min-h-screen bg-[#080d1a] py-8 sm:py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Filter Sidebar (Desktop 3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            
            {/* Filter Header with Reset */}
            <div className="flex items-center justify-between p-4 bg-[#0c1424] border border-slate-800 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                <span>Filters &amp; Refinements</span>
              </div>
              <button
                id="reset-all-filters-btn"
                onClick={resetFilters}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Sidebar content */}
            {renderFilterSidebarContent()}
          </aside>

          {/* Right Column: Products Grid & Sort Controls (9 cols) */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Top Toolbar: Search summary, Sort dropdown, Mobile Filter button, Grid/List switch */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#0c1424] border border-slate-800 rounded-2xl">
              
              {/* Mobile Filter trigger */}
              <button
                id="mobile-filter-trigger-btn"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-slate-800 text-amber-400 rounded-xl text-xs font-bold border border-slate-700"
              >
                <Filter className="w-4 h-4" />
                <span>Categories &amp; Filters</span>
              </button>

              {/* Active search pill if any */}
              {filters.searchQuery && (
                <div className="flex items-center gap-2 text-xs bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl text-slate-300">
                  <span>Keyword: <strong className="text-amber-400">&ldquo;{filters.searchQuery}&rdquo;</strong></span>
                  <button
                    onClick={() => updateFilter('searchQuery', '')}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Active Category / Subcategory indicator */}
              {(filters.selectedCategory || filters.selectedSubcategory) && (
                <div className="hidden sm:flex items-center gap-2 text-xs bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-xl text-slate-300">
                  <span>Filter:</span>
                  {filters.selectedCategory && (
                    <span className="font-bold text-amber-400">
                      {categories.find(c => c.id === filters.selectedCategory)?.name}
                    </span>
                  )}
                  {filters.selectedSubcategory && (
                    <>
                      <ChevronRight className="w-3 h-3 text-slate-500" />
                      <span className="font-bold text-amber-300">
                        {categories
                          .find(c => c.id === filters.selectedCategory)
                          ?.subcategories.find(s => s.id === filters.selectedSubcategory)?.name}
                      </span>
                    </>
                  )}
                  <button
                    onClick={() => {
                      updateFilter('selectedCategory', null);
                      updateFilter('selectedSubcategory', null);
                    }}
                    className="text-slate-400 hover:text-white ml-1"
                    title="Clear filter"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Sort by dropdown */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs text-slate-400 hidden sm:inline">Sort By:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilter('sortBy', e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-2 outline-none focus:border-amber-400 font-semibold"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated (5★)</option>
                </select>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-700">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Display */}
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center bg-[#0c1424] border border-slate-800 rounded-3xl space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 mx-auto">
                  <Search className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="font-heading font-bold text-lg text-white">No products match your criteria</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Try clearing some filter tags, opening the subcategory drawer, or searching with broader keywords.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:bg-amber-400 transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-[#0c1424] border border-slate-800 hover:border-amber-500/40 transition-all"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full sm:w-44 aspect-square object-cover rounded-xl border border-slate-700 shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-amber-400 uppercase">{product.categoryName}</span>
                          <span className="text-xs text-slate-500 font-mono">SKU: {product.sku}</span>
                        </div>
                        <h4 
                          onClick={() => navigateTo('product-detail', { productId: product.id })}
                          className="text-base font-bold text-white hover:text-amber-300 cursor-pointer transition-colors"
                        >
                          {product.name}
                        </h4>
                        <p className="text-xs text-slate-300 line-clamp-2 mt-1">{product.description}</p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800">
                        <div>
                          <span className="font-heading font-black text-xl text-amber-400">
                            ৳{(product.discountPrice ?? product.regularPrice).toLocaleString()}
                          </span>
                          {product.discountPrice && (
                            <span className="text-xs text-slate-500 line-through ml-2">
                              ৳{product.regularPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => navigateTo('product-detail', { productId: product.id })}
                          className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all"
                        >
                          View Specifications
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer Modal */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xs bg-[#080d1a] border-l border-slate-800 h-full p-5 overflow-y-auto flex flex-col justify-between shadow-2xl z-10"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                    <h3 className="font-heading font-bold text-sm text-white">Categories &amp; Filters</h3>
                  </div>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/60"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {renderFilterSidebarContent()}
              </div>

              <div className="pt-4 border-t border-slate-800 flex gap-2 shrink-0">
                <button
                  onClick={() => {
                    resetFilters();
                    setIsMobileFilterOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold hover:bg-slate-800"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 shadow-md"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

