# BiconomyProvider

## Description

The `BiconomyProvider` component in TypeScript React sets up a context provider for managing BiconomySmartAccountV2 related state and functionality.

## Usage

```tsx twoslash
import { BiconomyProvider } from "@biconomy/use-aa";
import { createConfig, http, WagmiProvider } from "wagmi";
import { polygonAmoy } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import React from "react";

const wagmiConfig = createConfig({
  chains: [polygonAmoy],
  transports: { [polygonAmoy.id]: http() },
});

const queryClient = new QueryClient();

const App = () => <></> // Replace with app

ReactDOM.createRoot(document?.getElementById("root")!).render(
  <StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <BiconomyProvider
          config={{
            biconomyPaymasterApiKey: "_sTfkyAEp.552504b5-9093-4d4b-94dd-701f85a267ea",
            bundlerUrl: "https://bundler.biconomy.io/api/v2/80002/cJPK7B3ru.dd7f7861-190d-45ic-af80-6877f74b8f44",
            chainId: 80002
          }}
          queryClient={queryClient}
        >
          <App />
        </BiconomyProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
```


## Parameters

```ts
type BiconomyProviderProps = {
  /** The children of the provider */
  children: ReactNode;
  /** The Biconomy configuration */
  config: { bundlerUrl: string; biconomyPaymasterApiKey: string };
  /** The Tanstack Query client instance */
  queryClient: QueryClient | undefined;
};
```

## Returns

```ts
type BiconomyContextPayload = {
  /** The BiconomySmartAccountV2 instance. This can be used to 'drop down' to the core SDK */
  smartAccountClient: BiconomySmartAccountV2 | null;
  /** The Tanstack Query client instance */
  queryClient: QueryClient | undefined;
  /** The address of the smart account for the user */
  smartAccountAddress: Hex;
  /** The URL of the Biconomy bundler. This can be retrieved from the Biconomy dashboard: https://dashboard.biconomy.io */
  bundlerUrl: string;
  /** The paymaster API key. This can be retrieved from the Biconomy dashboard: https://dashboard.biconomy.io */
  biconomyPaymasterApiKey: string;
};
```


## Source

[providers/BiconomyProvider.tsx:82](https://github.com/bcnmy/useAA/blob/main/src/providers/BiconomyProvider.tsx#L82)
