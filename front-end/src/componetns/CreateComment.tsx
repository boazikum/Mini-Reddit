import { FormEvent, useEffect, useState } from "react";
import usePost from "../hooks/usePost";
import { useUserContext } from "./userContext";

interface IProps {
  postId: number;
}

interface id {
  id: number;
}

function CreateComment({ postId }: IProps) {
  const [commentBody, setCommentBody] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const { data, error, postData } = usePost<id>();
  const { user } = useUserContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    postData({
      url: "http://127.0.0.1:3000/api/comments",
      body: {
        authorId: user.id,
        body: commentBody,
        postId: postId,
      },
    });
  };

  useEffect(() => {
    if (data) {
      setOpen(false);
    }
  }, [data]);

  return (
    <>
      <button onClick={() => setOpen(!open)}>create comment</button>

      <dialog open={open} className="modal">
        <button className="modal-close-btn" onClick={() => setOpen(false)}>
          x
        </button>
        <h2>create comment:</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>comment:</label>
          <input
            type="text"
            required
            value={commentBody}
            className="loginInput"
            onChange={(e) => setCommentBody(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          {!Boolean(user.id) && (
            <p className="error">must be logged in to create a comment</p>
          )}
          <button className="login-button" disabled={!Boolean(user.id)}>
            create comment
          </button>
        </form>
      </dialog>
    </>
  );
}

export default CreateComment;
