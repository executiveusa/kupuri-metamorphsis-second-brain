# Metamorphosis Private Lab Build Notes

This build transforms the project from a generic wellness subscription shell into Ivette Milo's private wellness OS.

## Built into this package

- Rewritten landing page with locked butterfly hero and private-lab positioning.
- Rebuilt member navigation.
- Today dashboard.
- Journal capture module.
- Habit and ritual tracker.
- His-and-hers recipe builder.
- Audio/music library using the existing audio player.
- Second-brain command center.
- Insights page with nutrition-plan macro history.
- Local-first storage for MVP testing.
- API route scaffolds for recipes, tracks, and brain notes.
- PRD, build plan, brand tokens, Grok Imagine hero prompt, Supabase schema, and agent access plan.

## Not yet production-complete

- Real user authentication.
- Production Supabase/Firebase persistence.
- File upload pipeline.
- True semantic search.
- Real MCP server.
- Tailscale remote access.

## Correct next command

```bash
pnpm install
pnpm dev
```

Open `/app` first, not the old pricing page.
