const User = require("../models/User");
const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");

const getWallet = async (req, res) => {
  try {
    const userId = req.params.userId;

    const wallet = await Wallet.findOne({ user: userId });
    if (!wallet) {
      return res.status(404).send({ message: "Wallet not found!" });
    }

    res.status(200).send(wallet);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const fundWallet = async (req, res) => {
  try {
    const userId = req.params.userId;
    const amountToAdd = req.body.amount;

    // Find the user's wallet
    const userWallet = await Wallet.findOne({ user: userId });

    if (!userWallet) {
      return res.status(404).send({ message: "Wallet not found!" });
    }

    // Update the wallet balance
    const updatedWallet = await Wallet.findByIdAndUpdate(
      userWallet._id,
      { $inc: { balance: amountToAdd } },
      { new: true }
    );

    const transfer = await Transaction.create({
      from: userWallet._id,
      to: userWallet._id,
      amount: amountToAdd,
      transactionType: "deposit"
    });

    res
      .status(200)
      .json({
        message: "Funded account successfully",
        success: true,
        updatedWallet
      });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getWallet,
  fundWallet
};
