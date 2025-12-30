import { Route, Routes } from "react-router-dom"
import { ProductDetails } from "./pages/productDetails/ProductDetails"
import { ProductList } from "./pages/productList/ProductList"
import { CartListPage } from "./pages/cartList/CartListPage"

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/cart" element={<CartListPage />} />
      <Route path="/product-details/:id" element={<ProductDetails />} />
    </Routes>
  )
}
