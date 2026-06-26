# Stage 02: Synthesis - Pattern Discovery

## Stage Purpose
Transform ingested data into actionable insights. Identify patterns, synthesize research, and extract meaning from collected material.

## When Invoked
When Ivette wants to:
- Synthesize research materials
- Find connections between disparate notes
- Generate insights from raw data
- Identify patterns and relationships
- Create summaries, outlines, or syntheses

## Input Requirements
- **Layer 3 (Reference)**: IVoice guide, conventions.md, and research methodology references
- **Layer 4 (Working)**: All files from 01_ingestion/output/ as working material
- **Layer 4 (Additional)**: Optional: Specific research questions or synthesis goals

## Process
1. Load all raw inputs from 01_ingestion/output/
2. Apply synthesis rules defined in Layer 3 references
3. Identify patterns and connections using Understand-Anything symbol lookup
4. Synthesize into narrative or structured form as defined by process
5. Format according to output requirements

## Outputs
- Primary output: synthesized insights as markdown file
- Optional: pattern graph, connection map, or summary document
- Symbolized outputs stored in stage's output directory

## Output Example
```markdown
# SYNTHESIZED INSIGHT: Budget Review 2026-Q2

## Key Connections Found
- Budget review notes connect to client_john_doe meeting on June 20
- Cash flow projections align with social media sentiment analysis
- Vendor payment schedules match quarterly reporting dates

## Recommendations Generated
1. Adjust Q3 vendor payment timing to match expected cash inflow
2. Follow up with client_john_doe on unaddressed concerns from June 20 meeting
3. Allocate additional resources to high-priority deliverables

## Source Attribution
- Derived from: RAW_20260624_AUDIO_001, docs/finance/q2_projections.pdf
- Connection strength: 87% (based on entity overlap analysis)
- Confidence: 92% (multi-source validation)
```

## Output Variations
- Research synthesis → thematic analysis with source citations
- Note processing → categorized and tagged insights
- Meeting analysis → action item extraction and prioritization
- Trend analysis → pattern identification and future projections

## Agent Signaling
When synthesis completes, generate signal:
"## SYNTHESIS_COMPLETE -- Ready for formatting -- source_count: {file_count}"