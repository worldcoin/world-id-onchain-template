import abi from '@/abi/ContractAbi.json'
import { ConnectKitButton } from 'connectkit'
import { IDKitWidget, ISuccessResult, useIDKit } from '@worldcoin/idkit'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, type BaseError } from 'wagmi'
import { decodeAbiParameters, parseAbiParameters } from 'viem'
import { useState } from 'react'

export default function Home() {
	const account = useAccount()
	const { setOpen } = useIDKit()
	const [done, setDone] = useState(false)
	const { data: hash, isPending, error, writeContractAsync } = useWriteContract()
	const { isLoading: isConfirming, isSuccess: isConfirmed } = 
		useWaitForTransactionReceipt({
			hash,
		}) 

	const submitTx = async (proof: ISuccessResult) => {
		try {
			await writeContractAsync({
				address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
				account: account.address!,
				abi,
				functionName: 'verifyAndExecute',
				args: [
					account.address!,
					BigInt(proof!.merkle_root),
					BigInt(proof!.nullifier_hash),
					decodeAbiParameters(
						parseAbiParameters('uint256[8]'),
						proof!.proof as `0x${string}`
					)[0],
				],
			})
			setDone(true)
		} catch (error) {throw new Error((error as BaseError).shortMessage)}
	}

	return (
		<div>
			<ConnectKitButton/>
			{account.isConnected && (<>
				<IDKitWidget
					app_id={process.env.NEXT_PUBLIC_APP_ID as `app_${string}`}
					action={process.env.NEXT_PUBLIC_ACTION as string}
					signal={account.address}
					onSuccess={submitTx}
					autoClose
				/>

				{!done && <button onClick={() => setOpen(true)}>{!hash && (isPending ? "Pending, please check your wallet..." : "Verify and Execute Transaction")}</button>}

				{hash && <p>Transaction Hash: {hash}</p>}
				{isConfirming && <p>Waiting for confirmation...</p>} 
				{isConfirmed && <p>Transaction confirmed.</p>}
				{error && <p>Error: {(error as BaseError).message}</p>}
			</>)}
		</div>
	)
}