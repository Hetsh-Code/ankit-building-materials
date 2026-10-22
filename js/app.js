/**
 * ANKIT BUILDING MATERIALS - INTERACTIVE APPLICATION
 * Radhanpur Kandla Highway near Over Bridge, Santalpur, Patan - 385350
 * Phone: +91 97148 58660
 */

// Google Maps Exact Location URL
const ANKIT_GOOGLE_MAPS_URL = "https://www.google.com/maps/place/Ankit+building+materials+ankit+hardware+%26tools/@23.7623567,71.1689968,759m/data=!3m2!1e3!4b1!4m6!3m5!1s0x395affb5c0000001:0xa4904fe5030a7aba!8m2!3d23.7623518!4d71.1715717!16s%2Fg%2F11c764tf32?entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D";

// Global State
const state = {
  rfqItems: [],
  currentLang: 'en',
  activeCategory: 'all',
  searchQuery: ''
};

// Global Google Maps opener
window.openGoogleMapsLocation = function() {
  window.open(ANKIT_GOOGLE_MAPS_URL, '_blank', 'noopener,noreferrer');
};

// 9 Categories from Billboard
const categoriesData = [
  {
    id: 'cement',
    name: 'Cement & Building Materials',
    nameGu: 'સિમેન્ટ અને બાંધકામ સામગ્રી',
    icon: '🏗️',
    img: 'assets/cement_construction.jpg',
    desc: 'High-strength OPC & PPC cement bags, AAC blocks, red clay bricks, TMT 550D rebar steel, river sand, and aggregates.',
    brands: 'UltraTech, Ambuja, Bangur, Tata Tiscon',
    tags: ['OPC 53', 'PPC Super', 'AAC Blocks', 'Fe550D Rebar', 'Aggregates']
  },
  {
    id: 'pvc',
    name: 'PVC Pipes & Fittings',
    nameGu: 'પીવીસી પાઇપ અને ફીટીંગ્સ',
    icon: '🚰',
    img: 'assets/pipes_plumbing.jpg',
    desc: 'Complete residential, commercial & agricultural piping: CPVC, UPVC, SWR, column borewell pipes, elbows, tees & brass valves.',
    brands: 'Astral, Supreme, Ashirvad, Finolex',
    tags: ['CPVC SDR 11', 'UPVC Sch 40', 'Borewell Casing', 'Brass Valves', 'Solvent Cement']
  },
  {
    id: 'hardware',
    name: 'Hardware Items',
    nameGu: 'હાર્ડવેર આઇટમ્સ',
    icon: '🔒',
    img: 'assets/tools_hardware.jpg',
    desc: 'GI binding wire, barbed wire for fencing, chainlink mesh, heavy brass padlocks, stainless steel door hinges & aldrop fittings.',
    brands: 'Godrej, Link, Anchor, High-Grade GI',
    tags: ['Binding Wire (18G)', 'Barbed Wire', 'GI Chainlink', 'SS Hinges', 'Heavy Locks']
  },
  {
    id: 'tools',
    name: 'Hand & Power Tools',
    nameGu: 'હેન્ડ અને પાવર ટૂલ્સ',
    icon: '🛠️',
    img: 'assets/tools_hardware.jpg',
    desc: 'Professional construction & masonry tools: claw hammers, pipe wrenches, pliers, brick trowels, magnetic spirit levels, and tapes.',
    brands: 'Bosch, Stanley, Taparia, Eastman',
    tags: ['Claw Hammers', 'Pipe Wrenches', 'Spirit Levels', 'Plaster Trowels', 'Tape 50M']
  },
  {
    id: 'safety',
    name: 'Safety Products (Industrial & PPE)',
    nameGu: 'સેફ્ટી પ્રોડક્ટ્સ (PPE)',
    icon: '🦺',
    img: 'assets/safety_ppe.jpg',
    desc: 'Your safety is our priority. ISI-certified hard hat helmets, neon reflective jackets, steel-toe boots, heavy leather gloves & safety goggles.',
    brands: 'Karam, 3M, Frontier, Tiger Safety',
    tags: ['ISI Hard Hats', 'Reflective Vests', 'Steel Toe Boots', 'Safety Goggles', 'Fall Harness']
  },
  {
    id: 'tarpaulin',
    name: 'Tarpaulin & HDPE Sheets',
    nameGu: 'તાડપત્રી (Tarpaulin)',
    icon: '⛺',
    img: 'assets/waterproofing_tarps.jpg',
    desc: '100% waterproof multi-layer cross-laminated blue/green poly tarpaulins, pond lining, concrete curing sheets, and heavy truck cargo covers.',
    brands: 'Silpaulin, Tiger Tarp, Cross-Laminated HDPE',
    tags: ['24x18 Heavy Tarp', '30x20 Agri Tarp', 'Curing Sheets', 'Pond Lining', 'UV Coated']
  },
  {
    id: 'waterproofing',
    name: 'Waterproofing Materials',
    nameGu: 'વોટરપ્રૂફિંગ કેમિકલ્સ',
    icon: '💧',
    img: 'assets/waterproofing_tarps.jpg',
    desc: 'Advanced construction chemicals, integral waterproofing compounds, terrace acrylic coatings, SBR bonding agents, and bitumen primers.',
    brands: 'Dr. Fixit, Fosroc, Sika, Asian Paints',
    tags: ['Dr Fixit LW+', 'Fastflex Coating', 'SBR Latex', 'Crack Filler', 'Bitumen Primer']
  },
  {
    id: 'abrasives',
    name: 'Abrasive Items',
    nameGu: 'એબ્રેસિવ આઇટમ્સ',
    icon: '⚙️',
    img: 'assets/tools_hardware.jpg',
    desc: 'High-speed metal cutting wheels, 14-inch chop saw wheels, flap discs, diamond concrete cutting blades, and grinding discs.',
    brands: 'Norton, Pro-Grip, CUMI, Bosch',
    tags: ['4" Cut-Off Wheel', '14" Chop Saw Disc', 'Diamond Blades', 'Flap Discs P80', 'Sandpaper']
  },
  {
    id: 'fasteners',
    name: 'Fasteners (Screws & Nails)',
    nameGu: 'સ્ક્રૂ અને ખીલા (Fasteners)',
    icon: '🔩',
    img: 'assets/tools_hardware.jpg',
    desc: 'Heavy industrial fasteners: Grade 8.8 hex bolts with nuts, self-drilling roofing screws with EPDM washers, drywall screws & wire nails.',
    brands: 'Unbrako, Zenith, High-Tensile GI',
    tags: ['Hex Head Bolts', 'Self-Drilling Screws', 'Drywall Screws', 'Expansion Anchors', 'Wire Nails']
  }
];

