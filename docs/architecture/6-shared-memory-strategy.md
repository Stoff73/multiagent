# 6 · Shared Memory Strategy

| Scope              | Key                                         | Storage                     | TTL                 |
| ------------------ | ------------------------------------------- | --------------------------- | ------------------- |
| **User‑global**    | "caloric\_goal", "preferred\_focus\_blocks" | vector\_memory              | ∞ (explicit delete) |
| **Agent‑specific** | SME tasks, meal‑logs                        | vector\_memory w/ agent tag | ∞                   |
| **Ephemeral**      | Calendar free/busy slots                    | Redis                       | 5 min               |

Retrieval: similarity > 0.82 cosine and recency weight; fallback to keyword search.

---
