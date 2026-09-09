# GC Dental World — Homepage Visual Design System

> **Status:** CANONICAL — authoritative visual-design source of truth
> **Scope:** GC Dental World homepage (GC Dental World · Gachibowli / Khajaguda, Hyderabad, India)
> **Version:** 1.0
> **Applies to:** Implementation phase (post asset-organization)

---

## 1. Document Authority

This file is the **canonical visual-design specification** for the GC Dental
World homepage. Any future coding agent implementing the homepage **MUST read
this file first** and treat it as the source of truth for visual direction —
not as a suggestion.

This document overrides generic model defaults such as:

- default Tailwind card layouts
- generic blue medical templates
- automatic glassmorphism
- automatic bento grids
- automatic rounded cards
- excessive gradients
- excessive animation

If a future implementation decision conflicts with this document, the agent
must resolve the conflict **in favor of this design system**, unless the user
explicitly changes the system.

---

## 2. Purpose

The GC Dental World website is **intentionally NOT** designed as a generic
dental-clinic template. The visual system must combine:

- authentic GC Dental World branding
- premium editorial design
- modern healthcare UX
- patient-friendly visual communication
- useful dental education
- real patient storytelling
- clinical credibility
- sophisticated interaction
- restrained motion
- strong responsive behavior
- accessibility
- performance-conscious implementation

The result must feel like a **top-1% business website**, not simply a
top-1% dental template.

### 2.1 Quality Targets

The design targets approximately:

| Dimension | Target |
|---|---|
| Creativity | 9.8 / 10 |
| Content clarity | 9.8 / 10 |
| Visual design | 9.8 / 10 |
| Emotional impact | 9.7 / 10 |
| UI / UX | 9.8 / 10 |
| Brand reflection | 10 / 10 |
| Modern web trends | 9.7 / 10 |
| Motion | 9.5 / 10 |
| Performance | 9.5 / 10 |
| SEO foundation | 9.7 / 10 |
| Animation | 9.5 / 10 |

**The targets do NOT mean "add more animation."** They mean a stronger
visual hierarchy, better art direction, better composition, stronger brand
specificity, better typography, better storytelling, better interaction
design, better responsive behavior, better performance, better accessibility,
and less generic UI.

### 2.2 Source Context

The visual system is based on:

1. GC Dental World's existing brand identity / logo.
2. The supplied authentic clinic photography.
3. The supplied real team and doctor photography.
4. The supplied real patient photography.
5. The supplied treatment and before/after imagery.
6. The supplied elderly-patient smile case.
7. The supplied PV-Sindhu-associated clinic photograph.
8. The supplied Google reputation evidence — **4.8★ / 286 reviews**.
9. The supplied review corpus.
10. The 2026 premium dental / healthcare web-design research already present in the project.
11. The approved homepage content strategy.
12. The requirement that the result feel like a top-1% business website, not a top-1% dental template.

Do not replace this direction with an unrelated design philosophy.

---

## 3. Core Visual Concept

> ## CONTEMPORARY CLINICAL EDITORIAL
>
> ## PREMIUM HEALTHCARE + EDITORIAL STORYTELLING + HOSPITALITY UX

The visual experience combines:

- editorial sophistication
- clinical precision
- human warmth
- premium photography
- architectural composition
- restrained interaction
- useful information design

The visual experience must **NOT** resemble:

- a generic dental website
- a hospital website template
- a SaaS dashboard
- a wellness spa template
- a luxury fashion website
- a generic AI-generated landing page
- an over-decorated award-site experiment
- a template composed of repeated cards

---

## 4. Brand Principles

The GC Dental World identity must stay visible in the visual system. Do not
replace the brand with an unrelated luxury palette.

The existing GC Dental World logo contains a strong visual language of:

- **blue**
- **deep blue / navy**
- **white**
- **silver / gray**

The website should **evolve** this identity into a sophisticated modern
palette, not abandon it.

> **CANONICAL PRINCIPLE: GC BLUE IS THE BRAND ANCHOR.**
>
> Do **not** turn the website into a beige/forest-green website merely
> because that is currently fashionable in premium healthcare design. Warm
> neutrals may support the brand, but GC Blue must remain recognizable.

---

## 5. Color System

During implementation, colors should be exposed as **CSS variables / design
tokens** (Tailwind v4 `@theme` is the expected mechanism in this repo). The
canonical conceptual palette:

