// FundAccount.js
import React, { useState } from 'react';

function FundWallet () {
  const [amount, setAmount] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="fundwallet">
      <h2>Fund Wallet</h2>
      <p>Simply add funds to your wallet with confidence,<br></br> and take the first step towards financial empowerment.</p>
      <form className="fund-form" onSubmit={handleSubmit}>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        <button type="submit">Fund Account</button>
      </form>
    </div>
  );
};

export default FundWallet;
