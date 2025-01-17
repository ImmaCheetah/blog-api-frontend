import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footerDiv}>
      <p>
        Made by{" "}
        <a href="https://github.com/ImmaCheetah" target="blank">
          Cheet
        </a>
      </p>
    </footer>
  );
}
