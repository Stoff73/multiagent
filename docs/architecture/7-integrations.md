# 7 · Integrations

| Domain           | Provider                      | Method                           |
| ---------------- | ----------------------------- | -------------------------------- |
| Calendar & Email | Google API, Microsoft Graph   | OAuth 2.0 • REST                 |
| Wearables        | HealthKit, Google Fit, Fitbit | OAuth / device sync file         |
| Storage          | Google Drive, OneDrive        | OAuth + webhook for file updates |

All integrations routed through **Webhook Proxy** which validates signatures and publishes events to Orchestrator via Redis.

---
