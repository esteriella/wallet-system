import FundWallet from "./FundWallet";
import TransactionsList from "./TransactionsList";
import TransferFundsForm from "./TransferFundsForm";
import WalletDetails from "./WalletDetails";
import "./Style.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const verifyToken = () => {
      const token = localStorage.getItem("token");
      const isVerified = localStorage.getItem("isVerified");

      if (!token) {
        navigate("/signin");
      }
      if (!isVerified) {
        navigate("/bvn");
      }
    };
    verifyToken();
  }, [navigate]);

  return (
    <div>
      <WalletDetails />
      <div className="wallet-card">
        <FundWallet />
        <TransferFundsForm />
      </div>
      <TransactionsList />
    </div>
  );
}

export default Dashboard;
