import '@/styles/globals.css'
import { APP_NAME } from '@/lib/consts'
import type { AppProps } from 'next/app'
import { WagmiConfig, createConfig } from 'wagmi'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'

const config = createConfig(
	getDefaultConfig({
		appName: APP_NAME,
		infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
        walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID!,
	})
)

export default function App({ Component, pageProps }: AppProps) {
	return (
		<WagmiConfig config={config}>
			<ConnectKitProvider>
				<Component {...pageProps} />
			</ConnectKitProvider>
		</WagmiConfig>
	)
}
