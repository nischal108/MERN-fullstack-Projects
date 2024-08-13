const { default: mongoose } = require("mongoose");
const Account = require("../models/Account");

async function transferFunds(fromAccountId, toAccountId, amount) {
  if (amount <= 0) {
    throw new Error("Amount must be greater than zero.");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const fromAccount = await Account.findOne({
      userID: fromAccountId,
    }).session(session);
    const toAccount = await Account.findOne({ userID: toAccountId }).session(
      session
    );

    if (!fromAccount || !toAccount) {
      throw new Error("One or both accounts not found.");
    }

    if (fromAccount.balance < amount) {
      throw new Error("Insufficient funds.");
    }

    // Performing transaction
    await Account.updateOne(
      { userID: fromAccountId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userID: toAccountId },
      { $inc: { balance: amount } }
    ).session(session);

    console.log("From Account: ", fromAccount);
    console.log("To Account: ", toAccount);

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}

module.exports = transferFunds;
