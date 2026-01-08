# 🚀 Namaste React: Episode 7 - Finding The Path

## 🔄 useEffect

### Case 1: Without Dependency Array

```js
useEffect(() => {
  console.log("useEffect Called!");
});
```

> useEffect will be called on **every render**.

---

### Case 2: Dependency Array is Empty

```js
useEffect(() => {
  console.log("useEffect Called!");
}, []);
```

> useEffect will be called on **initial render only**.

---

### Case 3: Dependency Array Containing Dependency

```js
useEffect(() => {
  console.log("useEffect Called!");
}, [btnNameReact]);
```

> useEffect will be called **everytime dependency changes**.

---

## 📊 useState

### 🔹 Best Practices

1. Never create state variable outside the component.
2. Never create state variable inside if-else / for loop / function etc.

---

## 🛣️ Routing (createBrowserRouter, RouterProvider)

### Installation

```bash
npm i react-router-dom
```

### package.json

```json
{
  "name": "namaste-react",
  "version": "1.0.0",
  "description": "This is Namaste React course taught by Akshay Saini",
  "scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html",
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
    "react-dom": "^19.2.3",
    "react-router-dom": "^7.11.0"
  },
  "browserslist": ["last 2 versions"]
}
```

### App.js

```js
import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider } from "react-router";
import About from "./components/About";
import Contact from "./components/Contact";

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
```

### About.js

```js
const About = () => {
  return (
    <div className="about">
      <h2>About</h2>
      <h3>This is Namaste React</h3>
    </div>
  );
};

export default About;
```

### Contact.js

```js
const Contact = () => {
  return (
    <div>
      <h2>Contact</h2>
      <h3>This is Namaste React</h3>
    </div>
  );
};

export default Contact;
```

---

## ⚠️ Error Handling (useRouteError)

### App.js

```js
import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider } from "react-router";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
```

### Error.js

```js
import { useRouteError } from "react-router";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h2>OOPS!😥</h2>
      <h3>Something Went Wrong!!</h3>
      <h4>
        {error.status}: {error.statusText}
      </h4>
    </div>
  );
};

export default Error;
```

---

## 🌳 Children Routes (Outlet)

### App.js

```js
import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";

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
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
```

---

## 🔗 Link Component

> **DON'T use `<a></a>` for making links. They refresh the page.**
>
> **USE `<Link to="path"/>` component**
>
> **React application is a single-page application.**

### Header.js

```js
import { LOGO_URL } from "../utils/constants";
import { useState, useEffect } from "react";
import { Link } from "react-router";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");

  useEffect(() => {
    console.log("useEffect Called!");
  }, [btnNameReact]);

  console.log("Header Rendered!");

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL}></img>
      </div>
      <div className="nav-items">
        <ul>
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

## 🔀 Types of Routing

> **Note:** There are two types of routing:
>
> 1. **CSR (Client Side Routing)**
> 2. **SSR (Server Side Routing)**

---

## 🎯 Dynamic Routing + Restaurant Menu (useParams)

### App.js

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

### Body.js

```js
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router";

const Body = () => {
  /*State Variable - Scope inside component */
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6327&lng=77.2198&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    const { restaurants } =
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle || [];

    setListOfRestaurants(restaurants);
    setRestaurantList(restaurants);
  };

  return listOfRestaurants.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            /*Filter Logic*/
            const filteredListOfRestaurants = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4.4
            );

            // Updating State variable
            setRestaurantList(filteredListOfRestaurants);
          }}
        >
          Top Rated Restaurants
        </button>
        <input
          type="text"
          placeholder="Search Restaurant"
          className="search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        ></input>
        <button
          className="search-btn"
          onClick={() => {
            setRestaurantList(
              restaurantList.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              )
            );
          }}
        >
          Search
        </button>
      </div>

      <div className="res-container">
        {restaurantList.map((restaurant) => (
          <Link
            to={`/restaurant/${restaurant.info.id}`}
            key={restaurant.info.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
```

### RestaurantMenu.js

```js
import { useState, useEffect } from "react";
import { resInfo } from "../utils/mockMenu";
import { useParams } from "react-router";

const RestaurantMenu = () => {
  const { resId } = useParams();

  /**Swiggy API ins not sending response so used mock Data, so used mockMenu */
  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6327&lng=77.2198&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`
  //       );
  //       const json = await response.json();
  //       console.log(json);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  const { itemCards } =
    resInfo.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card;

  return (
    <div className="res-menu-container">
      <h2>{resInfo.data.cards[0].card.card.text}</h2>
      {itemCards.map((menu) => (
        <div className="menu-card" key={menu.card.info.id}>
          <div>
            {menu.card.info.name} <br></br>
            {menu.card.info.defaultPrice / 100}₹
          </div>
          <div>
            <img
              src={
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                menu.card.info.imageId
              }
            ></img>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;
```

---

## 📝 Important Notes

> **Note:**
>
> - Link is behind the scene using anchor tag.
> - Link is a wrapper on anchor tag and doesn't let to refresh the page.

---
