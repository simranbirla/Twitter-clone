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
  loading: boolean;
}

const ThoughtsStore = createContext({} as IThoughtsContext);

const useThoughtsContext = () => useContext(ThoughtsStore);

const ThoughtsProvider = ({ children }: { children: ReactElement }) => {
  const [thoughts, setThoughts] = useState<IThought[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getThoughts = async () => {
    console.log("This is thoughts context");
    setLoading(true);
    const { data }: { data: IThought[] } = await makeRequest("/tweet");
    setThoughts(data);
    setLoading(false);
  };

  useEffect(() => {
    getThoughts();
  }, []);

  const value = { thoughts, getThoughts, loading };

  return (
    <ThoughtsStore.Provider value={value}>{children}</ThoughtsStore.Provider>
  );
};

export { useThoughtsContext, ThoughtsProvider };
