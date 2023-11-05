// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DonationContract is ERC721 {
    address public teamWallet;
    address public newsPlatformWallet;
    uint256 public nextTokenId;
    mapping(string => address) public tokenAddresses;

    constructor(address _teamWallet, address _newsPlatformWallet) ERC721("MemorabiliaNFT", "MNFT") {
        teamWallet = _teamWallet;
        newsPlatformWallet = _newsPlatformWallet;

        // Add the addresses of the Fan Tokens and CHZ
        tokenAddresses["CHZ"] = 0x...; // CHZ Token Address
        tokenAddresses["TrabzonsporToken"] = 0x...; // Trabzonspor Token Address
        tokenAddresses["GalatasarayToken"] = 0x...; // Galatasaray Token Address
        // Add more tokens as needed
    }

    function donate(string memory tokenName, uint256 amount) public {
        require(amount > 0, "Donation amount must be greater than 0");
        require(tokenAddresses[tokenName] != address(0), "Invalid token");

        address tokenAddress = tokenAddresses[tokenName];
        IERC20 token = IERC20(tokenAddress);

        // Transfer the tokens from the user to the contract
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        uint256 newsPlatformCommission = amount / 20; // 5% commission
        uint256 teamShare = amount - newsPlatformCommission;

        // Transfer the tokens to the respective wallets
        require(token.transfer(teamWallet, teamShare), "Transfer to team failed");
        require(token.transfer(newsPlatformWallet, newsPlatformCommission), "Transfer to platform failed");

        // Mint a new NFT as a memorabilia for the donation
        _mint(msg.sender, nextTokenId);
        nextTokenId++;
    }

    // Optional: Add metadata, URI, or other functionalities for the NFT
}

