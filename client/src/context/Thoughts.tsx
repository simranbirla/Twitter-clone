import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { IThought } from "../interfaces/Thought";
import { makeRequest } from "../utils/makeRequest";

export interface IThoughtsContext {
  thoughts: IThought[];
  getThoughts: () => Promise<void>;
}

const ThoughtsStore = createContext({} as IThoughtsContext);

const useThoughtsContext = () => useContext(ThoughtsStore);

const ThoughtsProvider = ({ children }: { children: ReactElement }) => {
  const [thoughts, setThoughts] = useState<IThought[]>([]);

  const getThoughts = async () => {
    const { data }: { data: IThought[] } = await makeRequest("/tweet");
    setThoughts(data);
  };

  useEffect(() => {
    getThoughts();
  }, []);

  const value = { thoughts, getThoughts };

  return (
    <ThoughtsStore.Provider value={value}>{children}</ThoughtsStore.Provider>
  );
};

export { useThoughtsContext, ThoughtsProvider };
