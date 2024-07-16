import { defineConfig } from 'vocs'

export const defaultSidebar = [
  {
    text: "Get Started",
    link: "/getting-started",
  },
  {
    text: "React",
    link: "/react",
    collapsed: true,
    items: [
      {
        text: "Create a Session",
        link: "/react/useCreateSession",
      },
      {
        text: "Use a Session",
        link: "/react/useSession",
      },
      {
        text: "Use a Batch Session",
        link: "/react/useBatchSession",
      },
      {
        text: "Create a Batch Session",
        link: "/react/useCreateBatchSession",
      },
      {
        text: "Gas Estimate",
        link: "/react/useGasEstimate",
      },
      {
        text: "Send a Gas Token Transaction",
        link: "/react/useSendGasTokenTransaction",
      },
      {
        text: "Send a Sponsored Transaction",
        link: "/react/useSendSponsoredTransaction",
      },
      {
        text: "Send a Transaction",
        link: "/react/useSendTransaction",
      },
      {
        text: "Send Withdrawals",
        link: "/react/useSendWithdrawals",
      },
      {
        text: "Use a SmartAccount",
        link: "/react/useSmartAccount",
      },
      {
        text: "Get Token Fees",
        link: "/react/useTokenFees",
      },
      {
        text: "UserOp Wait",
        link: "/react/useUserOpWait",
      },
      {
        text: "Biconomy Provider",
        link: "/react/BiconomyProvider",
      },
    ]
  }
]

export default defineConfig({
  description: "Biconomy is the world's most popular account abstraction infrastructure platform",
  title: 'Biconomy',
  titleTemplate: "%s | Biconomy Docs",
  rootDir: './docs',
  editLink: {
    pattern: "https://github.com/bcnmy/documentation/edit/develop/docs/pages/:path",
    text: "Edit on GitHub",
  },
  sidebar: defaultSidebar
})
