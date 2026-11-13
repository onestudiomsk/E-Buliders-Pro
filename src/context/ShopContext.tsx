import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  Product, 
  Category, 
  Brand, 
  Coupon, 
  Order, 
  CartItem, 
  FilterState, 
  ActivePage, 
  CustomerProfile,
  OrderStatus 
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_CATEGORIES, 
  INITIAL_BRANDS, 
  INITIAL_COUPONS, 
  INITIAL_ORDERS 
} from '../data/mockData';

export interface Toast {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  selectedCategory: null,
  selectedSubcategory: null,
  selectedBrands: [],
  priceRange: [0, 50000],
  inStockOnly: false,
  minRating: null,
  discountOnly: false,
  sortBy: 'popular',
};

const DEFAULT_PROFILE: CustomerProfile = {
  name: 'Sakil Kazi',
  email: 'mrs.sakil.kazi@gmail.com',
  phone: '+880 1712 345678',
  division: 'Dhaka',
  district: 'Dhaka City',
  area: 'Gulshan 2',
  address: 'House 42, Road 71, Diplomatic Zone',
  savedAddresses: [
    {
      id: 'addr-1',
      title: 'Primary Residence (Gulshan)',
      fullAddress: 'House 42, Road 71, Gulshan 2, Dhaka 1212',
      phone: '+880 1712 345678',
      isDefault: true,
    },
    {
      id: 'addr-2',
      title: 'Site Office (Tejgaon)',
      fullAddress: 'Plot 18, Commercial Hub, Tejgaon I/A, Dhaka',
      phone: '+880 1819 223344',
      isDefault: false,
    }
  ]
};

interface ShopContextType {
  products: Product[];
  categories: Category[];
  brands: Brand[];
  coupons: Coupon[];
  orders: Order[];
  cart: CartItem[];
  wishlist: string[];
  activePage: ActivePage;
  selectedProductId: string | null;
  quickViewProduct: Product | null;
  isCartDrawerOpen: boolean;
  filters: FilterState;
  appliedCoupon: Coupon | null;
  toasts: Toast[];
  userProfile: CustomerProfile;
  deliveryZone: 'dhaka' | 'outside';
  
  // Stats & Computed
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  deliveryFee: number;
  cartTotal: number;

  // Navigation & UI controls
  navigateTo: (page: ActivePage, options?: { 
    productId?: string; 
    categoryId?: string; 
    subcategoryId?: string; 
    query?: string;
    scrollToTop?: boolean;
  }) => void;
  setQuickViewProduct: (product: Product | null) => void;
  setIsCartDrawerOpen: (isOpen: boolean) => void;
  setDeliveryZone: (zone: 'dhaka' | 'outside') => void;

  // Cart operations
  addToCart: (product: Product, quantity?: number, openDrawer?: boolean) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;

  // Wishlist
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Filters & Search
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;

