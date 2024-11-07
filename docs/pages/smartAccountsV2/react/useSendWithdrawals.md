# useSendWithdrawals

## Description

Withdraws funds from Smart Account to a recipient (defaults to EOA)

## Usage

```tsx twoslash
import {
  useSendWithdrawals,
  useUserOpWait,
  useSmartAccount,
  Options
} from "@biconomy/use-aa";
import { polygonAmoy } from "viem/chains";
import { NATIVE_TOKEN_ALIAS } from "@biconomy/account";
import React, { useEffect } from "react"

export const Withdraw = () => {
  const { smartAccountAddress } = useSmartAccount();

  const {
    mutate,
    data: userOpResponse,
    error,
    isPending,
  } = useSendWithdrawals();

  const {
    isLoading: waitIsLoading,
    isSuccess: waitIsSuccess,
    error: waitError,
    data: waitData,
  } = useUserOpWait(userOpResponse);

  useEffect(() => {
    if (waitData?.success === "true") {
      console.log(waitData?.receipt?.transactionHash);
    }
  }, [waitData]);

  const withdrawalHandler = () =>
    mutate({
      withdrawalRequests: [
        { address: "0x747A4168DB14F57871fa8cda8B5455D8C2a8e90a" }, // omit the amount to withdraw the full balance
        { address: NATIVE_TOKEN_ALIAS, amount: BigInt(1) },
      ],
      options: Options.Sponsored,
    });

  return (
    <button
      title={isPending || waitIsLoading ? "Loading..." : "Withdraw"}
      onClick={withdrawalHandler}
    />
  );
};
```

## Parameters

```ts
type WithdrawalRequest = {
  /** The address of the asset */
  address: Hex;
  /** The amount to withdraw. Expects unformatted amount. Will use max amount if unset */
  amount?: bigint;
  /** The destination address of the funds. The second argument from the `withdraw(...)` function will be used as the default if left unset. */
  recipient?: Hex;
};

type UseSendWithdrawalsProps = {
  /** The BuildUserOpOptions options. See https://bcnmy.github.io/biconomy-client-sdk/types/BuildUserOpOptions.html for further detail */
  options?: BuildUserOpOptions;
  /** Withdrawal requests */
  withdrawalRequests?: WithdrawalRequest[] | null;
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

[hooks/useSendWithdrawals.ts:89](https://github.com/bcnmy/useAA/blob/main/src/hooks/useSendWithdrawals.ts#L89)
