import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import Loading from "../Loading/Loading";
import FavoriteItem from "../FavoriteProducts/FavoriteItem";

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [productByCategory, setProductByCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();

    const itemsCollection = collection(db, "Products");
    getDocs(itemsCollection).then((snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(docs);
      setLoading(false);
      setProductByCategory(docs);
    });
  }, []);

  useEffect(() => {
    if (categoryId) {
      const filteredProducts = products.filter(
        (product) => product.categoryId === categoryId
      );
      setProductByCategory(filteredProducts);
    } else {
      setProductByCategory(products);
    }
  }, [categoryId, products]);

  useEffect(() => {}, [productByCategory]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-center text-white text-3xl mt-20">
      Make time to feel more.
      </h1>
      <ItemList productos={productByCategory} />
    </div>
  );
};

export default ItemListContainer;