// Product Catalog Data
const productsData = [
  // Cement & Building
  { id: 'p1', cat: 'cement', title: 'UltraTech Super Cement (50kg)', brand: 'UltraTech Cement', specs: 'PPC / OPC 53 Grade, High early strength, ideal for slabs & columns.', unit: 'Per Bag (50 Kg)', min: '50 Bags' },
  { id: 'p2', cat: 'cement', title: 'Ambuja Plus Roof Special Cement', brand: 'Ambuja Cements', specs: 'Engineered with Micro-Silica for high density, waterproof concrete slabs.', unit: 'Per Bag (50 Kg)', min: '50 Bags' },
  { id: 'p3', cat: 'cement', title: 'AAC Lightweight Blocks (600x200x150mm)', brand: 'GreenTech Block', specs: 'Thermal insulated, earthquake-resistant autoclaved aerated concrete blocks.', unit: 'Per Cubic Meter', min: '1 Truck' },
  { id: 'p4', cat: 'cement', title: 'Fe550D TMT Rebar Steel (8mm to 32mm)', brand: 'Tata Tiscon / Jindal', specs: 'Primary billet, high bendability and earthquake resistance with test certificate.', unit: 'Per Metric Ton (MT)', min: '2 MT' },

  // Pipes & Fittings
  { id: 'p5', cat: 'pvc', title: 'Astral CPVC PRO Hot & Cold Pipes', brand: 'Astral Pipes', specs: 'SDR 11 & SDR 13.5, withstands up to 93°C, NSF certified lead-free plumbing.', unit: 'Per Length (3 & 5 Mtr)', min: '10 Lengths' },
  { id: 'p6', cat: 'pvc', title: 'Supreme UPVC Schedule 40 Pressure Pipes', brand: 'Supreme Industries', specs: 'High-tensile rigid UPVC for cold water distribution & industrial supply.', unit: 'Per 3 Mtr Length', min: '15 Lengths' },
  { id: 'p7', cat: 'pvc', title: 'Deep Well Column Borewell Casing Pipes', brand: 'Supreme / Finolex', specs: 'Special trapezoidal thread, heavy pressure rating for 300-1000 ft borewells.', unit: 'Per 3 Mtr Length', min: '5 Lengths' },
  { id: 'p8', cat: 'pvc', title: 'Heavy Brass Full-Port Ball Valve (1" to 2")', brand: 'Zoloto / Leader Type', specs: 'Forged brass body, chrome plated ball, Teflon seal, tested up to 25 Bar.', unit: 'Per Piece', min: '5 Pieces' },

  // Hardware
  { id: 'p9', cat: 'hardware', title: 'GI Binding Wire (18 & 20 Gauge)', brand: 'Tata / Jindal Wire', specs: 'Soft annealed zinc-coated wire for fast & firm TMT steel rebar tying.', unit: 'Per 25 Kg Bundle', min: '1 Bundle' },
  { id: 'p10', cat: 'hardware', title: 'Heavy Galvanized Barbed Wire (12x14 Gauge)', brand: 'Industrial Grade', specs: 'High corrosion resistance, razor-sharp barbs for agricultural & highway fencing.', unit: 'Per Roll (30-40 Kg)', min: '2 Rolls' },
  { id: 'p11', cat: 'hardware', title: 'Heavy Stainless Steel SS 304 Butt Hinges (4"x3")', brand: 'Apex Architectural', specs: 'Ball bearing smooth movement, anti-rust, 3mm thickness for heavy doors.', unit: 'Per Pair', min: '10 Pairs' },
  { id: 'p12', cat: 'hardware', title: 'Godrej Heavy Duty Brass Nav-Tal Padlock', brand: 'Godrej Security', specs: 'Hardened steel shackle, 7 levers, saw-resistant and rustproof mechanism.', unit: 'Per Unit', min: '2 Units' },

  // Hand Tools
  { id: 'p13', cat: 'tools', title: 'Industrial Drop-Forged Steel Claw Hammer (16oz)', brand: 'Stanley / Taparia', specs: 'Anti-slip rubberized grip, tempered steel head with nail puller claw.', unit: 'Per Piece', min: '2 Pieces' },
  { id: 'p14', cat: 'tools', title: 'Heavy-Duty Adjustable Pipe Wrench (14" / 18")', brand: 'Taparia Tools', specs: 'Ductile cast iron body, hardened alloy jaws for heavy plumbing grip.', unit: 'Per Piece', min: '1 Piece' },
  { id: 'p15', cat: 'tools', title: 'Magnetic Aluminum Spirit Level (600mm / 24")', brand: 'Stabila / Eastman', specs: 'Precision calibrated 3-vial (horizontal, 45°, vertical) with magnetic base.', unit: 'Per Piece', min: '1 Piece' },
  { id: 'p16', cat: 'tools', title: 'Heavy Duty Steel Measuring Tape (50 Meter / 165 Ft)', brand: 'Freemans Pro', specs: 'Fiberglass reinforced steel blade with heavy winding gear for highway surveyors.', unit: 'Per Unit', min: '1 Unit' },

  // Safety PPE
  { id: 'p17', cat: 'safety', title: 'ISI Certified Industrial Safety Helmet (Hard Hat)', brand: 'Karam / 3M', specs: 'High-density polyethylene (HDPE), 6-point ratchet suspension, Yellow/White.', unit: 'Per Piece', min: '10 Pieces' },
  { id: 'p18', cat: 'safety', title: 'High-Visibility Neon Reflective Safety Vest', brand: 'Frontier Safety', specs: 'EN 471 standard, 2-inch silver reflective tape, breathable mesh, Class 2.', unit: 'Per Piece', min: '20 Pieces' },
  { id: 'p19', cat: 'safety', title: 'Steel Toe Heavy Duty Work Safety Boots', brand: 'Tiger / Allen Cooper', specs: '200J steel toe cap, anti-puncture steel plate sole, oil & acid resistant.', unit: 'Per Pair', min: '5 Pairs' },
  { id: 'p20', cat: 'safety', title: 'Heavy Split Cowhide Leather Work Gloves', brand: 'Industrial Shield', specs: 'Reinforced palm, puncture & heat resistant for welding, rebar & heavy handling.', unit: 'Per Dozen (12 Pairs)', min: '2 Dozens' },

  // Tarpaulin
  { id: 'p21', cat: 'tarpaulin', title: 'Heavy Duty Waterproof Blue Poly Tarpaulin (24x18 Ft)', brand: 'Silpaulin / Tiger Tarp', specs: 'Multi-layer laminated, heat sealed borders with brass eyelets every 3 feet.', unit: 'Per Sheet', min: '2 Sheets' },
  { id: 'p22', cat: 'tarpaulin', title: 'Highway Heavy Cargo Tarpaulin (30x20 Ft)', brand: 'Super Tarp GSM 250+', specs: 'Extra-heavy GSM, 100% UV resistant, suitable for monsoon grain & cement transit.', unit: 'Per Sheet', min: '1 Sheet' },
  { id: 'p23', cat: 'tarpaulin', title: 'HDPE Pond Lining & Concrete Curing Sheet (500 Micron)', brand: 'Agri-Shield', specs: 'Tear-proof geomembrane sheet for water reservoirs & concrete slab curing.', unit: 'Per Roll (100 Mtr)', min: '1 Roll' },

  // Waterproofing
  { id: 'p24', cat: 'waterproofing', title: 'Dr. Fixit 101 LW+ Waterproofing Compound (20 Litre)', brand: 'Pidilite / Dr. Fixit', specs: 'Integral liquid waterproofing compound for concrete & plaster mortar.', unit: 'Per 20L Bucket', min: '1 Bucket' },
  { id: 'p25', cat: 'waterproofing', title: 'Dr. Fixit Fastflex Heavy Duty Terrace Coating (12 Kg)', brand: 'Dr. Fixit', specs: '2-component polymer modified cementitious elastomeric waterproof membrane.', unit: 'Per Kit (12 Kg)', min: '2 Kits' },
  { id: 'p26', cat: 'waterproofing', title: 'Sika RainTite Acrylic Waterproof Coating (20 Kg)', brand: 'Sika India', specs: 'Highly flexible UV-resistant acrylic liquid membrane for terraces & walls.', unit: 'Per 20 Kg Bucket', min: '1 Bucket' },
  { id: 'p27', cat: 'waterproofing', title: 'Fosroc Nitobond SBR Latex Bonding Agent (20L)', brand: 'Fosroc Chemicals', specs: 'Styrene butadiene copolymer for high strength repairs & waterproof bonding.', unit: 'Per 20L Can', min: '1 Can' },

  // Abrasives
  { id: 'p28', cat: 'abrasives', title: 'Pro-Grip 4" Thin Metal Cutting Wheel (105x1.0mm)', brand: 'Pro-Grip / Norton', specs: 'Fast burr-free cutting on stainless steel and MS rebar, max 15,300 RPM.', unit: 'Box of 50 Pcs', min: '2 Boxes' },
  { id: 'p29', cat: 'abrasives', title: 'Heavy Duty 14" Chop Saw Cutting Wheel (355x3.0mm)', brand: 'Bosch / CUMI', specs: 'Fiberglass double reinforced for cutting heavy steel pipes and channels.', unit: 'Box of 10 Pcs', min: '1 Box' },
  { id: 'p30', cat: 'abrasives', title: 'Diamond Segmented Concrete Cutting Blade (4" & 7")', brand: 'Bosch Pro Masonry', specs: 'Laser welded segments for clean dry/wet cutting of granite, marble, concrete.', unit: 'Per Piece', min: '2 Pieces' },

  // Fasteners
  { id: 'p31', cat: 'fasteners', title: 'Grade 8.8 High-Tensile Hex Head Bolts & Nuts', brand: 'Unbrako / Zenith', specs: 'Full thread & half thread, black oxide/zinc finish, sizes M8 to M24.', unit: 'Per Kg / 100 Pcs', min: '10 Kg' },
  { id: 'p32', cat: 'fasteners', title: 'Self-Drilling Screws with EPDM Washer (#12 x 55mm)', brand: 'High-Tech Fasteners', specs: 'Ruspert coated 1000-hr salt spray tested for GI & metal roofing sheet fixing.', unit: 'Box of 500 Pcs', min: '2 Boxes' },
  { id: 'p33', cat: 'fasteners', title: 'Heavy Duty Steel Wire Nails (2", 2.5", 3", 4")', brand: 'Standard GI Wire', specs: 'Diamond point, smooth shank, heavy head for shuttering and framing woodwork.', unit: 'Per 50 Kg Bag', min: '1 Bag' }
];