| Token | Name | Value |
|---|---|---|
| `--gc-bg` | Warm Ivory (primary background) | `#F5F2EC` |
| `--gc-bg-2` | Warm Stone (secondary background) | `#EAE7E0` |
| `--gc-light` | Light | `#FBFAF7` |
| `--gc-white` | Pure white | `#FFFFFF` |
| `--gc-ink` | Deep Ink (primary text) | `#101A20` |
| `--gc-dark` | Deep Navy / Blue-Green (deep brand dark) | `#173B4A` |
| `--gc-blue` | GC Blue (primary brand blue) | `#2879A8` |
| `--gc-blue-soft` | Soft Blue (secondary brand blue) | `#D9E8ED` |
| `--gc-ice` | Ice | `#F3F8FA` |
| `--gc-silver` | Soft Silver | `#AEB9BE` |
| `--gc-champagne` | Champagne (optional; use VERY sparingly) | `#B49A68` |

Rules:

- Use champagne/gold **very sparingly**. It must not become the primary
  visual identity.
- **Google Rating Yellow** is reserved strictly for authentic Google-style
  rating stars / rating indicators.

### 5.1 Color Usage Rules — Tonal Rhythm

The page should move through a tonal rhythm rather than one flat treatment:

```
Warm Ivory → Warm Ivory → Deep Navy → Light Neutral →
Deep Navy → Warm Ivory → Light Blue → Deep Navy CTA
```

Do not:

- make every section blue
- make every section dark
- use large gradients as a primary visual device
- use neon colors
- use generic "AI blue-purple gradients"

---

## 6. Typography System

| Role | Font |
|---|---|
| Primary body / UI | **Manrope** (or the closest equivalent already available in the project if technical constraints require another font) |
| Secondary editorial display | **DM Serif Display** (or a visually comparable high-quality serif if project constraints require a replacement) |

**IMPORTANT:** The serif is an *editorial accent*. Do **not** use serif
typography for everything.

### 6.1 Serif vs Sans Usage

Use **serif selectively** for:

- hero statement
- major emotional statements
- important narrative moments
- selected editorial headings

Use **sans-serif** for:

- navigation
- body
- services
- FAQs
- labels
- UI
- metadata
- buttons

The site must still feel **clinically modern**.

### 6.2 Typographic Personality

The typography should communicate:

- PRECISION
- WARMTH
- AUTHORITY
- EDITORIAL SOPHISTICATION

Do not create: ultra-futuristic typography, techno fonts, playful startup
fonts, excessive italic usage, excessive all-caps, or giant text everywhere.

### 6.3 Type Scale (fluid/desktop ranges)

Use fluid responsive typography; implementation should use `clamp()` or
equivalent.

| Element | Desktop range |
|---|---|
| Hero H1 | `3.5rem → 6.75rem` |
| Section H2 | `2.5rem → 4.75rem` |
| H3 | `1.5rem → 2.5rem` |
| Large narrative statement | `2rem → 4rem` |
| Body | `1rem → 1.125rem` |
| Small UI | `0.75rem → 0.875rem` |

Typography should be large enough to feel premium but never compromise
readability.

### 6.4 Headline Width / Measure

Do not let enormous headlines span the full viewport width. Constrain
editorial headline measure:

- Hero: ~10–15 words per visual line where appropriate
- Body: ~55–75 characters per line

Use `max-width` constraints to maintain readability.

---

## 7. Layout & Grid System

Canonical desktop grid:

- **12-column** layout
- Maximum content width: ~**1280px**
- Outer gutters: ~**5vw**, adjusted per viewport
- Recommended **asymmetric** splits: `5 / 7`, `7 / 5`, `4 / 8`,
  `8 / 4`, `3 / 9`, `9 / 3`

Use asymmetric composition intentionally.**

Do not:

- center everything
- make every section look like a conventional marketing layout

---

## 8. Spacing System

Base unit:** 8px** numbered. Canonical progression:

```
8 ·  16 ·  24 ·  32 ·  48 ·  64 · ·96 · ·128 · ·160
```

Larger values are allowed for major editorial moments. Do **not**
mechanically apply 160px padding to every section. Whitespace should respond
to content hierarchy, not a fixed pattern.

### 8.1 Visual Density

The homepage must alternate between:

| Density | When |
|---|---|
| **LOW** | hero / emotional imagery / major statements |
| **MEDIUM** | trust / team / clinic / service routing |
| **HIGHER** | dental education / FAQ / structured clinical information |

