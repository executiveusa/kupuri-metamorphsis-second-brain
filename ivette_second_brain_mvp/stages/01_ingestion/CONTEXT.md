# Stage 01: Ingestion - Input Capture

## Stage Purpose
Capture raw inputs and prepare them for processing. This stage handles raw material collection, conversion, and storage in preparation for synthesis.

## When Invoked
When Ivette provides raw inputs such as:
- Meeting notes, recordings, or transcripts
- New research materials, articles, or books
- Social media content or email correspondence
- Any document or media to be processed

## Input Requirements
- **Layer 3 (Reference)**: Existing conventions and workflow references
- **Layer 4 (Working)**: Named internal input identifiers (e.g., "audios/in_meeting_2026_06_24.mp3")
- **Layer 4 (Additional)**: Any user-provided raw input text or references

## Process
1. Capture all inputs into a unified raw format
2. Tag inputs with:
   - Source metadata
   - Recency/urgency
   - Semantic category
   - Initial organization parameters
3. Store as Layer 4 working artifacts in this stage's output path
4. Build internal symbol index for rapid retrieval

## Outputs
- Each input is saved to `01_ingestion/output/RAW_{timestamp}_trackingID.{original_extension}`
- Symbol index stored as `index.json` for rapid retrieval
- Source metadata stored in `sources.json`

## Output Example
```json
{
  "ingested_files": [
    {
      "timestamp": "2026-06-24T14:30:00",
      "source": "audio",
      "tracking_id": "RAW_20260624_AUDIO_001",
      "original_path": "audios/meeting_jun_24.mp3",
      "review_level": "all",
      "tags": ["client_john_doe", "budget_review"]
    }
  ],
  "symbol_index": {
    "category": "audio",
    "entities": ["meeting", "client", "budget"]
  }
}
```

## Notes
- Ingestion must complete before moving to synthesis
- All inputs are treated as raw until explicitly processed
- Symbol index enables fast searching across ingested materials
- Index updates automatically when new inputs arrive

## Agent Signaling
When ingestion completes, generate signal:
"## INGESTION_COMPLETE {tracking_id} -- Ready for synthesis -- source: {input_type}"