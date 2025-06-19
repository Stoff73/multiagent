# 5 · Non‑Functional Requirements
| Category | Requirement |
|----------|-------------|
| Performance | First meaningful paint < 2 s on 3G mobile; chat latency < 2 s round‑trip |
| Accessibility | WCAG AA compliance; keyboard navigable chat |
| Security | OAuth 2.0 with PKCE; encrypt secrets; rate‑limit external API calls |
| Privacy | GDPR‑ready data export & delete; user‑scoped memory segregation |
| Scalability | Handle 5k DAU on single AWS Fargate cluster; pgvector for embeddings |

---
