# 10 · Observability

- **Logging**: pino + Winston → AWS CloudWatch.
- **Metrics**: Prometheus / Grafana via side‑car.
- **Tracing**: OpenTelemetry instrumented (gateway → worker → DB).
- **Alerting**: PagerDuty based on p95 latency & error‑rate SLOs.

---
