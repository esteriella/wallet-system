import FundWallet from "./FundWallet";
import TransactionsList from "./TransactionsList";
import TransferFundsForm from "./TransferFundsForm";
import WalletDetails from "./WalletDetails";
import "./Style.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Dashboard() {
  const navigate = useNavigate();
  const cookies = useCookies([]);
  
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/signin");
      }
    };
    verifyCookie();
  }, [cookies, navigate]);

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
