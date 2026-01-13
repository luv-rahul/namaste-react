import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const ItemList = ({ items }) => {
  console.log("itemslist", items);

  const dispatch = useDispatch();

  const handleAddItem = (menu) => {
    // Dispatch an action
    dispatch(addItem(menu));
  };

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
            <button
              className="absolute bg-black text-white hover:bg-white hover:text-green-800  border rounded-lg px-2 top-20 left-8 cursor-pointer"
              onClick={() => handleAddItem(menu)}
            >
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
