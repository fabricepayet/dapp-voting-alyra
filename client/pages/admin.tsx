import { useContext } from "react";
import AdminControls from "../components/admin/AdminControls";
import Voters from "../components/admin/Voters";
import { ContractContext } from "../contexts/ContractContext";

const AdminPage = () => {
  const { isAdmin } = useContext(ContractContext)

  if (!isAdmin) {
    return null
  }

  return (
    <div>
      <AdminControls />

      <Voters className="mt-8" />
    </div>
  );
};

export default AdminPage;
