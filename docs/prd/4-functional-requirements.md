# 4 · Functional Requirements
## 4.1 Home Dashboard
- F‑1 Display KPI stat cards (*Tasks Today, Calories Remaining, Upcoming Meetings*).  
- F‑2 Show grid of **Agent Cards** (Admin, Nutrition, Fitness, SME).  
- F‑3 Paginate grid when > 12 agents (post‑MVP marketplace).  
- F‑4 Deep‑link entry: if landing from push‑notification/email, bypass dashboard and open target agent.

## 4.2 Agent Workspaces (Shared Skeleton)
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

## 4.3 Daily Digest Automation
- F‑9 At 07:00 local time, system generates digest via SME Coach.  
- F‑10 Send **push notification** (PWA) + summary email.  
- F‑11 Deep‑link opens SME workspace.

## 4.4 Unified OAuth Connect
- F‑12 Single “Connect Your Services” wizard with providers (Google, Microsoft, Apple, Wearables).  
- F‑13 Show progress bar (3‑step) and per‑provider error handling.

## 4.5 Privacy & Settings
- F‑14 PrivacyScopeModal lets users toggle which memories flow between agents.  
- F‑15 Settings page for profile, password, notification preferences.

---
