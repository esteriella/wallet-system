// ParentComponent.js
import React from 'react';
import WalletDetails from './WalletDetails';

function WalletDetailsParent {
  const account = {
    owner: 'John Doe',
    number: '123456789',
    balance: 500
  };
  console.log(account)
  return <WalletDetails userAccount={account} />;
};

export default WalletDetailsParent;
