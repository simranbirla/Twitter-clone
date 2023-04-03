import React, { useEffect, useState } from "react";
import { IThought } from "../interfaces/Thought";
import { getAsyncData } from "../utils/getAsyncData";

import ThoughtsContainer from "./ThoughtsContainer";

export default function Thoughts({ type }: { type: string }) {
  const [thoughts, setThoughts] = useState<IThought[]>([]);

  const getThoughts = async () => {
    const data = await getAsyncData(type);
    setThoughts(data);
  };

  useEffect(() => {
    getThoughts();

    return () => {
      setThoughts([]);
    };
  }, []);

  return <ThoughtsContainer getThoughts={getThoughts} thoughts={thoughts} />;
}
