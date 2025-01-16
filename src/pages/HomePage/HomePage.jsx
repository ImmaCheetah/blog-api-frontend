import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  let navigate = useNavigate();

  function handleBlogBtn() {
    navigate("/posts");
  }

  return (
    <>
      <h2>Welcome to my blog</h2>
      <p>This website was made using</p>
      <ul>
        <li>React</li>
        <li>Express</li>
      </ul>
      <button className={styles.viewBlogBtn} onClick={handleBlogBtn}>View Blog</button>
    </>
  );
}
