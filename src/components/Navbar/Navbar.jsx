import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <h1 className={styles.shopName}>Blog</h1>
      <NavLink >
        <button data-testid='homeLink' className={styles.navBtn}>Home</button>
      </NavLink>
      <NavLink >
        <button data-testid='shopLink' className={styles.navBtn}>Login</button>
      </NavLink>
      <NavLink >
        <button data-testid='cartLink' className={styles.navBtn}>Sign Up</button>
      </NavLink>
    </nav>
  );
}


