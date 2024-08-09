import { defineConfig } from "vocs";
import { config } from "dotenv";

config();

export const defaultSidebar = [
  { link: "/overview", text: "Overview" },
  { link: "/quickstart-react", text: "Quickstart: React" },
  { link: "/quickstart", text: "Quickstart: Core SDK" },
  {
    link: "/react",
    text: "React",
    collapsed: true,
    items: [
      {
        link: "/react/BiconomyProvider",
        text: "BiconomyProvider",
      },
      {
        link: "/react/useBatchSession",
        text: "UseBatchSession",
      },
      {
        link: "/react/useCreateBatchSession",
        text: "UseCreateBatchSession",
      },
      {
        link: "/react/useCreateSession",
        text: "UseCreateSession",
      },
      {
        link: "/react/useDeploySmartAccount",
        text: "UseDeploySmartAccount",
      },
      { link: "/react/useGasEstimate", text: "UseGasEstimate" },
      {
        link: "/react/useSendGasTokenTransaction",
        text: "UseSendGasTokenTransaction",
      },
      {
        link: "/react/useSendSponsoredTransaction",
        text: "UseSendSponsoredTransaction",
      },
      {
        link: "/react/useSendTransaction",
        text: "UseSendTransaction",
      },
      {
        link: "/react/useSendWithdrawals",
        text: "UseSendWithdrawals",
      },
      { link: "/react/useSession", text: "UseSession" },
      {
        link: "/react/useCreateSessionWithDistributedKey",
        text: "UseCreateSessionWithDistributedKey",
      },
      {
        link: "/react/useSessionWithDistributedKey",
        text: "UseSessionWithDistributedKey",
      },
      {
        link: "/react/useSmartAccount",
        text: "UseSmartAccount",
      },
      { link: "/react/useTokenFees", text: "UseTokenFees" },
      { link: "/react/useUserOpWait", text: "UseUserOpWait" },
    ],
  },
  {
    link: "/tutorials",
    text: "Tutorials",
    collapsed: true,
    items: [

      { link: "/tutorials/sendSimpleTransaction", text: "Send a simple transaction" },
      { link: "/tutorials/sendTransactionsBatch", text: "Send transactions batch" },
      { link: "/tutorials/sendGasless", text: "Send a gasless transaction" },
      {
        link: "/tutorials/payERC20Token",
        text: "Pay gas in ERC20 token",
      },
      {
        link: "/tutorials/parallelUserOps",
        text: "Send parallel userOps",
      },
      {
        link: "/tutorials/sessions",
        text: "Sessions",
        items: [
          {
            link: "/tutorials/sessions/createSession",
            text: "Create Session",
          },
          {
            link: "/tutorials/sessions/useSession",
            text: "Use Session",
          },
          {
            link: "/tutorials/sessions/createBatchSession",
            text: "Create Batch Session",
          },
          {
            link: "/tutorials/sessions/useBatchSession",
            text: "Use Batch Session",
          },
          {
            link: "/tutorials/sessions/customSessionStorage",
            text: "Custom Session Storage",
          },
        ],
      },
      {
        link: "/tutorials/customValidationModule",
        text: "Custom Validation Module",
      },
      {
        link: "/tutorials/utils",
        text: "Utils",
        items: [
          {
            link: "/tutorials/utils/offsetGasValues",
            text: "Offset Gas Values",
          },
          {
            link: "/tutorials/utils/transferOwnership",
            text: "Transfer Ownership",
          },
          {
            link: "/tutorials/utils/DAN",
            text: "DAN",
            items: [
              {
                link: "/tutorials/utils/DAN/generateSessionKey",
                text: "Generate session key",
              },
              {
                link: "/tutorials/utils/DAN/signMessage",
                text: "Sign message",
              },
            ],
          },
        ],
      },
      {
        link: "/tutorials/apiIntegration",
        text: "API Integration",
        collapsed: true,
        items: [
          {
            link: "/tutorials/apiIntegration/userSponsored",
            text: "User sponsored",
          },
          {
            link: "/tutorials/apiIntegration/paymasterSponsored",
            text: "Paymaster Sponsored",
          },
          {
            link: "/tutorials/apiIntegration/paymasterERC20",
            text: "Paymaster ERC20",
          },
          
          {
            link: "/tutorials/apiIntegration/signUserOperation",
            text: "Sign userOp",
          },
          
        ],
      },   
      { link: "/tutorials/v4Migration", text: "V4 Migration" },
    ],
  },
  {
    link: "/account",
    text: "Smart Account",
    collapsed: true,
    items: [
      { link: "/account/integration", text: "Integration" },
      { link: "/account/methods", text: "Methods" },
      {
        link: "/account/signers",
        text: "Signers",
        items: [
          {
            link: "/account/signers/eoa",
            text: "Eoa",
            items: [
              {
                link: "/account/signers/eoa/ethers",
                text: "Ethers",
              },
              {
                link: "/account/signers/eoa/viem",
                text: "Viem",
              },
              {
                link: "/account/signers/eoa/wagmi",
                text: "Wagmi",
              },
            ],
          },
          { link: "/account/signers/capsule", text: "Capsule" },
          { link: "/account/signers/dfns", text: "Dfns" },
          { link: "/account/signers/dynamic", text: "Dynamic" },
          { link: "/account/signers/magic", text: "Magic" },
          {
            link: "/account/signers/particle",
            text: "Particle",
          },
          {
            link: "/account/signers/passport",
            text: "Passport",
          },
          { link: "/account/signers/privy", text: "Privy" },
          { link: "/account/signers/turnkey", text: "Turnkey" },
          {
            link: "/account/signers/web3auth",
            text: "Web3auth",
          },
        ],
      },
      { link: "/account/fiatonramp", text: "Enable Fiat On-Ramp" },
    ],
  },
  {
    link: "/bundler",
    text: "Bundler",
    collapsed: true,
    items: [
      {
        link: "/bundler/api",
        text: "Api",
        items: [
          { link: "/bundler/api/explorer", text: "Explorer" },
          { link: "/bundler/api/chainId", text: "ChainId" },
          {
            link: "/bundler/api/estimate-useroperation-gas",
            text: "Estimate-useroperation-gas",
          },
          {
            link: "/bundler/api/get-gas-fee-values",
            text: "Get-gas-fee-values",
          },
          {
            link: "/bundler/api/get-useroperation-by-hash",
            text: "Get-useroperation-by-hash",
          },
          {
            link: "/bundler/api/get-useroperation-receipt",
            text: "Get-useroperation-receipt",
          },
          {
            link: "/bundler/api/get-useroperation-status",
            text: "Get-useroperation-status",
          },
          {
            link: "/bundler/api/send-UserOperation",
            text: "Send-UserOperation",
          },
          {
            link: "/bundler/api/supported-EntryPoints",
            text: "Supported-EntryPoints",
          },
        ],
      },
      {
        link: "/bundler/bundlermethods",
        text: "Bundler Methods",
      },
      { link: "/bundler/integration", text: "Integration" },
    ],
  },
  {
    link: "/paymaster",
    text: "Paymaster",
    collapsed: true,
    items: [
      {
        link: "/paymaster/7677",
        text: "7677",
        items: [
          {
            link: "/paymaster/7677/pm_getPaymasterData",
            text: "Pm_getPaymasterData",
          },
          {
            link: "/paymaster/7677/pm_getPaymasterStubData",
            text: "Pm_getPaymasterStubData",
          },
        ],
      },
      {
        link: "/paymaster/api",
        text: "Api",
        items: [
          {
            link: "/paymaster/api/explorer",
            text: "Explorer",
          },
          {
            link: "/paymaster/api/get-fee-quotes",
            text: "Get-fee-quotes",
          },
          {
            link: "/paymaster/api/sponsor-useroperation",
            text: "Sponsor-useroperation",
          },
          {
            link: "/paymaster/api/webhookapi",
            text: "Webhookapi",
          },
        ],
      },
      { link: "/paymaster/integration", text: "Integration" },
      { link: "/paymaster/methods", text: "Methods" },
    ],
  },
  {
    link: "/gasEstimations",
    text: "Gas Estimations",
    collapsed: true,
    items: [
      {
        link: "/gasEstimations/integration",
        text: "Integration",
      },
      { link: "/gasEstimations/methods", text: "Methods" },
    ],
  },
  {
    link: "/modules",
    text: "Modules",
    collapsed: true,
    items: [
      { link: "/modules/ecdsa", text: "Ecdsa" },
      { link: "/modules/multichain", text: "Multichain" },
      {
        link: "/modules/sessions",
        text: "Sessions",
        items: [
          {
            link: "/modules/sessions/abiSessionValidationModule",
            text: "AbiSessionValidationModule",
          },
          {
            link: "/modules/sessions/DistributedSessions",
            text: "DistributedSessions",
          },
          {
            link: "/modules/sessions/BatchedSession",
            text: "BatchedSession",
          },
          {
            link: "/modules/sessions/sessionvalidationmodule",
            text: "Sessionvalidationmodule",
          },
        ],
      },
    ],
  },

  {
    link: "/dashboard",
    text: "Dashboard",
    collapsed: true,
    items: [
      { link: "/dashboard/paymaster", text: "Paymaster" },
      {
        link: "/dashboard/paymasterRules",
        text: "Paymaster Rules",
      },
      {
        link: "/dashboard/spendingLimits",
        text: "Spending Limits",
      },
      { link: "/dashboard/organization", text: "Organization" },
      { link: "/dashboard/apis", text: "APIs" },
    ],
  },
  { link: "/contracts", text: "Contracts" },
  { link: "/audits", text: "Audits" },
  {
    link: "/troubleshooting",
    text: "Troubleshooting",
    collapsed: true,
    items: [
      {
        link: "/troubleshooting/commonerrors",
        text: "Common errors",
      },
      { link: "/troubleshooting/polyfill", text: "Polyfill" },
    ],
  },

  { link: "/FAQ", text: "FAQ" },
  { link: "/supportedNetworks", text: "SupportedNetworks" },
];

