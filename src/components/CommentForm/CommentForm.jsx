import styles from "./CommentForm.module.css";
import { useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useParams } from "react-router";
import { NavLink, useNavigate } from "react-router-dom";
require('dotenv').config()

export default function CommentForm({ handleComment }) {
  const auth = useAuth();
  const [comment, setComment] = useState("");
  let { postId } = useParams();
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const content = form.get("content");

    commentFetch(postId, content);
    setComment("");
    navigate(`/posts/${postId}`);
  }

  async function commentFetch(postId, content) {
    try {
      console.log("AUTH USER FROM COMMENT FETCH", auth.user);
      const response = await fetch(
        `${process.env.API_URL}/posts/${postId}/comments`,
        {
          method: "POST",
          body: JSON.stringify({
            content: content,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: auth.token,
          },
        },
      );

      const res = await response.json();
      handleComment(
        res.comment.author.username,
        res.comment.content,
        res.comment.timestamp,
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {auth.token ? (
        <form className={styles.commentForm} onSubmit={handleSubmit}>
          <label htmlFor="content">Leave a comment</label>
          <textarea
            type="text"
            name="content"
            value={comment}
            placeholder="What a great blog"
            maxLength={300}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>
          <NavLink className={styles.commentLogin} to="/login">
            Log In
          </NavLink>{" "}
          to comment
        </p>
      )}
    </>
  );
}
