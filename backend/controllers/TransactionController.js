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
      user: senderWallet.user._id,
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

module.exports = { 
    transferMoney
 };
