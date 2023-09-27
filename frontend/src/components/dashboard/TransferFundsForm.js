// TransferFunds.js
import React, { useState } from 'react';

function TransferFundsForm () {
  const [amount, setAmount] = useState(0);
  const [toAccount, setToAccount] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="transfer-fund">
      <h2>Transfer Funds</h2>
      <p>With just a few clicks, you can securely move your money where it needs to be.</p>
      <form className="transfer-form" onSubmit={handleSubmit}>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        <input type="text" value={toAccount} onChange={e => setToAccount(e.target.value)} />
        <button type="submit">Transfer Funds</button>
      </form>
    </div>
  );
};


export default TransferFundsForm;
