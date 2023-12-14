import { useState } from 'react'
import { decode } from '@/lib/wld'
import ContractAbi from '@/abi/Contract.abi'
import { ConnectKitButton } from 'connectkit'
import { IDKitWidget, ISuccessResult } from '@worldcoin/idkit'
import { useAccount, useContractWrite } from 'wagmi'

export default function Home() {
	const { address } = useAccount()
	const [proof, setProof] = useState<ISuccessResult | null>(null)

	const { write } = useContractWrite({
		address: process.env.NEXT_PUBLIC_CONTRACT_ADDR as `0x${string}`,
		abi: ContractAbi,
		functionName: 'verifyAndExecute',
		args: [
			address!,
			decode<bigint>('uint256', proof?.merkle_root as `0x${string}`),
			decode<bigint>('uint256', proof?.nullifier_hash as `0x${string}`),
			decode<[bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint]>('uint256[8]', proof?.proof as `0x${string}`),
		],
	})

	return (
		<main>
			{address ? (
				proof ? (
					<button onClick={() => write()}>submit tx</button>
				) : (
					<IDKitWidget
						signal={address}
						action="your-action"
						onSuccess={setProof}
						app_id={process.env.NEXT_PUBLIC_APP_ID as `app_${string}`}
					>
						{({ open }) => <button onClick={open}>verify with world id</button>}
					</IDKitWidget>
				)
			) : (
				<ConnectKitButton />
			)}
		</main>
	)
}
