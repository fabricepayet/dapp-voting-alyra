import { useContext } from "react";
import { EthContext } from "../contexts/EthProvider";

const useEth = () => useContext(EthContext);

export default useEth;
