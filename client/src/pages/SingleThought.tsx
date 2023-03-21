import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Thought from "../components/Thought";
import { IThought } from "../interfaces/Thought";
import { makeRequest } from "../utils/makeRequest";

export default function SingleThought() {
  const [thought, setThought] = useState<IThought>();
  const { id } = useParams();

  const getThought = async () => {
    const { data } = await makeRequest(`/tweet/${id}`);
    console.log(data);
    setThought(data);
  };

  useEffect(() => {
    getThought();
  }, []);

  return <>{thought ? <Thought thought={thought} /> : <div>Loading</div>}</>;
}
