# Sending Transactions with Smart sessions ⚡️

This document provides a step-by-step guide on how to set up and use the Smart Sessions Module with the Nexus client. The module allows you to manage user sessions in a secure and streamlined way, integrated with your Nexus-powered account. Below is a breakdown of how to create, install, and use the module's functionality.


### 1. Set up an owner account
First, we need to set up an Owner for the Smart Account which will be used to sign User Operations (transactions) for the Smart Account.

```typescript twoslash
import { privateKeyToAccount } from "viem/accounts";

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`);
```

### 2. Set up Nexus client

A Smart Account needs access to the Network to query for information about its state (e.g., nonce, address, etc.). Let's configure a client for the Smart Account. A `bundlerUrl` is required to submit User Operations to the Network, which will initialize the Smart Account.

```typescript twoslash
import { createNexusClient } from "@biconomy/sdk";
import { baseSepolia } from "viem/chains"; 
import { http } from "viem"; 
import { privateKeyToAccount } from "viem/accounts";

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`);

const bundlerUrl = "https://sdk-relayer.staging.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; // [!code focus:10]

const nexusClient = await createNexusClient({ 
    signer: account, 
    chain: baseSepolia, 
    transport: http(), 
    bundlerTransport: http(bundlerUrl), 
});
```

### 3. Create a smart sessions module for the user's account

```typescript twoslash
import { createNexusClient, toSmartSessionsValidator } from "@biconomy/sdk";  // [!code focus]
import { baseSepolia } from "viem/chains"; 
import { http } from "viem"; 
import { privateKeyToAccount } from "viem/accounts";

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`);

const bundlerUrl = "https://sdk-relayer.staging.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; 

const nexusClient = await createNexusClient({ 
    signer: account, 
    chain: baseSepolia, 
    transport: http(), 
    bundlerTransport: http(bundlerUrl), 
});

const sessionsModule = toSmartSessionsValidator({ // [!code focus:3]
    account: nexusClient.account,
    signer: account
});
```

### 4. Install the smart sessions module on the Nexus client's smart contract account

```typescript
const hash = await nexusClient.installModule({ // [!code focus:3]
    module: sessionsModule.moduleInitData
})
const { success: installSuccess } = await nexusClient.waitForUserOperationReceipt({ hash })

```

### 5. Extend the Nexus client with smart session creation actions

```typescript
const nexusSessionClient = nexusClient.extend(
    smartSessionCreateActions(sessionsModule)
)

```

### 6. create session data and session

``` typescript
const sessionPublicKey = account.address;
const sessionRequestedInfo: CreateSessionDataParams[] = [
    {
        sessionPublicKey, // Public key of the session
        sessionValidatorAddress: SIMPLE_SESSION_VALIDATOR_ADDRESS,
        sessionKeyData: toHex(toBytes(sessionPublicKey)),
        sessionValidAfter: 0, // Session valid immediately
        sessionValidUntil: 0, // Session valid indefinitely
        actionPoliciesInfo: [
            {
                contractAddress: "0xabc...,
                functionSelector: "0x273ea3e3" as Hex, // Selector for 'incrementNumber'
                validUntil: 0, // Policy valid indefinitely
                validAfter: 0, // Policy valid immediately
                rules: [], // No additional rules
                valueLimit: BigInt(0) // No value limit
            }
        ]
    }
]

// Create the smart session
const createSessionsResponse = await nexusSessionClient.createSessions({
    sessionRequestedInfo
})

// wait for the session creation to be success
const { success: sessionCreateSuccess } = await usersNexusClient.waitForUserOperationReceipt({
    hash: createSessionsResponse.userOpHash
});

```

### 7. Get the session details

```typescript
const [cachedPermissionId] = createSessionsResponse.permissionIds
const sessionPublicKey = account.address;
const sessionData: SessionData = {
    granter: nexusClient.account.address,
    sessionPublicKey,
    moduleData: {
        permissionId: cachedPermissionId,
        mode: SmartSessionMode.USE
    }
}
```

### 8. Create a new Nexus client for the session

This client will be used to interact with the smart contract account using the session key.

```typescript
const smartSessionNexusClient = await createNexusSessionClient({
    chain,
    accountAddress: sessionData.granter,
    signer: account,
    transport: http(),
    bundlerTransport: http(bundlerUrl)
})
```

