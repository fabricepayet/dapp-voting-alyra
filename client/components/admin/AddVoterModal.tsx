import React, { FC } from 'react';
import { Dialog } from '@headlessui/react'
import ModalContainer from '../common/ModalContainer';
import useEth from '../../hooks/useEth';
const { useForm } = require('react-hook-form');

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (address: string) => void
}

const AddVoterModal: FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const { state: { accounts } } = useEth()
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const handleOnSubmit = handleSubmit((values: { address: string }) => {
    onSubmit(values.address)
    reset()
    onClose()
  })

  if (!accounts || !accounts.length) return null

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <>
        <Dialog.Title className="text-white text-center text-2xl uppercase">{"Add voter"}</Dialog.Title>

        <form onSubmit={handleOnSubmit} className="mt-6">
          <div className="flex flex-col gap-2">
            <label className="opacity-70 text-white uppercase">{"Address"}</label>
            <input type="text"
              placeholder={accounts[0]}
              className="h-[60px] border bg-transparent w-full text-white px-6"
              {...register('address', {
                required: "Address is required",
                pattern: {
                  value: /^0x[a-fA-F0-9]{40}$/,
                  message: 'Invalid address'
                }
              })}
            />
            {errors.address && <span className="text-white">{errors.address.message}</span>}
          </div>

          <div className="mt-10">
            <button className="btn btn-purple w-full" type="submit">{"Add voter"}</button>
          </div>
        </form>
      </>
    </ModalContainer>
  );
};

export default AddVoterModal;
