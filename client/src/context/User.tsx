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
  loading: boolean;
  user: IUserDetails;
  error: string;
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
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const getUserInfo = async () => {
    setLoading(true);
    const { data } = await makeRequest("/user/profile");
    console.log(data);

    if (data.error) {
      console.log("error", data.error);
      setError(data.error as string);
      return;
    }

    const dataUrl = getBase64String(data.photo.data);
    setUser({ ...data, photo: dataUrl, id: data._id, loggedIn: true });
    setLoading(false);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const value = {
    loading,
    error,
    user,
    setUser,
    getUser: getUserInfo,
  };

  return <UserStore.Provider value={value}>{children}</UserStore.Provider>;
};

export { UserStore, UserStoreProvider, useUserContext };
