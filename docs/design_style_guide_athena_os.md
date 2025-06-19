# Design Style Guide — **AthenaOS**  
*(Owner : Sally – UX • Created 17 Jun 2025 • Aligned with Hi‑Fi Mockups v2)*

---

## 1 · Purpose
Provide a single source‑of‑truth for designers & engineers so visual, interaction, and accessibility standards remain consistent across the AthenaOS code‑base.

---

## 2 · Brand Foundations
| Token | Hex | Usage |
|-------|-----|-------|
| **Primary Blue** | `#2563EB` | CTA buttons, links, active nav items |
| **Nutrition Green** | `#14B89A` | Nutrition agent accents |
| **Fitness Orange** | `#F59E0B` | Fitness agent accents |
| **SME Purple** | `#8B5CF6` | SME Business Coach accents |
| **Neutral‑900** | `#0F172A` | Primary text |
| **Neutral‑600** | `#475569` | Secondary text |
| **Surface Light** | `#FFFFFF` | Cards, backgrounds |
| **Surface Hover** | `#F1F5F9` | Card / button hover |
| **Surface Dark** | `#1E293B` | Dark‑mode surfaces (future) |
| **Error Red** | `#DC2626` | Form errors |
| **Success Green** | `#16A34A` | Success toasts |

All colours are available as Tailwind custom tokens (`theme.extend.colors`).

---

## 3 · Typography
| Role | Font | Weight | Size / Line | Tailwind Class |
|------|------|--------|-------------|----------------|
| Display 1 | Inter | 700 | 40 / 48 px | `text‑4xl lg:text‑5xl font‑bold` |
| H1 | Inter | 700 | 32 / 40 px | `text‑3xl font‑bold` |
| H2 | Inter | 600 | 24 / 32 px | `text‑2xl font‑semibold` |
| H3 | Inter | 600 | 20 / 28 px | `text‑xl font‑semibold` |
| Body Lg | Inter | 400 | 18 / 28 px | `text‑lg` |
| Body Md | Inter | 400 | 16 / 24 px | `text‑base` |
| Caption | Inter | 400 | 12 / 16 px | `text‑xs` |

*Font‑family:* `Inter, ui‑sans‑serif, system‑ui`.

---

## 4 · Spacing & Layout
* **Base unit:** `4 px` (Tailwind scale).  
* **Container max‑widths:** `sm 640`, `md 768`, `lg 1024`, `xl 1280`.  
* **Grid:** 12‑column flex grid with `24 px` gutters on desktop; stacks to 4‑column (`16 px` gutters) tablet, single‑column mobile.  
* **Border radius:** `12 px` on cards; `8 px` on buttons & inputs; AI portrait images use `16 px` radius.  
* **Shadows:** Tailwind `shadow‑md` for cards (`0 4 6 rgba(0,0,0,0.08)`); `shadow‑lg` on active modals.  
* **Elevation tokens:** `e1` card, `e2` modal, `e3` dropdown.

---

## 5 · Navigation Patterns
| Viewport | Primary Nav | Secondary Nav |
|----------|-------------|---------------|
| **Desktop** | **Top bar 64 px** (logo left, nav links centre, user avatar right) | Optional hover‑rail appears when > 6 agents |
| **Tablet** | Top bar collapses centre links into burger menu | Drawer pushes from left |
| **Mobile** | **Bottom tab bar** (Home, Agents, Inbox, Profile) | Burger menu for settings |

Active link uses Primary‑Blue underline and `font‑semibold`.

---

## 6 · Core Components
### 6.1 Buttons
| Variant | BG | Text | Border | States |
|---------|----|------|--------|--------|
| Primary | Primary‑Blue | `#FFFFFF` | none | Hover `brightness‑90`; Disabled opacity 50 % |
| Secondary | Surface Hover | Neutral‑900 | 1 px Neutral‑300 | Hover bg `#E2E8F0` |
| Danger | Error Red | `#FFFFFF` | none | Same hover rule |

### 6.2 Agent Card
| Element | Spec |
|---------|------|
| Portrait | 96 × 96 px AI realistic headshot, radius 16 px |
| Accent bar | 4 px left border using agent colour token |
| Hover | raises `translate‑y‑[-4px]` + `shadow‑lg` |
| Click | navigate to `/agent/:slug` |

### 6.3 Chat Panel
- **Message bubble** max‑width `60 %`.  
- **User message**: Primary‑Blue outline; align right.  
- **Agent message**: Neutral‑600 outline; accent colour avatar ring.  
- **Reactions**: emoji popover on hover (desktop) or long‑press (mobile).  
- **Autoscroll** pauses on upward scroll; “New messages ↓” toast appears.

### 6.4 Actions Feed
Right sidebar on ≥ `lg` viewports; below chat on mobile. Each action uses icon (lucide‑react) + pill status (`Done`, `In progress`, `Blocked`).

### 6.5 Forms & Inputs
Label above input, `text‑sm font‑medium`; helper text `text‑xs Neutral‑600`. Error border `Error Red` + icon.

### 6.6 Modal / Drawer
Radius 24 px top corners, `shadow‑2xl`; backdrop `rgba(15,23,42,0.6)`.

---

## 7 · Imagery & Iconography
* **AI Portraits** generated via DALLE: daylight, neutral grey bg, subtle smile, crop shoulders up.  
* Icons from `lucide‑react`; line‑weight `1.5`. Use agent accent colour when icon is contextual, otherwise Neutral‑600.

---

## 8 · Accessibility
- Colour contrast ≥ 4.5:1 (AA) for text.  
- All interactive elements keyboard reachable; focus ring `2 px Primary‑Blue`.  
- `aria‑live="polite"` on chat and actions feed for screen readers.  
- Motion reduce: disable hover lifts/translate when `prefers‑reduced‑motion`.

---

## 9 · Assets & Delivery
* Figma file: **AthenaOS‑HiFi‑v2.fig** (latest).  
* Tailwind config snippet in `/apps/web/tailwind.config.ts`.  
* Export AI portraits at `@2x` (192 × 192 px) WebP, ≤ 20 KB.  
* Provide SVG sprite sheet for icons.

---

## 10 · Change Management
All updates to this guide require PR into `design-system` branch, review by UX + Front‑end lead.

---

*End of Style Guide — ready for dev hand‑off.*

