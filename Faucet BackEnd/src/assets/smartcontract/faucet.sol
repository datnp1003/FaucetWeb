// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Faucet {
    address public owner;
    uint256 public transferLimit;
    uint256 public lastTransferTime;
    mapping(address => uint256) public lastTransferDay;

    event CoinTransferred(address indexed recipient, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    constructor(uint256 _transferLimit) {
        owner = msg.sender;
        transferLimit = _transferLimit * 1 ether;
        lastTransferTime = block.timestamp;
    }

    function transferCoin(address _recipient) public payable {
        require(lastTransferDay[_recipient] + 1 days<= block.timestamp, "Recipient can only receive once per day");
        require(address(this).balance >= transferLimit, "Wallet not enough amount");

        lastTransferTime = block.timestamp;
        lastTransferDay[_recipient] = block.timestamp;

        payable(_recipient).transfer(transferLimit);

        emit CoinTransferred(_recipient, transferLimit);
    }

    function setTransferLimit(uint256 _transferLimit) public onlyOwner {
        transferLimit = _transferLimit  * 1 ether;
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner).transfer(balance);
    }

    function getBalance() public view returns (uint256){
        return address(this).balance;
    }
    // Fallback function to receive Ether
    receive() external payable {}
}