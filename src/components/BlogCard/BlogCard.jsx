import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function BlogCard({title, content, timestamp, author, postId}) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      <p>{timestamp}</p>
      <p>{author}</p>
      <Link to={'/posts/'+ postId}>View Post</Link>
    </div>
  )
}