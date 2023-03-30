import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from "react";
import { makeRequest } from "../utils/makeRequest";

export interface IUserContext {
  user: IUserValues;
  setUser: React.Dispatch<React.SetStateAction<IUserValues>>;
  getUser: () => Promise<void>;
}

type IUserValues = {
  photo: string;
  name: string;
  username: string;
  email: string;
  id: string;
};

const initialUserValues = {
  photo: "",
  name: "",
  username: "",
  email: "",
  id: "",
};

const UserStore = createContext({} as IUserContext);

const useUserContext = () => useContext(UserStore);

const UserStoreProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<IUserValues>(initialUserValues);

  const getUserInfo = async () => {
    const { data } = await makeRequest("/profile");
    setUser(data);
  };

  const value = {
    user: user,
    setUser: setUser,
    getUser: getUserInfo,
  };

  return <UserStore.Provider value={value}>{children}</UserStore.Provider>;
};

export { UserStore, UserStoreProvider, useUserContext };
