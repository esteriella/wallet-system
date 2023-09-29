import { Route, Routes as Routes } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Dashboard from './components/dashboard/Dashboard';
import HomePage from './components/homepage/HomePage';
import About from './components/homepage/About';
import Footer from './components/shared/Footer';
import './App.css';

function App() {
  return (
    <div className="App">     
      <Navbar />
      <Routes>
        <Route path = "/" element =  { < HomePage /> } />
        <Route path ="/about" element = { < About /> } />  
        <Route path = "/signin" element =  { < Login /> } />          
        <Route path = "/signup" element =  { < Registration /> } />
        <Route path = "/dashboard" element =  { < Dashboard /> } />       
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
