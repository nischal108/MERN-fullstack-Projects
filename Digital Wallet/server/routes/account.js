const express = require("express");
const authMiddleware = require("../middleware/authmiddleware");
const transferFunds = require("../controllers/transferFunds");
const Account = require("../models/Account");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userID: req.user });

    if (!account) {
      return res.status(404).json({ message: "Account not found." });
    }

    res.json({
      balance: account.balance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/send", authMiddleware, async (req, res) => {
  console.log(req.body);
  
  const { toAccountId, amount } = req.body;
  const fromAccountId = req.user;


  try {
    await transferFunds(fromAccountId, toAccountId, amount);
    res.status(200).json({ message: "Funds transferred successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
