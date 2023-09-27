const Transaction = require('../models/Transaction');
const Wallet = reequire('../models/Wallet');

// @desc    Transfer money
// @route   POST /api/transfer
// @access  Private
const transfer = async(req, res) =>{
    const {from, to, amount, transactionType} = req.body;
    const receiver = await Wallet.findById({to});
};