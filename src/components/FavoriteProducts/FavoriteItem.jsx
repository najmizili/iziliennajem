import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "../../context/FavoritesContext";
import Item from "../ItemList/Item";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
const FavoriteItem = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const [loading, setLoading] = useState(true);

  const clearFavorites = () => {
    favorites.forEach((item) => removeFromFavorites(item.id));
  };

  useEffect(() => {
    const simulateFetchAsync = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    simulateFetchAsync();
  }, []);

  const deleteFavorite = (id) => {
    removeFromFavorites(id);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-20">
      <h2 className="text-left text-3xl font-bold mb-4 text-white">
      FAVORITE PRODUCTS
      </h2>
      {favorites.length > 0 && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className=" bg-red-900 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ease-in-out transition-all duration-300 mb-1"
          onClick={clearFavorites}
        >
          Clear 
        </motion.button>
      )}
      <AnimatePresence>
        {loading ? (
          <Loading />
        ) : favorites.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {favorites.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="relative">
                  <Item
                    id={item.id}
                    nombre={item.nombre}
                    stock={item.stock}
                    price={item.price}
                    img={item.img}
                  />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-5 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full transition-all duration-300"
                    onClick={() => deleteFavorite(item.id)}
                  >
                    Clear
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center"
          >
            <p className="text-red-300 text-xl font-semibold mb-4">
            There are no favorite products.
            </p>
            <Link to={"/"}>
              <button className="bg-green-700 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-md ">
              Go Store
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FavoriteItem;
