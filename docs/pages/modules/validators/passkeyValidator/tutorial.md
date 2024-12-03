# Biconomy Passkey SDK Integration Guide

This guide demonstrates how to integrate the Biconomy SDK with passkey authentication in a client-side application.

> ⚠️ **Important**: This functionality only works in client-side applications (browsers) as it requires access to the WebAuthn API. It cannot be implemented in backend services.

## Setup Environment Variables

Create a `.env` file with your Biconomy configuration:

```
NEXT_PUBLIC_BUNDLER_URL=your_bundler_url
NEXT_PUBLIC_PAYMASTER_URL=your_paymaster_url
```

## Step 1: Create Nexus Client

```typescript
import { createNexusClient, createBicoPaymasterClient } from '@biconomy/sdk'
import { baseSepolia } from 'wagmi/chains'
import { http } from 'wagmi'

async function initNexusClient(walletClient) {
  const nexusClient = await createNexusClient({
    signer: walletClient,
    chain: baseSepolia,  // or your preferred chain
    paymaster: createBicoPaymasterClient({
      paymasterUrl: process.env.NEXT_PUBLIC_PAYMASTER_URL || "",
    }),
    transport: http(),
    bundlerTransport: http(process.env.NEXT_PUBLIC_BUNDLER_URL),
  });
  
  return nexusClient;
}
```

## Step 2: Register a New Passkey

```typescript
import { toWebAuthnKey, toPasskeyValidator, WebAuthnMode } from '@biconomy/passkey'

async function registerPasskey(nexusClient, passkeyName) {
  // Create WebAuthn key
  // Ideally "passkeyName" would be set by the user in the UI
  const webAuthnKey = await toWebAuthnKey({
    passkeyName: passkeyName, 
    mode: WebAuthnMode.Register,
  })

  // Create passkey validator
  const passkeyValidator = await toPasskeyValidator({
    account: nexusClient?.account,
    webAuthnKey,
  })

  // Store webAuthnKey for future use
  const formattedWebAuthnKey = {
    pubX: webAuthnKey.pubX.toString(),
    pubY: webAuthnKey.pubY.toString(),
    authenticatorId: webAuthnKey.authenticatorId,
    authenticatorIdHash: webAuthnKey.authenticatorIdHash,
  }
  localStorage.setItem('webAuthnKey', JSON.stringify(formattedWebAuthnKey));
  
  return passkeyValidator;
}
```

## Step 3: Login with Existing Passkey

```typescript
async function loginPasskey(nexusClient) {
  const webAuthnKey = await toWebAuthnKey({
    mode: WebAuthnMode.Login,
  })

  const passkeyValidator = await toPasskeyValidator({
    account: nexusClient?.account,
    webAuthnKey,
  })
  
  return passkeyValidator;
}
```

## Step 4: Install Passkey Validator Module

```typescript
async function installPasskeyValidator(nexusClient, passkeyValidator) {
  const passkeyValidatorAddress = "0xD990393C670dCcE8b4d8F858FB98c9912dBFAa06"
  const userOpHash = await nexusClient?.installModule({
    module: {
      address: passkeyValidatorAddress, 
      type: "validator",
      initData: passkeyValidator?.initData
    },
  })
  
  // Wait for transaction to be confirmed
  await nexusClient?.waitForUserOperationReceipt({ hash: userOpHash });
}
```

## Step 5: Using Passkey for Transactions

```typescript
async function sendTransactionWithPasskey(walletClient, passkeyValidator, recipientAddress) {
  // Create new nexus client instance with passkey validator
  const nexusClientWithPasskey = await createNexusClient({
    signer: walletClient,
    chain: baseSepolia,
    paymaster: createBicoPaymasterClient({
      paymasterUrl: process.env.NEXT_PUBLIC_PAYMASTER_URL || "",
    }),
    transport: http(),
    module: passkeyValidator,
    bundlerTransport: http(process.env.NEXT_PUBLIC_BUNDLER_URL),
  });

  // Send transaction
  const hash = await nexusClientWithPasskey.sendTransaction({
    calls: [
      {
        to: recipientAddress,
        value: BigInt(0)  // or your desired value
      }
    ],
  });

  // Wait for confirmation
  const receipt = await nexusClientWithPasskey.waitForTransactionReceipt({ hash });
  return receipt;
}
```

## Step 6: Uninstall Passkey Validator (Optional)

```typescript
async function uninstallPasskeyValidator(nexusClient, passkeyValidator) {
  const nexusClientWithPasskey = await createNexusClient({
    // ... same configuration as above
    module: passkeyValidator,
  });

  const userOpHash = await nexusClientWithPasskey?.uninstallModule({
    module: {
      address: PASSKEY_VALIDATOR_ADDRESS,
      type: "validator",
      deInitData: "0x"
    }
  });

  await nexusClient?.waitForUserOperationReceipt({ hash: userOpHash });
  
  // Clear stored passkey data
  localStorage.removeItem('webAuthnKey');
}
```