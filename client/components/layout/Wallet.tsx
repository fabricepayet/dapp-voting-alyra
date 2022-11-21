import React from 'react';
import useEth from '../../hooks/useEth'
import { WalletIcon } from '@heroicons/react/24/solid'
import Utils from '../../utils';

const Wallet = () => {
  const { state: { accounts, web3 } } = useEth();

  const handleConnect = () => {
    if (!web3) return
    web3.eth.getAccounts()
  }

  if (!accounts || accounts.length === 0) {
    return (
      <button className="btn btn-secondary flex gap-2 items-center" onClick={handleConnect}>
        <WalletIcon className="h-6 w-6 text-white-main" />
        <span>
          {"Connect"}
        </span>
      </button>
    );
  }

  return <button className="btn text-white border border-white h-[50px] flex gap-2 items-center">
    <WalletIcon className="h-6 w-6 text-white-main" />
    <span className="lowercase">
      {Utils.getAddressShortHand(accounts[0])}
    </span>
  </button>
};

export default Wallet;
