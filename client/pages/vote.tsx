import { useContext } from "react";
import Proposals from "../components/vote/Proposals";
import bgShapes from '../assets/bg-shapes.jpg';
import WinningProposal from "../components/vote/WinningProposal";
import { ContractContext } from "../contexts/ContractContext";
import { WorkflowStatus } from "../enums/workflow-status.enum";
import useEth from "../hooks/useEth";

const VotePage = () => {
  const { state: { accounts } } = useEth()
  const { workflowStatus } = useContext(ContractContext)

  if (!accounts || !accounts.length) {
    return null
  }

  switch (workflowStatus) {
    case WorkflowStatus.RegisteringVoters:
      return <div className="py-16 bg-black-main opacity-80 flex justify-center flex-col text-center text-white text-2xl"
        style={{
          backgroundImage: `url(${bgShapes.src})`,
          backgroundSize: 'cover',
        }}
      >
        {"Voting has not yet started. Please come back later."}
      </div>

    case WorkflowStatus.ProposalsRegistrationStarted:
      return <Proposals />

    case WorkflowStatus.ProposalsRegistrationEnded:
      return <div className="py-16 bg-black-main opacity-80 flex justify-center flex-col text-center text-white text-2xl"
        style={{
          backgroundImage: `url(${bgShapes.src})`,
          backgroundSize: 'cover',
        }}
      >
        {"Proposal registration is now completed. Please come back later."}
      </div>

    case WorkflowStatus.VotingSessionStarted:
      return <Proposals />

    case WorkflowStatus.VotingSessionEnded:
      return <div className="py-16 bg-black-main opacity-80 flex justify-center flex-col text-center text-white text-2xl"
        style={{
          backgroundImage: `url(${bgShapes.src})`,
          backgroundSize: 'cover',
        }}
      >
        {"Voting session is now completed. Please come back later."}
      </div>

    case WorkflowStatus.VotesTallied:
      return <div className="py-16 bg-black-main opacity-80 flex justify-center flex-col text-center text-white text-2xl"
        style={{
          backgroundImage: `url(${bgShapes.src})`,
          backgroundSize: 'cover',
        }}
      >
        <div className="text-green-main uppercase text-center mb-4">{"vote completed"}</div>
        <WinningProposal />
      </div>
  }
};

export default VotePage;
