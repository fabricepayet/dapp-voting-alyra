# Dapp Voting project

## Objective

The objective was to develop a dApp for the voting contract provided by Alyra. The dapp must take over the complete journey of the contract and must provide differents interfaces for several types of profiles (owner, voters, non registered user).

## Realization

### Contract

I added as few modifications as possible in the contract:  

- add natspecs for documentation
- remove the genesis proposal to avoid side effects
- remove the modifier onlyVoters in the function getOneProposal to allow unregistered users to see the description of the proposal (as indicated in the instructions of the exercice)
- prevent a DoS service by adding a check of the number of proposals in the addProposal function


```solidity
require(proposalsArray.length < 1000, "Too many proposals");
```

### Front end

I developed my interfaces in TypeScript and I replaced the default create-react-app provided [React Truffle Box](<https://trufflesuite.com/boxes/react/>) by [NextJs](<https://nextjs.org/>). I used [TailwindCSS](<https://tailwindcss.com/>) for the styling of my components.

I recorded a short video presenting the differents interfaces [[link to the video]](<https://www.loom.com/share/e49f2954a29149f79a002d32d158db14>) and deploy the dApp to Vercel [[link]](<https://dapp-voting-alyra.vercel.app>)

### Deployment

I deployed the dApp on the Goerli network. Here the deployment logs:

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

   Replacing 'Voting'
   ------------------
   > transaction hash:    0x9e6814e47a580040965bb22868d477bf3943593da0ce3d0a27a7a4f0a2d6ecd2
   > Blocks: 1            Seconds: 13
   > contract address:    0x206b7a9FfaBa7B53F59B9a374ad29d87b915043f
   > block number:        7998030
   > block timestamp:     1669106664
   > account:             0x876476aF52Bd7C2184fFf2dE4543356E4Baa56cA
   > balance:             0.312871882377055147
   > gas used:            1944739 (0x1daca3)
   > gas price:           68.155648605 gwei
   > value sent:          0 ETH
   > total cost:          0.132544947912439095 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 7998031)
   > confirmation number: 2 (block: 7998032)
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.132544947912439095 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.132544947912439095 ETH

```
