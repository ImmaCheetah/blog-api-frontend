import styles from "./Comment.module.css";
/* eslint-disable react/prop-types */
export default function Comment({ author, content, timestamp }) {
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className={styles.commentDiv}>
      <div className={styles.commentHeader}>
        <p className={styles.commentAuthor}>{author}</p>
        <p className={styles.commentDate}>{formatDate(timestamp)}</p>
      </div>
      <p>{content}</p>
    </div>
  );
}