This avoids a page that feels either overcrowded or mysteriously empty. The
goal is **controlled information density**.

---

## 9. Shape & Elevation

### 9.1 Border Radius

Do not use generic SaaS-style rounded cards everywhere.:

- Editorial image blocks:**2–6px**
- Small interaction surfaces:**4–8px**
- Primary buttons:**pill-shaped or highly rounded where appropriate**
- Cards:**only when structurally justified**

Not every object must have rounded corners.



### 9.2 Shadow System

Use shadows **sparingly**. Default is **NO SHADOW**.

Subtle shadows may be used for:

- sticky header
- floating CTA
- modal / lightbox
- elevated interactive controls

Avoid:

- heavy card shadows
- glowing cards
- floating glass panels

Premium appearance must come from **composition, spacing, typography,
photography, and contrast** — not from shadows.



---

## 10. Imagery & Art Direction

Authentic GC Dental World photography **is the primary visual language**. Never
replace a suitable authentic clinic image with stock photography.



### 10.1 Canonical Image Principles

```
REAL PEOPLE  > STOCK PEOPLE
REAL CLINIC  > STOCK CLINIC
REAL PATIENT STORY  > GENERIC SMILE PHOTO
REAL CASE  > DECORATIVE DENTAL IMAGE
REAL LOCATION  > GENERIC CITY IMAGE
```

The available library includes: team, doctor portraits, patient
interactions, clinic reception / interior / entrance, building exterior,
treatment rooms, treatment images, children's dental treatment, elderly
patient smile case, multiple before/after cases, professional/credential
imagery, PV-Sindhu-associated image (pending verified wording), and logo.
Not
every asset must be used — use assets according to **narrative relevance**.



### 10.2 Image Cropping

Cropping must be **art-directed**. Desktop and mobile crops may differ.
Protect:

- faces, eyes, smiles
- GC Dental World signage
- clinically relevant anatomy
- the before/after comparison relationship

Do not use generic `object-position: center` on everything. Each important
image should receive **deliberate focal positioning**.



### 10.3 Image Color Treatment

Use a consistent professional color treatment:

- balanced exposure
- restrained contrast
- slightly warm clinical neutrality
- consistent white balance
- natural skin tones

Do not: heavily tint every image, apply aggressive cinematic LUTs, turn
everything sepia, over-saturate, or create artificial HDR effects.**

A very subtle grain layer **may** be used selectively on dark editorial
sections. It must be almost invisible.**



### 10.4 Signature Brand Motifs

The GC Dental World logo contains: tooth, circular form, orbital
ring, sparkle/star elements, and a horizontal line system. Use these as
inspiration for a small **motif system** — do **not** repeat the actual logo
graphic everywhere. Create subtle abstract motifs:

1. **Orbit line**
2. **Smile curve**
3. **Circular geometry**
4. **Fine horizontal rule**
5. **Tiny sparkle accent**
6. **Architectural line grid**

These should feel like a visual language **derived from the brand**.



### 10.5 SVG Philosophy

SVGs are permitted for:

- educational diagrams
- location markers
- subtle section motifs
- timeline connectors
- arrows
- abstract smile curves
- orbital lines
- simple icons

SVGs must clarify or reinforce the brand. Do not create giant decorative SVG
illustrations that compete with content.



### 10.6 Icon System

Use **one consistent icon family**. Preferred: **Lucide** or an equivalent
lightweight icon system already available in the project.



| Property | Value |
|---|---|
| Stroke | ~1.5–1.75px |
| Feel | architectural, precise, minimal |

Avoid: cartoon teeth, generic colorful healthcare icons, mixed icon
families, emojis, oversized icons inside every card**

---

## 11. UI Component System

### 11.1 Buttons

Primary CTA:**Book an Appointment**
Secondary:**Call the Clinic**
Tertiary:**Explore →**, **Learn more →**, **View case →**

Buttons must be: easy to read, tactile, high contrast, accessible,
restrained.

- Desktop button height:**≈44–52px**
- Touch target:**minimum ≈44px**
- Horizontal padding:** generous **

#### Button Hover

- Primary: subtle background shift; arrow shifts ≈4–6px; slight
  elevation only if necessary
- Secondary: subtle background/surface fill; arrow movement

Duration:**250–350ms**

Do not use: bounce, elastic scaling, dramatic glow, oversized hover
transforms.

### 11.2 Link Hover

Use subtle editorial behavior:

