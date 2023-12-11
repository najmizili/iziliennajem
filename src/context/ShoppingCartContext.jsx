import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export const CartContext = createContext(null);

export const ShoppingCartContext = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const storedCart = localStorage.getItem(`cart-${user?.uid}`);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(`cart-${user?.uid}`, JSON.stringify(cart));
  }, [cart, user]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default ShoppingCartContext;
