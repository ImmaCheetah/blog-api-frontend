import styles from "./CommentForm.module.css";
import { useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useParams } from "react-router";
import { NavLink, useNavigate } from "react-router-dom";

export default function CommentForm({handleComment}) {
  const auth = useAuth();
  const [comment, setComment] = useState('');
  let {postId} = useParams();
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const content = form.get("content");

    commentFetch(postId, content);
    handleComment('test name', 'test comment', '200');
    setComment('');
    navigate(`/posts/${postId}`)
  }
  
  async function commentFetch(postId, content) {
    try {
      const response = await fetch(`http://localhost:8080/posts/${postId}/comments`, {
        method: "POST",
        body: JSON.stringify({
          content: content,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth.token
        },
      })

      const res = await response.json();
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {
        auth.user ?
        <form className={styles.commentForm} onSubmit={handleSubmit}>
          <label htmlFor="content">Leave a comment</label>
          <textarea 
            type="text" 
            name="content"
            value={comment}
            placeholder="What a great blog"
            onChange={e => setComment(e.target.value)} 
            required
          />
          <button type="submit">Submit</button>
        </form>
        :
        <p>
          <NavLink className={styles.commentLogin} to="/login">Log In</NavLink> to comment
        </p>
      }
    </>
  );
}


