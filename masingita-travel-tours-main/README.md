# Masingitas Travel and Tours Website

## Project description

This is my academic website for **Masingitas Travel and Tours**, a South African travel agency founded in 2008 by Khanyisa Masingita Ngobeni. The site promotes holiday packages, safaris, accommodation, flights, car rentals, shuttles, group tours and corporate travel. Visitors can also send a travel enquiry from it.

- Part 1: I built the HTML5 structure.
- Part 2: I designed the CSS styling and responsive layout.
- Part 3 (this update): I applied the *Student SEO and Publishing Guide* to my own site. The guide's example is a bakery, so I adapted every step to a travel agency. I also fixed problems I found along the way and added JavaScript features.

- **Repository URL:** `https://github.com/YOUR-GITHUB-USERNAME/masingita-travel-tours` *(to be added after I push)*
- **Live URL:** `https://YOUR-GITHUB-USERNAME.github.io/masingita-travel-tours/` *(to be added after I publish with GitHub Pages)*

---

## Pages

| Page | File | Main search phrase I targeted |
|---|---|---|
| Home | `index.html` | travel agency in South Africa |
| About Us | `pages/aboutus.html` | accredited South African travel agency |
| Services | `pages/service.html` | flights, accommodation and car hire |
| Packages | `pages/menu.html` | South Africa holiday packages and prices |
| Group Tours | `pages/events.html` | group tours in South Africa |
| Enquiry | `pages/enquiry.html` | request a travel quote |
| Contact | `pages/contact.html` | Masingitas Travel and Tours contact details |

## Project structure

```
masingita-travel-tours-main/
├── index.html
├── robots.txt
├── sitemap.xml
├── README.md
├── changelog
├── css/style.css
├── js/script.js
├── images/            (descriptively named, compressed AVIF/WebP photos + favicon.svg)
└── pages/
    ├── aboutus.html   service.html   menu.html
    └── events.html    enquiry.html   contact.html
```

---

## What I did in Part 3

### 1. Problems I found and fixed first

When I went through the site page by page, I found these problems:

