import { Category, Brand, Product, Coupon, Order } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'electrical',
    name: 'Electrical',
    tagline: 'Premium modular switches, copper cables, circuit breakers, lighting, fans & tools',
    image: 'https://raw.githubusercontent.com/mskhereiam/E-Commerce-Category-Images/refs/heads/main/Electrical.jpg',
    featuredCount: 450,
    badge: 'Popular',
    subcategories: [
      { id: 'switch-socket-board', name: 'Switch, Socket & Board', count: 140 },
      { id: 'wire-cable', name: 'Wire & Cable', count: 110 },
      { id: 'elec-pipe-fittings', name: 'Pipe & Fittings', count: 75 },
      { id: 'circuit-breaker-db', name: 'Circuit Breaker & DB', count: 65 },
      { id: 'light-lighting', name: 'Light & Lighting', count: 95 },
      { id: 'fan', name: 'Fan', count: 45 },
      { id: 'electrical-accessories', name: 'Electrical Accessories', count: 60 },
      { id: 'electrical-tools', name: 'Electrical Tools', count: 50 },
    ],
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    tagline: 'Luxury sanitary fixtures, CP brass mixers, thermostatic rain showers, pipes & drainage',
    image: 'https://raw.githubusercontent.com/mskhereiam/E-Commerce-Category-Images/refs/heads/main/Plumbing%20New.jpg',
    featuredCount: 390,
    badge: 'Best Value',
    subcategories: [
      { id: 'commode-sanitary', name: 'Commode & Sanitary', count: 85 },
      { id: 'basin-sink', name: 'Basin & Sink', count: 65 },
      { id: 'plumb-pipe-fittings', name: 'Pipe & Fittings', count: 120 },
      { id: 'tap-mixer', name: 'Tap & Mixer', count: 95 },
      { id: 'shower', name: 'Shower', count: 55 },
      { id: 'valve-drainage', name: 'Valve & Drainage', count: 70 },
      { id: 'bathroom-accessories', name: 'Bathroom Accessories', count: 80 },
      { id: 'plumbing-accessories-tools', name: 'Plumbing Accessories & Tools', count: 50 },
    ],
  },
  {
    id: 'tools-hardware',
    name: 'Others',
    tagline: 'Heavy-duty power tools, precision hand tools, measuring devices, safety gear, hardware & fasteners',
    image: 'https://raw.githubusercontent.com/mskhereiam/E-Commerce-Category-Images/refs/heads/main/others.jpg',
    featuredCount: 680,
    badge: 'Industrial Grade',
    subcategories: [
      { id: 'hand-tools', name: 'Hand Tools', count: 175 },
      { id: 'power-tools', name: 'Power Tools', count: 180 },
      { id: 'measuring-tools', name: 'Measuring Tools', count: 45 },
      { id: 'safety-equipment', name: 'Safety Equipment', count: 85 },
      { id: 'hardware-fasteners', name: 'Hardware & Fasteners', count: 120 },
      { id: 'construction-materials', name: 'Construction Materials', count: 120 },
      { id: 'adhesives-sealants-tapes', name: 'Adhesives, Sealants & Tapes', count: 65 },
      { id: 'cleaning-maintenance', name: 'Cleaning & Maintenance', count: 40 },
      { id: 'other-accessories', name: 'Other Accessories', count: 50 },
    ],
  },
];

export const INITIAL_BRANDS: Brand[] = [];

