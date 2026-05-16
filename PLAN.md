# Development Plan: Ustad - AI Service Orchestrator

## 1. Project Goal & Boundaries
**Goal**: Build a mobile-first Agentic AI service orchestration app for Pakistan's informal economy. Users can request services in Urdu, Roman Urdu, or English. The system autonomously extracts intents, discovers providers, simulates reasoning and booking.
**Scope**: 
- Single-page conversational UI imitating a mobile app (WhatsApp style).
- Client-side AI orchestration using `@google/genai`.
- Hardcoded/mock database of service providers (electricians, plumbers, AC technicians, etc. in major Pakistani areas).
- Multi-step reasoning UI (thought bubbles / logs) to demonstrate agent orchestration.
- Simulated executing actions (booking, dispatch).
**NOT to be built** (To prevent feature creep):
- Real provider accounts or provider-facing UI.
- Real maps integrations (mock locations using strings).
- Real payment processing or SMS/WhatsApp integrations.
- User authentication (assume a generic user).
- Voice input / speech-to-text (unless built-in browser API is trivially added).

## 2. Architecture
- **Frontend**: Next.js 15+ App Router, Tailwind CSS, Lucide React icons.
- **State Management**: React `useState` for chat and workflow state.
- **AI Orchestration Pipeline**:
  - `Intent Extraction Agent`: Parses the user prompt (extracts service, location, urgency, time).
  - `Provider Discovery Agent`: Queries the mock DB based on extracted parameters.
  - `Ranking & Decision Agent`: Filters and ranks the best providers based on distance, rating, and urgency.
  - `Execution Agent`: Simulates booking and generates conversational responses.
- **UI Architecture**:
  - Chat interface (bottom input, scrollable message history).
  - Agent Action Cards (collapsible "thought" logs showing the intermediate multi-agent steps).
  - Provider Cards for recommendations.

## 3. Milestones & Tasks

- [x] **Milestone 1: Project Setup & UI Scaffold**
  - [x] Initialize Shadcn (button, card, input, scroll-area, badge, avatar).
  - [x] Create mobile-first layout (max-width container, chat-like bottom nav).
  - [x] Implement empty chat state and message bubble components.

- [x] **Milestone 2: Mock Data & Types**
  - [x] Create mock provider dataset (names, services, ratings, locations like "G-13", "Bahria Town", base rates).
  - [x] Define TypeScript interfaces for Agent State, Request Intent, and Providers.

- [x] **Milestone 3: AI Orchestration Core (Gemini API)**
  - [x] Integrate `@google/genai` using structured outputs (Schema) for Intent Extraction.
  - [x] Implement the multi-step orchestration pipeline (extract -> query -> rank -> explain).
  - [x] Add streaming or simulated delays for intermediate steps to make reasoning visible.

- [x] **Milestone 4: Chat Interaction & Execution Flow**
  - [x] Connect chat input to the Orchestration Pipeline.
  - [x] Render intermediate "Agent Thinking" blocks in the chat (e.g., "Extracting intent...", "Finding plumbers in Bahria...").
  - [x] Render Final output with selected provider card and action buttons ("Confirm Booking", "Cancel").

- [x] **Milestone 5: Simulated Booking & Polish**
  - [x] Clicking "Confirm" triggers the Follow-up Simulation Agent (outputs ETA, receipt).
  - [x] Implement Auto-booking toggle and 60s countdown timer.
  - [x] Integrated ranking reasoning and mock map visualization.
  - [x] Final UI/UX styling (animations using `motion`, color scheme inspired by WhatsApp or local apps like Bykea - Greens/Yellows).
  - [x] Final linting & compilation.

## 4. Current Status
- All milestones completed. Added advanced agentic features: Auto-booking, explainable ranking, and contextual follow-ups.
