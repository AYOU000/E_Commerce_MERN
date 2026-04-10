import { BrowserRouter, Route, Routes } from "react-router";
import NavBar from "./components/NavBar";
import { HomePage } from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./context/auth/AuthProvider";
import CartPage from "./pages/CartPage";
import ProtactedRoute from "./components/ProtactedRoute";
import CartProvider from "./context/cart/cartPovider";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtactedRoute />}>
              <Route path="/cart" element={<CartPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
