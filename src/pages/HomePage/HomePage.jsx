import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  let navigate = useNavigate();

  function handleBlogBtn() {
    navigate('/posts');
  }

  return (
    <>
      <h1>HOME PAGE</h1>
      <button onClick={handleBlogBtn}>View Blog</button>
    </>
  );
}