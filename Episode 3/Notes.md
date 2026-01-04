# 🚀 Namaste React: Episode 3 - Laying The Foundation

## 📜 Scripts

```json
{
  "name": "namaste-react",
  "version": "1.0.0",
  "description": "This is Namaste React course taught by Akshay Saini",
  "scripts": {
    "start": "parcel index.html", // start script
    "build": "parcel build index.html", // dev script
    "test": "jest"
  },
  "keywords": ["JavaScript", "React", "JS"],
  "author": "Rahul",
  "license": "ISC",
  "devDependencies": {
    "parcel": "^2.16.3"
  },
  "dependencies": {
    "react": "^19.2.3",
    "react-dom": "^19.2.3"
  },
  "browserslist": ["last 2 versions"]
}
```

### Running the Project

```bash
npm run start
# or
npm start

npm run build
```

---

## 📚 Basics

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
    <div id="root">
      <h1>Not Rendered!</h1>
    </div>

    <script type="module" src="./App.js"></script>
  </body>
</html>
```

### App.js

```js
import React from "react";
import ReactDOM from "react-dom/client";

/*React Element*/
const heading = React.createElement(
  "h1",
  { id: "heading" },
  "Namaste React 🚀"
);

/**React.createElement -> React Element -> JavaScript Object -> render -> HTML Element */

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(heading);
```

---

## ✨ JSX

```js
import React from "react";
import ReactDOM from "react-dom/client";

/*React Element*/
const heading = React.createElement(
  "h1",
  { id: "heading" },
  "Namaste React 🚀"
);

console.log(heading);

/*JSX*/
/**
 * JSX is not part of React.
 * JSX is not HTML inside JavaScript.
 * JSX is HTML like syntax.
 */

const jsxHeading = <h1 id="heading">Namaste React Using JSX 🚀</h1>;

console.log(jsxHeading);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(jsxHeading);
```

---

## 🔧 Babel

> **Note:** Is this a valid JavaScript?
>
> ```js
> const jsxHeading = <h1 id="heading">Namaste React Using JSX 🚀</h1>;
> ```
>
> - No. Then how is it working?
> - **Babel is transpiling my code.**

```js
import React from "react";
import ReactDOM from "react-dom/client";

/*React Element*/
const heading = React.createElement(
  "h1",
  { id: "heading" },
  "Namaste React 🚀"
);

console.log(heading);

//* JSX -> Transpiled before reaching JS Engine. -> Done By BABEL
//* JSX -> Babel (Transpiled) -> React.createElement -> React Element -> JS Object -> render -> HTML
const jsxHeading = <h1 id="heading">Namaste React Using JSX 🚀</h1>;

console.log(jsxHeading);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(jsxHeading);
```

---

### 📝 Important JSX Notes

> **Note:**
>
> 1. JSX is not HTML
> 2. For multiple lines we wrap JSX using `()`

```js
import React from "react";
import ReactDOM from "react-dom/client";

/*React Element*/
const heading = React.createElement(
  "h1",
  { id: "heading" },
  "Namaste React 🚀"
);

console.log(heading);

/**
 * JSX -> Transpiled before reaching JS Engine. -> Done By BABEL
 * JSX -> Babel -> React.createElement -> React Element -> JS Object -> render -> HTML
 * JSX is not HTML (e.g. we use className as attribute instead of class)
 */

const jsxHeading = (
  <h1 id="heading" className="head">
    Namaste React Using JSX 🚀
  </h1>
);

console.log(jsxHeading);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(jsxHeading);
```

---

## 🧩 React Components

### Types of Components

1. **Functional Component** - New Way
2. **Class Based Component** - Old Way

---

## 🔹 Functional Component

> A normal JavaScript Function which returns some JSX (or React Element).

```js
import React from "react";
import ReactDOM from "react-dom/client";

/*React Element*/
const heading = (
  <h1 id="heading" className="head">
    Namaste React Using JSX 🚀
  </h1>
);

/*React Component*/
const HeadingComponent = () => {
  return (
    <div id="container">
      <h1 id="heading">Namaste React Using Functional Component🚀</h1>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<HeadingComponent />);
```

---

## 🔗 Component Composition

```js
import React from "react";
import ReactDOM from "react-dom/client";

/*React Element*/
const heading = (
  <h1 id="heading" className="head">
    Namaste React Using JSX 🚀
  </h1>
);

const Title = () => {
  return <h1>Hello React!</h1>;
};

/*React Component*/
const HeadingComponent = () => {
  return (
    <div id="container">
      {/*Component Composition*/}
      <Title />
      <h1 id="heading">Namaste React Using Functional Component🚀</h1>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<HeadingComponent />);
```

---

## 💡 Key Concepts

### 🔹 Writing JS Code Inside JSX

```js
import React from "react";
import ReactDOM from "react-dom/client";

/*React Element*/
const heading = (
  <h1 id="heading" className="head">
    Namaste React Using JSX 🚀
  </h1>
);

const Title = () => {
  return <h1>Hello React!</h1>;
};

/*React Component*/
const HeadingComponent = () => {
  return (
    <div id="container">
      <Title />
      {heading}
      <h1 id="heading">Namaste React Using Functional Component🚀</h1>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<HeadingComponent />);
```

---

### 🔹 JSX Sanitizes Malicious Data

> **Prevention from XSS (Cross Site Scripting) Attack**
>
> - Suppose if an attacker sends malicious code written in JS. That code will be run inside JS automatically.
> - **NO.** JSX Sanitizes the data and then renders it on the browser.

---

### 🔹 Multiple Ways of Rendering Functional Component

```js
import React from "react";
import ReactDOM from "react-dom/client";

/*React Element*/
const heading = (
  <h1 id="heading" className="head">
    Namaste React Using JSX 🚀
  </h1>
);

const Title = () => {
  return <h1>Hello React!</h1>;
};

/*React Component*/
const HeadingComponent = () => {
  return (
    <div id="container">
      <Title />
      <Title></Title>
      {Title()}
      {heading}
      <h1 id="heading">Namaste React Using Functional Component🚀</h1>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<HeadingComponent />);
```

---

## 🎯 Important Takeaway

> **REACT code is readable because we are using JSX.**

---
