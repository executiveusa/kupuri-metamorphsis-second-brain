# Layer 1: Global Task Routing - Task Dispatcher

## Available Task Routes

Given Ivette's request, choose one of these paths:

### **01_ingestion** - Knowledge & Data Ingestion
Route when Ivette asks to:
- Process new files, notes, recordings
- Index scanned documents
- Transcribe audio meetings
- Research topics
- Ingest web data or social media
- Import into her personal vault

**When Ivette says**: "Save this: memo...", "Import audio...", "Research...

**Context**: Layer 1 exists to identify data ingestion tasks and route to the appropriate stage. It does NOT contain stage details or controls - only routing logic.

### **02_synthesis** - Insight Creation
Route when Ivette asks to:
- Synthesize research findings
- Create connections between notes
- Extract themes and patterns
- Generate summaries or drafts
- Process, refine, and combine information

**When Ivette says**: "Synthesize my notes on...

### **03_delivery** - Output Formatting
Route when Ivette asks to:
- Format notes, scripts, or research in specific forms
- Create structured outputs (reports, presentations, outlines)
- Convert to new formats (text→audio, text→presentation)
- Package for distribution or storage

**When Ivette says**: "Create a script...", "Format my research...", "Create a report

### **04_review** - Quality Assurance and Validation
Route when Ivette asks to:
- Review and validate output
- Edit stage outputs
- Approve or reject stage results
- Final verification of deliverables

**When Ivette says**: "Review...", "Edit", "Does this make sense?", "Can you improve?", "Check this"

## Routing Decision Logic

### Primary Routing Rules
1. If Ivette's request involves creating, uploading, or processing new input → route to **01_ingestion**
2. If Ivette's request involves transforming existing inputs into new formats or insights → route to **02_synthesis** 
3. If Ivette's request involves formatting output into specific deliverables → route to **03_delivery**
4. If Ivette's request involves checking, editing, or approving → route to **04_review**

### Routing Examples
**Input Example** → "Save this audio recording to my vault"
→ Route: 01_ingestion

**Input Example** → "Research my notes about quantum computing and find connections"
→ Route: 02_synthesis

**Input Example** → "Create a presentation based on my research"
→ Route: 03_delivery

**Input Example** → "Review my draft and suggest improvements"
→ Route: 04_review

### Exception Handling
If Ivette says "Run all stages", route to sequential stages: 01 → 02 → 03 → 04

If Ivette says "What can I do?" or "Show me options", present all available task routes

---

## Systemic Loop
The system follows a single-stage-at-a-time execution model with human-in-the-loop review:
1. Execute selected stage
2. Write output to stage/output/
3. User reviews output
4. User edits if needed (directly in files)
5. Loop to next stage (continues until user exits)

## Get Started
To begin, Ivette can say "Ingest my latest meeting audio" or "Save this note: [note content]" or ask any question about her data.

---

## Dependencies
**Layer 2 Stage Contracts** define what each stage needs and produces:
Refer to stages/01_ingestion/CONTEXT.md for ingestion requirements
Refer to stages/02_synthesis/CONTEXT.md for synthesis requirements
Refer to stages/03_delivery/CONTEXT.md for delivery requirements
Refer to stages/04_review/CONTEXT.md for review requirements

**Layer 3 Reference**: Private content:
- _config/ivette_voice.md - Ivette's preferred voice style
- _config/conventions.md - Content conventions and formatting
- references/ - Research references and source materials

**Layer 4 Working Artifacts**: Stage-specific output directories:
- stages/01_ingestion/output/ - Ingested data
- stages/02_synthesis/output/ - Synthesized insights  
- stages/03_delivery/output/ - Formatted deliverables
- stages/04_review/output/ - Reviewed and approved outputs

---

*Generated: 2026-06-24 | Authority: Ivette_Milo_Second_Brain | Protocol: ICM (Interpretable Context Methodology)*