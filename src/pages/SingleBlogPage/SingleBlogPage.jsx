import { useState, useEffect } from 'react'
import { useParams } from "react-router";

export default function SingleBlogPage() {
  let {postId} = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  console.log('FIRST POST', post)
  console.log(postId);
  useEffect(() => {
    fetch(`http://localhost:8080/posts/${postId}`)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error("server error");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.post);
      setPost(data.post);
    })
    .catch((error) => setError(error))
  }, [])


  return (
    <>
      {post &&
        <div>
          <h1>SINGLE BLOG PAGE</h1>
          <h2>{post.title}</h2>
          <p>{post.timestamp}</p>
          <p>{post.content}</p>
          <p>{post.author.username}</p>
        </div>
      }
    </>
  );
}