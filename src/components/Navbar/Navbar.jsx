import styles from "./Navbar.module.css";
import { useAuth } from "../AuthProvider/AuthProvider";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const auth = useAuth();
  console.log(auth.user)
  return (
    <nav>
      <NavLink className={styles.blogNameLink} to='/'>
        <button className={styles.blogName}>Blog and Such</button>
      </NavLink>
      <NavLink to='/posts'>
        <button className={styles.navBtn}>Posts</button>
      </NavLink>
      {
        auth.token ?
        <>
        <NavLink to='/user/author/sign-up'>
          <button className={styles.navBtn}>Become an Author</button>
        </NavLink>
        <button className={styles.navBtn} onClick={() => auth.logOut()}>Log Out</button>
        </>
        :
        <NavLink to='/login'>
          <button className={styles.navBtn}>Login</button>
        </NavLink>
      }
      {/* <p>{auth.user.username}</p> */}
    </nav>
  );
}


