// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import WalletDetails from './WalletDetails';
// import FundWallet from './FundWallet';
// import TransferFundsForm from './TransferFundsForm';
// import TransactionsList from './TransactionsList';

// function Dashboard({ userId }) {
//   const history = useNavigate();

//   const handleLogout = () => {
//     // Clear user data from local storage
//     localStorage.removeItem('token');
//     localStorage.removeItem('userId');

//     // Redirect to login page
//     history.push('/login');
//   };

//   return (
//     <div>
//       <h1>Welcome, {userId}!</h1>
//       <WalletDetails userId={userId} />
//       <FundWallet userId={userId} />
//       <TransferFundsForm userId={userId} />
//       <TransactionsList userId={userId} />
//       <button onClick={handleLogout}>Log Out</button>
//     </div>
//   );
// }

// Dashboard.js
import React from "react";
import FundWallet from "./FundWallet";
import TransactionsList from "./TransactionsList";
import TransferFundsForm from "./TransferFundsForm";
import WalletDetails from "./WalletDetails";

function Dashboard() {
  return (
    <div>
      <WalletDetails />
      <div className="wallet-card">
        <FundWallet />
        <TransferFundsForm />
      </div>
      <TransactionsList />
    </div>
  );
}

export default Dashboard;
