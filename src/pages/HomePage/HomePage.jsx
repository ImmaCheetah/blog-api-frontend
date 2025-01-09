import { useNavigate } from "react-router-dom";

export default function HomePage() {
  let navigate = useNavigate();

  function handleBlogBtn() {
    navigate("/posts");
  }

  return (
    <>
      <h2>Welcome to my blog</h2>
      <button onClick={handleBlogBtn}>View Blog</button>
    </>
  );
}
