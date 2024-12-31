import { useState, useEffect } from 'react'
import BlogCard from '../../components/BlogCard/BlogCard';


export default function SignUpPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

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

  // const postsArray = posts.map(post => {
  //   return (
  //     <>
  //       <h1>{post.title}</h1>
  //       <h2>{post.content}</h2>
  //     </>
  //   )
  // });

  // setPosts(posts.posts)

  return (
    <>
      <h1>BLOG PAGE</h1>
      {/* {postsArray} */}
      {
        posts && 
        posts.map((post) => {
          return (
            <BlogCard 
              key={post.id}
              title={post.title}
              content={post.content}
              timestamp={post.timestamp}
              author={post.author.username}
              postId={post.id}
            />
          )
        })
      }
    </>
  );
}