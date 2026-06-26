# Metamorphosis Agent Access Plan

## Goal

Expose Ivette's private wellness second brain to approved agents through three stable interfaces:

1. **CLI** for local automation.
2. **MCP** for Claude Code, Codex, Gemini CLI, and other agent clients.
3. **API** for mobile, browser, and remote Tailscale access.

## MVP rule

Do not wire public remote access until the private data model, authentication, and audit logs are working.

## Agent modules

- **Scribe**: capture journal entries, notes, voice dumps, and recipe ideas.
- **Seeker**: search memory across journals, rituals, recipes, music, and nutrition plans.
- **Librarian**: run weekly reports and identify stale or missing data.

## Future routes

- `POST /api/brain` — capture memory.
- `GET /api/brain?q=` — search memory after production database is connected.
- `POST /api/recipes` — create recipe.
- `POST /api/tracks` — add audio track.

## Tailscale phase

Add Tailscale after:

- auth is enabled,
- Supabase or Firebase persistence is verified,
- private routes are protected,
- rate limits and logs exist,
- Ivette approves the actual device access list.
