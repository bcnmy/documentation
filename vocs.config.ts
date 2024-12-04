import { defineConfig } from "vocs";
import { config } from "dotenv";

config();

export const smartAccountsV2Sidebar = [
	{ link: "/smartAccountsV2/overview", text: "Overview" },
	{ link: "/smartAccountsV2/quickstart-react", text: "Quickstart: React" },
	{ link: "/smartAccountsV2/quickstart", text: "Quickstart: Core SDK" },
	{
		link: "/smartAccountsV2/react",
		text: "React",
		collapsed: true,
		items: [
			{
				link: "/smartAccountsV2/react/BiconomyProvider",
				text: "BiconomyProvider",
			},
			{
				link: "/smartAccountsV2/react/useBatchSession",
				text: "UseBatchSession",
			},
			{
				link: "/smartAccountsV2/react/useCreateBatchSession",
				text: "UseCreateBatchSession",
			},
			{
				link: "/smartAccountsV2/react/useCreateSession",
				text: "UseCreateSession",
			},
			{
				link: "/smartAccountsV2/react/useDeploySmartAccount",
				text: "UseDeploySmartAccount",
			},
			{ link: "/smartAccountsV2/react/useGasEstimate", text: "UseGasEstimate" },
			{
				link: "/smartAccountsV2/react/useSendGasTokenTransaction",
				text: "UseSendGasTokenTransaction",
			},
			{
				link: "/smartAccountsV2/react/useSendSponsoredTransaction",
				text: "UseSendSponsoredTransaction",
			},
			{
				link: "/smartAccountsV2/react/useSendTransaction",
				text: "UseSendTransaction",
			},
			{
				link: "/smartAccountsV2/react/useSendWithdrawals",
				text: "UseSendWithdrawals",
			},
			{ link: "/smartAccountsV2/react/useSession", text: "UseSession" },
			{
				link: "/smartAccountsV2/react/useSmartAccount",
				text: "UseSmartAccount",
			},
			{ link: "/smartAccountsV2/react/useTokenFees", text: "UseTokenFees" },
			{ link: "/smartAccountsV2/react/useUserOpWait", text: "UseUserOpWait" },
		],
	},
	{
		link: "/smartAccountsV2/tutorials",
		text: "Tutorials",
		collapsed: true,
		items: [
			{
				link: "/smartAccountsV2/tutorials/sendSimpleTransaction",
				text: "Send a simple transaction",
			},
			{
				link: "/smartAccountsV2/tutorials/sendTransactionsBatch",
				text: "Send transactions batch",
			},
			{
				link: "/smartAccountsV2/tutorials/sendGasless",
				text: "Send a gasless transaction",
			},
			{
				link: "/smartAccountsV2/tutorials/payERC20Token",
				text: "Pay gas in ERC20 token",
			},
			{
				link: "/smartAccountsV2/tutorials/parallelUserOps",
				text: "Send parallel userOps",
			},
			{
				link: "/smartAccountsV2/tutorials/sessions",
				text: "Sessions",
				items: [
					{
						link: "/smartAccountsV2/tutorials/sessions/createSession",
						text: "Create Session",
					},
					{
						link: "/smartAccountsV2/tutorials/sessions/useSession",
						text: "Use Session",
					},
					{
						link: "/smartAccountsV2/tutorials/sessions/createBatchSession",
						text: "Create Batch Session",
					},
					{
						link: "/smartAccountsV2/tutorials/sessions/useBatchSession",
						text: "Use Batch Session",
					},
					{
						link: "/smartAccountsV2/tutorials/sessions/customSessionStorage",
						text: "Custom Session Storage",
					},
				],
			},
			{
				link: "/smartAccountsV2/tutorials/customValidationModule",
				text: "Custom Validation Module",
			},
			{
				link: "/smartAccountsV2/tutorials/utils",
				text: "Utils",
				items: [
					{
						link: "/smartAccountsV2/tutorials/utils/offsetGasValues",
						text: "Offset Gas Values",
					},
					{
						link: "/smartAccountsV2/tutorials/utils/transferOwnership",
						text: "Transfer Ownership",
					},
				],
			},
			{
				link: "/smartAccountsV2/tutorials/apiIntegration",
				text: "API Integration",
				collapsed: true,
				items: [
					{
						link: "/smartAccountsV2/tutorials/apiIntegration/userSponsored",
						text: "User sponsored",
					},
					{
						link: "/smartAccountsV2/tutorials/apiIntegration/paymasterSponsored",
						text: "Paymaster Sponsored",
					},
					{
						link: "/smartAccountsV2/tutorials/apiIntegration/paymasterERC20",
						text: "Paymaster ERC20",
					},

					{
						link: "/smartAccountsV2/tutorials/apiIntegration/signUserOperation",
						text: "Sign userOp",
					},
				],
			},
			{ link: "/smartAccountsV2/tutorials/v4Migration", text: "V4 Migration" },
			{
				text: "Migrate from stackUp",
				link: "/smartAccountsV2/tutorials/migrate",
			},
		],
	},
	{
		link: "/smartAccountsV2/account",
		text: "Smart Account",
		collapsed: true,
		items: [
			{ link: "/smartAccountsV2/account/integration", text: "Integration" },
			{ link: "/smartAccountsV2/account/methods", text: "Methods" },
			{
				link: "/smartAccountsV2/account/signers",
				text: "Signers",
				items: [
					{
						link: "/smartAccountsV2/account/signers/eoa",
						text: "Eoa",
						items: [
							{
								link: "/smartAccountsV2/account/signers/eoa/ethers",
								text: "Ethers",
							},
							{
								link: "/smartAccountsV2/account/signers/eoa/viem",
								text: "Viem",
							},
							{
								link: "/smartAccountsV2/account/signers/eoa/wagmi",
								text: "Wagmi",
							},
						],
					},
					{ link: "/smartAccountsV2/account/signers/capsule", text: "Capsule" },
					{ link: "/smartAccountsV2/account/signers/dfns", text: "Dfns" },
					{ link: "/smartAccountsV2/account/signers/dynamic", text: "Dynamic" },
					{ link: "/smartAccountsV2/account/signers/magic", text: "Magic" },
					{
						link: "/smartAccountsV2/account/signers/particle",
						text: "Particle",
					},
					{
						link: "/smartAccountsV2/account/signers/passport",
						text: "Passport",
					},
					{ link: "/smartAccountsV2/account/signers/privy", text: "Privy" },
					{ link: "/account/signers/turnkey", text: "Turnkey" },
					{
						link: "/smartAccountsV2/account/signers/web3auth",
						text: "Web3auth",
					},
				],
			},
			{
				link: "/smartAccountsV2/account/fiatonramp",
				text: "Enable Fiat On-Ramp",
			},
		],
	},
	{
		link: "/smartAccountsV2/bundler",
		text: "Bundler",
		collapsed: true,
		items: [
			{
				link: "/smartAccountsV2/bundler/api",
				text: "Api",
				items: [
					{ link: "/smartAccountsV2/bundler/api/explorer", text: "Explorer" },

					{
						link: "/smartAccountsV2/bundler/api/estimate-useroperation-gas",
						text: "eth_estimateUserOperationGas",
					},
					{
						link: "/smartAccountsV2/bundler/api/send-UserOperation",
						text: "eth_sendUserOperation",
					},
					{
						link: "/smartAccountsV2/bundler/api/get-useroperation-receipt",
						text: "eth_getUserOperationReceipt",
					},
					{
						link: "/smartAccountsV2/bundler/api/get-useroperation-by-hash",
						text: "eth_getUserOperationByHash",
					},
					{ link: "/smartAccountsV2/bundler/api/chainId", text: "eth_chainId" },
					{
						link: "/smartAccountsV2/bundler/api/supported-EntryPoints",
						text: "eth_supportedEntryPoints",
					},
					{
						link: "/smartAccountsV2/bundler/api/get-gas-fee-values",
						text: "biconomy_getGasFeeValues",
					},
					{
						link: "/smartAccountsV2/bundler/api/get-useroperation-status",
						text: "biconomy_getUserOperationStatus",
					},
				],
			},
			{
				link: "/smartAccountsV2/bundler/bundlermethods",
				text: "Bundler Methods",
			},
			{ link: "/smartAccountsV2/bundler/integration", text: "Integration" },
			{ link: "/smartAccountsV2/bundler/usingViem", text: "Using Viem" },
		],
	},
	{
		link: "/smartAccountsV2/paymaster",
		text: "Paymaster",
		collapsed: true,
		items: [
			{
				link: "/smartAccountsV2/paymaster/7677",
				text: "7677",
				items: [
					{
						link: "/smartAccountsV2/paymaster/7677/pm_getPaymasterData",
						text: "pm_getPaymasterData",
					},
					{
						link: "/smartAccountsV2/paymaster/7677/pm_getPaymasterStubData",
						text: "pm_getPaymasterStubData",
					},
					// { link: "/paymaster/7677/usingViem", text: "Using Viem" },
				],
			},
			{
				link: "/smartAccountsV2/paymaster/api",
				text: "Api",
				items: [
					{
						link: "/smartAccountsV2/paymaster/api/explorer",
						text: "Explorer",
					},
					{
						link: "/smartAccountsV2/paymaster/api/get-fee-quotes",
						text: "pm_getFeeQuoteOrData",
					},
					{
						link: "/smartAccountsV2/paymaster/api/sponsor-useroperation",
						text: "pm_sponsorUserOperation",
					},
				],
			},
			{ link: "/smartAccountsV2/paymaster/integration", text: "Integration" },
			{ link: "/smartAccountsV2/paymaster/methods", text: "Methods" },
		],
	},
	{
		link: "/smartAccountsV2/gasEstimations",
		text: "Gas Estimations",
		collapsed: true,
		items: [
			{
				link: "/smartAccountsV2/gasEstimations/integration",
				text: "Integration",
			},
			{ link: "/smartAccountsV2/gasEstimations/methods", text: "Methods" },
		],
	},
	{
		link: "/smartAccountsV2/modules",
		text: "Modules",
		collapsed: true,
		items: [
			{ link: "/smartAccountsV2/modules/ecdsa", text: "Ecdsa" },
			{ link: "/smartAccountsV2/modules/multichain", text: "Multichain" },
			{
				link: "/smartAccountsV2/modules/sessions",
				text: "Sessions",
				items: [
					{
						link: "/smartAccountsV2/modules/sessions/abiSessionValidationModule",
						text: "AbiSessionValidationModule",
					},
					{
						link: "/smartAccountsV2/modules/sessions/BatchedSession",
						text: "BatchedSession",
					},
					{
						link: "/smartAccountsV2/modules/sessions/sessionvalidationmodule",
						text: "Sessionvalidationmodule",
					},
				],
			},
		],
	},

	{ link: "/smartAccountsV2/contracts", text: "Contracts" },
	{ link: "/smartAccountsV2/audits", text: "Audits" },
	{
		link: "/smartAccountsV2/troubleshooting",
		text: "Troubleshooting",
		collapsed: true,
		items: [
			{
				link: "/smartAccountsV2/troubleshooting/commonerrors",
				text: "Common errors",
			},
			{ link: "/smartAccountsV2/troubleshooting/polyfill", text: "Polyfill" },
		],
	},

	{ link: "/smartAccountsV2/FAQ", text: "FAQ" },
	{ link: "/smartAccountsV2/supportedNetworks", text: "SupportedNetworks" },
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
	{
		text: "RAAS Integration",
		link: "/addOns/raasProvider",
	},
];

