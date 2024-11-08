# useSession

## Description

Uses a previously created session ([see here](/smartAccountsV2/react/useCreateSession)) which sends transactions in the context of a users smart account.

## Usage

```tsx twoslash
// @errors: 2353
import { useSession, useUserOpWait, Options } from "@biconomy/use-aa";
import { polygonAmoy } from "viem/chains";
import { encodeFunctionData, parseAbi, Hex } from "viem";
import React, { useEffect } from "react"

export const UseSession = ({ smartAccountAddress }: { smartAccountAddress: Hex }) => {
  const { mutate, data: userOpResponse, error, isPending } = useSession();

  const {
    isLoading: waitIsLoading,
    isSuccess: waitIsSuccess,
    error: waitError,
    data: waitData,
  } = useUserOpWait(userOpResponse);

  const mintTx = () =>
    mutate({
      transactions: {
        to: "0x1758f42Af7026fBbB559Dc60EcE0De3ef81f665e",
        data: encodeFunctionData({
          abi: parseAbi(["function safeMint(address _to)"]),
          functionName: "safeMint",
          args: [smartAccountAddress],
        }),
      },
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
      title={isPending || waitIsLoading ? "Loading..." : "Use Session to Mint"}
      onClick={mintTx}
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
type UseSessionProps = {
  /** The BuildUserOpOptions options. See https://bcnmy.github.io/biconomy-client-sdk/types/BuildUserOpOptions.html for further detail */
  options?: BuildUserOpOptions;
  /** The whitelisted transaction */
  transactions: Transaction | Transaction[];
  /** The index of the relevant session leaf. Defaults to zero */
  correspondingIndex?: number;
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

[hooks/useSession.ts:87](https://github.com/bcnmy/useAA/blob/main/src/hooks/useSession.ts#L87)
