# useDeploySmartAccount

## Description

Deploys a users smartAccount contract. It is useful for deploying in a moment when you know that gas prices are low, and you want to deploy the account before sending the first user operation. This step can otherwise be skipped, as the deployment will alternatively be bundled with the first user operation.

## Usage

```tsx twoslash
import { useDeploySmartAccount, useUserOpWait, Options } from "@biconomy/use-aa";
import { polygonAmoy } from "viem/chains";
import { encodeFunctionData, parseAbi, Hex } from "viem";
import React, { useEffect } from "react"

const DeploySmartAccount = () => {
  const {
    mutate,
    data: userOpResponse,
    error,
    isPending,
  } = useDeploySmartAccount();

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

  const deployTx = () =>
    mutate({
      options: Options.Sponsored,
    });

  return (
    <ErrorGuard errors={[error, waitError]}>
      <Button
        title="Deploy Smart Account"
        onClick={deployTx}
        isLoading={isPending || waitIsLoading}
      />
    </ErrorGuard>
  );
};
```

## Parameters

```ts
type UseDeploySmartAccountProps = {
  /** The BuildUserOpOptions options. See https://bcnmy.github.io/biconomy-client-sdk/types/BuildUserOpOptions.html for further detail */
  options?: BuildUserOpOptions;
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

[hooks/useDeploySmartAccount.ts:69](https://github.com/bcnmy/useAA/blob/main/src/hooks/useDeploySmartAccount.ts#L69)
