import { useRouter } from 'next/router';
import React, { FC } from 'react';

const Hero: FC = () => {

  const router = useRouter()

  const onStart = () => {
    router.push('/vote')
  }

  return (
    <div className="my-[210px]">
      <h1 className="text-white uppercase text-4xl text-center">
        {"DAPP VOTING ALYRA"}
      </h1>

      <div className="flex justify-center items-center mt-6">
        <button className="btn btn-primary" onClick={onStart}>
          {"Start Now"}
        </button>
      </div>
    </div>
  );
};

export default Hero;
