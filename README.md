# Ankit Building Materials — Website Documentation

> A responsive, single-page business website for **Ankit Building Materials**, a building-materials and hardware supplier in Santalpur, Patan, Gujarat, India.

The website presents product categories, lets visitors search and filter a sample product catalogue, estimates construction-material quantities, and helps customers contact the business or send a quotation request through WhatsApp.

---

## Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Business Information](#business-information)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How the Website Works](#how-the-website-works)
- [Product Categories](#product-categories)
- [Material Estimator](#material-estimator)
- [Quotation Request Workflow](#quotation-request-workflow)
- [Languages and Themes](#languages-and-themes)
- [Responsive Design and Accessibility](#responsive-design-and-accessibility)
- [SEO and Social Sharing](#seo-and-social-sharing)
- [Customisation Guide](#customisation-guide)
- [Deployment](#deployment)
- [Testing Checklist](#testing-checklist)
- [Limitations and Production Notes](#limitations-and-production-notes)
- [Maintenance](#maintenance)
- [License](#license)

---

## Project Overview

**Ankit Building Materials** is a front-end website intended to give a local building-materials and hardware business a clear online presence. It is designed for homeowners, contractors, builders, tradespeople, and business customers who want to explore available material types, estimate quantities, and request prices.

The implementation uses standard HTML, CSS, and vanilla JavaScript. It does not require a package manager, build process, JavaScript framework, or server-side application to run in its current form.

### Project goals

- Present the business and its location clearly.
- Organise products into easy-to-browse categories.
- Make it simple to find catalogue items.
- Provide rough quantity estimates for selected construction tasks.
- Offer direct phone, map, and WhatsApp contact paths.
- Support English, Gujarati, and Hindi interface text for selected sections.
- Provide light, system, and dark appearance modes.
- Work across desktop, tablet, and mobile screen sizes.

## Key Features

### Business landing page

- Hero section introducing the business and its services.
- Brand identity using the supplied SVG logo.
- Primary actions to explore products, use the calculator, call, or open WhatsApp.
- Business location and operating-hours information.

### Product categories

The page renders category cards from JavaScript data. Each card includes a category name, image, description, product tags, brand examples, and a link to browse matching products.

### Product catalogue

- Product cards are generated dynamically from the catalogue data.
- Search checks product titles, specifications, and brand names.
- Category filters narrow the displayed products.
- Each product includes a **Add to Quote** action.
- A helpful empty state appears when no products match the search or filter.

### Construction material estimator

The calculator includes four task types:

1. Concrete and slab materials
2. Brickwork and masonry
3. Waterproofing
4. Site safety equipment

Inputs recalculate the displayed estimates as they change. Results can be prepared for WhatsApp and the page includes a print action.

### Request for quotation (RFQ)

- Add catalogue products to a quote cart.
- View the selected items in a slide-out drawer.
- Review the selected item count.
- Enter contractor/customer and delivery-location information where provided.
- Send the request details through WhatsApp.

The catalogue is a request-for-quote interface rather than a conventional online checkout.

### Contact and navigation

- Click-to-call phone links.
- WhatsApp contact links with a prefilled message.
- Google Maps directions/location links.
- Contact inquiry form.
- Mobile navigation drawer.
- Section-aware navigation highlighting and smooth scrolling.
- Back-to-top control.
- Toast-style feedback messages.
- FAQ interactions and scroll-reveal animations.
- Banner/lightbox interaction.

### Appearance and localisation

- Light, system, and dark theme options.
- English, Gujarati, and Hindi language controls.
- Responsive navigation and layout.

> **Note:** Language switching is implemented for selected interface copy. It should not be assumed that every catalogue item, form label, FAQ, or section is fully translated.

---

## Business Information

The website currently contains the following business details. Confirm these with the business owner before publishing or changing them.

| Field | Website value |
|---|---|
| Business name | Ankit Building Materials |
| Business type | Building materials and hardware trading |
| Location | Radhanpur–Kandla Highway, near the overbridge, Santalpur, Patan, Gujarat, India |
| PIN code | 385350 |
| Phone | +91 97148 58660 |
| Displayed hours | 7:00 AM–9:00 PM |
| Primary contact methods | Phone, WhatsApp, Google Maps |
| Languages offered in the interface | English, Gujarati, Hindi |

The phone number, location, map destination, operating hours, product claims, and business descriptions are embedded in the source. Update every relevant occurrence if the business details change.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure, content, semantic sections, forms, and navigation |
| CSS3 | Layout, responsive behaviour, visual design, themes, transitions, and animations |
| Vanilla JavaScript | Dynamic rendering, filtering, calculator logic, quote cart, navigation, language switching, and interactions |
| SVG | Brand logo and inline interface icons |
| Local image assets | Hero, category, banner, and product-related imagery |
| Google Maps | External business-location and directions links |
| WhatsApp Click to Chat | External channel for quote and inquiry messages |
| `localStorage` (where used by the theme logic) | Persisting the selected appearance mode in the browser |

There is no framework-specific compilation step in the provided project. External Google Maps and WhatsApp links require an internet connection to open their respective services.

---

## Project Structure

```text
Ankit Building Materials/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── assets/
    ├── banner.png
    ├── hero_warehouse.jpg
    ├── cement_construction.jpg
    ├── pipes_plumbing.jpg
    ├── safety_ppe.jpg
    ├── tools_hardware.jpg
    ├── waterproofing_tarps.jpg
    └── logo/
        ├── logo.ico
        └── logo.svg
```

### File responsibilities

#### `index.html`

Contains the page markup, metadata, navigation, major page sections, calculator forms, product and category containers, contact form, quote drawer, modal elements, and external contact links.

The main page sections are:

- `#hero`
- `#categories`
- `#estimator`
- `#catalog`
- `#logistics`
- `#about`
- `#testimonials`
- `#faq`
- `#contact`

#### `css/style.css`

Contains the visual system and page styling, including:

- Layout containers and grids
- Header, navigation, and mobile menu
- Hero and category/product cards
- Calculator and result display
- Quote drawer and overlays
- Contact and FAQ sections
- Theme variables and theme-specific styling
- Responsive breakpoints
- Hover, transition, and scroll-reveal effects

#### `js/app.js`

Contains the client-side application logic, including:

- Category and product data
- Translation strings
- Dynamic category and product rendering
- Catalogue search and category filtering
- Material estimator calculations
- RFQ cart and quote drawer
- WhatsApp message generation
- Inquiry form behaviour
- Theme selection
- Mobile navigation
- Scroll tracking and animation observers
- Toast notifications

#### `assets/`

Contains the images and branding used by the website. Keep the directory structure and filenames intact unless the corresponding references in HTML or JavaScript are also updated.

---

## Getting Started

### Requirements

- A modern browser such as Chrome, Edge, Firefox, or Safari.
- The extracted project directory with all asset files included.
- No Node.js installation or package installation is required for the current static implementation.

### Option 1: Open the HTML file

1. Extract `Ankit Building Materials.zip`.
2. Open the extracted `Ankit Building Materials` folder.
3. Double-click `index.html`.
4. Explore the page in your browser.

Most local interactions should work when opened this way. Some browser features or future integrations may behave differently when served from a local `file://` URL.

### Option 2: Run a local development server

A local server is recommended for testing relative asset paths and browser behaviour.

If Python is installed, open a terminal in the project directory and run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

If the command is not recognised, try `python3 -m http.server 8000` on systems where Python is installed under that command.

Stop the server with `Ctrl+C`.

### No build command

The current project does not include a `package.json` or build configuration. Do not run `npm install` unless a package-based toolchain is added later.

---

## How the Website Works

When the HTML document finishes loading, the JavaScript initialises the main website features. The initialisation includes navigation setup, theme setup, category rendering, product rendering, calculator setup, event listeners, mobile navigation, scroll tracking, scroll animations, and quote-cart count updates.

### Dynamic category rendering

Category information is stored in a JavaScript data array. The rendering function creates category cards from that data and places them in the category grid.

To add or change a category, update the category data in `js/app.js` and ensure that its image path and category identifier are valid.

### Dynamic product rendering

The catalogue is also data-driven. The rendering function checks the active category and current search query, filters the product list, and creates product cards for the matching entries.

Product records use fields such as:

- `id` — unique product identifier
- `cat` — category identifier
- `title` — displayed product name
- `brand` — brand or manufacturer text
- `specs` — short product description/specifications
- `unit` — quotation unit
- `min` — displayed minimum order quantity

Keep IDs unique and make sure each `cat` value matches a category ID.

### Navigation and page interactions

Navigation links point to section anchors. JavaScript improves the behaviour with custom scrolling, active-section tracking, mobile navigation, and other interaction handlers.

---

## Product Categories

The current category data covers nine major product groups:

| Category ID | Category | Examples |
|---|---|---|
| `cement` | Cement & Building Materials | Cement bags, AAC blocks, TMT rebar, aggregates |
| `pvc` | PVC Pipes & Fittings | CPVC/UPVC pipes, borewell pipes, valves, fittings |
| `hardware` | Hardware Items | Binding wire, barbed wire, hinges, locks |
| `tools` | Hand & Power Tools | Hammers, pipe wrenches, spirit levels, measuring tapes |
| `safety` | Safety Products (Industrial & PPE) | Helmets, reflective vests, safety boots, gloves |
| `tarpaulin` | Tarpaulin & HDPE Sheets | Tarpaulins, cargo covers, pond-lining and curing sheets |
| `waterproofing` | Waterproofing Materials | Waterproofing compounds, coatings, bonding agents |
| `abrasives` | Abrasive Items | Cutting wheels, grinding discs, diamond blades |
| `fasteners` | Fasteners (Screws & Nails) | Bolts, roofing screws, drywall screws, anchors, nails |

The product catalogue contains illustrative product records grouped under these category identifiers. Descriptions, brands, specifications, minimum quantities, and availability should be verified with the supplier before being treated as an official inventory or commercial commitment.

### Adding a product

1. Open `js/app.js`.
2. Find the product data array.
3. Add a new record using the same field names.
4. Use a unique `id`.
5. Set `cat` to an existing category ID.
6. Confirm that the search, category filter, and quote-cart actions work for the new item.

Example structure:

```javascript
{
  id: 'p-example',
  cat: 'hardware',
  title: 'Example Hardware Product',
  brand: 'Example Brand',
  specs: 'Add verified product specifications here.',
  unit: 'Per Piece',
  min: '10 Pieces'
}
```

This is a template only; replace the example details with verified business information.

---

## Material Estimator

The estimator is designed to give users an initial planning estimate. It is not a substitute for a quantity surveyor, structural engineer, construction professional, or supplier quotation.

### 1. Concrete and slab materials

Inputs include:

- Slab area in square feet
- Slab thickness in inches
- Concrete mix selection

The code converts the estimated wet volume into cubic metres, applies a dry-volume factor, and estimates cement bags, sand, aggregates, and steel using the assumptions encoded in the JavaScript.

The current implementation uses simplified material ratios and steel-per-area factors. These are rough assumptions, not a project-specific structural design.

### 2. Brickwork and masonry

Inputs include wall length, wall height, and wall thickness selection. The calculator estimates wall area and derives approximate brick/block quantities, mortar cement, and sand from hard-coded rates.

Actual requirements vary with brick/block dimensions, joint thickness, mortar mix, openings, breakage, and workmanship.

### 3. Waterproofing

The waterproofing form accepts area and a selected waterproofing type, then produces a material estimate using the current JavaScript assumptions.

Actual coverage depends on the chosen product, surface condition, number of coats, application method, and the manufacturer's data sheet.

### 4. Site safety equipment

The safety form accepts the worker count and site-storage/area information provided by the interface. The calculation is intended as a planning aid for PPE quantities.

PPE requirements must be based on the actual work, site risk assessment, applicable standards, and replacement needs.

### Estimator actions

The interface provides a WhatsApp action for sharing the current estimate and a print action for producing a printable result.

### Important calculation disclaimer

**Always verify quantities before purchasing or constructing.** The estimator uses simplified formulas and default assumptions. It does not account for every site condition, wastage factor, local construction practice, design requirement, or manufacturer instruction. Structural steel and concrete specifications must be determined by a qualified professional.

---

## Quotation Request Workflow

The quote cart is a front-end tool for preparing a list of products to discuss with the supplier.

1. Browse the product catalogue.
2. Select **Add to Quote** on relevant product cards.
3. Open **Quote Cart** in the header.
4. Review the selected items in the drawer.
5. Enter the requested customer/contractor and delivery details if required.
6. Use the WhatsApp submission action to open a prepared message.
7. Review and send the message in WhatsApp.

### How it is implemented

The quote-cart state and rendering are handled in `js/app.js`. The drawer is part of the HTML and is shown or hidden by JavaScript. The submission action builds a WhatsApp Click to Chat URL.

### Important distinction

The current website does **not** provide a server-backed order-management system. A quote request is not automatically recorded in a business database, and sending a WhatsApp message depends on the visitor completing the action in WhatsApp. The website does not confirm stock, reserve goods, process payment, or create an invoice.

---

## Languages and Themes

### Language controls

The interface provides buttons for:

- **English** (`en`)
- **Gujarati** (`gu`)
- **Hindi** (`hi`)

Translation strings are defined in the JavaScript language data. The language-switching function updates selected text elements. When adding new translatable elements, update the language data and the switching logic so that the new content is handled consistently.

### Appearance modes

The theme control supports:

- Light mode
- System preference
- Dark mode

The theme initialisation logic applies the selected mode and may retain the selection in browser storage. Test theme behaviour in a fresh browser profile and after reloading the page.

---

## Responsive Design and Accessibility

The CSS includes responsive layouts intended for desktop, tablet, and mobile devices. The page uses semantic sections and labels, descriptive image alt text, accessible names for several icon buttons, and external links configured to open safely in a new tab.

When modifying the interface, preserve or improve the following:

- Keyboard access to navigation, buttons, dialogs, and forms.
- Visible focus indicators.
- Sufficient text/background contrast in all themes.
- Correct labels and accessible names for controls.
- Meaningful alternative text for informative images.
- Reduced-motion support for users who prefer less animation.
- Clear error and success feedback.
- Usable layouts at narrow viewport widths.

Accessibility should be re-tested after significant CSS or JavaScript changes; the presence of accessibility attributes alone does not guarantee full conformance.

---

## SEO and Social Sharing

The HTML head includes:

- A descriptive page title
- Meta description
- Meta keywords
- Open Graph title and description
- Open Graph image
- Website type metadata
- Favicon and SVG logo references
- Viewport metadata

Before deployment, check that the title, description, social preview image, and business details are accurate. Social preview images should use a publicly accessible absolute URL once the website is hosted. Consider adding a canonical URL, a full set of Open Graph URL/image metadata, and structured `LocalBusiness` data after the final domain and verified business information are known.

Search engines may choose their own snippets and do not guarantee that every supplied metadata field will be displayed.

---

## Customisation Guide

### Change the business phone number

Search the project files for the existing phone number and update all relevant locations, including:

- `tel:` links
- Visible phone text
- WhatsApp destination number
- Prefilled WhatsApp message content, if needed
- SEO description and contact content

For WhatsApp Click to Chat, use the international phone number format without spaces or punctuation in the URL path. Verify the number is registered with WhatsApp.

### Change the business address or map location

Update the visible address and the Google Maps destination link in `index.html`. Verify that the map points to the correct business listing before publishing.

### Change operating hours

Update the visible hours in the HTML and any other copies in the website. Confirm the hours with the business owner.

### Replace the logo

Replace `assets/logo/logo.svg` and, if necessary, `assets/logo/logo.ico`. Keep the filenames the same to avoid changing the existing references, or update every reference if you use different names.

### Replace images

Keep replacement images in `assets/` and update the corresponding paths in the HTML or category data. Use appropriately sized, compressed images to maintain page performance. Ensure image usage rights are cleared.

### Change visual styling

Edit `css/style.css`. Prefer updating existing CSS variables and shared component rules instead of adding conflicting overrides throughout the file. Test the light and dark themes and all supported viewport widths after changes.

### Change catalogue content

Edit the category and product data in `js/app.js`. Ensure all category IDs, product IDs, asset paths, displayed units, minimum quantities, and product claims are accurate.

### Change estimator assumptions

Find `setupCalculator()` and `calculateCurrentTab()` in `js/app.js`. Review each formula and its units before changing any values. Add clear descriptions of assumptions and have domain professionals verify formulas before presenting them as dependable construction calculations.

### Change WhatsApp message formatting

Find the functions that create the RFQ or calculator message and encode the message before placing it in a WhatsApp URL. Test with Unicode text, line breaks, multiple products, and long requests.

---

## Deployment

This is a static website and can be deployed to a static web host.

### General deployment steps

1. Extract the project archive.
2. Confirm that `index.html`, `css/`, `js/`, and `assets/` are in the same project root.
3. Test the site locally using a browser or local development server.
4. Upload the contents of the project directory to the host's public web root.
5. Open the deployed URL and test all links and interactive features.
6. Configure HTTPS and a custom domain if required.
7. Verify that images, SVGs, favicon files, and CSS/JavaScript load without errors.

Possible static hosting options include GitHub Pages, Netlify, Cloudflare Pages, or any conventional web server that serves static files. Follow the chosen host's current instructions for publishing a static site.

### Deployment checks

- Ensure the deployed site preserves the `css/`, `js/`, and `assets/` relative paths.
- Confirm the Google Maps link opens the intended location.
- Confirm the phone and WhatsApp links use the correct number.
- Verify the site on an actual mobile device.
- Check browser developer tools for missing assets and JavaScript errors.
- Confirm the public metadata and social sharing image are correct.

---

## Testing Checklist

Use this list before publishing a change.

### Basic loading

- [ ] `index.html` opens without errors.
- [ ] Stylesheet and JavaScript files load.
- [ ] All images and logos display.
- [ ] No unexpected horizontal overflow on mobile.

### Navigation

- [ ] Every navigation link reaches the correct section.
- [ ] Mobile menu opens and closes.
- [ ] Menu backdrop and close control behave correctly.
- [ ] Active section highlighting updates while scrolling.
- [ ] Back-to-top control works.

### Catalogue

- [ ] All nine category cards render.
- [ ] Category filters show the expected products.
- [ ] Search matches product titles.
- [ ] Search matches brands and specifications.
- [ ] Empty search results show the helpful fallback.
- [ ] Adding a product updates the quote cart.

### Estimator

- [ ] Each calculator tab opens the correct form.
- [ ] Input changes update the result.
- [ ] Units and displayed values are understandable.
- [ ] WhatsApp summary contains the current result.
- [ ] Print action produces a readable output.
- [ ] Formula assumptions are verified by a qualified reviewer.

### Quote and contact

- [ ] Quote drawer opens and closes.
- [ ] Selected products are listed correctly.
- [ ] Item count is correct.
- [ ] WhatsApp submission creates a readable message.
- [ ] Phone links open the dialler on supported devices.
- [ ] Inquiry form validation and submission behaviour are clear.
- [ ] No form implies server-side delivery unless that integration exists.

### Themes, languages, and accessibility

- [ ] Light, system, and dark modes work.
- [ ] Theme choice behaves as expected after reload.
- [ ] English, Gujarati, and Hindi buttons update supported content.
- [ ] Keyboard navigation is usable.
- [ ] Focus states remain visible in both themes.
- [ ] Reduced-motion preferences are respected where applicable.

### Production readiness

- [ ] Business information and product claims are verified.
- [ ] External links are correct and secure.
- [ ] SEO metadata is updated for the final domain.
- [ ] Images are optimised and usage rights are confirmed.
- [ ] Browser console has no unhandled errors.
- [ ] HTTPS is enabled on the public site.

---

## Limitations and Production Notes

This repository is a static front-end implementation. The following points should be considered before using it as a full commercial platform:

1. **No backend:** there is no server API or database for products, customer enquiries, quote history, inventory, or orders.
2. **No online payment:** the website does not process payments or issue invoices.
3. **WhatsApp handoff:** WhatsApp messages require the visitor to open and send them; the website cannot guarantee delivery.
4. **Catalogue accuracy:** listed products and brand examples should be confirmed with the supplier. A product card does not prove current stock or official brand authorisation.
5. **Pricing:** the displayed catalogue is oriented around quote requests; do not assume that live prices are available.
6. **Estimator accuracy:** calculator outputs are approximate and must be checked against project requirements and professional guidance.
7. **Form handling:** verify how the inquiry form behaves in the current JavaScript before advertising it as a delivered email or stored enquiry. A front-end form alone does not send data to a business inbox.
8. **Privacy:** if customer details are collected or transmitted, publish an appropriate privacy notice and use a suitable, secure processing method.
9. **Security:** do not place API keys, passwords, private credentials, or other secrets in front-end JavaScript.
10. **Performance:** compress large images and test loading speed on mobile networks.
11. **Translations:** verify all translated text with a fluent Gujarati/Hindi reviewer.
12. **Accessibility:** conduct keyboard, screen-reader, contrast, and reduced-motion checks before claiming formal compliance.

### Suggested future enhancements

- Connect the enquiry form to a secure backend or trusted form service.
- Create an admin-managed catalogue and verified stock/pricing workflow.
- Add server-side validation and spam protection to enquiries.
- Add privacy and terms pages.
- Add structured business data and a sitemap after deployment.
- Add automated browser tests for key customer journeys.
- Track performance and accessibility with appropriate auditing tools.
- Add a clear disclaimer and versioned, professionally reviewed estimator assumptions.

---

## Maintenance

For routine maintenance:

1. Keep a backup of the working website before changing code.
2. Verify product details and business contact information with the owner.
3. Test the main user journeys after every release.
4. Check external links and WhatsApp behaviour periodically.
5. Review image sizes and page loading performance.
6. Keep the README in sync with any added sections, integrations, or dependencies.
7. Re-test estimator calculations whenever the formulas or units change.

---

## License

No explicit software or asset license is included in the supplied project files. Unless a separate license is provided by the owner, treat the website source, logo, and supplied images as **all rights reserved** and obtain permission before redistribution or reuse.

Third-party brand names and marks remain the property of their respective owners. Confirm licensing and usage rights for all photographs, logos, fonts, and other assets before commercial publication.

---

**Built for Ankit Building Materials**  
*Building materials, hardware, and construction supplies — Santalpur, Patan, Gujarat, India.*
