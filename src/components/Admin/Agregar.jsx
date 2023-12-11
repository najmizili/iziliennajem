import React, { useState, useEffect } from "react";
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
import { toast } from "react-toastify";

const Add = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const db = getFirestore();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({
    nombre: "",
    description: "",
    price: "",
    img: "",
    stock: "",
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  // Obtener todas las categorías
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const productsCollection = collection(db, "Products");
        const productsSnapshot = await getDocs(productsCollection);

        // Obtener categorías únicas
        const categoriaUnica = new Set();
        productsSnapshot.forEach((doc) => {
          const productData = doc.data();
          if (productData.categoryId) {
            categoriaUnica.add(productData.categoryId);
          }
        });

        setCategories(Array.from(categoriaUnica));
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    obtenerCategorias();
  }, [db]);

  // Cargar nuevo producto a la base de datos de firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, description, price, img, stock } = product;
    try {
      const priceToNumber = Number(price);
      const stockToNumber = Number(stock);
      await setDoc(doc(db, "Products", nombre), {
        nombre,
        description,
        price: priceToNumber,
        categoryId: selectedCategory,
        img,
        stock: stockToNumber,
      });

      console.log("Product added");
      navigate("/admin");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Funciones de manejo de cambios
  const handleName = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      nombre: e.target.value,
    }));
  };

  const handleDescription = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      description: e.target.value,
    }));
  };

  const handlePrice = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      price: e.target.value,
    }));
  };

  const handleImage = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      img: e.target.value,
    }));
  };

  const handleStock = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      stock: e.target.value,
    }));
  };

  return (
    <div>
      <section className="flex justify-center items-center md:h-screen mm3:my-2 mm3:mx-3">
        {auth.user ? (
          <section className="flex justify-center ">
            <div className="flex flex-col items-center justify-center bg-green-800 bg-opacity-30 shadow-md rounded px-8 pt-6 pb-8 mb-4">              <h2 className="text-2xl font-semibold text-white mb-4 text-center">
              ADD PRODUCT
              </h2>
              <form className=" max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-0">
                  <div className=" px-3 md:mb-0">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                      {" "}
                      Product name{" "}
                    </label>
                    <input
                      className=" appearance-none block bg-black text-white border border-slate-700 rounded py-3 px-4 mb-3 leading-tight"
                      type="text"
                      placeholder="Product Name"
                      onChange={handleName}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-0">
                  <div className=" px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2 ">
                    Description
                    </label>
                    <textarea
                      className="   block bg-black text-white border border-slate-700 rounded py-3 px-4 mb-5 leading-tight"
                      type="text"
                      placeholder="Description"
                      onChange={handleDescription}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className=" md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                    Price
                    </label>
                    <input
                      className=" block bg-black text-white border border-slate-700 rounded py-3 px-4 leading-tight"
                      type="number"
                      placeholder="Prix"
                      onChange={handlePrice}
                    />
                  </div>
                  <div className=" md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                    Category
                    </label>
                    <select
                      className="appearance-none block  bg-black text-white border border-slate-700 rounded py-3 px-4 leading-tight"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="" disabled>
                      Select a category
                      </option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-3">
                  <div className=" md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                    Image
                    </label>
                    <input
                      className="appearance-none block bg-black text-white border border-slate-700 rounded py-3 px-4 leading-tight"
                      type="text"
                      placeholder="URL"
                      onChange={handleImage}
                    />
                  </div>
                  <div className="md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                      Stock
                    </label>
                    <input
                      className="appearance-none block  bg-black text-white border border-slate-700 rounded py-3 px-4 leading-tight"
                      type="number"
                      placeholder="Stock"
                      onChange={handleStock}
                    />
                  </div>
                </div>
                <div className="flex  -mx-3 mb-0 space-x-2">
                  <button
                    className="mb-3 block text-center py-1 px-2  rounded text-white bg-green-800 hover:bg-green-600"
                    onClick={handleSubmit}
                  >
                    Add
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
          navigate("/")
        )}
      </section>
    </div>
  );
};

export default Add;
