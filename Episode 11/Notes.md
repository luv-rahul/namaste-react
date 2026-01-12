# 🚀 Namaste React: Episode 11 - Data is the new oil

## 🔝 Higher Order Components

> Higher Order Component is a function which takes a component and returns a component.

### RestaurantCard.js

```js
import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { id, name, avgRating, cuisines, areaName, cloudinaryImageId } =
    resData?.info;
  return (
    <div className="cursor-pointer p-1.5 w-75 h-68 rounded-lg m-2 overflow-hidden border border-transparent hover:border-[#b4b4b4]">
      <div>
        <img
          src={`${CDN_URL}${cloudinaryImageId}`}
          className="object-cover rounded-lg w-full h-40"
        ></img>
      </div>
      <div className="res-name">{name}</div>
      <div className="res-rating text-green-400">{avgRating} &#9733;</div>
      <div className="res-cuisines">{cuisines.join(", ")}</div>
      <div className="res-time">{areaName}</div>
    </div>
  );
};

/*Higher Order Component*/
export const withOpenedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white p-2 rounded-4xl">
          Opened
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
```

### Body.js

```js
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router";
import { useOnlineStatus } from "../utils/useOnlineStatus";
import { withOpenedLabel } from "./RestaurantCard";

const Body = () => {
  /*State Variable - Scope inside component */
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const RestaurantCardOpened = withOpenedLabel(RestaurantCard);

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

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return <h1>Looks like You're Offline</h1>;
  }

  return listOfRestaurants.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="p-10">
      <div className="p-5 flex gap-4 mx-[5%]">
        <button
          className="border-2 rounded-md px-2"
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
          className="border-2 px-4 rounded-md"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        ></input>
        <button
          className="border-2 rounded-md px-2"
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

      <div className="flex flex-wrap mx-[5%]">
        {restaurantList.map((restaurant) => (
          <Link
            to={`/restaurant/${restaurant.info.id}`}
            style={{ textDecoration: "none" }}
            key={restaurant.info.id}
          >
            {restaurant.info.isOpen ? (
              <RestaurantCardOpened resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
```

---

## ⚠️ Very Important Note

> I have fixed the `useRestaurantMenu.js` Hook and `RestaurantMenu.js` from this episode. It was because the API is not giving the data before and now it is fixed by using proxy.

### useRestaurantMenu.js

```js
import { useEffect, useState } from "react";
import axios from "axios";

export const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [resId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/menu/${resId}`
      );
      setResInfo(response);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { resInfo, loading, error };
};
```

### Proxy.js

```js
// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/menu/:resId", async (req, res) => {
  try {
    const { resId } = req.params;
    const { lat = "28.6327", lng = "77.2198" } = req.query;

    // Mobile API endpoint (often less restricted)
    const url = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resId}`;

    console.log("Fetching from mobile API:", url);

    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.swiggy.com/",
        Origin: "https://www.swiggy.com",
      },
      timeout: 10000,
    });

    if (response.data) {
      console.log("✅ Data received successfully!");
      res.json(response.data);
    } else {
      console.log("⚠️ Empty response");
      res.status(204).json({ message: "No data" });
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
```

---

## 🎯 Accordion

### RestaurantMenu.js

```js
import { useParams } from "react-router";
import { useRestaurantMenu } from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();

  /*Custom Hook*/
  const { resInfo, loading, error } = useRestaurantMenu(resId);
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  console.log(resInfo.data.data);

  const categories =
    resInfo?.data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  console.log("catergories", categories);

  return (
    <div>
      <h1 className="text-center font-bold my-6 text-2xl">
        {resInfo.data.data.cards[0].card.card.text}
      </h1>
      <p className="text-center text-lg">
        {resInfo.data.data.cards[2].card.card.info.cuisines.join(", ")}
      </p>
      {categories.map((category, index) => {
        return <RestaurantCategory data={category.card.card} key={index} />;
      })}
    </div>
  );
};

export default RestaurantMenu;
```

### RestaurantCategory.js

