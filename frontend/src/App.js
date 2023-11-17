// App.js
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Dashboard from './components/dashboard/Dashboard';
import HomePage from './components/homepage/HomePage';
import About from './components/homepage/About';
import Footer from './components/shared/Footer';
import UpdatePassword from './components/dashboard/UpdatePassword';
import UpdateProfile from './components/dashboard/UpdateProfile';
import BVNForm from './components/bvn/BVNForm';
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">    
      <ToastContainer />  
      <Navbar />
      <Routes>
        <Route path = "/" element =  { < HomePage /> } />
        <Route path ="/about" element = { < About /> } />  
        <Route path = "/signin" element =  { < Login /> } />          
        <Route path = "/signup" element =  { < Registration /> } />
        <Route path = "/dashboard" element =  { < Dashboard /> } />  
        <Route path="/updatepassword" element = {<UpdatePassword/>}/>    
        <Route path="/updateprofile" element = {<UpdateProfile/>}/>   
        <Route path="/bvn" element = {<BVNForm/>}/>  {/* Add this line */}
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
