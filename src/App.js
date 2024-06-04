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
import AdminPage from './pages/AdminPage/AdminPage';

function App() {
  return (
    <div className="App">
      <Provider store = {store}>
        <BrowserRouter>
          <Header />
          <Sidebar />

          <Routes>
            {/* Ruta de la página principal Home */}
            <Route path = "/" element = {<Home />} />
            {/* Ruta de un producto simple */}
            <Route path = "/product/:id" element = {<ProductSingle />} />
            {/* Ruta de un listado de categorias */}
            <Route path = "/category/:category" element = {<CategoryProduct />} />
            {/* Ruta del carrito */}
            <Route path = "/cart" element = {<Cart />} />
            {/* Ruta de la búsqueda de un producto */}
            <Route path = "/search/:searchTerm" element = {<Search />} />
            {/* Ruta de pago */}
            <Route path = "/checkout" element = {<CheckoutPage />} />
            {/* Ruta de Compra exitosa */}
            <Route path = "/compra-exitosa" element = {<SuccessfulSalePage />} />
            {/* Ruta de Perfil del usuario */}
            <Route path = "/profile" element = {<ProfilePage />} />
            {/* Ruta de Facturas del usuario */}
            <Route path = "/invoices" element = {<BillsPage />} />
            {/* Ruta del Móudulo de administrador */}
            <Route path = "/admin" element = {<AdminPage />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
