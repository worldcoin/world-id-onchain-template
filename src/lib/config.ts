import { createConfig, http } from 'wagmi'
import { type Chain } from 'viem'
import { fallback, injected, unstable_connector } from '@wagmi/core';
import { getDefaultConfig } from 'connectkit';

export const chain: Chain = {
	id: 11155420,
	name: "Optimism Sepolia Anvil Fork",
	nativeCurrency: {
        decimals: 18,
        name: "Optimism Sepolia Anvil Fork Ether",
        symbol: "SETH",
	},
	rpcUrls: {
	    default: { http: ["http://127.0.0.1:8545/"] },
	},
	testnet: true,
};

export const config = createConfig(
    getDefaultConfig({
        chains: [chain],
        transports: {
            [chain.id]: fallback([
                unstable_connector(injected),
                http(chain.rpcUrls.default.http[0]),
            ])
        },
        walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID!,
        appName: "World ID Onchain Template",
    }),
)