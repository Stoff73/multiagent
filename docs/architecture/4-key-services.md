# 4 · Key Services

| Service                 | Responsibility                                                   | Runtime                       | Scaling                       |
| ----------------------- | ---------------------------------------------------------------- | ----------------------------- | ----------------------------- |
| **Next.js PWA**         | SSR pages, static assets, push notifications                     | Vercel Serverless / container | CDN & function auto‑scale     |
| **Auth Service**        | OAuth (Google, MS), JWT issue, refresh                           | NextAuth adapter              | Horizontal via edge functions |
| **Agent Router**        | Routes API `/agent/:id/chat` to Orchestrator pool                | Node 20                       | K8s HPA / Vercel regions      |
| **Orchestrator Worker** | Long‑running Node worker with OpenAI SDK, executes tool plug‑ins | Docker task on ECS Fargate    | CPU mem‑scale queue           |
| **Memory Service**      | CRUD on user/agent memory, embedding upsert/search               | NestJS microservice           | Scales w/ DB read replicas    |
| **Cache Layer**         | Short‑TTL free/busy, wearable stats                              | Redis cluster                 | Redis Cluster shards          |

---
