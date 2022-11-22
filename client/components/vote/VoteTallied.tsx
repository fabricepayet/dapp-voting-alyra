import React from 'react';
import WinningProposal from './WinningProposal';
import bgShapes from '../../assets/bg-shapes.jpg';

const VoteTallied = () => {
  return (
    <div className="py-16 bg-black-main opacity-80 flex justify-center flex-col text-center text-white text-2xl"
      style={{
        backgroundImage: `url(${bgShapes.src})`,
        backgroundSize: 'cover',
      }}
    >

      <div className="text-green-main uppercase text-center">{"vote completed"}</div>
      <WinningProposal className="mt-4" />
    </div>
  );
};

export default VoteTallied;
