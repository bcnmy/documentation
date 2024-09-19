# RAAS Integration and Event Handling


For integration with Biconomy, you will need to use the `raas-request` API to submit your requests. The request will be reviewed internally and subsequently the status will be updated through an `update` API at your end.

### 1. Raas Provider request Endpoint:

**POST API Path:** `/public/raas-request`
 
This endpoint processes incoming webhook requests from RAAS providers, such as Conduit. It performs validation, updates the database, and triggers Slack notifications.

**Header**

Based on each RAAS provider a new header will be generated. for eg. `X-Conduit-Integration-Secret` (Header name for conduit)

**Request Payload Structure**

The payload received at this endpoint must adhere to the following structure:

```json
{
  "event": "INSTALLING",
  "id": "unique-event-id",
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


### 2. RAAS Provider Update Endpoint:

We will require an endpoint for updating the status of installations/completions on your end.

**Payload**
```json
{
    status: "INSTALLED", // ["INSTALLING", "INSTALLED", "UNINSTALLED", "NOT_INSTALLED"]
    id: <request-id>,
    manage_integration_link: <biconomy-dashboard-url>
}
```

Do reach out to us on Telegram or discord, if you plan to integrate.
