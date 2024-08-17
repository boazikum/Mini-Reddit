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

const Upvote = ({
  postId,
  selectedButton,
  setSelectedButton,
  setUpvotes,
}: Props) => {
  const { data, error, putData } = usePut<Upvotes>({
    url: `http://127.0.0.1:3000/api/upvote/${postId}`,
  });

  const hanleUpvote = () => {
    switch (selectedButton) {
      case 0:
        putData({ incrementBy: 1 });
        setSelectedButton(1);
        break;
      case -1:
        putData({ incrementBy: 2 });
        setSelectedButton(1);
        break;
      case 1:
        putData({ incrementBy: -1 });
        setSelectedButton(0);
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
      src="upvote_arrow.svg"
      className={selectedButton === 1 ? "active-upvote" : "vote-img"}
      onClick={hanleUpvote}
    />
  );
};

export default Upvote;
