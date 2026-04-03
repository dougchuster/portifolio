<!-- BEGIN:vinext-agent-rules -->
# Vinext — Next.js API surface on Vite

This project uses vinext (Cloudflare), a drop-in replacement for Next.js that runs on Vite.

- All `next/*` imports are automatically shimmed by vinext — no import rewrites needed.
- App Router, Pages Router, RSC, Server Actions, and Middleware all work as-is.
- Config: `next.config.ts` is compatible (vinext reads it directly).
- Dev server: `vinext dev` (uses Vite under the hood).
- Deploy: `vinext deploy` to Cloudflare Workers.
<!-- END:vinext-agent-rules -->
