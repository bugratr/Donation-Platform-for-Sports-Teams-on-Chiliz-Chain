document.addEventListener("DOMContentLoaded", async () => {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    
    const networkId = await web3.eth.net.getId();
    const contractAddress = "0x1234..."; // Replace with deployed contract address
    const abi = [...]; // Replace with ABI of the deployed contract

    const contract = new web3.eth.Contract(abi, contractAddress);
    const accounts = await web3.eth.getAccounts();
    const donateBtn = document.getElementById("donateBtn");
    const status = document.getElementById("status");

    donateBtn.addEventListener("click", async () => {
        try {
            const amount = web3.utils.toWei("0.1", "ether"); // Replace with desired amount
            await contract.methods.donate().send({ from: accounts[0], value: amount });
            status.innerHTML = "Donation successful! Thank you for your support.";
        } catch (error) {
            console.error(error);
            status.innerHTML = "Error occurred while making the donation.";
        }
    });
});
