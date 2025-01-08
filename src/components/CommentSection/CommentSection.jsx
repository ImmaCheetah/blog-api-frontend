import CommentForm from "../CommentForm/CommentForm";
import PropTypes from "prop-types";
import Comment from "../Comment/Comment";

export default function CommentSection({comments, handleComment}) {
  return (
    <>
      <CommentForm key={1} handleComment={handleComment}/>
      {
        comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              author={comment.author.username}
              content={comment.content}
              timestamp={comment.timestamp}
            />
          )
        })
      }
    </>
  )
}

CommentSection.propTypes = {
  comments: PropTypes.array
};