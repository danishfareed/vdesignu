# Master Content Overhaul Plan: 1500 Words & 20 Unique FAQs

## Core Objective
Transform the programmatic engine from "Token Swapping" (Risk) to "Entity-Rich Authority" (Reward).
**Targets:**
- **Word Count:** Min 1,500+ High-Quality Words per page.
- **FAQs:** 20 Unique, Intent-Matched FAQs per page.
- **Structure:** Pillar-Cluster model (Hub pages linking to deep service pages).
- **Quality:** ZERO thin content.

## 1. The "Content Expansion" Strategy (How to get 1,500 words?)
We cannot just use AI to write fluff. We must inject **Structured Data Constraints**.

### A. The Data Modules
We will create three new deep-data repositories:
1.  **`city-context.json`**:
    -   *Current*: Just name and country.
    -   *New*: Economic zones, specific districts (e.g., "Business Bay" vs "DIFC"), local regulations (RERA, MOH), cultural nuances, and business climate stats.
    -   *Usage*: Inject ~500 words of "Local Market Context" into every page.
2.  **`industry-deep-dive.json`**:
    -   *Current*: 2 paragraphs.
    -   *New*: 10+ subsections (Compliance, Tech Stack, Operations, Staffing, specific User Personas).
    -   *Usage*: Inject ~700 words of "Sector Authority".
3.  **`faq-database.ts`**:
    -   *Current*: 8 questions per industry.
    -   *New*: A modular DB of 300+ questions tagged by `intent`, `service`, `industry`, `city`.
    -   *Usage*: Programmatically select 20 *unique* combinations per page.

### B. The Template Restructure
The `[city]/[industry]/[service].astro` template will be expanded from 4 sections to 8:
1.  **Hero**: High-Intent Conversion.
2.  **Local Context**: "Why {Service} matters in {City}'s {Economic Zone}."
3.  **Industry Deep Dive**: "Technical challenges for {Industry} Leaders."
4.  **Service Specifics**: Core offering.
5.  **Case Study/Proof**: "Results in {Region}."
6.  **Semantic Mesh**: "Related Services for {Industry}."
7.  **The Mega-FAQ**: 20 Questions (Accordion style).
8.  **Pillar Linking**: Back to the "Global Industry Hub".

## 2. Pillar Page Architecture
We will create "Global Industry Pillars" (e.g., `/industries/healthcare`) that act as the semantic root.
-   **Pillar**: "Digital Transformation in Healthcare (Global Guide)" (3,000 words).
-   **Cluster**: All `{city}/healthcare/{service}` pages link *up* to this pillar.
-   **Mesh**: The pillar links *down* to top city hubs.

## 3. Execution Batches
We will execute this in strict batches to ensure quality control.

| Batch | Scope | Focus | Success Metric |
| :--- | :--- | :--- | :--- |
| **Batch 1 (Pilot)** | **Dubai + All Industries** | Verify 1,500w & FAQ logic | 1 Page Audit = PASS |
| **Batch 2** | **KSA (Riyadh/Jeddah)** | Localize for Saudi context | Arabic/Culture check |
| **Batch 3** | **Global Cities** | International nuances | Timezone/Market check |
| **Batch 4** | **Rest of GCC** | Gulf-specific expansion | Quality Consistency |

## 4. The Tracker
We will use `CONTENT_TRACKER.md` to log the status of every single batch and audit the word counts.
