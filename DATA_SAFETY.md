# DATA SAFETY — Ivette Private Lab

Metamorphosis will store sensitive personal data: journal entries, meals, nutrition targets, habits, recipes, relationships, health context, audio preferences, and second-brain notes.

## Default posture

Private by default.

No public indexing.  
No public sharing without explicit action.  
No analytics over journal contents.  
No agent deletion of personal data without confirmation.  
No silent model training on private data.

## Required protections

- Auth-gated access before production use
- User-scoped database rows
- Export to JSON
- Export to Markdown / Obsidian
- Local backup option
- Weekly full backup option
- Secrets never committed to git
- Admin tools hidden unless explicitly enabled
- Agent actions logged
- Destructive actions require confirmation

## Agent safety rules

Agents can suggest, summarize, organize, and create drafts.

Agents cannot:

- delete journal entries without confirmation
- overwrite nutrition targets without confirmation
- expose private notes publicly
- send private health information to external tools without approval
- change backup or sync settings without approval

## Data export baseline

Every core module must eventually support export:

- Journal → Markdown and JSON
- Habits → JSON and CSV
- Recipes → JSON, Markdown, grocery list
- Meal plans → Markdown and grocery list
- Brain notes → Markdown / Obsidian compatible
