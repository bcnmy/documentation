# Sending Transactions with Smart sessions ⚡️

The Smart Sessions Module enables developers to create session keys with specific permissions and access rights on a user's account. This allows users to control what actions an app can perform on their behalf, enforcing these permissions directly on-chain. 

This document provides a step-by-step guide on how to set up and use the Smart Sessions Module with the Nexus client. Below is a breakdown of how to create, install, and use the module's functionality.

## Create the Smart Session

::::steps

### Set up an owner account
First, we need to set up an Owner for the Smart Account which will be used to sign User Operations (transactions) for the Smart Account.

```typescript
import { privateKeyToAccount } from "viem/accounts";

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`);
```

### Set up Nexus client

A Smart Account needs access to the Network to query for information about its state (e.g., nonce, address, etc.). Let's configure a client for the Smart Account. A `bundlerUrl` is required to submit User Operations to the Network, which will initialize the Smart Account.

```typescript
import { createNexusClient } from "@biconomy/sdk";
import { baseSepolia } from "viem/chains"; 
import { http } from "viem"; 
import { privateKeyToAccount } from "viem/accounts";

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`);

const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; 

const nexusClient = await createNexusClient({ 
    signer: account, 
    chain: baseSepolia, 
    transport: http(), 
    bundlerTransport: http(bundlerUrl), 
});
```

### Create a smart sessions module for the user's account

```typescript
const sessionsModule = toSmartSessionsValidator({ 
    account: nexusClient.account,
    signer: account
});
```

### Install the smart sessions module 
To enable smart session creation, we first need to install the smart sessions module into the Nexus client.

Once the module is installed, we extend the Nexus client with smartSessionCreateActions. This step adds the necessary functionality for managing and creating smart sessions, allowing the Nexus client to interact with the sessions module.

```typescript
const hash = await nexusClient.installModule({ 
    module: sessionsModule.moduleInitData
})
const { success: installSuccess } = await nexusClient.waitForUserOperationReceipt({ hash });
const nexusSessionClient = nexusClient.extend(smartSessionCreateActions(sessionsModule));
```

### Create a Smart Session

To create a smart session, first define the session's permissions by specifying the session's public key and the actions it can perform (e.g., calling a function like `incrementNumber` in a smart contract).

The `grantPermission` function submits this information to the blockchain, assigning a unique `permissionId` to track and manage the session's permissions.

```typescript
const sessionOwner = privateKeyToAccount(generatePrivateKey())
const sessionPublicKey = sessionOwner.address;

const sessionRequestedInfo: CreateSessionDataParams[] = [
    {
        sessionPublicKey,
        actionPoliciesInfo: [{
            contractAddress: "0xabc", // Replace with your contract address
            rules: [],
            functionSelector: "0x273ea3e3" as Hex // Function selector for 'incrementNumber'
        }]
    }
];

const createSessionsResponse = await nexusSessionClient.grantPermission({
    sessionRequestedInfo
});

const [cachedPermissionId] = createSessionsResponse.permissionIds;

const { success } = await nexusClient.waitForUserOperationReceipt({ 
    hash: createSessionsResponse.userOpHash
});
```

### Create active session data
The `sessionData` object serves as the configuration for using a smart session. It includes the session owner’s public key, the granter’s account address, and the specific permissions (via permissionId) for actions the session is allowed to perform. 

```typescript
const sessionData: SessionData = {
    granter: nexusClient.account.address,
    sessionPublicKey,
    moduleData: {
        permissionId: cachedPermissionId,
        mode: SmartSessionMode.USE
    }
};

const compressedSessionData = JSON.stringify(sessionData);
```
It’s crucial to save the compressedSessionData after the user grants permission. This data can include user-specific preferences, or any other session-related information. There are two main options to store this data:
- Local Storage: Save SessionData as a string on the client side. (Local storage requires data to be stored as a string.)
- Database Storage: Alternatively, you can save this data in your dapp’s database.

Use the `JSON.stringify()` function to prepare the session data for storage. 

::::

## Use the Smart Session

Assume that the user has left the dapp and is returning to resume their session. The SessionData from their previous session is necessary to continue seamlessly.

::::steps

### Retrieve the saved `compressedSessionData`

```typescript
const sessionData = JSON.parse(compressedSessionData) as SessionData
```
Decompress this data using the `JSON.parse()` function to restore it to its original structure, making it ready for use.


### Create a Nexus Client for Using the Session

We need a new Nexus client that is associated with the session. This client will use the session owner's private key to sign transactions.

- Account Address: The address of the account that granted the permission.
- Signer: The session owner's private key, which will sign actions during the session.

```typescript

const smartSessionNexusClient = await createNexusSessionClient({
    chain: baseSepolia,
    accountAddress: sessionData.granter,
    signer: sessionOwner,
    transport: http(),
    bundlerTransport: http(bundlerUrl)
});
```

