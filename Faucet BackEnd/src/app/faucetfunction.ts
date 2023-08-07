
const { ethers } = require('ethers');
const faucetABI = require('../assets/ABI/Faucet.json');
const contractAddress = '0x51f479C49d2c29190b97C411778A5A9D74C15BAC';
const ownerAddress = '0x46c8cD9e0dd430d4cdA9931844fAa8bad486Dd1F';
const privateKey = '8f8aac2e123146e9572ed0cf5e2ff95edc7479f116303c163bd5292928c5f595';
const provider = new ethers.providers.JsonRpcProvider('https://tsv1.shinescan.org');
const contract = new ethers.Contract(contractAddress,faucetABI,provider);

async function getBalance() {
    let balance = "";
    try { 
         balance = await contract.getBalance(); // Gọi hàm getBalance() của hợp đồng
        console.log('Contract Balance:', balance.toString());
      } catch (error) {
        console.error('Error:', error);
      }
      return balance;
}
async function faucetCoin(receiver) {
    try{
        
        const wallet = new ethers.Wallet(privateKey, provider);
        const nonce = await wallet.getTransactionCount();
        const functionName = 'transferCoin';
        const functionArgs = [receiver];
        const transaction = await contract.populateTransaction[functionName](...functionArgs);
        const estimatedGas = await wallet.estimateGas(transaction);
        const gasPrice = await provider.getGasPrice();
        const tx = {
            ...transaction,
            gasPrice: gasPrice,
            gasLimit: estimatedGas,
            nonce: nonce + 1
        };
        const signedTransaction = await wallet.signTransaction(tx);
        const response = await provider.sendTransaction(signedTransaction);
        console.log("res:",response)
        return response;
    } catch(error){
        console.log("err:",error)

    }
    return null;
}
module.exports = {
    getBalance,
    faucetCoin
};