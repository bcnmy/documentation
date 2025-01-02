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

```typescript twoslash"
import { createSmartAccountClient, createBicoPaymasterClient } from '@biconomy/sdk'
import { baseSepolia } from 'wagmi/chains'
import { http, useAccount, useWalletClient } from 'wagmi'

const account = useAccount()
const { data: walletClient } = useWalletClient({ account: account.address })

async function initNexusClient() {
  if(walletClient) {
    const nexusClient = await createSmartAccountClient({
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
  throw new Error('Wallet client not found')
}
```

## Step 2: Register a New Passkey

```typescript twoslash
import { toWebAuthnKey, toPasskeyValidator, WebAuthnMode } from '@biconomy/passkey'
import { NexusClient } from '@biconomy/sdk'

async function registerPasskey(nexusClient: NexusClient, passkeyName: string) {
  // Create WebAuthn key
  // Ideally "passkeyName" would be set by the user in the UI
  const webAuthnKey = await toWebAuthnKey({
    passkeyName: passkeyName, 
    mode: WebAuthnMode.Register,
  })

  // Create passkey validator
  const passkeyValidator = await toPasskeyValidator({
    account: nexusClient.account,
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

```typescript twoslash
import { NexusClient } from '@biconomy/sdk'
import { toWebAuthnKey, WebAuthnMode, toPasskeyValidator } from '@biconomy/passkey'

async function loginPasskey(nexusClient: NexusClient) {
  const webAuthnKey = await toWebAuthnKey({
    mode: WebAuthnMode.Login,
  })

  const passkeyValidator = await toPasskeyValidator({
    account: nexusClient.account,
    webAuthnKey,
  })
  
  return passkeyValidator;
}
```

## Step 4: Install Passkey Validator Module

```typescript twoslash
import type { NexusClient, Module } from '@biconomy/sdk'

async function installPasskeyValidator(nexusClient: NexusClient, passkeyValidator: Module) {
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

```typescript twoslash
import { createSmartAccountClient, createBicoPaymasterClient, type Module, type NexusClient, moduleActivator } from '@biconomy/sdk'
import { baseSepolia } from 'wagmi/chains'
import { http, useAccount, useWalletClient } from 'wagmi'
import type { Address } from 'viem'

const account = useAccount()
const { data: walletClient } = useWalletClient({ account: account.address })

async function sendTransactionWithPasskey(nexusClient: NexusClient, passkeyValidator: Module, recipientAddress: Address) {
  // Extend NexusClient with passkey validator
  nexusClient.extend(moduleActivator(passkeyValidator));
  // Send transaction
  const hash = await nexusClient.sendTransaction({
    calls: [
      {
        to: recipientAddress,
        value: BigInt(0)  // or your desired value
      }
    ],
  });

  // Wait for confirmation
  const receipt = await nexusClient.waitForTransactionReceipt({ hash });
  return receipt;
}
```

## Step 6: Uninstall Passkey Validator (Optional)

```typescript twoslash
import { type NexusClient, type Module, createSmartAccountClient, moduleActivator } from '@biconomy/sdk'

async function uninstallPasskeyValidator(nexusClient: NexusClient, passkeyValidator: Module) {
  nexusClient.extend(moduleActivator(passkeyValidator));
  const userOpHash = await nexusClient?.uninstallModule({
    module: {
      address: passkeyValidator.address,
      type: "validator",
      deInitData: "0x"
    }
  });

  await nexusClient?.waitForUserOperationReceipt({ hash: userOpHash });
  
  // Clear stored passkey data
  localStorage.removeItem('webAuthnKey');
}
```