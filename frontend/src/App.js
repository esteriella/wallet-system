import React from 'react';
import { Route, Routes as Routes } from 'react-router-dom';
// import Backgrounds from './components/backgrounds/Backgrounds';
import Navbar from './components/shared/Navbar';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Dashboard from './components/dashboard/Dashboard';
import HomePage from './components/homepage/HomePage'
import './App.css';

function App() {
  return (
    <div className="App">
     
      <Navbar />
      <Routes>

        <Route path = "/" element =  { < HomePage /> } />
  
        <Route path = "/login" element =  { < Login /> } />
          
        <Route path = "/registration" element =  { < Registration /> } />

        <Route path = "/dashboard" element =  { < Dashboard /> } />

        {/* <Route path="/wallet" element={<Wallet />}>
          <Route path="create" element={<WalletCreationForm />} />
          <Route path="details" element={<WalletDetails />} />
        </Route>

        <Route path="/transaction" element={<Transaction />}>
          <Route path="transfer" element={<TransferFundsForm />} />
          <Route path="list" element={<TransactionsList />} />
        </Route> */}
        
      
      </Routes>
    </div>
  );
}

export default App;
