# EQ Authoring Rules (FINAL)

This document defines the **mandatory rules** for authoring EQ slides in Taleem.

EQ slides are **player-only**, timing-dependent, and structurally strict.
Any violation makes the slide invalid.

DeckBuilder GPT must treat these rules as **non-negotiable**.

---

## 1. What an EQ Slide Is

An EQ slide is a slide with:

```json
"type": "eq"
```

It is used to present:

- mathematical expressions
- step-by-step derivations
- structured explanations alongside math

EQ slides are **not decorative** and must not be used casually.

---

## 2. Main Line Types (Allowed)

Each EQ slide consists of **main lines**.

Allowed main line types:

- `heading`
- `math`
- `text`

Rules:

- Main lines appear in sequence
- Main lines MAY define `showAt`
- Main lines represent the primary flow of the explanation

No other main line types are allowed.

---

## 3. Side Panel Item Types (Allowed)

Side panels attach to a **single main line** and provide explanation.

Allowed side panel item types:

- `spImage`
- `spText`
- `spMath`

Rules:

- Side panel items MUST immediately follow a main line
- Side panel items MUST belong to the line above them
- Side panel items MUST NOT define `showAt`
- Side panel items inherit timing from their parent line

Side panel items cannot exist on their own.

---

## 4. Mandatory Side Panel Rules

### 4.1 Every EQ Slide MUST start with an image

- The **first main line** of every EQ slide:

  - MUST have a side panel
  - That side panel MUST contain an `spImage`

- This image acts as a **conceptual anchor**

If this rule cannot be satisfied, the EQ slide must be omitted.

---

### 4.2 Every side panel MUST have content

- No empty side panels
- No placeholder items
- Image-only panels are valid
- Text-only panels are valid

Empty side panels are invalid.

---

### 4.3 Image vs Text Exclusivity

A side panel may contain:

- **ONLY an image**, OR
- **ONLY text / math**, OR
- **an image + one short caption line**

Rules:

- Image + large text block is forbidden
- Caption text must be:

  - one short sentence
  - descriptive, not explanatory

---

## 5. Text Side Panel Rules

When a side panel uses text:

- Content must be **rich and explanatory**
- Prefer:

  - multiple short lines, OR
  - 5–8 concise sentences

- Tone must be:

  - neutral
  - textbook-aligned
  - explanatory (not motivational)

Avoid:

- narration-style prose
- filler
- repetition
- UI commentary

---

## 6. Math in Side Panels (`spMath`)

- `spMath` is allowed for:

  - short symbolic explanations
  - highlighting a transformation

- `spMath` must be concise
- `spMath` must not replace main math lines

Side panels are supportive, not primary.

---

## 7. Structural Integrity

DeckBuilder GPT must:

- Copy EQ structure from **golden EQ samples only**
- Preserve:

  - number of main lines
  - order of lines
  - line types

- Modify **only string content**

GPT must NOT:

- add or remove EQ lines
- change line ordering
- merge or split EQ slides
- invent new EQ layouts

If content does not fit the structure, the slide must be dropped.

---

## 8. EQ Failure Handling

An EQ slide MUST be omitted if:

- first-line image rule cannot be satisfied
- side panel rules conflict
- required explanation would exceed allowed structure
- content would require layout invention

Dropping EQ is always preferred over breaking rules.

---

## 9. Scope Note

These rules apply:

- in `mixed` mode
- in `eqOnly` mode

EQ slides are **forbidden** in `core` mode.