export const INITIAL_PRODUCTS: Product[] = [
  // --- ELECTRICAL PRODUCTS ---
  {
    id: 'prod-elec-01',
    name: 'AvatarOn 4-Gang Luxury Switch (Dark Charcoal & Gold Rim)',
    categoryId: 'electrical',
    subcategoryId: 'switch-socket-board',
    regularPrice: 3850,
    discountPrice: 3250,
    rating: 4.9,
    reviewCount: 148,
    sku: 'AVT-4G-GLD-STD',
    inStock: true,
    stockQuantity: 45,
    isFeatured: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1558384661-820d88b43f9a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'The award-winning AvatarOn switch blends ultra-pure frameless luxury aesthetics with flawless tactile click response. Features a patented "Slim Rocker, Sure Click" mechanism and gold-accented chamfered border designed for high-end residential interiors and corporate suites.',
    shortDescription: 'Frameless 4-gang 16AX luxury light switch with brushed gold border accent.',
    features: [
      'Award-winning frameless luxury design with matte dark charcoal finish',
      'Integrated LED subtle locator beacon for night visibility',
      'Silver alloy contacts with 40,000+ mechanical click lifespan',
      'Easy snap-on custom front faceplate replacement',
      'Fire-retardant high-grade polycarbonate housing (UL94 V-0)'
    ],
    specifications: [
      { label: 'Voltage Rating', value: '220V - 250V AC, 50/60Hz' },
      { label: 'Current Capacity', value: '16AX / 250V' },
      { label: 'Dimension', value: '86mm x 86mm (Standard 3x3 Box)' },
      { label: 'Color / Trim', value: 'Matte Charcoal with Brushed Gold Edge' },
      { label: 'Certification', value: 'IEC 60669-1, CE, BSTI Certified' }
    ],
    warranty: '10 Years Replacement Warranty',
    weightOrSize: '180 grams',
    originCountry: 'International Certified Plant',
    frequentlyBoughtWith: ['prod-elec-02', 'prod-elec-04'],
    reviews: [
      {
        id: 'rev-01',
        userName: 'Tanvir Ahmed, Architect',
        userLocation: 'Gulshan 2, Dhaka',
        rating: 5,
        date: '2026-08-10',
        comment: 'Installed 80 units of these for a triplex penthouse in Gulshan. The gold edge against charcoal walls is stunning. Unbeatable tactile feel.',
        verifiedPurchase: true
      },
      {
        id: 'rev-02',
        userName: 'Mohammad Farhan',
        userLocation: 'Uttara, Dhaka',
        rating: 5,
        date: '2026-08-04',
        comment: 'Exceptional premium quality. Packaging was impeccable and delivery took just 24 hours in Dhaka.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-elec-02',
    name: 'Flame Retardant 90m Copper Single Core Building Wire (2.5 RM / Green-Yellow Earth & Red)',
    categoryId: 'electrical',
    subcategoryId: 'wire-cable',
    regularPrice: 7200,
    discountPrice: 6650,
    rating: 4.8,
    reviewCount: 312,
    sku: 'FR-25RM-90M-CU',
    inStock: true,
    stockQuantity: 120,
    isFeatured: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558384661-820d88b43f9a?auto=format&fit=crop&w=800&q=80',
    ],
    description: '100% Electrolytic High-Conductivity 99.99% pure annealed copper conductor insulated with advanced Flame Retardant (FR) PVC formulation. Ensures minimal voltage drops, maximum safety against electrical short circuits, and zero toxic smoke propagation.',
    shortDescription: '90-meter coil 2.5 RM 99.99% pure copper flame retardant building cable.',
    features: [
      '99.99% pure electrolytic annealed copper wire',
      'Flame Retardant (FR) compound resistant to high temperatures up to 85°C',
      'High oxygen index (LOI > 30%) prevents flame self-propagation',
      'Strictly conforms to BDS 901 and BS 6004 international safety standards',
      'Anti-rodent and moisture-resistant formulation'
    ],
    specifications: [
      { label: 'Cable Size', value: '2.5 RM (Single Core)' },
      { label: 'Length per Roll', value: '90 Meters (Standard Full Coil)' },
      { label: 'Voltage Grade', value: '450/750 Volts' },
      { label: 'Insulation', value: 'Special FR PVC (Flame Retardant)' },
      { label: 'Standard', value: 'BDS 901:2010, BS 6004, IEC 60227' }
    ],
    warranty: '25 Years Manufacturer Integrity Warranty',
    weightOrSize: '3.4 kg per roll',
    originCountry: 'Bangladesh ISO 9001 Facility',
    frequentlyBoughtWith: ['prod-elec-01', 'prod-elec-03'],
    reviews: [
      {
        id: 'rev-03',
        userName: 'Engr. Shafiqul Islam',
        userLocation: 'Dhanmondi, Dhaka',
        rating: 5,
        date: '2026-08-15',
        comment: 'Tested conductor purity with micro-ohmmeter; resistance is spot-on according to BDS specs. Trustworthy product for critical building wiring.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-elec-pipe-01',
    name: 'Heavy Duty Fire Retardant PVC Electrical Conduit Pipe 25mm (3 Meter)',
    categoryId: 'electrical',
    subcategoryId: 'elec-pipe-fittings',
    regularPrice: 380,
    discountPrice: 320,
    rating: 4.8,
    reviewCount: 78,
    sku: 'ELEC-PIPE-25MM-FR',
    inStock: true,
    stockQuantity: 240,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Heavy duty impact-resistant rigid PVC conduit pipe specifically engineered for concealed ceiling, wall slab, and underground electrical cable routing.',
    shortDescription: '25mm Heavy Duty Fire Retardant PVC Electrical Conduit (3 Meter).',
    features: [
      'High impact resistance prevents crushing during slab casting',
      'Self-extinguishing fire retardant virgin PVC material',
      'Smooth internal bore for seamless cable pulling',
      'Corrosion and chemical resistant'
    ],
    specifications: [
      { label: 'Outer Diameter', value: '25 mm (1 Inch Conduit)' },
      { label: 'Length', value: '3.0 Meters per pipe' },
      { label: 'Material', value: 'Rigid High-Grade PVC (FR Grade)' }
    ],
    warranty: '20 Years Manufacturer Guarantee',
    weightOrSize: '750 grams',
    originCountry: 'Bangladesh ISO 9001 Plant',
    frequentlyBoughtWith: ['prod-elec-02', 'prod-elec-01'],
    reviews: []
  },
  {
    id: 'prod-elec-03',
    name: 'Double Pole Residual Current Circuit Breaker with Overcurrent (RCBO 32A 30mA)',
    categoryId: 'electrical',
    subcategoryId: 'circuit-breaker-db',
    regularPrice: 4200,
    discountPrice: 3590,
    rating: 4.9,
    reviewCount: 89,
    sku: 'RCBO-32A-30MA-DP',
    inStock: true,
    stockQuantity: 38,
    isFeatured: true,
    isFlashSale: true,
    flashSaleEnds: '2026-09-01T23:59:59',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558384661-820d88b43f9a?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Advanced dual-function RCBO providing simultaneous human electric shock protection (30mA instantaneous trip) and thermal-magnetic overcurrent/short circuit protection up to 10kA rupture capacity. Essential for luxury bathroom sub-circuits, kitchens, and server rooms.',
    shortDescription: '32 Amp 30mA dual-protection RCBO safety breaker (10kA breaking capacity).',
    features: [
      'Combined MCB + RCCB protection in a compact 2-module DIN rail enclosure',
      '30mA high-sensitivity Earth Leakage detection (<40ms response)',
      '10,000A short-circuit breaking capacity for robust industrial grid protection',
      'Trip-Free mechanism ensures safety even if toggle switch is held locked',
      'Clear VisiSafe indicator window for instant fault diagnostics'
    ],
    specifications: [
      { label: 'Rated Current', value: '32 Amperes' },
      { label: 'Poles', value: '2-Pole (1P + N switched)' },
      { label: 'Sensitivity', value: '30 mA Type AC' },
      { label: 'Breaking Capacity', value: '10 kA (IEC 61009-1)' },
      { label: 'Mounting', value: 'Standard 35mm DIN Rail' }
    ],
    warranty: '5 Years Official Warranty',
    weightOrSize: '240 grams',
    originCountry: 'International Certified Plant',
    frequentlyBoughtWith: ['prod-elec-02', 'prod-tools-02'],
    reviews: [
      {
        id: 'rev-04',
        userName: 'Zubair Hossain',
        userLocation: 'Chittagong Port City',
        rating: 5,
        date: '2026-07-28',
        comment: 'Essential for safety. Tested the 30mA test button; trips instantaneously. Super crisp build quality.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-elec-04',
    name: 'Architectural Tri-Color Ultra-Slim Magnetic Track Spotlight (24W COB)',
    categoryId: 'electrical',
    subcategoryId: 'light-lighting',
    regularPrice: 5500,
    discountPrice: 4650,
    rating: 4.9,
    reviewCount: 94,
    sku: 'MAG-24W-COB-SLIM',
    inStock: true,
    stockQuantity: 28,
    isFeatured: true,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558384661-820d88b43f9a?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Sleek low-voltage magnetic track light engineered with high CRI 95+ Bridgelux COB LEDs. Rotates 360 degrees horizontally and 90 degrees vertically to highlight luxury accent walls, art galleries, and modern living rooms without glare.',
    shortDescription: '24W Magnetic Track Spotlight with CRI 95+ and 3-color temperature switch.',
    features: [
      'Ultra-high color rendering index (CRI > 95) reveals vivid true colors',
      'Safe 48V DC magnetic track click-and-slide installation',
      'Anti-glare deep honeycomb baffle (UGR < 13)',
      'Die-cast aeronautical aluminum body for superior passive cooling',
      'Switchable color temperatures: 3000K Warm / 4000K Neutral / 6500K Cool White'
    ],
    specifications: [
      { label: 'Power Consumption', value: '24 Watts COB' },
      { label: 'Luminous Flux', value: '2,400 Lumens (100 lm/W)' },
      { label: 'Input Voltage', value: 'DC 48V Magnetic Track Rail' },
      { label: 'Beam Angle', value: '24° Precision Optical Lens' },
      { label: 'Lifespan', value: '50,000 Hours (L80/B10)' }
    ],
    warranty: '3 Years Full Replacement Warranty',
    weightOrSize: '350 grams',
    originCountry: 'International Certified Plant',
    frequentlyBoughtWith: ['prod-elec-01', 'prod-tools-01'],
    reviews: []
  },
  {
    id: 'prod-elec-fan-01',
    name: 'Stealth Air Premium BLDC Ceiling Fan 56" with RF Remote (Smoky Brown)',
    categoryId: 'electrical',
    subcategoryId: 'fan',
    regularPrice: 8900,
    discountPrice: 7650,
    rating: 4.9,
    reviewCount: 62,
    sku: 'BLDC-56-BRN-REM',
    inStock: true,
    stockQuantity: 26,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1558384661-820d88b43f9a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Energy-saving 28W super-efficient BLDC motor fan with aerodynamic contoured ABS blades that operate whisper-quiet at 280 RPM delivering 240 m³/min air volume.',
    shortDescription: '56-inch BLDC 28W energy-saving ceiling fan with remote control.',
    features: [
      '65% energy savings compared to conventional induction fans',
      'Whisper-quiet aerodynamic blade design',
      'Multi-speed smart RF remote with timer and reverse modes'
    ],
    specifications: [
      { label: 'Sweep Size', value: '1400mm (56 Inch)' },
      { label: 'Motor Type', value: 'Permanent Magnet BLDC 28W' },
      { label: 'Air Delivery', value: '240 m³/min' }
    ],
    warranty: '5 Years Motor Warranty',
    weightOrSize: '5.2 kg',
    originCountry: 'International Certified Plant',
    frequentlyBoughtWith: ['prod-elec-01', 'prod-elec-02'],
    reviews: []
  },
  {
    id: 'prod-elec-acc-01',
    name: 'Industrial Heavy Duty Multi-Plug Extension Gang Socket (5 Outlet + 2 USB)',
    categoryId: 'electrical',
    subcategoryId: 'electrical-accessories',
    regularPrice: 2850,
    discountPrice: 2350,
    rating: 4.8,
    reviewCount: 88,
    sku: 'EXT-5G-USB-PRO',
    inStock: true,
    stockQuantity: 60,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1558384661-820d88b43f9a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Heavy duty surge-protected power strip with 5 universal sockets, independent switches, surge suppression rating 350 Joules, and heavy 3m pure copper cord.',
    shortDescription: '5-Way Surge protected heavy duty extension board with USB.',
    features: [
      'Individual LED illuminated rocker switches',
      'Automatic overload reset circuit breaker',
      'Fire retardant grade polymer'
    ],
    specifications: [
      { label: 'Rated Power', value: '2500W Max / 10A 250V' },
      { label: 'Cord Length', value: '3.0 Meters Heavy Duty' }
    ],
    warranty: '2 Years Replacement Warranty',
    weightOrSize: '620 grams',
    originCountry: 'International Certified Plant',
    frequentlyBoughtWith: ['prod-elec-01', 'prod-elec-03'],
    reviews: []
  },
  {
    id: 'prod-elec-tool-01',
    name: 'True RMS Digital Auto-Ranging Electrical Multimeter & Clamp Meter (600V / 600A)',
    categoryId: 'electrical',
    subcategoryId: 'electrical-tools',
    regularPrice: 4200,
    discountPrice: 3450,
    rating: 4.9,
    reviewCount: 52,
    sku: 'CLAMP-600A-RMS-PRO',
    inStock: true,
    stockQuantity: 34,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'True RMS digital clamp meter with NCV non-contact voltage detector, backlight LCD, auto-ranging AC/DC voltage, current, resistance, capacitance, and continuity tester.',
    shortDescription: 'Professional 600A True RMS digital clamp multimeter with NCV sensor.',
    features: [
      'True RMS measurement for accurate non-sinusoidal AC waveforms',
      'Non-contact voltage (NCV) buzzer and optical alert',
      'Data hold and peak min/max capture'
    ],
    specifications: [
      { label: 'AC Current Range', value: '0.01A to 600A' },
      { label: 'AC/DC Voltage', value: '600 Volts Cat III' }
    ],
    warranty: '1 Year Full Warranty',
    weightOrSize: '310 grams',
    originCountry: 'Germany / Total Tools',
    frequentlyBoughtWith: ['prod-elec-02', 'prod-elec-03'],
    reviews: []
  },

  // --- PLUMBING PRODUCTS ---
  {
    id: 'prod-plumb-01',
    name: 'Metropolitan Rimless Smart Wall-Hung Commode with Soft-Close Slim Seat',
    categoryId: 'plumbing',
    subcategoryId: 'commode-sanitary',
    regularPrice: 38500,
    discountPrice: 32900,
    rating: 5.0,
    reviewCount: 64,
    sku: 'METRO-WHL-GLOSS-SAN',
    inStock: true,
    stockQuantity: 15,
    isFeatured: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Crafted from vitreous china with exclusive antibacterial glaze coating, eliminating 99.9% of bacterial buildup. The rimless 360-degree dual tornado flush cleans every centimeter quietly while conserving 30% more water compared to traditional commodes.',
    shortDescription: 'Luxury European style rimless wall-hung toilet with UF slim soft-close seat.',
    features: [
      'Rimless flushing technology leaves zero hidden corners for limescale or germs',
      'Antibacterial nano-glaze prevents stain penetration',
      'Ultra-durable UF (Urea-Formaldehyde) scratch-resistant soft-closing seat',
      'Dual flush eco-system (3L / 4.5L water conservation)',
      'Tested to withstand static loads exceeding 400 kg'
    ],
    specifications: [
      { label: 'Installation Type', value: 'Wall Hung with Concealed Cistern Frame' },
      { label: 'Material', value: 'Vitreous Fine Ceramic with Nano-Glaze' },
      { label: 'Dimensions', value: '525mm (D) x 360mm (W) x 340mm (H)' },
      { label: 'Trap Type', value: 'P-Trap 180mm roughing-in' },
      { label: 'Flush Volume', value: 'Dual 3.0 Liters / 4.5 Liters' }
    ],
    warranty: '15 Years Ceramic Surface Warranty',
    weightOrSize: '28.5 kg',
    originCountry: 'International Certified Plant',
    frequentlyBoughtWith: ['prod-plumb-02', 'prod-plumb-03'],
    reviews: [
      {
        id: 'rev-05',
        userName: 'Dr. Mahmudul Hasan',
        userLocation: 'Banani, Dhaka',
        rating: 5,
        date: '2026-08-01',
        comment: 'The finish on this ceramic unit is world class. Looks so minimal floating above the marble floor. Easy to mop underneath!',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plumb-basin-01',
    name: 'Resort Luxury Countertop Ceramic Art Basin (Matte Black & Gold Rim)',
    categoryId: 'plumbing',
    subcategoryId: 'basin-sink',
    regularPrice: 16500,
    discountPrice: 13800,
    rating: 4.9,
    reviewCount: 42,
    sku: 'RESORT-BASIN-BLK-GLD',
    inStock: true,
    stockQuantity: 18,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Designer vitreous china countertop vessel wash basin with hydrophobic nano-coating that repels soap scum and water spots effortlessly.',
    shortDescription: 'Matte black countertop wash basin with gold trim accent.',
    features: [
      'Ultra-thin slim ceramic rim profile',
      'Nano-glaze anti-stain technology',
      'Standard 45mm pop-up waste hole compatible with universal drain kits'
    ],
    specifications: [
      { label: 'Dimensions', value: '480mm (L) x 370mm (W) x 130mm (H)' },
      { label: 'Material', value: 'Vitreous China Glazed Ceramic' }
    ],
    warranty: '10 Years Ceramic Glaze Warranty',
    weightOrSize: '9.5 kg',
    originCountry: 'International Certified Plant',
    frequentlyBoughtWith: ['prod-plumb-tap-01', 'prod-plumb-02'],
    reviews: []
  },
  {
    id: 'prod-plumb-03',
    name: 'Schedule 80 CPVC High Pressure Hot & Cold Water Pipe 1" (3 Meter Bar)',
    categoryId: 'plumbing',
    subcategoryId: 'plumb-pipe-fittings',
    regularPrice: 890,
    discountPrice: 760,
    rating: 4.8,
    reviewCount: 210,
    sku: 'CPVC-SCH80-1IN-3M',
    inStock: true,
    stockQuantity: 350,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'CPVC piping engineered for hot and cold domestic pressurized water distribution up to 93°C. Non-corrosive, non-toxic, odorless, and resistant to scaling with zero biological bacterial adhesion.',
    shortDescription: 'Schedule 80 heavy duty 1-inch CPVC plumbing pipe (3m length).',
    features: [
      'Withstands high temperatures up to 93°C and pressure up to 28 bar',
      '100% lead-free NSF 61 drinking water certified virgin compound',
      'Mirror-smooth inner wall reduces flow friction and pumping energy',
      'Chemical fusion solvent weld joint creates leak-proof single molecular bond',
      'Resistant to chlorine degradation and scaling in hard water zones'
    ],
    specifications: [
      { label: 'Nominal Size', value: '1 Inch (32mm Outer Diameter)' },
      { label: 'Standard', value: 'ASTM F441 / Schedule 80 Heavy Grade' },
      { label: 'Length', value: '3.0 Meters per length' },
      { label: 'Max Temperature', value: '93° Celsius (200° Fahrenheit)' },
      { label: 'Color', value: 'Cream Beige with Yellow Legend Stripe' }
    ],
    warranty: '50 Years Manufacturer Lifespan Guarantee',
    weightOrSize: '1.95 kg per pipe',
    originCountry: 'Bangladesh ISO 9001 Facility',
    frequentlyBoughtWith: ['prod-plumb-01', 'prod-tools-02'],
    reviews: []
  },
  {
    id: 'prod-plumb-tap-01',
    name: 'Solid Brass Tall Pillar Single Lever Basin Mixer Tap (Brushed Champagne Gold)',
    categoryId: 'plumbing',
    subcategoryId: 'tap-mixer',
    regularPrice: 7800,
    discountPrice: 6450,
    rating: 4.9,
    reviewCount: 56,
    sku: 'MIX-TALL-GLD-CW617',
    inStock: true,
    stockQuantity: 28,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'High rise countertop basin mixer made of solid CW617N brass with European ceramic disc cartridge tested for 500,000 drip-free operations.',
    shortDescription: 'Tall solid brass single-lever hot/cold basin mixer in brushed gold.',
    features: [
      'Lead-free solid CW617N brass architecture',
      'Switzerland aerator delivers smooth splash-free water flow',
      'Multi-layer PVD finish prevents fingerprints and tarnishing'
    ],
    specifications: [
      { label: 'Height', value: '300 mm (Tall Vessel Model)' },
      { label: 'Cartridge', value: '35mm Precision Ceramic Cartridge' }
    ],
    warranty: '7 Years Leakage Warranty',
    weightOrSize: '1.85 kg',
    originCountry: 'International Certified Plant',
    frequentlyBoughtWith: ['prod-plumb-basin-01', 'prod-plumb-02'],
    reviews: []
  },
  {
    id: 'prod-plumb-02',
    name: 'Brushed Matte Gold Thermostatic Rain Shower Column Set with Waterfall Spout',
    categoryId: 'plumbing',
    subcategoryId: 'shower',
    regularPrice: 26500,
    discountPrice: 21800,
    rating: 4.9,
    reviewCount: 78,
    sku: 'RAIN-GLD-THM-SET',
    inStock: true,
    stockQuantity: 22,
    isFeatured: true,
    isFlashSale: true,
    flashSaleEnds: '2026-09-02T18:00:00',
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Immerse in luxury with this thermostatic precision brass rain shower column. Features a 300mm ultra-thin air-injection rain head, 3-mode handheld wand with anti-kink silicone hose, and a safety thermostat preset at 38°C to prevent scalding.',
    shortDescription: 'Solid brass thermostatic 3-way exposed rain shower system in brushed gold.',
    features: [
      'Heavy solid brass body with 10-layer PVD brushed gold anti-corrosion coating',
      'Air-boost injection technology creates soft, voluminous droplet sensation',
      'Precise thermostatic cartridge with 38°C safety child-lock button',
      'Silicone anti-calcification spray nozzles wipe clean with a fingertip',
      'Integrated rotatable bottom bathtub filling waterfall spout'
    ],
    specifications: [
      { label: 'Main Body Material', value: 'High Purity CW617N Solid Brass' },
      { label: 'Finish', value: 'PVD Brushed Luxury Champagne Gold' },
      { label: 'Rain Shower Head', value: '300mm (12 Inch) Stainless Steel 304' },
      { label: 'Operating Pressure', value: '0.15 MPa - 0.6 MPa (1.5 - 6.0 Bar)' },
      { label: 'Cartridge Lifespan', value: '500,000 Cycles' }
    ],
    warranty: '7 Years Leakage & PVD Finish Warranty',
    weightOrSize: '5.8 kg',
    originCountry: 'International Certified Plant',
    frequentlyBoughtWith: ['prod-plumb-01', 'prod-plumb-03'],
    reviews: [
      {
        id: 'rev-06',
        userName: 'Sultana Razia',
        userLocation: 'Bashundhara R/A, Dhaka',
        rating: 5,
        date: '2026-07-19',
        comment: 'Looks straight out of a 5-star hotel in Dubai. The water pressure is incredible with the air booster.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-plumb-valve-01',
    name: 'Brass Ball Valve & Stainless Steel 304 Floor Drain Anti-Odor Trap (150x150mm)',
    categoryId: 'plumbing',
    subcategoryId: 'valve-drainage',
    regularPrice: 1650,
    discountPrice: 1350,
    rating: 4.8,
    reviewCount: 65,
    sku: 'VALVE-DRAIN-SET-150',
    inStock: true,
    stockQuantity: 95,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Forged solid brass full-bore ball valve combined with magnetic auto-closing anti-odor anti-insect bathroom floor drain trap.',
    shortDescription: 'Heavy brass full-port ball valve with SS304 magnetic floor drain trap.',
    features: [
      'Magnetic spring floor trap seals noxious sewer gases automatically',
      'Solid forged CW617N brass ball valve rated to 25 bar pressure',
      'Removable hair filtration strainer basket'
    ],
    specifications: [
      { label: 'Floor Trap Size', value: '150mm x 150mm Tile-Insert' },
      { label: 'Ball Valve Size', value: '1 Inch Brass Female' }
    ],
    warranty: '5 Years Replacement Guarantee',
    weightOrSize: '820 grams',
    originCountry: 'Bangladesh ISO 9001 Facility',
    frequentlyBoughtWith: ['prod-plumb-03', 'prod-plumb-01'],
    reviews: []
  },
  {
    id: 'prod-plumb-acc-01',
    name: 'Luxury SUS304 Stainless Steel 6-Piece Bathroom Hardware Accessory Set (Matte Black)',
    categoryId: 'plumbing',
    subcategoryId: 'bathroom-accessories',
    regularPrice: 6500,
    discountPrice: 5200,
    rating: 4.9,
    reviewCount: 82,
    sku: 'BATH-6PC-BLK-SUS',
    inStock: true,
    stockQuantity: 30,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Complete 6-piece premium SUS304 stainless steel bathroom hardware set: 24-inch double towel rail, toilet paper holder with phone shelf, robe hooks, towel ring, and soap dish.',
    shortDescription: '6-piece heavy gauge SUS304 stainless steel bathroom hardware collection.',
    features: [
      'Food grade SUS304 stainless steel impervious to rust',
      'Concealed screw wall mounting hardware included',
      'Electroplated scratch-resistant matte black finish'
    ],
    specifications: [
      { label: 'Material', value: '100% Solid Stainless Steel 304' },
      { label: 'Set Contents', value: '6 Coordinated Pieces with Anchors' }
    ],
    warranty: '10 Years Rust Free Guarantee',
    weightOrSize: '2.4 kg',
    originCountry: 'International Certified Plant',
    frequentlyBoughtWith: ['prod-plumb-01', 'prod-plumb-02'],
    reviews: []
  },
  {
    id: 'prod-plumb-tool-01',
    name: 'Industrial 14" Heavy Duty Plumbing Pipe Wrench & 10x PTFE Thread Seal Tape Pack',
    categoryId: 'plumbing',
    subcategoryId: 'plumbing-accessories-tools',
    regularPrice: 2600,
    discountPrice: 2150,
    rating: 4.8,
    reviewCount: 94,
    sku: 'PLUMB-WR-14IN-TAPE',
    inStock: true,
    stockQuantity: 45,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Forged ductile iron handle with induction hardened Cr-Mo alloy steel floating hook jaw with high-density PTFE Teflon plumber thread tape pack.',
    shortDescription: '14-inch heavy duty plumbing wrench + 10 rolls high density Teflon tape.',
    features: [
      'Self-cleaning threads with easily replaceable hook and heel jaws',
      'Unbreakable ductile iron I-beam handle',
      'High density PTFE tape prevents pipe joint leaks permanently'
    ],
    specifications: [
      { label: 'Wrench Size', value: '14 Inch (350mm) / 50mm Jaw Capacity' },
      { label: 'Included', value: '1 Wrench + 10x PTFE Tape Rolls' }
    ],
    warranty: 'Lifetime Tool Integrity Warranty',
    weightOrSize: '1.6 kg',
    originCountry: 'International Certified Plant',
    frequentlyBoughtWith: ['prod-plumb-03', 'prod-const-01'],
    reviews: []
  },

  // --- TOOLS & HARDWARE PRODUCTS (OTHERS) ---
  {
    id: 'prod-tools-02',
    name: '142-Piece Mechanics Heavy Duty Chrome Vanadium Hand Tool & Socket Set',
    categoryId: 'tools-hardware',
    subcategoryId: 'hand-tools',
    regularPrice: 18500,
    discountPrice: 15200,
    rating: 4.9,
    reviewCount: 95,
    sku: 'CRV-142PC-SET-PRO',
    inStock: true,
    stockQuantity: 12,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Comprehensive professional mechanic set crafted from heat-treated Chrome Vanadium alloy with DirectTorque technology to prevent fastener rounding. Includes 72-tooth quick-release ratchets (1/4" and 3/8"), deep sockets, hex keys, and ergonomic screwdrivers in an indestructible blow-mold case.',
    shortDescription: '142-piece industrial Chrome Vanadium ratchet, socket and wrench toolbox set.',
    features: [
      'DirectTorque technology increases contact area to deliver 15% more torque without rounding nuts',
      '72-tooth teardrop ratchet mechanism allows a tiny 5-degree swing arc for tight engine bays',
      'Full polished chrome finish provides superior corrosion and oil resistance',
      'Deep and shallow 6-point sockets with stamped large size markings for fast identification',
      'Heavy-duty lockable carrying case with metal latches'
    ],
    specifications: [
      { label: 'Piece Count', value: '142 Pieces Complete Mechanics Set' },
      { label: 'Material', value: 'High Strength Chrome Vanadium Steel (Cr-V)' },
      { label: 'Ratchet Drives', value: '1/4" Drive & 3/8" Drive 72-Tooth' },
      { label: 'Case Dimensions', value: '460mm x 340mm x 110mm' },
      { label: 'Standards', value: 'Meets or Exceeds ANSI Specifications' }
    ],
    warranty: 'Full Lifetime Hand Tool Warranty',
    weightOrSize: '8.6 kg complete set',
    originCountry: 'International Certified Plant',
    frequentlyBoughtWith: ['prod-tools-01', 'prod-safety-02'],
    reviews: []
  },
  {
    id: 'prod-tools-01',
    name: 'Brushless Cordless Combi Impact Drill Kit 18V (2x 2.0Ah + Heavy Box)',
    categoryId: 'tools-hardware',
    subcategoryId: 'power-tools',
    regularPrice: 24500,
    discountPrice: 19800,
    rating: 5.0,
    reviewCount: 182,
    sku: 'IMP-18V50-KIT-BL',
    inStock: true,
    stockQuantity: 18,
    isFeatured: true,
    isFlashSale: true,
    flashSaleEnds: '2026-08-31T20:00:00',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Heavy duty brushless motor delivers 50 Nm of hard torque for tough drilling in masonry, steel, and hardwood. Features Electronic Motor Protection (EMP), all-metal 13mm auto-lock chuck, and two lithium-ion battery packs with smart fast charger.',
    shortDescription: '18V Brushless impact hammer drill with 50Nm torque, 2 batteries and heavy duty case.',
    features: [
      'Maintenance-free brushless motor delivers 20% longer runtime and 2x tool life',
      'Robust 13mm full-metal chuck for maximum torque transfer and zero bit slippage',
      '20+2 torque clutch settings plus dedicated hammer drilling mode',
      'Integrated bright LED worklight illuminates dark jobsite corners',
      'Electronic Cell Protection guards battery from overload and deep discharge'
    ],
    specifications: [
      { label: 'Battery Voltage', value: '18 Volts Lithium-Ion (2x 2.0Ah Included)' },
      { label: 'Max Torque (Hard/Soft)', value: '50 Nm / 28 Nm' },
      { label: 'No-Load Speed', value: '0-460 / 0-1,800 RPM' },
      { label: 'Max Impact Rate', value: '27,000 BPM' },
      { label: 'Max Drilling Dia. in Masonry', value: '13 mm' }
    ],
    warranty: '1 Year Warranty with Service Card',
    weightOrSize: '1.4 kg (with battery)',
    originCountry: 'International Certified Plant',
    frequentlyBoughtWith: ['prod-tools-02', 'prod-safety-01'],
    reviews: [
      {
        id: 'rev-07',
        userName: 'Md. Kamrul Hasan, Contractor',
        userLocation: 'Mirpur DOHS, Dhaka',
        rating: 5,
        date: '2026-08-14',
        comment: 'The brushless motor is pure joy. Drilled 60 anchor holes into cured concrete columns on one battery charge. Absolute beast.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-tools-03',
    name: 'Heavy Duty 125mm (5") 840W Angle Grinder with Paddle Switch',
    categoryId: 'tools-hardware',
    subcategoryId: 'power-tools',
    regularPrice: 7800,
    discountPrice: 6600,
    rating: 4.8,
    reviewCount: 130,
    sku: 'AG-125MM-840W-PRO',
    inStock: true,
    stockQuantity: 40,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Equipped with a high-heat resistant 840W motor and labyrinth construction that seals the motor and bearings from dust and debris. Ideal for masonry cut-off, weld cleanup, rebar cutting, and tile shaping.',
    shortDescription: '840W 125mm professional angle grinder with labyrinth dust seal protection.',
    features: [
      'Labyrinth construction seals internal armature and bearings from abrasive metal dust',
      'Slim barrel grip (only 56mm diameter) for unmatched operator control and less fatigue',
      'Machined bevel gears provide double service life compared to standard gears',
      'Side handle installable on either side for ambidextrous comfort',
      'Spindle lock for swift wheel changes'
    ],
    specifications: [
      { label: 'Continuous Input Rating', value: '840 Watts' },
      { label: 'Wheel Diameter', value: '125 mm (5 Inch)' },
      { label: 'No Load Speed', value: '11,000 RPM' },
      { label: 'Spindle Thread', value: 'M14 x 2.0' },
      { label: 'Power Cord', value: '2.5m Double Insulated Rubber Cable' }
    ],
    warranty: '1 Year Warranty',
    weightOrSize: '2.1 kg',
    originCountry: 'International Certified Plant',
    frequentlyBoughtWith: ['prod-safety-01', 'prod-safety-02'],
    reviews: []
  },
  {
    id: 'prod-tools-measure-01',
    name: 'Professional Green Laser Distance Measurer 50M with Bluetooth & IP65',
    categoryId: 'tools-hardware',
    subcategoryId: 'measuring-tools',
    regularPrice: 14500,
    discountPrice: 12200,
    rating: 5.0,
    reviewCount: 48,
    sku: 'GLM-50M-BT-IP65',
    inStock: true,
    stockQuantity: 20,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Green laser diode provides 4x superior visibility in bright daylight conditions compared to red lasers. Features 360-degree tilt sensor, Bluetooth data export to measuring app, and IP65 dust and jet-water protection.',
    shortDescription: '50-Meter Green Laser distance measure with Bluetooth and 360° digital level.',
    features: [
      'Green laser technology for ultra-crisp line visibility on construction jobsites',
      'Bluetooth connectivity directly transmits floor plans and dimensions to smartphone',
      'Shock-absorbing rubberized housing survives 1.5m drops onto hard concrete'
    ],
    specifications: [
      { label: 'Measuring Range', value: '0.05 to 50.00 Meters' },
      { label: 'Accuracy', value: '± 1.5 mm' },
      { label: 'Protection Rating', value: 'IP65 Water & Dust Jet Sealed' }
    ],
    warranty: '1 Year Warranty',
    weightOrSize: '170 grams',
    originCountry: 'International Certified Plant',
    frequentlyBoughtWith: ['prod-tools-01', 'prod-safety-01'],
    reviews: []
  },
  {
    id: 'prod-safety-01',
    name: 'Protective Safety Eyewear with Anti-Fog Coating (Clear / Blue Frame)',
    categoryId: 'tools-hardware',
    subcategoryId: 'safety-equipment',
    regularPrice: 1850,
    discountPrice: 1450,
    rating: 4.9,
    reviewCount: 164,
    sku: 'EYE-SAFE-AF-CLR',
    inStock: true,
    stockQuantity: 85,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1578885136359-16c8bd4d3a8e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Features Pressure Diffusion Temple Technology which self-adjusts to fit a wide range of head sizes comfortably. Premium Anti-Fog coating resists fogging even in humid conditions.',
    shortDescription: 'Pressure-diffusing ballistic safety glasses with anti-fog technology.',
    features: [
      'Patented temple ribs self-adjust to equalize pressure over the ear for all-day comfort',
      'Anti-Fog coating withstands 25+ washings without losing efficacy',
      'Optical Class 1 polycarbonate lens absorbs 99.9% of harmful UVA and UVB radiation',
      'Meets ANSI Z87.1-2015 and EN 166:2001 high impact ballistic standards',
      'Soft dual-injected nose bridge pads prevent slippage during sweaty work'
    ],
    specifications: [
      { label: 'Lens Material', value: 'High Impact Optical Polycarbonate' },
      { label: 'Coating', value: 'Anti-Fog & Anti-Scratch' },
      { label: 'UV Protection', value: '99.9% UVA / UVB (200 - 380 nm)' },
      { label: 'Weight', value: 'Ultra-lightweight 19 grams' },
      { label: 'Standards', value: 'ANSI Z87.1-2015, CSA Z94.3' }
    ],
    warranty: 'Safety Quality Guarantee',
    weightOrSize: '19 grams',
    originCountry: 'International Certified Plant',
    frequentlyBoughtWith: ['prod-safety-02', 'prod-tools-01'],
    reviews: [
      {
        id: 'rev-08',
        userName: 'Ashikur Rahman',
        userLocation: 'Khulna',
        rating: 5,
        date: '2026-08-05',
        comment: 'Never fogs up even when wearing a mask on the hot construction site. Best goggles money can buy.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-safety-02',
    name: 'Industrial Vented Safety Helmet with Precision Wheel Ratchet (White / Gold Reflector)',
    categoryId: 'tools-hardware',
    subcategoryId: 'safety-equipment',
    regularPrice: 3200,
    discountPrice: 2650,
    rating: 4.9,
    reviewCount: 92,
    sku: 'HELMET-VENT-WHT-EN',
    inStock: true,
    stockQuantity: 60,
    isFeatured: true,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1578885136359-16c8bd4d3a8e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Manufactured from tough HDPE shell with Egyptian cotton sweatband and 6-point harness. The wheel ratchet allows 1-hand micro adjustments to secure the helmet firmly on the head without pressure points.',
    shortDescription: 'EN 397 certified ventilated construction hard hat with precision wheel ratchet.',
    features: [
      'Tough HDPE shell passes EN 397 impact standards far exceeding standard helmets',
      'Side and rear ventilation ports reduce internal helmet temperatures by 2-3°C',
      'Egyptian cotton sweatband with porous PU coating absorbs 4x more perspiration',
      'Universal accessory slots for earmuffs and integrated visor clips',
      'Hi-visibility reflective safety sticker strips'
    ],
    specifications: [
      { label: 'Shell Material', value: 'High Density Polyethylene (HDPE)' },
      { label: 'Harness', value: '6-Point 3D Textile Suspension' },
      { label: 'Adjustment', value: 'Revolution Wheel Ratchet (53-64cm)' },
      { label: 'Standard', value: 'EN 397:2012+A1:2012, ANSI Type 1 Class C' },
      { label: 'Electrical Insulation', value: 'Ventilated (Non-Electrical)' }
    ],
    warranty: '5 Years Shell Integrity Life',
    weightOrSize: '375 grams',
    originCountry: 'International Certified Plant',
    frequentlyBoughtWith: ['prod-safety-01', 'prod-tools-03'],
    reviews: []
  },
  {
    id: 'prod-fasteners-01',
    name: 'Industrial Grade Heavy Duty Galvanized Concrete Anchor Bolt & Nylon Wall Plug Assortment (250 Pcs)',
    categoryId: 'tools-hardware',
    subcategoryId: 'hardware-fasteners',
    regularPrice: 2200,
    discountPrice: 1750,
    rating: 4.8,
    reviewCount: 110,
    sku: 'ANCHOR-250PC-SET',
    inStock: true,
    stockQuantity: 75,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Complete 250-piece expansion anchor bolt and nylon wall plug kit for heavy load structural mounting into concrete, solid brick, hollow block, and plasterboard.',
    shortDescription: '250-piece high tensile zinc-plated anchor bolt & wall plug organizer case.',
    features: [
      'High grade 8.8 carbon steel zinc-electroplated bolts',
      'Intelligent 2-component nylon plugs expand, fold and knot automatically',
      'Includes sorting case with secure snap locks'
    ],
    specifications: [
      { label: 'Quantity', value: '250 Pieces Assorted Sizes' },
      { label: 'Anchor Sizes', value: 'M6, M8, M10 & M12 Bolts' }
    ],
    warranty: 'Structural Load Certification Guaranteed',
    weightOrSize: '3.1 kg',
    originCountry: 'International Certified Plant',
    frequentlyBoughtWith: ['prod-tools-01', 'prod-const-01'],
    reviews: []
  },
  {
    id: 'prod-const-02',
    name: 'Anti-Bacterial Waterproof Wall Sealer & Primer (18.2 Liter Drum)',
    categoryId: 'tools-hardware',
    subcategoryId: 'construction-materials',
    regularPrice: 8500,
    discountPrice: 7450,
    rating: 4.8,
    reviewCount: 74,
    sku: 'SEALER-BATH-18L-DRUM',
    inStock: true,
    stockQuantity: 25,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558384661-820d88b43f9a?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Deep penetrating 100% acrylic nano-sealer designed to bind powdery plaster and prevent efflorescence (shona/saltpetre), dampness, and mold growth on interior and exterior walls prior to topcoating.',
    shortDescription: '18.2L Anti-efflorescence deep penetrating damp-proof primer drum.',
    features: [
      'Nano-particle dispersion penetrates up to 5mm into concrete capillary pores',
      'Neutralizes free alkaline salts to prevent paint peeling and chalking',
      'Zero VOC formulation safe for indoor application with pregnant women or children',
      'Superior coverage: 120-140 sq.ft per liter per coat',
      'Fast drying: Recoatable in just 2 hours'
    ],
    specifications: [
      { label: 'Volume', value: '18.2 Liters (Standard Industrial Drum)' },
      { label: 'Binder Type', value: '100% Pure Micro-Acrylic Polymer' },
      { label: 'VOC Content', value: '< 5 g/L (Ultra Low VOC Eco-Friendly)' },
      { label: 'Application Tool', value: 'Brush, Roller, or Airless Spray (0.017" Tip)' },
      { label: 'Coverage Area', value: 'Approx 2,200 - 2,500 sq.ft per drum' }
    ],
    warranty: '5 Years Damp Protection System Guarantee',
    weightOrSize: '24 kg',
    originCountry: 'Bangladesh ISO 9001 Facility',
    frequentlyBoughtWith: ['prod-const-01', 'prod-tools-02'],
    reviews: []
  },
  {
    id: 'prod-const-01',
    name: 'High Performance Polyurethane Joint Sealant & Multipurpose Adhesive (600ml Sausage)',
    categoryId: 'tools-hardware',
    subcategoryId: 'adhesives-sealants-tapes',
    regularPrice: 1450,
    discountPrice: 1180,
    rating: 5.0,
    reviewCount: 118,
    sku: 'PU-SEAL-600ML-GRY',
    inStock: true,
    stockQuantity: 90,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    ],
    description: '1-part elastic polyurethane adhesive and expansion joint sealant that cures on exposure to atmospheric moisture. Bonds permanently to concrete, brick, stone, ceramic, wood, galvanized metal, and aluminum with 25% movement capability.',
    shortDescription: '600ml Polyurethane heavy construction adhesive and waterproof sealant.',
    features: [
      'Dual purpose: High strength elastic bonding + durable waterproof joint sealing',
      '±25% joint movement capability accommodates structural building expansion',
      'Bubble-free curing even in tropical high humidity environments',
      'Can be sanded and painted over once cured',
      'Resistant to weathering, UV exposure, and microbial degradation'
    ],
    specifications: [
      { label: 'Chemical Base', value: '1-Component Polyurethane' },
      { label: 'Packaging', value: '600 ml Foil Sausage' },
      { label: 'Skinning Time', value: '~65 minutes (at 23°C / 50% r.h.)' },
      { label: 'Tensile Strength', value: '1.5 N/mm²' },
      { label: 'Color', value: 'Concrete Grey / Jet Black' }
    ],
    warranty: 'Authentic Sealant Guarantee',
    weightOrSize: '820 grams',
    originCountry: 'International Certified Plant',
    frequentlyBoughtWith: ['prod-const-02', 'prod-plumb-03'],
    reviews: []
  },
  {
    id: 'prod-clean-01',
    name: 'Industrial Fast Drying Contact Cleaner & Multi-Use Rust Release Spray Duo (400ml x 2)',
    categoryId: 'tools-hardware',
    subcategoryId: 'cleaning-maintenance',
    regularPrice: 1950,
    discountPrice: 1600,
    rating: 4.9,
    reviewCount: 142,
    sku: 'CLEAN-RUST-DUO-400ML',
    inStock: true,
    stockQuantity: 80,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Specialist non-conductive electrical precision contact cleaner that dissolves oil, flux residue, and condensation without leaving any residue, paired with standard anti-rust penetrant.',
    shortDescription: 'Industrial contact cleaner & penetrating anti-rust lubricant twin pack.',
    features: [
      'Safe on all sensitive electronics, circuit boards, switches and relays',
      'Smart Straw nozzle for pinpoint accuracy or wide spray',
      'Fast evaporating formula leaves zero residue'
    ],
    specifications: [
      { label: 'Volume', value: '400 ml per can (2 Cans Total)' },
      { label: 'Dielectric Strength', value: 'Up to 35,000 Volts' }
    ],
    warranty: 'Quality Chemical Guarantee',
    weightOrSize: '900 grams',
    originCountry: 'International Certified Plant',
    frequentlyBoughtWith: ['prod-elec-01', 'prod-tools-01'],
    reviews: []
  },
  {
    id: 'prod-other-acc-01',
    name: 'Heavy Duty Modular Tool Storage Organizer Case with Removable Cups',
    categoryId: 'tools-hardware',
    subcategoryId: 'other-accessories',
    regularPrice: 4800,
    discountPrice: 3950,
    rating: 5.0,
    reviewCount: 76,
    sku: 'MOD-TOOL-ORG-CASE',
    inStock: true,
    stockQuantity: 35,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Rugged high-impact structural foam organizer with IP65 visible water seal gasket, 10 deep removable component bins, and auto-connecting metal side latches.',
    shortDescription: 'IP65 water-sealed modular hardware parts & accessories organizer box.',
    features: [
      'IP65 water and dust seal keeps contents completely dry on job sites',
      '10 removable heavy-duty deep cups with integrated dividers',
      'Auto-connect side latches easily stack onto modular tool towers'
    ],
    specifications: [
      { label: 'Dimensions', value: '550mm x 370mm x 130mm' },
      { label: 'Protection', value: 'IP65 Weather & Dust Sealed' }
    ],
    warranty: 'Lifetime Case Guarantee',
    weightOrSize: '3.8 kg',
    originCountry: 'International Certified Plant',
    frequentlyBoughtWith: ['prod-tools-02', 'prod-fasteners-01'],
    reviews: []
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'APEX10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 2000,
    description: '10% discount on orders above ৳2,000 across all categories',
    expiresAt: '2026-12-31'
  },
  {
    code: 'LUXURY500',
    discountType: 'fixed',
    discountValue: 500,
    minOrderAmount: 5000,
    description: '৳500 instant discount on orders above ৳5,000',
    expiresAt: '2026-12-31'
  },
  {
    code: 'FIRSTBUILD',
    discountType: 'percentage',
    discountValue: 15,
    minOrderAmount: 1500,
    description: '15% welcome discount for new builders and project managers',
    expiresAt: '2026-12-31'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'APX-2608-8841',
    customerName: 'Sakil Kazi',
    customerPhone: '+880 1712 345678',
    customerEmail: 'mrs.sakil.kazi@gmail.com',
    division: 'Dhaka',
    district: 'Dhaka City',
    area: 'Gulshan 2',
    address: 'House 42, Road 71, Diplomatic Zone',
    paymentMethod: 'bkash',
    paymentStatus: 'paid',
    items: [
      {
        productId: 'prod-elec-01',
        productName: 'AvatarOn 4-Gang Luxury Switch (Dark Charcoal & Gold Rim)',
        productImage: 'https://images.unsplash.com/photo-1558384661-820d88b43f9a?auto=format&fit=crop&w=800&q=80',
        price: 3250,
        quantity: 4
      },
      {
        productId: 'prod-tools-01',
        productName: 'Brushless Cordless Combi Impact Drill Kit 18V',
        productImage: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
        price: 19800,
        quantity: 1
      }
    ],
    subtotal: 32800,
    deliveryCharge: 0,
    discount: 3280,
    total: 29520,
    couponCode: 'APEX10',
    status: 'shipped',
    createdAt: '2026-08-20T14:32:00',
    estimatedDelivery: '2026-08-22',
    trackingHistory: [
      {
        status: 'pending',
        timestamp: '2026-08-20T14:32:00',
        note: 'Order confirmed and payment verified via bKash Merchant Gateway.',
        location: 'Apex Central Warehouse, Tejgaon, Dhaka'
      },
      {
        status: 'processing',
        timestamp: '2026-08-20T17:15:00',
        note: 'Quality inspection passed. Industrial packaging and barcode seal attached.',
        location: 'Fulfillment Hub 1, Dhaka'
      },
      {
        status: 'shipped',
        timestamp: '2026-08-21T09:45:00',
        note: 'Dispatched with Express Van courier partner (Waybill #APX-EXP-9921).',
        location: 'Dhaka North Logistics Hub'
      }
    ]
  },
  {
    id: 'ord-1002',
    orderNumber: 'APX-2608-9102',
    customerName: 'Engr. Tareq Mahmud',
    customerPhone: '+880 1819 876543',
    customerEmail: 'tareq.engr@constructbd.com',
    division: 'Chittagong',
    district: 'Chittagong',
    area: 'Agrabad C/A',
    address: 'Tower 9, Level 6, Commercial Area',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    items: [
      {
        productId: 'prod-plumb-02',
        productName: 'Brushed Matte Gold Thermostatic Rain Shower Column Set',
        productImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
        price: 21800,
        quantity: 2
      }
    ],
    subtotal: 43600,
    deliveryCharge: 120,
    discount: 500,
    total: 43220,
    couponCode: 'LUXURY500',
    status: 'processing',
    createdAt: '2026-08-21T10:15:00',
    estimatedDelivery: '2026-08-23',
    trackingHistory: [
      {
        status: 'pending',
        timestamp: '2026-08-21T10:15:00',
        note: 'Order placed with Visa Corporate Card.',
        location: 'Apex Central Warehouse, Tejgaon, Dhaka'
      },
      {
        status: 'processing',
        timestamp: '2026-08-21T11:00:00',
        note: 'Items picked and securely crated for Chittagong inter-district freight.',
        location: 'Fulfillment Hub 1, Dhaka'
      }
    ]
  }
];

export const BANGLADESH_DIVISIONS = [
  'Dhaka',
  'Chittagong',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barisal',
  'Rangpur',
  'Mymensingh'
];

export const BANGLADESH_DISTRICTS: Record<string, string[]> = {
  Dhaka: ['Dhaka City', 'Gazipur', 'Narayanganj', 'Tangail', 'Narsingdi', 'Faridpur', 'Manikganj', 'Munshiganj'],
  Chittagong: ['Chittagong City', 'Cox\'s Bazar', 'Comilla', 'Feni', 'Brahmanbaria', 'Noakhali', 'Chandpur'],
  Sylhet: ['Sylhet City', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
  Rajshahi: ['Rajshahi City', 'Bogra', 'Pabna', 'Sirajganj', 'Naogaon', 'Natore', 'Chapai Nawabganj'],
  Khulna: ['Khulna City', 'Jessore', 'Kushtia', 'Satkhira', 'Bagerhat', 'Jhenaidah'],
  Barisal: ['Barisal City', 'Patuakhali', 'Bhola', 'Pirojpur', 'Jhalokati', 'Barguna'],
  Rangpur: ['Rangpur City', 'Dinajpur', 'Kurigram', 'Gaibandha', 'Nilphamari', 'Thakurgaon'],
  Mymensingh: ['Mymensingh City', 'Jamalpur', 'Netrokona', 'Sherpur']
};
