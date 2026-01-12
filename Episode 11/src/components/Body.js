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
