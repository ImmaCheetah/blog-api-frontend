import { useState, useEffect } from 'react'
import BlogCard from '../../components/BlogCard/BlogCard';


export default function SignUpPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  function formatDate(timestamp) {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    })
  }

  function limitText(content) {
    return content.slice(0, 250)
  }

  useEffect(() => {
    fetch('http://localhost:8080/posts')
    .then((response) => {
      if (response.status >= 400) {
        throw new Error("server error");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.posts);
      setPosts(data.posts);
    })
    .catch((error) => setError(error))
  }, [])

  return (
    <>
      <h1>BLOG PAGE</h1>
      {
        posts && 
        posts.map((post) => {
          return (
            <BlogCard 
              key={post.id}
              title={post.title}
              content={limitText(post.content)}
              timestamp={formatDate(post.timestamp)}
              author={post.author.username}
              postId={post.id}
            />
          )
        })
      }
    </>
  );
}