// Translations for Multilingual Mode
const i18n = {
  en: {
    heroTag: 'Premier Building Materials & Hardware Supplier',
    heroSlogan: '“Bharosa patra ane vishvasniya jagya”',
    heroSloganSub: 'Trustworthy & Reliable Partner for Contractors, Builders & Homeowners',
    heroTitleHighlight: 'Build Your Dreams With Us',
    heroSubtitle: 'Complete one-stop hardware & building materials inventory on Radhanpur-Kandla National Highway. Prompt site delivery, wholesale rates, and guaranteed branded genuine stock.',
    catTag: '9 Core Product Categories',
    catTitle: 'Everything Under One Highway Roof',
    calcTitle: 'Interactive Material & Cost Estimator'
  },
  gu: {
    heroTag: 'પાટણ અને સાંતલપુરનું વિશ્વસનીય હાર્ડવેર સેન્ટર',
    heroSlogan: '“ભરોસાપાત્ર અને વિશ્વસનીય જગ્યા”',
    heroSloganSub: 'બિલ્ડરો, કોન્ટ્રાક્ટરો અને ઘર બનાવવા માટે સંપૂર્ણ સામગ્રી',
    heroTitleHighlight: 'અમારી સાથે સાકાર કરો તમારા સપનાનું મકાન',
    heroSubtitle: 'રાધનપુર-કંડલા હાઈવે, ઓવરબ્રિજ પાસે, સાંતલપુર (પાટણ). સિમેન્ટ, પાઇપ, હાર્ડવેર, સેફ્ટી સાધનો, તાડપત્રી અને તમામ બાંધકામ સામાન હોલસેલ ભાવે ઉપલબ્ધ.',
    catTag: '૯ મુખ્ય પ્રોડક્ટ કેટેગરી',
    catTitle: 'એક જ છત નીચે તમામ બાંધકામ સામગ્રી',
    calcTitle: 'મટીરીયલ અને ખર્ચ ગણતરી કેલ્ક્યુલેટર'
  },
  hi: {
    heroTag: 'प्रमुख बिल्डिंग मटेरियल्स और हार्डवेयर सप्लायर',
    heroSlogan: '“भरोसा पात्र अने विश्वसनीय जगह”',
    heroSloganSub: 'ठेकेदारों, बिल्डरों और घर निर्माण के लिए सबसे भरोसेमंद प्रतिष्ठान',
    heroTitleHighlight: 'अपने सपनों का निर्माण हमारे साथ करें',
    heroSubtitle: 'राधनपुर-कांडला हाईवे, ओवरब्रिज के पास, सांतलपुर (पाटण). सीमेंट, पाइप, हार्डवेयर, सेफ्टी पीपीई, तिरपाल एवं कंस्ट्रक्शन केमिकल्स होलसेल दरों पर उपलब्ध.',
    catTag: '९ मुख्य प्रोडक्ट श्रेणियां',
    catTitle: 'एक ही छत के नीचे संपूर्ण हार्डवेयर सामग्री',
    calcTitle: 'कंस्ट्रक्शन मटीरियल कैलकुलेटर'
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  setupCleanNavigation();
  initTheme();
  renderCategories();
  renderProducts();
  setupCalculator();
  setupEventListeners();
  setupMobileMenu();
  setupScrollTracking();
  setupScrollAnimations();
  updateCartBadge();
});

