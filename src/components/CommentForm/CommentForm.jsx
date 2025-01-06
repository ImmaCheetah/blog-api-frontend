import { useAuth } from "../AuthProvider/AuthProvider";
import { useParams } from "react-router";
// import styles from "./CommentForm.module.css";
import { NavLink, useNavigate } from "react-router-dom";


export default function CommentForm() {
  const auth = useAuth();
  let {postId} = useParams();
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const content = form.get("content");

    commentFetch(postId, content);
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
        <form onSubmit={handleSubmit}>
          <input type="text" name="content" required/>
          <button type="submit">Submit</button>
        </form>
        :
        <p>
          <NavLink to="/login">Log In</NavLink> to comment
        </p>
      }
    </>
  );
}


