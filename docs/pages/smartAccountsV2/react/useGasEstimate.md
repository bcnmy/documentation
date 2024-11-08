# useSendTransaction

## Description

Returns an upper estimate for the gas spent on a specific user operation. This method will fetch an approximate gas estimate for the user operation, given the current state of the network. It is regularly an overestimate, and the actual gas spent will likely be lower. Returns the expected amount of gas in wei for the tx

## Usage

```tsx twoslash
import { useGasEstimate } from "@biconomy/use-aa";
import type { Transaction } from "@biconomy/account";
import { encodeFunctionData, parseAbi, Hex } from "viem";
import React, { useEffect, useMemo } from "react"

export const GasEstimate = ({ smartAccountAddress }: { smartAccountAddress: Hex }) => {

  const transactions: Transaction[] = useMemo(
    () => ([{
      to: "0x1758f42Af7026fBbB559Dc60EcE0De3ef81f665e",
      data: encodeFunctionData({
        abi: parseAbi(["function safeMint(address _to)"]),
        functionName: "safeMint",
        args: [smartAccountAddress as Hex],
      }),
    }]),
    [smartAccountAddress]
  );

  const { data: gasInWei, error, isLoading } = useGasEstimate({ transactions });

  return (
    <div>
      Amount: {gasInWei?.toString()}
    </div>
  )
}
```

## Parameters

```ts
type Transaction = {
  to: string;
  value: BigNumberish | string;
  data: string;
};

type UseGasEstimateProps = {
  /** The transactions to be batched. */
  transactions: Transaction | Transaction[];
  /** The BuildUserOpOptions options. See https://bcnmy.github.io/biconomy-client-sdk/types/BuildUserOpOptions.html for further detail */
  options?: BuildUserOpOptions;
};
```

## Returns

The amount of gas in wei as a `bigint`

## Source

[hooks/useGasEstimate.ts:79](https://github.com/bcnmy/useAA/blob/main/src/hooks/useGasEstimate.ts)
