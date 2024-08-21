import magicLogo from "../logos/magicLogo.jpg";
import particleLogo from "../logos/particleLogo.png"

export const loginButtons = [
  {
    id: "magic",
    icon: magicLogo,
    label: "Magic",
    dependencies: "magic-sdk",
    importData: `import { Magic } from "magic-sdk";`,
    initialization: `
      
// Initialize the Magic instance
export const magic = new Magic("YOUR_API_KEY", {
  network: {
    rpcUrl: "",
    chainId: 11155111, // or preferred chain
  },
});

      
const connect = async () => {
  try {
    await magic.wallet.connectWithUI();
    const web3Provider = new ethers.providers.Web3Provider(
      magic.rpcProvider,
      "any"
    );
      
    const config = {
      biconomyPaymasterApiKey: biconomyPaymasterApiKey, // <-- Get this from https://dashboard.biconomy.io/
      bundlerUrl: bundlerUrl,  // <-- Read about this at https://docs.biconomy.io/bundler
    }

    const smartWallet = await createSmartAccountClient({
      signer: web3Provider.getSigner(),
      biconomyPaymasterApiKey: config.biconomyPaymasterApiKey,
      bundlerUrl: config.bundlerUrl,
      rpcUrl: rpcUrl, // <-- Any public or custom RPC URL
      chainId: chainId, // <-- Chain ID of the network
    });
      
    const address = await smartAccount.getAccountAddress();
  } catch (error) {
    console.error(error);
  }
};
      `,
  },
  {
    id: "particle",
    icon: particleLogo,
    label: "Particle",
    dependencies: "@biconomy/particle-auth",
    importData: `import magic from "particle"`,
    initialization: `
      
// Initialize the Particle instance
const particle = new ParticleAuthModule.ParticleNetwork({
  projectId: "",
  clientKey: "",
  appId: "",
  wallet: {
    displayWalletEntry: true,
    defaultWalletEntryPosition: ParticleAuthModule.WalletEntryPosition.BR,
  },
});


const connect = async () => {
  try {
    const userInfo = await particle.auth.login();
    console.log("Logged in user:", userInfo);
    const particleProvider = new ParticleProvider(particle.auth);
    const web3Provider = new ethers.providers.Web3Provider(
      particleProvider,
      "any"
    );
      
    const smartAccount = await createSmartAccountClient({
      signer: web3Provider.getSigner() as LightSigner,
      bundlerUrl: "", // <-- Read about this at https://docs.biconomy.io/dashboard#bundler-url
      biconomyPaymasterApiKey: "", // <-- Read about at https://docs.biconomy.io/dashboard/paymaster
      rpcUrl: "" // <-- read about this at https://docs.biconomy.io/Account/methods#createsmartaccountclient
    });
      
    const address = await smartAccount.getAccountAddress();
  } catch (error) {
    console.error(error);
  }
};
      `,
  },
  {
    id: "dynamic",
    icon: magicLogo,
    label: "Dynamic",
    dependencies: "dynamic",
    importData: `import magic from "dynamic"`,
    initialization: `// Initialize the Dynamic instance`,
  },
  {
    id: "privy",
    icon: magicLogo,
    label: "Privy",
    dependencies: "@privy-io/react-auth",
    importData: `import magic from "privy"`,
    initialization: `// Initialize the Privy instance`,
  },
  {
    id: "dfns",
    icon: magicLogo,
    label: "DFNS",
    dependencies: "dfns",
    importData: `import magic from "dfns"`,
    initialization: `// Initialize the DFNS instance`,
  },
  {
    id: "capsule",
    icon: magicLogo,
    label: "Capsule",
    dependencies: "capsule",
    importData: `import magic from "capsule"`,
    initialization: `// Initialize the Capsule instance`,
  },
  {
    id: "turnkey",
    icon: magicLogo,
    label: "Turnkey",
    dependencies: "turnkey",
    importData: `import magic from "turnkey"`,
    initialization: `// Initialize the Turnkey instance`,
  },
  {
    id: "web3auth",
    icon: magicLogo,
    label: "Web3Auth",
    dependencies: "web3auth",
    importData: `import magic from "web3auth"`,
    initialization: `// Initialize the Web3Auth instance`,
  },
  {
    id: "ethers",
    icon: magicLogo,
    label: "Ethers",
    dependencies: "ethers",
    importData: `import magic from "ethers"`,
    initialization: `// Initialize the Ethers instance`,
  },
  {
    id: "viem",
    icon: magicLogo,
    label: "Viem",
    dependencies: "viem",
    importData: `import magic from "viem"`,
    initialization: `// Initialize the Viem instance`,
  },
  {
    id: "wagmi",
    icon: magicLogo,
    label: "Wagmi",
    dependencies: "wagmi",
    importData: `import magic from "wagmi"`,
    initialization: `// Initialize the Wagmi instance`,
  },
];

export const transactionButtons = [
  {
    id: "sponsored",
    icon: magicLogo,
    label: "Sponsored",
    dependencies: "sponsored",
    importData: `import sponsored from "sponsored"`,
    initialization: `// Initialize the Sponsored instance`,
  },
  {
    id: "erc20",
    icon: magicLogo,
    label: "ERC20",
    dependencies: "erc20",
    importData: `import erc20 from "erc20"`,
    initialization: `// Initialize the ERC20 instance`,
  },
  {
    id: "userPaid",
    icon: magicLogo,
    label: "User Paid",
    dependencies: "userPaid",
    importData: `import userPaid from "userPaid"`,
    initialization: `// Initialize the User Paid instance`,
  },
];

