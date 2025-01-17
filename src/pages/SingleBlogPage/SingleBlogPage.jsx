import styles from "./SingleBlogPage.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import CommentSection from "../../components/CommentSection/CommentSection";
import CommentForm from "../../components/CommentForm/CommentForm";
import Error from "../../components/Error/Error";
import parse from 'html-react-parser';


export default function SingleBlogPage() {
  let { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function handleComment(author, content, timestamp) {
    setComments((prevComments) => {
      return [
        {
          author: {
            username: author,
          },
          content: content,
          timestamp: timestamp,
        },
        ...prevComments,
      ];
    });
  }

  useEffect(() => {
    const data = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
          method: "GET",
        });

        if (response.status >= 400) {
          const errors = await response.json();
          console.log(errors);
          setError(errors);
        }

        if (response.status === 200) {
          const res = await response.json();
          setPost(res.post);
          setComments(res.post.comments);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    data();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <Error name={error.name} status={error.status} message={error.errorMsg} />
    );

  return (
    <>
      {post && (
        <div className={styles.postDiv}>
          <div className={styles.postHeader}>
            <h2>{post.title}</h2>
            <p>Written By: {post.author.username}</p>
            <p>{formatDate(post.timestamp)}</p>
          </div>
          <p className={styles.postContent}>{parse(post.content)}</p>
          <CommentForm handleComment={handleComment} />
          <CommentSection comments={comments} />
        </div>
      )}
    </>
  );
}
