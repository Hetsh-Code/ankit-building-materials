/**
 * ANKIT BUILDING MATERIALS - INTERACTIVE APPLICATION
 * Radhanpur Kandla Highway near Over Bridge, Santalpur, Patan - 385350
 * Phone: +91 97148 58660
 * Multilingual Architecture: English (en) | Gujarati (gu) | Hindi (hi)
 */

// Google Maps Exact Location URL
const ANKIT_GOOGLE_MAPS_URL = "https://www.google.com/maps/place/Ankit+building+materials+ankit+hardware+%26tools/@23.7623567,71.1689968,759m/data=!3m2!1e3!4b1!4m6!3m5!1s0x395affb5c0000001:0xa4904fe5030a7aba!8m2!3d23.7623518!4d71.1715717!16s%2Fg%2F11c764tf32?entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D";

// Global State
const state = {
  rfqItems: [],
  currentLang: localStorage.getItem('ankit_language') || 'en',
  activeCategory: 'all',
  searchQuery: ''
};

// Global Google Maps opener
window.openGoogleMapsLocation = function() {
  window.open(ANKIT_GOOGLE_MAPS_URL, '_blank', 'noopener,noreferrer');
};

// 9 Categories from Billboard (Multilingual Data)
const categoriesData = [
  {
    id: 'cement',
    nameEn: 'Cement & Building Materials',
    nameGu: 'સિમેન્ટ અને બાંધકામ સામગ્રી',
    nameHi: 'सीमेंट एवं निर्माण सामग्री',
    icon: '🏗️',
    img: 'assets/cement_construction.jpg',
    descEn: 'High-strength OPC & PPC cement bags, AAC blocks, red clay bricks, TMT 550D rebar steel, river sand, and aggregates.',
    descGu: 'ઉચ્ચ ગુણવત્તાવાળા ઓપીસી અને પીપીસી સિમેન્ટ, એએસી બ્લોક્સ, લાલ ઈંટો, ૫૫૦ડી સ્ટીલ સળિયા, રેતી અને કપચી.',
    descHi: 'उच्च गुणवत्ता वाले ओपीसी एवं पीपीसी सीमेंट, एएसी ब्लॉक्स, लाल ईंटें, ५५૦डी सरिया, रेत और गिट्टी थोक दरों पर उपलब्ध.',
    brands: 'UltraTech, Ambuja, Bangur, Tata Tiscon',
    tagsEn: ['OPC 53', 'PPC Super', 'AAC Blocks', 'Fe550D Rebar', 'Aggregates'],
    tagsGu: ['ઓપીસી ૫૩', 'પીપીસી સુપર', 'એએસી બ્લોક', '૫૫૦ડી સળિયા', 'કપચી રેતી'],
    tagsHi: ['ओपीसी ५३', 'पीपीसी सुपर', 'एएसी ब्लॉक', '५५०डी सरिया', 'गिट्टी और रेत']
  },
  {
    id: 'pvc',
    nameEn: 'PVC Pipes & Fittings',
    nameGu: 'પીવીસી પાઇપ અને ફીટીંગ્સ',
    nameHi: 'पीवीसी पाइप्स एवं फिटिंग्स',
    icon: '🚰',
    img: 'assets/pipes_plumbing.jpg',
    descEn: 'Complete residential, commercial & agricultural piping: CPVC, UPVC, SWR, column borewell pipes, elbows, tees & brass valves.',
    descGu: 'સંપૂર્ણ રહેણાંક અને ખેતીવાડી પાઇપિંગ: સીપીવીસી, યુપીવીસી, બોરવેલ કોલમ પાઇપ, એલ્બો, ટી અને બ્રાસ વાલ્વ.',
    descHi: 'आवासीय एवं कृषि पाइपिंग: सीपीवीसी, यूपीवीसी, बोरवेल कॉलम पाइप्स, एल्बो, टी एवं ब्रास वाल्व.',
    brands: 'Astral, Supreme, Ashirvad, Finolex',
    tagsEn: ['CPVC SDR 11', 'UPVC Sch 40', 'Borewell Casing', 'Brass Valves', 'Solvent Cement'],
    tagsGu: ['સીપીવીસી પાઇપ', 'યુપીવીસી પાઇપ', 'બોરવેલ કેસિંગ', 'બ્રાસ વાલ્વ', 'સોલ્વન્ટ સિમેન્ટ'],
    tagsHi: ['सीपीवीसी पाइप', 'यूपीवीसी पाइप', 'बोरवेल केसिंग', 'ब्रास वाल्व', 'सॉल्वेंट सीमेंट']
  },
  {
    id: 'hardware',
    nameEn: 'Hardware Items & GI Wire',
    nameGu: 'હાર્ડવેર આઇટમ્સ અને વાયર',
    nameHi: 'हार्डवेयर आइटम्स एवं तार',
    icon: '🔒',
    img: 'assets/tools_hardware.jpg',
    descEn: 'GI binding wire, barbed wire for fencing, chainlink mesh, heavy brass padlocks, stainless steel door hinges & aldrop fittings.',
    descGu: 'જીઆઈ બાઈન્ડિંગ વાયર, કાંટાળો તાર, ચેઈનલિંક જાળી, ભારે તાળાં, સ્ટેઈનલેસ સ્ટીલ હિન્જિસ અને સ્ટોપર.',
    descHi: 'जीआई बाइंडिंग तार, कांटेदार तार, चेनलिंक जाली, मजबूत ताले, स्टेनलेस स्टील कब्ज़े और कुंडी.',
    brands: 'Godrej, Link, Anchor, High-Grade GI',
    tagsEn: ['Binding Wire (18G)', 'Barbed Wire', 'GI Chainlink', 'SS Hinges', 'Heavy Locks'],
    tagsGu: ['બાઈન્ડિંગ વાયર', 'કાંટાળો તાર', 'ચેઈનલિંક જાળી', 'એસએસ હિન્જિસ', 'ભારે તાળાં'],
    tagsHi: ['बाइंडिंग तार', 'कांटेदार तार', 'चेनलिंक जाली', 'एसएस कब्जे', 'मजबूत ताले']
  },
  {
    id: 'tools',
    nameEn: 'Hand & Power Tools',
    nameGu: 'હેન્ડ અને પાવર ટૂલ્સ',
    nameHi: 'हैंड एवं पावर टूल्स',
    icon: '🛠️',
    img: 'assets/tools_hardware.jpg',
    descEn: 'Professional construction & masonry tools: claw hammers, pipe wrenches, pliers, brick trowels, magnetic spirit levels, and tapes.',
    descGu: 'પ્રોફેશનલ કન્સ્ટ્રક્શન ટૂલ્સ: હથોડી, પાઇપ રિંચ, પક્કડ, લેવલ પાઇપ, સ્પીરિટ લેવલ અને ૫૦ મીટર માપપટ્ટી.',
    descHi: 'पेशेवर निर्माण टूल्स: हथौड़ी, पाइप रिंच, प्लास, कन्नी, स्पिरिट लेवल एवं ५० मीटर नाप टेप.',
    brands: 'Bosch, Stanley, Taparia, Eastman',
    tagsEn: ['Claw Hammers', 'Pipe Wrenches', 'Spirit Levels', 'Plaster Trowels', 'Tape 50M'],
    tagsGu: ['હથોડી', 'પાઇપ રિંચ', 'સ્પીરિટ લેવલ', 'લેલી પ્લાસ્ટર', '૫૦મી ટેપ'],
    tagsHi: ['हथौड़ी', 'पाइप रिंच', 'स्पिरिट लेवल', 'कन्नी प्लास्टर', '५०मी टेप']
  },
  {
    id: 'safety',
    nameEn: 'Safety Products (Industrial & PPE)',
    nameGu: 'સેફ્ટી પ્રોડક્ટ્સ (ઇન્ડસ્ટ્રીયલ & PPE)',
    nameHi: 'सुरक्षा उपकरण (औद्योगिक एवं PPE)',
    icon: '🦺',
    img: 'assets/safety_ppe.jpg',
    descEn: 'Your safety is our priority. ISI-certified hard hat helmets, neon reflective jackets, steel-toe boots, heavy leather gloves & safety goggles.',
    descGu: 'તમારી સલામતી અમારી પ્રાથમિકતા. ISI હેલ્મેટ, રેફ્લેક્ટિવ જેકેટ્સ, સ્ટીલ-ટો સેફ્ટી બૂટ, લેધર ગ્લોવ્ઝ અને ગોગલ્સ.',
    descHi: 'आपकी सुरक्षा हमारी प्राथमिकता। ISI प्रमाणित हेलमेट, रिफ्लेक्टिव जैकेट, स्टील-टो सेफ्टी जूते और सुरक्षा चश्मे.',
    brands: 'Karam, 3M, Frontier, Tiger Safety',
    tagsEn: ['ISI Hard Hats', 'Reflective Vests', 'Steel Toe Boots', 'Safety Goggles', 'Fall Harness'],
    tagsGu: ['ISI હેલ્મેટ', 'રેફ્લેક્ટિવ જેકેટ', 'સેફ્ટી શૂઝ', 'સેફ્ટી ગોગલ્સ', 'સેફ્ટી બેલ્ટ'],
    tagsHi: ['ISI हेलमेट', 'रिफ्लेक्टिव जैकेट', 'सेफ्टी जूते', 'सेफ्टी चश्मा', 'सेफ्टी बेल्ट']
  },
  {
    id: 'tarpaulin',
    nameEn: 'Tarpaulin & HDPE Sheets',
    nameGu: 'તાડપત્રી અને એચડીપીઇ શીટ્સ',
    nameHi: 'तिरपाल एवं एचडीपीई शीट्स',
    icon: '⛺',
    img: 'assets/waterproofing_tarps.jpg',
    descEn: '100% waterproof multi-layer cross-laminated blue/green poly tarpaulins, pond lining, concrete curing sheets, and heavy truck cargo covers.',
    descGu: '૧૦૦% વોટરપ્રૂફ મલ્ટી-લેયર ક્રોસ લેમિનેટેડ તાડપત્રી, તળાવ લાઇનિંગ, સ્લેબ ક્યોરિંગ શીટ્સ અને ટ્રક કવર.',
    descHi: '१००% वाटरप्रूफ मल्टी-लेयर क्रॉस लैमिनेटेड तिरपाल, तालाब लाइनिंग, स्लैब क्यूरिंग शीट्स और ट्रक कवर्स.',
    brands: 'Silpaulin, Tiger Tarp, Cross-Laminated HDPE',
    tagsEn: ['24x18 Heavy Tarp', '30x20 Agri Tarp', 'Curing Sheets', 'Pond Lining', 'UV Coated'],
    tagsGu: ['૨૪x૧૮ તાડપત્રી', '૩૦x૨૦ તાડપત્રી', 'ક્યોરિંગ શીટ', 'તળાવ લાઇનિંગ', 'UV કોટેડ'],
    tagsHi: ['२४x१८ तिरपाल', '३०x२० तिरपाल', 'क्यूरिंग शीट', 'तालाब लाइनिंग', 'UV कोटेड']
  },
  {
    id: 'waterproofing',
    nameEn: 'Waterproofing Materials',
    nameGu: 'વોટરપ્રૂફિંગ કેમિકલ્સ',
    nameHi: 'वॉटरप्रूफिंग केमिकल्स',
    icon: '💧',
    img: 'assets/waterproofing_tarps.jpg',
    descEn: 'Advanced construction chemicals, integral waterproofing compounds, terrace acrylic coatings, SBR bonding agents, and bitumen primers.',
    descGu: 'આધુનિક કન્સ્ટ્રક્શન કેમિકલ્સ, ઇન્ટિગ્રલ વોટરપ્રૂફિંગ, ટેરેસ કોટિંગ, એસબીઆર બોન્ડિંગ એજન્ટ અને પ્રાઈમર.',
    descHi: 'उन्नत कंस्ट्रक्शन केमिकल्स, इंटीग्रल वॉटरप्रूफिंग कंपाउंड, टेरेस कोटिंग, एसबीआर बॉन्डिंग एजेंट और प्राइमर.',
    brands: 'Dr. Fixit, Fosroc, Sika, Asian Paints',
    tagsEn: ['Dr Fixit LW+', 'Fastflex Coating', 'SBR Latex', 'Crack Filler', 'Bitumen Primer'],
    tagsGu: ['ડૉ. ફિક્સિટ LW+', 'ફાસ્ટફ્લેક્સ', 'SBR લેટેક્સ', 'ક્રેક સીલ', 'પ્રાઈમર'],
    tagsHi: ['डॉ. फिक्सिट LW+', 'फास्टफ्लेक्स', 'SBR लेटेक्स', 'क्रैक सील', 'प्राइमर']
  },
  {
    id: 'abrasives',
    nameEn: 'Abrasive Items & Cutting Wheels',
    nameGu: 'એબ્રેસિવ આઇટમ્સ અને કટીંગ વ્હીલ્સ',
    nameHi: 'एब्रेसिव आइटम्स एवं कटिंग व्हील्स',
    icon: '⚙️',
    img: 'assets/tools_hardware.jpg',
    descEn: 'High-speed metal cutting wheels, 14-inch chop saw wheels, flap discs, diamond concrete cutting blades, and grinding discs.',
    descGu: 'હાઈ-સ્પીડ મેટલ કટીંગ વ્હીલ્સ, ૧૪-ઇંચ ચોપ સો ડિસ્ક, ફ્લેપ ડિસ્ક, ડાયમંડ કોંક્રીટ બ્લેડ અને ગ્રાઇન્ડિંગ વ્હીલ્સ.',
    descHi: 'हाई-स्पीड मेटल कटिंग व्हील्स, १४-इंच चॉप सॉ डिस्क, फ्लैप डिस्क, डायमंड कंक्रीट ब्लेड और ग्राइंडिंग व्हील्स.',
    brands: 'Norton, Pro-Grip, CUMI, Bosch',
    tagsEn: ['4" Cut-Off Wheel', '14" Chop Saw Disc', 'Diamond Blades', 'Flap Discs P80', 'Sandpaper'],
    tagsGu: ['૪" કટીંગ વ્હીલ', '૧૪" ચોપ સો ડિસ્ક', 'ડાયમંડ બ્લેડ', 'ફ્લેપ ડિસ્ક', 'પોલિશ પેપર'],
    tagsHi: ['४" कटिंग व्हील', '१४" चॉप सॉ डिस्क', 'डायमंड ब्लेड', 'फ्लैप डिस्क', 'पॉलिश पेपर']
  },
  {
    id: 'fasteners',
    nameEn: 'Fasteners (Screws & Nails)',
    nameGu: 'ફાસ્ટનર્સ (સ્ક્રૂ અને ખીલા)',
    nameHi: 'फास्टनर्स (स्क्रू एवं कीलें)',
    icon: '🔩',
    img: 'assets/tools_hardware.jpg',
    descEn: 'Heavy industrial fasteners: Grade 8.8 hex bolts with nuts, self-drilling roofing screws with EPDM washers, drywall screws & wire nails.',
    descGu: 'ગ્રેડ ૮.૮ હાઈ-ટેન્સાઈલ હેક્સ બોલ્ટ્સ અને નટ્સ, રૂફિંગ સેલ્ફ-ડ્રિલિંગ સ્ક્રૂ, ડ્રાયવોલ સ્ક્રૂ અને સ્ટીલ ખીલા.',
    descHi: 'ग्रेड ८.८ हाई-टेंसाइल हेक्स बोल्ट्स एवं नट्स, रूफिंग सेल्फ-ड्रिलिंग स्क्रू, ड्राईवॉल स्क्रू और स्टील कीलें.',
    brands: 'Unbrako, Zenith, High-Tensile GI',
    tagsEn: ['Hex Head Bolts', 'Self-Drilling Screws', 'Drywall Screws', 'Expansion Anchors', 'Wire Nails'],
    tagsGu: ['હેક્સ બોલ્ટ્સ', 'સેલ્ફ-ડ્રિલિંગ સ્ક્રૂ', 'ડ્રાયવોલ સ્ક્રૂ', 'એન્કર બોલ્ટ', 'સ્ટીલ ખીલા'],
    tagsHi: ['हेक्स बोल्ट्स', 'सेल्फ-ड्रिलिंग स्क्रू', 'ड्राईवॉल स्क्रू', 'एंकर बोल्ट', 'स्टील कीलें']
  }
];

