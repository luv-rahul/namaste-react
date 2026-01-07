# 🚀 Namaste React: Episode 6 - Exploring the World

## 🏗️ Monolith vs Microservice

### 1. Monolith Architecture

- In this architecture, there are multiple services like API, UI, Auth, DB, SMS etc. enclosed in a single repo (project).
- If we change any small thing in the project, we had to build the whole project again.

### 2. Microservice Architecture

- In this architecture, there are multiple separate services for each task like Backend, UI, Auth, DB, SMS, Email etc.
- It follows single responsibility principle.

---

## 📡 Fetch Data from LIVE API

### Two Approaches

1. **Loads → API → Render**
2. **Loads → Render mock UI → API → Re-render UI**

> In React, the second approach is better as it gives better UX.

> **React is fast, because React render cycle is very fast.**

---

## 🔄 useEffect

> `useEffect` Hook is called after the component is rendered.

```js
import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import { useState, useEffect } from "react";

const Body = () => {
  /*State Variable - Scope inside component */
  const [listOfRestaurants, setListOfRestaurants] = useState(resList);

  useEffect(() => {
    console.log("useEffect Called!");
  }, []);

  console.log("Body Rendered");

  return (
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
            setListOfRestaurants(filteredListOfRestaurants);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard resData={restaurant} key={restaurant.info.id} />
        ))}
      </div>
    </div>
  );
};

export default Body;
```

---

## 🌐 Fetch Live Data

```js
import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import { useState, useEffect } from "react";

const Body = () => {
  /*State Variable - Scope inside component */
  const [listOfRestaurants, setListOfRestaurants] = useState(resList);

  useEffect(() => {
    console.log("useEffect Called!");
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6327&lng=77.2198&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    const { restaurants } =
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle || [];
    console.log(json);

    setListOfRestaurants(restaurants);
  };

  return (
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
            setListOfRestaurants(filteredListOfRestaurants);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard resData={restaurant} key={restaurant.info.id} />
        ))}
      </div>
    </div>
  );
};

export default Body;
```

---

## ✨ Shimmer

### Body.js

```js
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";

const Body = () => {
  /*State Variable - Scope inside component */
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  useEffect(() => {
    console.log("useEffect Called!");
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6327&lng=77.2198&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    const { restaurants } =
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle || [];
    console.log(json);

    setListOfRestaurants(restaurants);
  };

  if (listOfRestaurants.length == 0) {
    return <h2>Loading...</h2>;
  }

  return (
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
            setListOfRestaurants(filteredListOfRestaurants);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard resData={restaurant} key={restaurant.info.id} />
        ))}
      </div>
    </div>
  );
};

export default Body;
```

### Shimmer.js

```js
const Shimmer = () => {
  return (
    <div className="shimmer-container">
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
    </div>
  );
};

export default Shimmer;
```

### index.css

```css
.shimmer-container {
  display: flex;
  flex-wrap: wrap;
  margin: 0 7%;
}

.shimmer-card {
  height: 260px;
  width: 260px;
  background-color: rgba(198, 197, 197, 0.242);
  border-radius: 10px;
  margin: 20px;
}
```

### Body.js (With Shimmer)

```js
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  /*State Variable - Scope inside component */
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  useEffect(() => {
    console.log("useEffect Called!");
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6327&lng=77.2198&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    const { restaurants } =
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle || [];
    console.log(json);

    setListOfRestaurants(restaurants);
  };

  if (listOfRestaurants.length == 0) {
    return <Shimmer />;
  }

  return (
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
            setListOfRestaurants(filteredListOfRestaurants);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard resData={restaurant} key={restaurant.info.id} />
        ))}
      </div>
    </div>
  );
};

export default Body;
```

---

## 🔀 Conditional Rendering

```js
/*Conditional Rendering */
if (listOfRestaurants.length == 0) {
  return <Shimmer />;
}
```

### Using Ternary Operator

```js
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  /*State Variable - Scope inside component */
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  useEffect(() => {
    console.log("useEffect Called!");
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6327&lng=77.2198&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    const { restaurants } =
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle || [];
    console.log(json);

    setListOfRestaurants(restaurants);
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
            setListOfRestaurants(filteredListOfRestaurants);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard resData={restaurant} key={restaurant.info.id} />
        ))}
      </div>
    </div>
  );
};

export default Body;
```

---

## 🔐 Login / Logout Button

### Header.js (Without State)

```js
import { LOGO_URL } from "../utils/constants";

const Header = () => {
  let btnName = "Login";

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL}></img>
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Cart</li>
          <li>
            <button
              className="login"
              onClick={() => {
                btnName = "Logout";
                console.log(btnName);
              }}
            >
              {btnName}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
```

> **This will not change the button name to "Logout" on UI.**
>
> Instead, we need to use React State Variables.

### Header.js (With State)

```js
import { LOGO_URL } from "../utils/constants";
import { useState } from "react";

const Header = () => {
  let btnName = "Login";

  const [btnNameReact, setBtnNameReact] = useState("Login");

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL}></img>
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Cart</li>
          <li>
            <button
              className="login"
              onClick={() => {
                setBtnNameReact("Logout");
                console.log(btnNameReact);
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

> **Whenever state variable will change, React will re-render the whole component with new value.**

```js
import { LOGO_URL } from "../utils/constants";
import { useState } from "react";

const Header = () => {
  let btnName = "Login";

  const [btnNameReact, setBtnNameReact] = useState("Login");

  console.log("Header Rendered"); // Header Component rendered again when state variable change.

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL}></img>
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Cart</li>
          <li>
            <button
              className="login"
              onClick={() => {
                setBtnNameReact("Logout");
                console.log(btnNameReact);
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

## 🤔 Important Question

> **How the "const" state variable is modifying?**
>
> ```js
> const [btnNameReact, setBtnNameReact] = useState("Login");
> ```
>
> React creates a **new** const variable with new value while re-rendering.

---

## 🔄 Toggle Button

```js
import { LOGO_URL } from "../utils/constants";
import { useState } from "react";

const Header = () => {
  let btnName = "Login";

  const [btnNameReact, setBtnNameReact] = useState("Login");

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL}></img>
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
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

> **React is fast because of it's faster Re-conciliation Cycle.**

---

## 🔍 Search Input

```js
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  /*State Variable - Scope inside component */
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

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
            setListOfRestaurants(filteredListOfRestaurants);
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
            setListOfRestaurants(
              listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              )
            );
          }}
        >
          Search
        </button>
      </div>

      <div className="res-container">
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard resData={restaurant} key={restaurant.info.id} />
        ))}
      </div>
    </div>
  );
};

export default Body;
```

---

## 🔍 Search Input + Top Rated Restaurants

```js
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

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
          <RestaurantCard resData={restaurant} key={restaurant.info.id} />
        ))}
      </div>
    </div>
  );
};

export default Body;
```

---
