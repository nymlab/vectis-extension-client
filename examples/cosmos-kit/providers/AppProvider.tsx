import React, { PropsWithChildren, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocalStorage } from "react-use";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

import { ITodo } from "../interfaces/ITodo";
import { TodoStatus } from "../interfaces/TodoStatus";
import { useChainWallet } from "@cosmos-kit/react-lite";
import { wallets as VectisWallet } from "@cosmos-kit/vectis-extension";
import { WalletAccount } from "@cosmos-kit/core/types";

const JUNO_TODO_CODE_ID = 2545;

interface AppContextValue {
  userKey: WalletAccount | null;
  connectWallet: () => void;
  todos: ITodo[];
  addTodo: (description: string) => void;
  contractAddr: string | undefined;
  instantiateTodoContract: () => void;
  queryTodos: () => void;
  deleteTodo: (id: number) => void;
  updateTodoDescription: (id: number, description: string) => void;
  updateTodoStatus: (id: number, status: TodoStatus) => void;
}

export const AppContext = React.createContext<AppContextValue | null>(null);

const AppProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const { getOfflineSignerDirect, enable, connect, getAccount, address } = useChainWallet("junotestnet", VectisWallet[0].walletName);
  const [userKey, setUserKey] = useState<WalletAccount | null>(null);
  const [client, setClient] = useState<SigningCosmWasmClient | null>(null);
  const [contractAddr, setContractAddr] = useLocalStorage<string>(`contractAddr`);

  const instantiateTodoContract = async () => {
    if (!userKey || !client) return toast.error("Please connect your wallet");
    const { contractAddress } = await toast.promise(
      client.instantiate(userKey.address, JUNO_TODO_CODE_ID, { owner: userKey.address }, "Todo-List", "auto"),
      {
        loading: "Loading...",
        success: "Instantiated!",
        error: (err) => err.message,
      },
      {
        success: {
          icon: "🔥",
        },
      }
    );
    setContractAddr(contractAddress);
  };

  const connectWallet = async () => {
    try {
      await enable();
      await connect();
      const key = await getAccount();
      const signer = getOfflineSignerDirect();

      const client = await SigningCosmWasmClient.connectWithSigner("https://rpc.testcosmos.directory/junotestnet", signer, {
        gasPrice: GasPrice.fromString("0.005ujunox"),
      });

      setUserKey(key);
      setClient(client);
    } catch (err) {
      console.log(err);
      toast.error(err as string);
    }
  };

  const queryTodos = async () => {
    if (!contractAddr || !client) return;
    const { todos } = await client.queryContractSmart(contractAddr, {
      get_todo_list: { addr: userKey?.address, limit: 30 },
    });
    setTodos(todos);
  };

  const execute = async (msg: Record<string, any>) => {
    if (!userKey?.address || !contractAddr || !client) return;
    await toast.promise(
      client.execute(userKey.address, contractAddr, msg, "auto"),
      {
        loading: "Loading...",
        success: "Successfully executed!",
        error: "Error when executed",
      },
      {
        success: {
          icon: "🔥",
        },
      }
    );
    await queryTodos();
  };

  const addTodo = async (description: string) => {
    await execute({ add_todo: { description } });
  };

  const deleteTodo = async (id: number) => {
    await execute({ delete_todo: { id } });
  };

  const updateTodoDescription = async (id: number, description: string) => {
    await execute({ update_todo: { id, description } });
  };

  const updateTodoStatus = async (id: number, status: TodoStatus) => {
    await execute({ update_todo: { id, status } });
  };

  useEffect(() => {
    if (address) connectWallet();
  }, []);

  useEffect(() => {
    if (!contractAddr || !client) return;
    queryTodos();
  }, [client, contractAddr, client]);

  return (
    <AppContext.Provider
      value={{
        userKey,
        connectWallet,
        todos,
        addTodo,
        contractAddr,
        instantiateTodoContract,
        queryTodos,
        deleteTodo,
        updateTodoDescription,
        updateTodoStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) throw new Error("App Context Provider is not instanced");
  return context;
};

export default AppProvider;
