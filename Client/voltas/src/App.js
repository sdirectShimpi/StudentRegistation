import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Product from "./Pages/Product";
import AddProduct from "./Pages/AddProduct";
import Profile from "./Pages/Profile";
import Navbar from "./Common/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import PubilcRoute from "./Pages/PubilcRoute";
import PrivatetRoutes from "./Pages/PrivatetRoutes";
import PageNotFound from "./Pages/PageNotFound";
import Cart from "./Pages/Cart";
import Order from "./Pages/Order";
import Success from "./Pages/Success";
import { Cancle } from "./Pages/Cancle";
import AddChart from "./Pages/AddChart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivatetRoutes />}>
          <Route index path="" element={<Profile />} />

          <Route path="/products" element={<Product />}></Route>
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/changePassword" element={<Navbar/>} />
          <Route path="/order" element={<Order/>} />
          <Route path="/success" element={<Success />} />
          <Route path="/Cancle" element={<Cancle />} />
         
        </Route>

         
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/chart" element={<AddChart/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
