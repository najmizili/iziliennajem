import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  doc,
  getDocs,
  getDoc,
  collection,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import Loading from "../Loading/Loading";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EditProduct = () => {
  const { productId } = useParams();
  const db = getFirestore();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productDoc = await getDoc(doc(db, "Products", productId));
        if (productDoc.exists()) {
          console.log("Product loaded:", productDoc.data());
          setProduct({ id: productDoc.id, ...productDoc.data() });
        } else {
          console.log("The product does not exist");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error obtaining the product:", error.message);
      }
    };

    getProduct();
  }, [db, productId]);

  // Funciones de manejo de cambios
  const handleNameChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      nombre: e.target.value,
    }));
  };

  const handleDescriptionChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      description: e.target.value,
    }));
  };

  const handlePriceChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      price: e.target.value,
    }));
  };

  const handleCategoryIdChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      categoryId: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      img: e.target.value,
    }));
  };

  const handleStockChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      stock: e.target.value,
    }));
  };

  if (loading) {
    return <p>Charging...</p>;
  }

  // Función para guardar los cambios y que se modifiquen en la base de datos de Firebase
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "Products", product.id);
      await setDoc(docRef, {
        nombre: product.nombre,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId,
        img: product.img,
        stock: product.stock,
      });
      console.log("Updated product");
      navigate("/admin");
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
  };

  return (
    <div>
      <section className="flex justify-center items-center md:h-screen mm3:my-2 mm3:mx-3">
        {auth.user ? (
          <section className="flex justify-center ">
            <div className="flex flex-col items-center justify-center bg-green-800 bg-opacity-30 shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className="text-2xl font-semibold text-white mb-4 text-center">
              Edit Product
              </h2>
              <form className=" max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-0">
                  <div className=" px-3  md:mb-0">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                      {" "}
                      Product name{" "}
                    </label>
                    <input
                      className=" appearance-none block bg-black text-white border border-slate-700 rounded py-3 px-4 mb-3 leading-tight"
                      id="grid-name"
                      type="text"
                      value={product.nombre}
                      onChange={handleNameChange}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-0">
                  <div className="px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-white text-xs font-bold mb-2 "
                      htmlFor="grid-description"
                    >
                      Description
                    </label>
                    <textarea
                      className=" block bg-black text-white border border-slate-700 rounded py-3 px-4 mb-5 leading-tight"
                      id="grid-description"
                      type="text"
                      value={product.description}
                      onChange={handleDescriptionChange}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-0">
                  <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                      htmlFor="grid-price"
                    >
                      Price
                    </label>
                    <input
                      className=" block bg-black text-white border border-slate-700 rounded py-3 px-4 leading-tight"
                      id="grid-price"
                      type="number"
                      value={product.price}
                      onChange={handlePriceChange}
                    />
                  </div>
                  <div className=" md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                      htmlFor="grid-category"
                    >
                      Category
                    </label>
                    <input
                      className="appearance-none block bg-black text-white border border-slate-700 rounded py-3 px-4 leading-tight"
                      id="grid-category"
                      type="text"
                      value={product.categoryId}
                      onChange={handleCategoryIdChange}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                      htmlFor="grid-image"
                    >
                      Image
                    </label>
                    <input
                      className="appearance-none block  bg-black text-white border border-slate-700 rounded py-3 px-4 leading-tight"
                      id="grid-image"
                      type="text"
                      value={product.img}
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                      htmlFor="grid-stock"
                    >
                      Stock
                    </label>
                    <input
                      className="appearance-none block bg-black text-white border border-slate-700 rounded py-3 px-4 leading-tight"
                      id="grid-stock"
                      type="number"
                      value={product.stock}
                      onChange={handleStockChange}
                    />
                  </div>
                </div>
                <div className="flex -mx-3 mb-0 space-x-2">
                  <button
                    onClick={handleSaveChanges}
                    className="mb-3 block text-center py-1 px-2 rounded text-white bg-green-800 hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <Link to="/admin">
                    <button className="block text-center py-1 px-2 rounded text-white bg-red-800 hover:bg-red-700">
                      Cancel
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </section>
        ) : (
          // enviar al usuario a la página de login o a la home
          <p>Unauthenticated user</p>
        )}
      </section>
    </div>
  );
};

export default EditProduct;
