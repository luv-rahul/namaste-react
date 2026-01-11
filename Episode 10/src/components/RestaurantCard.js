import { Link } from "react-router";
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

export default RestaurantCard;