- underline grows from left to right
- arrow moves 4px
- muted color shift

Duration:**250–350ms**

### 11.3 Header

The header should be: **minimal, premium, stable, functional**.

- Desktop, left:**GC Dental World**; center/right:section navigation;
  right:**Book an Appointment**
- At top: transparent or warm-light treatment
- After scroll: solid ivory surface + subtle border + optional restrained
  backdrop blur

The header should not become visually heavy.

### 11.4 Floating Contact System

- **Desktop:** a subtle floating utility—keep it minimal. Do **not** show
  4–5 permanently floating buttons.
- **Mobile:**fixed bottom action bar with primary actions **Call** + **Book
  Appointment**; optional **WhatsApp** *ONLY if verified by the clinic*. Include
  safe-area handling. Do not obstruct content.

### 11.5 Mobile Navigation

The mobile menu should be: clean, large enough to touch, accessible,
visually consistent.

Menu items may include: Why GC Dental World, Dental Care, Treatments,
Smile Stories, Doctors, Clinic, FAQs. Bottom CTA:**Book Appointment**.

---

## 12. Section-by-Section Design Specification

### 12.1 Hero

The hero is the first major visual statement. Use the authentic team image:

- `public/assets/gc-dental-world-doctors-team-group-photo.jpg` (or the verified current equivalent))

**Desktop composition:** approximately **46% text + 54% image**. The image
should feel large and editorial. Do not place body text over people's faces.

**Content hierarchy:**

1. Eyebrow:**GC DENTAL WORLD · GACHIBOWLI, HYDERABAD**
2. Primary headline:**Dental care built around people, not just procedures.**
3. Supporting copy:use approved content strategy wording
4. Trust:**4.8 ★ · 286 Google Reviews**
5. CTA:**Book an Appointment**
6. Secondary:**Call 070324 44510**

#### Hero Art Direction

Avoid: generic stock smiling woman, giant dental tooth illustration, giant
gradient, circular glass cards, giant neon CTA. The hero should feel like an
actual brand campaign.

#### Hero Motion

Choreographed sequence on initial load — total ≈600–900ms.**

1. page/background establishes immediately
2. team image gently settles into place
3. headline rises ≈16–24px into position
4. supporting text follows
5. CTA follows
6. rating/proof appears last

Do not animate the entire page at once.

#### Hero Scroll

As the visitor scrolls: hero image may subtly scale from 1.02 →   1; text
may move slightly**. No aggressive parallax, no scroll-jacking, no forced
horizontal movement.**

### 12.2 Trust Rail

Immediately below hero. **Do NOT use 4 large cards. Use an editorial
horizontal structure**:

```
4.8 /  5 · Google Rating
286 · Reviews
REAL CLINICAL TEAM
GACHIBOWLI · HYDERABAD
```

Use fine rules and typography.

### 12.3 Patient Intent Section — "What brings you here?"

Use **large editorial rows**, not cards:

```
01 · I have tooth pain or discomfort
02 · I have a damaged or missing tooth
03 · I want to improve my smile
04 · I'm looking for dental care for my family
```

Hover: subtle number movement, arrow reveal, mild background shift,
optional contextual image.

### 12.4 "Dental, Explained."

Signature content section.**Background: Deep Navy** (`--gc-dark`). Heading:
**Dental, explained.** Present educational topics as editorial rows:

```
01 · Why does a tooth hurt?
02 · Does every painful tooth need a root canal?
03 · When does a tooth need a crown?
04 · What happens when a tooth is missing?
05 · What should parents know about children's dental care?
```

Interaction: hover/selection can reveal contextual educational content or a
simple diagram. Avoid boring generic accordion styling. Avoid unnecessary 3D.



### 12.5 Educational Visualization

Where diagrams are useful, use clean SVG diagrams. Example — Root Canal:</params>

```
Problem →→ Assessment →→ Treatment →→ Restoration
```

The illustration should look like a sophisticated information graphic**, not a
cartoon tooth.**



### 12.6 Patient Experience

Use:

- `public/assets/gc-dental-world-dentist-explaining-treatment-to-patient.jpg`

Headline:**Good dentistry starts with listening.** Use supporting patient
imagery carefully. This section visually communicates: listening, explanation,
understanding, treatment planning. Use review-derived themes only where
genuinely supported.**

### 12.7 Review Theme Experience — "What patients remember"

Heading:**What patients remember.**

