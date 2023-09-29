// TransactionList.js
import React from "react";
// import "./Style.css"

// const TransactionsList = ({ transactions }) => (
//   <ul>
//     {transactions.map((transaction, index) => (
//       <li key={index}>
//         {transaction.success ? 'Success: ' : 'Failed: '}
//         ${transaction.amount}
//       </li>
//     ))}
//   </ul>
// );

// TransactionList.js
// TransactionList.js

function TransactionsList() {
  const data = [
    { date: "Anom", type: "Fund", amount: 300, account: "self" },
    { date: "Megha", type: "Fund", amount: 200, account: "self" },
    { date: "Subham", type: "Transfer", amount: 300, account: "ad1234" }
  ];
  return (
    <div className="tranList">
      <h2 className="trans-title">Transaction History</h2>
      <table>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Account</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>
                {val.date}
              </td>
              <td>
                {val.type}
              </td>
              <td>
                {val.amount}
              </td>
              <td>
                {val.account}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default TransactionsList;
