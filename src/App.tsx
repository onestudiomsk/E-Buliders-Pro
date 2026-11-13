import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { QuickViewModal } from './components/common/QuickViewModal';
import { ToastContainer } from './components/common/ToastContainer';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { TrackOrderModal } from './components/tracking/TrackOrderModal';

// Home Sections
import { HeroBanner } from './components/home/HeroBanner';
import { CategoryGrid } from './components/home/CategoryGrid';
import { FlashSaleSection } from './components/home/FlashSaleSection';
import { FeaturedProducts } from './components/home/FeaturedProducts';
import { PromoBanners } from './components/home/PromoBanners';
import { WhyChooseUs } from './components/home/WhyChooseUs';

// Pages
import { CatalogPage } from './components/catalog/CatalogPage';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { AccountDashboard } from './components/account/AccountDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { OffersPage } from './components/offers/OffersPage';

const MainLayout: React.FC = () => {
  const { activePage } = useShop();
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);

  const handleOpenSearch = () => {
    const searchInput = document.getElementById('header-search-input');
    if (searchInput) {
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* 1. Global Sticky Header & Mega Menu */}
      <Header onOpenTrackOrder={() => setIsTrackOrderOpen(true)} />

      {/* 2. Dynamic Main View Content */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <HeroBanner />
            <CategoryGrid />
            <FlashSaleSection />
            <FeaturedProducts />
            <PromoBanners />
            <WhyChooseUs />
          </>
        )}

        {activePage === 'catalog' && <CatalogPage />}
        {activePage === 'product-detail' && <ProductDetailPage />}
        {activePage === 'checkout' && <CheckoutPage />}
        {activePage === 'account' && <AccountDashboard />}
        {activePage === 'admin' && <AdminDashboard />}
        {activePage === 'offers' && <OffersPage />}
      </main>

      {/* 3. Luxury Multi-Column Footer */}
      <Footer onOpenTrackOrder={() => setIsTrackOrderOpen(true)} />

      {/* 4. Global Drawers, Modals & Notifications */}
      <CartDrawer />
      <QuickViewModal />
      <ToastContainer />
      <TrackOrderModal isOpen={isTrackOrderOpen} onClose={() => setIsTrackOrderOpen(false)} />
      <MobileBottomNav onOpenSearch={handleOpenSearch} />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}
