import { LOGO_URL } from "../utils/constants";
import { useState, useEffect, useContext } from "react";
import { Link, redirect } from "react-router";
import { useOnlineStatus } from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");

  useEffect(() => {
    console.log("useEffect Called!");
  }, [btnNameReact]);

  console.log("Header Rendered!");

  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);

  // Subscribing to the store
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

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
          <li className="font-bold">
            <Link to="/cart">Cart - ({cartItems.length} Items)</Link>
          </li>
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
