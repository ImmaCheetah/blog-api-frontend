import { useState } from "react";
import CommentForm from "../CommentForm/CommentForm";
import PropTypes from "prop-types";
import Comment from "../Comment/Comment";

/*
FIGURE OUT HOW TO PAS STATE DOWN AND SET NEW COMMENTS WITHOUT A NEW FETCH
*/
export default function CommentSection({comments, handleComment}) {
  // const [comments, setComments] = useState([]);
  const commentList = comments.map((comment) => {
    return (
      <Comment
        key={comment.id}
        author={comment.author.username}
        content={comment.content}
        timestamp={comment.timestamp}
      />
    )
  })

  return (
    <>
      <CommentForm handleComment={handleComment}/>
      {
        commentList
      }
    </>
  )
}

CommentSection.propTypes = {
  comments: PropTypes.array
};