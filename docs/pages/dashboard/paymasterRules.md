---
sidebar_label: "Paymaster Rules"
sidebar_position: 3
---

# Paymaster Rules

For a paymaster, you can restrict the sponsorship to only specified contracts and methods if needed. If no contract is whitelisted, then paymaster will facilitate all the contract interactions. 

## Whitelist a Smart Contract

Navigate to the Paymaster you have created, then click rules and contract. If this is the first time you are adding a smart contract the page will look like this:

![new contract](/contracts/new_contract.png)

Click on Add your First Contract and a side menu will show up asking you for details. Name your contract and provide an address. If your contract is verified the dashboard will automatically fetch the ABI for it, otherwise you can manually paste in the ABI yourself. You will then be able to choose any write methods to whitelist for sponsorship. In the example below I added the USDC contract on the Goerli testnet and chose to authorize the approve method for sponsorship.

![add contract](/contracts/add_contract.png)

## Updating your Smart Contract

After adding your contract and whitelisting your methods you can make a few changes on the contract.

- You can edit the contract to change the name or update which write methods you would like to authorize.
- You can pause the contract to temporarily stop any sponsorships
- You can delete the contract if you no longer need it on your Paymaster at all

![update contract](/contracts/changes.png)
