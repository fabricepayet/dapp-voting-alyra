import clsx from 'clsx';
import React, { FC, useEffect, useState } from 'react';
import useEth from '../../hooks/useEth';

interface Props {
  className?: string;
}

const WinningProposal: FC<Props> = ({ className = "" }) => {
  const { state: { contract, accounts } } = useEth()
  const [proposalDescription, setProposalDescription] = useState('')

  useEffect(() => {
    if (!accounts || !accounts.length || !contract) return
    const getWinningProposal = async () => {
      const winningProposalId = await contract.methods.winningProposalID().call()
      const currentProposalDescription = await contract.methods.getOneProposal(winningProposalId).call({ from: accounts[0] })
      setProposalDescription(currentProposalDescription.description)
    }

    getWinningProposal()
  }, [accounts, contract])

  return (
    <div className={clsx("self-center", className)}>
      <div className="text-4xl text-white uppercase">
        {"The winning proposal is"}
      </div>

      <div className="mt-4 text-center text-white text-2xl">{`« ${proposalDescription} »`}</div>
    </div>
  );
};

export default WinningProposal;
