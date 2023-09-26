import React, { useState } from 'react';
import axios from 'axios';

function TransferFundsForm() {
  const [fromWalletId, setFromWalletId] = useState('');
  const [toWalletId, setToWalletId] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('/transfer', { fromWalletId: fromWalletId, toWalletId: toWalletId, amount: amount })
      .then(response => console.log(response))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Transfer Funds</h2>
      <form onSubmit={handleSubmit}>
        <label>
          From Wallet ID:
          <input type="text" value={fromWalletId} onChange={e => setFromWalletId(e.target.value)} />
        </label>
        <label>
          To Wallet ID:
          <input type="text" value={toWalletId} onChange={e => setToWalletId(e.target.value)} />
        </label>
        <label>
          Amount:
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        </label>
        <button type="submit">Transfer</button>
      </form>
    </div>
  );
}

export default TransferFundsForm;
