import React, { FC } from 'react';
import Wallet from './Wallet';
import Logo from '../../assets/logo.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Menu from './Menu';
import clsx from 'clsx';

interface Props {
  className?: string
}

const Header: FC<Props> = ({ className = "" }) => {
  const router = useRouter()

  const onClick = () => {
    router.push('/')
  }

  return (
    <div className={clsx("h-[72px] flex justify-between items-center", className)}>
      <Image src={Logo} alt={"Dapp Voting Alyra"} onClick={onClick} className="cursor-pointer" width={100} />

      <div className="gap-12 flex items-center">
        <Menu />
        <Wallet />
      </div>
    </div>
  );
};

export default Header;
