import 'viem/window'

// ---cut---
// [!region imports]
import { createWalletClient, custom } from 'viem'
import { polygonAmoy } from 'viem/chains'
import { createSmartAccountClient } from "@biconomy/account"
// [!endregion imports]

export const walletClient = createWalletClient({
    chain: polygonAmoy,
    transport: custom(window.ethereum!),
})

export const smartAccountClient = await createSmartAccountClient({  // [!code focus] 
    bundlerUrl: "https://bundler.biconomy.io/api/v2/80002/cJPK7B3ru.dd7f7861-190d-45ic-af80-6877f74b8f44", // [!code focus] 
    biconomyPaymasterApiKey: "_sTfkyAEp.552504b5-9093-4d4b-94dd-701f85a267ea", // [!code focus] 
    signer: walletClient  // [!code focus] 
})  // [!code focus] 
