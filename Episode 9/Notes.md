# 🚀 Namaste React: Episode 9 - Optimizing Our App

## 📌 Single Responsibility Principle

> **Note:** We should always follow "Single Responsibility Principle" in our code. To make code:
>
> 1. **Reusable**
> 2. **Maintainable**
> 3. **Testable**

---

## 🎣 Custom Hooks

### Usage Example

```js
/*Custom Hook*/
const menuData = useRestaurantMenu(resId);
console.log(menuData);
```

### useRestaurantMenu.js

```js
import { useEffect, useState } from "react";

export const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6327&lng=77.2198&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`
      );
      const json = await response.json();
      setResInfo(json);
      return resInfo;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
```

---

## 🌐 Online / Offline Hook

### useOnlineStatus.js

```js
import { useEffect, useState } from "react";

export const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(true);

  /* Check Online or Offline */
  useEffect(() => {
    window.addEventListener("offline", () => {
      setOnlineStatus(false);
    });

    window.addEventListener("online", () => {
      setOnlineStatus(true);
    });
  }, []);

  return onlineStatus;
};
```

### Body.js

```js
if (onlineStatus === false) {
  return <h1>Looks like You're Offline</h1>;
}
```

### Header.js

```js
import { LOGO_URL } from "../utils/constants";
import { useState, useEffect } from "react";
import { Link, redirect } from "react-router";
import { useOnlineStatus } from "../utils/useOnlineStatus";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");

  useEffect(() => {
    console.log("useEffect Called!");
  }, [btnNameReact]);

  console.log("Header Rendered!");

  const onlineStatus = useOnlineStatus();

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL}></img>
      </div>
      <div className="nav-items">
        <ul>
          <li>{onlineStatus ? "🟢" : "🔴"}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>Cart</li>
          <li>
            <button
              className="login"
              onClick={() => {
                setBtnNameReact(btnNameReact === "Login" ? "Logout" : "Login");
              }}
            >
              {btnNameReact}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
```

---

## 📦 Chunking / Code Splitting / Dynamic Bundling / Lazy Loading / On Demand Loading / Dynamic Import

### Grocery.js

```js
const Grocery = () => {
  return (
    <h1>
      Grocery Delivery. Assume this contains the whole module of Grocery
      Delivery Page ie. components, images, assets. etc.
    </h1>
  );
};

export default Grocery;
```

### Header.js (With Grocery Link)

```js
import { LOGO_URL } from "../utils/constants";
import { useState, useEffect } from "react";
import { Link, redirect } from "react-router";
import { useOnlineStatus } from "../utils/useOnlineStatus";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");

  useEffect(() => {
    console.log("useEffect Called!");
  }, [btnNameReact]);

  console.log("Header Rendered!");

  const onlineStatus = useOnlineStatus();

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL}></img>
      </div>
      <div className="nav-items">
        <ul>
          <li>{onlineStatus ? "🟢" : "🔴"}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/grocery">Grocery</Link>
          </li>
          <li>Cart</li>
          <li>
            <button
              className="login"
              onClick={() => {
                setBtnNameReact(btnNameReact === "Login" ? "Logout" : "Login");
              }}
            >
              {btnNameReact}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
```

### App.js (With Lazy Loading)

```js
import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
// import Grocery from "./components/Grocery"; // This will not load with lazyLoading
import { lazy, Suspense } from "react";

/*Lazy Loading*/
const Grocery = lazy(() => import("./components/Grocery"));

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
```

---

## ✍️ Summary

> **Agar hum lazy loading use nahi karte**, to Parcel application ki ek badi JS bundle bana deta hai jisme saare components hote hain. Isse initial page load slow ho sakta hai.
>
> **Is problem ko solve karne ke liye** hum application ko modules / chunks me tod dete hain jisse har feature ki apni alag JS file hoti hai.
>
> **Direct import ki jagah** hum `lazy()` ka use karte hain taaki component tab load ho jab uski zarurat ho.
>
> **Suspense component ka use** isliye kiya jaata hai taaki jab tak lazy component load ho raha ho, tab tak ek fallback UI (jaise Loading…) dikhaya ja sake.

---
