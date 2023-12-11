import React, { useEffect, useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CartContext } from "../../context/ShoppingCartContext";

const CartWidget = () => {
  const { cart } = useContext(CartContext);
  const totalItemsInCart = cart.reduce(
    (total, item) => total + item.cantComprar,
    0
  );

  useEffect(() => {
    localStorage.setItem("cartNumber", JSON.stringify(totalItemsInCart));
  }, [cart]);

  return (
    <div className="p-1 rounded-md text-3xl cursor-pointer flex text-center">
      <AiOutlineShoppingCart className="text-white p-2 rounded-xl w-10 h-10" />
      <span className="bg-green-600 rounded-2xl text-white text-sm font-semibold h-5.7 w-5 place-content-center absolute translate-x-7 -translate-y-1.5">
        {totalItemsInCart}
      </span>
    </div>
  );
};

export default CartWidget;