Themes may include: **Clarity, Care, Hygiene, Comfort, Family, Follow-up.**

When review text is supplied, display **authentic excerpts**. Do not
fabricate. Interaction: theme selection → quote crossfade → small contextual
metadata. **No cheesy carousel.**

### 12.8 Flagship Smile Story — the Emotional Centerpiece



Use:

- `public/assets/gc-dental-world-elderly-patient-smile-before-after.jpg`
- and/or `public/assets/gc-dental-world-elderly-patient-smile-transformation.jpg`

Background:**Deep Navy** (`--gc-dark`). Heading:**Sometimes a new smile means much**
**more than teeth.**

Structure: **large case visual + editorial narrative**. Labels:**BEFORE /
AFTER**. Optional: subtle draggable comparison. This section should feel
**emotionally powerful**. Do not turn it into exaggerated cosmetic advertising.**

### 12.9 Before / After Case System

The numbered transformation assets become a **curated case system**:

- `public/assets/gc-dental-world-smile-transformation-case-01.jpg` through
  available numbered assets (`…-12.jpg`; `case-13.jpg` is the unnumbered
  `before-after treatment.jpg` mapping)

**Do NOT show all cases simultaneously in one enormous grid.** Preferred:
**featured case + case index + interactive change**:

```
01
02
03
04
05
```

Selecting another case should transition smoothly. Use **verified treatment
labels only**. If treatment is not verified, use:**Clinical case**, **Smile
case**, **Case study**.

### 12.10 Clinical Photography

Use treatment-room and treatment-in-progress images **sparingly**. The clinical
imagery should communicate: **competence, realism, professionalism, treatment
environment**. Do not create a frightening visual experience. Avoid dominating
the page with: surgery, blood, extreme intraoral imagery, highly graphic
images.

Relevant assets include `gc-dental-world-dental-treatment-room-equipment.jpg`,
`-02.jpg`, `gc-dental-world-dental-treatment-clinical-procedure.jpg`, and
`gc-dental-world-dentist-performing-dental-treatment.jpg`.

### 12.11 Treatments

Treatments should use an **editorial navigation system**. Do **NOT** create a
3×4 grid of identical cards. Possible structure:

```
RESTORE
REPLACE
IMPROVE
GENERAL / FAMILY
```

Populate **only with verified services**. Hover: row emphasis, arrow
movement, subtle underline. **No unnecessary iconography.**

### 12.12 Doctors

Use authentic doctor-portrait photography. Do not create tiny profile-card
grids. The primary clinician should receive a **stronger editorial composition**.
Use only verified: name, role, qualification, experience,
specialty/interests. **Do not invent anything.**

