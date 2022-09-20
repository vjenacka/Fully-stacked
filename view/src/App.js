import ProductsPage from "./pages/ProductsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<ProductsPage></ProductsPage>}></Route>
          <Route
            path="/product/1"
            element={<ProductDetails></ProductDetails>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
