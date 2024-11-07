# useBatchSession

## Description

Uses a previously created batch session ([see here](/smartAccountsV2/react/useCreateBatchSession)) which batches transactions in the context of a users smart account.

## Usage

```tsx twoslash
// @errors: 2353
import { useBatchSession, useUserOpWait, Options } from "@biconomy/use-aa";
import type { Transaction } from "@biconomy/account";
import { polygonAmoy } from "viem/chains";
import { encodeFunctionData, parseAbi, Hex } from "viem";
import React, { useEffect } from "react"

const UseBatchSession =  ({ smartAccountAddress }: { smartAccountAddress: Hex }) => {
  const { mutate, data: userOpResponse, error, isPending } = useBatchSession();

  const {
    isLoading: waitIsLoading,
    isSuccess: waitIsSuccess,
    error: waitError,
    data: waitData,
  } = useUserOpWait(userOpResponse);

  const nftMintTx: Transaction = {
    to: "0x1758f42Af7026fBbB559Dc60EcE0De3ef81f665e",
    data: encodeFunctionData({
      abi: parseAbi(["function safeMint(address _to)"]),
      functionName: "safeMint",
      args: [smartAccountAddress],
    }),
  };

  const txTwice = () =>
    mutate({
      transactions: [nftMintTx, nftMintTx],
      correspondingIndexes: [0, 1],
      options: Options.Sponsored,
      smartAccountAddress
    });

  useEffect(() => {
    if (waitData?.success === "true") {
      console.log(waitData?.receipt?.transactionHash);
    }
  }, [waitData]);

  return (
    <button
      title={isPending || waitIsLoading ? "Loading..." : "Use Session to Mint Twice"}
      onClick={txTwice}
    />
  );
};
```


## Parameters

```ts
type Transaction = {
  to: string;
  value: BigNumberish | string;
  data: string;
};

type UseBatchSessionProps = {
  /** The BuildUserOpOptions options. See https://bcnmy.github.io/biconomy-client-sdk/types/BuildUserOpOptions.html for further detail */
  options?: BuildUserOpOptions;
  /** The transactions to be batched. */
  transactions: Transaction | Transaction[];
  /** An array of indexes for the transactions corresponding to the relevant session IDs. */
  correspondingIndexes: number[];
  /** The smart account address to be used for the session. Defaults to the connected smartAccount. */
  smartAccountAddress?: Hex
};
```

## Returns

```ts twoslash
import type { UserOpReceipt, UserOpStatus } from "@biconomy/account";
// ---cut---
type UserOpResponse = {
  userOpHash: string;
  wait(_confirmations?: number): Promise<UserOpReceipt>;
  waitForTxHash(): Promise<UserOpStatus>;
};
```

## Source

[hooks/useBatchSession.ts:91](https://github.com/bcnmy/useAA/blob/main/src/hooks/useBatchSession.ts#L91)
