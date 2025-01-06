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

  function formatDate(timestamp) {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    })
  }

  useEffect(() => {
    fetch(`http://localhost:8080/posts/${postId}`, {
      method: "GET",
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
  }, [])


  return (
    <>
      {post &&
        <div className={styles.postDiv}>
          <div className={styles.postHeader}>
            <h2>{post.title}</h2>
            <p>Written By: {post.author.username}</p>
            <p>{formatDate(post.timestamp)}</p>
          </div>
          <p className={styles.postContent}>{post.content}</p>
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