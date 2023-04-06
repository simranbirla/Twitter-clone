import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThoughtsProvider } from "./context/Thoughts";
import { UserStoreProvider } from "./context/User";
import { BookmarkProvider } from "./context/Bookmark";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThoughtsProvider>
    <UserStoreProvider>
      <BookmarkProvider>
        <App />
      </BookmarkProvider>
    </UserStoreProvider>
  </ThoughtsProvider>
);
