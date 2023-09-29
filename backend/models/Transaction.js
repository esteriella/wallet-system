const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallet',
    required: fa
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
  transactionType: {
    type: String,
    required: true,
    default: 'transfer',
    enum: ['transfer', 'deposit'],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model("Transaction", transactionSchema);
