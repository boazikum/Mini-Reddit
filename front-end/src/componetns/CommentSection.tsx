import Comment from "./Comment";
import CreateComment from "./CreateComment";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";

interface Props {
  postId: number;
}

interface comment {
  id: number;
  body: string;
  upvotes: number;
}

function CommentSection({ postId }: Props) {
  const { data, isPending, error, getData } = useFetch<comment>();

  let commentsIds: comment[] = data;

  useEffect(() => {
    getData({ url: `http://localhost:3000/api/comments/${postId}` });
  }, []);

  return (
    <div className="commentSection">
      <CreateComment postId={postId} />

      {commentsIds.map((commentInfo: comment) => (
        <Comment
          id={commentInfo.id}
          body={commentInfo.body}
          upvotes={commentInfo.upvotes}
        />
      ))}
    </div>
  );
}

export default CommentSection;
