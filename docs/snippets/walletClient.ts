import 'viem/window'

// ---cut---
// [!region imports]
import { createWalletClient, custom } from 'viem'
import { polygonAmoy } from 'viem/chains'
// [!endregion imports]

export const walletClient = createWalletClient({ // [!code focus] 
    chain: polygonAmoy,  // [!code focus] 
    transport: custom(window.ethereum!),  // [!code focus] 
})  // [!code focus] 