import styles from "./BlogCard.module.css";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function BlogCard({title, content, timestamp, author, postId}) {
  return (
    <div className={styles.cardDiv}>
      <div className={styles.cardHeader}>
        <h2>{title}</h2>
      </div>
      <p>{content}</p>
      <Link to={'/posts/'+ postId} className={styles.cardBtn}>View Post</Link>
    </div>
  )
}