// Render 9 Categories
function renderCategories() {
  const container = document.getElementById('categoriesGrid');
  if (!container) return;

  container.innerHTML = categoriesData.map((cat, idx) => `
    <div class="category-card stagger-item" data-cat-id="${cat.id}" style="transition-delay: ${(idx % 3) * 0.12}s;">
      <div class="category-img-box">
        <img src="${cat.img}" alt="${cat.name}" loading="lazy" />
        <span class="category-badge-chip">
          <span>${cat.icon}</span> Official Billboard Stock
        </span>
      </div>
      <div class="category-content">
        <h3 class="category-title">
          <span>${cat.name}</span>
          <span class="category-title-icon">${cat.icon}</span>
        </h3>
        <p class="category-desc">${cat.desc}</p>
        <div class="category-items-list">
          ${cat.tags.map(t => `<span class="item-tag">${t}</span>`).join('')}
        </div>
        <div class="category-footer">
          <span class="brand-logos-text">Brands: ${cat.brands}</span>
          <a href="javascript:void(0)" class="cat-action-link" data-scroll="catalog" onclick="filterByCat('${cat.id}')">
            View Items &rarr;
          </a>
        </div>
      </div>
    </div>
  `).join('');

  window.reobserveAnimatedCards?.();
}

// Render Products with Filter and Search
function renderProducts() {
  const container = document.getElementById('productsGrid');
  if (!container) return;

  let filtered = productsData.filter(item => {
    const matchCat = state.activeCategory === 'all' || item.cat === state.activeCategory;
    const matchSearch = !state.searchQuery || 
      item.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      item.specs.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">No products match your criteria.</p>
        <p style="font-size: 0.9rem;">Call <strong>+91 97148 58660</strong> for custom orders or items not listed!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((item, idx) => `
    <div class="product-card stagger-item" data-id="${item.id}" style="transition-delay: ${(idx % 4) * 0.08}s;">
      <div class="product-badge-row">
        <span class="product-cat-tag">${item.cat}</span>
        <span class="product-stock-tag">Ready in Highway Yard</span>
      </div>
      <h4 class="product-title">${item.title}</h4>
      <div class="product-brand">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <span>${item.brand}</span>
      </div>
      <p class="product-specs">${item.specs}</p>
      <div class="product-footer">
        <div class="product-unit-info">
          <strong>${item.unit}</strong>
          <span>Min: ${item.min}</span>
        </div>
        <button class="btn btn-sm btn-primary" onclick="addToRFQ('${item.id}')">
          + Add to Quote
        </button>
      </div>
    </div>
  `).join('');

  window.reobserveAnimatedCards?.();
}

// Filter from category card click
window.filterByCat = function(catId) {
  state.activeCategory = catId;
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === catId);
  });
  renderProducts();
  scrollToSection('catalog');
};

