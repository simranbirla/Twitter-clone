import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThoughtsProvider } from "./context/Thoughts";
import { UserStoreProvider } from "./context/User";
import { BookmarkProvider } from "./context/Bookmark";
import { LikeProvider } from "./context/Likes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThoughtsProvider>
    <UserStoreProvider>
      <BookmarkProvider>
        <LikeProvider>
          <App />
        </LikeProvider>
      </BookmarkProvider>
    </UserStoreProvider>
  </ThoughtsProvider>
);
