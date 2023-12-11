import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // Recuperar favoritos del localStorage al cargar la página
    const storedFavorites = localStorage.getItem(`favorites-${user?.uid}`);
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, [user]);

  const addToFavorites = (item) => {
    setFavorites((prevFavorites) => [...prevFavorites, item]);
  };

  const removeFromFavorites = (itemId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== itemId)
    );
  };

  // Actualizar localStorage cada vez que cambian los favoritos
  useEffect(() => {
    localStorage.setItem(`favorites-${user?.uid}`, JSON.stringify(favorites));
  }, [favorites, user]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