export const defaultSidebar = [
	{
		text: "Overview",
		link: "/overview",
	},
	{
		text: "Quickstart",
		link: "/quickstart",
	},
	{
		text: "Supported Networks",
		link: "/supportedNetworks",
	},
	{
		text: "Tutorials",
		items: [
			{
				text: "How to send gasless transactions",
				link: "/tutorials/gasless",
			},
			{
				text: "How to send batch transactions",
				link: "/tutorials/batch",
			},
			{
				text: "How to use smart sessions",
				link: "/tutorials/smart-sessions",
			},
			{
				text: "Signers",
				items: [
					{
						text: "How to use a Turnkey signer",
						link: "/tutorials/signers/turnkey",
					},
					{
						text: "How to use a Dynamic signer",
						link: "/tutorials/signers/dynamic",
					},
					{
						text: "How to use a Capsule signer",
						link: "/tutorials/signers/capsule",
					},
					{
						text: "How to use a Passport signer",
						link: "/tutorials/signers/passport",
					},
					{
						text: "How to use a DFNS signer",
						link: "/tutorials/signers/dfns",
					},
					{
						text: "How to use a Particle signer",
						link: "/tutorials/signers/particle",
					},
					{
						text: "How to use a Magic signer",
						link: "/tutorials/signers/magic",
					},
					{
						text: "How to use a Web3Auth signer",
						link: "/tutorials/signers/web3auth",
					},
				],
			},
		],
	},
	{
		text: "Nexus Client",
		items: [
			{
				text: "Integration",
				link: "/nexus-client",
			},
			{
				text: "Methods",
				link: "/nexus-client/methods",
			},
		],
	},
	{
		text: "Contracts & Audits",
		link: "/contractsAndAudits",
	},
	{
		link: "/dashboard",
		text: "Dashboard",
		items: [
			{ link: "/dashboard/paymaster", text: "Paymaster & Gas Tank Setup" },
			{
				link: "/dashboard/paymasterRules",
				text: "Configuring Paymaster Rules",
			},
			{
				link: "/dashboard/spendingLimits",
				text: "Spending Limits & Notifications",
			},
			{ link: "/dashboard/organization", text: "Organization Management" },
			{ link: "/dashboard/apis", text: "API Endpoints & Webhooks" },
		],
	},
	{
		text: "ERC-7579 Modules",
		link: "/modules",
		collapsed: false,
		items: [
			{
				link: "/modules/validators",
				text: "Validators",
				collapsed: false,
				items: [
					{
						link: "/modules/validators/k1Validator",
						text: "K1 Validator",
						collapsed: false,
						items: [
							{
								link: "/modules/validators/k1Validator/tutorial",
								text: "Tutorial",
							}
						],
					},
					{
						link: "/modules/validators/smartSessions",
						text: "Smart Sessions",
						collapsed: false,
						items: [
							{
								link: "/modules/validators/smartSessions/grantingSmartSessions",
								text: "Granting Smart Sessions",
							},
							{
								link: "/modules/validators/smartSessions/usingSmartSessions",
								text: "Using Smart Sessions",
							},
							{
								link: "/modules/validators/smartSessions/policies",
								text: "Policies",
							},
							{
								link: "/modules/validators/smartSessions/types",
								text: "Types",
							},
						],
					},
					{
						link: "/modules/validators/ownableValidator",
						text: "Ownables (Multisig)",
					},
					{
						link: "/modules/validators/passkeyValidator",
						text: "Passkey Validator",
						collapsed: false,
						items: [
							{
								link: "/modules/validators/passkeyValidator/tutorial",
								text: "Tutorial",
							}
						],
					},
				],
			},
		],
	},
	{
		text: "Nexus Smart Account",
		link: "/smart-account",
		items: [
			{
				text: "ERC-7579 Methods",
				link: "/smart-account/7579methods",
			},
		],
	},
	{
		text: "Infra",
		items: [
			{
				text: "Bundler",
				link: "/infra/bundler/integration",
			},
			{
				text: "Paymaster",
				link: "/infra/paymaster/integration",
			},
		],
	},
];

