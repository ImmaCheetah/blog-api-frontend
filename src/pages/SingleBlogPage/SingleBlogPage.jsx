import styles from "./SingleBlogPage.module.css";
import { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router";
import Comment from '../../components/Comment/Comment';
import { useAuth } from '../../components/AuthProvider/AuthProvider';
import CommentForm from '../../components/CommentForm/CommentForm';

export default function SingleBlogPage() {
  let {postId} = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    fetch(`http://localhost:8080/posts/${postId}`, {
      method: "GET",
      headers: {
        // 'Authorization': token
      }
    })
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
  }, [post])


  return (
    <>
      {auth.user && <p>USER LOGGED IN</p>}
      {post &&
        <div>
          <h1>SINGLE BLOG PAGE</h1>
          <h2>{post.title}</h2>
          <p>{post.timestamp}</p>
          <p>{post.content}</p>
          <p>{post.author.username}</p>
          <CommentForm />
            {post.comments.map((comment) => {
              return (
                <Comment
                  key={comment.id}
                  author={comment.author.username}
                  content={comment.content}
                  timestamp={comment.timestamp}
                />
              )
            })}
        </div>
      }
    </>
  );
}