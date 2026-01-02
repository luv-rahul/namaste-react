# 🚀 Namaste React: Episode 1 - The Inception

## 👋 Hello World

### HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Namaste React</title>
  </head>

  <body>
    <div id="root">
      <h1>Hello World!</h1>
    </div>
  </body>
</html>
```

### JavaScript

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Namaste React</title>
  </head>

  <body>
    <div id="root"></div>
    <script>
      const heading = document.createElement("h1");
      heading.innerHTML = "Hello World from JavaScript!";
      const root = document.getElementById("root");
      root.appendChild(heading);
    </script>
  </body>
</html>
```

---

## 📝 Important Notes

> **Note:**
>
> **1. How does browser know `document`, `createElement`, `getElementById`, `innerHTML` etc.?**
>
> - Browsers have JavaScript Engine in it.
>
> **2. Does browsers know React?**
>
> - No. We will use React CDN links to use React.

---

## 🔗 CDN LINKS

```html
<script
  crossorigin
  src="https://unpkg.com/react@18/umd/react.development.js"
></script>
<script
  crossorigin
  src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
></script>
```

> **Why there are two CDN links?**
>
> - First link is of core React.
> - Second link is for DOM manipulation using React.

---

## ⚛️ React

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Namaste React</title>
  </head>

  <body>
    <div id="root"></div>

    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
    ></script>

    <script>
      const heading = React.createElement("h1", {}, "Hello World from React!");
      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(heading);
    </script>
  </body>
</html>
```

> **Note:** The most costly operation on webpage is DOM manipulation.

---

## 📂 Segregating Codes

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Namaste React</title>
    <link rel="stylesheet" href="index.css" />
  </head>

  <body>
    <div id="root"></div>

    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
    ></script>

    <script src="./App.js"></script>
  </body>
</html>
```

### index.css

```css
#heading {
  color: red;
}
```

### app.js

```js
const heading = React.createElement(
  "h1",
  { id: "heading" },
  "Hello World from React!"
);

console.log(heading); // React Element - JavaScript Object

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(heading); // Convert Object into HTML element and renders on browser.
```

---

## 🌳 Nested Structure

### Example 1

#### app.js

```js
/**
 * <div id="parent">
 *      <div id="child">
 *            <h1>I'm h1 tag.</h1>
 *      </div>
 *  </div>
 */

const parent = React.createElement(
  "div",
  { id: "parent" },
  React.createElement(
    "div",
    { id: "child" },
    React.createElement("h1", {}, "I'm h1 tag.")
  )
);

console.log(parent);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(parent);
```

> **React.createElement() → React Element → JavaScript object → render → HTML Element**

---

### Example 2

#### app.js

```js
/**
 * <div id="parent">
 *      <div id="child">
 *            <h1>I'm h1 tag.</h1>
 *      </div>
 *  </div>
 */

/**
 * <div id="parent">
 *      <div id="child">
 *            <h1>I'm h1 tag.</h1>
 *            <h2>I'm h2 tag.</h2>
 *      </div>
 *  </div>
 */

const parent = React.createElement(
  "div",
  { id: "parent" },
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", {}, "I'm h1 tag."),
    React.createElement("h2", {}, "I'm h2 tag."),
  ])
);

console.log(parent);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(parent);
```

---

### Example 3

```js
/**
 * <div id="parent">
 *      <div id="child">
 *            <h1>I'm h1 tag.</h1>
 *      </div>
 *  </div>
 */

/**
 * <div id="parent">
 *      <div id="child">
 *            <h1>I'm h1 tag.</h1>
 *            <h2>I'm h2 tag.</h2>
 *      </div>
 *  </div>
 */

/**
 * <div id="parent">
 *      <div id="child">
 *            <h1>I'm h1 tag.</h1>
 *            <h2>I'm h2 tag.</h2>
 *      </div>
 *      <div id="child2">
 *            <h1>I'm h1 tag.</h1>
 *            <h2>I'm h2 tag.</h2>
 *      </div>
 *  </div>
 */

const parent = React.createElement("div", { id: "parent" }, [
  React.createElement(
    "div",
    { id: "child" },
    [
      React.createElement("h1", {}, "I'm h1 tag."),
      React.createElement("h2", {}, "I'm h2 tag."),
    ],
    React.createElement("div", { id: "child2" }, [
      React.createElement("h1", {}, "I'm h1 tag."),
      React.createElement("h2", {}, "I'm h2 tag."),
    ])
  ),
]);

console.log(parent);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(parent);
```

---

## ⚠️ Important Concepts

### 🔴 Order Matters!

#### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Namaste React</title>
    <link rel="stylesheet" href="index.css" />
  </head>

  <body>
    <div id="root"></div>

    <!-- This will not work -->
    <script src="./App.js"></script>

    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
    ></script>
  </body>
</html>
```

---

### 🔄 REPLACED, NOT APPENDED

#### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Namaste React</title>
    <link rel="stylesheet" href="index.css" />
  </head>

  <body>
    <div id="root">
      <h1>Hello!</h1>
    </div>

    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
    ></script>

    <script src="./App.js"></script>
  </body>
</html>
```

---

## 📖 Library vs Framework

#### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Namaste React</title>
    <link rel="stylesheet" href="index.css" />
  </head>

  <body>
    <h1>Top</h1>

    <!-- React will work only for root -->
    <div id="root">
      <h1>Hello!</h1>
    </div>

    <h1>Bottom</h1>

    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
    ></script>

    <script src="./App.js"></script>
  </body>
</html>
```

### 📚 Key Differences

- React is a **library**, not a framework.
- A library can work in small portion of the app.
- A framework is full fledged application.

---

## 📝 Homework

1. What is CDN? Why do we use CDN?
2. What is crossorigin?
3. What is the difference between development and production CDN links?

---
