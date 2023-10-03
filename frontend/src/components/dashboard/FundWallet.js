import { useState } from "react";
import { 
  // useParams, 
  useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const api = process.env.REACT_APP_API;

function FundWallet() {
  // const { userId } = useParams();  
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [amountToAdd, setAmount] = useState(null);

  console.log(userId);

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

  const handleInfo = msg =>
    toast.info(msg, {
      position: "top-right"
    });


  const handleSubmit =async (e) => {
    e.preventDefault();
    handleInfo('Please wait for transaction to complete!');
    try {
      const response = await axios.put(`${api}/wallet/fund/${userId}`, 
        {
          amount: amountToAdd,
        },        
        { withCredentials: true }
      ); 

      if (response.data.success) {
        handleSuccess(response.data.message);        
        setTimeout(() => {
          // navigate(`/dashboard/${userId}`, { replace: true });          
          navigate('/dashboard', { replace: true });
        }, 5000);
      } else {
        handleError(response.data.message);
        setAmount(null);
      }
    } catch (error) {
      console.error('Error funding wallet:', error);
      handleError('Error funding wallet!');
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
        <input type="number" value={amountToAdd} required onChange={handleAmountChange} />
        <button type="submit">Fund Account</button>
      </form>
    </div>
  );
}

export default FundWallet;
