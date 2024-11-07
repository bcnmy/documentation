
## Bundler

Nexus smart accounts are compatible with the Entrypoint v7. To maximize efficiency, [Entrypoint v0.7.0](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.7.0) has introduced optimized data structures that significantly reduce transaction costs and enhance contract performance.

:::tip
The key difference from EntryPoint v0.6 is that in v0.7, the request no longer includes `initCode`; instead, it uses `factory` and `factoryData`. 
:::

## How to get Bundler URL

To start, send your transaction using this URL on the test networks:

```bash
https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44
```
For the mainnet bundler URL, reach out to us via email at `bd@biconomy.io` or [telegram](https://t.me/VenmusTheRapper). 


## Supported Endpoints

### eth_sendUserOperation

This method submits the user operation for on-chain execution and returns the userOpHash if it succeeds (or gets queued). In case of failure, an error will be returned.


**Parameters**

| Param   | Type   | Description                                                                            | Required |
| ------- | ------ | -------------------------------------------------------------------------------------- | -------- |
| method  | string | Name of method in this case: `eth_sendUserOperation`                                   | Required |
| params  | array  | An array consisting of the `UnPackedUseroperation` object, entrypoint address          | Required |
| id      | string | id for request determined by client for JSON RPC requests                              | Required |
| jsonrpc | string | JSON RPC version in this case 2.0.0                                                    | Required |

**Request**

```json
{
    "jsonrpc": "2.0",
    "method": "eth_estimateUserOperationGas",
    "params": [
        {
            "sender":"0x43a069aeA6122cd46aE8d451Bb599068ac5616a9", // required
            "factory": "0x00000001cdE7c53f30b20Bd36015C48652F3faaC", 
            "factoryData": "0x123433", 
            "nonce": "0x663e709f60477f07885230e213b8149a7027239b0000000000000035", // required
            "callData": "0x1235", // required
            "callGasLimit": "0x1e8480", // required
            "verificationGasLimit": "0x1e8480", // required
            "preVerificationGas": "0x2aea540", // required
            "maxFeePerGas": "0x1e86e6", // required
            "maxPriorityFeePerGas": "0x1e8480", // required
            "signature": "0xd1a0bba40a34be11544af179b04e234298b84dabc0f4e410a5571a46b6eb1fa44073049ecf1035c896f64fc979427a0369304ccc3c765c8d304b64a6f1bb3d921c", // required
            "paymaster": "0x",
            "paymasterVerificationGasLimit": "0x0",
            "paymasterPostOpGasLimit": "0x0",
            "paymasterData": null
        },
        "0x0000000071727de22e5e9d8baf0edac6f37da032", // required 
        {} // stateOverrideSet (optional)
    ],
    "id": 1
}
```

**Response**

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x6ce281a7e0e560ccfd19162a0c8fc223c82f3ff964b1a8c5073f09c093510a6c"
}
```

### eth_estimateUserOperationGas

**Parameters**

| Param   | Type   | Description                                                                            | Required |
| ------- | ------ | -------------------------------------------------------------------------------------- | -------- |
| method  | string | Name of method in this case: `eth_estimateUserOperationGas`                            | Required |
| params  | array  | An array consisting of the `UnPackedUseroperation` object, entrypoint address          | Required |
| id      | string | id for request determined by client for JSON RPC requests                              | Required |
| jsonrpc | string | JSON RPC version in this case 2.0.0                                                    | Required |


**Request**

```json
{
    "jsonrpc": "2.0",
    "method": "eth_estimateUserOperationGas",
    "params": [
        {
            "sender":"0x43a069aeA6122cd46aE8d451Bb599068ac5616a9", // required
            "factory": "0x00000001cdE7c53f30b20Bd36015C48652F3faaC", 
            "factoryData": "0x123433", 
            "nonce": "0x663e709f60477f07885230e213b8149a7027239b0000000000000035", // required
            "callData": "0x1235", // required
            "callGasLimit": "0x1e8480", 
            "verificationGasLimit": "0x1e8480", 
            "preVerificationGas": "0x2aea540",
            "maxFeePerGas": "0x1e86e6", 
            "maxPriorityFeePerGas": "0x1e8480",
            "signature": "0xd1a0bba40a34be11544af179b04e234298b84dabc0f4e410a5571a46b6eb1fa44073049ecf1035c896f64fc979427a0369304ccc3c765c8d304b64a6f1bb3d921c", 
            "paymaster": "0x",
            "paymasterVerificationGasLimit": "0x0",
            "paymasterPostOpGasLimit": "0x0",
            "paymasterData": null
        },
        "0x0000000071727de22e5e9d8baf0edac6f37da032", // required 
        {} // stateOverrideSet (optional)
    ],
    "id": 1
}

```
**Response**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "preVerificationGas": "0x2aea540",
    "verificationGasLimit": "0x2aea540",
    "callGasLimit": "0x2aea540",
    "paymasterVerificationGasLimit": "0x0",
    "paymasterPostOpGasLimit": "0x0",
  }
}
```


### [eth_getUserOperationReceipt](/smartAccountsV2/bundler/api/get-useroperation-receipt)


### [eth_getUserOperationByHash](/smartAccountsV2/bundler/api/get-useroperation-by-hash)


### [eth_supportedEntryPoints](/smartAccountsV2/bundler/api/supported-EntryPoints)


### [biconomy_getGasFeeValues](/smartAccountsV2/bundler/api/get-gas-fee-values)


### [biconomy_getUserOperationStatus](/smartAccountsV2/bundler/api/get-useroperation-status)