import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { name, avgRating, cuisines, areaName, cloudinaryImageId } =
    resData?.info;
  return (
    <div className="res-card">
      <div className="res-image">
        <img src={`${CDN_URL}${cloudinaryImageId}`}></img>
      </div>
      <div className="res-name">{name}</div>
      <div className="res-rating">{avgRating} &#9733;</div>
      <div className="res-cuisines">{cuisines.join(", ")}</div>
      <div className="res-time">{areaName}</div>
    </div>
  );
};

export default RestaurantCard;
