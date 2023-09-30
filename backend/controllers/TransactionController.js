const Transaction = require("../models/Transaction");
const Wallet = reequire("../models/Wallet");

const transferMoney = async (req, res) => {
  try {
    const senderWallet = await Wallet.findById(req.body.from);
    const recipientWallet = await Wallet.findById(req.body.to);

    if (senderWallet.balance < req.body.amount) {
      return res.status(400).send({ message: "Insufficient balance!" });
    }

    senderWallet.balance -= req.body.amount;
    recipientWallet.balance += req.body.amount;

    await senderWallet.save();
    await recipientWallet.save();

    const transaction = new Transaction({
      from: senderWallet._id,
      to: recipientWallet._id,
      amount: req.body.amount,
      transactionType: "transfer"
    });

    await transaction.save();

    res.status(200).send({ message: "Transaction completed successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Find the user's wallet
    const userWallet = await Wallet.findOne({ user: userId });

    if (!userWallet) {
        return res.status(404).send({ message: 'Wallet not found!' });
    }

    // Find transactions involving the user's wallet
    const transactions = await Transaction.find({
        $or: [
            { senderWallet: userWallet._id },
            { recipientWallet: userWallet._id }
        ]
    }).populate('senderWallet').populate('recipientWallet');

    res.status(200).send(transactions);
  }
  catch (error) {      
    res.status(500).send({ message: error.message });
  }
};

module.exports = { 
    transferMoney,
    getTransactions
 };
