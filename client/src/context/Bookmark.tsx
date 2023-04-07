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

export interface IBookmarkContext {
  bookmarks: ISavedThoughts[];
  getBookmarks: () => Promise<void>;
}

const BookmarkStore = createContext({} as IBookmarkContext);

const useBookmarkContext = () => useContext(BookmarkStore);

const BookmarkProvider = ({ children }: { children: ReactElement }) => {
  const [bookmarks, setBookmarks] = useState<ISavedThoughts[]>([]);
  const { user, loading } = useUserContext();

  const getBookmarks = async () => {
    if (user.loggedIn && !loading) {
      const { data }: { data: ISavedThoughts[] } = await makeRequest(
        "/bookmark"
      );
      setBookmarks(data);
    }
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  const value = { bookmarks, getBookmarks };

  return (
    <BookmarkStore.Provider value={value}>{children}</BookmarkStore.Provider>
  );
};

export { useBookmarkContext, BookmarkProvider };
