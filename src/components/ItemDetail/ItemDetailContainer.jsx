import React, { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Loading from "../Loading/Loading";
import { useFavorites } from "../../context/FavoritesContext";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToFavorites, removeFromFavorites, favorites } = useFavorites();

  useEffect(() => {
    const db = getFirestore();

    const oneItem = doc(db, "Products", `${id}`);
    getDoc(oneItem).then((snapshot) => {
      if (snapshot.exists()) {
        const docs = snapshot.data();
        setProduct({ id: snapshot.id, ...docs });
        setLoading(false);
      }
    });
  }, [id]);

  const isFavorite = favorites.some((item) => item.id === product.id);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <ItemDetail
        product={product}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
        isFavorite={isFavorite}
      />
    </div>
  );
};

export default ItemDetailContainer;
