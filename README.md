# Dapp Voting project

## Objective

The objective was to develop a dApp for the voting contract provided by Alyra. The dapp must take over the complete journey of the contract and must provide differents interfaces for several types of profiles (owner, voters, non registered user).

## Realization

### Contract

I added as few modifications as possible in the contract, just adding Natspec for documentation, removing the genesis proposal to avoid side effects and prevent a DoS service in the addProposal function by adding a require:

```solidity
require(proposalsArray.length < 1000, "Too many proposals");
```

### Front end

I replace the default create-react-app provided [React Truffle Box](<https://trufflesuite.com/boxes/react/>) by NextJS and to develop with TypeScript.

I recorded a short video presenting the differents interfaces [link to the video (FR)](<https://>)

### Deployment

I deployed the dApp on the goerli network:

````bash
truffle migrate --network goerli

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


Starting migrations...
======================
> Network name:    'goerli'
> Network id:      5
> Block gas limit: 30000000 (0x1c9c380)


1_deploy_voting.js
==================

   Deploying 'Voting'
   ------------------
   > transaction hash:    0x6f43373c8b7559a36eea39b29dd45176c3868ecddcf05245524203f22212e79d
   > Blocks: 1            Seconds: 9
   > contract address:    0x81e59565B1337B4202b687bA219D955642c0c25e
   > block number:        7996007
   > block timestamp:     1669077216
   > account:             0x876476aF52Bd7C2184fFf2dE4543356E4Baa56cA
   > balance:             0.447381509556330014
   > gas used:            1975247 (0x1e23cf)
   > gas price:           3.279654946 gwei
   > value sent:          0 ETH
   > total cost:          0.006478128593121662 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 7996008)
   > confirmation number: 2 (block: 7996009)
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.006478128593121662 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.006478128593121662 ETH

```
