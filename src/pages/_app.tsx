import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { WagmiProvider } from 'wagmi'
import { ConnectKitProvider } from 'connectkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@/lib/config'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<ConnectKitProvider>
					<Component {...pageProps} />
				</ConnectKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	)
}