// Interactive Material Estimator
function setupCalculator() {
  const calcTabs = document.querySelectorAll('.calc-tab');
  const forms = {
    concrete: document.getElementById('calcFormConcrete'),
    brickwork: document.getElementById('calcFormBrickwork'),
    waterproofing: document.getElementById('calcFormWaterproofing'),
    safety: document.getElementById('calcFormSafety')
  };

  calcTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      calcTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-calc');

      Object.keys(forms).forEach(k => {
        if (forms[k]) forms[k].style.display = k === target ? 'flex' : 'none';
      });

      calculateCurrentTab(target);
    });
  });

  // Attach live input listeners to all inputs in the forms
  const allInputs = document.querySelectorAll('.estimator-body input, .estimator-body select');
  allInputs.forEach(input => {
    input.addEventListener('input', () => {
      const activeTab = document.querySelector('.calc-tab.active')?.getAttribute('data-calc') || 'concrete';
      calculateCurrentTab(activeTab);
    });
  });

  // Initial calculation
  calculateCurrentTab('concrete');
}

function calculateCurrentTab(tabType) {
  const resultGrid = document.getElementById('calcResultGrid');
  const resultTitle = document.getElementById('calcResultTitle');
  if (!resultGrid || !resultTitle) return;

  if (tabType === 'concrete') {
    const area = parseFloat(document.getElementById('concArea')?.value) || 1000;
    const thickness = parseFloat(document.getElementById('concThick')?.value) || 5; // inches
    const mix = document.getElementById('concMix')?.value || 'm20';

    // Volume calculation: cubic feet
    const volumeCuFt = area * (thickness / 12);
    const volumeCuM = volumeCuFt / 35.3147;
    // Dry volume factor ~ 1.54
    const dryVol = volumeCuM * 1.54;

    let cementBags, sandTons, aggTons, steelKg;

    if (mix === 'm25') { // 1 : 1 : 2 (sum 4)
      const cementVol = dryVol * (1 / 4);
      cementBags = Math.round((cementVol * 1440) / 50);
      sandTons = ((dryVol * (1 / 4) * 1600) / 1000).toFixed(1);
      aggTons = ((dryVol * (2 / 4) * 1500) / 1000).toFixed(1);
      steelKg = Math.round(area * 3.8);
    } else { // m20: 1 : 1.5 : 3 (sum 5.5)
      const cementVol = dryVol * (1 / 5.5);
      cementBags = Math.round((cementVol * 1440) / 50);
      sandTons = ((dryVol * (1.5 / 5.5) * 1600) / 1000).toFixed(1);
      aggTons = ((dryVol * (3 / 5.5) * 1500) / 1000).toFixed(1);
      steelKg = Math.round(area * 3.2);
    }

    resultTitle.textContent = `Estimated Concrete & Slab Materials (${area} Sq Ft)`;
    resultGrid.innerHTML = `
      <div class="result-item">
        <div class="result-label">Cement Required</div>
        <div class="result-val">${cementBags} <span class="result-unit">Bags (50kg)</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">Sand (River/Coarse)</div>
        <div class="result-val">${sandTons} <span class="result-unit">Metric Tons</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">Kapchi / Aggregates</div>
        <div class="result-val">${aggTons} <span class="result-unit">Metric Tons</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">TMT Steel 550D Rebar</div>
        <div class="result-val">${steelKg} <span class="result-unit">Kg (~${(steelKg/1000).toFixed(2)} MT)</span></div>
      </div>
    `;

    window.currentCalcSummary = `Concrete Estimate (${area} sq ft, ${thickness}" slab): ${cementBags} Cement Bags, ${sandTons} MT Sand, ${aggTons} MT Aggregates, ${steelKg} Kg TMT Steel.`;
  } else if (tabType === 'brickwork') {
    const length = parseFloat(document.getElementById('brickLen')?.value) || 50;
    const height = parseFloat(document.getElementById('brickHeight')?.value) || 10;
    const thickness = document.getElementById('brickThick')?.value || '9';

    const wallArea = length * height;
    let bricks, cementBags, sandTons;

    if (thickness === '9') {
      bricks = Math.round(wallArea * 9.8);
      cementBags = Math.round(wallArea * 0.12);
      sandTons = (wallArea * 0.016).toFixed(1);
    } else {
      bricks = Math.round(wallArea * 4.9);
      cementBags = Math.round(wallArea * 0.06);
      sandTons = (wallArea * 0.008).toFixed(1);
    }

    resultTitle.textContent = `Estimated Masonry Wall Materials (${wallArea} Sq Ft)`;
    resultGrid.innerHTML = `
      <div class="result-item">
        <div class="result-label">Bricks / Blocks</div>
        <div class="result-val">${bricks} <span class="result-unit">Nos</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">Mortar Cement</div>
        <div class="result-val">${cementBags} <span class="result-unit">Bags</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">Plaster Sand</div>
        <div class="result-val">${sandTons} <span class="result-unit">Metric Tons</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">GI Binding Wire</div>
        <div class="result-val">10 <span class="result-unit">Kg</span></div>
      </div>
    `;

    window.currentCalcSummary = `Brickwork Estimate (${wallArea} sq ft, ${thickness}" wall): ${bricks} Bricks, ${cementBags} Cement Bags, ${sandTons} MT Sand.`;
  } else if (tabType === 'waterproofing') {
    const area = parseFloat(document.getElementById('wpArea')?.value) || 1200;
    const type = document.getElementById('wpType')?.value || 'terrace';

    let chemicalLiters = Math.round(area * 0.25);
    let coatingBuckets = Math.ceil(area / 150);
    let meshRolls = Math.ceil(area / 450);

    resultTitle.textContent = `Waterproofing Chemical Requirements (${area} Sq Ft)`;
    resultGrid.innerHTML = `
      <div class="result-item">
        <div class="result-label">Dr. Fixit / Acrylic Coating</div>
        <div class="result-val">${chemicalLiters} <span class="result-unit">Liters</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">Heavy Coating Buckets</div>
        <div class="result-val">${coatingBuckets} <span class="result-unit">Buckets (20kg)</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">Fiber Glass Mesh</div>
        <div class="result-val">${meshRolls} <span class="result-unit">Rolls (50m)</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">Bitumen Primer</div>
        <div class="result-val">${Math.ceil(area * 0.08)} <span class="result-unit">Liters</span></div>
      </div>
    `;

    window.currentCalcSummary = `Waterproofing Estimate (${area} sq ft, ${type}): ${chemicalLiters}L Coating, ${coatingBuckets} Buckets (20kg), ${meshRolls} Mesh Rolls.`;
  } else if (tabType === 'safety') {
    const workers = parseInt(document.getElementById('siteWorkers')?.value) || 25;
    const tarpArea = parseFloat(document.getElementById('siteStorageArea')?.value) || 500;

    let helmets = workers + 5; // buffer
    let vests = workers + 5;
    let boots = workers;
    let tarps = Math.ceil(tarpArea / 300);

    resultTitle.textContent = `Site Safety PPE & Tarpaulin Pack (${workers} Workers)`;
    resultGrid.innerHTML = `
      <div class="result-item">
        <div class="result-label">ISI Hard Hat Helmets</div>
        <div class="result-val">${helmets} <span class="result-unit">Pieces</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">High-Vis Reflective Vests</div>
        <div class="result-val">${vests} <span class="result-unit">Pieces</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">Steel Toe Safety Boots</div>
        <div class="result-val">${boots} <span class="result-unit">Pairs</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">24x18 Waterproof Tarps</div>
        <div class="result-val">${tarps} <span class="result-unit">Heavy Tarps</span></div>
      </div>
    `;

    window.currentCalcSummary = `Safety PPE & Tarp Pack: ${helmets} Helmets, ${vests} High-Vis Vests, ${boots} Safety Boots, ${tarps} Heavy Tarpaulins.`;
  }
}

