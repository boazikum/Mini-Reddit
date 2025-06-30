import { FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useUserContext } from "./userContext";
import usePost from "../hooks/usePost";

const Create = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const { data, isPending, error, postData } = usePost();
  const history = useHistory();
  const { user } = useUserContext();
  const [canSubmit, setCanSubmit] = useState<boolean>(user.id ? true : false);

  useEffect(() => {
    setCanSubmit(Boolean(user.id && !isPending));
  }, [user, isPending]);

  useEffect(() => {
    if (data.length) {
      history.go(-1);
    }
  }, [data]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // stops the defualt action for submit which is refresh
    const blog = { title, body, authorid: user.id };

    postData({ body: blog, url: "http://127.0.0.1:3000/api/posts" });
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        {canSubmit && <button>submit blog</button>}
        {!user.id && (
          <p className="error">must be logged in to create a new blog</p>
        )}
        {error && <p className="error">{error}</p>}
        {isPending && <p>Creating new post</p>}
      </form>
    </div>
  );
};

export default Create;
