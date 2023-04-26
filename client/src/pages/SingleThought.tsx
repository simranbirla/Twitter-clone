import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Thought from "../components/Thought";
import { IThought } from "../interfaces/Thought";
import { makeRequest } from "../utils/makeRequest";
import { PageType } from "../enum/PageType";

export default function SingleThought() {
  const [thought, setThought] = useState<IThought>();
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();

  const getThought = async () => {
    const { data } = await makeRequest(`/tweet/${id}`);
    setThought(data);
    setLoading(false);
  };

  useEffect(() => {
    getThought();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <>
      {thought && (
        <Thought
          thought={thought}
          getThought={getThought}
          type={PageType.SINGLE_THOUGHT}
        />
      )}
    </>
  );
}