- **The stylesheet was never linked.** My Part 2 CSS was saved as a file called `css` inside the `part 2 inplementation` folder. None of the pages actually loaded it, so the site was showing as plain unstyled HTML. I moved it to `css/style.css`, improved it, and linked it on every page.
- **The Events page belonged to a different website.** It still had template content from a restaurant called "Divine Dining" (Mother's Day brunch, wine nights, © 2023). I rewrote it as a **Group Tours** page with real travel departures.
- **Broken links.** The footers on the Contact and Enquiry pages linked to `index.html` instead of `../index.html`, and the Services page linked to `style.css` in the wrong folder. The Services page also wasn't in the navigation at all, so visitors couldn't find it.
- **A wrong image.** The "Cape Town" package was showing a photo of a hairdresser. I replaced it with an aerial photo of Cape Town and Table Mountain.
- **Some pages had no `<h1>`** and others started at `<h2>`. A few pages had two `<header>` elements.

### 2. On-page SEO (guide section 1)

- **A unique title and meta description on every page.** Each title says what the page is about, followed by the business name (for example `South Africa Holiday Packages & Prices | Masingitas Travel and Tours`). Each description is a different, accurate summary. I checked with a script that all 7 titles and all 7 descriptions are unique.
- **Heading structure.** Every page now has exactly one meaningful `<h1>`, with `<h2>` for major sections and `<h3>` for cards and subsections.
- **Descriptive image filenames.** I renamed the photos from codes like `photo-1516426122078-c23e76319801.avif` to names like `safari-game-drive-vehicle.avif` and `cape-town-table-mountain-aerial.webp`, and moved them into an `images/` folder.
- **Better alt text.** I rewrote the alt text so it describes what is actually in each photo. For example, *"Open safari vehicle driving through tall grass at sunset"* instead of *"Safari animals and African landscape"*. That old alt text didn't match the image, because there are no animals in it.
- **Descriptive link text.** I replaced vague links like "Book Package →" and "Customer Support" with links that say where they go, such as "Enquire about the Kruger safari" and "See our scheduled group tours". Related pages now link to each other: every package and service links to the enquiry form, and the footer links to the main planning pages.
- **Mobile layout.** I kept the viewport tag, added a collapsing mobile menu, and made the grids, forms and images fit narrow screens without sideways scrolling.
- **Extra things I added:** `lang="en-ZA"`, Open Graph tags so links look good when shared on social media, a favicon, and **structured data (JSON-LD)** on the Home and Contact pages. The structured data describes the business as a `TravelAgency` with its phone, email and opening hours.

### 3. Off-page SEO (guide section 2)

Off-page SEO happens outside the website, so I can't do it in code. To prepare for it, I made sure the business name, phone number, email and opening hours are **identical in the footer of every page** and on the Contact page, so the details stay consistent wherever the business is listed. I did not add fake reviews or ratings. This is a classroom project, so I did not create a Google Business Profile for it.

My off-page SEO plan (the student activity):

1. **Organisations that might link to the site:** a local school or school governing body (for the school excursion and Heritage Day tours), a provincial tourism association or community tourism page, and a church or community group that organises group outings.
2. **Polite outreach message:**
   > Good day. My name is [name] from Masingitas Travel and Tours. We have published a page listing our upcoming group tours for 2026–2027, including a Heritage Day cultural tour that is suitable for school groups. If you think it would be useful to your members, you are welcome to share the link: [live URL]/pages/events.html. Thank you for your time.
3. **Social post that helps customers find a page:** *"Festive season seats are filling up! Our Durban beach getaway departs 12 December. See all group tour dates here: [live URL]/pages/events.html"*

None of this guarantees backlinks or a search ranking. The goal is just to help real people find useful pages.

### 4. robots.txt, sitemap, speed and security (guide section 3)

- **`robots.txt`**: created beside `index.html`. It allows all crawlers and points to the sitemap.
- **`sitemap.xml`**: lists all 7 public pages.
  > ⚠️ Both files use the placeholder address `YOUR-GITHUB-USERNAME.github.io/masingita-travel-tours`. I need to replace it with my real GitHub Pages URL after publishing.
- **Speed:**
  - Every image now loads from the project instead of from Unsplash's servers.
  - Images are in modern compressed formats (AVIF/WebP), and I re-compressed the largest ones. The whole `images/` folder is about 1.8 MB for 20 images.
  - Images below the top of the page use `loading="lazy"`. The main hero image does **not** (as the guide recommends) and uses `fetchpriority="high"` instead.
  - Every image has `width` and `height` so the page doesn't jump while loading.
  - I removed the unused web-font references and use fast system fonts instead.
  - The script loads with `defer` so it never blocks the page from showing.
- **Security and privacy:**
  - The site contains no passwords, keys or customer data.
  - External links that open in a new tab (WhatsApp) use `rel="noopener noreferrer"`.
  - The enquiry form says clearly that it is a demo. It does not send or store anything, and it asks people not to type ID, passport or card numbers.
  - When I publish, I will turn on GitHub Pages' **Enforce HTTPS** option.

### 5. Other improvements to the site

- A consistent header on every page, with the brand name and the current page highlighted in the menu (`aria-current="page"`).
- A shared three-column footer with contact details and quick links.
- Accessibility: a "Skip to main content" link, visible keyboard focus outlines, form error messages that screen readers announce, and support for "reduced motion" settings.
- I cleaned up the Part 2 CSS. One rule turned whole sections into grids, which broke the headings, and another made the first item of *every* list bold. I removed both and replaced them with proper card and grid classes.
- I adjusted the teal and button colours so text has enough contrast to read easily.

---

## JavaScript features (`js/script.js`)

I put everything in one script file that is loaded on every page. Each feature first checks that its elements exist, so the same file works safely on every page.

| Feature | Where | What it does |
|---|---|---|
| **Mobile menu toggle** | All pages | On small screens the navigation collapses behind a "Menu" button. The button updates `aria-expanded` for screen readers, and pressing Escape closes the menu. Without JavaScript, the menu simply stays open. |
| **Back-to-top button** | All pages | Appears after you scroll down, and takes you back to the top when clicked. |
| **Automatic footer year** | All pages | Keeps the © year up to date. |
| **Package filter and search** | Packages | Filter buttons (Beach & City, Safari & Adventure, Corporate & Groups, Transport) plus a live search box. It shows "Showing 3 of 7 packages", or a helpful message when nothing matches. |
| **Smart enquiry form** | Enquiry | (1) Pre-selects the service, and fills in the package name, when you arrive from a package link (for example `enquiry.html?service=safari&package=...`). (2) Blocks past dates and makes sure the return date comes after the departure date. (3) Shows a live trip summary (travellers, service, number of nights) and warns when a trip is less than six weeks away. (4) Shows friendly error messages for name, email, phone and other fields. (5) Shows a thank-you message on submit, making clear that nothing was actually sent. |
| **Tour countdowns** | Group Tours | Shows "Departs in X days" on each tour and greys out tours that have already left. The tour details are written in the HTML, so search engines can still read them. JavaScript only adds the countdown. |
| **"Open now" status** | Contact | Uses South African time (SAST) to show whether the office is open right now, and highlights today's row in the opening-hours table. |

---

## Publishing (guide section 4): my remaining steps

I'm doing the GitHub part myself. My checklist:

1. Push all files to GitHub. `index.html` must be at the top level.
2. Go to **Settings → Pages → Deploy from a branch → `main` / `(root)`** → Save.
3. Replace `YOUR-GITHUB-USERNAME` in `robots.txt`, `sitemap.xml` and this README with my real address.
4. Turn on **Enforce HTTPS**.
5. Test every page, link, image and JavaScript feature on the live site, at desktop and phone widths.
6. *(Optional)* Delete the old `assets/` folder. Every image the site uses is now in `images/`, so nothing links to `assets/` any more.

## Submission checklist

- [x] Every page has a unique, accurate title and description
- [x] Pages have one clear `<h1>` and organised section headings
- [x] Images have useful alt text, descriptive filenames and sensible file sizes
- [x] Links explain where they go, and related pages link to one another
- [x] The mobile layout fits without sideways scrolling
- [x] `robots.txt` sits beside `index.html` *(real sitemap address still to be added after publishing)*
- [x] `sitemap.xml` lists all public pages *(real domain still to be added after publishing)*
- [x] No passwords, keys, private information or customer data are published
- [ ] Live site checked after publishing
- [ ] Repository URL and live URL added to this README

---

## Changelog

See the `changelog` file for full details.

- **3.0.0 (2026-10-31):** SEO and publishing preparation, JavaScript features, images, bug fixes
- **2.0.0 (2026-09-18):** CSS styling and responsive design
- **1.0.0 (2026-08-11):** HTML5 structure and content

## References

1. Google Search Central (2026) *SEO Starter Guide*. Available at: https://developers.google.com/search/docs/fundamentals/seo-starter-guide [Accessed 31 Oct. 2026].
2. Google Search Central (2026) *Introduction to robots.txt*. Available at: https://developers.google.com/search/docs/crawling-indexing/robots/intro [Accessed 31 Oct. 2026].
3. Google Search Central (2026) *Google Search Essentials* and *Spam policies*. Available at: https://developers.google.com/search/docs/essentials [Accessed 31 Oct. 2026].
4. Sitemaps.org (2026) *Sitemaps XML format*. Available at: https://www.sitemaps.org/protocol.html [Accessed 31 Oct. 2026].
5. GitHub Docs (2026) *Creating a GitHub Pages site*. Available at: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site [Accessed 31 Oct. 2026].
6. Schema.org (2026) *TravelAgency*. Available at: https://schema.org/TravelAgency [Accessed 31 Oct. 2026].
7. MDN Web Docs (2026) *Lazy loading* and *URLSearchParams*. Available at: https://developer.mozilla.org [Accessed 31 Oct. 2026].
8. W3C (2023) *Web Content Accessibility Guidelines (WCAG) 2.1*. Available at: https://www.w3.org/TR/WCAG21/ [Accessed 31 Oct. 2026].
9. ASATA (2026) *Association of South African Travel Agents*. Available at: https://www.asata.co.za [Accessed 18 Sep. 2026].
10. Unsplash (2026) Photographs used under the Unsplash License. Available at: https://unsplash.com/license [Accessed 31 Oct. 2026].
11. *Student SEO and Publishing Guide* (bakery website practice), course material supplied for this assignment.
