import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TransactionsList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('/transactions')
      .then(response => setTransactions(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Transactions</h2>
      {transactions.map(transaction => (
        <div key={transaction._id}>
          <p>From: {transaction.from}</p>
          <p>To: {transaction.to}</p>
          <p>Amount: {transaction.amount}</p>
        </div>
      ))}
    </div>
  );
}

export default TransactionsList;
