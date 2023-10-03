import { useState } from "react";
import { 
  // useParams, 
  useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const api = process.env.REACT_APP_API;

function TransferFundsForm() {
  // const { userId } = useParams();  
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    amountToSend: null,
    toAccount: ""
  });

  const { amountToSend, toAccount } = inputValue;

  const handleOnChange = e => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value
    });
  };

  const handleError = err =>
    toast.error(err, {
      position: "bottom-left"
    });

  const handleSuccess = msg =>
    toast.success(msg, {
      position: "bottom-left"
    });

  const handleInfo = msg =>
    toast.info(msg, {
      position: "top-right"
    });

  const handleSubmit = async e => {
    e.preventDefault();

    handleInfo("Please wait for transaction to complete!");
    try {
      const response = await axios.post(
        `${api}/transaction/transfer/${userId}`,
        inputValue
      );
      if (response.data.success) {
        handleSuccess(response.data.message);
        setTimeout(() => {
          // navigate(`/dashboard/${userId}`, { replace: true });          
          navigate('/dashboard', { replace: true });
        }, 5000);
      } else {
        handleError(response.data.message);
        setInputValue({
          ...inputValue,
          amountToSend: null,
          toAccount: ""
        });
      }
    } catch (error) {
      console.error("Error transferring money:", error);
      handleError("Error transferring money!");
    }
  };

  return (
    <div className="transfer-fund">
      <h2>Transfer Funds</h2>
      <hr />
      <p>
        With just a few clicks, you can securely move your <br />money where it
        needs to be.
      </p>
      <form className="transfer-form" onSubmit={handleSubmit}>
        <label>Enter Amount</label>
        <input
          type="number"
          required
          name="amountToSend"
          value={amountToSend}
          onChange={handleOnChange}
        />
        <label>Send To</label>
        <input
          type="text"
          required
          name="toAccount"
          value={toAccount}
          onChange={handleOnChange}
        />
      </form>
      <button type="submit">Transfer Funds</button>
    </div>
  );
}

export default TransferFundsForm;
