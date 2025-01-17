import styles from "./BlogPage.module.css";
import { useState, useEffect } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import Error from "../../components/Error/Error";
import parse from 'html-react-parser';
require('dotenv').config()

export default function SignUpPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function limitText(content) {
    return content.slice(0, 200) + ' . . .';
  }

  useEffect(() => {
    const data = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}/posts`, {
          method: "GET",
        });

        if (response.status >= 400) {
          const errors = await response.json();
          console.log(errors);
          setError(errors);
        }

        if (response.status === 200) {
          const res = await response.json();
          setPosts(res.posts);
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
      <h2 className={styles.blogHeaderWarning}>*These blogs are written by AI and are examples to showcase the website</h2>
      {posts && (
        <div className={styles.postsDiv}>
          {posts.map((post) => {
            return (
              <BlogCard
                key={post.id}
                title={post.title}
                content={parse(limitText(post.content))}
                timestamp={formatDate(post.timestamp)}
                author={post.author.username}
                postId={post.id}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
