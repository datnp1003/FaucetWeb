const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { getBalance, faucetCoin } = require("./src/app/faucetfunction.ts");

app.get("/getBalance", async (req, res) => {
  try {
    const balance = await getBalance();
    res.json({ balance: balance.toString() });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/faucet", async (req, res) => {
  try {
    console.log(req.query.address)
    const faucet = await faucetCoin(req.query.address);
    res.json(faucet.toString);
  } catch (error) {
    res.status(403).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
