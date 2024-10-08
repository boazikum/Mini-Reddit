import { useEffect, useState } from "react";
import Downvote from "./Downvote";
import Upvote from "./Upvote";
import useFetch from "../hooks/useFetch";

interface Props {
  id: number;
  startUpvotes: number;
}

interface Upvotes {
  upvotes: number;
}

const VotesBar = ({ id, startUpvotes }: Props) => {
  const [selectedButton, setSelectedButton] = useState<number>(0);
  const [upvotes, setUpvotes] = useState<number>(startUpvotes);
  const { data, isPending, error, getData } = useFetch<Upvotes>({
    url: `http://127.0.0.1:3000/api/upvotes/${id}`,
  });

  return (
    <div className="votesbar-conteiner">
      <Upvote
        postId={id}
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
        setUpvotes={setUpvotes}
      />
      <p className="upvote-number">{upvotes}</p>
      <Downvote
        postId={id}
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
        setUpvotes={setUpvotes}
      />
    </div>
  );
};

export default VotesBar;
