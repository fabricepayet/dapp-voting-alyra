import React, { FC } from 'react';
import { WorkflowStatus } from '../../enums/workflow-status.enum';
import WinningProposal from '../vote/WinningProposal';

interface Props {
  workflowStatus: WorkflowStatus
}

const WorkflowStatusTitle: FC<Props> = ({ workflowStatus }) => {
  switch (workflowStatus) {
    case WorkflowStatus.RegisteringVoters:
      return <div className="text-4xl text-white self-center uppercase">
        {"Registering voters"}
      </div>

    case WorkflowStatus.ProposalsRegistrationStarted:
      return <div className="text-4xl text-white self-center uppercase">
        {"Registering proposals"}
      </div>

    case WorkflowStatus.ProposalsRegistrationEnded:
      return <div className="text-4xl text-white self-center uppercase">
        {"Registering proposals completed"}
      </div>

    case WorkflowStatus.VotingSessionStarted:
      return <div className="text-4xl text-white self-center uppercase">
        {"Registering vote"}
      </div>

    case WorkflowStatus.VotingSessionEnded:
      return <div className="text-4xl text-white self-center uppercase">
        {"Registering vote completed"}
      </div>

    case WorkflowStatus.VotesTallied:
      return <WinningProposal />

    default:
      return null
  };
}

export default WorkflowStatusTitle