  // Coupons
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Orders & Checkout
  placeOrder: (orderData: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    division: string;
    district: string;
    area: string;
    address: string;
    paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card' | 'bank_transfer';
  }) => Order;
  getOrderById: (orderIdOrNumber: string) => Order | undefined;

  // User Profile
  setUserProfile: React.Dispatch<React.SetStateAction<CustomerProfile>>;
  updateUserProfile: (profile: Partial<CustomerProfile>) => void;
  addSavedAddress: (address: { title: string; fullAddress: string; phone: string; isDefault?: boolean }) => void;
  deleteSavedAddress: (id: string) => void;

  // Admin Operations
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string, location?: string) => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;

  // Toasts
  showToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state with localStorage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('apex_products_v3');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [brands] = useState<Brand[]>(INITIAL_BRANDS);
  
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('apex_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('apex_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('apex_cart');
    return saved ? JSON.parse(saved) : [
      { product: INITIAL_PRODUCTS[0], quantity: 2 },
      { product: INITIAL_PRODUCTS[3], quantity: 1 }
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('apex_wishlist');
    return saved ? JSON.parse(saved) : [INITIAL_PRODUCTS[1].id, INITIAL_PRODUCTS[4].id];
  });

  const [userProfile, setUserProfile] = useState<CustomerProfile>(() => {
    try {
      const saved = localStorage.getItem('apex_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_PROFILE,
          ...parsed,
          savedAddresses: Array.isArray(parsed.savedAddresses)
            ? parsed.savedAddresses
            : Array.isArray(parsed.addresses)
            ? parsed.addresses.map((a: any) => ({
                id: a.id || 'addr-' + Math.random(),
                title: a.title || a.fullName || 'Address',
                fullAddress: a.fullAddress || a.streetAddress || `${a.district || ''}, ${a.division || ''}`,
                phone: a.phone || DEFAULT_PROFILE.phone,
                isDefault: Boolean(a.isDefault),
              }))
            : DEFAULT_PROFILE.savedAddresses,
        };
      }
    } catch (e) {
      console.error('Failed to parse user profile from storage', e);
    }
    return DEFAULT_PROFILE;
  });

  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(INITIAL_PRODUCTS[0].id);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [deliveryZone, setDeliveryZone] = useState<'dhaka' | 'outside'>('dhaka');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('apex_products_v3', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('apex_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('apex_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('apex_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('apex_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('apex_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Toast manager
  const showToast = (title: string, message?: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = 'toast_' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Computations
  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      const price = item.product.discountPrice ?? item.product.regularPrice;
      return acc + price * item.quantity;
    }, 0);
  }, [cart]);

  const cartDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (cartSubtotal < appliedCoupon.minOrderAmount) return 0;
    if (appliedCoupon.discountType === 'percentage') {
      return Math.round((cartSubtotal * appliedCoupon.discountValue) / 100);
    }
    return Math.min(appliedCoupon.discountValue, cartSubtotal);
  }, [cartSubtotal, appliedCoupon]);

  const deliveryFee = useMemo(() => {
    if (cart.length === 0) return 0;
    if (cartSubtotal >= 5000) return 0; // Free shipping over ৳5000
    return deliveryZone === 'dhaka' ? 60 : 120;
  }, [cart.length, cartSubtotal, deliveryZone]);

  const cartTotal = useMemo(() => {
    return Math.max(0, cartSubtotal - cartDiscount + deliveryFee);
  }, [cartSubtotal, cartDiscount, deliveryFee]);

  // Navigation Helper
  const navigateTo = (
    page: ActivePage,
    options?: {
      productId?: string;
      categoryId?: string;
      subcategoryId?: string;
      query?: string;
      scrollToTop?: boolean;
    }
  ) => {
    setActivePage(page);

    if (options?.productId) {
      setSelectedProductId(options.productId);
    }

    if (options?.categoryId || options?.subcategoryId || options?.query !== undefined) {
      setFilters((prev) => ({
        ...prev,
        selectedCategory: options.categoryId !== undefined ? options.categoryId : prev.selectedCategory,
        selectedSubcategory: options.subcategoryId !== undefined ? options.subcategoryId : null,
        searchQuery: options.query !== undefined ? options.query : prev.searchQuery,
      }));
    }

    if (options?.scrollToTop !== false) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, openDrawer = true) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    showToast('Added to Cart', `${product.name.slice(0, 32)}... (${quantity}x) added.`, 'success');
    if (openDrawer) {
      setIsCartDrawerOpen(true);
    }
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      showToast('Item Removed', `${item.product.name.slice(0, 24)} was removed from your cart.`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', 'Item was removed from your saved list.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist', 'Item was added to your luxury wishlist.', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Filters
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  // Coupons
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode);
    if (!found) {
      showToast('Invalid Coupon', `Coupon code "${code}" is not valid or has expired.`, 'error');
      return { success: false, message: 'Invalid or expired coupon code.' };
    }
    const minAmount = found.minOrderAmount ?? (found as any).minSpend ?? 0;
    if (cartSubtotal < minAmount) {
      showToast('Minimum Order Required', `Order at least ৳${minAmount.toLocaleString()} to apply this coupon.`, 'warning');
      return { success: false, message: `Minimum order amount is ৳${minAmount.toLocaleString()}` };
    }
    setAppliedCoupon(found);
    showToast('Coupon Applied!', `${found.code} applied: Save ${found.discountType === 'percentage' ? `${found.discountValue}%` : `৳${found.discountValue}`}`, 'success');
    return { success: true, message: 'Coupon applied successfully!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon Removed', 'Coupon was removed from your cart.', 'info');
  };

  // Orders
  const placeOrder = (orderData: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    division: string;
    district: string;
    area: string;
    address: string;
    paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card' | 'bank_transfer';
  }): Order => {
    const orderNumber = `APX-${new Date().getFullYear().toString().slice(2)}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerEmail: orderData.customerEmail,
      division: orderData.division,
      district: orderData.district,
      area: orderData.area,
      address: orderData.address,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'cod' ? 'unpaid' : 'paid',
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.images[0],
        price: item.product.discountPrice ?? item.product.regularPrice,
        quantity: item.quantity,
      })),
      subtotal: cartSubtotal,
      deliveryCharge: deliveryFee,
      discount: cartDiscount,
      total: cartTotal,
      couponCode: appliedCoupon?.code,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      trackingHistory: [
        {
          status: 'pending',
          timestamp: new Date().toISOString(),
          note: `Order placed successfully via ${orderData.paymentMethod.toUpperCase()}. Order verification underway.`,
          location: 'Apex Central Warehouse, Tejgaon Industrial Area, Dhaka',
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderIdOrNumber: string): Order | undefined => {
    const term = orderIdOrNumber.trim().toLowerCase();
    return orders.find(
      (o) => o.id.toLowerCase() === term || o.orderNumber.toLowerCase() === term
    );
  };

  // Profile operations
  const updateUserProfile = (profile: Partial<CustomerProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profile }));
    showToast('Profile Updated', 'Your customer information has been saved.', 'success');
  };

  const addSavedAddress = (address: { title: string; fullAddress: string; phone: string; isDefault?: boolean }) => {
    const newAddr = {
      id: 'addr-' + Date.now(),
      title: address.title,
      fullAddress: address.fullAddress,
      phone: address.phone,
      isDefault: Boolean(address.isDefault),
    };

    setUserProfile((prev) => {
      const addresses = address.isDefault
        ? prev.savedAddresses.map((a) => ({ ...a, isDefault: false }))
        : [...prev.savedAddresses];
      return {
        ...prev,
        savedAddresses: [...addresses, newAddr],
      };
    });
    showToast('Address Saved', 'New delivery address was added to your account.', 'success');
  };

  const deleteSavedAddress = (id: string) => {
    setUserProfile((prev) => ({
      ...prev,
      savedAddresses: prev.savedAddresses.filter((a) => a.id !== id),
    }));
    showToast('Address Deleted', 'Saved address was removed.', 'info');
  };

  // Admin actions
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: 'prod-custom-' + Date.now(),
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast('Product Created', `"${newProduct.name.slice(0, 30)}" added to catalog.`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product Updated', 'Product changes saved successfully.', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product Deleted', 'Product was removed from the catalog.', 'info');
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    note?: string,
    location?: string
  ) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId || ord.orderNumber === orderId) {
          const newHistory = [
            ...ord.trackingHistory,
            {
              status,
              timestamp: new Date().toISOString(),
              note: note || `Status transitioned to ${status.replace('_', ' ').toUpperCase()}`,
              location: location || 'Dhaka Central Hub',
            },
          ];
          return {
            ...ord,
            status,
            trackingHistory: newHistory,
          };
        }
        return ord;
      })
    );
    showToast('Order Status Updated', `Order ${orderId} is now ${status.replace('_', ' ').toUpperCase()}`, 'success');
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [...prev.filter((c) => c.code !== coupon.code), coupon]);
    showToast('Coupon Created', `Coupon ${coupon.code} is active.`, 'success');
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    showToast('Coupon Deleted', `Coupon ${code} removed.`, 'info');
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        brands,
        coupons,
        orders,
        cart,
        wishlist,
        activePage,
        selectedProductId,
        quickViewProduct,
        isCartDrawerOpen,
        filters,
        appliedCoupon,
        toasts,
        userProfile,
        setUserProfile,
        deliveryZone,
        cartCount,
        cartSubtotal,
        cartDiscount,
        deliveryFee,
        cartTotal,
        navigateTo,
        setQuickViewProduct,
        setIsCartDrawerOpen,
        setDeliveryZone,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        setFilters,
        updateFilter,
        resetFilters,
        applyCoupon,
        removeCoupon,
        placeOrder,
        getOrderById,
        updateUserProfile,
        addSavedAddress,
        deleteSavedAddress,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        addCoupon,
        deleteCoupon,
        showToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
