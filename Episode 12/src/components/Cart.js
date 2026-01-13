import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  //   const cartItems = useSelector((store) => store.cart.items);
  const store = useSelector((store) => store);
  const cartItems = store.cart.items;
  console.log(cartItems);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="w-1/2 mx-auto my-5">
      <h1 className="text-center text-xl font-bold">Cart</h1>
      <button
        className="border rounded-lg p-2 bg-black text-white text-center cursor-pointer"
        onClick={handleClearCart}
      >
        Clear Cart
      </button>
      <div>
        {cartItems.length === 0 ? (
          <h1 className="text-center text-4xl">Please add Items to Cart</h1>
        ) : (
          <ItemList items={cartItems} />
        )}
      </div>
    </div>
  );
};

export default Cart;
