import React from "react";
import ThoughtsContainer from "../components/ThoughtsContainer";
import { useThoughtsContext } from "../context/Thoughts";

export default function AllThoughts() {
  const { thoughts, getThoughts } = useThoughtsContext();

  return <ThoughtsContainer getThoughts={getThoughts} thoughts={thoughts} />;
}
