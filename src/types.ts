export type CategoryId = 
  | 'electrical'
  | 'plumbing'
  | 'tools-hardware';

export interface SubCategory {
  id: string;
  name: string;
  count: number;
}

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
  image: string;
  subcategories: SubCategory[];
  featuredCount: number;
  badge?: string;
}

export interface ProductReview {
  id: string;
  userName: string;
  userLocation: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: CategoryId;
  subcategoryId: string;
  regularPrice: number; // in BDT (৳)
  discountPrice?: number; // in BDT (৳)
  rating: number;
  reviewCount: number;
  sku: string;
  inStock: boolean;
  stockQuantity: number;
  isFeatured?: boolean;
  isFlashSale?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  flashSaleEnds?: string; // ISO string
  images: string[];
  description: string;
  shortDescription: string;
  features: string[];
  specifications: ProductSpecification[];
  warranty: string;
  weightOrSize: string;
  originCountry: string;
  frequentlyBoughtWith?: string[]; // array of product IDs
  reviews: ProductReview[];
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  origin: string;
  productCount: number;
  description: string;
  featuredCategories: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  description: string;
  expiresAt: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  division: string;
  district: string;
  area: string;
  address: string;
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card' | 'bank_transfer';
  paymentStatus: 'paid' | 'unpaid' | 'refunded';
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  couponCode?: string;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  trackingHistory: {
    status: OrderStatus;
    timestamp: string;
    note: string;
    location: string;
  }[];
}

export interface CustomerProfile {
  name: string;
  email: string;
  phone: string;
  division: string;
  district: string;
  area: string;
  address: string;
  savedAddresses: {
    id: string;
    title: string;
    fullAddress: string;
    phone: string;
    isDefault: boolean;
  }[];
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  selectedBrands?: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
  minRating: number | null;
  discountOnly: boolean;
  sortBy: 'popular' | 'newest' | 'price-low' | 'price-high' | 'rating';
}

export type ActivePage = 
  | 'home'
  | 'catalog'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'account'
  | 'admin'
  | 'track-order'
  | 'offers';
