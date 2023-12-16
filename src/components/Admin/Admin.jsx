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
} from "firebase/firestore";
import Loading from "../Loading/Loading";
import { IoIosAddCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

const Admin = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const db = getFirestore();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  const [encontrado, setEncontrado] = useState([]);
  const displayName = auth.user ? auth.user.displayName : null;

  const filtradoPorNombre = (nombre) => {
    if (nombre) {
      const encontrados = products.filter((producto) =>
        producto.nombre.toLowerCase().includes(nombre.toLowerCase())
      );
      encontrados.sort((a, b) => a.stock - b.stock);
      setEncontrado(encontrados);
    } else if (!nombre) {
      setEncontrado(products);
    }
  };
  const tableStyle = {
    fontSize: '14px', 
    margin: '0 auto', 
  };
  useEffect(() => {
    const verificarRol = async () => {
      if (auth.user) {
        const docRef = doc(db, `users/${auth.user.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const isAdmin = docSnap.data().admin;
          console.log("admin value:", isAdmin);

          if (isAdmin === true) {
            console.log("Administator");
            setIsAdmin(true);
          } else {
            console.log("You are not an administrator user");
            navigate("/");
          }
        }
      }
    };

    if (auth.user !== null) {
      verificarRol();
    }

    const getProducts = async () => {
      try {
        const ordersCollection = collection(db, "Products");
        const querySnapshot = await getDocs(ordersCollection);
        const allProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(allProducts.sort((a, b) => a.stock - b.stock));
        setEncontrado(allProducts);
        setLoading(false);
        console.log(allProducts);
      } catch (error) {
        console.error("Error getting products:", error.message);
      }
    };

    getProducts();
  }, [auth.user, navigate, db]);

  const handleDeleteProduct = async (productId) => {
    try {
      const confirmacion = window.confirm(
        "Are you sure?"
      );

      if (confirmacion) {
        const productRef = doc(db, "Products", productId);
        await deleteDoc(productRef);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
        setEncontrado((prevEncontrado) =>
          prevEncontrado.filter((product) => product.id !== productId)
        );

      } else {


        console.log("Product was not removed");
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };
   if (loading) {
    return <Loading />;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    
    <div className="container mx-auto my-2 mm3:m-0 flex flex-col items-center justify-center">
  <div className="flex justify-center mb-4 flex-col items-center text-center">
    <h2 className="text-white font-semibold text-3xl mb-2">
      hi! {displayName}
    </h2>
    <span className="text-sm text-gray-400 mm3:mx-2 mm3:text-base">
      All products uploaded to the database will be displayed here.
    </span>
  </div>

  <div className="flex flex-col items-center">
    <input
      className="border border-green-700 rounded-md px-1 py-0 mt-4 mb-7 focus:ring-blue-600 font-semibold mm3:w-full mm3:mb-2 mm3:px-2 bg-transparent"
      onChange={(e) => filtradoPorNombre(e.target.value)}
      placeholder="Search product"
    />

    <button
      className="bg-green-700 hover:bg-green-700 text-white font-bold py-1 px-1 rounded ml-1 mt-1 mb-8 flex items-center ease-in-out transition-all duration-300 mm3:w-full mm3:mb-2 mm3:px-2 mm3:py-2 mm3:ml-0 mm3:mt-2"
      onClick={() => navigate("/agregar")}
    >
      <IoIosAddCircleOutline className="h-6 w-6" /> Add product
    </button>
  </div>
      <section className="mm3:mx-3 mm3:my-3 ">
      <table className="text-md text-center text-white bg-black border border-gray-800 mx-auto">
          <thead>
            <tr className="bg-green-900">
              <th className="py-2 px-4 border-b border-b-white-700">Name</th>
              <th className="py-2 px-4 border-b border-b-white-700 mm3:hidden ">
              Price
              </th>
              <th className="py-2 px-4 border-b border-b-white-700">Stock</th>
              <th className="py-2 px-4 border-b border-b-white-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {encontrado.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b border-b-white-700">
                  {product.nombre}
                </td>
                <td className="py-2 px-4 border-b border-b-white-700 mm3:hidden  text-lg font-semibold">
                  dh {product.price}
                </td>
                <td className="py-2 px-4 border-b border-b-white-700  text-lg font-semibold">
                  {product.stock > 0 ? (
                    <span className="bg--500 text-white py-1 px-3 rounded-full text-xs">
                      {product.stock}
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white py-1 px-3 rounded-full text-xs">
                      {product.stock}
                    </span>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-b-white-700">
                  <button
                    className="bg-gray-800 hover:bg-gray-500 text-white font-bold py-1 px-2 rounded mr-2 mm3:px-2 mm3:py-1 mm3:mb-2"
                    onClick={() => navigate(`/editar/${product.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mm3:px-2 mm3:py-1"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Admin;
