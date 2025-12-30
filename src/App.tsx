import { Route, Routes } from "react-router-dom"
import { ProductDetails } from "./pages/productDetails/ProductDetails"
import { ProductList } from "./pages/productList/ProductList"
import { CartListPage } from "./pages/cartList/CartListPage"
import { Login } from "./pages/auth/login/Login"
import { Register } from "./pages/auth/register/Register"

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/product-list" element={<ProductList />} />
      <Route path="/cart" element={<CartListPage />} />
      <Route path="/product-details/:id" element={<ProductDetails />} />
    </Routes>
  )
}
