/* eslint-disable react/prop-types */
export default function Comment({author, content, timestamp}) {
  return (
    <div>
      <h1>{author}</h1>
      <p>{content}</p>
      <p>{timestamp}</p>
      <p>{author}</p>
    </div>
  )
}