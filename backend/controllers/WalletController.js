const User = require("../models/User");
const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");

const getWallet = async (req, res) => {
  try {
    const userId = req.params.userId;

    const wallet = await Wallet.findOne({ user: userId });
    if (!wallet) {
      return res.status(404).send({ message: "Wallet not found!", success: false });
    }

    const balance = wallet.balance;

    res.status(200).json({balance});
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error!", success: false });
  }
};

const fundWallet = async (req, res) => {
  try {
    const userId = req.params.userId;
    const amountToAdd = req.body.amount;

    // Find the user's wallet
    const userWallet = await Wallet.findOne({ user: userId });

    if (!userWallet) {
      return res.status(404).send({
        message: "Wallet not found!",
        success: false
      });
    }

    // Update the wallet balance
    const updatedWallet = await Wallet.findByIdAndUpdate(
      userWallet._id,
      { $inc: { balance: amountToAdd } },
      { new: true }
    );

    const transfer = await Transaction.create({
      from: userId,
      to: userId,
      amount: amountToAdd,
      transactionType: "deposit"
    });

    res.status(200).json({
      message: "Funded account successfully",
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message, success: false });
  }
};

module.exports = {
  getWallet,
  fundWallet
};
