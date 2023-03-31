import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from "react";
import { IUser } from "../interfaces/User";
import { getBase64String } from "../utils/getBase64String";
import { makeRequest } from "../utils/makeRequest";

export interface IUserContext {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  getUser: () => Promise<void>;
}

const initialUserValues = {
  photo: "",
  name: "",
  username: "",
  email: "",
  id: "",
  status: "",
};

const UserStore = createContext({} as IUserContext);

const useUserContext = () => useContext(UserStore);

const UserStoreProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<IUser>(initialUserValues);

  const getUserInfo = async () => {
    const { data } = await makeRequest("/user/profile");
    const dataUrl = getBase64String(data.photo.data);

    setUser({ ...data, photo: dataUrl, id: data._id });
  };

  const value = {
    user: user,
    setUser: setUser,
    getUser: getUserInfo,
  };

  return <UserStore.Provider value={value}>{children}</UserStore.Provider>;
};

export { UserStore, UserStoreProvider, useUserContext };
