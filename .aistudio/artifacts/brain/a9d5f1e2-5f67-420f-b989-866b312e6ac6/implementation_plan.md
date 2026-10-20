# SRC Cosmic Encyclopedia & Orbital Telemetry Platform

This plan outlines the evolution of the **SRC Planetary & Lunar Telemetry System** from a single-overlay 3D simulation into a comprehensive, multi-section astrophysical encyclopedia and spacecraft archive. Every planet and major spacecraft receives its own multi-section monograph with the same depth as the Sun dossier, unified by an expandable sidebar directory, a side-by-side comparator tool, and seamless 3D camera fly-to integration.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and product choices incorporate your confirmed preferences from the planning questionnaire and preserve all existing 3D simulation, HUD opacity, and SRC telemetry capabilities.

- **Confirmed Decision 1 — Expandable Nested Sidebar Directory**: Navigation across the encyclopedia and 3D viewport is driven by a structured, collapsible sidebar directory with nested tree groups for **01. Stellar Core (The Sun)**, **02. Terrestrial Worlds**, **03. Gas & Ice Giants**, **04. Major Probes, Telescopes, Rovers & Stations**, and **05. Telemetry Comparator**.
- **Confirmed Decision 2 — Full-Depth Multi-Section Planet Pages**: Each of the 8 planets (**Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune**) receives its own dedicated monograph page divided into distinct sections matching the Sun dossier's depth: *10-Metric Telemetry & Atmospheric Spectrum*, *How the Planet Works (Internal Dynamo, Core & Magnetosphere)*, *Formation & Planetary Evolution*, *Future Fate & Long-Term Destiny*, *Natural Satellites Compendium*, and *Scientific Anomalies & Fun Facts*.
- **Confirmed Decision 3 — Comprehensive Spacecraft & Probes Section**: Covers all major categories of human spaceflight hardware—**Deep-Space Planetary Probes** (*Voyager 1 & 2, Cassini-Huygens, Juno, New Horizons, Parker Solar Probe*), **Space Telescopes** (*James Webb Space Telescope, Hubble Space Telescope*), **Planetary Surface Rovers** (*Curiosity & Perseverance Mars Rovers*), and **Orbital Stations & Constellations** (*International Space Station, GPS Block III, Starlink*)—each with full multi-section dossiers.
- **Confirmed Decision 4 — Interactive Comparator & Direct 3D Camera Links**: Includes a dedicated **Planet & Probe Comparator** for side-by-side metric and mission analysis, plus direct **"Focus in 3D Simulation"** actions on every planet, moon, and spacecraft section.

---

### 1. Overview & Core Concept

