# Product‑Requirements Document — **AthenaOS** MVP v0.5
*(Owner : John – PM • Created 17 Jun 2025)*

---

## 1 · Executive Summary
Build **AthenaOS**, a web application that acts as a personal operating system for professionals and SME owners by bundling four specialist AI agents into a single, shared‑memory experience. MVP targets time‑strapped founders (primary persona: *Founder‑Fran*, see §3) who need consolidated admin, nutrition and fitness guidance plus daily business coaching.

---

## 2 · Goals & Success Metrics
| Goal | KPI | Target @ 30 Days Post‑Launch |
|------|-----|------------------------------|
| Deliver cohesive multi‑agent hub | WAU | ≥ 500 |
| Drive cross‑agent engagement | Avg agents used / user | ≥ 2 |
| Validate SME Coach value prop | Daily digest open‑rate | ≥ 40 % |
| Prove retention | Day‑7 retention | ≥ 25 % |
| Monetisation signal | Beta wait‑list sign‑ups | ≥ 1 000 |

---

## 3 · Personas & Core Jobs‑to‑Be‑Done
| Persona | Goals | Pain Points | JTBD Statements |
|---------|-------|-------------|-----------------|
| **Founder‑Fran** (primary) | Grow side‑hustle into SME while juggling family | Overloaded by admin, no clear daily focus | “Help me start each day with 3 actionable tasks that move my business forward.” |
| **Professional‑Pat** | Maintain work‑life balance & health | Too many siloed apps for email, fitness, diet | “Give me one place that organises my meetings, workouts and meals.” |

---

## 4 · Functional Requirements
### 4.1 Home Dashboard
- F‑1 Display KPI stat cards (*Tasks Today, Calories Remaining, Upcoming Meetings*).  
- F‑2 Show grid of **Agent Cards** (Admin, Nutrition, Fitness, SME).  
- F‑3 Paginate grid when > 12 agents (post‑MVP marketplace).  
- F‑4 Deep‑link entry: if landing from push‑notification/email, bypass dashboard and open target agent.

### 4.2 Agent Workspaces (Shared Skeleton)
- F‑5 **ChatPanel** with streaming responses, reaction emojis, auto‑scroll w/ pause on hover.  
- F‑6 **ActionsFeed** displays tool calls/events.  
- F‑7 **WidgetZone** loads agent‑specific widgets (see table below).  
- F‑8 Header shows portrait, name, status.

| Agent | Must‑Have Widgets | External APIs |
|-------|-------------------|---------------|
| Admin Assistant | FreeSlotPicker, EmailTriage | Google/Microsoft Calendar & Mail (read‑only) |
| Nutrition Coach | MealPlanTable, MacroGauge | HealthKit / Google Fit / Fitbit (read), foodDB |
| Fitness Coach | WorkoutStrip | Wearable APIs (same as above) |
| SME Business Coach | TaskKanban, DocHighlights | Google Drive / OneDrive (read) |

### 4.3 Daily Digest Automation
- F‑9 At 07:00 local time, system generates digest via SME Coach.  
- F‑10 Send **push notification** (PWA) + summary email.  
- F‑11 Deep‑link opens SME workspace.

### 4.4 Unified OAuth Connect
- F‑12 Single “Connect Your Services” wizard with providers (Google, Microsoft, Apple, Wearables).  
- F‑13 Show progress bar (3‑step) and per‑provider error handling.

### 4.5 Privacy & Settings
- F‑14 PrivacyScopeModal lets users toggle which memories flow between agents.  
- F‑15 Settings page for profile, password, notification preferences.

---

## 5 · Non‑Functional Requirements
| Category | Requirement |
|----------|-------------|
| Performance | First meaningful paint < 2 s on 3G mobile; chat latency < 2 s round‑trip |
| Accessibility | WCAG AA compliance; keyboard navigable chat |
| Security | OAuth 2.0 with PKCE; encrypt secrets; rate‑limit external API calls |
| Privacy | GDPR‑ready data export & delete; user‑scoped memory segregation |
| Scalability | Handle 5k DAU on single AWS Fargate cluster; pgvector for embeddings |

---

## 6 · Scope Boundary (MVP)
| In Scope | Out of Scope |
|----------|--------------|
| Read‑only calendar & email | Calendar event creation/edit (Admin Assistant) |
| Wearable read integration | Barcode food scanner, invoice OCR |
| 4 core agents | Mental‑Health, Financial agents |
| Push/email digests | SMS or WhatsApp digests |
| Single‑tenant deployment | Multi‑tenant org accounts |

---

## 7 · Assumptions & Risks
- **OpenAI Agent SDK** abstraction covers memory & tool orchestration.  
- Apple HealthKit requires user device token; testing limited to internal beta.  
- Google API quota may throttle free tier → allocate billing ahead of beta.  
- Risk: parsing SME documents’ unstructured data could overrun M estimates; mitigate via keyword heuristics MVP.

---

## 8 · Milestones
| Date (2025) | Milestone | Notes |
|-------------|-----------|-------|
| 20 Jun | PRD sign‑off | Stakeholders ✔︎ |
| 24 Jun | Backlog ready & pointed | Epics & user stories with AC |
| 08 Jul | Sprint 1 demo (Dashboard ± Admin Assistant) | Internal |
| 22 Jul | Sprint 2 demo (Nutrition + Fitness) | Internal |
| 05 Aug | Beta freeze (SME Coach + digests) | QA & UAT |
| 15 Aug | Public beta launch | Invite list |

---

## 9 · Appendices
A. KPI tracking schema  
B. API scopes & quota tables  
C. Glossary of terms

*End of PRD — ready for backlog decomposition.*