export const addOnsSidebar = [
  {
    text: "Overview",
    link: "/addOns/overview",
  },
  {
    text: "Flat Rails",
    link: "/addOns/fiatRails",
  },
  {
    text: "Social Login Partners",
    link: "/addOns/socialLogins",
  },
  {
    text: "Fund Smart Accounts",
    link: "/addOns/fundSmartAccounts",
  },
  {
    text: "Wallet UI kit",
    link: "/addOns/walletUiKit",
  },
  {
    text: "Unity SDK",
    link: "/addOns/unitySDK",
  },
  {
    text: "Cross Chain Swaps",
    link: "/addOns/crosschain",
  },
]

export default defineConfig({
  theme: {
    accentColor: "#FF4E17",
  },
  ogImageUrl:
    "https://vocs.dev/api/og?logo=%logo&title=%title&description=%description",
  logoUrl: "/logo.svg",
  description:
    "Biconomy is the world's most popular account abstraction infrastructure platform",
  title: "Biconomy",
  titleTemplate: "%s | Biconomy Docs",
  rootDir: "./docs",
  editLink: {
    pattern:
      "https://github.com/bcnmy/documentation/edit/develop/docs/pages/:path",
    text: "Edit on GitHub",
  },
  sidebar: {
    "/": defaultSidebar,
    "/addOns": addOnsSidebar
  },
  topNav: [
    { text: 'SDKs', link: '/quickstart-react'},
    { text: 'Dashboard', link: 'https://dashboard.biconomy.io/' },
    { text: 'Add Ons', link: '/addOns/overview', match: "/addOns" },
    { text: 'Ask a question', link: 'https://github.com/orgs/bcnmy/discussions/categories/q-a' },
    { text: 'Blog', link: 'https://www.biconomy.io/blog' },
  ],
  socials: [
    {
      icon: 'discord',
      link: 'https://discord.com/invite/biconomy',
    },
    {
      icon: 'github',
      link: 'https://github.com/bcnmy/docs',
    },
    {
      icon: 'warpcast',
      link: 'https://warpcast.com/biconomy',
    },
    {
      icon: 'x',
      link: 'https://x.com/biconomy',
    },
  ],
  vite: {
    define: {
      "process.env": {
        GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
        PAYMASTER_TOKENS_GOOGLE_SHEET_ID:
          process.env.PAYMASTER_TOKENS_GOOGLE_SHEET_ID,
      },
    },
  },
});
