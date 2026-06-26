# Stage 03: Delivery - Output Generation

## Stage Purpose
Transform synthesized insights into final, formatted deliverables. Apply Ivette's preferred formats, styles, and delivery mechanisms.

## When Invoked
When Ivette wants to:
- Create a script, report, or presentation
- Format content for a specific audience or medium
- Generate a deliverable from synthesized insights
- Package outputs for sharing or storage

## Input Requirements
- **Layer 3 (Reference)**: Delivery format guides, template specifications
- **Layer 4 (Working)**: All files from 02_synthesis/output/ as primary working material

## Process
1. Load synthesized insights from 02_synthesis/output/
2. Apply formatting rules defined in Layer 3 references
3. Structure output according to delivery requirements
4. Add metadata and attribution as needed
5. Save formatted deliverables to this stage's output directory

## Outputs
- Formatted deliverables (scripts, reports, presentations, etc.)
- Metadata file describing output format and source attribution
- Any supplementary materials (slides, diagrams, etc.)

## Output Example
```markdown
# Q2 BUDGET REVIEW PRESENTATION

## Slide 1: Executive Summary
- Total budget variance: +12%
- Key driver: Social media campaign ROI
- Recommendation: Maintain current allocation

## Slide 2: Detailed Breakdown
[Content derived from RAW_20260624_AUDIO_001, synthesis_02_insights.md]

## Delivery Metadata
- Format: Presentation script
- Source: Synthesis insights from 02_synthesis/output/
- Confidence: 94%
- Last reviewed: 2026-06-24
```

## Output Variations
- Scripts → formatted as video scripts or dialogue
- Reports → structured with headings, bullet points, and sections
- Presentations → slide-by-slide breakdown with timing
- Emails → concise, action-oriented format

## Agent Signaling
When delivery completes, generate signal:
"## DELIVERY_COMPLETE -- Ready for review -- format: {output_format}"