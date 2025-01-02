import { useAuth } from "../AuthProvider/AuthProvider";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const auth = useAuth();

  return (
    <nav>
      <h1 className={styles.shopName}>Blog</h1>
      <NavLink to='/'>
        <button className={styles.navBtn}>Home</button>
      </NavLink>
      {
        auth.user ?
        <button className={styles.navBtn} onClick={() => auth.logOut()}>Log Out</button>
        :
        <NavLink to='login'>
          <button className={styles.navBtn}>Login</button>
        </NavLink>
      }
    </nav>
  );
}


