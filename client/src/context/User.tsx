import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from "react";
import { IUser } from "../interfaces/User";
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
    const base64Image = btoa(
      new Uint8Array(data.photo.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    console.log(base64Image);
    const dataUrl = `data:image/jpeg;base64,${base64Image}`;
    setUser({ ...data, photo: dataUrl });
  };

  const value = {
    user: user,
    setUser: setUser,
    getUser: getUserInfo,
  };

  return <UserStore.Provider value={value}>{children}</UserStore.Provider>;
};

export { UserStore, UserStoreProvider, useUserContext };
