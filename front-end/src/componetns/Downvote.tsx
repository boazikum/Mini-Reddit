import { useEffect } from "react";
import usePut from "../hooks/usePut";

interface Props {
  postId: number;
  selectedButton: number;
  setSelectedButton: (button: number) => void;
  setUpvotes: (upvotes: number) => void;
}

interface Upvotes {
  upvotes: number;
}

const Downvote = ({
  postId,
  selectedButton,
  setSelectedButton,
  setUpvotes,
}: Props) => {
  const { data, error, putData } = usePut<Upvotes>();

  const handleUpvote = () => {
    switch (selectedButton) {
      case 0:
        putData({
          url: `http://127.0.0.1:3000/api/upvotes/${postId}`,
          body: { incrementBy: -1 },
        });
        setSelectedButton(-1);
        break;
      case -1:
        putData({
          url: `http://127.0.0.1:3000/api/upvotes/${postId}`,
          body: { incrementBy: 1 },
        });
        setSelectedButton(0);
        break;
      case 1:
        putData({
          url: `http://127.0.0.1:3000/api/upvotes/${postId}`,
          body: { incrementBy: -2 },
        });
        setSelectedButton(-1);
        break;
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      setUpvotes(data[0].upvotes);
    }
  }, [data]);

  return (
    <img
      src="/downvote_arrow.svg"
      className={selectedButton === -1 ? "active-downvote" : "vote-img"}
      onClick={handleUpvote}
    />
  );
};

export default Downvote;
