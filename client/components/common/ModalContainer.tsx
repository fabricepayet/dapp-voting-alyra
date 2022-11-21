import React, { FC } from 'react';
import { Dialog } from '@headlessui/react'
import { Russo_One } from '@next/font/google'
import clsx from 'clsx';

const russoOne = Russo_One({ subsets: ['latin'], weight: '400' })

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element
}

const ModalContainer: FC<Props> = ({ isOpen, onClose, children }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className={clsx("relative z-50", russoOne.className)}>
      <div className="fixed inset-0 bg-black-black/60 h-screen w-screen" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="mx-auto max-w-sm p-[50px] bg-blue-dark w-[690px]">
          {
            children
          }
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ModalContainer;
