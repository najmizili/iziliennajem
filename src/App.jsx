import ItemDetailContainer from "./components/ItemDetail/ItemDetailContainer";
import ItemListContainer from "./components/ItemList/ItemListContainer";
import NavBar from "./components/Navbar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import ShoppingCartContext from "./context/ShoppingCartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FinalizePurchase from "./components/FinalizePurchase/FinalizePurchase";
import Login from "./components/Login/Login";
import FavoriteItem from "./components/FavoriteProducts/FavoriteItem";
import Register from "./components/Registro/Register";
import Admin from "./components/Admin/Admin";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import UserProfileSection from "./components/User/UserProfileSection";
import UserInformation from "./components/User/UserInformation";
import UserOrders from "./components/User/UserOrders";
import DeleteOrders from "./components/deleteorders/DeleteOrders";
import EditProduct from "./components/Admin/EditProduct";
import Agregar from "./components/Admin/Agregar";
import Home from "./components/ItemList/home";


function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <FavoritesProvider>
            {" "}
            <ShoppingCartContext>
              <nav>
                <NavBar />
              </nav>

              <Routes> 
              <Route path="/" element={<Home />} />    
                <Route path="/y" element={<ItemListContainer />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Favorite" element={<FavoriteItem />} />
                <Route path="/UserOrders" element={<UserOrders />} />
                <Route path="/UserInformation" element={<UserInformation />} />
                <Route path="/userProfile" element={<UserProfileSection />} />
                <Route path="/deleteOrders" element={<DeleteOrders />} />
                <Route path="/editar/:productId" element={<EditProduct />} />
                <Route path="/agregar" element={<Agregar />} />

                <Route
                  path="/category/:categoryId"
                  element={<ItemListContainer />}
                />
                <Route path="/item/:id" element={<ItemDetailContainer />} />
                <Route
                  path="/finalizePurchase"
                  element={<FinalizePurchase />}
                />
              </Routes>
              <ToastContainer />
            </ShoppingCartContext>
          </FavoritesProvider>
        </AuthProvider>{" "}
      </BrowserRouter>
    </>
  );
}

export default App;
