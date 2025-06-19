# 8 · Deployment Topology (MVP)

- **Local Dev**: Docker Compose (Next.js, Postgres‑pgvector, Redis, Orchestrator).
- **Cloud (Stage)**: AWS → API Gateway + Lambda (edge) for Next functions, ECS Fargate for workers, RDS Postgres, Elasticache Redis, S3 object store.
- **CI/CD**: GitHub Actions → push triggers build, unit tests, container publish, Terraform apply.

---
