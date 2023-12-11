import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import LoadingV2 from "../Loading/LoadingV2";

const UserOrders = () => {
  const { user } = useAuth();
  const [userOrders, setUserOrders] = useState([]);
  const db = getFirestore();
  const [loading, setLoading] = useState(true);
  const fechaPedido = Timestamp.fromDate(new Date());

  useEffect(() => {
    const getOrder = async () => {
      try {
        const ordersCollection = collection(db, "usersOrders");
        if (user) {
          const q = query(ordersCollection, where("buyer.uid", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const orders = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUserOrders(orders);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    getOrder();
  }, [user, db]);

  return (
    <div className="p-4 mx-auto lg:w-3/4">
      <div className="flex items-center  justify-between pb-6">
        <div>
          <h2 className="text-gray-300 font-semibold text-xl">Your shopping:</h2>
          <span className="text-xs text-gray-400">
          All purchase orders placed will be displayed.
          </span>
        </div>
        <div className="flex items-center"></div>
      </div>
      <div className="">
        {loading ? (
          <LoadingV2 />
        ) : (
          <div className="overflow-x-auto rounded-lg">
            {userOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center">
                <p className="text-gray-300 text-xl font-semibold">
                There are no purchase orders.
                </p>
                <Link to="/">
                  <button className="bg-green-700 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-md mt-4">
                    Go store
                  </button>
                </Link>
              </div>
            ) : (
              <table className="w-full text-sm text-left rtl:text-right text-white">
                <thead className="text-xs text-white uppercase bg-green-100">
                  <tr>
                    <th className="px-3 py-3 border-b-2 border-white-600 bg-green-700 text-left text-xs font-semibold uppercase tracking-wider">
                    DATE OF ORDER
                    </th>
                    <th className="px-3 py-3 border-b-2 border-white-600 bg-green-700 text-left text-xs font-semibold uppercase tracking-wider">
                    ID
                    </th>
                    <th className="px-3 py-3 border-b-2 border-white-600 bg-green-700 text-left text-xs font-semibold uppercase tracking-wider">
                    Products
                    </th>
                    <th className="px-3 py-3 border-b-2 border-white-600 bg-green-700 text-left text-xs font-semibold uppercase tracking-wider">
                    Total
                    </th>
                    <th className="px-3 py-3 border-b-2 border-white-600 bg-green-700 text-left text-xs font-semibold uppercase tracking-wider">
                    condition
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-3 py-3 border-b border-white-600 bg-green-800 text-sm">
                        <p className="text-gray-300">
                          {fechaPedido.toDate().toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-3 py-3 border-b border-white-600 bg-green-800 text-sm">
                        <p className="text-gray-300">{order?.id}</p>
                      </td>
                      <td className="px-3 py-3 border-b border-white-600 bg-green-800 text-sm whitespace-nowrap">
                        <ul className="list-disc list-inside">
                          {order.products.map((product) => (
                            <li key={product?.productName}>
                              <span className="font-semibold text-base">
                                {product?.quantity}x
                              </span>{" "}
                              {product?.productName}
                            </li>
                          ))}
                        </ul>
                      </td>

                      <td className="px-3 py-3 border-b border-white-600 bg-green-800 text-sm">
                        <p className="text-white font-bold text-lg">
                          dh {order?.total}
                        </p>
                      </td>
                      <td className="border-b border-white-600 bg-green-800">
                        <p className="text-white font-bold text-lg ">
                          {order?.estado === "Enviado" ? (
                            <span className="bg-green-100 text-green-700 text-sm rounded-full shadow-sm px-2 py-1 mx-2">
                              {order?.estado}
                            </span>
                          ) : (
                            <span className="bg-red-100 text-red-700 text-sm rounded-full shadow-sm  px-2 py-1 mx-2">
                              {order?.estado}
                            </span>
                          )}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
