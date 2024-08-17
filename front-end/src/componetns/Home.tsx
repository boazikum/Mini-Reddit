import BlogList from "./BlogList";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";

interface Post {
  title: string;
  author: string;
  body: string;
  id: number;
  upvotes: number;
}

const Home = () => {
  const {
    data: blogs,
    isPending,
    error,
    getData,
  } = useFetch<Post>({
    url: "http://127.0.0.1:3000/api/posts",
  });

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="home">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blogs && blogs.length > 0 && (
        <BlogList blogs={blogs} title="All Blogs" />
      )}
    </div>
  );
};

export default Home;
