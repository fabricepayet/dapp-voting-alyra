import React, { useContext } from 'react';
import bgShapes from '../../assets/bg-shapes.jpg';
import { ContractContext } from '../../contexts/ContractContext';
import ChangeWorkflowStepButton from './ChangeWorkflowStepButton';
import WorkflowStatusTitle from './WorkflowStatusTitle';

const AdminControls = () => {
  const { workflowStatus } = useContext(ContractContext)
  if (workflowStatus === null) return null

  return (
    <div className="py-16 bg-black-main opacity-80 flex justify-center flex-col"
      style={{
        backgroundImage: `url(${bgShapes.src})`,
        backgroundSize: 'cover',
      }}
    >
      <div className="text-green-main uppercase text-center mb-4">{"current step"}</div>
      <WorkflowStatusTitle workflowStatus={workflowStatus} />
      <ChangeWorkflowStepButton workflowStatus={workflowStatus} />
    </div>
  );
};

export default AdminControls;