// WhatsApp Estimate Share
window.shareCalcOnWhatsApp = function() {
  const summary = window.currentCalcSummary || 'Hello Ankit Building Materials, please give me a quotation for construction materials.';
  const message = `Hello Ankit Building Materials (Santalpur, Patan),\n\nI calculated material requirements for my project on your website:\n*${summary}*\n\nPlease provide your best wholesale rate and site delivery availability.\nLocation: Near Radhanpur-Kandla Highway`;
  const url = `https://wa.me/919714858660?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

// RFQ Cart System
window.addToRFQ = function(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  const existing = state.rfqItems.find(i => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.rfqItems.push({
      id: product.id,
      title: product.title,
      cat: product.cat,
      unit: product.unit,
      qty: 1
    });
  }

  updateCartBadge();
  showToast(`Added "${product.title}" to Quote Request!`);
  renderDrawerItems();
};

window.removeFromRFQ = function(productId) {
  state.rfqItems = state.rfqItems.filter(i => i.id !== productId);
  updateCartBadge();
  renderDrawerItems();
};

window.changeQty = function(productId, delta) {
  const item = state.rfqItems.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromRFQ(productId);
  } else {
    renderDrawerItems();
    updateCartBadge();
  }
};

function updateCartBadge() {
  const badge = document.getElementById('rfqCartCount');
  const total = state.rfqItems.reduce((acc, curr) => acc + curr.qty, 0);
  if (badge) {
    badge.textContent = total;
    badge.style.display = total > 0 ? 'block' : 'none';
  }
}

function renderDrawerItems() {
  const container = document.getElementById('drawerItemsContainer');
  const countSpan = document.getElementById('drawerItemCount');
  if (!container) return;

  const total = state.rfqItems.reduce((acc, curr) => acc + curr.qty, 0);
  if (countSpan) countSpan.textContent = `(${total} items)`;

  if (state.rfqItems.length === 0) {
    container.innerHTML = `
      <div class="drawer-empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 1rem; color: var(--gold-400);">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <p style="font-weight: 700; color: var(--text-white);">Your quote list is empty.</p>
        <p style="font-size: 0.85rem; margin-top: 0.35rem;">Click "+ Add to Quote" on any product from our catalog to build an instant wholesale inquiry.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = state.rfqItems.map(item => `
    <div class="drawer-item-card">
      <div class="drawer-item-top">
        <div>
          <div class="drawer-item-name">${item.title}</div>
          <div class="drawer-item-cat">${item.cat} &bull; ${item.unit}</div>
        </div>
        <button class="remove-item-btn" onclick="removeFromRFQ('${item.id}')" title="Remove">
          &times;
        </button>
      </div>
      <div class="drawer-item-qty-row">
        <span style="font-size: 0.82rem; color: var(--text-secondary);">Quantity:</span>
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty('${item.id}', -1)">-</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

// WhatsApp RFQ Checkout
window.submitRfqWhatsApp = function() {
  if (state.rfqItems.length === 0) {
    alert('Please add at least one product to your quote list.');
    return;
  }

  const locationSelect = document.getElementById('drawerDeliveryLocation');
  const siteLocation = locationSelect ? locationSelect.value : 'Santalpur / Radhanpur Highway';
  const contractorName = document.getElementById('drawerContractorName')?.value || 'Client';

  let msg = `*NEW QUOTE INQUIRY - ANKIT BUILDING MATERIALS*\n`;
  msg += `*Name / Firm:* ${contractorName}\n`;
  msg += `*Site Delivery Location:* ${siteLocation}\n\n`;
  msg += `*Requested Materials:*\n`;

  state.rfqItems.forEach((item, idx) => {
    msg += `${idx + 1}. ${item.title} - Qty: ${item.qty} (${item.unit})\n`;
  });

  msg += `\nPlease reply with wholesale rates, GST invoice details, and dispatch timeframe.`;

  const url = `https://wa.me/919714858660?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
};

// Event Listeners
function setupEventListeners() {
  // RFQ Drawer Open / Close
  const rfqDrawer = document.getElementById('rfqDrawer');
  const rfqBackdrop = document.getElementById('rfqBackdrop');
  const openRfqBtn = document.getElementById('openRfqCartBtn');
  const closeRfqBtn = document.getElementById('closeRfqBtn');

  function openDrawer() {
    renderDrawerItems();
    rfqDrawer?.classList.add('open');
    rfqBackdrop?.classList.add('open');
  }

  function closeDrawer() {
    rfqDrawer?.classList.remove('open');
    rfqBackdrop?.classList.remove('open');
  }

  openRfqBtn?.addEventListener('click', openDrawer);
  closeRfqBtn?.addEventListener('click', closeDrawer);
  rfqBackdrop?.addEventListener('click', closeDrawer);

  // Billboard Lightbox Modal
  const bannerLightbox = document.getElementById('bannerLightbox');
  const openBannerTriggers = document.querySelectorAll('.open-banner-modal');
  const closeBannerBtn = document.getElementById('closeBannerModal');

  openBannerTriggers.forEach(el => {
    el.addEventListener('click', () => {
      bannerLightbox?.classList.add('open');
    });
  });

  closeBannerBtn?.addEventListener('click', () => {
    bannerLightbox?.classList.remove('open');
  });

  bannerLightbox?.addEventListener('click', (e) => {
    if (e.target === bannerLightbox) {
      bannerLightbox.classList.remove('open');
    }
  });

  // Catalog Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeCategory = btn.getAttribute('data-filter') || 'all';
      renderProducts();
    });
  });

  // Catalog Search
  const searchInput = document.getElementById('catalogSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim();
      renderProducts();
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-question');
    q?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // Language Buttons
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.getAttribute('data-lang');
      switchLanguage(lang);
    });
  });

  // Contact Form Instant WhatsApp Dispatch
  const inquiryForm = document.getElementById('quickInquiryForm');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('inqName')?.value || '';
      const phone = document.getElementById('inqPhone')?.value || '';
      const type = document.getElementById('inqType')?.value || 'General Inquiry';
      const msg = document.getElementById('inqMsg')?.value || '';

      const text = `*NEW WEBSITE INQUIRY - ANKIT BUILDING MATERIALS*\n*From:* ${name}\n*Phone:* ${phone}\n*Category:* ${type}\n*Message:* ${msg}\n\nLocation: Santalpur / Radhanpur Highway`;
      window.open(`https://wa.me/919714858660?text=${encodeURIComponent(text)}`, '_blank');
      showToast('Redirecting to WhatsApp to send your inquiry...');
    });
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Global Location Button Handler
  document.addEventListener('click', (e) => {
    const locBtn = e.target.closest('.location-btn, .location-link, [data-action="open-map"]');
    if (locBtn && locBtn.tagName !== 'A') {
      window.open(ANKIT_GOOGLE_MAPS_URL, '_blank', 'noopener,noreferrer');
    }
  });
}

