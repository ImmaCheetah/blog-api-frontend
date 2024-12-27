/* eslint-disable react/prop-types */
export default function BlogCard({title, content, timestamp, author}) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      <p>{timestamp}</p>
      <p>{author}</p>
    </div>
  )
}