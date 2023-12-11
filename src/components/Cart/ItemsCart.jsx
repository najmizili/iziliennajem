import React, { useContext, useState } from "react";
import { CartContext } from "../../context/ShoppingCartContext";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoAddSharp, IoRemoveSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const ItemsCart = ({ id, nombre, price, img, cantComprar, stock }) => {
  const { cart, setCart } = useContext(CartContext);
  const [contador, setContador] = useState(cantComprar);

  const deleteProduct = () => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);

  };

  const updateCart = (amount) => {
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      updatedCart[itemIndex].cantComprar = contador + amount;
      setCart(updatedCart);
      setContador(contador + amount);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-4 flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={img}
          alt={nombre}
          className="w-20 h-20 object-cover rounded-md mr-4"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{nombre}</h2>
          <p className="text-sm text-gray-600">
            ${price} x {cantComprar}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <button
            className="text-gray-600 focus:outline-none"
            onClick={() => updateCart(-1)}
            disabled={contador === 1}
          >
            <IoRemoveSharp className="h-6 w-6" />
          </button>
          <span className="mx-2">{contador}</span>
          <button
            className="text-gray-600 focus:outline-none"
            onClick={() => updateCart(1)}
            disabled={contador === stock}
          >
            <IoAddSharp className="h-6 w-6" />
          </button>
        </div>
        <button
          className="text-red-500 focus:outline-none"
          onClick={deleteProduct}
        >
          <RiDeleteBin6Line className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default ItemsCart;
