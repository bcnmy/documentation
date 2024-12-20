# Production Contracts

## Nexus v1.0.1 Production Contracts
| Name    | Address    | 
|-------------|-------------|
| Nexus implementation  | `0x000000008761E87F023f65c49DC9cb1C7EdFEaaf`  |
| K1 Validator  | `0x0000002D6DB27c52E3C11c1Cf24072004AC75cBa`  | 
| K1 Validator Factory  | `0x00000024115AA990F0bAE0B6b0D5B8F68b684cd6`  | 
| Account Factory  | `0x000000226cada0d8b36034F5D5c06855F59F6F3A`  |
| Bootstrap  | `0x000000F5b753Fdd20C5CA2D7c1210b3Ab1EA5903`  |
| Entrypoint V7 | `0x0000000071727de22e5e9d8baf0edac6f37da032` |

### Paymaster contracts
#### Base and Optimism
| Name    | Address    | 
|-------------|-------------|
| Sponsorship Paymaster | `0x0000006087310897e0BFfcb3f0Ed3704f7146852` |
| Token Paymaster | `0x00000000301515A5410e0d768aF4f53c416edf19` |

### Other chains
| Name    | Address    | 
|-------------|-------------|
| Sponsorship Paymaster | `0x00000072a5F551D6E80b2f6ad4fB256A27841Bbc` |
| Token Paymaster | `0x00000000301515A5410e0d768aF4f53c416edf19` |

## Audits

### Nexus

| Audited by    | Links    | 
|-------------|-------------|
| Cyfrin  | [report](https://github.com/bcnmy/nexus/blob/dev/audits/CodeHawks-Cyfrin-Competition-170924.pdf)  |
| Spearbit  | [report](https://github.com/bcnmy/nexus/blob/dev/audits/report-cantinacode-biconomy-0708-final.pdf)  + [erc-7739 add-on](https://github.com/bcnmy/nexus/blob/dev/audits/report-cantinacode-biconomy-erc7739-addon-final.pdf) 

### Paymaster

| Audited by    | Links    | 
|-------------|-------------|
| Chainlight | [Sponsorship Paymaster report](https://github.com/bcnmy/gasdaddy/blob/6bb9ad9b74cb48cd9284461b31b5624edf8a6eb5/audits/ChainLight_Biconomy_Sponsorship_Paymaster_Security_Audit_v1_1.pdf) |
| Chainlight | [Token Paymaster report](https://github.com/bcnmy/gasdaddy/blob/20239ae8bf5696d57341ff90e0be52e6038bf47f/audits/ChainLight_Biconomy_Token_Paymaster_Security_Audit_v1_0.pdf) |


# Dev access contracts
⚠️ Those contracts are not audited. They are not recommended for production use.

## MEE Contracts
| Name    | Address    | 
|-------------|-------------|
|  MEE Entrypoint | `0xE854C84cD68fC434cB3B0042c29235D452cAD977` |
|  MEE Validator | `0x068EA3E30788ABaFDC6fD0b38d20BD38a40a2B3D` |

Supported chains:
| Network            | Supported     |
| ------------------ | ----------- |
| Ethereum Sepolia   | ✅           |
| Base Testnet       | ✅           |
| Base Mainnet       | ✅           |
| OP Sepolia Testnet | ✅           |
| OP Mainnet         | ✅           |
| Polygon Mainnet         | ✅           |
| Polygon Amoy Testnet         | ✅           |
| Scroll Sepolia Testnet         | ✅           |
| Scroll Mainnet         | ✅           |
| Gnosis Mainnet         | ✅           |
| Gnosis Chiado Testnet         | ✅           |
| Arbitrum Mainnet         | ✅           |
| Arbitrum Sepolia Testnet         | ✅           |
| Binance Smart Chain Mainnet         | ✅           |
| Binance Smart Chain Testnet         | ✅           |
| Berachain Bartio Testnet         | ✅           |


## Nexus v1.1.0-alpha Experimental Contracts
| Name    | Address    | 
|-------------|-------------|
| Nexus implementation  | `0xAc47768566eECbd80FDfeCC2d8ffFed688384a56`  |
| K1 Validator  | `0x0000002D6DB27c52E3C11c1Cf24072004AC75cBa`  | 
| K1 Validator Factory  | `0xf04a35Ea86777374611462E7Ebaf84F6014555E1`  | 
| Account Factory  | `0x0F0F6c0183fD5bf47672986b308322911838A1F9`  |
| Bootstrap  | `0xEc1Fa124D0aB8DFf1FF78A8EF77672bc4936033B`  |

Deployed on the 7702-compatible testnets only.
- [Ithaca Odyssey](https://hub.conduit.xyz/odyssey)
- [Mekong Testnet](https://mekong.ethpandaops.io/)

### Features
- [ERC-7702](https://eips.ethereum.org/EIPS/eip-7702) support
- [ERC-7779](https://eips.ethereum.org/EIPS/eip-7779) support (WIP)
- [ERC-7821](https://eips.ethereum.org/EIPS/eip-7821) support (WIP)
