## Paymaster

In EntryPoint v0.7.0, significant updates have been introduced regarding paymaster interactions.

In v0.6, the `PaymasterAndData` field contained both the paymaster's address and any related data within a single field. In v0.7, this field has been split into two distinct fields:

- `paymaster`: This represents the address of the paymaster.
- `paymasterData`: This field now holds any additional data needed by the paymaster for operation validation.

This separation helps modularize the paymaster's responsibilities and makes it easier to handle specific paymaster-related logic, such as gas reimbursement or fee structure.


### pm_getPaymasterStubData

This endpoint provides the stub values to be used in the paymaster-related fields of an unsigned user operation for gas estimation purposes.


**Parameters**

Body

| Param   | Type   | Description                                                                | Required |
| ------- | ------ | -------------------------------------------------------------------------- | -------- |
| method  | string | Name of method `pm_getPaymasterStubData`                      | Required |
| params  | array  | Unsigned user operation, entrypoint address, chain id and a context object | Required |
| id      | string | id for request determined by client for JSON RPC requests                  | Required |
| jsonrpc | string | JSON RPC version in this case 2.0                                          | Required |

:::tip
The context object for Biconomy Paymaster service should be exactly the second element
of the params object that is supported on [`pm_sponsorUserOperation`](https://docs.biconomy.io/paymaster/api/sponsor-useroperation#1-mode-is-sponsored-)
:::

**Request**

```javascript
{
   "method":"pm_getPaymasterStubData",
	"id": 1701955829,
	"jsonrpc": "2.0",
    "params":[
      {
         "callData":"0xe9ae5c53000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000034fa66e705cf2582cf56528386bb9dfca1197672620000000000000000000000000000000000000000000000000000000000000001000000000000000000000000",
         "maxFeePerGas":"0x1e8718",
         "maxPriorityFeePerGas":"0x1e8480",
         "nonce":"15224955350639496636633250427077404792929322447987211085485661224960",
         "sender":"0xf5D9e9be20785759bd02A8723e5354dc9b98a8c1",
         "signature":"0x0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000663E709f60477f07885230E213b8149a7027239B000000000000000000000000000000000000000000000000000000000000004181d4b4981670cb18f99f0b4a66446df1bf5b204d24cfcb659bf38ba27a4359b5711649ec2423c5e1247245eba2964679b6a1dbb85c992ae40b9b00c6935b02ff1b00000000000000000000000000000000000000000000000000000000000000",
         "callGasLimit":"0x0",
         "verificationGasLimit":"0x0",
         "preVerificationGas":"0x0",
         "factory": "0x",
         "factoryData": "0x"
      },
      "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      "0x14a34",
      {
         "mode":"SPONSORED",
         "calculateGasLimits":true,
         "expiryDuration":300,
         "sponsorshipInfo":{
            "webhookData":{
               
            },
            "smartAccountInfo":{
               "name":"BICONOMY",
               "version":"1.0.0"
            }
         }
      }
   ]
}
```

**Response**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1701955829,
    "result": {
        "paymaster": "0x4688606914bF4C0595B443dB3d6822791Fec0A97",
        "paymasterData": "0xc1a9a8d0f6448e61d3500262ce3ce857b02f1d0f000066e19b61000066e19459000f424017c71b4f34fd1f3ca5290c611053798b1199555415301f4610d685cab5c72ded375e65aa4f3eb7af900bf6d7f2202e0251087a6a7121c2cff07ef5dba7c38e861c",
        "isFinal": false
    }
}
```
