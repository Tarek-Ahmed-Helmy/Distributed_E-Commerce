import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import NavBar from './Components/Navbar';
import Products from './Pages/Products';
import ProductProfile from './Pages/ProductProfile';
import Cart from './Pages/Cart';
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='products' element={<Outlet />}>
          <Route path='' element={<Products />} />
          <Route path=':productid' element={<ProductProfile />} />
        </Route>
        <Route path='cart' element={<Cart />}></Route>
      </Routes>
    </>
  );
}

export default App;
