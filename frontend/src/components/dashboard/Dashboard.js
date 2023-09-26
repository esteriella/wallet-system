import React from 'react';
import { useNavigate } from 'react-router-dom';
import WalletDetails from './WalletDetails';
import WalletCreationForm from './WalletCreationForm';
import TransferFundsForm from './TransferFundsForm';
import TransactionsList from './TransactionsList';

function Dashboard({ userId }) {
  const history = useNavigate();

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    // Redirect to login page
    history.push('/login');
  };

  return (
    <div>
      <h1>Welcome, {userId}!</h1>
      <WalletDetails userId={userId} />
      <WalletCreationForm userId={userId} />
      <TransferFundsForm userId={userId} />
      <TransactionsList userId={userId} />
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default Dashboard;
