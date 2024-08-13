const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
