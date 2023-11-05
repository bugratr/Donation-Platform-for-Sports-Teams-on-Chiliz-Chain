const HDWalletProvider = require('@truffle/hdwallet-provider');

// Replace these with your own mnemonic and Chiliz Scoville Testnet RPC URL
const mnemonic = 'your mnemonic here';
const rpcUrl = 'https://scoville-rpc.chiliz.com/';

module.exports = {
  networks: {
    // Configuration for Chiliz Scoville Testnet
    chiliz: {
      provider: () => new HDWalletProvider(mnemonic, rpcUrl),
      network_id: 88880,       // Chiliz Scoville Testnet's id
      gas: 5500000,           // Gas limit
      confirmations: 2,       // # of confs to wait between deployments
      timeoutBlocks: 200,     // # of blocks before a deployment times out
      skipDryRun: true,       // Skip dry run before migrations
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.8.0',    // Fetch exact version from solc-bin
    },
  },
};
