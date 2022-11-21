import clsx from 'clsx';
import React, { FC } from 'react';
import Header from './Header';
import { Russo_One } from '@next/font/google'
import bgCircle from '../../assets/bg-circle.png'

const russoOne = Russo_One({ subsets: ['latin'], weight: '400' })

interface Props {
  children: JSX.Element
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={clsx("h-screen w-screen bg-black-main pt-6", russoOne.className)} style={{
      backgroundImage: `url(${bgCircle.src})`,
      backgroundSize: 'cover',
    }}>
      <div className="overflow-auto h-full">
        <div className="max-w-4xl m-auto">
          <Header />

          <div className="my-[60px]">
            {
              children
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
