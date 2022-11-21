import React, { useCallback, useEffect, FC, useState } from "react";
import { createContext } from "react";
import useEth from "../hooks/useEth";
import IVote from "../interfaces/vote.interface";

export const ContractContext = createContext<any>({});

interface Props {
  children: JSX.Element
}

const ContractProvider: FC<Props> = ({ children }) => {
  const { state: { contract, accounts } } = useEth()
  const [workflowStatus, setWorkflowStatus] = useState<null | number>(null)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [voters, setVoters] = useState<string[]>([])
  const [isRegistered, setIsRegistered] = useState(false)
  const [proposalsIds, setProposalsIds] = useState<number[]>([])
  const [votes, setVotes] = useState<IVote[]>([])

  useEffect(() => {
    if (!accounts || !accounts.length) return
    const addressRegistered = voters.indexOf(accounts[0].toLowerCase()) !== -1
    setIsRegistered(addressRegistered)
  }, [voters, accounts])

  const refreshWorkflowStatus = async () => {
    if (!contract) return
    const currentWorkflowStatus = await contract.methods.workflowStatus().call()
    setWorkflowStatus(parseInt(currentWorkflowStatus))
  }

  const updateWorkflowStatus = useCallback(refreshWorkflowStatus, [contract])

  const checkIsAdmin = useCallback(async () => {
    if (!contract || !accounts || !accounts.length) return
    const owner = await contract.methods.owner().call()
    return setIsAdmin(owner === accounts[0])
  }, [contract, accounts])

  const getPreviousProposals = useCallback(async () => {
    const previousEvents = await contract.getPastEvents('ProposalRegistered', {
      fromBlock: 0,
      toBlock: 'latest'
    })

    const previousProposalsIds = previousEvents.map((event: any) => parseInt(event.returnValues.proposalId))
    setProposalsIds(previousProposalsIds)
  }, [contract])

  const listenProposalsRegistered = useCallback(async () => {
    if (!contract) return

    await getPreviousProposals()

    contract.events.ProposalRegistered({ fromBlock: 'earliest' }, async (error: Error, event: any) => {
      // setProposalsIds([...proposalsIds, parseInt(event.returnValues.proposalId)])
      await getPreviousProposals()
    })
  }, [contract, getPreviousProposals])

  const listenVotersRegistered = useCallback(async () => {
    if (!contract) return

    const previousEvents = await contract.getPastEvents('VoterRegistered', {
      fromBlock: 0,
      toBlock: 'latest'
    })
    const previousVoters = previousEvents.map((event: any) => event.returnValues.voterAddress.toLowerCase())
    setVoters(previousVoters)

    contract.events.VoterRegistered({ fromBlock: 'earliest' }, (error: Error, event: any) => {
      setVoters([...voters, (event.returnValues.voterAddress as string).toLowerCase()])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract])

  const listenVotes = useCallback(async () => {
    if (!contract) return

    const previousEvents = await contract.getPastEvents('Voted', {
      fromBlock: 0,
      toBlock: 'latest'
    })
    const previousVotes = previousEvents.map((event: any) => {
      const { voter, proposalId } = event.returnValues

      return {
        voter: (voter as string).toLowerCase(),
        proposalId: proposalId
      }
    })
    setVotes(previousVotes)

    contract.events.Voted({ fromBlock: 'earliest' }, (error: Error, event: any) => {
      const { voter, proposalId } = event.returnValues
      setVotes([
        ...votes,
        {
          voter: (voter as string).toLowerCase(),
          proposalId: proposalId as number
        }
      ])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract])

  useEffect(() => {
    updateWorkflowStatus()
  }, [updateWorkflowStatus])

  useEffect(() => {
    checkIsAdmin()
  }, [checkIsAdmin])

  useEffect(() => {
    listenVotersRegistered()
  }, [listenVotersRegistered])

  useEffect(() => {
    listenProposalsRegistered()
  }, [listenProposalsRegistered])

  useEffect(() => {
    listenVotes()
  }, [listenVotes])

  return (
    <ContractContext.Provider
      value={{
        isAdmin,
        workflowStatus,
        voters,
        proposalsIds,
        refreshWorkflowStatus,
        isRegistered,
        votes
      }}>
      {children}
    </ContractContext.Provider>
  );
};

export default ContractProvider;