### Create a Smart Sessions Module for the Session Key

We now create a smart sessions module using the session key (sessionOwner). This module validates that the session is permitted to perform actions based on the session data we provided.


```typescript
const usePermissionsModule = toSmartSessionsValidator({
    account: smartSessionNexusClient.account,
    signer: sessionOwner,
    moduleData: sessionData.moduleData
});

const useSmartSessionNexusClient = smartSessionNexusClient.extend(
    smartSessionUseActions(usePermissionsModule)
);
```

### Send transactions with sessions
Now that we have everything set up, we can perform an action with the smart session. In this example, we're calling a function on a smart contract (incrementNumber) using the session key. This is done by specifying:

- Target: The contract address.
- Call Data: The encoded data for the function we're calling, using the ABI to define the function.

```typescript
const userOpHash = await useSmartSessionNexusClient.usePermission({
    actions: [
        {
            target: "0xabc", // Replace with your target contract address
            value: 0n,
            callData: encodeFunctionData({
                abi: CounterAbi,
                functionName: "incrementNumber"
            })
        }
    ]
});

console.log(`Transaction hash: ${userOpHash}`);

```
::::

## Full Code

:::details[Click here]

```typescript twoslash
import {
    createNexusClient, toSmartSessionsValidator, smartSessionCreateActions,
    smartSessionUseActions, CreateSessionDataParams, SessionData,
    createNexusSessionClient
} from "@biconomy/sdk";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { Hex, encodeFunctionData, http } from "viem";
import { SmartSessionMode } from "@rhinestone/module-sdk/module"

const CounterAbi = [
    {
        inputs: [],
        name: "incrementNumber",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
]
const privateKey = "";
const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";

export const createAccountAndSendTransaction = async () => {
    const userAccount = privateKeyToAccount(`0x${privateKey}`)
    const sessionOwner = privateKeyToAccount(generatePrivateKey())
    const sessionPublicKey = sessionOwner.address;

    // 2. Set up Nexus client
    const nexusClient = await createNexusClient({
        signer: userAccount,
        chain: baseSepolia,
        transport: http(),
        bundlerTransport: http(bundlerUrl),
    });

    // 3. Create a smart sessions module for the user's account
    const sessionsModule = toSmartSessionsValidator({
        account: nexusClient.account,
        signer: userAccount
    });

    // 4. Install the smart sessions module
    const hash = await nexusClient.installModule({
        module: sessionsModule.moduleInitData
    })
    const { success: installSuccess } = await nexusClient.waitForUserOperationReceipt({ hash })


    const nexusSessionClient = nexusClient.extend(
        smartSessionCreateActions(sessionsModule)
    )

    const sessionRequestedInfo: CreateSessionDataParams[] = [
        {
            sessionPublicKey, // Public key of the session
            actionPoliciesInfo: [
                {
                    contractAddress: "0xabc",
                    rules: [],
                    functionSelector: "0x273ea3e3" as Hex // Selector for 'incrementNumber'
                }
            ]
        }
    ]


    // 5. Create the smart session
    const createSessionsResponse = await nexusSessionClient.grantPermission({
        sessionRequestedInfo
    })

    const [cachedPermissionId] = createSessionsResponse.permissionIds

    const { success } =
        await nexusClient.waitForUserOperationReceipt({
            hash: createSessionsResponse.userOpHash
        })


    // Use the Smart Session

    // 1. Create active session data
    const sessionData: SessionData = {
        granter: nexusClient.account.address,
        sessionPublicKey,
        moduleData: {
            permissionId: cachedPermissionId,
            mode: SmartSessionMode.USE
        }
    }

    // 2. Create a Nexus Client for Using the Session
    const smartSessionNexusClient = await createNexusSessionClient({
        chain: baseSepolia,
        accountAddress: sessionData.granter,
        signer: sessionOwner,
        transport: http(),
        bundlerTransport: http(bundlerUrl)
    })

    // 3. Create a Smart Sessions Module for the Session Key
    const usePermissionsModule = toSmartSessionsValidator({
        account: smartSessionNexusClient.account,
        signer: sessionOwner,
        moduleData: sessionData.moduleData
    })

    const useSmartSessionNexusClient = smartSessionNexusClient.extend(
        smartSessionUseActions(usePermissionsModule)
    )

    // 4. Send transactions with sessions
    const userOpHash = await useSmartSessionNexusClient.usePermission({
        actions: [
            {
                target: "0xabc",
                value: 0n,
                callData: encodeFunctionData({
                    abi: CounterAbi,
                    functionName: "incrementNumber"
                })
            }
        ]
    })
}

createAccountAndSendTransaction()
```
:::
