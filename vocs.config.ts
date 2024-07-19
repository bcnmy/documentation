import { defineConfig } from "vocs";

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
    items: [
      {
        link: "/tutorials/apiIntegration",
        text: "Api Integration",
        collapsed: true,
        items: [
          {
            link: "/tutorials/apiIntegration/paymasterERC20",
            text: "PaymasterERC20",
          },
          {
            link: "/tutorials/apiIntegration/paymasterSponsored",
            text: "PaymasterSponsored",
          },
          {
            link: "/tutorials/apiIntegration/signUserOperation",
            text: "SignUserOperation",
          },
          {
            link: "/tutorials/apiIntegration/userSponsored",
            text: "UserSponsored",
          },
        ],
      },
      {
        link: "/tutorials/customValidationModule",
        text: "Custom Validation Module",
      },
      {
        link: "/tutorials/parallelUserOps",
        text: "ParallelUserOps",
      },
      {
        link: "/tutorials/payERC20Token",
        text: "PayERC20Token",
      },
      { link: "/tutorials/sendGasless", text: "SendGasless" },
      {
        link: "/tutorials/sendSimpleTransaction",
        text: "SendSimpleTransaction",
      },
      {
        link: "/tutorials/sendTransactionsBatch",
        text: "SendTransactionsBatch",
      },
      {
        link: "/tutorials/sessions",
        text: "Sessions",
        collapsed: true,
        items: [
          {
            link: "/tutorials/sessions/createBatchSession",
            text: "CreateBatchSession",
          },
          {
            link: "/tutorials/sessions/createSession",
            text: "CreateSession",
          },
          {
            link: "/tutorials/sessions/customSessionStorage",
            text: "CustomSessionStorage",
          },
          {
            link: "/tutorials/sessions/useBatchSession",
            text: "UseBatchSession",
          },
          {
            link: "/tutorials/sessions/useSession",
            text: "UseSession",
          },
        ],
      },
      {
        link: "/tutorials/utils",
        text: "Utils",
        collapsed: true,
        items: [
          {
            link: "/tutorials/utils/offsetGasValues",
            text: "OffsetGasValues",
          },
          {
            link: "/tutorials/utils/transferOwnership",
            text: "Transfer Ownership",
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
      { link: "/account/fiatonramp", text: "Enable Fiat On-Ramp" },
      { link: "/account/integration", text: "Integration" },
      { link: "/account/methods", text: "Methods" },
      {
        link: "/account/signers",
        text: "Signers",
        collapsed: true,
        items: [
          { link: "/account/signers/capsule", text: "Capsule" },
          {
            link: "/account/signers/description",
            text: "Description",
          },
          { link: "/account/signers/dfns", text: "Dfns" },
          { link: "/account/signers/dynamic", text: "Dynamic" },
          {
            link: "/account/signers/eoa",
            text: "Eoa",
            collapsed: true,
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
      {
        link: "/account/smartAccountv1",
        text: "SmartAccountv1",
        collapsed: true,
        items: [
          {
            link: "/account/smartAccountv1/methods",
            text: "Methods",
          },
          {
            link: "/account/smartAccountv1/quickstartv1",
            text: "Quickstartv1",
          },
          {
            link: "/account/smartAccountv1/tutorials",
            text: "Tutorials",
            collapsed: true,
            items: [
              {
                link: "/account/smartAccountv1/tutorials/React_vite",
                text: "React_vite",
                collapsed: true,
                items: [
                  {
                    link: "/account/smartAccountv1/tutorials/React_vite/_category_.json",
                    text: "_category_.json",
                  },
                  {
                    link: "/account/smartAccountv1/tutorials/React_vite/counter",
                    text: "Counter",
                  },
                  {
                    link: "/account/smartAccountv1/tutorials/React_vite/first-dapp",
                    text: "First dapp",
                  },
                  {
                    link: "/account/smartAccountv1/tutorials/React_vite/gasless-txn",
                    text: "Gasless txn",
                  },
                  {
                    link: "/account/smartAccountv1/tutorials/React_vite/initialize",
                    text: "Initialize",
                  },
                  {
                    link: "/account/smartAccountv1/tutorials/React_vite/register",
                    text: "Register",
                  },
                  {
                    link: "/account/smartAccountv1/tutorials/React_vite/sdk-integration",
                    text: "Sdk-integration",
                  },
                ],
              },
              {
                link: "/account/smartAccountv1/tutorials/V2Upgrade",
                text: "V2Upgrade",
              },
              {
                link: "/account/smartAccountv1/tutorials/nextjs",
                text: "Nextjs",
                collapsed: true,
                items: [
                  {
                    link: "/account/smartAccountv1/tutorials/nextjs/_category_.json",
                    text: "_category_.json",
                  },
                  {
                    link: "/account/smartAccountv1/tutorials/nextjs/dashboard",
                    text: "Dashboard",
                  },
                  {
                    link: "/account/smartAccountv1/tutorials/nextjs/gaslesstransaction",
                    text: "Gaslesstransaction",
                  },
                  {
                    link: "/account/smartAccountv1/tutorials/nextjs/initialize",
                    text: "Initialize",
                  },
                  {
                    link: "/account/smartAccountv1/tutorials/nextjs/introduction",
                    text: "Introduction",
                  },
                  {
                    link: "/account/smartAccountv1/tutorials/nextjs/nft",
                    text: "Nft",
                  },
                  {
                    link: "/account/smartAccountv1/tutorials/nextjs/sdkintegration",
                    text: "Sdkintegration",
                  },
                ],
              },
              {
                link: "/account/smartAccountv1/tutorials/nodejs",
                text: "Nodejs",
                collapsed: true,
                items: [
                  {
                    link: "/account/smartAccountv1/tutorials/nodejs/_category_.json",
                    text: "_category_.json",
                  },
                  {
                    link: "/account/smartAccountv1/tutorials/nodejs/batchingTransactions",
                    text: "Batching Transactions",
                  },
                  {
                    link: "/account/smartAccountv1/tutorials/nodejs/environmentsetup",
                    text: "Environment setup",
                  },
                  {
                    link: "/account/smartAccountv1/tutorials/nodejs/gaslessmint",
                    text: "Gaslessmint",
                  },
                  {
                    link: "/account/smartAccountv1/tutorials/nodejs/initializeaccount",
                    text: "Initializeaccount",
                  },
                  {
                    link: "/account/smartAccountv1/tutorials/nodejs/paywitherc20",
                    text: "Pay with erc20",
                  },
                ],
              },
            ],
          },
        ],
      },
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
        collapsed: true,
        items: [
          { link: "/bundler/api/chainId", text: "ChainId" },
          {
            link: "/bundler/api/estimate-useroperation-gas",
            text: "Estimate-useroperation-gas",
          },
          { link: "/bundler/api/explorer", text: "Explorer" },
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
        collapsed: true,
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
        collapsed: true,
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
      {
        link: "/modules/BatchedSession",
        text: "BatchedSession",
      },
      {
        link: "/modules/abiSessionValidationModule",
        text: "AbiSessionValidationModule",
      },
      { link: "/modules/ecdsa", text: "Ecdsa" },
      { link: "/modules/multichain", text: "Multichain" },
      {
        link: "/modules/sessionvalidationmodule",
        text: "Sessionvalidationmodule",
      },
    ],
  },

  {
    link: "/dashboard",
    text: "Dashboard",
    collapsed: true,
    items: [
      { link: "/dashboard/apis", text: "APIs" },
      { link: "/dashboard/organization", text: "Organization" },
      { link: "/dashboard/paymaster", text: "Paymaster" },
      {
        link: "/dashboard/paymasterRules",
        text: "Paymaster Rules",
      },
      {
        link: "/dashboard/spendingLimits",
        text: "Spending Limits",
      },
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
        link: "/troubleshooting/_category_.json",
        text: "_category_.json",
      },
      {
        link: "/troubleshooting/commonerrors",
        text: "Commonerrors",
      },
      { link: "/troubleshooting/polyfill", text: "Polyfill" },
    ],
  },

  { link: "/FAQ", text: "FAQ" },
  { link: "/supportedNetworks", text: "SupportedNetworks" },
];

export default defineConfig({
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
  sidebar: defaultSidebar,
});
