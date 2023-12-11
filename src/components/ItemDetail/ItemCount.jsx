import { useState, useContext, useEffect } from "react";
import { IoAddSharp } from "react-icons/io5";
import { RiSubtractFill } from "react-icons/ri";
import { CartContext } from "../../context/ShoppingCartContext";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";
import { IoMdHeart } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { motion } from "framer-motion";

const ItemCount = ({ producto }) => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useAuth();
  const [contador, setContador] = useState(1);
  const [favorito, setFavorito] = useState(false);
  const { addToFavorites, removeFromFavorites, favorites } = useFavorites();
  const [alertMessage, setAlertMessage] = useState(null);

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 2000); // Adjust the timeout as needed
  };

  const sumar = () => {
    setContador((prevContador) => prevContador + 1);
  };

  const restar = () => {
    setContador((prevContador) => prevContador - 1);
  };

  const addToCart = () => {
    if (!user) {
      showAlert("Log in to add products to cart");
      return;
    }

    const cartAux = [...cart];
    const yaExiste = cartAux.findIndex((item) => item.id === producto.id);

    if (yaExiste !== -1) {
      cartAux[yaExiste].cantComprar += contador;

      if (cartAux[yaExiste].cantComprar > producto.stock) {
        cartAux[yaExiste].cantComprar = producto.stock;

        setCart(cartAux);

        try {
          localStorage.setItem("cart", JSON.stringify(cartAux));
        } catch (error) {
          console.error("Error saving to local storage:", error);
        }

        showAlert("Maximum stock!");
        return;
      }
    } else {
      const nuevoItem = { ...producto, cantComprar: contador };
      cartAux.push(nuevoItem);
    }

    setCart(cartAux);

    try {
      localStorage.setItem("cart", JSON.stringify(cartAux));
    } catch (error) {
      console.error("Error saving to local storage:", error);
    }

    
  };

  const handleToggleFavorito = () => {
    if (!user) {
      showAlert("You must sign in to add products");
      return;
    }

    if (favorito) {
      removeFromFavorites(producto.id);
    } else {
      addToFavorites(producto);
    }
    setFavorito(!favorito);
  };

  useEffect(() => {
    setFavorito(favorites.some((item) => item.id === producto.id));
  }, [favorites, producto]);

  return (
    <section>
      <section className="gap-3  mm:justify-center flex flex-col mm3:gap-0">
        <section className="flex gap-3">
          <div className="bg-black ounded-md grid grid-cols-3 place-items-center h-9 overflow-hidden w-20  ">
            <button
              className={"disabled:cursor-not-allowed text-white "}
              onClick={restar}
              disabled={contador === 1}
            >
              <RiSubtractFill
                className={` ${
                  contador === 1 ? "text-gray-400" : "text-white"
                } hover:text-gray-400 h-6 w-6`}
              />
            </button>

            <span className="col-span-1 text-xl text-white font-semibold">
              {contador}
            </span>

            <button
              className="border-none text-white cursor-pointer grid place-content-center h-full outline-none text-base hover:text-gray-400 disabled:cursor-not-allowed"
              onClick={sumar}
              disabled={contador === producto.stock}
            >
              <IoAddSharp className="h-6 w-6" />
            </button>
          </div>
          <div className="flex justify-center items-center gap-7">
            <button
              className="bg-green-700 transition ease-in hover:bg-black hover:text-white text-white font-semibold h-8 w-32  disabled:cursor-not-allowed disabled:hover:bg-slate-500"
              onClick={addToCart}
            >
              Add to cart
            </button>
          </div>
        </section>

        <section className=" py-1  rounded-md px-1 mm3:rounded-md mm3:py-2 mm3:mt-3 ">
          <motion.button
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 1 }}
            onClick={handleToggleFavorito}
            className="  text-center w-full h-full "
          >
            {favorito ? (
              <IoMdHeart className="text-3xl text-red-500 mr-60" />
            ) : (
              <IoIosHeartEmpty className="text-3xl text-red-500 mr-60" />
            )}
          </motion.button>
        </section>
      </section>

      {/* Display alert message */}
      {alertMessage && (
        <div className="fixed top-9 right-0 m-5 p-2 bg-red-800 text-white">
          {alertMessage}
        </div>
      )}
    </section>
  );
};

export default ItemCount;
