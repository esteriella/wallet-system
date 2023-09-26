import React, { useEffect, useState } from 'react';
import axios from 'axios';

function WalletDetails({ walletId }) {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    axios.get(`/wallet/${walletId}`)
      .then(response => setWallet(response.data))
      .catch(error => console.error(error));
  }, [walletId]);

  return (
    <div>
      {wallet && (
        <>
          <h2>Wallet Details</h2>
          <p>Balance: {wallet.balance}</p>
        </>
      )}
    </div>
  );
}

export default WalletDetails;
