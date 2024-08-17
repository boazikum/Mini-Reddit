import { Link } from "react-router-dom";
import VotesBar from "./VotesBar";

interface Post {
  title: string;
  author: string;
  body: string;
  id: number;
  upvotes: number;
}

interface Props {
  blogs: Post[];
  title?: string;
}

const BlogList = ({ blogs = [], title }: Props) => {
  return (
    <div className="blog-list">
      {title != undefined && blogs.length > 0 && <h2>{title}</h2>}
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <h2 className="blog-preview-title">{blog.title}</h2>
            <p>Written by {blog.author}</p>
          </Link>
          <VotesBar id={blog.id} startUpvotes={blog.upvotes} />
        </div>
      ))}
    </div>
  );
};

export default BlogList;
