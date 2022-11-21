import React, { FC, useContext } from 'react';
import { ContractContext } from '../../contexts/ContractContext';
import { WorkflowStatus } from '../../enums/workflow-status.enum';
import useEth from '../../hooks/useEth';

interface Props {
  workflowStatus: WorkflowStatus
}

const ChangeWorkflowStepButton: FC<Props> = () => {
  const { state: { contract, accounts } } = useEth()
  const { workflowStatus, refreshWorkflowStatus } = useContext(ContractContext)

  const handleEndVotersRegistrationStep = async () => {
    await contract.methods.startProposalsRegistering().send({ from: accounts[0] })
    refreshWorkflowStatus()
  }

  const handleEndProposalsRegistrationStep = async () => {
    await contract.methods.endProposalsRegistering().send({ from: accounts[0] })
    refreshWorkflowStatus()
  }

  const handleStartVotingStep = async () => {
    await contract.methods.startVotingSession().send({ from: accounts[0] })
    refreshWorkflowStatus()
  }

  const handleEndVotingStep = async () => {
    await contract.methods.endVotingSession().send({ from: accounts[0] })
    refreshWorkflowStatus()
  }

  const handleGetResults = async () => {
    await contract.methods.tallyVotes().send({ from: accounts[0] })
    refreshWorkflowStatus()
  }

  const handleReset = async () => {
    await contract.methods.reset().send({ from: accounts[0] })
    refreshWorkflowStatus()
  }


  switch (workflowStatus) {
    case WorkflowStatus.RegisteringVoters:
      return <button
        className="btn btn-primary self-center mt-8"
        onClick={handleEndVotersRegistrationStep}
      >
        {"End voters registration step"}
      </button>

    case WorkflowStatus.ProposalsRegistrationStarted:
      return <button
        className="btn btn-primary self-center mt-8"
        onClick={handleEndProposalsRegistrationStep}
      >
        {"End proposals registration step"}
      </button>

    case WorkflowStatus.ProposalsRegistrationEnded:
      return <button className="btn btn-primary self-center mt-8" onClick={handleStartVotingStep}>{"Start voting step"}</button>

    case WorkflowStatus.VotingSessionStarted:
      return <button className="btn btn-primary self-center mt-8" onClick={handleEndVotingStep}>{"End voting step"}</button>

    case WorkflowStatus.VotingSessionEnded:
      return <button className="btn btn-primary self-center mt-8" onClick={handleGetResults}>{"Get results"}</button>

    default:
      return null
  };
}

export default ChangeWorkflowStepButton