- **What It Does**: Combines a real-time 3D WebGL heliocentric and spacecraft simulation with an encyclopedic, multi-page scientific monograph platform. Users can seamlessly pivot between inspecting 3D orbits and reading deep-dive technical monographs on the Sun, each individual planet, natural moons, and humanity's flagship space probes, rovers, telescopes, and orbital stations.
- **Target Audience / Persona**: Space enthusiasts, astrophysics students, educators, and sci-fi telemetry fans seeking both visual 3D spatial intuition and authoritative, deep scientific reference material.
- **Key Value**: Elevates the app from a brief summary viewer into an exhaustive, self-contained cosmic reference platform where every celestial body and historic spacecraft has structured chapters on internal physics, origin, mission architecture, timeline, and anomalies.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **3D Simulation & Opacity-Controlled HUD**: Users begin in the interactive 3D Solar System (with the persistent top-left `HUD Opacity` slider `0%–100%`, left quick-switch Planet & conditional Moon bars, and top-right launch buttons into the Encyclopedia).
  2. **Expandable Nested Sidebar Directory**: Opening the Encyclopedia reveals a persistent, collapsible left directory tree organizing the entire site into expandable categories:
     - **The Sun (Sol)**: Direct link to the complete stellar monograph.
     - **Planets (8 Dedicated Pages)**: Individual expandable entries for *Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus,* and *Neptune*, with sub-anchors to jump directly to *Internal Structure & Physics*, *Formation & Origin*, *Future Destiny*, *Moons*, or *Fun Facts*.
     - **Probes, Rovers, Telescopes & Stations**: Categorized entries for *Voyager 1 & 2*, *James Webb Space Telescope*, *Hubble Space Telescope*, *Cassini-Huygens*, *Juno*, *Parker Solar Probe*, *New Horizons*, *Perseverance & Ingenuity*, and the *International Space Station*.
     - **Telemetry Comparator**: Side-by-side comparison workspace for any two planets or any two spacecraft.
  3. **Individual Planet Monograph Experience**: Selecting any planet opens its dedicated multi-section page featuring:
     - **Section A — Hero Profile, 10-Metric Telemetry & Atmospheric Composition**: High-resolution NASA imagery, tabular physical/orbital metrics, and elemental gas composition bars.
     - **Section B — How It Works (Internal Layers, Core Dynamo & Weather Engine)**: Concentric internal layer cards (crust, mantle, liquid metallic hydrogen ocean, rocky/iron core) and atmospheric physics.
     - **Section C — How It Formed (Accretion & Early Solar History)**: 4-stage planetary formation and migration chronology.
     - **Section D — Long-Term Evolution & Fate**: Chronological timeline of how the planet will evolve over billions of years (tidal locking, core cooling, atmospheric loss, or Red Giant engulfment).
     - **Section E — Natural Satellites & Ring Systems**: Detailed cards for each moon with direct 3D camera lock triggers.
     - **Section F — Planetary Anomalies & Mind-Blowing Fun Facts**: 6–8 curated scientific phenomena specific to that world.
  4. **Major Probes & Satellites Monograph Experience**: Selecting any probe, rover, telescope, or station displays its dedicated multi-section technical dossier:
     - **Section A — Mission Profile & 10-Point Hardware Telemetry**: Launch date, operator, mass, power source (RTG vs. solar array), propulsion system, communication band, current distance/orbit, and operational status.
     - **Section B — How the Spacecraft Works (Propulsion, Power & Scientific Payload)**: Breakdown of core subsystems and onboard scientific instruments.
     - **Section C — Mission Chronology & Gravity-Assist Trajectory**: Key launch, flyby, orbital insertion, and landing milestones.
     - **Section D — End-of-Mission Fate & Legacy**: How the mission concluded (e.g. Cassini's Grand Finale plunge into Saturn) or when its power/propellant will expire (e.g. Voyager RTG depletion in the 2030s).
     - **Section E — Major Discoveries & Engineering Anomalies**: Landmark scientific breakthroughs and engineering feats.
  5. **Direct 3D Camera Fly-To Integration**: Every planet page, moon card, and spacecraft dossier includes a prominent **Focus in 3D Simulation** control that closes the reading view and smoothly interpolates the 3D camera to lock onto that target.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Precision Aerospace & Astrophysical Telemetry (`Science, Space & Biotech` aesthetic DNA).
  - *Color Palette & Mood*:
    - **60% Dominant Primary Canvas**: Deep space obsidian (`#07080c` to `#0b0e17`) with the subtle `0.09` opacity SRC vector watermark in reading views.
    - **30% Structural Surfaces**: Crisp slate panels (`rgba(14, 17, 26, 0.88)`) with `1px` hairline borders (`rgba(0, 240, 255, 0.18)` and `rgba(255, 255, 255, 0.08)`).
    - **10% Precision Telemetry Accents**: Calibrated laser cyan (`#00f0ff`) for planetary/orbital telemetry, solar amber (`#f59e0b`) for stellar and thermal metrics, and emerald (`#10b981`) for active mission status.
  - *Typography & Hierarchy*: `Chakra Petch` for structured technical headings, clean sans-serif for long-form scientific prose (`65ch–75ch` reading measure), and `JetBrains Mono` (`tabular-nums`) for all numerical telemetry, coordinates, and comparison tables.
  - *Component Styling & Layout*: Asymmetric split console in 3D mode; two-column expandable sidebar (`280px` width) + responsive reading canvas (`max-w-6xl`) in Encyclopedia mode. Clean hairline borders and unboxed typographic metadata separators (`·`) adhering to strict anti-slop restraint.

- **Interactive Feedback & Motion**:
  - Smooth `150ms` sidebar accordion expansion and section tab switching.
  - Instant sub-section scroll-spy / anchor jumping within long planet and probe monographs.
  - Frame-rate independent exponential camera damping (`THREE.MathUtils.damp`) when flying from a text dossier to a 3D planet, moon, or spacecraft model.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dedicated Per-Body Multi-Section Monographs vs. Single Scrolling Feed**
  - *Chosen Approach*: Render each planet, the Sun, and each probe/satellite as its own dedicated, richly structured monograph view navigated via the expandable sidebar directory (plus an "All Worlds Overview" index option).
  - *Why*: With Sun-level depth across 8 planets and 10+ spacecraft, a single continuous scroll page would exceed 15,000 words and overwhelm navigation. Dedicated views with sub-section jump links keep switching instant and structured like a true digital encyclopedia.
  - *Alternatives Considered*: Putting all 8 full planet monographs on a single scrolling page was rejected due to excessive DOM weight and scroll fatigue.

- **Decision 2: Unified Planet & Spacecraft Comparator**
  - *Chosen Approach*: Provide an interactive side-by-side comparator tool where users can choose either **Compare Planets** (comparing diameter, mass, gravity, surface temp, moons, internal layers, and fate) or **Compare Spacecraft** (comparing launch year, velocity, mass, power source, distance, and mission duration).
  - *Why*: Directly fulfills the confirmed user request for a comparator tool and makes quantitative differences across worlds and probes immediately tangible.

- **Decision 3: Resilient Imagery with Procedural SVG Fallbacks**
  - *Chosen Approach*: Pair curated NASA public domain archival photography with automatic, body-specific procedural SVG diagrams on image error/load states.
  - *Why*: Guarantees zero broken image icons even under restricted network conditions while preserving authentic NASA visual documentation.

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                     Application Root & Global State Store                    │
│  • activeMode: 'simulation3d' | 'encyclopedia'                               │
│  • encyclopediaRoute: { category: 'sun'|'planet'|'probe'|'compare', id }     │
│  • selected3DTarget: { type: 'sun'|'planet'|'moon'|'probe', id }             │
│  • hudOpacity (0–100), timeSpeed, showOrbits, isWireframe                    │
└───────────────────┬──────────────────────────────────────┬───────────────────┘
                    │                                      │
                    ▼                                      ▼
┌───────────────────────────────────────┐  ┌───────────────────────────────────┐
│     3D Telemetry Simulation Layer     │  │   SRC Cosmic Encyclopedia Shell   │
│  • CosmicViewport (Three.js WebGL)    │  │  • Persistent SRC 0.09 Watermark  │
│    - Sun, 8 Planets, 14 Moons, Rings  │  │  • Top Breadcrumb & 3D Return Bar │
│    - 3D Probes & Orbital Stations     │  │  • Expandable Sidebar Directory   │
│  • Persistent HUD Opacity Control     │  │    ├─ 01. The Sun (Sol)           │
│  • Left Planet & Conditional Moon Bar │  │    ├─ 02. Terrestrial Planets     │
│  • Top-Right Quick Launch Buttons     │  │    ├─ 03. Gas & Ice Giants        │
└───────────────────────────────────────┘  │    ├─ 04. Probes, Rovers & Scopes │
                                           │    └─ 05. Telemetry Comparator    │
                                           └───────────────┬───────────────────┘
                                                           │
                    ┌──────────────────────────────────────┼──────────────────────────────────────┐
                    ▼                                      ▼                                      ▼
┌───────────────────────────────────────┐  ┌───────────────────────────────────┐  ┌───────────────────────────────────┐
│   Sun & Planet Monograph View         │  │  Probes & Satellites Monograph    │  │   Planet & Probe Comparator View  │
│  • Hero + 10-Metric Telemetry Grid    │  │  • Mission & Hardware Telemetry   │  │  • Dual Mode: Planets | Probes    │
│  • Atmospheric / Elemental Bars       │  │  • Propulsion, Power & Instruments│  │  • Side-by-Side Metric Table      │
│  • How It Works & Internal Layers     │  │  • Trajectory & Mission Timeline  │  │  • Relative Scale Visual Bars     │
│  • How It Formed (4 Phases)           │  │  • End-of-Mission Fate & Legacy   │  │  • Direct 3D Focus Triggers       │
│  • When/How It Will Die / Fate        │  │  • Breakthroughs & Anomalies      │  └───────────────────────────────────┘
│  • Moons Grid + Fun Facts + 3D FlyTo  │  │  • 3D Spacecraft Focus Trigger    │
└───────────────────────────────────────┘  └───────────────────────────────────┘
```

- **Data Model & State**:
  - **Planetary Monograph Schema**: Extends each of the 8 planets in the dataset to include the full multi-section structure: `summary`, `metrics` (10 tabular items), `atmosphereComposition` (gas percentages), `howItWorks` (internal dynamo explanation, weather engine, and 4–5 concentric internal layers with temperature/pressure/composition), `howItFormed` (4 chronological formation phases), `futureFate` (overview + chronological future destiny timeline), `moons` (detailed moon objects), and `funFacts` (6–8 titled scientific anomaly cards).
  - **Spacecraft & Probes Monograph Schema**: Structured dataset covering 10 major missions (*Voyager 1 & 2, James Webb Space Telescope, Hubble Space Telescope, Cassini-Huygens, Juno, Parker Solar Probe, New Horizons, Mars Perseverance Rover, International Space Station, GPS / Starlink*) with `category` (`Deep-Space Probe` | `Space Telescope` | `Planetary Rover` | `Orbital Station`), `operator`, `launchYear`, `status`, `image`, `summary`, `metrics` (10 hardware & orbital specs), `howItWorks` (propulsion, power source, and 4–5 key instruments), `missionTimeline` (chronological phases from launch to current/final state), `missionFate` (longevity, power depletion, or atmospheric disposal), and `discoveriesAndFacts` (6+ cards).

- **Interactive Component & State Mapping**:
  - **Sidebar Directory Accordion & Route Selection**: Clicking a category group toggles its nested items; clicking a specific planet, probe, the Sun, or the Comparator updates `encyclopediaRoute` and scrolls the main reading pane to the top.
  - **Sub-Section Quick Anchors**: A sticky sub-navigation bar inside each planet and probe monograph (`Overview`, `How It Works & Layers`, `Formation / Launch`, `Fate / Timeline`, `Moons / Instruments`, `Fun Facts`) smoothly scrolls to the corresponding section ID.
  - **3D Fly-To Handshake**: Clicking **"Focus in 3D Simulation"** on any planet, moon, or probe updates `selected3DTarget`, switches `activeMode` back to `'simulation3d'`, and triggers the Three.js camera interpolation toward that target.
