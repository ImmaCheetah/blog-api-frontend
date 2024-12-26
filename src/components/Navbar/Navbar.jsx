import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <h1 className={styles.shopName}>Blog</h1>
      <NavLink to='/'>
        <button data-testid='homeLink' className={styles.navBtn}>Home</button>
      </NavLink>
      <NavLink to='login'>
        <button data-testid='shopLink' className={styles.navBtn}>Login</button>
      </NavLink>
      <NavLink to='sign-up'>
        <button data-testid='cartLink' className={styles.navBtn}>Sign Up</button>
      </NavLink>
    </nav>
  );
}


