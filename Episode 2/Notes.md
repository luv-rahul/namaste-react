# 🚀 Namaste React: Episode 2 - Igniting Our App

## 📦 npm

- Package Manager For Node
- It's not stands for "Node Package Manager".

### Getting Started

```bash
npm init
```

#### package.json

```json
{
  "name": "namaste-react",
  "version": "1.0.0",
  "description": "This is Namaste React course taught by Akshay Saini",
  "main": "App.js",
  "scripts": {
    "test": "jest"
  },
  "keywords": ["JavaScript", "React", "JS"],
  "author": "Rahul",
  "license": "ISC"
}
```

> **Note:** `package.json` is a configuration for our project.

---

## 📦 Parcel

### Installation

```bash
npm install -D parcel
```

> **Note:** There are two types of dependencies:
>
> 1. **Dev Dependencies** - Development Environment
> 2. **Normal Dependencies** - Production Environment

#### Updated package.json

```json
{
  "name": "namaste-react",
  "version": "1.0.0",
  "description": "This is Namaste React course taught by Akshay Saini",
  "main": "App.js",
  "scripts": {
    "test": "jest"
  },
  "keywords": ["JavaScript", "React", "JS"],
  "author": "Rahul",
  "license": "ISC",
  "devDependencies": {
    "parcel": "^2.16.3"
  }
}
```

### 🔍 Version Symbols

> **What is the difference between caret(^) and tilda(~)?**
>
> - **Caret(^)** updates packages if minor version changes happens.
> - **Tilda(~)** updates packages if major version changes happens.

---

## 🔒 package-lock.json

- It locks the version of the packages.

---

## 📂 node_modules

It contains the actual data of the dependencies.

> **Why are there many folders and files in node_modules?**
>
> It is because our dependency has its own dependencies and those have their own... This is known as **"Transitive Dependencies"**.

> ⚠️ We don't push `node_modules` to GitHub. It can be re-installed using `package.json`. That's why we make a `.gitignore` file.

---

## 🔥 Igniting Our App

### Running Parcel

```bash
npx parcel index.html
```

---

## ⚛️ React using NPM

> Using CDN links is not a good way.

### Installation

```bash
npm i react
npm i react-dom
```

#### package.json with React Dependencies

```json
{
  "name": "namaste-react",
  "version": "1.0.0",
  "description": "This is Namaste React course taught by Akshay Saini",
  "scripts": {
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
  }
}
```

---

## 📄 Project Files

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
    <h1>Top</h1>
    <div id="root">
      <h1>Hello!</h1>
    </div>
    <h1>Bottom</h1>

    <script type="module" src="./App.js"></script>
  </body>
</html>
```

### App.js

```js
import React from "react";
import ReactDOM from "react-dom/client";

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

## 🎁 Parcel Features

1. Dev Build
2. Local Server
3. HMR (Hot Module Replacement)
4. File Watching Algorithms
5. Caching
6. Image Optimization
7. Minification
8. Bundling
9. Compress Files
10. Differential Bundling - Support Older Browsers
11. Consistent Hashing
12. Error Handling
13. Tree Shaking - Remove Unused Code
14. HTTPs
15. Diagnostic
16. Different Build for Dev and Prod → `npx parcel index.html` | `npx parcel build index.html`

---

## 📝 Important Notes

> **Note:**
>
> 1. `.parcel-cache` contains the cached files and HMR is fast because of cache.
> 2. `dist` contains the bundled code files of the whole codebase.
>
> **We don't push these also on GitHub. They can be regenerated.**

---

## 🌐 Browsers List

To support multiple browsers:

```json
"browserslist": [
  "last 2 versions"
]
```

---
