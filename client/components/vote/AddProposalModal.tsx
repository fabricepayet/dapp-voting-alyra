import React, { FC } from 'react';
import { Dialog } from '@headlessui/react'
import ModalContainer from '../common/ModalContainer';
const { useForm } = require('react-hook-form');

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (address: string) => void
}

const AddProposalModal: FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const handleOnSubmit = handleSubmit((values: { description: string }) => {
    onSubmit(values.description)
    reset()
    onClose()
  })


  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <>
        <Dialog.Title className="text-white text-center text-2xl uppercase">{"Add proposal"}</Dialog.Title>

        <form onSubmit={handleOnSubmit} className="mt-6">
          <div className="flex flex-col gap-2">
            <label className="opacity-70 text-white uppercase">{"Description"}</label>
            <textarea
              placeholder='Describe your proposal here'
              className="border bg-transparent w-full text-white px-6 py-4"
              {...register('description', {
                required: "Description is required",
              })}
            />
            {errors.address && <span className="text-white">{errors.address.message}</span>}
          </div>

          <div className="mt-10">
            <button className="btn btn-purple w-full" type="submit">{"Add proposal"}</button>
          </div>
        </form>
      </>
    </ModalContainer>
  );
};

export default AddProposalModal;
