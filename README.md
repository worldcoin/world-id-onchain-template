# World ID On-Chain Template

Template repository for a World ID On-Chain Integration.

## Local Development

### Prerequisites

Create a staging on-chain app in the [Worldcoin Developer Portal](https://developer.worldcoin.org).

Ensure you have installed [Foundry](https://book.getfoundry.sh/getting-started/installation), [NodeJS](https://nodejs.org/en/download), and [pnpm](https://pnpm.io/installation).

### Local Testnet Setup

Start a local node forked from Optimism Sepolia, replacing `$YOUR_API_KEY` with your Alchemy API key:

```bash
# leave this running in the background
anvil -f https://opt-sepolia.g.alchemy.com/v2/$YOUR_API_KEY
```

In another shell, deploy the contract, replacing `$WORLD_ID_ROUTER` with the [World ID Router address](https://docs.worldcoin.org/reference/address-book) for your selected chain, `$NEXT_PUBLIC_APP_ID` with the app ID as configured in the [Worldcoin Developer Portal](https://developer.worldcoin.org), and `$NEXT_PUBLIC_ACTION` with the action ID as configured in the Worldcoin Developer Portal:

```bash
cd contracts
forge create --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 src/Contract.sol:Contract --constructor-args $WORLD_ID_ROUTER $NEXT_PUBLIC_APP_ID $NEXT_PUBLIC_ACTION
```

Note the `Deployed to:` address from the output.

### Local Web Setup

In a new shell, install project dependencies:

```bash
pnpm i
```

Set up your environment variables in the `.env` file. You will need to set the following variables:
- `NEXT_PUBLIC_APP_ID`: The app ID as configured in the [Worldcoin Developer Portal](https://developer.worldcoin.org).
- `NEXT_PUBLIC_ACTION`: The action ID as configured in the Worldcoin Developer Portal.
- `NEXT_PUBLIC_WALLETCONNECT_ID`: Your WalletConnect ID.
- `NEXT_PUBLIC_CONTRACT_ADDRESS`: The address of the contract deployed in the previous step.

Start the development server:

```bash
pnpm dev
```

The Contract ABI will be automatically re-generated and saved to `src/abi/ContractAbi.json` on each run of `pnpm dev`.

### Iterating

After making changes to the contract, you should:
- re-run the `forge create` command from above
- replace the `NEXT_PUBLIC_CONTRACT_ADDRESS` environment variable with the new contract address
- if your contract ABI has changed, restart the local web server

### Testing

You'll need to import the private keys on the local testnet into your wallet used for local development. The default development seed phrase is `test test test test test test test test test test test junk`.

> [!CAUTION]
> This is only for local development. Do not use this seed phrase on mainnet or any public testnet.

When connecting your wallet to the local development environment, you will be prompted to add the network to your wallet.

Use the [Worldcoin Simulator](https://simulator.worldcoin.org) in place of World App to scan the IDKit QR codes and generate the zero-knowledge proofs.