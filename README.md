# Loving Lanka Tours website

Updated 6 October 2026 using the supplied Word documents for Home, About Us, Contact Us, Gallery, Testimonials and all seven tour packages.

## Preview

From this folder, run:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173/index.html.

## Content added

- Four homepage hero slides with automatic 8-second crossfades, gentle image zoom, progress indicator and manual navigation.
- Company introduction, founder Nadeeka’s story, vision, mission and five reasons to choose the company.
- Seven dedicated tour pages: 10, 12 and 14-day Highlights, 21-day Grand Tour, 4-day Cultural Triangle from Kandy, 10-day East Coast and 7-day Honeymoon.
- All 78 day-by-day plans, route overviews, overnight stops, highlights, inclusions, exclusions and supplied optional add-ons.
- Homepage and package listing links open detailed itineraries. Quote links preselect the package and its duration.
- Four testimonials supplied in the documents.
- Twelve destination descriptions, gallery category filters, matching existing photographs and additional guest photographs.
- Required full name, email and adult count; optional phone, arrival date, children, duration, accommodation tier, interests and special requirements.
- Direct contact details from the original site, plus Instagram and TikTok handles from the uploaded copy.
- Page-specific titles, descriptions and Open Graph metadata. Main content is saved in the HTML so it remains readable before JavaScript loads.

## Content and images

`content.js` contains the supplied marketing copy as structured data. `tour-content.js` contains the seven detailed tour itineraries. `app.js` renders the layouts and handles interactions. `motion.js` handles automatic slider playback, crossfades and one-time scroll reveals. `styles.css` contains the responsive visual design.

The uploaded documents contain no image files. Matching existing photographs illustrate Sigiriya, Nine Arch Bridge, elephants and hill-country waterfalls. The other eight destination captions appear as text cards rather than unrelated photos. These cards can accept matching image assets in `content.js` later.

Supplied copy, service claims and testimonials have been incorporated as provided; they were not independently verified in this content update. Exact GetYourGuide and Google Business profile URLs, official registration details, award details, tourism-board compliance assets and payment badges were not included in the upload, so no account links, registration numbers or badges were invented.

Most photographs are reused from the original Loving Lanka Tours gallery. The Sigiriya photograph is by Yasintha Perera / Unsplash: https://unsplash.com/photos/oMgtkpr3Cpg. DM Sans and Playfair Display are loaded from Google Fonts with system fallbacks.

The tour documents contain a domain email explicitly labeled as a fictional placeholder in the 10-day file, and repeated contact/profile placeholders. The site retains the previously supplied `nadikags@gmail.com`, phone numbers and actual profile URLs. Layout directions and imagined photo galleries were treated as content planning, not as instructions or real image assets. The 12-day overview route includes its Negombo / Colombo arrival stop, consistent with day one.

## Inquiry handling

The quote form validates the details and prepares an inquiry locally. The visitor reviews it and chooses WhatsApp or an email draft, then sends the message in that service. No inquiry is sent or saved by this static website. This behavior is explained beside the form and on the Privacy page.

## Deployment

Upload this folder’s contents to a static web host. No build command or npm installation is needed. This update has not replaced the public lovinglankatours.com website.

## Verification

Updated pages checked in the browser at 1280px, 390px and 320px widths. No horizontal overflow or broken loaded images after the narrow-screen social-card fix. Hero and testimonial controls, gallery filters and photo viewer, package selection, required full name/email/adult validation, and the generated WhatsApp inquiry were verified. No inquiry was sent. JavaScript syntax and local links/assets were checked.

Tour update checks: all seven itineraries expanded at 320px without horizontal overflow; 78 day counts checked against the documents. Expand/collapse controls and package/duration quote selection verified. Local links, static content, JavaScript syntax and image assets checked.

## Animation update

The hero rotates every 8 seconds; testimonial carousels on Home and About rotate every 10 seconds. Each has its own pause/play button and progress indicator. Rotation pauses while hovered, while keyboard focus is inside, when outside the viewport, and when the browser tab is hidden. Manual slide changes restart the waiting interval. Reduced-motion preferences disable autoplay, scroll reveals, image zoom and decorative transitions while preserving manual controls. Scroll reveals, card/image hover effects, dialog entrances and day-plan expansion use subtle motion. No animation framework or build step is required.

Animation verification: observed automatic hero and testimonial advancement, tested pause persistence past the slide interval, manual navigation and resume, checked Home at 320px and About on desktop, and verified gallery filtering after scripts loaded. No console errors in the checked pages. Testimonial track height is reserved for the longest quote to prevent layout shifts.

## GitHub Pages image paths

Keep the `assets/` folder beside `index.html`. Image and favicon references use `assets/filename`, including the hero slides, tour cards and gallery viewer. Upload the folder with its contents intact; placing the photos directly beside `index.html` causes 404 image requests.
