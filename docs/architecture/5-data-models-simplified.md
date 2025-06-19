# 5 · Data Models (simplified)

## 5.1 Relational Tables

```sql
agents(id PK, name, system_prompt, user_prompt, model, accent_token, enabled bool);
users(id PK, provider_uid, email,…);
user_agents(user_id FK, agent_id FK, enabled_at);
conversations(id PK, user_id FK, agent_id FK, title, created_at);
messages(id PK, conv_id FK, role, content, tool_call jsonb, created_at);
```

## 5.2 Vector Table

```sql
vector_memory(id PK, user_id FK, agent_scope, embedding vector(1536), payload jsonb);
```

---
