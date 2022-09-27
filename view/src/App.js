import ProductsPage from "./pages/ProductsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<ProductsPage></ProductsPage>}></Route>
          <Route
            path="/product/:id"
            element={<ProductDetails></ProductDetails>}
          ></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
