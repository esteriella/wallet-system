const Transaction = require("../models/Transaction");
const Wallet = require("../models/Wallet");

const transferMoney = async (req, res) => {
  try {
    const senderWallet = await Wallet.findOne({user: req.params.userId});
    const recipientWallet = await Wallet.findOne({user: req.body.to});

    if(senderWallet._id === recipientWallet._id){
      return res.status(400).json({ message: "You can't transfer to yourself!", success: false });
    }

    if (senderWallet.balance < req.body.amount) {
      return res.status(400).json({ message: "Insufficient balance!", success: false });
    }

    senderWallet.balance -= req.body.amount;
    recipientWallet.balance += req.body.amount;

    await senderWallet.save();
    await recipientWallet.save();

    const transaction = await Transaction.create({
      from: senderWallet._id,
      to: recipientWallet._id,
      amount: req.body.amount,
      transactionType: "transfer"
    });

    res.status(200).json({ message: "Transaction completed successfully!", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getTransactions = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Find the user's wallet
    const userWallet = await Wallet.findOne({ user: userId });

    if (!userWallet) {
        return res.status(404).json({ message: 'Wallet not found!', success: false });
    }

    // Find transactions involving the user's wallet
    const transactions = await Transaction.find({
        $or: [
            { from: userWallet._id },
            { to: userWallet._id }
        ]
    });

    res.status(200).send(transactions);
  }
  catch (error) {      
    res.status(500).false({ message: error.message, success: false });
  }
};

module.exports = { 
    transferMoney,
    getTransactions
 };