// Product Catalog Data (33 Branded Hardware & Building Materials)
const productsData = [
  // Cement & Building
  { id: 'p1', cat: 'cement', titleEn: 'UltraTech Super Cement (50kg)', titleGu: 'અલ્ટ્રાટેક સુપર સિમેન્ટ (૫૦ કિલો)', titleHi: 'अल्ट्राटेक सुपर सीमेंट (५० किग्रा)', brand: 'UltraTech Cement', specsEn: 'PPC / OPC 53 Grade, High early strength, ideal for slabs & columns.', specsGu: 'પીપીસી / ઓપીસી ૫૩ ગ્રેડ, સ્લેબ અને પિલર માટે શ્રેષ્ઠ મજબૂતી.', specsHi: 'पीपीसी / ओपीसी ५३ ग्रेड, स्लैब एवं पिलर निर्माण हेतु अति उत्तम.', unitEn: 'Per Bag (50 Kg)', unitGu: 'પ્રતિ થેલી (૫૦ કિલો)', unitHi: 'प्रति बोरी (५० किग्रा)', minEn: '50 Bags', minGu: '૫૦ થેલી', minHi: '५० बोरी' },
  { id: 'p2', cat: 'cement', titleEn: 'Ambuja Plus Roof Special Cement', titleGu: 'અંબુજા પ્લસ રૂફ સ્પેશિયલ સિમેન્ટ', titleHi: 'अंबुजा प्लस रूफ स्पेशल सीमेंट', brand: 'Ambuja Cements', specsEn: 'Engineered with Micro-Silica for high density, waterproof concrete slabs.', specsGu: 'માઇક્રો-સિલિકા ટેકનોલોજી, વોટરપ્રૂફ કોંક્રીટ સ્લેબ માટે શ્રેષ્ઠ.', specsHi: 'माइक्रो-सिलिका युक्त, वाटरप्रूफ कंक्रीट स्लैब हेतु विशेष.', unitEn: 'Per Bag (50 Kg)', unitGu: 'પ્રતિ થેલી (૫૦ કિલો)', unitHi: 'प्रति बोरी (५० किग्रा)', minEn: '50 Bags', minGu: '૫૦ થેલી', minHi: '૫૦ बोरी' },
  { id: 'p3', cat: 'cement', titleEn: 'AAC Lightweight Blocks (600x200x150mm)', titleGu: 'એએસી હળવા બ્લોક્સ (૬૦૦x૨૦૦x૧૫૦mm)', titleHi: 'एएसी हल्के ब्लॉक्स (६००x२००x१५०mm)', brand: 'GreenTech Block', specsEn: 'Thermal insulated, earthquake-resistant autoclaved aerated concrete blocks.', specsGu: 'ગરમી પ્રતિરોધક, ભૂકંપ-પ્રૂફ ઓટોક્લેવ્ડ એરેટેડ કોંક્રીટ બ્લોક્સ.', specsHi: 'थर्मल इंसुलेटेड, भूकंप प्रतिरोधी हल्के कंक्रीट ब्लॉक्स.', unitEn: 'Per Cubic Meter', unitGu: 'પ્રતિ ક્યુબિક મીટર', unitHi: 'प्रति क्यूबिक मीटर', minEn: '1 Truck', minGu: '૧ ટ્રક', minHi: '१ ट्रक' },
  { id: 'p4', cat: 'cement', titleEn: 'Fe550D TMT Rebar Steel (8mm to 32mm)', titleGu: 'Fe550D TMT સ્ટીલ સળિયા (૮mm થી ૩૨mm)', titleHi: 'Fe550D टीएमटी सरिया (८mm से ३२mm)', brand: 'Tata Tiscon / Jindal', specsEn: 'Primary billet, high bendability and earthquake resistance with test certificate.', specsGu: 'પ્રાઈમરી બિલેટ, લચીલાપણું અને ભૂકંપ રક્ષણ, ટેસ્ટ સર્ટિફિકેટ સાથે.', specsHi: 'प्राइमरी बिलेट, उच्च लचीलापन एवं भूकंप प्रतिरोधक, टेस्ट सर्टिफिकेट सहित.', unitEn: 'Per Metric Ton (MT)', unitGu: 'પ્રતિ મેટ્રિક ટન (MT)', unitHi: 'प्रति मीट्रिक टन (MT)', minEn: '2 MT', minGu: '૨ MT', minHi: '२ MT' },

  // Pipes & Fittings
  { id: 'p5', cat: 'pvc', titleEn: 'Astral CPVC PRO Hot & Cold Pipes', titleGu: 'એસ્ટ્રલ સીપીવીસી પ્રો ગરમ-ઠંડા પાઇપ', titleHi: 'एस्ट्रल सीपीवीसी प्रो गर्म-ठंडे पाइप्स', brand: 'Astral Pipes', specsEn: 'SDR 11 & SDR 13.5, withstands up to 93°C, NSF certified lead-free plumbing.', specsGu: 'SDR 11 અને SDR 13.5, ૯૩°C તાપમાન સહન કરે, લીડ-ફ્રી પ્લમ્બિંગ.', specsHi: 'SDR 11 एवं SDR 13.5, ९३°C तक सहनशील, सीसा-मुक्त प्लंबिंग.', unitEn: 'Per Length (3 & 5 Mtr)', unitGu: 'પ્રતિ લેન્થ (૩ & ૫ મીટર)', unitHi: 'प्रति लेंथ (३ एवं ५ मीटर)', minEn: '10 Lengths', minGu: '૧૦ લેન્થ', minHi: '१० लेंथ' },
  { id: 'p6', cat: 'pvc', titleEn: 'Supreme UPVC Schedule 40 Pressure Pipes', titleGu: 'સુપ્રીમ યુપીવીસી શિડ્યુલ ૪૦ પ્રેશર પાઇપ', titleHi: 'सुप्रीम यूपीवीसी शेड्यूल ४० प्रेशर पाइप्स', brand: 'Supreme Industries', specsEn: 'High-tensile rigid UPVC for cold water distribution & industrial supply.', specsGu: 'ઠંડા પાણી અને ઔદ્યોગિક સપ્લાય માટે મજબૂત યુપીવીસી પાઇપ.', specsHi: 'ठंडे पानी के वितरण एवं औद्योगिक सप्लाई हेतु मजबूत यूपीवीसी पाइप्स.', unitEn: 'Per 3 Mtr Length', unitGu: 'પ્રતિ ૩ મીટર લેન્થ', unitHi: 'प्रति ३ मीटर लेंथ', minEn: '15 Lengths', minGu: '૧૫ લેન્થ', minHi: '१५ लेंथ' },
  { id: 'p7', cat: 'pvc', titleEn: 'Deep Well Column Borewell Casing Pipes', titleGu: 'ડીપ વેલ બોરવેલ કોલમ કેસિંગ પાઇપ', titleHi: 'बोरवेल कॉलम केसिंग पाइप्स (डीप वेल)', brand: 'Supreme / Finolex', specsEn: 'Special trapezoidal thread, heavy pressure rating for 300-1000 ft borewells.', specsGu: 'ટ્રેપેઝોઇડલ થ્રેડ, ૩૦૦-૧૦૦૦ ફૂટ ઊંડા બોરવેલ માટે હેવી પ્રેશર.', specsHi: 'स्पेशल ट्रेपेज़ॉइडल थ्रेड, ३००-१००० फीट गहरे बोरवेल हेतु सक्षम.', unitEn: 'Per 3 Mtr Length', unitGu: 'પ્રતિ ૩ મીટર લેન્થ', unitHi: 'प्रति ३ मीटर लेंथ', minEn: '5 Lengths', minGu: '૫ લેન્થ', minHi: '५ लेंथ' },
  { id: 'p8', cat: 'pvc', titleEn: 'Heavy Brass Full-Port Ball Valve (1" to 2")', titleGu: 'હેવી બ્રાસ બોલ વાલ્વ (૧" થી ૨")', titleHi: 'मजबूत ब्रास फुल-पोर्ट बॉल वाल्व (१" से २")', brand: 'Zoloto / Leader Type', specsEn: 'Forged brass body, chrome plated ball, Teflon seal, tested up to 25 Bar.', specsGu: 'પિત્તળ બોડી, ક્રોમ પ્લેટેડ બોલ, ટેફલોન સીલ, ૨૫ બાર ટેસ્ટેડ.', specsHi: 'पीतल बॉडी, क्रोम प्लेटेड बॉल, टेफ्लॉन सील, २५ बार तक परीक्षित.', unitEn: 'Per Piece', unitGu: 'પ્રતિ નંગ', unitHi: 'प्रति पीस', minEn: '5 Pieces', minGu: '૫ નંગ', minHi: '५ पीस' },

  // Hardware
  { id: 'p9', cat: 'hardware', titleEn: 'GI Binding Wire (18 & 20 Gauge)', titleGu: 'જીઆઈ બાઈન્ડિંગ વાયર (૧૮ & ૨૦ ગેજ)', titleHi: 'जीआई बाइंडिंग तार (१८ एवं २० गेज)', brand: 'Tata / Jindal Wire', specsEn: 'Soft annealed zinc-coated wire for fast & firm TMT steel rebar tying.', specsGu: 'નરમ ઝિંક-કોટેડ વાયર, સળિયા બાંધવા માટે મજબૂત અને સરળ.', specsHi: 'नरम जस्तीकृत तार, सरिया बांधने हेतु मजबूत एवं लचीला.', unitEn: 'Per 25 Kg Bundle', unitGu: '૨૫ કિલો બંડલ', unitHi: '२५ किग्रा बंडल', minEn: '1 Bundle', minGu: '૧ બંડલ', minHi: '१ बंडल' },
  { id: 'p10', cat: 'hardware', titleEn: 'Heavy Galvanized Barbed Wire (12x14 Gauge)', titleGu: 'હેવી ગેલ્વેનાઇઝ્ડ કાંટાળો તાર (૧૨x૧૪ ગેજ)', titleHi: 'कांटेदार तार गैल्वेनाइज्ड (१२x१४ गेज)', brand: 'Industrial Grade', specsEn: 'High corrosion resistance, razor-sharp barbs for agricultural & highway fencing.', specsGu: 'કાટ-પ્રતિરોધક, ખેતર અને હાઈવે ફેન્સિંગ માટે ધારદાર કાંટા.', specsHi: 'जंग प्रतिरोधी, खेतों एवं हाईवे फेंसिंग हेतु तीखे कांटेदार तार.', unitEn: 'Per Roll (30-40 Kg)', unitGu: 'પ્રતિ રોલ (૩૦-૪૦ કિલો)', unitHi: 'प्रति रोल (३०-४० किग्रा)', minEn: '2 Rolls', minGu: '૨ રોલ', minHi: '२ रोल' },
  { id: 'p11', cat: 'hardware', titleEn: 'Heavy Stainless Steel SS 304 Butt Hinges (4"x3")', titleGu: 'સ્ટેઈનલેસ સ્ટીલ SS 304 મિજાગરા (૪"x૩")', titleHi: 'स्टेनलेस स्टील SS 304 कब्ज़े (४"x३")', brand: 'Apex Architectural', specsEn: 'Ball bearing smooth movement, anti-rust, 3mm thickness for heavy doors.', specsGu: 'બોલ બેરિંગ સ્મૂથ મૂવમેન્ટ, કાટ-મુક્ત, ભારે દરવાજા માટે ૩mm.', specsHi: 'बॉल बेयरिंग स्मूथ मूवमेंट, जंगरोधी, भारी दरवाजों हेतु ३mm मोटाई.', unitEn: 'Per Pair', unitGu: 'પ્રતિ જોડી', unitHi: 'प्रति जोड़ी', minEn: '10 Pairs', minGu: '૧૦ જોડી', minHi: '१० जोड़ी' },
  { id: 'p12', cat: 'hardware', titleEn: 'Godrej Heavy Duty Brass Nav-Tal Padlock', titleGu: 'ગોદરેજ હેવી ડ્યુટી બ્રાસ નવ-તાલ તાળું', titleHi: 'गोदरेज हेवी ड्यूटी ब्रास नव-ताल ताला', brand: 'Godrej Security', specsEn: 'Hardened steel shackle, 7 levers, saw-resistant and rustproof mechanism.', specsGu: 'હાર્ડન્ડ સ્ટીલ કડી, ૭ લીવર, કરવત-પ્રતિરોધક અને કાટ-મુક્ત.', specsHi: 'मजबूत स्टील कड़ी, ७ लीवर, आरी प्रतिरोधी एवं जंगरोधी तंत्र.', unitEn: 'Per Unit', unitGu: 'પ્રતિ નંગ', unitHi: 'प्रति पीस', minEn: '2 Units', minGu: '૨ નંગ', minHi: '२ पीस' },

  // Hand Tools
  { id: 'p13', cat: 'tools', titleEn: 'Industrial Drop-Forged Steel Claw Hammer (16oz)', titleGu: 'ઇન્ડસ્ટ્રીયલ ડ્રોપ-ફોર્જ્ડ સ્ટીલ હથોડી (૧૬oz)', titleHi: 'औद्योगिक स्टील हथौड़ी कील निकालने वाली (१६oz)', brand: 'Stanley / Taparia', specsEn: 'Anti-slip rubberized grip, tempered steel head with nail puller claw.', specsGu: 'એન્ટી-સ્લિપ રબર ગ્રિપ, ખીલી કાઢવાની પંજાવાળી સ્ટીલ હથોડી.', specsHi: 'एंटी-स्लिप रबर ग्रिप, कील खींचने वाले पंजे सहित मजबूत हथौड़ी.', unitEn: 'Per Piece', unitGu: 'પ્રતિ નંગ', unitHi: 'प्रति पीस', minEn: '2 Pieces', minGu: '૨ નંગ', minHi: '२ पीस' },
  { id: 'p14', cat: 'tools', titleEn: 'Heavy-Duty Adjustable Pipe Wrench (14" / 18")', titleGu: 'હેવી ડ્યુટી પાઇપ રિંચ (૧૪" / ૧૮")', titleHi: 'मजबूत एडजस्टेबल पाइप रिंच (१४" / १८")', brand: 'Taparia Tools', specsEn: 'Ductile cast iron body, hardened alloy jaws for heavy plumbing grip.', specsGu: 'કાસ્ટ આયર્ન બોડી, મજબૂત એલોય જડબાં, ભારે પ્લમ્બિંગ પકડ માટે.', specsHi: 'कच्चा लोहा बॉडी, मजबूत मिश्र धातु जबड़े, भारी प्लंबिंग पकड़ हेतु.', unitEn: 'Per Piece', unitGu: 'પ્રતિ નંગ', unitHi: 'प्रति पीस', minEn: '1 Piece', minGu: '૧ નંગ', minHi: '१ पीस' },
  { id: 'p15', cat: 'tools', titleEn: 'Magnetic Aluminum Spirit Level (600mm / 24")', titleGu: 'મેગ્નેટિક એલ્યુમિનિયમ સ્પીરિટ લેવલ (૬૦૦mm / ૨૪")', titleHi: 'चुंबकीय एल्यूमीनियम स्पिरिट लेवल (६००mm / २४")', brand: 'Stabila / Eastman', specsEn: 'Precision calibrated 3-vial (horizontal, 45°, vertical) with magnetic base.', specsGu: 'ચોકસાઈભર્યા ૩ વાયલ (આડું, ૪૫°, ઊભું), ચુંબકીય બેઝ સાથે.', specsHi: 'सटीक ३ वायल (क्षैतिज, ४५°, लंबवत), चुंबकीय आधार सहित.', unitEn: 'Per Piece', unitGu: 'પ્રતિ નંગ', unitHi: 'प्रति पीस', minEn: '1 Piece', minGu: '૧ નંગ', minHi: '१ पीस' },
  { id: 'p16', cat: 'tools', titleEn: 'Heavy Duty Steel Measuring Tape (50 Meter / 165 Ft)', titleGu: 'સ્ટીલ મેઝરિંગ ટેપ માપપટ્ટી (૫૦ મીટર / ૧૬૫ ફૂટ)', titleHi: 'स्टील मापक फीता (५० मीटर / १६५ फुट)', brand: 'Freemans Pro', specsEn: 'Fiberglass reinforced steel blade with heavy winding gear for highway surveyors.', specsGu: 'ફાઈબરગ્લાસ સ્ટીલ પટ્ટી, હાઈવે અને પ્લોટ માપણી માટે હેવી વાઇન્ડિંગ.', specsHi: 'फाइबरग्लास स्टील ब्लेड, हाईवे एवं जमीन नाप हेतु मजबूत गियर.', unitEn: 'Per Unit', unitGu: 'પ્રતિ નંગ', unitHi: 'प्रति पीस', minEn: '1 Unit', minGu: '૧ નંગ', minHi: '१ पीस' },

  // Safety PPE
  { id: 'p17', cat: 'safety', titleEn: 'ISI Certified Industrial Safety Helmet (Hard Hat)', titleGu: 'ISI પ્રમાણિત ઇન્ડસ્ટ્રીયલ સેફ્ટી હેલ્મેટ', titleHi: 'ISI प्रमाणित औद्योगिक सुरक्षा हेलमेट', brand: 'Karam / 3M', specsEn: 'High-density polyethylene (HDPE), 6-point ratchet suspension, Yellow/White.', specsGu: 'HDPE મટીરીયલ, ૬-પોઇન્ટ રેટચેટ ફિટિંગ, પીળો/સફેદ કલર.', specsHi: 'HDPE सामग्री, ६-बिंदु रैचेट सस्पेंशन, पीला/सफेद रंग.', unitEn: 'Per Piece', unitGu: 'પ્રતિ નંગ', unitHi: 'प्रति पीस', minEn: '10 Pieces', minGu: '૧૦ નંગ', minHi: '१० पीस' },
  { id: 'p18', cat: 'safety', titleEn: 'High-Visibility Neon Reflective Safety Vest', titleGu: 'હાઈ-વિઝિબિલિટી નિયોન રેફ્લેક્ટિવ સેફ્ટી જેકેટ', titleHi: 'हाई-विजिबिलिटी नियॉन रिफ्लेक्टिव सेफ्टी जैकेट', brand: 'Frontier Safety', specsEn: 'EN 471 standard, 2-inch silver reflective tape, breathable mesh, Class 2.', specsGu: 'EN 471 સ્ટાન્ડર્ડ, ૨-ઇંચ ચમકતી સિલ્વર ટેપ, બ્રીધેબલ મેશ, ક્લાસ ૨.', specsHi: 'EN 471 मानक, २-इंच चमकदार सिल्वर टेप, हवादार मेश, क्लास २.', unitEn: 'Per Piece', unitGu: 'પ્રતિ નંગ', unitHi: 'प्रति पीस', minEn: '20 Pieces', minGu: '૨૦ નંગ', minHi: '२० पीस' },
  { id: 'p19', cat: 'safety', titleEn: 'Steel Toe Heavy Duty Work Safety Boots', titleGu: 'સ્ટીલ ટો હેવી ડ્યુટી વર્ક સેફ્ટી બૂટ', titleHi: 'स्टील टो भारी कार्य सुरक्षा जूते (सेफ्टी बूट्स)', brand: 'Tiger / Allen Cooper', specsEn: '200J steel toe cap, anti-puncture steel plate sole, oil & acid resistant.', specsGu: '૨૦૦J સ્ટીલ કેપ, પંચર-પ્રૂફ તળિયું, તેલ અને એસિડ પ્રતિરોધક.', specsHi: '२००J स्टील टो कैप, पंचररोधी सोल, तेल एवं एसिड प्रतिरोधी.', unitEn: 'Per Pair', unitGu: 'પ્રતિ જોડી', unitHi: 'प्रति जोड़ी', minEn: '5 Pairs', minGu: '૫ જોડી', minHi: '५ जोड़ी' },
  { id: 'p20', cat: 'safety', titleEn: 'Heavy Split Cowhide Leather Work Gloves', titleGu: 'હેવી લેધર વર્ક હેન્ડ ગ્લોવ્ઝ (મોજા)', titleHi: 'चमड़े के मजबूत सुरक्षा दस्ताने (ग्लव्स)', brand: 'Industrial Shield', specsEn: 'Reinforced palm, puncture & heat resistant for welding, rebar & heavy handling.', specsGu: 'મજબૂત હથેળી, વેલ્ડિંગ અને સળિયા કામ માટે ગરમી-પ્રતિરોધક.', specsHi: 'मजबूत हथेली, वेल्डिंग और सरिया हैंडलिंग हेतु गर्मीरोधी.', unitEn: 'Per Dozen (12 Pairs)', unitGu: 'પ્રતિ ડઝન (૧૨ જોડી)', unitHi: 'प्रति दर्जन (१२ जोड़ी)', minEn: '2 Dozens', minGu: '૨ ડઝન', minHi: '२ दर्जन' },

  // Tarpaulin
  { id: 'p21', cat: 'tarpaulin', titleEn: 'Heavy Duty Waterproof Blue Poly Tarpaulin (24x18 Ft)', titleGu: 'હેવી ડ્યુટી વોટરપ્રૂફ બ્લુ તાડપત્રી (૨૪x૧૮ ફૂટ)', titleHi: 'वाटरप्रूफ नीली तिरपाल भारी (२४x१८ फुट)', brand: 'Silpaulin / Tiger Tarp', specsEn: 'Multi-layer laminated, heat sealed borders with brass eyelets every 3 feet.', specsGu: 'મલ્ટી-લેયર લેમિનેટેડ, હીટ-સીલ્ડ કિનારી, દર ૩ ફૂટે પિત્તળની કડી.', specsHi: 'मल्टी-लेयर लैमिनेटेड, हीट-सील्ड किनारे, हर ३ फीट पर पीतल के छेद.', unitEn: 'Per Sheet', unitGu: 'પ્રતિ નંગ', unitHi: 'प्रति पीस', minEn: '2 Sheets', minGu: '૨ નંગ', minHi: '२ पीस' },
  { id: 'p22', cat: 'tarpaulin', titleEn: 'Highway Heavy Cargo Tarpaulin (30x20 Ft)', titleGu: 'હાઈવે હેવી કાર્ગો ટ્રક તાડપત્રી (૩૦x૨૦ ફૂટ)', titleHi: 'हाईवे ट्रक कार्गो तिरपाल (३०x२० फुट)', brand: 'Super Tarp GSM 250+', specsEn: 'Extra-heavy GSM, 100% UV resistant, suitable for monsoon grain & cement transit.', specsGu: 'એક્સ્ટ્રા-હેવી GSM, ૧૦૦% UV પ્રૂફ, ચોમાસામાં સિમેન્ટ અને અનાજ રક્ષણ.', specsHi: 'अतिरिक्त भारी GSM, १००% UV प्रतिरोधी, बारिश में सीमेंट और अनाज सुरक्षा.', unitEn: 'Per Sheet', unitGu: 'પ્રતિ નંગ', unitHi: 'प्रति पीस', minEn: '1 Sheet', minGu: '૧ નંગ', minHi: '१ पीस' },
  { id: 'p23', cat: 'tarpaulin', titleEn: 'HDPE Pond Lining & Concrete Curing Sheet (500 Micron)', titleGu: 'એચડીપીઇ તળાવ લાઇનિંગ & ક્યોરિંગ શીટ (૫૦૦ માઈક્રોન)', titleHi: 'एचडीपीई तालाब लाइनिंग एवं स्लैब क्यूरिंग शीट (५०० माइक्रोन)', brand: 'Agri-Shield', specsEn: 'Tear-proof geomembrane sheet for water reservoirs & concrete slab curing.', specsGu: 'પાણી સંગ્રહ અને સ્લેબ પાણી પકવવા માટે મજબૂત જિઓમેમ્બ્રેન શીટ.', specsHi: 'जलाशयों में जलभराव एवं स्लैब तराई हेतु मजबूत शीट.', unitEn: 'Per Roll (100 Mtr)', unitGu: 'પ્રતિ રોલ (૧૦૦ મીટર)', unitHi: 'प्रति रोल (१०० मीटर)', minEn: '1 Roll', minGu: '૧ રોલ', minHi: '१ रोल' },

  // Waterproofing
  { id: 'p24', cat: 'waterproofing', titleEn: 'Dr. Fixit 101 LW+ Waterproofing Compound (20 Litre)', titleGu: 'ડૉ. ફિક્સિટ 101 LW+ વોટરપ્રૂફિંગ લિક્વિડ (૨૦ લીટર)', titleHi: 'डॉ. फिक्सिट 101 LW+ वाटरप्रूफिंग कंपाउंड (२० लीटर)', brand: 'Pidilite / Dr. Fixit', specsEn: 'Integral liquid waterproofing compound for concrete & plaster mortar.', specsGu: 'કોંક્રીટ અને પ્લાસ્ટર મોર્ટાર માટે અંદરથી વોટરપ્રૂફિંગ કેમિકલ.', specsHi: 'कंक्रीट और प्लास्टर मसाले के लिए आंतरिक वाटरप्रूफिंग केमिकल.', unitEn: 'Per 20L Bucket', unitGu: '૨૦ લીટર બાલદી', unitHi: '२० लीटर बाल्टी', minEn: '1 Bucket', minGu: '૧ બાલદી', minHi: '१ बाल्टी' },
  { id: 'p25', cat: 'waterproofing', titleEn: 'Dr. Fixit Fastflex Heavy Duty Terrace Coating (12 Kg)', titleGu: 'ડૉ. ફિક્સિટ ફાસ્ટફ્લેક્સ ટેરેસ કોટિંગ (૧૨ કિલો)', titleHi: 'डॉ. फिक्सिट फास्टफ्लेक्स छत वाटरप्रूफिंग कोटिंग (१२ किग्रा)', brand: 'Dr. Fixit', specsEn: '2-component polymer modified cementitious elastomeric waterproof membrane.', specsGu: 'ધાબા અને અગાસી માટે ૨-કમ્પોનન્ટ ઈલાસ્ટોમેરિક વોટરપ્રૂફ કોટિંગ.', specsHi: 'छत एवं बालकनी हेतु २-कंपोनेंट लचीली वाटरप्रूफ कोटिंग.', unitEn: 'Per Kit (12 Kg)', unitGu: 'પ્રતિ કિટ (૧૨ કિલો)', unitHi: 'प्रति किट (१२ किग्रा)', minEn: '2 Kits', minGu: '૨ કિટ', minHi: '२ किट' },
  { id: 'p26', cat: 'waterproofing', titleEn: 'Sika RainTite Acrylic Waterproof Coating (20 Kg)', titleGu: 'સિકા રેઈનટાઈટ એક્રેલિક વોટરપ્રૂફ કોટિંગ (૨૦ કિલો)', titleHi: 'सिका रेनटाइट एक्रेलिक वाटरप्रूफ कोटिंग (२० किग्रा)', brand: 'Sika India', specsEn: 'Highly flexible UV-resistant acrylic liquid membrane for terraces & walls.', specsGu: 'દિવાલો અને ધાબા માટે અત્યંત લચીલું UV-પ્રૂફ એક્રેલિક પ્રવાહી.', specsHi: 'दीवारों और छतों हेतु अत्यधिक लचीला UV-रोधी वाटरप्रूफ लेप.', unitEn: 'Per 20 Kg Bucket', unitGu: '૨૦ કિલો બાલદી', unitHi: '२० किग्रा बाल्टी', minEn: '1 Bucket', minGu: '૧ બાલદી', minHi: '१ बाल्टी' },
  { id: 'p27', cat: 'waterproofing', titleEn: 'Fosroc Nitobond SBR Latex Bonding Agent (20L)', titleGu: 'ફોસરોક નાઈટોબોન્ડ SBR લેટેક્સ બોન્ડિંગ એજન્ટ (૨૦L)', titleHi: 'फॉसरोक नाइटोबॉन्ड SBR लेटेक्स बॉन्डिंग एजेंट (२०L)', brand: 'Fosroc Chemicals', specsEn: 'Styrene butadiene copolymer for high strength repairs & waterproof bonding.', specsGu: 'જૂના-નવા કોંક્રીટ જોડાણ અને સમારકામ માટે મજબૂત બોન્ડિંગ એજન્ટ.', specsHi: 'पुराने-नए कंक्रीट जुड़ाव एवं मरम्मत हेतु उच्च शक्ति बॉन्डिंग एजेंट.', unitEn: 'Per 20L Can', unitGu: '૨૦ લીટર કેન', unitHi: '२० लीटर कैन', minEn: '1 Can', minGu: '૧ કેન', minHi: '१ कैन' },

  // Abrasives
  { id: 'p28', cat: 'abrasives', titleEn: 'Pro-Grip 4" Thin Metal Cutting Wheel (105x1.0mm)', titleGu: 'પ્રો-ગ્રિપ ૪" મેટલ કટીંગ વ્હીલ (૧૦૫x૧.૦mm)', titleHi: 'प्रो-ग्रिप ४" मेटल कटिंग व्हील (१०५x१.०mm)', brand: 'Pro-Grip / Norton', specsEn: 'Fast burr-free cutting on stainless steel and MS rebar, max 15,300 RPM.', specsGu: 'સ્ટીલ સળિયા અને લોખંડ પાઇપના ઝડપી બર-ફ્રી કટીંગ માટે.', specsHi: 'सरिया और लोहे के पाइप को तेजी से बिना खरोंच काटने हेतु.', unitEn: 'Box of 50 Pcs', unitGu: '૫૦ નંગનું બોક્સ', unitHi: '५० पीस का बॉक्स', minEn: '2 Boxes', minGu: '૨ બોક્સ', minHi: '२ बॉक्स' },
  { id: 'p29', cat: 'abrasives', titleEn: 'Heavy Duty 14" Chop Saw Cutting Wheel (355x3.0mm)', titleGu: 'હેવી ડ્યુટી ૧૪" ચોપ સો કટીંગ વ્હીલ (૩૫૫x૩.૦mm)', titleHi: 'भारी १४" चॉप सॉ कटिंग व्हील (३५५x३.०mm)', brand: 'Bosch / CUMI', specsEn: 'Fiberglass double reinforced for cutting heavy steel pipes and channels.', specsGu: 'ભારે સ્ટીલ પાઇપ, ગર્ડર અને એંગલ કાપવા માટે ડબલ ફાઇબરગ્લાસ.', specsHi: 'भारी स्टील पाइप, गार्डर और चैनल काटने हेतु डबल फाइबरग्लास.', unitEn: 'Box of 10 Pcs', unitGu: '૧૦ નંગનું બોક્સ', unitHi: '१० पीस का बॉक्स', minEn: '1 Box', minGu: '૧ બોક્સ', minHi: '१ बॉक्स' },
  { id: 'p30', cat: 'abrasives', titleEn: 'Diamond Segmented Concrete Cutting Blade (4" & 7")', titleGu: 'ડાયમંડ સેગમેન્ટેડ કોંક્રીટ કટીંગ બ્લેડ (૪" & ૭")', titleHi: 'डायमंड कंक्रीट कटिंग ब्लेड (४" एवं ७")', brand: 'Bosch Pro Masonry', specsEn: 'Laser welded segments for clean dry/wet cutting of granite, marble, concrete.', specsGu: 'ગ્રેનાઈટ, આરસ અને કોંક્રીટના સૂકા/ભીના કટીંગ માટે લેસર બ્લેડ.', specsHi: 'ग्रेनाइट, मार्बल एवं कंक्रीट की सूखी/गीली कटिंग हेतु लेजर ब्लेड.', unitEn: 'Per Piece', unitGu: 'પ્રતિ નંગ', unitHi: 'प्रति पीस', minEn: '2 Pieces', minGu: '૨ નંગ', minHi: '२ पीस' },

  // Fasteners
  { id: 'p31', cat: 'fasteners', titleEn: 'Grade 8.8 High-Tensile Hex Head Bolts & Nuts', titleGu: 'ગ્રેડ ૮.૮ હાઈ-ટેન્સાઈલ હેક્સ બોલ્ટ્સ અને નટ્સ', titleHi: 'ग्रेड ८.८ हाई-टेंसाइल हेक्स बोल्ट्स एवं नट्स', brand: 'Unbrako / Zenith', specsEn: 'Full thread & half thread, black oxide/zinc finish, sizes M8 to M24.', specsGu: 'ફુલ અને હાફ થ્રેડ, ઝિંક ફિનિશ, સાઈઝ M8 થી M24.', specsHi: 'फुल और हाफ थ्रेड, जस्तीकृत फिनिश, साइज M8 से M24.', unitEn: 'Per Kg / 100 Pcs', unitGu: 'પ્રતિ કિલો / ૧૦૦ નંગ', unitHi: 'प्रति किग्रा / १०० पीस', minEn: '10 Kg', minGu: '૧૦ કિલો', minHi: '१० किग्रा' },
  { id: 'p32', cat: 'fasteners', titleEn: 'Self-Drilling Screws with EPDM Washer (#12 x 55mm)', titleGu: 'સેલ્ફ-ડ્રિલિંગ રૂફિંગ સ્ક્રૂ EPDM વોશર સાથે (#12 x 55mm)', titleHi: 'सेल्फ-ड्रिलिंग रूफिंग स्क्रू वॉशर सहित (#12 x 55mm)', brand: 'High-Tech Fasteners', specsEn: 'Ruspert coated 1000-hr salt spray tested for GI & metal roofing sheet fixing.', specsGu: 'જીઆઈ અને સિમેન્ટ પતરાં ફીટ કરવા માટે ૧૦૦૦ કલાક કાટ-પ્રતિરોધક.', specsHi: 'टिन शेड एवं सीमेंट की चद्दरें लगाने हेतु जंगरोधी स्क्रू.', unitEn: 'Box of 500 Pcs', unitGu: '૫૦૦ નંગનું બોક્સ', unitHi: '५०० पीस का बॉक्स', minEn: '2 Boxes', minGu: '૨ બોક્સ', minHi: '२ बॉक्स' },
  { id: 'p33', cat: 'fasteners', titleEn: 'Heavy Duty Steel Wire Nails (2", 2.5", 3", 4")', titleGu: 'હેવી ડ્યુટી સ્ટીલ વાયર ખીલા (૨", ૨.૫", ૩", ૪")', titleHi: 'मजबूत स्टील कीलें (२", २.५", ३", ४")', brand: 'Standard GI Wire', specsEn: 'Diamond point, smooth shank, heavy head for shuttering and framing woodwork.', specsGu: 'સેન્ટરિંગ, શટરિંગ અને ફ્રેમિંગ કામ માટે મજબૂત સ્ટીલ ખીલા.', specsHi: 'शटरिंग, सेंट्रिंग एवं लकड़ी के कार्यों हेतु मजबूत स्टील कीलें.', unitEn: 'Per 50 Kg Bag', unitGu: '૫૦ કિલો બેગ', unitHi: '५० किग्रा बैग', minEn: '1 Bag', minGu: '૧ બેગ', minHi: '१ बैग' }
];

