const DonationContract = artifacts.require("DonationContract");

module.exports = async function (deployer, network, accounts) {
  // Replace these addresses with the actual addresses of your wallets and tokens
  const teamWallet = "0x..."; // Team Wallet Address
  const newsPlatformWallet = "0x..."; // News Platform Wallet Address

  // Deploy the DonationContract
  await deployer.deploy(DonationContract, teamWallet, newsPlatformWallet);

  // If you want to interact with the contract, you can do so here
  const donationContract = await DonationContract.deployed();

  // Example: Add token addresses to the contract
  await donationContract.tokenAddresses("CHZ", "0x..."); // CHZ Token Address
  await donationContract.tokenAddresses("TrabzonsporToken", "0x..."); // Trabzonspor Token Address
  await donationContract.tokenAddresses("GalatasarayToken", "0x..."); // Galatasaray Token Address
};
