import FundWallet from "./FundWallet";
import TransactionsList from "./TransactionsList";
import TransferFundsForm from "./TransferFundsForm";
import WalletDetails from "./WalletDetails";
import "./Style.css";

function Dashboard() {
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
