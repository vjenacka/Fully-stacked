import ProductsPage from "./pages/ProductsPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDetails from "./pages/UserDetails";
import { useAuthContext } from "./hooks/useAuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar></Navbar>
        <ToastContainer limit={1} />
        <Routes>
          <Route path="/" element={<ProductsPage></ProductsPage>}></Route>
          <Route
            path="/product/:id"
            element={<ProductDetails></ProductDetails>}
          ></Route>
          <Route
            path="/cart"
            element={user ? <Cart></Cart> : <Navigate to={"/"}></Navigate>}
          ></Route>
          <Route
            path="/profile"
            element={
              user ? (
                <UserDetails></UserDetails>
              ) : (
                <Navigate to={"/"}></Navigate>
              )
            }
          ></Route>
          <Route
            path="/register"
            element={
              !user ? <Register></Register> : <Navigate to={"/"}></Navigate>
            }
          ></Route>
          <Route
            path="/login"
            element={!user ? <Login></Login> : <Navigate to={"/"}></Navigate>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
