# Product Backlog — **AthenaOS** MVP v0.5
*(Owner : Sarah – Product Owner • Updated 17 Jun 2025)*

---

## Legend
- **Must / Should / Could** priority tags map to Release 0.5 scope.  
- Story IDs keyed by Epic prefix (P = Platform, H = Hub, A = Admin Assistant, N = Nutrition/Fitness, S = SME Coach).
- Acceptance Criteria follow the **Given / When / Then** format.

---

## Epic E‑1 · Core Platform & Auth  (**Must**)

| Story ID | Title | Priority | Points | Detailed User Story | Acceptance Criteria |
|----------|-------|----------|--------|---------------------|---------------------|
| **P‑1.1** | Marketing Landing Page | Must | 3 | *As a* prospective user, *I want* to learn the value of AthenaOS before I create an account *so that* I can decide if it’s worth signing up. | **Given** I visit `https://athenaos.app`, **When** the page loads, **Then** I see hero tagline, screenshot carousel, feature bullets, and a "Sign in" CTA that routes to `/auth/login`.  |
| **P‑1.2** | Federated Sign‑in (Google & Microsoft) | Must | 5 | *As a* new user, *I want* to sign in with my Google or Microsoft account *so that* I don’t need a separate password. | - **Given** I click Google/Microsoft button, **When** OAuth flow completes, **Then** I land on dashboard authenticated.  <br>- Error state shown if consent denied.  <br>- User record persisted to `users` table. |
| **P‑1.3** | JWT Refresh Middleware | Must | 2 | *As a* signed‑in user, *I want* my session to stay alive without re‑logging *so that* I remain productive. | - Access token auto‑refreshes before expiry (silent). <br>- Session persists across page reloads. |
| **P‑1.4** | Unified OAuth Connect Screen | Should | 3 | *As a* user, *I want* a single page to link my calendar & email providers *so that* agents can access them later. | - Page lists Google & Microsoft scopes with toggles. <br>- Progress bar shows Step 1/3. <br>- Successful connect stores tokens in encrypted DB. |

---

## Epic E‑2 · Agent Hub UI (**Must**)

| Story ID | Title | Priority | Points | User Story | Acceptance Criteria |
|----------|-------|----------|--------|------------|---------------------|
| **H‑2.1** | Dashboard Shell & Grid Layout | Must | 5 | *As a* signed‑in user, *I want* to see my agents in a grid *so that* I can quickly launch them. | - Responsive 2‑column grid (≥ lg screens). <br>- Each card shows icon, name, accent stripe. <br>- Load time ≤ 1 s on staging. |
| **H‑2.2** | Add‑Agent Placeholder Card | Must | 2 | *As a* user, *I want* a clear way to add more agents *so that* I can expand my toolkit. | - "+" card opens modal saying "Marketplace coming soon". |
| **H‑2.3** | Pagination after 12 Agents | Could | 3 | *As a* power user, *I want* pagination so the dashboard stays clean. | - When agent count > 12, next page arrow appears. <br>- Keyboard navigation (← →) cycles pages. |

---

## Epic E‑3 · Admin Assistant MVP (**Must**)

| Story ID | Title | Priority | Points | User Story | Acceptance Criteria |
|----------|-------|----------|--------|------------|---------------------|
| **A‑3.1** | Orchestrator Stub (Admin Agent) | Must | 5 | *As a* user, *I want* to chat with the Admin Assistant *so that* I can ask for scheduling help. | - `/api/agent/admin/chat` streams dummy responses. <br>- SSE/WebSocket tested in browser. |
| **A‑3.2** | Free‑Slot Picker Widget (Read‑only) | Must | 3 | *As a* user, *I want* the agent to suggest free time slots *so that* I can pick a meeting time. | - Given calendar free/busy JSON, widget lists top 3 slots. <br>- Slots update when date range changed. |
| **A‑3.3** | Push Notification Morning Digest | Should | 3 | *As a* user, *I want* a daily summary at 07:00 *so that* I know my tasks without opening the app. | - Job scheduler triggers digest generation. <br>- Push + email sent. <br>- Tapping deep‑links into Admin chat. |

---

## Epic E‑4 · Nutrition & Fitness Foundations (**Should – Sprint 2**)

| Story ID | Title | Priority | Points | User Story | Acceptance Criteria |
|----------|-------|----------|--------|------------|---------------------|
| **N‑4.1** | Wearable Connect Flow | Should | 5 | *As a* user, *I want* to link my wearable *so that* Nutrition/Fitness agents can personalise advice. | - OAuth to HealthKit, Google Fit, Fitbit. <br>- Data pull success event logged. |
| **N‑4.2** | Calorie & Macro Engine | Should | 5 | *As a* user, *I want* accurate calorie targets *so that* I can meet my health goals. | - Given wearable metrics, formula returns kcal & macros. Tested vs. unit tests. |
| **N‑4.3** | Meal‑Plan Generator v1 | Could | 5 | *As a* user, *I want* a 7‑day meal plan with my preferred foods *so that* I can shop once. | - Keeps user‑entered foods. <br>- Provides healthier swap suggestions & rationale. |

---

## Epic E‑5 · SME Business Coach Foundations (**Should – Sprint 2/3**)

| Story ID | Title | Priority | Points | User Story | Acceptance Criteria |
|----------|-------|----------|--------|------------|---------------------|
| **S‑5.1** | Drive/OneDrive Read‑only Connect | Should | 5 | *As a* founder, *I want* the coach to access my docs *so that* it can surface insights. | - OAuth to Google Drive & OneDrive. <br>- User selects folders. |
| **S‑5.2** | Task Generator v1 | Should | 5 | *As a* founder, *I want* daily tasks based on my docs & emails *so that* I know what to focus on. | - Generates 3‑5 tasks with due‑dates. <br>- Tasks stored to Postgres and appear in chat. |
| **S‑5.3** | Morning Digest Push/Email | Should | 3 | *As a* founder, *I want* a morning digest with tasks & content ideas *so that* I start the day prepared. | - Job at 07:00 sends push + HTML email. <br>- Email uses branded template. |

---

*End of Backlog update — all stories include detailed acceptance criteria for Scrum master & dev team.*

