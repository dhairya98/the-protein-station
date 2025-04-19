import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cardItems = useSelector((store) => store.cart.items);
  console.log("Card Items", cardItems);
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearCart());
  };

  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="w-6/12 m-auto">
        {cardItems.length > 0 && (
          <button
            className="p-2 m-2 bg-black text-white rounded-lg"
            onClick={handleClear}
          >
            Clear Cart
          </button>
        )}
        {cardItems.length === 0 && <h1>No items here</h1>}
        <ItemList items={cardItems} />
      </div>
    </div>
  );
};

export default Cart;
