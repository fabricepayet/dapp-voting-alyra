// SPDX-License-Identifier: MIT

pragma solidity 0.8.13;
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title A voting contract for deciding which proposal should be executed.
/// @author Cyril Castagnet
/// @notice You can use this contract for the most important decisions of your DAO.
contract Voting is Ownable {
    /// @notice The winning proposal id
    uint256 public winningProposalID;

    /// @notice The structure of a voter
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint256 votedProposalId;
    }

    /// @notice The structure of a proposal
    struct Proposal {
        string description;
        uint256 voteCount;
    }

    /// @notice The worfklow enum with the different steps
    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    /// @dev This variable is public to let anyone access it
    WorkflowStatus public workflowStatus;

    /// @notice The array containing all the proposals
    Proposal[] proposalsArray;

    /// @notice The mapping containing all the voters
    mapping(address => Voter) voters;

    /// @notice The event emitted when a voter is registered
    event VoterRegistered(address voterAddress);

    /// @notice The event emitted when the workflow status changes
    event WorkflowStatusChange(
        WorkflowStatus previousStatus,
        WorkflowStatus newStatus
    );

    /// @notice The event emitted when a proposal is registered
    event ProposalRegistered(uint256 proposalId);

    /// @notice The event emitted when a voter votes
    event Voted(address voter, uint256 proposalId);

    /// @dev The modifier to check if the user is a registered voter
    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }

    // ::::::::::::: GETTERS ::::::::::::: //

    /// @notice Get the voter's information
    /// @dev This function is external and only accessible by voters
    /// @param _addr The address of the voter
    /// @return Voter The voter's information (isRegistered, hasVoted, votedProposalId)
    function getVoter(address _addr)
        external
        view
        onlyVoters
        returns (Voter memory)
    {
        return voters[_addr];
    }

    /// @notice Get a proposal's information
    /// @dev This function is external and accessible by anyone
    /// @param _id The id of the proposal
    /// @return Proposal The proposal's information (description, voteCount)
    function getOneProposal(uint256 _id)
        external
        view
        returns (Proposal memory)
    {
        return proposalsArray[_id];
    }

    // ::::::::::::: REGISTRATION ::::::::::::: //

    /// @notice Add a voter to the mapping
    /// @dev This function is external and only accessible by the owner. Emit the VoterRegistered event.
    /// @param _addr The address of the voter to add
    function addVoter(address _addr) external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.RegisteringVoters,
            "Voters registration is not open yet"
        );
        require(voters[_addr].isRegistered != true, "Already registered");
        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }

    // ::::::::::::: PROPOSAL ::::::::::::: //

    /// @notice Add a proposal to the array
    /// @dev This function is external and only accessible by the registered voters. Emit the ProposalRegistered event. Prevent DoS by limiting the number of proposals.
    /// @param _desc The description of the proposal
    function addProposal(string calldata _desc) external onlyVoters {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Proposals are not allowed yet"
        );
        require(proposalsArray.length < 1000, "Too many proposals");
        require(
            keccak256(abi.encode(_desc)) != keccak256(abi.encode("")),
            "Vous ne pouvez pas ne rien proposer"
        );

        Proposal memory proposal;
        proposal.description = _desc;
        proposalsArray.push(proposal);
        emit ProposalRegistered(proposalsArray.length - 1);
    }

    // ::::::::::::: VOTE ::::::::::::: //

    /// @notice Vote for a proposal
    /// @dev This function is external and only accessible by the registered voters. Emit the Voted event.
    /// @param _id The id of the proposal to vote for
    function setVote(uint256 _id) external onlyVoters {
        require(
            workflowStatus == WorkflowStatus.VotingSessionStarted,
            "Voting session havent started yet"
        );
        require(voters[msg.sender].hasVoted != true, "You have already voted");
        require(_id < proposalsArray.length, "Proposal not found"); // pas obligé, et pas besoin du >0 car uint
        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount++;
        emit Voted(msg.sender, _id);
    }

    // ::::::::::::: STATE ::::::::::::: //

    /// @notice Change the workflow status from RegisteringVoters to ProposalsRegistrationStarted
    /// @dev This function is only accessible by the owner. Emit the WorkflowStatusChange event. I remove the GENESIS's proposal here to avoid having side effects.
    function startProposalsRegistering() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.RegisteringVoters,
            "Registering proposals cant be started now"
        );
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;

        emit WorkflowStatusChange(
            WorkflowStatus.RegisteringVoters,
            WorkflowStatus.ProposalsRegistrationStarted
        );
    }

    /// @notice Change the workflow status from ProposalsRegistrationStarted to ProposalsRegistrationEnded
    /// @dev This function is only accessible by the owner. Emit the WorkflowStatusChange event.
    function endProposalsRegistering() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Registering proposals havent started yet"
        );
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationStarted,
            WorkflowStatus.ProposalsRegistrationEnded
        );
    }

    /// @notice Change the workflow status from ProposalsRegistrationEnded to VotingSessionStarted
    /// @dev This function is only accessible by the owner. Emit the WorkflowStatusChange event.
    function startVotingSession() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationEnded,
            "Registering proposals phase is not finished"
        );
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationEnded,
            WorkflowStatus.VotingSessionStarted
        );
    }

    /// @notice Change the workflow status from VotingSessionStarted to VotingSessionEnded
    /// @dev This function is only accessible by the owner. Emit the WorkflowStatusChange event.
    function endVotingSession() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.VotingSessionStarted,
            "Voting session havent started yet"
        );
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionStarted,
            WorkflowStatus.VotingSessionEnded
        );
    }

    /// @notice Tallies the votes and sets the winning proposal
    /// @dev This function is only accessible by the owner. Set the winningProposalId and emit the WorkflowStatusChange event. Take the first proposal with the highest voteCount.
    function tallyVotes() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.VotingSessionEnded,
            "Current status is not voting session ended"
        );
        uint256 _winningProposalId;
        for (uint256 p = 0; p < proposalsArray.length; p++) {
            if (
                proposalsArray[p].voteCount >
                proposalsArray[_winningProposalId].voteCount
            ) {
                _winningProposalId = p;
            }
        }
        winningProposalID = _winningProposalId;

        workflowStatus = WorkflowStatus.VotesTallied;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionEnded,
            WorkflowStatus.VotesTallied
        );
    }
}