```js
import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data }) => {
  const [showItems, setShowItems] = useState(false);

  const handleClick = () => {
    showItems === false ? setShowItems(true) : setShowItems(false);
  };

  return (
    <div className="border bg-gray-50 shadow-lg p-4 w-1/2 mx-auto my-4">
      <div
        className="flex justify-between cursor-pointer"
        onClick={handleClick}
      >
        <span className="font-bold text-lg">
          {data.title} ({data.itemCards.length})
        </span>
        <span>{showItems ? "⬆️" : "⬇️"}</span>
      </div>
      {showItems && <ItemList items={data.itemCards} />}
    </div>
  );
};

export default RestaurantCategory;
```

### ItemList.js

```js
const ItemList = ({ items }) => {
  console.log("itemslist", items);
  return (
    <div>
      {items.map((menu) => (
        <div
          className="flex justify-between border-b my-4"
          key={menu.card.info.id}
        >
          <div>
            <h1 className="text-lg font-light">{menu.card.info.name}</h1>
            <p className="text-green-500">
              {(menu.card.info.defaultPrice ?? menu.card.info.price) / 100}₹
            </p>
          </div>
          <div className="relative">
            <button className="absolute bg-black text-white hover:bg-white hover:text-green-800  border rounded-lg px-2 top-20 left-8 cursor-pointer">
              Add+
            </button>
            <img
              className="w-28 h-28"
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

export default ItemList;
```

---

## 🛠️ Dev Tools

- Install React Dev Tools Chrome Extension

---

## 🎮 State Lifting - Controlled & Uncontrolled Component

> - **State Lifting** means the state of the child component is managed by the parent component.
> - **Controlled Component:** This means that the child component is controlled by parent component.
> - **Uncontrolled Component:** This means that the child component is not controlled by parent component. It controls itself.

### RestaurantMenu.js (With State Lifting)

```js
import { useParams } from "react-router";
import { useRestaurantMenu } from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const [showIndex, setShowIndex] = useState(null);

  /*Custom Hook*/
  const { resInfo, loading, error } = useRestaurantMenu(resId);
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  const categories =
    resInfo?.data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div>
      <h1 className="text-center font-bold my-6 text-2xl">
        {resInfo.data.data.cards[0].card.card.text}
      </h1>
      <p className="text-center text-lg">
        {resInfo.data.data.cards[2].card.card.info.cuisines.join(", ")}
      </p>
      {categories.map((category, index) => {
        return (
          // Controlled Component
          <RestaurantCategory
            data={category.card.card}
            key={index}
            showItems={index === showIndex ? true : false}
            setShowIndex={() => setShowIndex(index)}
          />
        );
      })}
    </div>
  );
};

export default RestaurantMenu;
```

### RestaurantCategory.js (Controlled)

```js
import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex();
  };

  return (
    <div className="border bg-gray-50 shadow-lg p-4 w-1/2 mx-auto my-4">
      <div
        className="flex justify-between cursor-pointer"
        onClick={handleClick}
      >
        <span className="font-bold text-lg">
          {data.title} ({data.itemCards.length})
        </span>
        <span>{showItems ? "⬆️" : "⬇️"}</span>
      </div>
      {showItems && <ItemList items={data.itemCards} />}
    </div>
  );
};

export default RestaurantCategory;
```

---

## 🔗 Props Drilling

> Passing props from a component to child component and from there to its another nested children.

> **Note: We should avoid Props Drilling.**

---

## 🌐 React Context

### UserContext.js

```js
import { createContext } from "react";

const UserContext = createContext({
  loggedInUser: "Default User",
});

export default UserContext;
```

### Header.js

```js
import { LOGO_URL } from "../utils/constants";
import { useState, useEffect, useContext } from "react";
import { Link, redirect } from "react-router";
import { useOnlineStatus } from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");

  useEffect(() => {
    console.log("useEffect Called!");
  }, [btnNameReact]);

  console.log("Header Rendered!");

  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);

  return (
    <div className="flex justify-between items-center px-4 shadow-lg bg-white">
      <div className="logo-container">
        <img className="w-24" src={LOGO_URL}></img>
      </div>
      <div className="nav-items">
        <ul className="flex gap-4">
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
              className="border border-b-black rounded-md px-0.5"
              onClick={() => {
                setBtnNameReact(btnNameReact === "Login" ? "Logout" : "Login");
              }}
            >
              {btnNameReact}
            </button>
          </li>
          <li className="font-bold">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
```

### About.js (Class Component)

