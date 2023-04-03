import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUserDetails } from "../interfaces/User";
import { getBase64String } from "../utils/getBase64String";
import { makeRequest } from "../utils/makeRequest";

export interface IUserContext {
  user: IUserDetails;
  setUser: React.Dispatch<React.SetStateAction<IUserDetails>>;
  getUser: () => Promise<void>;
}

const initialUserValues = {
  photo: "",
  name: "",
  username: "",
  email: "",
  id: "",
  status: "",
  loggedIn: false,
};

const UserStore = createContext({} as IUserContext);

const useUserContext = () => useContext(UserStore);

const UserStoreProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<IUserDetails>(initialUserValues);
  const [error, setError] = useState<string>();

  const getUserInfo = async () => {
    try {
      const { data } = await makeRequest("/user/profile");
      console.log(data);
      const dataUrl = getBase64String(data.photo.data);

      setUser({ ...data, photo: dataUrl, id: data._id });
    } catch (err) {
      console.log("error", err);
      setError(err as string);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const value = {
    user: user,
    setUser: setUser,
    getUser: getUserInfo,
  };

  return <UserStore.Provider value={value}>{children}</UserStore.Provider>;
};

export { UserStore, UserStoreProvider, useUserContext };
