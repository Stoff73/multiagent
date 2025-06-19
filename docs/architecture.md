# System Design Specification — **AthenaOS** MVP v0.5

*(Owner : Winston – Architect • Updated 17 Jun 2025)*

---

## 1 · Objective

Provide a production‑ready architecture that fulfils the MVP requirements defined in the PRD and Backlog while leaving a clear runway for scale, additional agents, and regulated‑data compliance.

---

## 2 · High‑Level Component Diagram

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

## 3 · Request Flow

1. **Browser → API Gateway**: All requests hit `/api/*` edge functions (Vercel/Node). Auth middleware validates JWT (NextAuth w/ Google/Microsoft).
2. **Chat message** forwarded to **Orchestrator** via REST.
3. Orchestrator packages prompt, retrieves **Shared Memory** (recent embeddings via Memory Service), and invokes **OpenAI Agent SDK** with streaming.
4. Tool calls emitted by SDK are handled by **Tool Handlers** running in the Orchestrator worker (calendar lookup, file scan, etc.).
5. Responses stream back to browser through **WebSocket (Socket.IO)** channel managed by API gateway.
6. Memory deltas (final assistant & user messages, tool outputs) are persisted to Postgres and relevant embeddings updated.

---

## 4 · Key Services

| Service                 | Responsibility                                                   | Runtime                       | Scaling                       |
| ----------------------- | ---------------------------------------------------------------- | ----------------------------- | ----------------------------- |
| **Next.js PWA**         | SSR pages, static assets, push notifications                     | Vercel Serverless / container | CDN & function auto‑scale     |
| **Auth Service**        | OAuth (Google, MS), JWT issue, refresh                           | NextAuth adapter              | Horizontal via edge functions |
| **Agent Router**        | Routes API `/agent/:id/chat` to Orchestrator pool                | Node 20                       | K8s HPA / Vercel regions      |
| **Orchestrator Worker** | Long‑running Node worker with OpenAI SDK, executes tool plug‑ins | Docker task on ECS Fargate    | CPU mem‑scale queue           |
| **Memory Service**      | CRUD on user/agent memory, embedding upsert/search               | NestJS microservice           | Scales w/ DB read replicas    |
| **Cache Layer**         | Short‑TTL free/busy, wearable stats                              | Redis cluster                 | Redis Cluster shards          |

---

## 5 · Data Models (simplified)

### 5.1 Relational Tables

```sql
agents(id PK, name, system_prompt, user_prompt, model, accent_token, enabled bool);
users(id PK, provider_uid, email,…);
user_agents(user_id FK, agent_id FK, enabled_at);
conversations(id PK, user_id FK, agent_id FK, title, created_at);
messages(id PK, conv_id FK, role, content, tool_call jsonb, created_at);
```

### 5.2 Vector Table

```sql
vector_memory(id PK, user_id FK, agent_scope, embedding vector(1536), payload jsonb);
```

---

## 6 · Shared Memory Strategy

| Scope              | Key                                         | Storage                     | TTL                 |
| ------------------ | ------------------------------------------- | --------------------------- | ------------------- |
| **User‑global**    | "caloric\_goal", "preferred\_focus\_blocks" | vector\_memory              | ∞ (explicit delete) |
| **Agent‑specific** | SME tasks, meal‑logs                        | vector\_memory w/ agent tag | ∞                   |
| **Ephemeral**      | Calendar free/busy slots                    | Redis                       | 5 min               |

Retrieval: similarity > 0.82 cosine and recency weight; fallback to keyword search.

---

## 7 · Integrations

| Domain           | Provider                      | Method                           |
| ---------------- | ----------------------------- | -------------------------------- |
| Calendar & Email | Google API, Microsoft Graph   | OAuth 2.0 • REST                 |
| Wearables        | HealthKit, Google Fit, Fitbit | OAuth / device sync file         |
| Storage          | Google Drive, OneDrive        | OAuth + webhook for file updates |

All integrations routed through **Webhook Proxy** which validates signatures and publishes events to Orchestrator via Redis.

---

## 8 · Deployment Topology (MVP)

- **Local Dev**: Docker Compose (Next.js, Postgres‑pgvector, Redis, Orchestrator).
- **Cloud (Stage)**: AWS → API Gateway + Lambda (edge) for Next functions, ECS Fargate for workers, RDS Postgres, Elasticache Redis, S3 object store.
- **CI/CD**: GitHub Actions → push triggers build, unit tests, container publish, Terraform apply.

---

## 9 · Security & Compliance

- **JWT** signed with RS256, 15 min expiry, silent refresh.
- **PII & health data** encrypted at rest (AES‑256, Postgres TDE).
- **OAuth token storage** via NextAuth DB adapter (hashed refresh tokens).
- GDPR‑ready data export & delete endpoints.

---

## 10 · Observability

- **Logging**: pino + Winston → AWS CloudWatch.
- **Metrics**: Prometheus / Grafana via side‑car.
- **Tracing**: OpenTelemetry instrumented (gateway → worker → DB).
- **Alerting**: PagerDuty based on p95 latency & error‑rate SLOs.

---

## 11 · Non‑Functional Targets

| Metric                                 | MVP Target                 |
| -------------------------------------- | -------------------------- |
| p95 chat latency (browser→first token) | ≤ 2.5 s local; ≤ 4 s cloud |
| Uptime (rolling 30 d)                  | 99 %                       |
| Cold OAuth connect success             | 95 %                       |
| Vector search p95                      | ≤ 150 ms                   |

---

## 12 · Open Architecture Questions

1. Do we enable streaming SSE from edge functions (Vercel) or WebSocket only?
2. Is pgvector acceptable for production launch, or migrate to managed Pinecone after 100k embeddings?
3. For Firehose data (wearables) beyond 1 Hz, do we need time‑series DB (Timescale) in v0.6?

---

*End of Architecture Spec — ready for developer scaffolding & infra IaC.*

