// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DonationContract {
    address public teamWallet;
    address public platformWallet;

    event DonationMade(address donor, uint256 amount, uint256 teamShare, uint256 platformShare);

    constructor(address _teamWallet, address _platformWallet) {
        require(_teamWallet != address(0) && _platformWallet != address(0), "Invalid wallet addresses");
        teamWallet = _teamWallet;
        platformWallet = _platformWallet;
    }

    function donate() public payable {
        require(msg.value > 0, "Donation amount must be greater than 0");

        uint256 platformShare = (msg.value * 5) / 100;
        uint256 teamShare = msg.value - platformShare;

        payable(teamWallet).transfer(teamShare);
        payable(platformWallet).transfer(platformShare);

        emit DonationMade(msg.sender, msg.value, teamShare, platformShare);
    }
}
