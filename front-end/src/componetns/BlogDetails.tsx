import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import VotesBar from "./VotesBar";

interface PostParams {
  id: string;
}

interface Post {
  title: string;
  author: string;
  body: string;
  id: number;
  upvotes: number;
}

const PostDetails = () => {
  const { id } = useParams<PostParams>(); // gets the url param from /posts/:id
  const {
    data: posts,
    error,
    isPending,
    getData,
  } = useFetch<Post>({ url: `http://localhost:3000/api/posts/${id}` });

  useEffect(() => {
    getData();
  }, []);

  const post = posts[0];

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {post && (
        <>
          <article>
            <h2>{post.title}</h2>
            <p>Written by {post.author}</p>
            <div>{post.body}</div>
          </article>
          <VotesBar id={parseInt(id)} startUpvotes={post.upvotes} />
        </>
      )}
    </div>
  );
};

export default PostDetails;
