## Migrate from stackup 

We’re excited to support your migration to Biconomy! This guide will walk you through the steps and any necessary adjustments for your setup, while highlighting the benefits of our stack.

Biconomy provides a complete solution for leveraging Smart Accounts, Paymasters, and Bundlers. Checkout the [list](https://docs.biconomy.io/supportedNetworks) of supported networks for our Bundlers and Paymasters.

### Migration Steps:

1. **Create biconomy bundler client:** With Biconomy, you can utilize our Bundler infrastructure through either the SDK or API requests. Follow the official [guide](/smartAccountsV2/bundler/integration) to set up the bundler client. You can find the Biconomy Bundler URL [here](/smartAccountsV2/overview#bundler-url).

2. **Setup paymaster**: Biconomy's paymaster service enables Dapps to sponsor transactions and, also allows users to use ERC-20 tokens as payment for gas. Log in to the [Biconomy dashboard](https://dashboard.biconomy.io/) to get the paymaster URL and switch modes between our sponsorship and token Paymaster. Make use of different Spending limits to customize the paymaster usage.


3. **Update RPC calls:** Use all available Biconomy bundler JSON-RPC methods as outlined in the specification.

| [Stackup Bundler](https://docs.stackup.sh/reference/erc-4337-bundler-api-endpoints)   | [Biconomy bundler](https://docs.biconomy.io/bundler/api)  | 
|------------|------------|
| eth_sendUserOperation | [eth_sendUserOperation](/smartAccountsV2/bundler/api/send-UserOperation) |
| eth_getUserOperationReceipt | [eth_getUserOperationReceipt](/smartAccountsV2/bundler/api/get-useroperation-receipt) | 
| eth_getUserOperationByHash | [eth_getUserOperationByHash](/smartAccountsV2/bundler/api/get-useroperation-by-hash) |
| eth_supportedEntryPoints | [eth_supportedEntryPoints](/smartAccountsV2/bundler/api/supported-EntryPoints) |
| eth_chainId | [eth_chainId](/smartAccountsV2/bundler/api/chainId) |

All paymaster URLs allow you to use both Sponsorship and Token Paymasters. To switch between paymasters you will simply change the Mode of a specific request.

| [Stackup paymaster](https://docs.stackup.sh/reference/paymaster-api-endpoints)   | [Biconomy paymaster](https://docs.biconomy.io/paymaster)  | 
|------------|------------|
| pm_sponsorUserOperation | [pm_sponsorUserOperation](/smartAccountsV2/paymaster/api/sponsor-useroperation) |

<br/>

Additionally, you can find list of all contract [here](/smartAccountsV2/contracts).

Follow the end to end integration guides for various use cases:
- [Sponsored mode](/smartAccountsV2/tutorials/apiIntegration/paymasterSponsored)
- [ERC20 mode](/smartAccountsV2/tutorials/apiIntegration/paymasterERC20)

For additional support, reach out to us on [Telegram](https://t.me/himanshugarg06) or [discord](https://discord.com/invite/biconomy).