interface IProps {
  id: number;
  body: string;
  upvotes: number;
}

function Comment({ id, body, upvotes }: IProps) {
  return (
    <div className="comment">
      <p>{body}</p>
    </div>
  );
}

export default Comment;
