import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../shared/Loader";

const api = process.env.REACT_APP_API;

function TransactionsList() {
  const userId = localStorage.getItem("userId");
  const [transactions, setTransactions] = useState([]);
  const [loadingState, setLoadingState] = useState(false);

  const handleError = err =>
    toast.error(err, {
      position: "bottom-left"
    });

  useEffect(
    () => {
      const fetchTransactions = async () => {
        try {
          const response = await axios.get(
            `${api}/transaction/history/${userId}`,        
            { 
              withCredentials: true,
              headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
              } 
            }
          );
          if (response.status === 404) {
            handleError("Transactions not found!");
            return;
          }
          setTransactions(response.data);
          setLoadingState(true);
        } catch (error) {
          console.error("Error fetching transactions:", error);
          handleError("Error fetching transactions!");
        }
      };

      fetchTransactions();
    },
    [userId]
  );


  function convertDate(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  if (loadingState === true && !transactions.length) {
    return (
      <div className="tranList">
        <h2 className="trans-title">Transaction History</h2>
        <br />
        <h3 className="trans-title">No transactions</h3>
      </div>
    );
  }
 
  return (
    <>
      {
        loadingState ?
          <div className="tranList">
            <h2 className="trans-title">Transaction History</h2>
            <table>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>From</th>
                <th>To</th>
              </tr>
              {transactions.map((transaction, key) => {
                return (
                  <tr key={key}>
                    <td>
                      {convertDate(transaction.createdAt)}
                    </td>
                    <td>
                      {transaction.transactionType}
                    </td>
                    <td>
                      {transaction.amount}
                    </td>
                    <td>
                      {userId === transaction.from ? 'You' : transaction.from}
                    </td>
                    <td>
                      {userId === transaction.to ? 'You' : transaction.to}
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>  
        : 
          <div className="tranList">
            <Loader/>
          </div>
        }
    </>
  );
}

export default TransactionsList;
