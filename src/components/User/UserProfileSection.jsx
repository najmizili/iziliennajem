import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineShopping, AiOutlineLogout } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { GrUserAdmin } from "react-icons/gr";
import Loading from "../Loading/Loading";

const UserProfileSection = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const db = getFirestore();
  const [loading, setLoading] = useState(true);

  const handleLogOut = async () => {
    try {
      await auth.logOut();
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      navigate("/");
    }
  };

  useEffect(() => {
    const handleAdmin = async () => {
      if (auth.user) {
        const docRef = doc(db, `users/${auth.user.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
    
          const isAdmin = docSnap.data().admin;
          console.log("admin value:", isAdmin);

          if (isAdmin === true) {
            console.log("Administator");
            setIsAdmin(true);
            setLoading(false);
          } else {
            console.log("You are not an administrator user");
            navigate("/userProfile");
            setLoading(false);
          }
        }
      }
    };
    handleAdmin();
  }, [auth.user]);
  return (
    <div className="p-6">
      {loading ? <Loading /> : null}
      <h1 className="text-2xl font-semibold text-white mb-4 text-center mt-9">
        Hi, {auth.user ? auth.user.displayName : "Searching ..."}!
      </h1>
      {auth.user ? (
        <section className="flex justify-center ">
          <div className="flex space-x-2 mt-4">
            <Link to="/favorite">
              <div className="bg-red-800  p-4 rounded-md shadow-md hover:bg-red-700 transition duration-300 ease-in-out cursor-pointer flex flex-col items-center justify-center">
                <MdFavorite className="text-white text-3xl mb-1" />
                <p className="text-white font-semibold text-lg text-center">
                Favorites
                </p>
              </div>
            </Link>
            <Link to={auth.user ? "/UserOrders" : "/login"}>
              <div className="bg-gray-500 p-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer flex flex-col items-center justify-center">
                <AiOutlineShopping className="text-white text-3xl mb-1" />
                <p className="text-white font-semibold text-lg text-center">
                My Orders
                </p>
              </div>
            </Link>

            {isAdmin ? (
              <Link to="/admin">
                <div className="bg-green-900 p-4 rounded-md shadow-md hover:bg-green-600 transition duration-300 ease-in-out cursor-pointer flex flex-col items-center justify-center">
                  <GrUserAdmin className="text-white text-3xl mb-1" />
                  <p className="text-white font-semibold text-lg text-center">
                  Admin panel
                  </p>
                </div>
              </Link>
            ) : null}

            <div
              onClick={handleLogOut}
              className="bg-red-400 p-4 rounded-md shadow-md hover:bg-red-600 transition duration-300 ease-in-out cursor-pointer flex flex-col items-center justify-center"
            >
              <AiOutlineLogout className="text-white text-3xl mb-1" />
              <p className="text-white font-semibold text-lg text-center">
              Sign off
              </p>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default UserProfileSection;
