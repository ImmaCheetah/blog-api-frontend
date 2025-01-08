import styles from "./SingleBlogPage.module.css";
import { useState, useEffect } from 'react'
import { useParams } from "react-router";
import CommentSection from "../../components/CommentSection/CommentSection";

export default function SingleBlogPage() {
  let {postId} = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  function formatDate(timestamp) {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    })
  }

  function handleComment(author, content, timestamp) {
    setComments((prevComments) => {
      return [
        {
          author: {
            username: author
          },
          content: content,
          timestamp: timestamp
        },
        ...prevComments,
      ]
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
      setPost(data.post);
      setComments(data.post.comments)
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
          <CommentSection 
            comments={comments} 
            handleComment={handleComment}
          />
        </div>
      }
    </>
  );
}