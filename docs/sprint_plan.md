# Sprint Plan — **AthenaOS** Sprint 1
*(Owner : Bob – Scrum Master • Start 17 Jun 2025 • End 01 Jul 2025)*

---

## 1 · Sprint Goal
> **“Stand up the core platform skeleton with auth, dashboard shell, and Admin Assistant MVP flow so users can sign in, browse the agent hub, and experience a basic Admin scheduling suggestion.”**

---

## 2 · Team Capacity & Roles
| Name | Role | Available Days | Notes |
|------|------|----------------|-------|
| James | Full‑Stack Dev | 9 | Takes lead on Next.js scaffolding & OAuth flows |
| Ava | Front‑end Dev | 9 | UI components & styling (shadcn/ui) |
| Leo | Back‑end Dev | 8 | Orchestrator service & OpenAI SDK integration |
| Quinn | QA | 7 | Test plan & Cypress smoke tests |
| Sally | UX | 2 | Final polish on hi‑fi specs during sprint |

Velocity baseline: **25 points** (observed from prior projects).

---

## 3 · Committed Stories (from Backlog v0.5)
| Story ID | Title | Points | Owner | Acceptance Criteria Snapshot |
|----------|-------|--------|-------|------------------------------|
| **P‑1.1** | Marketing Landing Page | 3 | Ava | Landing renders; CTA links to `/auth/login`. |
| **P‑1.2** | Federated Sign‑in (Google & MS) | 5 | James | OAuth completes; user session stored; error states handled. |
| **P‑1.3** | Unified OAuth Connect Screen | 3 | James | Lists Calendar & Email scopes; progress bar shows step 1/3. |
| **P‑2.1** | Agent Hub Shell + Grid Layout | 5 | Ava | Responsive grid; agent card component w/ hover state. |
| **P‑2.2** | Add‑Agent Placeholder (+ card) | 2 | Ava | Opens modal (empty marketplace). |
| **A‑1.1** | Orchestrator Boot + Admin Agent Skeleton | 5 | Leo | Chat endpoint proxy to OpenAI; dummy response stream. |
| **A‑1.2** | Free‑Slot Picker Widget (read‑only) | 2 | Leo | Given sample free/busy JSON, widget renders suggestions. |

**Total committed:** **25 points**

---

## 4 · Sprint 1 Milestones & Calendar
| Date | Milestone |
|------|-----------|
| **17 Jun** | Kick‑off • Branch strategy & CI scaffold |
| 20 Jun | Auth flow demo on staging URL |
| 24 Jun | Agent Hub UI integrated with orchestrator stub |
| 28 Jun | End‑to‑end smoke test passes (sign‑in → Admin suggestion) |
| 01 Jul | Sprint review & retrospective |

---

## 5 · Risks & Mitigations
| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|-----------|
| Google OAuth quota delay | Blocks sign‑in | Med | Apply for quota increase early; stub auth if blocked. |
| UI spec changes mid‑sprint | Rework | Low | Lock hi‑fi spec by Day 2. |
| OpenAI rate limits | Chat failures | Med | Implement exponential back‑off wrapper. |

---

## 6 · Definition of Done (Sprint 1)
1. All committed stories accepted by PO.  
2. Deployed to staging (`staging.athenaos.app`) via CI.  
3. Cypress smoke suite green.  
4. Code coverage ≥ 70 % for orchestrator module.

---

*Ready for PO & stakeholder review — please approve or request adjustments.*

