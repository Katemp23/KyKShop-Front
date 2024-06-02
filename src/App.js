import './App.scss';
// react router v6
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// pages
import {Home, CategoryProduct, ProductSingle, Cart, Search} from "./pages/index";
// components
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import store from "./store/store";
import {Provider} from "react-redux";
import CheckoutPage from './pages/CheckOutPage/CheckoutPage';
import SuccessfulSalePage from './pages/SuccessfulSalePage/SuccessfulSalePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import BillsPage from './pages/BillsPage/BillsPage';

function App() {
  return (
    <div className="App">
      <Provider store = {store}>
        <BrowserRouter>
          <Header />
          <Sidebar />

          <Routes>
            {/* home page route */}
            <Route path = "/" element = {<Home />} />
            {/* single product route */}
            <Route path = "/product/:id" element = {<ProductSingle />} />
            {/* category wise product listing route */}
            <Route path = "/category/:category" element = {<CategoryProduct />} />
            {/* cart */}
            <Route path = "/cart" element = {<Cart />} />
            {/* searched products */}
            <Route path = "/search/:searchTerm" element = {<Search />} />
            {/* Checkout */}
            <Route path = "/checkout" element = {<CheckoutPage />} />
            {/* Compra exitosa */}
            <Route path = "/compra-exitosa" element = {<SuccessfulSalePage />} />
            {/* Perfil del usuario */}
            <Route path = "/profile" element = {<ProfilePage />} />
            {/* Facturas del usuario */}
            <Route path = "/invoices" element = {<BillsPage />} />
            {/* Móudulo de administrador */}
            <Route path = "/admin" element = {<SuccessfulSalePage />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
