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
