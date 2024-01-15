import React from 'react'
import { BrowserRouter as Router , Routes , Route, Navigate } from 'react-router-dom'
import Home from './pages/home/Home';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import MyState from './context/data/MyState';
import Dashboard from './pages/admin/dashboard/Dashboard';
import Admin from './pages/admin/Admin';
import NoPage from './pages/nopage/NoPage';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productinfo/ProductInfo';
import AddProduct from './pages/admin/page/AddProduct';
import UpdateProduct from './pages/admin/page/UpdateProduct';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <MyState>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={ <ProtectedRoutes><Order/> </ProtectedRoutes> }/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path='/dashboard' element={ <ProtectedRoutesForAdmin> <Dashboard /></ProtectedRoutesForAdmin> }/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/productinfo/:id" element={<ProductInfo/>}/>
        <Route path="/addproduct" element={<ProtectedRoutesForAdmin> <AddProduct/></ProtectedRoutesForAdmin>}/>
        <Route path="/updateproduct" element={<ProtectedRoutesForAdmin> <UpdateProduct/></ProtectedRoutesForAdmin>}/>
       
      </Routes>
       <ToastContainer/>
    </Router>
    </MyState>
  )
}

export default App

export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem('user')) {
    return children
  }
  else {
    return <Navigate to='/login' />
  }
}

export const ProtectedRoutesForAdmin = ({children})=>{
  const admin = JSON.parse(localStorage.getItem('user'));
  if(admin.user.email === "zubairalamraza@gmail.com"){
    return children;
  }
  else{
    return <Navigate to="/login"/>
  }
}
