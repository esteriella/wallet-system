import { useState } from "react";
import {
  useNavigate
} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const api = process.env.REACT_APP_API;

function FundWallet() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [amountToAdd, setAmount] = useState(null);

  const handleAmountChange = e => {
    setAmount(e.target.value);
  };

  const handleError = err =>
    toast.error(err, {
      position: "bottom-left"
    });

  const handleSuccess = msg =>
    toast.success(msg, {
      position: "bottom-left"
    });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${api}/wallet/fund/${userId}`,
        {
          amount: amountToAdd
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );

      if (response.data.success) {
        handleSuccess(response.data.message);
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 5000);
      } else {
        handleError(response.data.message);
        setAmount(null);
      }
    } catch (error) {
      console.error("Error funding wallet:", error);
      handleError("Error funding wallet!");
    }
  };

  return (
    <div className="fundwallet">
      <h2>Fund Wallet</h2>
      <hr />
      <p>
        Simply add funds to your wallet with confidence,<br /> and take the
        first step towards financial empowerment.
      </p>
      <form className="fund-form" onSubmit={handleSubmit}>
        <label>Enter Amount</label>
        <input
          type="number"
          value={amountToAdd}
          required
          onChange={handleAmountChange}
        />
        <button type="submit">Fund Account</button>
      </form>
    </div>
  );
}

export default FundWallet;
