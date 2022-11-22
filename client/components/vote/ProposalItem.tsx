import { CheckCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { ContractContext } from "../../contexts/ContractContext";
import useEth from "../../hooks/useEth";
import IVote from "../../interfaces/vote.interface";

interface Props {
  proposalId: number;
  canVote?: boolean
}

const ProposalItem: FC<Props> = ({ proposalId, canVote = false }) => {
  const [description, setDescription] = useState<string>('')
  const { state: { accounts, contract } } = useEth()
  const { isRegistered, votes } = useContext(ContractContext)

  const getProposalDescription = useCallback(async () => {

    if (!isRegistered) setDescription('Unknown')
    const proposalDescription = await contract.methods.getOneProposal(proposalId).call({ from: accounts[0] })
    setDescription(proposalDescription[0])
  },
    [accounts, contract.methods, proposalId, isRegistered]

  )

  const handleVote = async () => {
    if (!contract || !accounts || !accounts.length) return
    await contract.methods.setVote(proposalId).send({ from: accounts[0] })
  }

  useEffect(() => {
    getProposalDescription()
  }, [getProposalDescription])

  if (!contract || !accounts || !accounts.length) return null

  const myVote = votes.find((vote: IVote) => vote.voter === accounts[0].toLowerCase())

  return (
    <div className={clsx("bg-black-main h-[92px] px-6 w-full flex justify-between items-center", {
      'opacity-50': myVote && myVote.proposalId !== proposalId,
      'border border-green-main': myVote && myVote.proposalId === proposalId
    })}>
      <div className="text-white">
        {
          description
        }
      </div>

      {
        !!myVote ? (
          <>

            {
              myVote.proposalId === proposalId && (
                <CheckCircleIcon className="h-8 w-8 text-green-main" title="You have chosen this proposal" />
              )
            }
          </>
        ) : (
          <>
            {
              canVote && (
                <div>
                  <button className="btn btn-primary" onClick={handleVote}>
                    {"Vote"}
                  </button>
                </div>
              )
            }
          </>
        )
      }

    </div>
  );
};

export default ProposalItem;