export default defineConfig({
	theme: {
		accentColor: "#FF4E17",
	},
	iconUrl: "/favicon.png",
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
		"/addOns": addOnsSidebar,
		"/smartAccountsV2": smartAccountsV2Sidebar,
	},
	topNav: [
		{ text: "Docs", link: "/overview", match: "/overview" },
		{
			text: "Previous",
			items: [
				{
					text: "SDK v4 (Smart Accounts V2)",
					link: "/smartAccountsV2/quickstart-react",
				},
				{ text: "Legacy docs", link: "https://legacy-docs.biconomy.io/" },
			],
		},
		{ text: "Add Ons", link: "/addOns/overview", match: "/addOns" },
		{ text: "Dashboard", link: "https://dashboard.biconomy.io/" },
		{
			text: "Ask a question",
			link: "https://github.com/orgs/bcnmy/discussions/categories/q-a",
		},
		{ text: "Blog", link: "https://www.biconomy.io/blog" },
	],
	socials: [
		{
			icon: "discord",
			link: "https://discord.com/invite/biconomy",
		},
		{
			icon: "github",
			link: "https://github.com/bcnmy/documentation",
		},
		{
			icon: "warpcast",
			link: "https://warpcast.com/biconomy",
		},
		{
			icon: "x",
			link: "https://x.com/biconomy",
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