```js
import User from "./User";
import UserClass from "./UserClass";
import React from "react";
import UserContext from "../utils/UserContext";

class About extends React.Component {
  constructor(props) {
    super(props);

    console.log("Parent Constructor");
  }

  componentDidMount() {
    console.log("Parent componentDidMount");
  }

  render() {
    console.log("Parent Render");
    return (
      <div className="about">
        <h2 className="text-4xl font-bold">About</h2>
        <h3>This is Namaste React</h3>
        <div>
          <UserContext.Consumer>
            {(data) => <h1 className="font-bold">User: {data.loggedInUser}</h1>}
          </UserContext.Consumer>
        </div>
        <UserClass />
      </div>
    );
  }
}

export default About;
```

---

## 🔄 Updating Context Values

### App.js

```js
import React, { useEffect, useState } from "react";
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
import UserContext from "./utils/UserContext";

/*Lazy Loading*/
const Grocery = lazy(() => import("./components/Grocery"));

const AppLayout = () => {
  const [userName, setUserName] = useState();

  useEffect(() => {
    /*Authentication API*/
    const data = {
      name: "Rahul",
    };
    setUserName(data.name);
  }, []);

  return (
    <UserContext.Provider value={{ loggedInUser: userName }}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </UserContext.Provider>
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

## 📝 Context Provider Scenarios

### 1. Whole Application Has Context

```js
<UserContext.Provider value={{ loggedInUser: userName }}>
  <div className="app">
    <Header />
    <Outlet />
  </div>
</UserContext.Provider>
```

### 2. Only Header Has Context

```js
<div className="app">
  <UserContext.Provider value={{ loggedInUser: userName }}>
    <Header />
  </UserContext.Provider>
  <Outlet />
</div>
```

### 3. Different Context for Header

```js
<UserContext.Provider value={{ loggedInUser: userName }}>
  <div className="app">
    <UserContext.Provider value={{ loggedInUser: "Elon Musk" }}>
      <Header />
    </UserContext.Provider>
    <Outlet />
  </div>
</UserContext.Provider>
```

### 4. Changing UserContext from Anywhere

**App.js:**

```js
<UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
  <div className="app">
    <Header />
    <Outlet />
  </div>
</UserContext.Provider>
```

**Any Component:**

```js
const { loggedInUser, setUserName } = useContext(UserContext);
```

**Input to Change Context:**

```js
<input
  type="text"
  placeholder="User Context"
  className="border-2 px-4 rounded-md"
  value={loggedInUser}
  onChange={(e) => {
    setUserName(e.target.value);
  }}
></input>
```

---

## 🎯 Complete Implementation

### App.js (Final)

```js
import React, { useEffect, useState } from "react";
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
import UserContext from "./utils/UserContext";

/*Lazy Loading*/
const Grocery = lazy(() => import("./components/Grocery"));

const AppLayout = () => {
  const [userName, setUserName] = useState();

  useEffect(() => {
    /*Authentication API*/
    const data = {
      name: "Rahul",
    };
    setUserName(data.name);
  }, []);

  return (
    <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </UserContext.Provider>
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

### Body.js (With Context)

```js
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router";
import { useOnlineStatus } from "../utils/useOnlineStatus";
import { withOpenedLabel } from "./RestaurantCard";
import UserContext from "../utils/UserContext";

const Body = () => {
  /*State Variable - Scope inside component */
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const RestaurantCardOpened = withOpenedLabel(RestaurantCard);

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

  const onlineStatus = useOnlineStatus();

  const { loggedInUser, setUserName } = useContext(UserContext);

  if (onlineStatus === false) {
    return <h1>Looks like You're Offline</h1>;
  }

  return listOfRestaurants.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="p-10">
      <div className="p-5 flex gap-4 mx-[5%]">
        <button
          className="border-2 rounded-md px-2"
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
          className="border-2 px-4 rounded-md"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        ></input>
        <button
          className="border-2 rounded-md px-2"
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
        <input
          type="text"
          placeholder="User Context"
          className="border-2 px-4 rounded-md"
          value={loggedInUser}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        ></input>
      </div>

      <div className="flex flex-wrap mx-[5%]">
        {restaurantList.map((restaurant) => (
          <Link
            to={`/restaurant/${restaurant.info.id}`}
            style={{ textDecoration: "none" }}
            key={restaurant.info.id}
          >
            {restaurant.info.isOpen ? (
              <RestaurantCardOpened resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
```

---
