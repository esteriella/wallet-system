// AccountDetails.js
import React from 'react';
// import WalletDetailsParent from './WalletDetailsParent'

function WalletDetails () {
  const userAccount = {
    owner: 'John Doe',
    number: '123456789',
    balance: 500
  };
  console.log(userAccount);
  return(
    <div>
      <h2>Welcome, <span>{userAccount.owner}!</span></h2>
    {/* <p>Owner: {userAccount.owner}</p> */}
    <p>Account Number: {userAccount.number}</p>
    <p>Balance: {userAccount.balance}</p>
  </div>
  );
};


export default WalletDetails;
