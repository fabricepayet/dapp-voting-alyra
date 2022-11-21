import { CheckCircleIcon } from '@heroicons/react/24/solid';
import React, { FC, useContext } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { ContractContext } from '../../contexts/ContractContext';
import IVote from '../../interfaces/vote.interface';

interface Props {
  voter: any
}

const VoterItem: FC<Props> = ({ voter }) => {
  const { votes } = useContext(ContractContext)
  const voterVote = votes.find((vote: IVote) => vote.voter === voter.toLowerCase())
  return (
    <div className="bg-blue-dark h-[92px] px-6 w-full flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Jazzicon diameter={44} seed={jsNumberForAddress(voter)} />
        <div className="text-white">
          {voter}
        </div>
      </div>

      {
        !!voterVote && (
          <CheckCircleIcon className="h-8 w-8 text-green-main" title="This voter has already voted" />
        )
      }
    </div>
  );
};

export default VoterItem;
