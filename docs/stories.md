# Product Backlog — AthenaOS MVP v0.5
*(Owner : Sarah – Product Owner • Created 17 Jun 2025)*

---

## Epic 1 · Core Platform & Auth
| Story ID | As a … | I want … | So that … | Priority | Points | Acceptance Criteria |
|----------|--------|----------|-----------|----------|--------|---------------------|
| P‑1.1 | new visitor | to browse a marketing landing page | I can understand product value before signing in | **Must** | 3 | ‑ Landing URL loads within 1 s; hero + CTA visible.<br>‑ Links to *Get Started* and *Sign‑in* buttons. |
| P‑1.2 | new user | federated sign‑in with Google or Microsoft | I can onboard quickly without passwords | **Must** | 5 | ‑ OAuth flow completes.<br>‑ JWT stored; session persists 7 days.<br>‑ Error banner on provider denial. |
| P‑1.3 | authenticated user | a unified OAuth connect screen | I can grant calendar/email/drive scopes in one go | **Must** | 8 | ‑ Shows list of providers.<br>‑ Progress bar step 1 / 3.<br>‑ On connect, token stored in DB.<br>‑ Skip allowed. |

## Epic 2 · On‑Boarding & Preferences
| Story ID | As a … | I want … | So that … | Priority | Points | AC |
|----------|--------|----------|-----------|----------|--------|----|
| O‑2.1 | first‑time user | to pick which agents to enable | the dashboard only shows what I need | **Must** | 3 | ‑ Grid shows 4 MVP agents.<br>‑ Toggle saves to user profile.<br>‑ Continue only if ≥1 agent selected. |
| O‑2.2 | privacy‑conscious user | to control memory‑sharing scopes | my data isn’t mixed without consent | **Must** | 5 | ‑ Checkboxes per scope (Health, Business, Personal).<br>‑ Saved to DB.<br>‑ Defaults = all off. |
| O‑2.3 | wearable owner | to optionally connect HealthKit / Fitbit | nutrition & fitness agents personalise advice | **Should** | 5 | ‑ OAuth completes.<br>‑ If skipped, agents show “Connect Wearable” prompt later. |

## Epic 3 · Dashboard & Navigation
| Story ID | As a … | I want … | So that … | Priority | Points | AC |
|----------|--------|----------|-----------|----------|--------|----|
| D‑3.1 | user | a responsive dashboard with agent cards | I can launch agents quickly | **Must** | 5 | ‑ Grid adapts per breakpoints.<br>‑ Card hover scale works.<br>‑ Disabled cards show overlay. |
| D‑3.2 | user | KPI widgets (Tasks, Calories, Next Workout) | I see key stats at a glance | **Should** | 3 | ‑ Widgets query latest agent data.<br>‑ Updates every 30 s. |
| D‑3.3 | power user | to add more agents via “+ Discover” card | expand functionality later | **Could** | 3 | ‑ Modal opens.<br>‑ Search hidden MVP.<br>‑ Disabled until marketplace ready. |

## Epic 4 · Agent Framework & Shared Memory
| Story ID | As a … | I want … | So that … | Priority | Points | AC |
|----------|--------|----------|-----------|----------|--------|----|
| F‑4.1 | developer | a TypeScript agent base class | agents share common skeleton | **Must** | 5 | ‑ Provides `systemPrompt`, `tools[]`, `memoryAdapter` hooks. |
| F‑4.2 | agent orchestrator | to persist memory in pgvector | agents recall context across sessions | **Must** | 8 | ‑ Vector store spun up in Docker.<br>‑ CRUD functions covered by tests. |
| F‑4.3 | user | privacy tags respected when retrieving memory | sensitive data stays scoped | **Must** | 5 | ‑ Retrieval filters by tag.<br>‑ Unit tests pass. |

## Epic 5 · Admin Assistant Agent
| Story ID | As a … | I want … | So that … | Priority | Points | AC |
|----------|--------|----------|-----------|----------|--------|----|
| A‑5.1 | user | free‑slot suggestions across calendars | I can book meetings easily | **Must** | 8 | ‑ Reads Google & MS free/busy.<br>‑ Returns top 5 slots JSON. |
| A‑5.2 | user | inbox triage suggestions | I clear email faster | **Should** | 8 | ‑ Labels top 20 emails via OpenAI classification.<br>‑ Accuracy ≥80 % in test set. |

## Epic 6 · Nutrition Coach Agent
| Story ID | As a … | I want … | So that … | Priority | Points | AC |
|----------|--------|----------|-----------|----------|--------|----|
| N‑6.1 | user | 7‑day meal plan retaining my foods | I keep preferences yet improve diet | **Must** | 8 | ‑ Plan returned as table.<br>‑ Unhealthy foods flagged with swap suggestions. |
| N‑6.2 | user | daily calorie target synced to wearable | advice adapts to activity | **Should** | 5 | ‑ Pulls calories‑burned metric.<br>‑ Recalculates target. |

## Epic 7 · Fitness Coach Agent
| Story ID | As a … | I want … | So that … | Priority | Points | AC |
|----------|--------|----------|-----------|----------|--------|----|
| F‑7.1 | user | adaptive training plan | plan adjusts when I miss workouts | **Must** | 8 | ‑ Missed workout triggers re‑plan.<br>‑ Notification sent. |

## Epic 8 · SME Business Coach Agent
| Story ID | As a … | I want … | So that … | Priority | Points | AC |
|----------|--------|----------|-----------|----------|--------|----|
| S‑8.1 | SME owner | daily digest with tasks & content drafts | start day focused | **Must** | 8 | ‑ 07:00 scheduler triggers OpenAI run.<br>‑ Push + email contain 3+ tasks, newsletter & 2 social ideas. |
| S‑8.2 | user | Kanban view of tasks | track progress | **Should** | 5 | ‑ Columns Today/Week/Roadmap.<br>‑ Drag updates status. |

## Epic 9 · Notifications & Emails
| Story ID | As a … | I want … | So that … | Priority | Points | AC |
|----------|--------|----------|-----------|----------|--------|----|
| N‑9.1 | user | mobile PWA push notifications | I get morning digest | **Must** | 5 | ‑ Service worker registers.<br>‑ Tap deep‑links to agent workspace. |
| N‑9.2 | user | summary email | access digest in inbox | **Must** | 3 | ‑ SendGrid template.<br>‑ Delivered within 2 min of push. |

## Epic 10 · Quality & Testing
| Story ID | As a … | I want … | So that … | Priority | Points | AC |
|----------|--------|----------|-----------|----------|--------|----|
| Q‑10.1 | dev team | unit tests on agent logic | prevent regressions | **Must** | 5 | ‑ >80 % coverage on core functions. |
| Q‑10.2 | QA | integration tests with mock OpenAI | verify orchestration | **Must** | 8 | ‑ Test harness simulates agent calls. |

## Epic 11 · Deployment & DevOps
| Story ID | As a … | I want … | So that … | Priority | Points | AC |
|----------|--------|----------|-----------|----------|--------|----|
| D‑11.1 | dev team | Docker Compose for Postgres + app | run locally easy | **Must** | 3 | ‑ `docker compose up` installs db + app. |
| D‑11.2 | dev team | CI pipeline (lint, test, build) | catch issues early | **Must** | 5 | ‑ PR must pass lint & tests. |

*End of initial backlog draft*