Assets: `public/assets/gc-dental-world-doctor-portrait.jpg` (identity to-be-
verified before a name-specific filename or name copy is used`.

### 12.13 Team

Use the real team image as a secondary brand expression:

- Hero:**TEAM = TRUST**
- Later:**TEAM = PEOPLE**

Do not repeat the exact same image composition. Assets:
`gc-dental-world-doctors-team-group-photo.jpg`, `gc-dental-world-doctors-and-staff-group.jpg`.

### 12.14 Credentials / Professional Journey

Professional-event/certificate imagery should be displayed **only when** the
underlying credentials are **verified**. Do not infer credentials from
photographs. Visually: use an **editorial timeline / professional journey.**
Avoid giant award walls. Assets:`gc-dental-world-doctor-professional-recognition.jpg`,
`gc-dental-world-doctor-professional-event.jpg` — do not auto-label as
certificates/awards.

### 12.15 PV Sindhu Module

Use the supplied real image **only with factually verified wording**. Treat the
relationship as an **understated authority module**. Do **NOT** automatically use:
"Official dentist", "Celebrity dentist", "Trusted by India's top athletes"
unless verified. **No celebrity-style visual effects.**

Asset:`public/assets/gc-dental-world-patient-visit-clinic.jpg`. If the identity
becomes formally verified in project source material, a name-specific filename
and copy may follow; until then keep neutral wording.**

### 12.16 Clinic Environment — "Know the place before you visit"

Heading:**Know the place before you visit.** Use:

- `public/assets/gc-dental-world-gachibowli-clinic-building-exterior.jpg`
- `public/assets/gc-dental-world-clinic-reception-interior.jpg`
- `public/assets/gc-dental-world-clinic-interior.jpg`
- treatment-room assets

Use **asymmetrical composition**. Do not turn these into equal-size cards. The
visitor should feel like they are **visually arriving at the clinic**.

### 12.17 Location — "Visit GC Dental World"

Heading:**Visit GC Dental World.** Show:**Gachibowli · Khajaguda · Hyderabad**
(verified business address.) Actions:**Directions, Call, Book an Appointment**.
Do not invent additional locations.**

### 12.18 FAQ

Use **editorial numbered rows**:

```
01 · Does every toothache require a root canal?
02 · What happens during a first dental consultation?
03 · How do I know whether I need a crown?
04 · What happens when a tooth is missing?
05 · How are wisdom tooth problems assessed?
06 · How should parents prepare a child for a dental visit?
```

Accordion behavior:**smooth, subtle, accessible, no bounce.**

### 12.19 Final CTA

Background:**Deep Navy** (`--gc-dark`). Headline:**Ready to talk about your**
**dental health?** CTA:**Book an Appointment**. Secondary:**Call 070324 44510**.
Support:**4.8 ★ · 286 Google Reviews**.

---

## 13. Responsive Behavior

**Do NOT design desktop-first and simply shrink it.** Every major section must
have intentional responsive behavior:

| Breakpoint | Approach |
|---|---|
| **Desktop** | asymmetry, large images, editorial whitespace |
| **Tablet** | rebalance layouts |
| **Mobile** | recompose layout |

### 13.1 Mobile Hero

Preferred order:**Eyebrow → Headline → Supporting text → Rating → CTA → Team
image**. Protect faces. Do not crop key team members.**

### 13.2 Mobile Before / After

Preserve the complete before/after relationship. Never crop away clinically
meaningful areas. Use either:**stacked comparison** or a **touch-friendly drag
slider**, depending on actual image dimensions.



### 13.3 Mobile Clinic Images

- Building: keep GC Dental World signage visible
- Doctor: protect face
- Team: protect all key faces
- Patient: preserve meaningful context

---

## 14. Motion System

Motion should feel:**calm, precise, weighted, professional.**

| Token | Duration |
|---|---|
| Fast | 160–220ms |
| Standard | 300–450ms |
| Editorial | 600–900ms |
| Large visual | 1000–1400ms |

**Default reveal:** opacity `0 → 1`; translateY `20px → 0`.

**Do not use:** bounce, elastic, excessive spring physics, constant parallax,
scroll hijacking, cursor gimmicks, motion on every object.**

### 14.1 Interaction Hierarchy

Use motion mainly for:

1. orientation
2. feedback
3. storytelling
4. information transition

Do not animate merely because animation is possible.

### 14.2 Reduced Motion

Support **`prefers-reduced-motion: reduce`**. Disable: parallax,
transform-heavy entrance animations, unnecessary slider transitions, decorative
motion. Keep interactions functional.**

---

## 15. Background Patterns & Editorial Devices

**Permitted** (all subtle):

1. Fine architectural grid
2. Orbit line
3. Smile curve
4. Subtle grain
5. Fine dividing rules

**No giant blobs. No generic abstract 3D blobs.**

### 15.1 Editorial Section Numbering

Use large section numbers **sparingly**:

```
01 · WHAT BRINGS YOU HERE?
02 · DENTAL, EXPLAINED.
03 · A SMILE WORTH REMEMBERING.

```

This can become a consistent visual rhythm. Do not number every tiny element.



### 15.2 Visual Rhythm

The page should intentionally alternate visual structures:

```
asymmetric split
→ editorial list
→ dark full-width image
→ light content area
→ case-study composition
→ timeline
→ service directory
→ clinic photography
→ FAQ
→ dark CTA
```

Do not repeat**heading, paragraph, three cards** for every section.



---

## 16. Design Rules

### 16.1 Card Rule

Cards are **not** the default layout primitive. Before creating a card, ask:
Would an editorial row, image composition, list, timeline, comparison, or
typographic module be stronger? Use cards only when they improve information
grouping.

### 16.2 Premium Rule

Premium does **NOT** mean: empty, beige, giant serif text, endless rounded
boxes, gold gradients, luxury stock photos.**

Premium means: **disciplined hierarchy, exceptional composition, authentic
imagery, excellent typography, restrained motion, strong information design,
coherent spacing, brand specificity, visual confidence.**

### 16.3 "Wow" Rule

The site should have a small number of memorable signature moments —
**approximately five**:

1. Hero team composition
2. "Dental, Explained" interactive education
3. 80-year-old smile story
4. Signature transformation interaction
5. Clinic arrival / location reveal

Do not create 25 competing wow effects.**

### 16.4 Content + Visual Relationship

The homepage must visually alternate between**clinic-specific content** and
**useful dental knowledge**. It must **NOT** feel like:

```
doctor → clinic → award → review → doctor → CTA
```

The correct rhythm is:

```
EDUCATE
→ HUMANIZE
→ PROVE
→ EDUCATE
→ SHOW
→ EXPLAIN
→ PROVE
→ CONVERT
```

---

## 17. Accessibility

The visual system must support:

- semantic HTML
- accessible contrast
- visible focus
- keyboard use
- 44px+ touch targets
- accessible accordions
- accessible modal
- accessible before/after slider
- reduced motion
- correct heading hierarchy

Do not sacrifice accessibility for visual style.

---

## 18. Performance

Visual ambition must not destroy performance. Avoid mandatory use of:

- WebGL
- heavy 3D
- giant JS animation libraries
- autoplay video
- huge image payloads

Use:

- Next.js image optimization (`next/image`)
- responsive image sizes
- lazy loading below the fold
- `priority` for the hero image
- lightweight CSS transforms
- minimal JS

A beautiful site that loads badly is not top 1%.

### 18.1 Do Not Add Visual Technology for Its Own Sake

Do not add: WebGL tooth, 3D dental model, giant particle systems,
mouse-following blobs, shader effects, full-screen cursor replacement,
unnecessary horizontal scroll, scroll-jacking**.

A complex technology is justified **only when** it materially improves:
education, spatial understanding, patient orientation, storytelling**.

---

## 19. SEO–Visual Relationship

Visual design must support semantic content:**

- Important text must remain **actual HTML text**.
- Do not hide critical content inside images.
- Do not render key clinical information only with canvas or SVG text.
- Images that convey information must have **meaningful alt text**.
- Decorative SVGs should use appropriate accessibility handling.**

---

## 20. Asset Naming & Paths

Use the canonical assets already organized under:

```
public/assets/
```

Respect the existing SEO-oriented filenames.** Do not rename assets during visual
implementation** unless specifically required. Do not create duplicate copies
unnecessarily.**

Key canonical assets referenced by this design system:

| Use | Asset |
|---|---|
| Hero / team | `public/assets/gc-dental-world-doctors-team-group-photo.jpg` |
| Team (people) | `public/assets/gc-dental-world-doctors-and-staff-group.jpg` |
| Doctor portrait | `public/assets/gc-dental-world-doctor-portrait.jpg` |
| Patient experience | `public/assets/gc-dental-world-dentist-explaining-treatment-to-patient.jpg` |
| Elderly smile case | `public/assets/gc-dental-world-elderly-patient-smile-before-after.jpg` / `public/assets/gc-dental-world-elderly-patient-smile-transformation.jpg` |
| Transformation cases | `public/assets/gc-dental-world-smile-transformation-case-01.jpg` … `case-13.jpg` |
| Clinic environment | `public/assets/gc-dental-world-gachibowli-clinic-building-exterior.jpg`, `public/assets/gc-dental-world-clinic-reception-interior.jpg`, `public/assets/gc-dental-world-clinic-interior.jpg`, `public/assets/gc-dental-world-clinic-main-entrance.jpg`, `public/assets/gc-dental-world-front-desk-interior.jpg` |
| Treatment rooms | `public/assets/gc-dental-world-dental-treatment-room-equipment.jpg`, `public/assets/gc-dental-world-dental-treatment-room-equipment-02.jpg` |
| Clinical procedure | `public/assets/gc-dental-world-dental-treatment-clinical-procedure.jpg`, `public/assets/gc-dental-world-dentist-performing-dental-treatment.jpg` |
| Credentials (pending verification) | `public/assets/gc-dental-world-doctor-professional-recognition.jpg`, `public/assets/gc-dental-world-doctor-professional-event.jpg` |
| PV Sindhu module (pending verified wording) | `public/assets/gc-dental-world-patient-visit-clinic.jpg` |
| Logo / brand | `public/assets/gc-dental-world-logo.jpg` |

---

## 21. Future Implementation Agent Rules

Any future coding agent implementing the homepage **MUST READ THIS FILE FIRST**.

This document overrides generic model defaults such as:

- default Tailwind card layouts
- generic blue medical templates
- automatic glassmorphism
- automatic bento grids
- automatic rounded cards
- excessive gradients
- excessive animation

If a future implementation decision conflicts with this document, resolve the
conflict **in favor of this design system**, unless the user explicitly changes
the system.**

---

## 22. Design Drift Prevention

Future agents must **not** gradually drift toward a "nice-looking generic dental
website". The following are considered **design drift**:

- excessive cards
- generic blue/white clinical template
- repetitive sections
- random gradients
- generic dental illustrations
- stock photos
- excessive pill UI
- excessive glassmorphism
- excessive motion
- unnecessary 3D
- giant decorative typography without content value
- empty luxury aesthetic
- turning every section into a testimonial/credential block

---

## 23. Design Review Checklist

Before implementation is considered visually complete, evaluate:

- **BRAND:** Does the page unmistakably feel like GC Dental World?
- **COLOR:** Does the system preserve GC Blue without becoming a dated medical template?
- **TYPOGRAPHY:** Does the type feel editorial and clinical simultaneously?
- **IMAGERY:** Are authentic images the hero of the visual story?
- **LAYOUT:** Is there enough asymmetry and variation?
- **CONTENT:** Does useful dental information have equal visual importance to clinic marketing?
- **TRUST:** Are reputation and evidence integrated into decision points?
- **EMOTION:** Does the elderly smile case create a memorable human moment?
- **CLINICAL:** Does the page provide useful dental information without becoming visually intimidating?
- **INTERACTION:** Does motion help the experience?
- **MOBILE:** Does mobile feel intentionally designed?
- **PERFORMANCE:** Would the experience remain fast on a normal mobile connection?
- **ACCESSIBILITY:** Can people navigate and understand it without relying on motion?
- **PREMIUM:** Does it feel expensive because of discipline rather than decoration?
- **ORIGINALITY:** Could this exact design easily be reused for another dental clinic? If yes, it is too generic.

---

## 24. Anti-Template Test

A reviewer should imagine replacing**GC Dental World** with another dentist's
name. If most of the visual design would still work unchanged, the design
is not sufficiently business-specific.**

GC Dental World should be expressed through:

- its blue identity
- its actual people
- its actual clinic
- its actual patient stories
- its actual cases
- its actual reputation
- its actual physical location
- its actual content

---

## 25. Canonical Summary

The GC Dental World homepage is:

- **NOT** a dental template
- **NOT** a luxury spa
- **NOT** a SaaS website
- **NOT** an award-show animation
- **NOT** a medical brochure

It **is**:**A PREMIUM EDITORIAL DENTAL EXPERIENCE**, built from:

```
REAL PEOPLE
+ REAL CLINIC
+ REAL PATIENT STORIES
+ REAL TREATMENT EVIDENCE
+ USEFUL DENTAL KNOWLEDGE
+ REAL REPUTATION
```

The visual hierarchy is:

```
PHOTOGRAPHY → TYPOGRAPHY → CONTENT → INTERACTION → MOTION → DECORATION
```

The design language is:**CONTEMPORARY CLINICAL EDITORIAL**.

The brand anchor is:**GC BLUE**.

The emotional centerpiece is:**THE ELDERLY PATIENT SMILE STORY**.

The clinical proof system is:**SIGNATURE SMILE STORIES**.

The education system is:**DENTAL, EXPLAINED.**

The reputation system is:**WHAT PATIENTS REMEMBER.**

The physical orientation system is:**KNOW THE PLACE BEFORE YOU VISIT.**

The conversion system is:**BOOK AN APPOINTMENT + CALL + DIRECTIONS**.

---

## 26. Document Verification

This document is verified against:

1. File exists and is valid Markdown — checked
2. All major visual rules are documented — checked
3. Color system is documented — §5
4. Typography system is documented — §6
5. Layout/grid system is documented — §7
6. Image art direction is documented — §10
7. Icon/SVG system is documented — §10.5 / §10.6
8. Button system is documented — §11.1
9. Motion system is documented — §14
10. Responsive behavior is documented — §13
11. Accessibility is documented — §17
12. Performance principles are documented — §18
13. Anti-template rules are documented — §22 / §24
14. GC Blue remains the brand anchor — §4
15. The 80-year-old smile story remains the emotional centerpiece — §12.8 / §25
16. Dental education remains an important visual/content layer — §12.4 / §16.4
17. This document establishes itself as the canonical visual source of truth — §1

*This specification is complete and authoritative for the GC Dental World homepage.*