// Multilingual Switcher
function switchLanguage(lang) {
  state.currentLang = lang;
  const t = i18n[lang] || i18n.en;

  const heroTag = document.getElementById('i18nHeroTag');
  const heroSlogan = document.getElementById('i18nHeroSlogan');
  const heroSloganSub = document.getElementById('i18nHeroSloganSub');
  const heroTitle = document.getElementById('i18nHeroTitle');
  const heroSub = document.getElementById('i18nHeroSub');
  const catTag = document.getElementById('i18nCatTag');
  const catTitle = document.getElementById('i18nCatTitle');

  if (heroTag) heroTag.textContent = t.heroTag;
  if (heroSlogan) heroSlogan.textContent = t.heroSlogan;
  if (heroSloganSub) heroSloganSub.textContent = t.heroSloganSub;
  if (heroTitle) heroTitle.innerHTML = `${t.heroTitleHighlight} <br><span class="gradient-text">All Type Hardware Trading</span>`;
  if (heroSub) heroSub.textContent = t.heroSubtitle;
  if (catTag) catTag.textContent = t.catTag;
  if (catTitle) catTitle.innerHTML = `${t.catTitle} <span class="highlight-gold">&amp; Highway Yard</span>`;

  document.body.classList.toggle('lang-gu', lang === 'gu');
}

