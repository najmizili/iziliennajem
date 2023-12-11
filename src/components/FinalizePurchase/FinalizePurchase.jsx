import React, { useState, useContext } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { collection, addDoc, getFirestore, doc } from "firebase/firestore";
import { CartContext } from "../../context/ShoppingCartContext";
import { AiOutlineCheck } from "react-icons/ai";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { updateDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const FinalizePurchase = () => {
  const { cart, setCart } = useContext(CartContext);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useAuth();
  const userEmail = user ? user.email : "";
  const displayName = user ? user.displayName : "";
  const db = getFirestore();
  const productosCollection = collection(db, "Products");

  const stepVariants = {
    hidden: { y: -20, transition: { duration: 0.6 } },
    visible: { y: 0, transition: { duration: 0.6 } },
  };

  const inputVariants = {
    hidden: { y: -20, transition: { duration: 0.4 } },
    visible: { y: 0, transition: { duration: 0.4 } },
  };

  const handlePurchaseFinalized = () => {
    setIsModalVisible(false);
  };

  const handlePhone = (e) => {
    const phoneNumberRegex = /^\d{10}$/;
    const newPhone = e.target.value;
    const validPhone = phoneNumberRegex.test(newPhone);
    setPhoneValid(validPhone);
  };

  const sendOrder = async () => {
    try {
      const orders = {
        buyer: {
          uid: user.uid,
          email: userEmail,
          name: displayName,
          phone: phone,
        },
        products: cart.map((item) => ({
          productName: item.nombre,
          quantity: item.cantComprar,
          price: item.price,
        })),
        total: cart.reduce(
          (total, item) => total + item.price * item.cantComprar,
          0
        ),
        estado: "Waiting",
      };

      const ordersColUser = collection(db, "usersOrders");
      const orderDoc = await addDoc(ordersColUser, orders);

      const updateStockPromises = cart.map((item) => {
        console.log("ID:", item.id);
        const docRef = doc(productosCollection, item.id);
        return updateDoc(docRef, {
          stock: item.stock - item.cantComprar,
        });
      });

      await Promise.all(updateStockPromises);

      setOrderId(orderDoc.id);
      return { id: orderDoc.id };
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (phone === "" || !phoneValid) {
      setIsSubmitClicked(true);
      return;
    }
    sendOrder();
    setCart([]);
    setIsSubmitClicked(true);
    setIsModalVisible(true);
  };

  return (
    <div className="bg-gradient-to-r  to-gray-800 min-h-screen flex items-center justify-center">
    <div className="relative py-1 sm:max-w-xl sm:mx-auto">
      <div className="relative px-4 py-10 bg-black h-50 w-30 mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <motion.div
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center space-x-5"
            >
              <div className=" rounded-full flex flex-shrink-0 justify-center items-center text-green-700 text-2xl font-mono">
                <IoIosCheckmarkCircleOutline className="w-10 h-10" />
              </div>
              <div className="block pl-2 text-white font-semibold text-xl self-start">
                <h2 className="leading-relaxed">
                  One click away!
                </h2>
                <p className="text-sm text-red-600 font-normal leading-relaxed">
                Complete the order inside Morocco.
                </p>
              </div>
            </motion.div>

            <form onSubmit={handleSubmit}>
              <div className=" divide-y divide-gray-700">
                <div className="py-9 space-y-4">
                  <motion.div
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="  flex flex-col" style={{ height: '65px' }}>
                      <label className="leading-loose text-white mt-2 ">Full Name</label>
                      <motion.input
                        style={{ width: '300px' }}
                        variants={inputVariants}
                        initial="hidden"
                        animate="visible"
                        type="text"
                        className="text-black font-semibold rounded-md opacity-80 disabled:cursor-not-allowed"
                        placeholder="example@gmail.com"
                        disabled={true}
                        value={displayName}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex flex-col">
                      <label className="leading-loose text-white ">Phone</label>
                      <motion.input
                        style={{ width: '300px' }}
                        variants={inputVariants}
                        initial="hidden"
                        animate="visible"
                        type="number"
                        className="text-black font-semibold rounded-md"
                        placeholder="0600000999"
                        onChange={(e) => {
                          setPhone(e.target.value);
                          handlePhone(e);
                        }}
                      />
                      {isSubmitClicked && phone === "" && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-600 font-bold text-base"
                        >
                          The PHONE can't be empty
                        </motion.p>
                      )}

                      {!phoneValid && isSubmitClicked && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-600 font-semibold text-base"
                        >
                          Please valid number (ex, 0600009999)
                        </motion.p>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex flex-col">
                      <label className="leading-loose text-white">Email</label>
                      <motion.input
                        style={{ width: '300px' }}
                        variants={inputVariants}
                        initial="hidden"
                        animate="visible"
                        type="text"
                        className="text-black font-semibold rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                        placeholder="example@gmail.com"
                        disabled={true}
                        value={userEmail}
                      />
                    </div>
                  </motion.div>
                </div>

                {}

                <div className="pt-4 flex items-center space-x-4">
                  <motion.button
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    className="ml-10 mb-4 bg-green-800 transition ease-in hover:bg-blue-700 justify-center items-center  text-white px-2 py-1 rounded-md focus:outline-none"
                    onClick={handlePurchaseFinalized}
                  >
                    Finalize Order
                  </motion.button>
                  <motion.button
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    className="mr-10 mb-4 bg-gray-700 transition ease-in hover:bg-gray-600  justify-center items-center text-white px-2 py-1 rounded-md focus:outline-none"
                    onClick={() => window.history.back()}
                  >
                    Go back
                  </motion.button>

                  {orderId && isModalVisible && (
                    <div className="fixed inset-0 flex items-center justify-center ">
                      <div className="bg-black opacity-40 fixed inset-0 z-40"></div>
                      <motion.div
                        style={{ width: '300px' }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="bg-white py-7 px-20 rounded-md shadow-lg z-50 relative"
                      >
                        <div className="flex items-center justify-center text-2xl mb-3">
                          <AiOutlineCheck className="w-14 h-14 bg-green-100 rounded-full text p-4 text-green-500" />
                        </div>
                        <div className="text-base text-center">
                          <p className="text-black font-semibold text-lg">
                            Order successful
                          </p>
                          <p className="text-black opacity-80 font-medium">
                            Thank you for shopping at <p className="text-green-700"> RajaShop!</p>
                          </p>
                          <p className="text-black mt-3 mb-8 font-semibold">
                            ID:{" "}
                            <span className="text-gray-400 bg-gray-100 rounded-md py-1 px-2">
                              {orderId}
                            </span>
                          </p>
                        </div>
                        <div className="border-t border-gray-200 pt-5 flex justify-center space-x-1">
                          <Link to={"/"}>
                            <button className=" px-2 py-1 rounded-md border-0 font-semibold text-green-700 hover:bg-violet-100">
                              Go Store
                            </button>
                          </Link>
                          <Link to={"/UserOrders"}>
                            <button className="bg-gray-50 px-2 py-1 rounded-md border-0 font-semibold text-gray-700 hover:bg-violet-100">
                              My orders
                            </button>
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
                <motion.div
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  className="pt-2 flex items-center space-x-4"
                >
                  
                </motion.div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalizePurchase;
