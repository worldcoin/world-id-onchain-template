export default [
	{
		inputs: [
			{
				internalType: 'contract IWorldID',
				name: '_worldId',
				type: 'address',
			},
			{
				internalType: 'string',
				name: '_appId',
				type: 'string',
			},
			{
				internalType: 'string',
				name: '_actionId',
				type: 'string',
			},
		],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		inputs: [],
		name: 'InvalidNullifier',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'signal',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'root',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'nullifierHash',
				type: 'uint256',
			},
			{
				internalType: 'uint256[8]',
				name: 'proof',
				type: 'uint256[8]',
			},
		],
		name: 'verifyAndExecute',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
] as const
