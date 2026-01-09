import { useState, useEffect } from "react";
import { resInfo } from "../utils/mockMenu";
import { useParams } from "react-router";

const RestaurantMenu = () => {
  const { resId } = useParams();

  /**Swiggy API ins not sending response so used mock Data */
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
