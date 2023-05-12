import { defaultAbiCoder as abi } from 'ethers/lib/utils'

export const decode = <T>(type: string, encodedString: string): T => {
	return abi.decode([type], encodedString)[0]
}
