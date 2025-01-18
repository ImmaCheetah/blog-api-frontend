import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  let navigate = useNavigate();

  function handleBlogBtn() {
    navigate("/posts");
  }

  return (
    <div className={styles.welcomeDiv}>
      <h2 className={styles.welcomeHeader}>Welcome to Blog and Such</h2>
      <p>This is my full stack blog app that was made with a RESTful API, Express and React</p>
      <button className={styles.viewBlogBtn} onClick={handleBlogBtn}>View Blog</button>
    </div>
  );
}
