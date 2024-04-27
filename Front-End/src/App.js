import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import NavBar from './Components/Navbar';
import Products from './Pages/Products';
import ProductProfile from './Pages/ProductProfile';
import Cart from './Pages/Cart';
import AdminController from './Components/AdminController';
import AddProduct from './Pages/AddProduct';
import ProductsControl from './Pages/ProductsControl';
import EditProduct from './Pages/EditProduct';
import CategorieProducts from './Pages/CategorieProducts';
import NavBarControl from './Components/NavBarControl';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import AdminLogin from './Pages/AdminLogin';
import AdminSignup from './Pages/AdminSignUp';
import Payment from './Pages/Payment';
import RequireAuth from './Components/RequireAuth';
function App() {
  return (
    <>
      <NavBarControl>
        <NavBar />
      </NavBarControl>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route element={<RequireAuth allowedRoles={["client"]} />} >
          <Route path='products' element={<Outlet />}>
            <Route path='' element={<Products />} />
            <Route path=':productid' element={<ProductProfile />} />
            <Route path='category' element={<CategorieProducts />} />
          </Route>
          <Route path='cart' element={<Outlet />}>
            <Route path='' element={<Cart />} />
            <Route path='payment' element={<Payment />} />
          </Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={["admin"]} />} >
          <Route element={<AdminController />}>
            <Route path='seller-products' element={<Outlet />} >
              <Route path='' element={<ProductsControl />} />
              <Route path=':productid' element={<EditProduct />} />
              <Route path='add-product' element={<AddProduct />} />
            </Route>
          </Route>
        </Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='sign-up' element={<Signup />}></Route>
        <Route path='profile' element={<Profile />}></Route>
        <Route path='admin-login' element={<AdminLogin />}></Route>
        <Route path='admin-sign-up' element={<AdminSignup />}></Route>
      </Routes>
    </>
  );
}

export default App;
