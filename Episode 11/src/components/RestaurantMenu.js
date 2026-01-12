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
