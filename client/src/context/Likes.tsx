import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { ISavedThoughts } from "../interfaces/Thought";
import { makeRequest } from "../utils/makeRequest";
import { useUserContext } from "./User";

export interface ILikeContext {
  likes: ISavedThoughts[];
  getLikes: () => Promise<void>;
}

const LikeStore = createContext({} as ILikeContext);

const useLikeContext = () => useContext(LikeStore);

const LikeProvider = ({ children }: { children: ReactElement }) => {
  const [likes, setLikes] = useState<ISavedThoughts[]>([]);
  const { user, loading } = useUserContext();

  const getLikes = async () => {
    if (user.loggedIn && !loading) {
      const { data }: { data: ISavedThoughts[] } = await makeRequest("/like");
      setLikes(data);
    }
  };

  useEffect(() => {
    getLikes();
  }, []);

  const value = { likes, getLikes };

  return <LikeStore.Provider value={value}>{children}</LikeStore.Provider>;
};

export { useLikeContext, LikeProvider };
