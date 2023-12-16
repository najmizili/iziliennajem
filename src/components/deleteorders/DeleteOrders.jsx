import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const DeleteOrders = () => {
  const { user } = useAuth();
  const db = getFirestore();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteOrdersForUser = async () => {
    try {
      if (user) {
        const ordersCollection = collection(db, "usersOrders");

        const ordersDocs = await getDocs(ordersCollection);

        const deletePromises = ordersDocs.docs.map(async (orderDoc) => {
          await deleteDoc(orderDoc.ref);
        });

        await Promise.all(deletePromises);

        console.log("Order documents deleted successfully.");
      } else {
        console.log("Unauthenticated user.");
      }
    } catch (error) {
      console.error("Error deleting order documents:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteOrders = () => {
    setIsDeleting(true);
    deleteOrdersForUser();
  };

  return (
    <div>
      <button
        onClick={handleDeleteOrders}
        disabled={isDeleting}
        className={`bg-red-500 text-white px-4 py-2 rounded ${
          isDeleting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isDeleting ? "Eliminando..." : "Eliminar Órdenes"}
      </button>
    </div>
  );
};

export default DeleteOrders;
