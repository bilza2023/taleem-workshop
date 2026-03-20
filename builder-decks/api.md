# Taleem Builder API — v1

All examples below are **valid**, **canonical**, and **safe to copy**.

This document shows **how to author every slide type using `taleem-builder`**.
The output of every example is valid `deck-v1` JSON.

---

## Import & Setup

```js
import TaleemBuilder from "taleem-builder";

const b = new TaleemBuilder({ mode: "desktop" });

b.addDetails({ name: "Example Deck" });

b.setBackgroundColor("#0f172a");
b.setBackgroundImage("bg.png");
b.setBackgroundOpacity(0.15);
```

---

## 1. `titleAndSubtitle`

```js
b.titleAndSubtitle(10, [
  { name: "title", content: "Main Title", showAt: 5 },
  { name: "subtitle", content: "Secondary line", showAt: 6 },
]);
```

---

## 2. `titleAndPara`

```js
b.titleAndPara(15, [
  { name: "title", content: "Concept", showAt: 10 },
  { name: "para", content: "Explanation text", showAt: 11 },
]);
```

---

## 3. `bulletList`

```js
b.bulletList(20, [
  { name: "bullet", content: "First point", showAt: 15 },
  { name: "bullet", content: "Second point", showAt: 16 },
  { name: "bullet", content: "Third point", showAt: 17 },
]);
```

---

## 4. `twoColumnText`

```js
b.twoColumnText(25, [
  { name: "left", content: "Left column text", showAt: 20 },
  { name: "right", content: "Right column text", showAt: 21 },
]);
```

---

## 5. `imageSlide`

```js
b.imageSlide(30, [{ name: "image", content: "image.png", showAt: 25 }]);
```

---

## 6. `imageWithTitle`

```js
b.imageWithTitle(35, [
  { name: "title", content: "Visual Concept", showAt: 30 },
  { name: "image", content: "image.png", showAt: 31 },
]);
```

---

## 7. `imageWithCaption`

```js
b.imageWithCaption(40, [
  { name: "image", content: "image.png", showAt: 35 },
  { name: "caption", content: "Caption text", showAt: 36 },
]);
```

---

## 8. `imageLeftBulletsRight`

```js
b.imageLeftBulletsRight(45, [
  { name: "image", content: "image.png", showAt: 40 },
  { name: "bullet", content: "Point one", showAt: 41 },
  { name: "bullet", content: "Point two", showAt: 42 },
]);
```

---

## 9. `imageRightBulletsLeft`

```js
b.imageRightBulletsLeft(50, [
  { name: "image", content: "image.png", showAt: 45 },
  { name: "bullet", content: "Point one", showAt: 46 },
  { name: "bullet", content: "Point two", showAt: 47 },
]);
```

---

## 10. `table`

```js
b.table(55, [
  ["Column A", "Column B"],
  ["Value 1", "Value 2"],
  ["Value 3", "Value 4"],
]);
```

---

## 11. `statistic`

```js
b.statistic(60, [
  { name: "number", content: "42", showAt: 55 },
  { name: "label", content: "Answer", showAt: 56 },
]);
```

---

## 12. `donutChart`

```js
b.donutChart(65, [
  { name: "percent", content: "75", showAt: 60 },
  { name: "label", content: "Completed", showAt: 61 },
  { name: "color", content: "#ff9900", showAt: 62 },
]);
```

---

## 13. `bigNumber`

```js
b.bigNumber(70, [
  { name: "number", content: "100%", showAt: 65 },
  { name: "label", content: "Accuracy", showAt: 66 },
]);
```

---

## 14. `barChart`

```js
b.barChart(75, [
  { name: "bar", label: "A", value: 3, showAt: 70 },
  { name: "bar", label: "B", value: 5, showAt: 71 },
]);
```

---

## 15. `quoteSlide`

```js
b.quoteSlide(80, [
  { name: "quote", content: "Clarity matters.", showAt: 75 },
  { name: "author", content: "— Taleem", showAt: 76 },
]);
```

---

## 16. `quoteWithImage`

```js
b.quoteWithImage(85, [
  { name: "quote", content: "Structure beats chaos.", showAt: 80 },
  { name: "author", content: "— Taleem", showAt: 81 },
  { name: "image", content: "image.png", showAt: 82 },
]);
```

---

## 17. `cornerWordsSlide`

```js
b.cornerWordsSlide(90, [
  { name: "card", icon: "🧠", label: "Focus", showAt: 85 },
  { name: "card", icon: "📘", label: "Clarity", showAt: 86 },
]);
```

---

## 18. `contactSlide`

```js
b.contactSlide(95, [
  { name: "headline", content: "Taleem", showAt: 90 },
  { name: "email", content: "hello@example.com", showAt: 91 },
  { name: "phone", content: "+00 0000000", showAt: 92 },
]);
```

---

## 19. `eq`

```js
b.eq(100, [
  { type: "heading", content: "Key Equation", showAt: 95 },
  { type: "math", content: "render(data) ⇒ same output", showAt: 96 },
  { type: "spText", content: "No hidden state" },
]);
```

---

## 20. `fillImage`

```js
b.fillImage(105, [{ name: "image", content: "image.png", showAt: 100 }]);
```

---

## Finalize Deck

```js
const deck = b.build();
```

Returns validated `deck-v1` JSON.