// Comprehensive Multilingual Translation Dictionaries (EN, GU, HI)
const i18n = {
  en: {
    // Top Bar
    topDispatch: 'Express Highway Dispatch',
    topLocation: 'Radhanpur-Kandla Hwy, Santalpur, Patan',
    topHours: '7 AM - 9 PM (Daily Open)',
    
    // Header & Nav
    navTagline: 'Hardware Trading • Santalpur',
    navHome: 'Home',
    navCategories: 'Categories',
    navEstimator: 'Calculator',
    navCatalog: 'Products',
    navLogistics: 'Logistics',
    navAbout: 'About',
    navContact: 'Contact',
    navQuoteCart: 'Quote Cart',
    
    // Mobile Drawer
    mobileCallBtn: 'Call: +91 97148 58660',
    mobileWaBtn: 'WhatsApp Chat',
    mobileLocation: 'Near Over Bridge, Santalpur, Patan',
    mobileLangLabel: 'Language:',
    
    // Hero
    heroTag: 'Premier Building Materials & Hardware Supplier',
    heroTitleMain: 'Build Your Dreams With Us',
    heroTitleGrad: 'All Type Hardware Trading',
    heroSlogan: '“A Trusted and Reliable Destination”',
    heroSloganSub: 'The most reliable & trusted hub for civil contractors, builders and homeowners',
    heroDesc: 'Strategically located on <strong>Radhanpur - Kandla Highway near Over Bridge, Santalpur, Patan - 385350</strong>. We stock 9 core categories: high-grade cement, TMT rebar, PVC pipes, industrial PPE safety gear, heavy tarpaulins, waterproofing chemicals, abrasive wheels, hand tools, and precision fasteners at unbeatable wholesale rates.',
    heroBtnEstimator: 'Calculate Materials',
    heroBtnCatalog: 'Browse Catalog',
    heroBtnCall: 'Call: 9714858660',
    heroBtnWa: 'WhatsApp Us',
    
    // Billboard Card
    bbHeaderTitle: 'Official Highway Billboard • Radhanpur - Kandla National Highway',
    bbLiveBadge: 'Active Landmark on NH',
    bbOverlayBadge: 'Click to View Full Screen HD Billboard',
    bbCallHotline: 'Call Hotline: ',
    bbLocationText: 'Near Over Bridge, Santalpur, Patan - 385350',
    bbDispatchText: 'Highway Yard Bulk Loading',
    
    // Trust Pills
    trustPill1: '100% Genuine Branded Stock',
    trustPill2: 'Fast Highway Site Delivery',
    trustPill3: 'Ready Bulk Stock in Yard',
    trustPill4: '“Your Safety Our Priority”',
    
    // Categories Section
    catTag: '9 Core Product Categories',
    catTitle: 'Everything Under One Highway Roof',
    catTitleSub: '& Ready Stock',
    catSubtitle: 'Every category displayed on our Radhanpur-Kandla Highway billboard is fully stocked in wholesale volumes, ready for immediate loading and site delivery.',
    catBadge: 'Official Billboard Stock',
    catBrandsPrefix: 'Brands:',
    catViewBtn: 'View Items →',
    
    // Estimator Section
    estTag: 'Instant Estimator Tool',
    estTitle: 'Construction Material',
    estTitleSub: '& Quantity Calculator',
    estSubtitle: 'Input your site dimensions to estimate cement bags, sand, kapchi aggregates, steel, bricks, or waterproofing requirements. Export your calculation straight to WhatsApp for immediate rates.',
    tabConcrete: '🏗️ Concrete Slab & RCC',
    tabBrick: '🧱 Brickwork & Mortar',
    tabWater: '💧 Terrace Waterproofing',
    tabSafety: '🦺 PPE & Tarpaulin Site Pack',
    
    // Estimator Form
    lblConcArea: 'Slab / Built-up Area',
    lblConcAreaHint: 'Square Feet (sq ft)',
    lblConcThick: 'Slab Thickness',
    lblConcThickHint: 'Inches',
    optThick1: '4.5 Inches (Standard Residential)',
    optThick2: '5.0 Inches (Heavy Residential / Commercial)',
    optThick3: '6.0 Inches (Industrial Floor / Heavy Load)',
    lblConcMix: 'Concrete Grade / Mix Ratio',
    lblConcMixHint: 'Standard ISI',
    optMix1: 'M20 Grade (1 : 1.5 : 3 - Slabs, Beams & Columns)',
    optMix2: 'M25 Grade (1 : 1 : 2 - Heavy Structural RCC)',
    lblBrickLen: 'Total Wall Length',
    lblBrickLenHint: 'Feet',
    lblBrickHeight: 'Wall Height',
    lblBrickHeightHint: 'Feet',
    lblBrickThick: 'Wall Thickness',
    lblBrickThickHint: 'Masonry Type',
    optBrickThick1: '9-inch Outer Wall (Standard Double Brick)',
    optBrickThick2: '4.5-inch Partition Wall (Single Brick)',
    lblWpArea: 'Roof / Terrace / Surface Area',
    lblWpAreaHint: 'Square Feet',
    lblWpType: 'Application Treatment',
    optWp1: 'Terrace & Parapet (Dr. Fixit Fastflex + Fiber Mesh)',
    optWp2: 'Basement Retaining Wall (Integral Waterproofing)',
    optWp3: 'Sunken Bathroom Slab Treatment',
    lblSiteWorkers: 'Active Site Labor & Workforce Count',
    lblSiteWorkersHint: 'Number of People',
    lblSiteStorage: 'Open Material Storage Area',
    lblSiteStorageHint: 'Sq Ft to Cover',
    calcLiveBadge: 'Live Real-Time',
    btnCalcWa: 'Send Estimate to WhatsApp for Rates',
    btnCalcPrint: 'Print / Save Estimate Sheet',
    
    // Catalog Section
    catalogTag: 'Wholesale & Retail Catalog',
    catalogTitle: 'Featured Construction',
    catalogTitleSub: '& Hardware Inventory',
    catalogSubtitle: 'Browse genuine brands in stock at our Santalpur yard. Add required items to your Request for Quote (RFQ) to get rapid contractor rates.',
    filterAll: 'All Products',
    filterCement: 'Cement & Steel',
    filterPvc: 'PVC Pipes & Valves',
    filterHardware: 'Hardware & Wire',
    filterTools: 'Hand & Power Tools',
    filterSafety: 'Industrial Safety PPE',
    filterTarpaulin: 'Tarpaulins & HDPE',
    filterWaterproofing: 'Waterproofing',
    filterAbrasives: 'Abrasive Discs',
    filterFasteners: 'Fasteners & Screws',
    searchPlaceholder: 'Search by product name, brand, or specification (e.g. UltraTech, Astral, Tarpaulin, Rebar)...',
    readyInYard: 'Ready in Highway Yard',
    addToQuote: '+ Add to Quote',
    noProducts: 'No products match your criteria.',
    noProductsSub: 'Call +91 97148 58660 for custom orders or items not listed!',
    
    // Logistics Section
    logisticsBadge: 'Strategic Highway Logistics Hub',
    logisticsTitle: 'Direct Highway Supply Line to <br><span class="gradient-text">Patan, Saurashtra & Kandla Port</span>',
    logisticsDesc: 'Located right by the <strong>Santalpur Over Bridge on the Radhanpur - Kandla Highway</strong>, our yard provides zero-delay vehicle access for heavy transport trucks, tractor trolleys, and pick-up vans. Whether you need 20 metric tons of TMT steel for a highway bridge or 500 bags of cement for a residential colony, our fleet delivers directly to your site.',
    corridor1Title: 'Radhanpur - Santalpur - Varahi Corridor',
    corridor1Desc: 'Direct site unloading within 1 to 2 hours of booking',
    corridor2Title: 'Adesar - Samakhiali - Gandhidham & Kandla Port Route',
    corridor2Desc: 'Bulk supplies for port industrial setups, warehousing & salt works',
    corridor3Title: 'Patan District, Sami, Harij & Tharad Highway Grid',
    corridor3Desc: 'Regular daily dispatches to residential projects, schools & agricultural borewells',
    btnLogisticsCall: 'Call Logistics Desk: 9714858660',
    btnLogisticsDir: 'View Landmark Directions',
    
    // Map Card
    mapCardTitle: 'Highway Location Card',
    mapVerifiedHub: 'Verified Hub',
    mapAddressTitle: 'Ankit Building Materials 📍',
    mapAddressText: 'Radhanpur Kandla Highway near Over Bridge,<br>Santalpur, Patan - 385350, Gujarat, India.',
    mapClickBadge: 'Click to navigate on Google Maps →',
    mapLandmark1: 'Adjacent to Santalpur National Highway Over Bridge',
    mapLandmark2: 'Easy turnaround for 10-wheeler & 14-wheeler trucks',
    mapLandmark3: 'Weighbridge & crane loading nearby',
    mapOpenBtn: 'Open in Google Maps',
    
    // Brands
    brandsHeader: 'Authorized Stockists & Direct Factory Sourcing',
    
    // Why Choose Us
    aboutTag: 'The Ankit Advantage',
    aboutTitle: 'Why Contractors <span class="highlight-gold">Trust Ankit Building Materials</span>',
    aboutSubtitle: '“A Trusted and Reliable Destination” is not just our motto — it\'s the daily standard we hold in every dispatch, invoice, and contractor partnership across Gujarat.',
    feat1Title: '100% Genuine Certified Goods',
    feat1Desc: 'Direct factory sourcing with Manufacturer Test Certificates (MTC) for cement, TMT rebars, and pipes. Zero counterfeit or sub-standard materials.',
    feat2Title: 'Wholesale Volume Pricing',
    feat2Desc: 'We leverage large-scale purchasing power to pass transparent bulk discounts to road contractors, solar EPCs, and builders.',
    feat3Title: 'Express Highway Site Unloading',
    feat3Desc: 'Direct highway positioning ensures prompt logistics along Santalpur, Radhanpur, Patan, Varahi, and Kandla corridor without transit jams.',
    feat4Title: 'Complete 9-in-1 Inventory',
    feat4Desc: 'From the smallest drywall screw to full truckloads of cement and industrial PPE helmets, you never need multiple suppliers.',
    
    // Testimonials
    testTag: 'Client Reviews',
    testTitle: 'What Builders <span class="highlight-gold">Say About Us</span>',
    testSubtitle: 'Trusted by infrastructure contractors, solar power park developers, and local home builders across Patan and Kutch.',
    test1Quote: '“We had a tight deadline on our NH highway project near Santalpur. Ankit Building Materials delivered 600 bags of UltraTech cement and TMT steel within 3 hours of our phone call. Their rates are genuine and invoicing is seamless.”',
    test1Author: 'Ramesh Patel',
    test1Role: 'Highway Infrastructure Contractor, Patan',
    test2Quote: '“For our solar project in the Charanka/Santalpur belt, we procured all industrial PPE safety gear, heavy tarpaulins, and fasteners from Ankit Building Materials. ISI helmets and reflective jackets met all corporate safety norms.”',
    test2Author: 'Suresh Kumar',
    test2Role: 'Solar Site Project Manager',
    test3Quote: '“A trusted and reliable destination! I procured all cement, Astral pipes, Dr. Fixit waterproofing and hardware for my home construction from Ankit Building Materials. Outstanding quality and punctual delivery.”',
    test3Author: 'Jayeshbhai Desai',
    test3Role: 'Residential Homeowner, Santalpur',
    
    // FAQ
    faqTag: 'Frequently Asked Questions',
    faqTitle: 'Frequently Asked <span class="highlight-gold">Questions</span>',
    faqSubtitle: 'Common questions regarding site delivery, wholesale terms, billing, and order placement.',
    faq1Q: 'What is the delivery radius along Radhanpur-Kandla Highway?',
    faq1A: 'We provide express site delivery covering Santalpur, Radhanpur, Varahi, Adesar, Samakhiali, Patan city, Harij, Sami, and extending towards Gandhidham and Tharad. Heavy orders (cement, steel, pipes) are delivered via tractor trolleys or 10-wheeler trucks directly to your construction coordinates.',
    faq2Q: 'Do you provide GST invoices and Manufacturer Test Certificates (MTC)?',
    faq2A: 'Yes, 100%. We provide valid GST input tax invoices for all purchases, along with original mill test certificates (MTC) for TMT rebar steel, cement batch certificates, and ISI test compliance reports for PPE safety gear.',
    faq3Q: 'Can I place bulk orders directly through WhatsApp or phone?',
    faq3A: 'Absolutely! Simply call us at +91 97148 58660 or use our website\'s Quote Cart to send your list via WhatsApp. Our team responds with quotation breakdown, dispatch vehicle details, and payment options within minutes.',
    faq4Q: 'What are the working hours of the Santalpur yard?',
    faq4A: 'We are open 7 days a week from 7:00 AM to 9:00 PM to support morning construction pours and late-evening highway project emergencies.',
    faq5Q: 'Do you supply industrial safety items (PPE) compliant with audit standards?',
    faq5A: 'Yes. As shown on our highway billboard, "Your Safety Our Priority" is our core pillar. We stock ISI marked industrial helmets, high-visibility EN471 Class 2 reflective jackets, steel-toe boots (200J impact rated), fall arrest harnesses, and protective eye gear.',
    
    // Contact
    contactTag: 'Direct Contact & Inquiry',
    contactTitle: 'Visit Our Yard <span>or Get Instant Quotation</span>',
    contactSubtitle: 'Connect with our sales and dispatch team directly for contractor pricing and delivery estimates.',
    contactCardTitle: 'Ankit Building Materials',
    contactCardDesc: 'Your dependable one-stop partner for all building materials and hardware trading. Located strategically on the National Highway.',
    contactPhoneTitle: 'Phone / Mobile (24/7 Hotline)',
    contactAddressTitle: 'Yard & Office Address',
    contactAddressText: 'Radhanpur Kandla Highway near Over Bridge, Santalpur, Patan - 385350, Gujarat.',
    contactAddressLink: '📍 View on Google Maps →',
    contactHoursTitle: 'Operating Hours',
    contactHoursText: 'Monday to Sunday: 7:00 AM - 9:00 PM (All 7 Days)',
    contactWaTitle: 'Instant WhatsApp Support',
    contactWaLink: 'Chat directly on WhatsApp (+91 97148 58660)',
    quickInqTitle: 'Quick Site Inquiry',
    quickInqDesc: 'Send your project requirement directly to our mobile desk for an immediate response.',
    lblInqName: 'Your Name / Firm',
    inqNamePlaceholder: 'e.g. Ramesh Patel',
    lblInqPhone: 'Mobile Number',
    inqPhonePlaceholder: 'e.g. 98765 43210',
    lblInqType: 'Primary Category Needed',
    lblInqMsg: 'Requirement Details & Site Location',
    inqMsgPlaceholder: 'e.g. Need 400 bags UltraTech cement and 3 tons 12mm TMT steel delivered near Santalpur highway site tomorrow...',
    btnSubmitInquiry: 'Submit Inquiry via WhatsApp',
    
    // Footer
    footerDesc: '“A Trusted and Reliable Destination.” Your trusted hardware and building material partner on Radhanpur - Kandla Highway, Santalpur, Patan - 385350.',
    footerColCat: 'Product Categories',
    footerColLinks: 'Quick Links',
    footerColYard: 'Yard Location',
    footerHoursTitle: 'HIGHWAY DISPATCH HOURS:',
    footerHoursText: 'Mon - Sun: 7:00 AM - 9:00 PM',
    footerRights: '© 2026 Ankit Building Materials. All rights reserved.',
    footerSlogan: '“Build Your Dreams With Us...” • “Your Safety Our Priority”',
    
    // RFQ Drawer
    drawerTitle: 'Quote Request List',
    drawerEmptyTitle: 'Your quote list is empty.',
    drawerEmptyDesc: 'Click "+ Add to Quote" on any product from our catalog to build an instant wholesale inquiry.',
    drawerNameLabel: 'Your Name / Firm Name',
    drawerNamePlaceholder: 'e.g. Patel Construction',
    drawerLocationLabel: 'Delivery Site Location',
    drawerCheckoutBtn: 'Send Quote to WhatsApp (+91 97148 58660)'
  },
  
  gu: {
    // Top Bar
    topDispatch: 'એક્સપ્રેસ હાઈવે ડિસ્પેચ',
    topLocation: 'રાધનપુર-કંડલા હાઈવે, સાંતલપુર, પાટણ',
    topHours: 'સવારે ૭ - રાત્રે ૯ (રોજ ખુલ્લું)',
    
    // Header & Nav
    navTagline: 'હાર્ડવેર ટ્રેડિંગ • સાંતલપુર',
    navHome: 'હોમ',
    navCategories: 'કેટેગરી',
    navEstimator: 'કેલ્ક્યુલેટર',
    navCatalog: 'પ્રોડક્ટ્સ',
    navLogistics: 'ડિસ્પેચ',
    navAbout: 'અમારા વિશે',
    navContact: 'સંપર્ક',
    navQuoteCart: 'ભાવ પત્રક',
    
    // Mobile Drawer
    mobileCallBtn: 'કૉલ: +91 97148 58660',
    mobileWaBtn: 'વોટ્સએપ ચેટ',
    mobileLocation: 'ઓવરબ્રિજ પાસે, સાંતલપુર, પાટણ',
    mobileLangLabel: 'ભાષા:',
    
    // Hero
    heroTag: 'પાટણ અને સાંતલપુરનું પ્રખ્યાત હાર્ડવેર સેન્ટર',
    heroTitleMain: 'અમારી સાથે સાકાર કરો તમારા સપનાનું મકાન',
    heroTitleGrad: 'તમામ પ્રકારનું હાર્ડવેર ટ્રેડિંગ',
    heroSlogan: '“ભરોસાપાત્ર અને વિશ્વસનીય જગ્યા”',
    heroSloganSub: 'બિલ્ડરો, કોન્ટ્રાક્ટરો અને મકાન માલિકો માટે સૌથી વિશ્વસનીય કેન્દ્ર',
    heroDesc: '<strong>રાધનપુર - કંડલા હાઈવે, ઓવરબ્રિજ પાસે, સાંતલપુર, પાટણ - ૩૮૫૩૫૦</strong> ખાતે સ્થિત. સિમેન્ટ, સ્ટીલ સળિયા, પીવીસી પાઇપ, ઇન્ડસ્ટ્રીયલ સેફ્ટી સાધનો, તાડપત્રી, વોટરપ્રૂફિંગ, કટીંગ વ્હીલ્સ, હેન્ડ ટૂલ્સ અને ફાસ્ટનર્સ હોલસેલ ભાવે તાત્કાલિક સાઈટ ડિલિવરી સાથે ઉપલબ્ધ.',
    heroBtnEstimator: 'મટીરીયલ ગણતરી કરો',
    heroBtnCatalog: 'પ્રોડક્ટ કેટોલોગ જુઓ',
    heroBtnCall: 'કૉલ: 9714858660',
    heroBtnWa: 'વોટ્સએપ કરો',
    
    // Billboard Card
    bbHeaderTitle: 'ઓફિશિયલ હાઈવે બિલબોર્ડ • રાધનપુર - કંડલા નેશનલ હાઈવે',
    bbLiveBadge: 'હાઈવે પર જાણીતો લેન્ડમાર્ક',
    bbOverlayBadge: 'સંપૂર્ણ એચડી બિલબોર્ડ જોવા ક્લિક કરો',
    bbCallHotline: 'હૉટલાઇન કૉલ: ',
    bbLocationText: 'ઓવરબ્રિજ પાસે, સાંતલપુર, પાટણ - ૩૮૫૩૫૦',
    bbDispatchText: 'હાઈવે યાર્ડ બલ્ક લોડિંગ',
    
    // Trust Pills
    trustPill1: '૧૦૦% અસલ બ્રાન્ડેડ સ્ટોક',
    trustPill2: 'ઝડપી હાઈવે સાઈટ ડિલિવરી',
    trustPill3: 'યાર્ડમાં તૈયાર જથ્થાબંધ સ્ટોક',
    trustPill4: '“તમારી સલામતી અમારી પ્રાથમિકતા”',
    
    // Categories Section
    catTag: '૯ મુખ્ય પ્રોડક્ટ કેટેગરી',
    catTitle: 'એક જ છત નીચે તમામ બાંધકામ સામગ્રી',
    catTitleSub: '& તૈયાર સ્ટોક',
    catSubtitle: 'અમારા રાધનપુર-કંડલા હાઈવે બિલબોર્ડ પર દર્શાવેલ તમામ કેટેગરીઓ હોલસેલ જથ્થામાં ઉપલબ્ધ છે, જે તાત્કાલિક લોડિંગ અને સાઈટ ડિલિવરી માટે તૈયાર છે.',
    catBadge: 'ઓફિશિયલ બિલબોર્ડ સ્ટોક',
    catBrandsPrefix: 'બ્રાન્ડ્સ:',
    catViewBtn: 'સામાન જુઓ →',
    
    // Estimator Section
    estTag: 'ઝડપી ગણતરી ટૂલ',
    estTitle: 'બાંધકામ સામગ્રી',
    estTitleSub: '& ખર્ચ કેલ્ક્યુલેટર',
    estSubtitle: 'તમારી સાઈટનું માપ દાખલ કરીને સિમેન્ટની થેલીઓ, રેતી, કપચી, સ્ટીલ સળિયા, ઈંટો અથવા વોટરપ્રૂફિંગ જરૂરિયાતોનો અંદાજ મેળવો. તાત્કાલિક ભાવ માટે તમારો અંદાજ સીધો વોટ્સએપ પર મોકલો.',
    tabConcrete: '🏗️ કોંક્રીટ સ્લેબ & આરસીસી',
    tabBrick: '🧱 ચણતરકામ & પ્લાસ્ટર',
    tabWater: '💧 ટેરેસ વોટરપ્રૂફિંગ',
    tabSafety: '🦺 સેફ્ટી કીટ & તાડપત્રી',
    
    // Estimator Form
    lblConcArea: 'સ્લેબ / બાંધકામ ક્ષેત્રફળ',
    lblConcAreaHint: 'ચોરસ ફૂટ (sq ft)',
    lblConcThick: 'સ્લેબ જાડાઈ',
    lblConcThickHint: 'ઇંચ',
    optThick1: '૪.૫ ઇંચ (સામાન્ય રહેણાંક)',
    optThick2: '૫.૦ ઇંચ (ભારે રહેણાંક / કોમર્શિયલ)',
    optThick3: '૬.૦ ઇંચ (ઇન્ડસ્ટ્રીયલ ફ્લોર / ભારે વજન)',
    lblConcMix: 'કોંક્રીટ ગ્રેડ / મિશ્રણ પ્રમાણ',
    lblConcMixHint: 'પ્રમાણભૂત ISI',
    optMix1: 'M20 ગ્રેડ (૧ : ૧.૫ : ૩ - સ્લેબ, બીમ અને કોલમ)',
    optMix2: 'M25 ગ્રેડ (૧ : ૧ : ૨ - ભારે સ્ટ્રક્ચરલ RCC)',
    lblBrickLen: 'દિવાલની કુલ લંબાઈ',
    lblBrickLenHint: 'ફૂટ',
    lblBrickHeight: 'દિવાલ ઊંચાઈ',
    lblBrickHeightHint: 'ફૂટ',
    lblBrickThick: 'દિવાલ જાડાઈ',
    lblBrickThickHint: 'ચણતરનો પ્રકાર',
    optBrickThick1: '૯-ઇંચ બહારની દિવાલ (ડબલ ઈંટ)',
    optBrickThick2: '૪.૫-ઇંચ પાર્ટીશન દિવાલ (સિંગલ ઈંટ)',
    lblWpArea: 'ધાબા / ટેરેસ ક્ષેત્રફળ',
    lblWpAreaHint: 'ચોરસ ફૂટ',
    lblWpType: 'ટ્રીટમેન્ટનો પ્રકાર',
    optWp1: 'ટેરેસ અને પેરાપેટ (ડૉ. ફિક્સિટ ફાસ્ટફ્લેક્સ + મેશ)',
    optWp2: 'બેઝમેન્ટ રિટેનિંગ વોલ (ઇન્ટિગ્રલ વોટરપ્રૂફિંગ)',
    optWp3: 'સંકન બાથરૂમ સ્લેબ ટ્રીટમેન્ટ',
    lblSiteWorkers: 'સાઈટ પર કામ કરતા કારીગરોની સંખ્યા',
    lblSiteWorkersHint: 'વ્યક્તિઓની સંખ્યા',
    lblSiteStorage: 'ખુલ્લો સ્ટોરેજ એરિયા (ઢાંકવા માટે)',
    lblSiteStorageHint: 'ચો. ફૂટ',
    calcLiveBadge: 'લાઇવ રીઅલ-ટાઇમ',
    btnCalcWa: 'અંદાજ વોટ્સએપ પર મોકલો',
    btnCalcPrint: 'અંદાજ પ્રિન્ટ / સેવ કરો',
    
    // Catalog Section
    catalogTag: 'હોલસેલ અને રિટેલ કેટોલોગ',
    catalogTitle: 'પ્રમુખ બાંધકામ',
    catalogTitleSub: '& હાર્ડવેર સામગ્રી',
    catalogSubtitle: 'અમારા સાંતલપુર યાર્ડમાં ઉપલબ્ધ તમામ બ્રાન્ડેડ સામાન જુઓ. ભાવ પત્રક માટે કાર્ટમાં ઉમેરો.',
    filterAll: 'તમામ પ્રોડક્ટ્સ',
    filterCement: 'સિમેન્ટ અને સ્ટીલ',
    filterPvc: 'પીવીસી પાઇપ & વાલ્વ',
    filterHardware: 'હાર્ડવેર & વાયર',
    filterTools: 'હેન્ડ & પાવર ટૂલ્સ',
    filterSafety: 'ઇન્ડસ્ટ્રીયલ સેફ્ટી PPE',
    filterTarpaulin: 'તાડપત્રી & એચડીપીઇ',
    filterWaterproofing: 'વોટરપ્રૂફિંગ',
    filterAbrasives: 'કટીંગ ડિસ્ક',
    filterFasteners: 'ફાસ્ટનર્સ & સ્ક્રૂ',
    searchPlaceholder: 'પ્રોડક્ટનું નામ, બ્રાન્ડ અથવા સ્પષ્ટીકરણ શોધો (દા.ત. અલ્ટ્રાટેક, એસ્ટ્રલ, તાડપત્રી, સળિયા)...',
    readyInYard: 'હાઈવે યાર્ડમાં તૈયાર સ્ટોક',
    addToQuote: '+ ક્વોટમાં ઉમેરો',
    noProducts: 'તમારી શોધ મુજબ કોઈ પ્રોડક્ટ મળી નથી.',
    noProductsSub: 'વિશેષ ઓર્ડર અથવા અન્ય સામગ્રી માટે +91 97148 58660 પર કૉલ કરો!',
    
    // Logistics Section
    logisticsBadge: 'વ્યૂહાત્મક હાઈવે લોજિસ્ટિક્સ કેન્દ્ર',
    logisticsTitle: 'સીધી હાઈવે સપ્લાય લાઇન: <br><span class="gradient-text">પાટણ, સૌરાષ્ટ્ર અને કંડલા પોર્ટ</span>',
    logisticsDesc: '<strong>રાધનપુર - કંડલા હાઈવે પર સાંતલપુર ઓવરબ્રિજ પાસે</strong> સ્થિત અમારું યાર્ડ ભારે ટ્રાન્સપોર્ટ ટ્રકો, ટ્રેક્ટર ટ્રોલીઓ અને પીક-અપ વાન માટે સીધો પ્રવેશ પૂરો પાડે છે. હાઈવે બ્રિજ માટે ૨૦ મેટ્રિક ટન સ્ટીલ હોય કે મકાન માટે ૫૦૦ થેલી સિમેન્ટ, અમારું વાહન સીધું તમારી સાઈટ પર પહોંચાડે છે.',
    corridor1Title: 'રાધનપુર - સાંતલપુર - વારાહી કોરિડોર',
    corridor1Desc: 'બુકિંગના ૧ થી ૨ કલાકમાં સાઈટ પર સીધું અનલોડિંગ',
    corridor2Title: 'આડેસર - સામાખિયાળી - ગાંધીધામ અને કંડલા પોર્ટ રૂટ',
    corridor2Desc: 'ઔદ્યોગિક પ્રોજેક્ટ્સ, વેરહાઉસિંગ અને મીઠા ઉદ્યોગ માટે જથ્થાબંધ સપ્લાય',
    corridor3Title: 'પાટણ જિલ્લો, સમી, હારીજ અને થરાદ હાઈવે ગ્રીડ',
    corridor3Desc: 'રહેણાંક પ્રોજેક્ટ્સ, શાળાઓ અને ખેતીવાડી બોરવેલ માટે દૈનિક ડિસ્પેચ',
    btnLogisticsCall: 'લોજિસ્ટિક્સ ડેસ્ક કૉલ: 9714858660',
    btnLogisticsDir: 'લેન્ડમાર્ક રસ્તો જુઓ',
    
    // Map Card
    mapCardTitle: 'હાઈવે લોકેશન કાર્ડ',
    mapVerifiedHub: 'ચકાસાયેલ હબ',
    mapAddressTitle: 'અંકિત બિલ્ડિંગ મટીરીયલ્સ 📍',
    mapAddressText: 'રાધનપુર કંડલા હાઈવે, ઓવરબ્રિજ પાસે,<br>સાંતલપુર, પાટણ - ૩૮૫૩૫૦, ગુજરાત.',
    mapClickBadge: 'ગુગલ મેપ્સ પર જોવા ક્લિક કરો →',
    mapLandmark1: 'સાંતલપુર નેશનલ હાઈવે ઓવરબ્રિજની બરાબર બાજુમાં',
    mapLandmark2: '૧૦ અને ૧૪ ટાયર ભારે ટ્રકો માટે સરળ ટર્નિંગ',
    mapLandmark3: 'નજીકમાં કાંટો (વેબ્રિજ) અને ક્રેન લોડિંગની સુવિધા',
    mapOpenBtn: 'ગુગલ મેપ્સમાં ખોલો',
    
    // Brands
    brandsHeader: 'ઓથોરાઇઝ્ડ સ્ટોકિસ્ટ અને ફેક્ટરી ડાયરેક્ટ સોર્સિંગ',
    
    // Why Choose Us
    aboutTag: 'અંકિત એડવાન્ટેજ',
    aboutTitle: 'શા માટે કોન્ટ્રાક્ટરો <span class="highlight-gold">અંકિત બિલ્ડિંગ મટીરીયલ્સ પર વિશ્વાસ કરે છે</span>',
    aboutSubtitle: '“ભરોસાપાત્ર અને વિશ્વસનીય જગ્યા” એ માત્ર અમારું સૂત્ર નથી — સમગ્ર ગુજરાતમાં દરેક ડિસ્પેચ, બિલિંગ અને કોન્ટ્રાક્ટર ભાગીદારીમાં અમારો દૈનિક નિયમ છે.',
    feat1Title: '૧૦૦% અસલ પ્રમાણિત સામાન',
    feat1Desc: 'સિમેન્ટ, સળિયા અને પાઇપ માટે ટેસ્ટ સર્ટિફિકેટ (MTC) સાથે ફેક્ટરીમાંથી સીધો સપ્લાય. ગુણવત્તામાં કોઈ સમાધાન નહીં.',
    feat2Title: 'હોલસેલ જથ્થાબંધ ભાવ',
    feat2Desc: 'મોટા પાયે ખરીદી ક્ષમતા દ્વારા અમે રોડ કોન્ટ્રાક્ટરો, સોલાર પ્રોજેક્ટ્સ અને બિલ્ડરોને પારદર્શક જથ્થાબંધ ડિસ્કાઉન્ટ આપીએ છીએ.',
    feat3Title: 'એક્સપ્રેસ હાઈવે સાઈટ અનલોડિંગ',
    feat3Desc: 'હાઈવે પર સીધા સ્થાનને કારણે સાંતલપુર, રાધનપુર, પાટણ, વારાહી અને કંડલા કોરિડોરમાં ટ્રાફિક જામ વિના સમયસર ડિલિવરી થાય છે.',
    feat4Title: 'સંપૂર્ણ ૯-ઇન-૧ ઇન્વેન્ટરી',
    feat4Desc: 'નાના સ્ક્રૂ અને ખીલાથી લઈને સિમેન્ટની આખી ટ્રક અને સેફ્ટી હેલ્મેટ સુધી, તમારે અલગ-અલગ દુકાનો શોધવાની જરૂર નથી.',
    
    // Testimonials
    testTag: 'ગ્રાહક પ્રતિસાદ',
    testTitle: 'બિલ્ડરો અમારા વિશે <span class="highlight-gold">શું કહે છે</span>',
    testSubtitle: 'પાટણ અને કચ્છના ઇન્ફ્રાસ્ટ્રક્ચર કોન્ટ્રાક્ટરો, સોલાર પાવર પાર્ક ડેવલપર્સ અને સ્થાનિક મકાન નિર્માતાઓનો વિશ્વસનીય સહયોગી.',
    test1Quote: '“સાંતલપુર નજીક અમારા નેશનલ હાઈવે પ્રોજેક્ટમાં સમય મર્યાદિત હતો. અંકિત બિલ્ડિંગ મટીરીયલ્સે અમારા ફોન પછી ૩ જ કલાકમાં ૬૦૦ થેલી અલ્ટ્રાટેક સિમેન્ટ અને સ્ટીલ સળિયા પહોંચાડી દીધા. ભાવ વ્યાજબી છે અને બિલિંગ એકદમ પારદર્શક છે.”',
    test1Author: 'રમેશ પટેલ',
    test1Role: 'હાઈવે ઇન્ફ્રાસ્ટ્રક્ચર કોન્ટ્રાક્ટર, પાટણ',
    test2Quote: '“ચારણકા/સાંતલપુર બેલ્ટમાં અમારા સોલાર પ્રોજેક્ટ માટે અમે તમામ સેફ્ટી સાધનો, ભારે તાડપત્રી અને ફાસ્ટનર્સ અંકિત બિલ્ડિંગ મટીરીયલ્સ પાસેથી લીધા. ISI હેલ્મેટ અને રેફ્લેક્ટિવ જેકેટ્સ તમામ સેફ્ટી નિયમોનું પાલન કરે છે.”',
    test2Author: 'સુરેશ કુમાર',
    test2Role: 'સોલાર સાઈટ પ્રોજેક્ટ મેનેજર',
    test3Quote: '“ભરોસાપાત્ર અને વિશ્વસનીય જગ્યા! મારા ઘરના બાંધકામ માટે સિમેન્ટ, એસ્ટ્રલ પાઇપ, ડૉ. ફિક્સિટ કેમિકલ અને હાર્ડવેર બધું અહીંથી જ લીધું. ગુણવત્તા ઉત્તમ છે અને ડિલિવરી હંમેશા સમયસર મળી.”',
    test3Author: 'જયેશભાઈ દેસાઈ',
    test3Role: 'મકાન માલિક, સાંતલપુર',
    
    // FAQ
    faqTag: 'વારંવાર પૂછાતા પ્રશ્નો',
    faqTitle: 'વારંવાર પૂછાતા <span class="highlight-gold">પ્રશ્નો</span>',
    faqSubtitle: 'સાઈટ ડિલિવરી, હોલસેલ શરતો, બિલિંગ અને ઓર્ડર સંબંધિત સામાન્ય પ્રશ્નો.',
    faq1Q: 'રાધનપુર-કંડલા હાઈવે પર ડિલિવરી વિસ્તાર કેટલો છે?',
    faq1A: 'અમે સાંતલપુર, રાધનપુર, વારાહી, આડેસર, સામાખિયાળી, પાટણ શહેર, હારીજ, સમી તેમજ ગાંધીધામ અને થરાદ સુધી એક્સપ્રેસ સાઈટ ડિલિવરી આપીએ છીએ. ભારે ઓર્ડર (સિમેન્ટ, સળિયા, પાઇપ) ટ્રેક્ટર અથવા ૧૦-ટાયર ટ્રક દ્વારા સીધા તમારી સાઈટ પર પહોંચાડવામાં આવે છે.',
    faq2Q: 'શું તમે GST બિલ અને મટીરીયલ ટેસ્ટ સર્ટિફિકેટ (MTC) આપો છો?',
    faq2A: 'હા, ૧૦૦%. અમે તમામ ખરીદી માટે પાકું GST ઇનપુટ ટેક્સ ઇનવોઇસ તેમજ સ્ટીલ સળિયા અને સિમેન્ટ માટે ઓરિજિનલ મિલ ટેસ્ટ સર્ટિફિકેટ (MTC) આપીએ છીએ.',
    faq3Q: 'શું વોટ્સએપ અથવા ફોન દ્વારા સીધો જથ્થાબંધ ઓર્ડર આપી શકાય?',
    faq3A: 'ચોક્કસ! ફક્ત અમને +91 97148 58660 પર કૉલ કરો અથવા વેબસાઇટના ક્વોટ કાર્ટ દ્વારા તમારી યાદી વોટ્સએપ પર મોકલો. અમારી ટીમ થોડી જ મિનિટોમાં ભાવ અને વાહન વિગતો મોકલી આપશે.',
    faq4Q: 'સાંતલપુર યાર્ડના કામકાજના કલાકો શું છે?',
    faq4A: 'સવારના બાંધકામ અને સાંજની ઈમરજન્સી જરૂરિયાતોને પહોંચી વળવા અમે અઠવાડિયાના તમામ ૭ દિવસ સવારે ૭:૦૦ થી રાત્રે ૯:૦૦ વાગ્યા સુધી ખુલ્લા રહીએ છીએ.',
    faq5Q: 'શું સેફ્ટી સાધનો ઓડિટ નિયમો મુજબના હોય છે?',
    faq5A: 'હા. અમારા બિલબોર્ડ પર લખ્યા મુજબ "તમારી સલામતી અમારી પ્રાથમિકતા" છે. અમે ISI માર્કાવાળા હેલ્મેટ, EN471 ક્લાસ 2 રેફ્લેક્ટિવ જેકેટ્સ, સ્ટીલ-ટો સેફ્ટી બૂટ અને સેફ્ટી હાર્નેસ પૂરા પાડીએ છીએ.',
    
    // Contact
    contactTag: 'સીધો સંપર્ક અને પૂછપરછ',
    contactTitle: 'અમારા યાર્ડની મુલાકાત લો <span>અથવા તાત્કાલિક ભાવ મેળવો</span>',
    contactSubtitle: 'કોન્ટ્રાક્ટર ભાવ અને ડિલિવરી સમય જાણવા માટે સીધા અમારા વેચાણ અને ડિસ્પેચ વિભાગનો સંપર્ક કરો.',
    contactCardTitle: 'અંકિત બિલ્ડિંગ મટીરીયલ્સ',
    contactCardDesc: 'તમામ બાંધકામ સામગ્રી અને હાર્ડવેર ટ્રેડિંગ માટે તમારો વિશ્વસનીય એકમાત્ર સહયોગી. નેશનલ હાઈવે પર વ્યૂહાત્મક સ્થળ.',
    contactPhoneTitle: 'ફોન / મોબાઈલ (૨૪/૭ હૉટલાઇન)',
    contactAddressTitle: 'યાર્ડ અને ઓફિસનું સરનામું',
    contactAddressText: 'રાધનપુર કંડલા હાઈવે, ઓવરબ્રિજ પાસે, સાંતલપુર, પાટણ - ૩૮૫૩૫૦, ગુજરાત.',
    contactAddressLink: '📍 ગુગલ મેપ્સ પર જુઓ →',
    contactHoursTitle: 'કામકાજનો સમય',
    contactHoursText: 'સોમવાર થી રવિવાર: સવારે ૭:૦૦ થી રાત્રે ૯:૦૦ (રોજ ખુલ્લું)',
    contactWaTitle: 'ત્વરિત વોટ્સએપ સહાય',
    contactWaLink: 'વોટ્સએપ પર સીધી વાતચીત કરો (+91 97148 58660)',
    quickInqTitle: 'ઝડપી સાઈટ પૂછપરછ',
    quickInqDesc: 'તાત્કાલિક પ્રત્યુત્તર મેળવવા માટે તમારી પ્રોજેક્ટ જરૂરિયાત સીધી અમારા મોબાઈલ ડેસ્ક પર મોકલો.',
    lblInqName: 'તમારું નામ / પેઢીનું નામ',
    inqNamePlaceholder: 'દા.ત. રમેશ પટેલ',
    lblInqPhone: 'મોબાઈલ નંબર',
    inqPhonePlaceholder: 'દા.ત. ૯૮૭૬૫ ૪૩૨૧૦',
    lblInqType: 'જરૂરી મુખ્ય કેટેગરી',
    lblInqMsg: 'જરૂરિયાત વિગત & સાઈટનું સ્થળ',
    inqMsgPlaceholder: 'દા.ત. આવતીકાલે સાંતલપુર હાઈવે સાઈટ પર ૪૦૦ થેલી અલ્ટ્રાટેક સિમેન્ટ અને ૩ ટન ૧૨ એમએમ સળિયા જોઈએ છે...',
    btnSubmitInquiry: 'વોટ્સએપ દ્વારા પૂછપરછ મોકલો',
    
    // Footer
    footerDesc: '“ભરોસાપાત્ર અને વિશ્વસનીય જગ્યા.” રાધનપુર - કંડલા હાઈવે, સાંતલપુર, પાટણ - ૩૮૫૩૫૦ ખાતે તમારો વિશ્વસનીય હાર્ડવેર અને બિલ્ડિંગ મટીરીયલ પાર્ટનર.',
    footerColCat: 'પ્રોડક્ટ કેટેગરી',
    footerColLinks: 'ઝડપી લિંક્સ',
    footerColYard: 'યાર્ડનું સ્થળ',
    footerHoursTitle: 'હાઈવે ડિસ્પેચ સમય:',
    footerHoursText: 'સોમ - રવિ: સવારે ૭:૦૦ થી રાત્રે ૯:૦૦',
    footerRights: '© ૨૦૨૬ અંકિત બિલ્ડિંગ મટીરીયલ્સ. સર્વાધિકાર સુરક્ષિત.',
    footerSlogan: '“અમારી સાથે સાકાર કરો તમારા સપનાનું મકાન...” • “તમારી સલામતી અમારી પ્રાથમિકતા”',
    
    // RFQ Drawer
    drawerTitle: 'ભાવ પત્રક યાદી',
    drawerEmptyTitle: 'તમારી ભાવ પત્રક યાદી ખાલી છે.',
    drawerEmptyDesc: 'તાત્કાલિક હોલસેલ પૂછપરછ તૈયાર કરવા માટે અમારા કેટોલોગમાંથી કોઈપણ પ્રોડક્ટ પર "+ ક્વોટમાં ઉમેરો" ક્લિક કરો.',
    drawerNameLabel: 'તમારું નામ / પેઢીનું નામ',
    drawerNamePlaceholder: 'દા.ત. પટેલ કન્સ્ટ્રક્શન',
    drawerLocationLabel: 'ડિલિવરી સાઈટ સ્થળ',
    drawerCheckoutBtn: 'વોટ્સએપ પર ભાવ પત્રક મોકલો (+91 97148 58660)'
  },
  
  hi: {
    // Top Bar
    topDispatch: 'एक्सप्रेस हाईवे डिस्पैच',
    topLocation: 'राधनपुर-कांडला हाईवे, सांतलपुर, पाटण',
    topHours: 'सुबह ७ - रात ९ (रोजाना खुला)',
    
    // Header & Nav
    navTagline: 'हार्डवेयर ट्रेडिंग • सांतलपुर',
    navHome: 'होम',
    navCategories: 'श्रेणियां',
    navEstimator: 'कैलकुलेटर',
    navCatalog: 'उत्पाद सूची',
    navLogistics: 'लॉजिस्टिक्स',
    navAbout: 'हमारे बारे में',
    navContact: 'संपर्क',
    navQuoteCart: 'कोटेशन कार्ट',
    
    // Mobile Drawer
    mobileCallBtn: 'कॉल: +91 97148 58660',
    mobileWaBtn: 'व्हाट्सएप चैट',
    mobileLocation: 'ओवरब्रिज के पास, सांतलपुर, पाटण',
    mobileLangLabel: 'भाषा:',
    
    // Hero
    heroTag: 'पाटण और सांतलपुर का प्रमुख हार्डवेयर केंद्र',
    heroTitleMain: 'अपने सपनों का निर्माण हमारे साथ करें',
    heroTitleGrad: 'सभी प्रकार का हार्डवेयर ट्रेडिंग',
    heroSlogan: '“भरोसापात्र और विश्वसनीय जगह”',
    heroSloganSub: 'सिविल ठेकेदारों, बिल्डरों और घर मालिकों के लिए सबसे भरोसेमंद प्रतिष्ठान',
    heroDesc: '<strong>राधनपुर - कांडला हाईवे, ओवरब्रिज के पास, सांतलपुर, पाटण - ३८५३५०</strong> स्थित. सीमेंट, टीएमटी सरिया, पीवीसी पाइप, औद्योगिक सुरक्षा उपकरण, तिरपाल, वॉटरप्रूफिंग केमिकल्स, कटिंग डिस्क, टूल्स और फास्टनर्स थोक दरों पर तत्काल साइट डिलीवरी के साथ उपलब्ध.',
    heroBtnEstimator: 'सामग्री की गणना करें',
    heroBtnCatalog: 'उत्पाद सूची देखें',
    heroBtnCall: 'कॉल: 9714858660',
    heroBtnWa: 'व्हाट्सएप करें',
    
    // Billboard Card
    bbHeaderTitle: 'ऑफिशियल हाईवे बिलबोर्ड • राधनपुर - कांडला नेशनल हाईवे',
    bbLiveBadge: 'राष्ट्रीय राजमार्ग पर मुख्य लैंडमार्क',
    bbOverlayBadge: 'फुल स्क्रीन एचडी बिलबोर्ड देखने के लिए क्लिक करें',
    bbCallHotline: 'हॉटलाइन कॉल: ',
    bbLocationText: 'ओवरब्रिज के पास, सांतलपुर, पाटण - ३८५३५०',
    bbDispatchText: 'हाईवे यार्ड थोक लोडिंग',
    
    // Trust Pills
    trustPill1: '१००% असली ब्रांडेड स्टॉक',
    trustPill2: 'तेज हाईवे साइट डिलीवरी',
    trustPill3: 'यार्ड में तैयार थोक स्टॉक',
    trustPill4: '“आपकी सुरक्षा हमारी प्राथमिकता”',
    
    // Categories Section
    catTag: '९ मुख्य उत्पाद श्रेणियां',
    catTitle: 'एक ही छत के नीचे संपूर्ण निर्माण सामग्री',
    catTitleSub: '& तैयार स्टॉक',
    catSubtitle: 'हमारे राधनपुर-कांडला हाईवे बिलबोर्ड पर प्रदर्शित सभी श्रेणियां थोक मात्रा में उपलब्ध हैं, जो तत्काल लोडिंग और साइट डिलीवरी के लिए तैयार हैं।',
    catBadge: 'ऑफिशियल बिलबोर्ड स्टॉक',
    catBrandsPrefix: 'ब्रांड्स:',
    catViewBtn: 'उत्पाद देखें →',
    
    // Estimator Section
    estTag: 'तुरंत अनुमान टूल',
    estTitle: 'निर्माण सामग्री',
    estTitleSub: '& मात्रा कैलकुलेटर',
    estSubtitle: 'अपनी साइट का माप दर्ज करके सीमेंट की बोरियां, बालू, गिट्टी, सरिया, ईंटें अथवा वॉटरप्रूफिंग का अनुमान प्राप्त करें। तत्काल दरों के लिए व्हाट्सएप पर भेजें।',
    tabConcrete: '🏗️ कंक्रीट स्लैब & आरसीसी',
    tabBrick: '🧱 चिनाई & प्लास्टर',
    tabWater: '💧 छत वॉटरप्रूफिंग',
    tabSafety: '🦺 सुरक्षा किट & तिरपाल',
    
    // Estimator Form
    lblConcArea: 'स्लैब / निर्माण क्षेत्रफल',
    lblConcAreaHint: 'वर्ग फुट (sq ft)',
    lblConcThick: 'स्लैब मोटाई',
    lblConcThickHint: 'इंच',
    optThick1: '४.५ इंच (सामान्य आवासीय)',
    optThick2: '५.० इंच (मजबूत आवासीय / कमर्शियल)',
    optThick3: '६.० इंच (औद्योगिक फर्श / भारी भार)',
    lblConcMix: 'कंक्रीट ग्रेड / मिक्स रेशियो',
    lblConcMixHint: 'मानक ISI',
    optMix1: 'M20 ग्रेड (१ : १.५ : ३ - स्लैब, बीम एवं कॉलम)',
    optMix2: 'M25 ग्रेड (१ : १ : २ - भारी स्ट्रक्चरल RCC)',
    lblBrickLen: 'दीवार की कुल लंबाई',
    lblBrickLenHint: 'फुट',
    lblBrickHeight: 'दीवार की ऊंचाई',
    lblBrickHeightHint: 'फुट',
    lblBrickThick: 'दीवार की मोटाई',
    lblBrickThickHint: 'चिनाई का प्रकार',
    optBrickThick1: '९-इंच बाहरी दीवार (डबल ईंट)',
    optBrickThick2: '४.५-इंच पार्टीशन दीवार (सिंगल ईंट)',
    lblWpArea: 'छत / टेरेस क्षेत्रफल',
    lblWpAreaHint: 'वर्ग फुट',
    lblWpType: 'उपचार का प्रकार',
    optWp1: 'टेरेस एवं पैरापेट (डॉ. फिक्सिट फास्टफ्लेक्स + मेश)',
    optWp2: 'बेसमेंट रिटेनिंग वॉल (इंटीग्रल वॉटरप्रूफिंग)',
    optWp3: 'बाथरूम स्लैब वॉटरप्रूफिंग',
    lblSiteWorkers: 'साइट पर कार्यरत मजदूरों की संख्या',
    lblSiteWorkersHint: 'व्यक्तियों की संख्या',
    lblSiteStorage: 'खुला भंडारण क्षेत्र (ढकने हेतु)',
    lblSiteStorageHint: 'वर्ग फुट',
    calcLiveBadge: 'लाइव रियल-टाइम',
    btnCalcWa: 'अनुमान व्हाट्सएप पर भेजें',
    btnCalcPrint: 'अनुमान प्रिंट / सेव करें',
    
    // Catalog Section
    catalogTag: 'थोक एवं खुदरा कैटलॉग',
    catalogTitle: 'प्रमुख निर्माण',
    catalogTitleSub: '& हार्डवेयर सामग्री',
    catalogSubtitle: 'हमारे सांतलपुर यार्ड में उपलब्ध ब्रांडेड उत्पाद देखें। सर्वोत्तम दरों के लिए कोटेशन कार्ट में जोड़ें।',
    filterAll: 'सभी उत्पाद',
    filterCement: 'सीमेंट और सरिया',
    filterPvc: 'पीवीसी पाइप & वाल्व',
    filterHardware: 'हार्डवेयर & तार',
    filterTools: 'हैंड & पावर टूल्स',
    filterSafety: 'औद्योगिक सुरक्षा PPE',
    filterTarpaulin: 'तिरपाल & एचडीपीई',
    filterWaterproofing: 'वॉटरप्रूफिंग',
    filterAbrasives: 'कटिंग डिस्क',
    filterFasteners: 'फास्टनर्स & स्क्रू',
    searchPlaceholder: 'उत्पाद का नाम, ब्रांड या विवरण खोजें (जैसे अल्ट्राटेक, एस्ट्रल, तिरपाल, सरिया)...',
    readyInYard: 'हाईवे यार्ड में तैयार स्टॉक',
    addToQuote: '+ कोटेशन में जोड़ें',
    noProducts: 'आपकी खोज के अनुसार कोई उत्पाद नहीं मिला।',
    noProductsSub: 'विशेष ऑर्डर या अन्य सामग्री के लिए +91 97148 58660 पर कॉल करें!',
    
    // Logistics Section
    logisticsBadge: 'रणनीतिक हाईवे लॉजिस्टिक्स केंद्र',
    logisticsTitle: 'सीधी हाईवे सप्लाई लाइन: <br><span class="gradient-text">पाटण, सौराष्ट्र और कांडला पोर्ट</span>',
    logisticsDesc: '<strong>राधनपुर - कांडला हाईवे पर सांतलपुर ओवरब्रिज के पास</strong> स्थित हमारा यार्ड भारी ट्रकों, ट्रैक्टर ट्रॉलियों और पिक-अप वाहनों को सुगम पहुंच प्रदान करता है। चाहे हाईवे पुल के लिए २० टन सरिया हो या कॉलोनी के लिए ५०० बोरी सीमेंट, हमारा वाहन सीधे आपकी साइट पर पहुंचाता है।',
    corridor1Title: 'राधनपुर - सांतलपुर - वाराही कॉरिडोर',
    corridor1Desc: 'बुकिंग के १ से २ घंटे में साइट पर सीधी अनलोडिंग',
    corridor2Title: 'आड़ेसर - समाखियाली - गांधीधाम एवं कांडला पोर्ट रूट',
    corridor2Desc: 'औद्योगिक परियोजनाओं, वेयरहाउसिंग और नमक उद्योग हेतु थोक सप्लाई',
    corridor3Title: 'पाटण जिला, समी, हारीज एवं थराद हाईवे ग्रिड',
    corridor3Desc: 'आवासीय परियोजनाओं, स्कूलों एवं कृषि बोरवेल के लिए दैनिक डिस्पैच',
    btnLogisticsCall: 'लॉजिस्टिक्स डेस्क कॉल: 9714858660',
    btnLogisticsDir: 'लैंडमार्क दिशा-निर्देश देखें',
    
    // Map Card
    mapCardTitle: 'हाईवे लोकेशन कार्ड',
    mapVerifiedHub: 'सत्यापित केंद्र',
    mapAddressTitle: 'अंकित बिल्डिंग मटेरियल्स 📍',
    mapAddressText: 'राधनपुर कांडला हाईवे, ओवरब्रिज के पास,<br>सांतलपुर, पाटण - ३८૫३५०, गुजरात.',
    mapClickBadge: 'गूगल मैप्स पर देखने हेतु क्लिक करें →',
    mapLandmark1: 'सांतलपुर नेशनल हाईवे ओवरब्रिज के पास',
    mapLandmark2: '१० और १४ पहिया भारी ट्रकों हेतु आसान टर्निंग',
    mapLandmark3: 'पास में धर्मकांटा (वेब्रिज) एवं क्रेन लोडिंग की सुविधा',
    mapOpenBtn: 'गूगल मैप्स में खोलें',
    
    // Brands
    brandsHeader: 'अधिकृत स्टॉकिस्ट एवं डायरेक्ट फैक्ट्री सोर्सिंग',
    
    // Why Choose Us
    aboutTag: 'अंकित एडवांटेज',
    aboutTitle: 'ठेकेदार क्यों करते हैं <span class="highlight-gold">अंकित बिल्डिंग मटेरियल्स पर भरोसा</span>',
    aboutSubtitle: '“भरोसापात्र और विश्वसनीय जगह” केवल हमारा नारा नहीं — यह गुजरात भर में हर डिस्पैच, इनवॉइस और ठेकेदार साझेदारी में हमारा दैनिक मानक है।',
    feat1Title: '१००% असली प्रमाणित सामान',
    feat1Desc: 'सीमेंट, सरिया और पाइप के लिए टेस्ट सर्टिफिकेट (MTC) के साथ सीधे फैक्ट्री से आपूर्ति। गुणवत्ता में कोई समझौता नहीं।',
    feat2Title: 'थोक मात्रा मूल्य निर्धारण',
    feat2Desc: 'बड़े पैमाने पर खरीद क्षमता का लाभ उठाकर हम सड़क ठेकेदारों, सोलर प्रोजेक्ट्स और बिल्डरों को पारदर्शी थोक छूट प्रदान करते हैं।',
    feat3Title: 'एक्सप्रेस हाईवे साइट अनलोडिंग',
    feat3Desc: 'हाईवे पर स्थित होने के कारण सांतलपुर, राधनपुर, पाटण, वाराही और कांडला कॉरिडोर में बिना देरी समय पर डिलीवरी सुनिश्चित होती है।',
    feat4Title: 'संपूर्ण ९-इन-१ इन्वेंटरी',
    feat4Desc: 'छोटे स्क्रू-कील से लेकर सीमेंट के पूरे ट्रक और सुरक्षा हेलमेट तक, आपको अलग-अलग सप्लायर की आवश्यकता नहीं है।',
    
    // Testimonials
    testTag: 'ग्राहक समीक्षाएं',
    testTitle: 'बिल्डर्स हमारे बारे में <span class="highlight-gold">क्या कहते हैं</span>',
    testSubtitle: 'पाटण और कच्छ के इंफ्रास्ट्रक्चर ठेकेदारों, सोलर पावर पार्क डेवलपर्स और स्थानीय गृह निर्माताओं द्वारा विश्वसनीय।',
    test1Quote: '“सांतलपुर के पास हमारे नेशनल हाईवे प्रोजेक्ट पर समय सीमा बहुत कम थी। अंकित बिल्डिंग मटेरियल्स ने हमारे एक फोन कॉल पर ३ घंटे के भीतर ६०० बोरी अल्ट्राटेक सीमेंट और सरिया पहुंचा दिया। इनकी दरें उचित और इनवॉइसिंग पारदर्शी है।”',
    test1Author: 'रमेश पटेल',
    test1Role: 'हाईवे इंफ्रास्ट्रक्चर ठेकेदार, पाटण',
    test2Quote: '“चारणका/सांतलपुर क्षेत्र में हमारे सोलर प्रोजेक्ट के लिए हमने सभी सुरक्षा उपकरण, भारी तिरपाल और फास्टनर्स अंकित बिल्डिंग मटेरियल्स से खरीदे। ISI हेलमेट और रिफ्लेक्टिव जैकेट सभी कॉर्पोरेट सुरक्षा मानकों पर खरे उतरे।”',
    test2Author: 'सुरेश कुमार',
    test2Role: 'सोलर साइट प्रोजेक्ट मैनेजर',
    test3Quote: '“भरोसापात्र और विश्वसनीय जगह! मेरे घर के निर्माण के लिए सीमेंट, एस्ट्रल पाइप, डॉ. फिक्सिट केमिकल्स और हार्डवेयर सब यहीं से लिया। गुणवत्ता बेहतरीन है और डिलीवरी हमेशा समय पर मिली।”',
    test3Author: 'जयेशभाई देसाई',
    test3Role: 'गृहस्वामी, सांतलपुर',
    
    // FAQ
    faqTag: 'अक्सर पूछे जाने वाले प्रश्न',
    faqTitle: 'अक्सर पूछे जाने वाले <span class="highlight-gold">प्रश्न</span>',
    faqSubtitle: 'साइट डिलीवरी, थोक नियम, बिलिंग और ऑर्डर संबंधी सामान्य प्रश्न।',
    faq1Q: 'राधनपुर-कांडला हाईवे पर डिलीवरी का दायरा क्या है?',
    faq1A: 'हम सांतलपुर, राधनपुर, वाराही, आड़ेसर, समाखियाली, पाटण शहर, हारीज, समी और गांधीधाम व थराद तक एक्सप्रेस साइट डिलीवरी प्रदान करते हैं। भारी ऑर्डर (सीमेंट, सरिया, पाइप) ट्रैक्टर या १०-पहिया ट्रकों से सीधे आपकी साइट पर पहुंचाए जाते हैं।',
    faq2Q: 'क्या आप जीएसटी बिल और टेस्ट सर्टिफिकेट (MTC) देते हैं?',
    faq2A: 'हाँ, १००%। हम सभी खरीद के लिए वैध जीएसटी इनपुट टैक्स इनवॉइस और सरिया व सीमेंट के लिए मूल मिल टेस्ट सर्टिफिकेट (MTC) प्रदान करते हैं।',
    faq3Q: 'क्या व्हाट्सएप या फोन से सीधे थोक ऑर्डर दे सकते हैं?',
    faq3A: 'बिल्कुल! हमें +91 97148 58660 पर कॉल करें या वेबसाइट के कोटेशन कार्ट से अपनी सूची व्हाट्सएप पर भेजें। हमारी टीम कुछ ही मिनटों में दरें और वाहन विवरण उपलब्ध कराती है।',
    faq4Q: 'सांतलपुर यार्ड का कार्य समय क्या है?',
    faq4A: 'सुबह के निर्माण कार्य और शाम की आपातकालीन जरूरतों के लिए हम सप्ताह के सातों दिन सुबह ७:०० से रात ९:०० बजे तक खुले रहते हैं।',
    faq5Q: 'क्या सुरक्षा उपकरण ऑडिट मानकों के अनुरूप हैं?',
    faq5A: 'हाँ। हमारे बिलबोर्ड के अनुसार "आपकी सुरक्षा हमारी प्राथमिकता" है। हम ISI प्रमाणित हेलमेट, EN471 क्लास 2 रिफ्लेक्टिव जैकेट, स्टील-टो जूते और सेफ्टी बेल्ट उपलब्ध कराते हैं।',
    
    // Contact
    contactTag: 'सीधा संपर्क एवं पूछताछ',
    contactTitle: 'हमारे यार्ड पर आएं <span>या तुरंत कोटेशन प्राप्त करें</span>',
    contactSubtitle: 'ठेकेदार दरों और डिलीवरी समय के लिए सीधे हमारी सेल्स और डिस्पैच टीम से संपर्क करें।',
    contactCardTitle: 'अंकित बिल्डिंग मटेरियल्स',
    contactCardDesc: 'सभी निर्माण सामग्री और हार्डवेयर ट्रेडिंग हेतु आपका एकमात्र विश्वसनीय भागीदार। राष्ट्रीय राजमार्ग पर रणनीतिक स्थान।',
    contactPhoneTitle: 'फोन / मोबाइल (२४/७ हेल्पलाइन)',
    contactAddressTitle: 'यार्ड एवं कार्यालय का पता',
    contactAddressText: 'राधनपुर कांडला हाईवे, ओवरब्रिज के पास, सांतलपुर, पाटण - ३८૫३५०, गुजरात.',
    contactAddressLink: '📍 गूगल मैप्स पर देखें →',
    contactHoursTitle: 'कार्य समय',
    contactHoursText: 'सोमवार से रविवार: सुबह ७:०० से रात ९:०० (सातों दिन)',
    contactWaTitle: 'त्वरित व्हाट्सएप सहायता',
    contactWaLink: 'व्हाट्सएप पर सीधे चैट करें (+91 97148 58660)',
    quickInqTitle: 'त्वरित साइट पूछताछ',
    quickInqDesc: 'तुरंत प्रतिक्रिया पाने के लिए अपनी परियोजना आवश्यकता सीधे हमारे मोबाइल डेस्क पर भेजें।',
    lblInqName: 'आपका नाम / फर्म का नाम',
    inqNamePlaceholder: 'जैसे रमेश पटेल',
    lblInqPhone: 'मोबाइल नंबर',
    inqPhonePlaceholder: 'जैसे ९८७६५ ४३२१०',
    lblInqType: 'आवश्यक मुख्य श्रेणी',
    lblInqMsg: 'सामग्री का विवरण एवं साइट का स्थान',
    inqMsgPlaceholder: 'जैसे कल सांतलपुर हाईवे साइट पर ४०० बोरी अल्ट्राटेक सीमेंट और ३ टन १२ एमएम सरिया चाहिए...',
    btnSubmitInquiry: 'व्हाट्सएप द्वारा पूछताछ भेजें',
    
    // Footer
    footerDesc: '“भरोसापात्र और विश्वसनीय जगह।” राधनपुर - कांडला हाईवे, सांतलपुर, पाटण - ३८૫३५० पर आपका भरोसेमंद हार्डवेयर एवं निर्माण सामग्री भागीदार।',
    footerColCat: 'उत्पाद श्रेणियां',
    footerColLinks: 'त्वरित लिंक्स',
    footerColYard: 'यार्ड का स्थान',
    footerHoursTitle: 'हाईवे डिस्पैच समय:',
    footerHoursText: 'सोम - रवि: सुबह ७:०० से रात ९:००',
    footerRights: '© २०२६ अंकित बिल्डिंग मटेरियल्स. सर्वाधिकार सुरक्षित.',
    footerSlogan: '“अपने सपनों का निर्माण हमारे साथ करें...” • “आपकी सुरक्षा हमारी प्राथमिकता”',
    
    // RFQ Drawer
    drawerTitle: 'कोटेशन अनुरोध सूची',
    drawerEmptyTitle: 'आपकी कोटेशन सूची खाली है।',
    drawerEmptyDesc: 'तत्काल थोक पूछताछ तैयार करने के लिए हमारे कैटलॉग से किसी भी उत्पाद पर "+ कोटेशन में जोड़ें" क्लिक करें।',
    drawerNameLabel: 'आपका नाम / फर्म का नाम',
    drawerNamePlaceholder: 'जैसे पटेल कंस्ट्रक्शन',
    drawerLocationLabel: 'डिलीवरी साइट स्थान',
    drawerCheckoutBtn: 'व्हाट्सएप पर कोटेशन भेजें (+91 97148 58660)'
  }
};