// ==========================================================================
// CLEAN ROUTE-FREE NAVIGATION & SMOOTH SCROLLING
// ==========================================================================
function setupCleanNavigation() {
  // 1. Immediately clean any remnant hash in URL on page load
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  // 2. Intercept all in-page navigation clicks and scroll smoothly without changing URL
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"], [data-scroll]');
    if (!link) return;

    // Skip tel, mailto, maps, and external links
    const href = link.getAttribute('href');
    if (href && (href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http') || href.startsWith('//'))) {
      return;
    }

    let targetId = link.getAttribute('data-scroll');
    if (!targetId && href && href.startsWith('#') && href.length > 1) {
      targetId = href.substring(1);
    }

    if (targetId) {
      e.preventDefault();
      scrollToSection(targetId);
      closeMobileMenu();
    }
  });
}

function scrollToSection(targetId) {
  if (!targetId) return;
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  const header = document.getElementById('siteHeader');
  const headerOffset = header ? header.offsetHeight + 10 : 75;
  const elementPosition = targetElement.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });

  // Ensure browser URL bar remains strictly clean without route suffixes (#estimator, #catalog, etc.)
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
}

// ==========================================================================
// MOBILE DRAWER NAVIGATION
// ==========================================================================
function setupMobileMenu() {
  const menuToggle = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileNavBackdrop');
  const closeBtn = document.getElementById('mobileNavCloseBtn');

  function openMenu() {
    drawer?.classList.add('open');
    backdrop?.classList.add('open');
    menuToggle?.classList.add('active');
    document.body.classList.add('menu-open');
  }

  window.closeMobileMenu = function() {
    drawer?.classList.remove('open');
    backdrop?.classList.remove('open');
    menuToggle?.classList.remove('active');
    document.body.classList.remove('menu-open');
  };

  menuToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (drawer?.classList.contains('open')) {
      closeMobileMenu();
    } else {
      openMenu();
    }
  });

  closeBtn?.addEventListener('click', closeMobileMenu);
  backdrop?.addEventListener('click', closeMobileMenu);

  // Close drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer?.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // Attach language selector listeners inside mobile drawer
  drawer?.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang') || 'en';
      switchLanguage(lang);
    });
  });
}

// Scroll Tracking for Active Nav and Header Scrolled State (Route-Free)
function setupScrollTracking() {
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 130;
      const height = section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const target = link.getAttribute('data-scroll') || (link.getAttribute('href')?.replace('#', ''));
      link.classList.toggle('active', target === current);
    });

    mobileLinks.forEach(link => {
      const target = link.getAttribute('data-scroll') || (link.getAttribute('href')?.replace('#', ''));
      link.classList.toggle('active', target === current);
    });
  }, { passive: true });
}

// Toast Notification
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

// ==========================================================================
// 3-STATE THEME SLIDER (LIGHT, SYSTEM, DARK)
// ==========================================================================
function initTheme() {
  const savedMode = localStorage.getItem('ankit-theme-mode') || 'dark';
  applyThemeMode(savedMode, false);

  // Attach event listeners to all theme slider buttons
  const themeButtons = document.querySelectorAll('.theme-toggle-btn');
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-theme-val') || 'dark';
      applyThemeMode(mode, true);
    });
  });

  // Watch for OS system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    const currentMode = localStorage.getItem('ankit-theme-mode');
    if (currentMode === 'system') {
      applyThemeMode('system', false);
    }
  });
}

function applyThemeMode(mode, savePreference = true) {
  if (savePreference) {
    localStorage.setItem('ankit-theme-mode', mode);
  }

  // Determine actual effective theme (light or dark)
  let effectiveTheme = mode;
  if (mode === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    effectiveTheme = prefersDark ? 'dark' : 'light';
  }

  // Apply to document
  document.documentElement.setAttribute('data-theme', effectiveTheme);

  // Update all theme slider containers
  const containers = document.querySelectorAll('.theme-slider-container');
  containers.forEach(container => {
    container.setAttribute('data-current', mode);

    const buttons = container.querySelectorAll('.theme-toggle-btn');
    buttons.forEach(btn => {
      const val = btn.getAttribute('data-theme-val');
      btn.classList.toggle('active', val === mode);
    });
  });
}

// ==========================================================================
// SMOOTH SCROLL REVEAL ANIMATIONS
// ==========================================================================
function setupScrollAnimations() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal, .stagger-item').forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px'
  });

  window.scrollObserverInstance = observer;

  // Observe elements
  observeAnimatedElements(observer);

  // Hook into category & product rendering
  window.reobserveAnimatedCards = () => {
    setTimeout(() => {
      document.querySelectorAll('.stagger-item:not(.revealed), .reveal:not(.revealed)').forEach(el => {
        observer.observe(el);
      });
    }, 40);
  };
}

function observeAnimatedElements(observer) {
  const elements = document.querySelectorAll(`
    .section-header,
    .billboard-card,
    .category-card,
    .product-card,
    .estimator-card,
    .logistics-card,
    .trust-feature-card,
    .testimonial-card,
    .contact-card,
    .faq-item,
    .map-visual-box
  `);

  elements.forEach((el) => {
    if (!el.classList.contains('revealed')) {
      if (!el.classList.contains('stagger-item')) {
        el.classList.add('reveal');
      }
      observer.observe(el);
    }
  });
}
