# 3 · Request Flow

1. **Browser → API Gateway**: All requests hit `/api/*` edge functions (Vercel/Node). Auth middleware validates JWT (NextAuth w/ Google/Microsoft).
2. **Chat message** forwarded to **Orchestrator** via REST.
3. Orchestrator packages prompt, retrieves **Shared Memory** (recent embeddings via Memory Service), and invokes **OpenAI Agent SDK** with streaming.
4. Tool calls emitted by SDK are handled by **Tool Handlers** running in the Orchestrator worker (calendar lookup, file scan, etc.).
5. Responses stream back to browser through **WebSocket (Socket.IO)** channel managed by API gateway.
6. Memory deltas (final assistant & user messages, tool outputs) are persisted to Postgres and relevant embeddings updated.

---
