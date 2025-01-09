import styles from "./CommentSection.module.css";

import PropTypes from "prop-types";
import Comment from "../Comment/Comment";

export default function CommentSection({ comments }) {
  return (
    <div className={styles.commentsDiv}>
      {comments.map((comment, commentIndex) => {
        return (
          <Comment
            key={comment.id ? comment.id : commentIndex}
            author={comment.author.username}
            content={comment.content}
            timestamp={comment.timestamp}
          />
        );
      })}
    </div>
  );
}

CommentSection.propTypes = {
  comments: PropTypes.array,
};
