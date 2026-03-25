# Taleem Content Creation Pipeline

## Core Principle

Taleem is **not an app**.
Taleem is a **pipeline**.

Content is not edited in one place — it is **moved forward through stages**.

Each stage:

* has one purpose
* has one UI page
* has one success condition
* moves files forward

There is **no backward movement**.
If something is wrong → delete and recreate.

---

# Pipeline Overview

```
slides → timings → archive
```

---

## Stage 1: Slides

### Purpose

Create and finalize slide content.

### Page

`/slides`

### What happens here

* Create decks (via create page)
* Edit slides (via editor)
* Add images references (optional)

### Entry

* Deck is created (empty or initial)

### Exit Condition

* Deck has **at least one slide**

### Script

`completeSlides(slug)`

### Action

* Move file:

```
/content/slides → /content/timings
```

---

## Stage 2: Timings

### Purpose

Synchronize slides with audio.

### Page

`/timings`

### What happens here

* Load audio
* Assign:

  * `start`
  * `end`
  * `showAt`

### Entry Condition

* Deck has slides
* Audio file exists

### Exit Condition

* All slides have `start` and `end`
* All items have `showAt`

### Script

`completeTimings(slug)`

### Action

* Move file:

```
/content/timings → /content/archive
```

---

## Stage 3: Archive

### Purpose

Final, immutable content.

### Page

(optional view)

### What it means

* Deck is **fully complete**
* Slides are final
* Audio is final
* Timing is final

### Rules

* No editing
* No movement
* Only **copy** for publishing

---

# Folder Structure

```
/content/
  /slides/
  /timings/
  /archive/

/audio/
  slug.mp3

/images/
  ...
```

---

# Movement Rules

## 1. Forward Only

```
slides → timings → archive
```

No backward movement.

---

## 2. One File = One Stage

A deck exists in **only one folder at a time**.

---

## 3. Scripts Control Movement

UI does not move files.

Each page has one button:

> "Complete Stage"

This calls a script which:

1. Validates
2. Moves file

---

## 4. No Partial States

* A deck is either:

  * in slides
  * or fully timed

There is no “half-timed” stage.

---

## 5. Archive is Final

* Archive = timed = complete
* This is the source for publishing
* Workshop does not publish

---

# Assets (Images & Audio)

Assets are **not a pipeline stage**.

They are **dependencies**.

### Rules

* Audio is required to enter timing stage
* Images are assumed correct by process

No separate UI stage is needed.

---

# Editor (Final Design)

## Role

Editor is a **content-only tool**.

It does NOT:

* handle timing
* handle audio
* handle playback

---

## Core Principle

> Editor should not know **when** anything happens — only **what exists**

---

## Input

```js
{
  deck: [],
  background: {}
}
```

---

## Output

```js
onExport({
  deck,
  background
})
```

---

## Rules

1. No timing fields:

   * no `start`
   * no `end`
   * no `showAt`

2. No API calls

3. No file system logic

4. No state outside component

---

## Behavior

* User edits slides
* Clicks **Export**
* Editor returns data via callback

---

## Architecture

```
<App>
  → passes onExport()

<Editor>
  → internal UI only
  → returns data
```

---

## Key Insight

Editor is a **black box UI**:

```
input → Editor → output
```

No continuous interaction.

---

# System Philosophy

## 1. Pipeline over UI

Do not build large monolithic UIs.

Instead:

* small tools
* clear stages
* file movement

---

## 2. Move Complexity to Scripts

UI should:

* collect input
* display data

Scripts should:

* validate
* enforce rules
* move files

---

## 3. Filesystem is the Source of Truth

* Folder = stage
* File location = state

No database needed.

---

## 4. Tools are Replaceable

Each tool:

* can be removed
* can be rebuilt
* does not affect others

---

## 5. Action-Based Stages

Stages are defined by:

> what you do there

* `/slides` → create slides
* `/timings` → add timing

---

# Final Mental Model

```
Slides → Thinking
Timings → Performance
Archive → Record
```

---

# What to Build Next

## 1. Finalize Editor

* Remove timing logic
* Implement `onExport`
* Keep it minimal

---

## 2. Implement Move Scripts

* `completeSlides`
* `completeTimings`

---

## 3. Add Button per Page

* "Complete Stage"

---

## 4. Pipeline Home Page

* List decks grouped by folder

---

## 5. Lock System

* No new UI features
* Only pipeline improvements

---

# Final Truth

> Don’t build a smart UI
> Build a **dumb pipeline with sharp tools**
