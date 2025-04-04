import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";

export const teaSepoliaTestnet = defineChain({
  id: 10218,
  name: "Tea Sepolia Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Tea Sepolia",
    symbol: "TEA",
  },
  rpcUrls: {
    default: {
      http: ["https://tea-sepolia.g.alchemy.com/public"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://sepolia.tea.xyz" },
  },
});

export const config = getDefaultConfig({
  appName: "Tea Sepolia Dapp",
  projectId: "YOUR_PROJECT_ID",
  chains: [teaSepoliaTestnet],
  ssr: true,
});
