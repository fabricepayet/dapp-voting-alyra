import React, { useReducer, useCallback, useEffect, FC } from "react";
import Web3 from "web3";
import { reducer, actions, initialState } from "./state";
import { createContext } from "react";
import VotingContract from '../../truffle/build/contracts/Voting.json'

export const EthContext = createContext<any>(
  {}
);

interface Props {
  children: JSX.Element
}

const EthProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer<(args0: any, arg1: any) => any>(reducer, initialState);

  const init = useCallback(
    async (artifact: any) => {
      if (artifact) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const { abi } = artifact;
        let address, contract;
        try {
          address = artifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contract }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = VotingContract;
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => (window as any).ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => (window as any).ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider
      value={{
        state,
        dispatch
      }}>
      {children}
    </EthContext.Provider>
  );
};

export default EthProvider;
