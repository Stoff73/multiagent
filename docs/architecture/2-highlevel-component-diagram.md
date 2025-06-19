# 2 · High‑Level Component Diagram

```
┌──────────────────┐    HTTPS    ┌───────────────────────────┐
│  Next.js 14 PWA  │◀──────────▶│  API Gateway (Next API)    │
│  (React + SSR)   │            │  /api/* edge functions     │
└──────────────────┘            │  ‑‑ Auth Service           │
        ▲ ▲                    │  ‑‑ Agent Router           │
        │ │                    │  ‑‑ Webhook Proxy          │
  (PWA push)│                  └─────────▲───────────────────┘
        │ │                               │
        │ └──────── gRPC/REST ────────────┘
        │                                 │
┌───────┴────────┐      WebSocket      ┌──┴──────────────────┐
│  Orchestrator  │◀───────────────────▶│  OpenAI Agent SDK  │
│  (Node worker) │                    └──┬──────────────────┘
└──┬─────────────┘                       │
   │ async jobs (BullMQ)                │ HTTPS
   │                                     ▼
┌──┴──────────────┐           ┌──────────────────────────────┐
│ Memory Service  │◀────────▶│  Postgres + pgvector          │
│ (embeddings &   │   SQL     │  • agents                    │
│  user context)  │           │  • conversations             │
└────────┬────────┘           │  • vector_memory (pgvector)  │
         │                    └───────────┬──────────────────┘
         │ Redis pub/sub                   │ S3
         ▼                                ▼
 ┌────────────────┐            ┌──────────────────────────────┐
 │  Cache Layer   │            │  Object Storage (uploads)    │
 │   (Redis)      │            └──────────────────────────────┘
```

---