// Multilingual Calculator Result Labels
const calcLabels = {
  en: {
    concreteTitle: (area) => `Estimated Concrete & Slab Materials (${area} Sq Ft)`,
    cementReq: 'Cement Required',
    cementUnit: 'Bags (50kg)',
    sandReq: 'Sand (River/Coarse)',
    sandUnit: 'Metric Tons',
    aggReq: 'Kapchi / Aggregates',
    aggUnit: 'Metric Tons',
    steelReq: 'TMT Steel 550D Rebar',
    steelUnit: (kg, mt) => `${kg} Kg (~${mt} MT)`,

    brickTitle: (area) => `Estimated Masonry Wall Materials (${area} Sq Ft)`,
    bricksReq: 'Bricks / Blocks',
    bricksUnit: 'Nos',
    mortarCement: 'Mortar Cement',
    mortarUnit: 'Bags',
    plasterSand: 'Plaster Sand',
    plasterUnit: 'Metric Tons',
    giWire: 'GI Binding Wire',
    giWireUnit: 'Kg',

    wpTitle: (area) => `Waterproofing Chemical Requirements (${area} Sq Ft)`,
    drFixitReq: 'Dr. Fixit / Acrylic Coating',
    litersUnit: 'Liters',
    heavyCoating: 'Heavy Coating Buckets',
    bucketsUnit: 'Buckets (20kg)',
    meshReq: 'Fiber Glass Mesh',
    meshUnit: 'Rolls (50m)',
    bitumenReq: 'Bitumen Primer',

    safetyTitle: 'Industrial Safety PPE & Site Tarpaulins Pack',
    helmetsReq: 'ISI Hard Hat Helmets',
    helmetsUnit: 'Pieces (With Buffer)',
    vestsReq: 'High-Vis Reflective Vests',
    vestsUnit: 'Pieces',
    bootsReq: 'Steel Toe Safety Boots',
    bootsUnit: 'Pairs',
    tarpsReq: '24x18 Waterproof Tarps',
    tarpsUnit: 'Heavy Tarps'
  },
  gu: {
    concreteTitle: (area) => `કોંક્રીટ સ્લેબ મટીરીયલ અંદાજ (${area} ચોરસ ફૂટ)`,
    cementReq: 'જરૂરી સિમેન્ટ',
    cementUnit: 'થેલી (૫૦ કિલો)',
    sandReq: 'રેતી (નદીની / જાડી)',
    sandUnit: 'મેટ્રિક ટન',
    aggReq: 'કપચી / એગ્રીગેટ્સ',
    aggUnit: 'મેટ્રિક ટન',
    steelReq: '૫૫૦ડી TMT સ્ટીલ સળિયા',
    steelUnit: (kg, mt) => `${kg} કિલો (~${mt} ટન)`,

    brickTitle: (area) => `ચણતર દિવાલ મટીરીયલ અંદાજ (${area} ચોરસ ફૂટ)`,
    bricksReq: 'ઈંટો / એએસી બ્લોક્સ',
    bricksUnit: 'નંગ',
    mortarCement: 'ચણતર સિમેન્ટ',
    mortarUnit: 'થેલી',
    plasterSand: 'પ્લાસ્ટર રેતી',
    plasterUnit: 'મેટ્રિક ટન',
    giWire: 'જીઆઈ બાઈન્ડિંગ વાયર',
    giWireUnit: 'કિલો',

    wpTitle: (area) => `વોટરપ્રૂફિંગ કેમિકલ જરૂરિયાત (${area} ચોરસ ફૂટ)`,
    drFixitReq: 'ડૉ. ફિક્સિટ / એક્રેલિક કોટિંગ',
    litersUnit: 'લીટર',
    heavyCoating: 'હેવી કોટિંગ બાલદી',
    bucketsUnit: 'બાલદી (૨૦ કિલો)',
    meshReq: 'ફાઈબર ગ્લાસ મેશ',
    meshUnit: 'રોલ (૫૦ મીટર)',
    bitumenReq: 'બિટ્યુમેન પ્રાઈમર',

    safetyTitle: 'ઇન્ડસ્ટ્રીયલ સેફ્ટી કીટ અને તાડપત્રી પેક',
    helmetsReq: 'ISI સેફ્ટી હેલ્મેટ',
    helmetsUnit: 'નંગ (બફર સાથે)',
    vestsReq: 'રેફ્લેક્ટિવ જેકેટ્સ',
    vestsUnit: 'નંગ',
    bootsReq: 'સ્ટીલ ટો સેફ્ટી બૂટ',
    bootsUnit: 'જોડી',
    tarpsReq: '૨૪x૧૮ વોટરપ્રૂફ તાડપત્રી',
    tarpsUnit: 'હેવી તાડપત્રી'
  },
  hi: {
    concreteTitle: (area) => `कंक्रीट स्लैब सामग्री अनुमान (${area} वर्ग फुट)`,
    cementReq: 'आवश्यक सीमेंट',
    cementUnit: 'बोरी (५० किग्रा)',
    sandReq: 'रेत / बालू',
    sandUnit: 'मीट्रिक टन',
    aggReq: 'कंक्रीट गिट्टी / कपची',
    aggUnit: 'मीट्रिक टन',
    steelReq: '५५०डी टीएमटी सरिया',
    steelUnit: (kg, mt) => `${kg} किग्रा (~${mt} टन)`,

    brickTitle: (area) => `चिनाई दीवार सामग्री अनुमान (${area} वर्ग फुट)`,
    bricksReq: 'ईंटें / ब्लॉक्स',
    bricksUnit: 'नग',
    mortarCement: 'चिनाई सीमेंट',
    mortarUnit: 'बोरी',
    plasterSand: 'प्लास्टर बालू',
    plasterUnit: 'मीट्रिक टन',
    giWire: 'जीआई बाइंडिंग तार',
    giWireUnit: 'किग्रा',

    wpTitle: (area) => `वॉटरप्रूफिंग केमिकल आवश्यकता (${area} वर्ग फुट)`,
    drFixitReq: 'डॉ. फिक्सिट / एक्रेलिक कोटिंग',
    litersUnit: 'लीटर',
    heavyCoating: 'वाटरप्रूफिंग बाल्टी',
    bucketsUnit: 'बाल्टी (२० किग्रा)',
    meshReq: 'फाइबर ग्लास मेश जाली',
    meshUnit: 'रोल (५० मीटर)',
    bitumenReq: 'बिटुमेन प्राइमर',

    safetyTitle: 'औद्योगिक सुरक्षा किट एवं तिरपाल पैक',
    helmetsReq: 'ISI सुरक्षा हेलमेट',
    helmetsUnit: 'नग (बफर सहित)',
    vestsReq: 'रिफ्लेक्टिव जैकेट',
    vestsUnit: 'नग',
    bootsReq: 'स्टील टो सुरक्षा जूते',
    bootsUnit: 'जोड़ी',
    tarpsReq: '२४x१८ वाटरप्रूफ तिरपाल',
    tarpsUnit: 'भारी तिरपाल'
  }
};

