# One click integration for RAAS providers

This guide walks you through the process of integrating with Biconomy using a one-click setup on RAAS (Rollup as a service) provider platforms.

Essentially, you will need to use the `raas-request` API to submit your requests. The request will be reviewed internally and subsequently the status will be updated through an `update` API at your end.

### 1. RAAS provider request Endpoint:

**POST API Endpoint**

```bash
https://paymaster-dashboard-backend.prod.biconomy.io/api/v2/public/raas-request
``` 
 
This endpoint processes incoming webhook requests from RAAS providers, such as Conduit. It performs validation, updates the database, and triggers Slack notifications.

**Header**

Based on each RAAS provider a new header will be generated. for eg. `X-Conduit-Integration-Secret` (Header name for conduit). You can reach out to us on [Telegram](https://t.me/monikatudja) or [discord](https://discord.com/invite/biconomy) for the new header.

**Request Payload Structure**

The payload received at this endpoint must adhere to the following structure:

```json
{
  "event": "INSTALLING",
  "id": "unique-request-id",
  "chain_id": "1",
  "parent_chain_id": "0",
  "type": "rollup",
  "native_currency": {
    "name": "Ether",
    "symbol": "ETH",
    "decimals": 18,
    "contract": "0x..."
  },
  "name": "Ethereum Mainnet",
  "rpc": "https://mainnet.infura.io/v3/...",
  "ws": "wss://mainnet.infura.io/ws/v3/...",
  "explorer": "https://etherscan.io/",
  "logo_url": "https://example.com/logo.png",
  "icon_url": "https://example.com/icon.png",
  "brand_color": "#FFFFFF",
  "file_optimism_contracts": "https://api.conduit-stg.xyz/file/v1/optimism/contracts/m-integrations-testnet-kn5qqp4tzd",
  "file_optimism_genesis": "https://api.conduit-stg.xyz/file/v1/optimism/genesis/m-integrations-testnet-kn5qqp4tzd",
  "file_optimism_rollup": "https://api.conduit-stg.xyz/file/v1/optimism/rollup/m-integrations-testnet-kn5qqp4tzd",
  "file_arbitrum_core": "",
  "file_arbitrum_chaininfo": "",
  "contracts": {
    "AddressManager": "0xd9839AE04fe2E7D530011F789eCE10097ddde683",
    "BondManager": "0x0000000000000000000000000000000000000000",
    "CanonicalTransactionChain": "0x0000000000000000000000000000000000000000",
    "L1CrossDomainMessenger": "0x3036963aad081c0dB89Ca71119D66da998f40c64",
    "L1StandardBridge": "0xA402C554cbA7e702232F35fDec5c3C3B91eED50a",
    "L2OutputOracle": "0x4FA4370Dc6A221b937A95cA84601648424e7Bf21",
    "OptimismPortal": "0x6cfbe05548ABDeff451B71592ccaB84e7B64c631",
    "StateCommitmentChain": "0x0000000000000000000000000000000000000000"
  }
}
```
**Response**

```json
{
    "status": "INSTALLING",
    "eta_seconds": 1209600, // Estimated time of completion in seconds
    "manage_integration_link": "https://dashboard.biconomy.io"
}
```
Here’s a breakdown of the fields:
- `status`: Indicates the current status of the integration. Possible values include:

    - "INSTALLING": The integration is currently in progress.
    - "INSTALLED": The integration has been successfully completed.
    - "UNINSTALLED": The integration has been removed.
    - "NOT_INSTALLED": The integration has not been attempted or is not applicable.

- `eta_seconds`: The estimated time of completion for the integration, expressed in seconds. This value provides an estimate of how long it will take for the integration to be finalized. For example, 1209600 seconds equals approximately 14 days.

- `manage_integration_link`: A URL that directs to the Biconomy dashboard where you can manage and monitor the integration status.


### 2. RAAS Provider Update Endpoint:

We will require an endpoint for updating the status of installations/completions on your end.

**Payload**
```json
{
    "status": "INSTALLED", // ["INSTALLING", "INSTALLED", "UNINSTALLED", "NOT_INSTALLED"]
    "id": "unique-request-id",
    "manage_integration_link": "<biconomy-dashboard-url>"
}
```

You can contact us via [Telegram](https://t.me/monikatudja) or [discord](https://discord.com/invite/biconomy) for further queries.
