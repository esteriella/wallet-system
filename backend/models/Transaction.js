const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallet',
    required: true
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallet',
    required: true
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model("Transaction", transactionSchema);
