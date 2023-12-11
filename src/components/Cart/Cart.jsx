import { motion } from "framer-motion";
import ItemsCart from "./ItemsCart";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineHome } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import { CartContext } from "../../context/ShoppingCartContext";
import { useContext } from "react";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const cartEmpty = cart.length === 0;
  const auth = useAuth();
  const displayName = auth.user ? auth.user.displayName : null;

  const clearCart = () => {
    setCart([]);
  };

  let cartTotal = 0;
  cart.forEach((item) => (cartTotal += item.price * item.cantComprar));

  return (
    <div className="container mx-auto mt-20 flex items-center justify-center">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl text-white">Your Cart</h1>
          <motion.a
            whileHover="hover"
            className="relative text-white"
            onClick={clearCart}
          >
            <motion.button
              className="bg-red-900 hover:bg-red-700 text-white font-bold py-1 px-2 rounded transition-all"
            >
              Clear Cart
            </motion.button>
          </motion.a>
        </div>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className=" sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cartEmpty ? (
              <div className="flex flex-col items-center justify-center">
                <span className="text-green-800 text-4xl bg-black p-4 rounded-full">
                  <AiOutlineShoppingCart />
                </span>
                <p className="text-2xl text-red-300 mt-4">
                  Sorry {displayName}, your cart is empty
                </p>
                <Link to={"/"}>
                  <p className="flex items-center gap-2 text-white text-xl mt-5 bg-green-800 cursor-pointer px-2 py-1 rounded-xl">
                    <AiOutlineHome className="w-6 h-6" /> Back Home
                  </p>
                </Link>
              </div>
            ) : (
              cart.map((producto) => (
                <div key={producto.id} className="mb-4">
                  <ItemsCart {...producto} />
                </div>
              ))
            )}
          </div>

          {!cartEmpty && (
            <div className="mt-4 p-5 bg-gray-100 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-semibold">Total:</h2>
                <span className="text-3xl font-bold">${cartTotal}</span>
              </div>
              <Link to={"/finalizePurchase"}>
                <button className="w-full py-2 bg-green-800 text-white rounded-lg hover:bg-indigo-600 transition ease-in">
                Order now
                </button>
              </Link>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default Cart;
