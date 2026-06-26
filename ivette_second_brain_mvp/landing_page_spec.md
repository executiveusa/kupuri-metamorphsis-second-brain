# Ivette's Second Brain - Landing Page Specification

## Visual Identity
- **Vibe**: Minimalist, High-End, "Digital Sanctuary"
- **Colors**: Deep Slate, Soft Gold, Off-White (Luxe Aesthetic)
- **Typography**: Inter (Sans) + Playfair Display (Serif for headings)

## Layout Structure

### 1. Hero Section
- **Title**: "Welcome to your Second Brain"
- **Subtitle**: "A symbiotic intelligence system for life's most important connections."
- **CTA**: [Start Ingestion] [Run Weekly Review] [Ask your Brain]

### 2. System Health Dashboard
- **Stats Grid**:
  - Total Knowledge Nodes (Count)
  - Index Freshness (Percentage)
  - Active Agent (Current Stage)
  - Last Synthesis (Timestamp)
- **System Status**: [Online/Offline] [Tailscale Connected] [MCP Active]

### 3. Active Workflow Visualizer
- **ICM Pipeline View**: A horizontal timeline showing:
  - Ingestion $\rightarrow$ Synthesis $\rightarrow$ Delivery $\rightarrow$ Review
  - Highlight current stage with a glowing gold border
  - Show active "Working Artifacts" (Layer 4 files) currently being processed

### 4. Quick Action Command Center
- **Command Bar**: A search-like bar where Ivette can type natural language commands (which the CLI then processes)
- **Preset Shortcuts**:
  - "Triage my Inbox"
  - "Plan my Week"
  - "Connect my latest notes"
  - "Audit my Vault"

### 5. Knowledge Graph Preview
- An interactive 3D graph (using Force-Directed Graph) showing the connections between notes, people, and projects.
- Ability to click a node and jump to the corresponding Obsidian file.

## Technical Implementation
- **Frontend**: React + Tailwind 4 + Framer Motion
- **State**: Real-time updates via WebSocket from the `ivette-brain-api`
- **Routing**: Next.js app router
- **Integration**: Direct calls to the CLI/MCP bridge via the API server

---

*Designed under EMERALD TABLETS™ Protocol v4.5 | Authority: Kupuri Media™ × Akash Engine*