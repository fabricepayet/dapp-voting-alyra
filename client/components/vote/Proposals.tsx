import clsx from 'clsx';
import React, { FC, useContext, useState } from 'react';
import { ContractContext } from '../../contexts/ContractContext';
import { WorkflowStatus } from '../../enums/workflow-status.enum';
import useEth from '../../hooks/useEth';
import AddProposalModal from './AddProposalModal';
import ProposalItem from './ProposalItem';

interface Props {
  className?: string
}

const Proposals: FC<Props> = ({ className = "" }) => {
  const { state: { contract, accounts } } = useEth()
  const [isAddProposalModalOpen, setIsAddProposalModalOpen] = useState(false)
  const { proposalsIds, isRegistered, workflowStatus } = useContext(ContractContext)

  const onAddProposal = async (proposalDescription: string) => {
    if (!contract || !accounts || !accounts.length) return
    try {
      await contract.methods.addProposal(proposalDescription).send({ from: accounts[0] })
    } catch (err) {
      console.error('Error when adding proposal:', err)
    }
  }

  if (!isRegistered) {
    return (
      <div className="py-16 bg-black-main opacity-80 flex justify-center flex-col text-center text-white text-2xl"
      >
        {"You are not registered."}
      </div>
    )
  }

  return (
    <div>
      <div className={clsx('flex justify-between items-center', className)}>
        <h2 className="text-white text-2xl uppercase">{"Proposals list"}</h2>

        {
          workflowStatus === WorkflowStatus.ProposalsRegistrationStarted && (
            <button className="btn btn-secondary" onClick={() => setIsAddProposalModalOpen(true)}>
              {"Add proposal"}
            </button>
          )}
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {
          proposalsIds.map((proposalId: number, index: number) => <ProposalItem proposalId={proposalId} key={index} canVote={workflowStatus === WorkflowStatus.VotingSessionStarted} />)
        }
      </div>

      {
        workflowStatus === WorkflowStatus.ProposalsRegistrationStarted && (
          <AddProposalModal
            isOpen={isAddProposalModalOpen}
            onClose={() => setIsAddProposalModalOpen(false)}
            onSubmit={onAddProposal}
          />
        )}
    </div>
  );
};

export default Proposals;
