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
      <hr></hr>
      <p>With just a few clicks, you can securely move your <br></br>money where it needs to be.</p>
      <form className="transfer-form" onSubmit={handleSubmit}>
        <label>Enter Amount</label><input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        <label>Send To</label><input type="text" value={toAccount} onChange={e => setToAccount(e.target.value)} />
      </form>
      <button type="submit">Transfer Funds</button>
    </div>
  );
};


export default TransferFundsForm;