// Initialize Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  setupCleanNavigation();
  initTheme();
  setupCalculator();
  setupEventListeners();
  setupMobileMenu();
  setupScrollTracking();
  setupScrollAnimations();
  updateCartBadge();
  
  // Apply saved or default language across the entire website
  switchLanguage(state.currentLang);
});

// Render 9 Categories in Active Language
function renderCategories() {
  const container = document.getElementById('categoriesGrid');
  if (!container) return;

  const lang = state.currentLang || 'en';
  const langKey = lang === 'gu' ? 'Gu' : (lang === 'hi' ? 'Hi' : 'En');
  const t = i18n[lang] || i18n.en;

  container.innerHTML = categoriesData.map((cat, idx) => {
    const name = cat['name' + langKey] || cat.nameEn;
    const desc = cat['desc' + langKey] || cat.descEn;
    const tags = cat['tags' + langKey] || cat.tagsEn;

    return `
      <div class="category-card stagger-item" data-cat-id="${cat.id}" style="transition-delay: ${(idx % 3) * 0.12}s;">
        <div class="category-img-box">
          <img src="${cat.img}" alt="${name}" loading="lazy" />
          <span class="category-badge-chip">
            <span>${cat.icon}</span> ${t.catBadge}
          </span>
        </div>
        <div class="category-content">
          <h3 class="category-title">
            <span>${name}</span>
            <span class="category-title-icon">${cat.icon}</span>
          </h3>
          <p class="category-desc">${desc}</p>
          <div class="category-items-list">
            ${tags.map(tag => `<span class="item-tag">${tag}</span>`).join('')}
          </div>
          <div class="category-footer">
            <span class="brand-logos-text">${t.catBrandsPrefix} ${cat.brands}</span>
            <a href="javascript:void(0)" class="cat-action-link" data-scroll="catalog" onclick="filterByCat('${cat.id}')">
              ${t.catViewBtn}
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  window.reobserveAnimatedCards?.();
}

// Render Products with Filter and Search in Active Language
function renderProducts() {
  const container = document.getElementById('productsGrid');
  if (!container) return;

  const lang = state.currentLang || 'en';
  const langKey = lang === 'gu' ? 'Gu' : (lang === 'hi' ? 'Hi' : 'En');
  const t = i18n[lang] || i18n.en;

  let filtered = productsData.filter(item => {
    const matchCat = state.activeCategory === 'all' || item.cat === state.activeCategory;
    const title = item['title' + langKey] || item.titleEn;
    const specs = item['specs' + langKey] || item.specsEn;
    const query = state.searchQuery.toLowerCase();
    const matchSearch = !state.searchQuery || 
      title.toLowerCase().includes(query) ||
      item.titleEn.toLowerCase().includes(query) ||
      specs.toLowerCase().includes(query) ||
      item.brand.toLowerCase().includes(query);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">${t.noProducts}</p>
        <p style="font-size: 0.9rem;">${t.noProductsSub}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((item, idx) => {
    const title = item['title' + langKey] || item.titleEn;
    const specs = item['specs' + langKey] || item.specsEn;
    const unit = item['unit' + langKey] || item.unitEn;
    const min = item['min' + langKey] || item.minEn;

    return `
      <div class="product-card stagger-item" data-id="${item.id}" style="transition-delay: ${(idx % 4) * 0.08}s;">
        <div class="product-badge-row">
          <span class="product-cat-tag">${item.cat}</span>
          <span class="product-stock-tag">${t.readyInYard}</span>
        </div>
        <h4 class="product-title">${title}</h4>
        <div class="product-brand">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span>${item.brand}</span>
        </div>
        <p class="product-specs">${specs}</p>
        <div class="product-footer">
          <div class="product-unit-info">
            <strong>${unit}</strong>
            <span>${lang === 'gu' ? 'ઓછામાં ઓછું:' : (lang === 'hi' ? 'न्यूनतम:' : 'Min:')} ${min}</span>
          </div>
          <button class="btn btn-sm btn-primary" onclick="addToRFQ('${item.id}')">
            ${t.addToQuote}
          </button>
        </div>
      </div>
    `;
  }).join('');

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
}

function calculateCurrentTab(tabType) {
  const resultGrid = document.getElementById('calcResultGrid');
  const resultTitle = document.getElementById('calcResultTitle');
  if (!resultGrid || !resultTitle) return;

  const lang = state.currentLang || 'en';
  const c = calcLabels[lang] || calcLabels.en;

  if (tabType === 'concrete') {
    const area = parseFloat(document.getElementById('concArea')?.value) || 1000;
    const thickness = parseFloat(document.getElementById('concThick')?.value) || 5; // inches
    const mix = document.getElementById('concMix')?.value || 'm20';

    const volumeCuFt = area * (thickness / 12);
    const volumeCuM = volumeCuFt / 35.3147;
    const dryVol = volumeCuM * 1.54;

    let cementBags, sandTons, aggTons, steelKg;

    if (mix === 'm25') {
      const cementVol = dryVol * (1 / 4);
      cementBags = Math.round((cementVol * 1440) / 50);
      sandTons = ((dryVol * (1 / 4) * 1600) / 1000).toFixed(1);
      aggTons = ((dryVol * (2 / 4) * 1500) / 1000).toFixed(1);
      steelKg = Math.round(area * 3.8);
    } else {
      const cementVol = dryVol * (1 / 5.5);
      cementBags = Math.round((cementVol * 1440) / 50);
      sandTons = ((dryVol * (1.5 / 5.5) * 1600) / 1000).toFixed(1);
      aggTons = ((dryVol * (3 / 5.5) * 1500) / 1000).toFixed(1);
      steelKg = Math.round(area * 3.2);
    }

    resultTitle.textContent = c.concreteTitle(area);
    resultGrid.innerHTML = `
      <div class="result-item">
        <div class="result-label">${c.cementReq}</div>
        <div class="result-val">${cementBags} <span class="result-unit">${c.cementUnit}</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">${c.sandReq}</div>
        <div class="result-val">${sandTons} <span class="result-unit">${c.sandUnit}</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">${c.aggReq}</div>
        <div class="result-val">${aggTons} <span class="result-unit">${c.aggUnit}</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">${c.steelReq}</div>
        <div class="result-val">${steelKg} <span class="result-unit">${c.steelUnit(steelKg, (steelKg/1000).toFixed(2))}</span></div>
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

    resultTitle.textContent = c.brickTitle(wallArea);
    resultGrid.innerHTML = `
      <div class="result-item">
        <div class="result-label">${c.bricksReq}</div>
        <div class="result-val">${bricks} <span class="result-unit">${c.bricksUnit}</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">${c.mortarCement}</div>
        <div class="result-val">${cementBags} <span class="result-unit">${c.mortarUnit}</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">${c.plasterSand}</div>
        <div class="result-val">${sandTons} <span class="result-unit">${c.plasterUnit}</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">${c.giWire}</div>
        <div class="result-val">10 <span class="result-unit">${c.giWireUnit}</span></div>
      </div>
    `;

    window.currentCalcSummary = `Brickwork Estimate (${wallArea} sq ft, ${thickness}" wall): ${bricks} Bricks, ${cementBags} Cement Bags, ${sandTons} MT Sand.`;
  } else if (tabType === 'waterproofing') {
    const area = parseFloat(document.getElementById('wpArea')?.value) || 1200;
    const type = document.getElementById('wpType')?.value || 'terrace';

    let chemicalLiters = Math.round(area * 0.25);
    let coatingBuckets = Math.ceil(area / 150);
    let meshRolls = Math.ceil(area / 450);

    resultTitle.textContent = c.wpTitle(area);
    resultGrid.innerHTML = `
      <div class="result-item">
        <div class="result-label">${c.drFixitReq}</div>
        <div class="result-val">${chemicalLiters} <span class="result-unit">${c.litersUnit}</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">${c.heavyCoating}</div>
        <div class="result-val">${coatingBuckets} <span class="result-unit">${c.bucketsUnit}</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">${c.meshReq}</div>
        <div class="result-val">${meshRolls} <span class="result-unit">${c.meshUnit}</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">${c.bitumenReq}</div>
        <div class="result-val">${Math.ceil(area * 0.08)} <span class="result-unit">${c.litersUnit}</span></div>
      </div>
    `;

    window.currentCalcSummary = `Waterproofing Estimate (${area} sq ft, ${type}): ${chemicalLiters}L Coating, ${coatingBuckets} Buckets (20kg), ${meshRolls} Mesh Rolls.`;
  } else if (tabType === 'safety') {
    const workers = parseInt(document.getElementById('siteWorkers')?.value) || 25;
    const tarpArea = parseFloat(document.getElementById('siteStorageArea')?.value) || 500;

    let helmets = workers + 5;
    let vests = workers + 5;
    let boots = Math.round(workers * 0.8);
    let tarps = Math.ceil(tarpArea / 400);

    resultTitle.textContent = c.safetyTitle;
    resultGrid.innerHTML = `
      <div class="result-item">
        <div class="result-label">${c.helmetsReq}</div>
        <div class="result-val">${helmets} <span class="result-unit">${c.helmetsUnit}</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">${c.vestsReq}</div>
        <div class="result-val">${vests} <span class="result-unit">${c.vestsUnit}</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">${c.bootsReq}</div>
        <div class="result-val">${boots} <span class="result-unit">${c.bootsUnit}</span></div>
      </div>
      <div class="result-item">
        <div class="result-label">${c.tarpsReq}</div>
        <div class="result-val">${tarps} <span class="result-unit">${c.tarpsUnit}</span></div>
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

  const lang = state.currentLang || 'en';
  const langKey = lang === 'gu' ? 'Gu' : (lang === 'hi' ? 'Hi' : 'En');
  const title = product['title' + langKey] || product.titleEn;
  const unit = product['unit' + langKey] || product.unitEn;

  const existing = state.rfqItems.find(i => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.rfqItems.push({
      id: product.id,
      title: title,
      cat: product.cat,
      unit: unit,
      qty: 1
    });
  }

  updateCartBadge();
  const addedMsg = lang === 'gu' ? `"${title}" ભાવ પત્રકમાં ઉમેરવામાં આવ્યું!` : (lang === 'hi' ? `"${title}" कोटेशन कार्ट में जोड़ा गया!` : `Added "${title}" to Quote Request!`);
  showToast(addedMsg);
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

  const lang = state.currentLang || 'en';
  const t = i18n[lang] || i18n.en;
  const total = state.rfqItems.reduce((acc, curr) => acc + curr.qty, 0);

  if (countSpan) {
    const itemWord = lang === 'gu' ? 'આઇટમ' : (lang === 'hi' ? 'वस्तुएं' : 'items');
    countSpan.textContent = `(${total} ${itemWord})`;
  }

  if (state.rfqItems.length === 0) {
    container.innerHTML = `
      <div class="drawer-empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 1rem; color: var(--gold-400);">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <p style="font-weight: 700; color: var(--text-white);">${t.drawerEmptyTitle}</p>
        <p style="font-size: 0.85rem; margin-top: 0.35rem;">${t.drawerEmptyDesc}</p>
      </div>
    `;
    return;
  }

  const qtyWord = lang === 'gu' ? 'જથ્થો:' : (lang === 'hi' ? 'मात्रा:' : 'Quantity:');

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
        <span style="font-size: 0.82rem; color: var(--text-secondary);">${qtyWord}</span>
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
    const emptyAlert = state.currentLang === 'gu' ? 'કૃપા કરીને તમારા ક્વોટ લિસ્ટમાં ઓછામાં ઓછી એક પ્રોડક્ટ ઉમેરો.' : (state.currentLang === 'hi' ? 'कृपया अपनी कोटेशन सूची में कम से कम एक उत्पाद जोड़ें।' : 'Please add at least one product to your quote list.');
    alert(emptyAlert);
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

// Comprehensive Multilingual Language Switcher
function switchLanguage(lang) {
  if (!lang || !i18n[lang]) lang = 'en';
  state.currentLang = lang;

  try {
    localStorage.setItem('ankit_language', lang);
  } catch (e) {}

  // 1. Update button active states in both desktop top bar and mobile drawer
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // 2. Set document HTML language attribute and body typography classes
  document.documentElement.lang = lang;
  document.body.classList.toggle('lang-gu', lang === 'gu');
  document.body.classList.toggle('lang-hi', lang === 'hi');

  const t = i18n[lang] || i18n.en;

  // 3. Update all static elements with [data-i18n]
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });

  // 4. Update all static elements with [data-i18n-html]
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  // 5. Update all input/textarea placeholders with [data-i18n-placeholder]
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) {
      el.placeholder = t[key];
    }
  });

  // 6. Update all titles with [data-i18n-title]
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (t[key] !== undefined) {
      el.title = t[key];
    }
  });

  // 7. Re-render dynamic sections in chosen language
  renderCategories();
  renderProducts();
  const activeCalcTab = document.querySelector('.calc-tab.active')?.getAttribute('data-calc') || 'concrete';
  calculateCurrentTab(activeCalcTab);
  renderDrawerItems();
}

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

  // Language Buttons (both top bar and mobile drawer)
  document.addEventListener('click', (e) => {
    const langBtn = e.target.closest('.lang-btn');
    if (langBtn) {
      const lang = langBtn.getAttribute('data-lang');
      if (lang) switchLanguage(lang);
    }
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

// Clean Route-Free Navigation & Smooth Scrolling
function setupCleanNavigation() {
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"], [data-scroll]');
    if (!link) return;

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
      closeMobileMenu?.();
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

  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
}

// Mobile Drawer Navigation
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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer?.classList.contains('open')) {
      closeMobileMenu();
    }
  });
}

// Scroll Tracking for Active Nav and Header Scrolled State
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

// 3-State Theme Slider (Light, System, Dark)
function initTheme() {
  const savedMode = localStorage.getItem('ankit-theme-mode') || 'dark';
  applyThemeMode(savedMode, false);

  const themeButtons = document.querySelectorAll('.theme-toggle-btn');
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-theme-val') || 'dark';
      applyThemeMode(mode, true);
    });
  });

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', () => {
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

  let effectiveTheme = mode;
  if (mode === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    effectiveTheme = prefersDark ? 'dark' : 'light';
  }

  document.documentElement.setAttribute('data-theme', effectiveTheme);

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

// Smooth Scroll Reveal Animations
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
  observeAnimatedElements(observer);

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
