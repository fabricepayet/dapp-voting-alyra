import clsx from 'clsx';
import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { ContractContext } from '../../contexts/ContractContext';
import { WorkflowStatus } from '../../enums/workflow-status.enum';
import useEth from '../../hooks/useEth';
import AddVoterModal from './AddVoterModal';
import VoterItem from './VoterItem';

interface Props {
  className?: string
}

const Voters: FC<Props> = ({ className = "" }) => {
  const { state: { contract, accounts } } = useEth()
  const [isAddVoterModalOpen, setIsAddVoterModalOpen] = useState(false)
  const { voters, workflowStatus } = useContext(ContractContext)

  const onAddVoter = async (voterAddress: string) => {
    if (!contract || !accounts || !accounts.length) return
    try {
      await contract.methods.addVoter(voterAddress).send({ from: accounts[0] })
    } catch (err) {
      console.error('Error when adding voter:', err)
    }
  }

  return (
    <div>
      <div className={clsx('flex justify-between items-center', className)}>
        <h2 className="text-white text-2xl uppercase">{"Voters list"}</h2>

        {
          workflowStatus === WorkflowStatus.RegisteringVoters && (
            <button className="btn btn-secondary" onClick={() => setIsAddVoterModalOpen(true)}>
              {"Add voter"}
            </button>
          )
        }
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {
          voters.map((voter: string, index: number) => <VoterItem voter={voter} key={index} />)
        }
      </div>

      {
        workflowStatus === WorkflowStatus.RegisteringVoters && (
          <AddVoterModal isOpen={isAddVoterModalOpen} onClose={() => setIsAddVoterModalOpen(false)} onSubmit={onAddVoter} />
        )}
    </div>
  );
};

export default Voters;
