const DonationContract = artifacts.require("DonationContract");

module.exports = async function (deployer, network, accounts) {
  // Replace these addresses with the actual wallet addresses
  const teamWallet = "0x1234...";     // The address of the sports team's wallet
  const platformWallet = "0x5678..."; // The address of the news platform's wallet

  // Deploy the contract with the wallet addresses as constructor parameters
  await deployer.deploy(DonationContract, teamWallet, platformWallet);

  console.log("DonationContract deployed to:", DonationContract.address);
};
